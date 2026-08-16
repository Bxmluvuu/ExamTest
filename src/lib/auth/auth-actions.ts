'use server';

import { redirect } from 'next/navigation';
import { setServerSessionUser, clearServerSessionUser } from './session';
import { safeRedirectPath } from './server-guard';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import {
  authenticateWithPassword,
  registerUser,
  changeUserPassword,
  requestPasswordReset,
  resetPasswordWithToken,
  revokeUserSession,
  revokeAllOtherSessions,
  verifyEmailWithToken,
  requestEmailVerification,
  findProfileByEmail,
  getDataStore,
} from '@/lib/db-adapter';
import { validatePasswordStrength } from './password';
import { checkRateLimit, recordRateLimitAttempt, resetRateLimit } from './rate-limit';
import type { UserRole } from '@/lib/types/database';

export interface AuthActionResult {
  success: boolean;
  error?: string;
  isLocked?: boolean;
  retryAfterSeconds?: number;
  data?: any;
}

/**
 * Full Email + Password Login Server Action with brute-force protection and real Supabase Auth.
 */
export async function loginWithCredentialsAction(params: {
  email: string;
  password: string;
  rememberMe?: boolean;
  nextUrl?: string;
}): Promise<AuthActionResult> {
  const { email, password, rememberMe, nextUrl } = params;
  const normalizedEmail = email.trim().toLowerCase();

  // 1. Check Rate Limit & Account Lockout
  const rateLimitCheck = checkRateLimit('login', normalizedEmail, 5, 15 * 60);
  if (!rateLimitCheck.allowed) {
    return {
      success: false,
      error: `บัญชีนี้ถูกระงับชั่วคราวเนื่องจากพยายามเข้าสู่ระบบผิดพลาดเกินกำหนด กรุณารอ ${rateLimitCheck.retryAfterSeconds} วินาทีก่อนลองใหม่`,
      isLocked: rateLimitCheck.isLocked,
      retryAfterSeconds: rateLimitCheck.retryAfterSeconds,
    };
  }

  // 2. Attempt Real Supabase Auth
  try {
    const supabase = await createServerSupabaseClient();
    if (supabase) {
      let { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      // If email is not confirmed, auto-confirm using admin client and retry
      if (authError && authError.message.toLowerCase().includes('confirm')) {
        const admin = createAdminClient();
        if (admin) {
          const { data: userList } = await admin.auth.admin.listUsers();
          const targetUser = userList?.users?.find(u => u.email?.toLowerCase() === normalizedEmail);
          if (targetUser) {
            await admin.auth.admin.updateUserById(targetUser.id, { email_confirm: true });
            const retry = await supabase.auth.signInWithPassword({
              email: normalizedEmail,
              password,
            });
            authData = retry.data;
            authError = retry.error;
          }
        }
      }

      if (!authError && authData?.user) {
        let role: UserRole = (authData.user.user_metadata?.role as UserRole) || 'student';
        let fullName = authData.user.user_metadata?.full_name || normalizedEmail.split('@')[0];

        // Check profiles table
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authData.user.id)
          .single();

        if (profile) {
          role = profile.role || role;
          fullName = profile.full_name || fullName;
        } else {
          // Upsert missing profile
          const admin = createAdminClient();
          if (admin) {
            await admin.from('profiles').upsert({
              id: authData.user.id,
              email: normalizedEmail,
              full_name: fullName,
              role,
              is_email_verified: true,
            });
          }
        }

        resetRateLimit('login', normalizedEmail);
        const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7;
        await setServerSessionUser(authData.user.id, maxAge);

        const targetPath = role === 'admin'
          ? (safeRedirectPath(nextUrl, '/admin').startsWith('/admin') ? safeRedirectPath(nextUrl, '/admin') : '/admin')
          : (safeRedirectPath(nextUrl, '/dashboard').startsWith('/admin') ? '/dashboard' : safeRedirectPath(nextUrl, '/dashboard'));

        redirect(targetPath);
      }

      // If Supabase failed or user not in Supabase, fall through to Local Adapter
    }
  } catch (err: any) {
    if (err?.message?.includes('NEXT_REDIRECT') || err?.digest?.includes('NEXT_REDIRECT')) {
      throw err;
    }
    console.warn('Supabase auth attempt failed, falling back to local adapter:', err?.message || err);
  }

  // 3. Fallback to Local Auth (for mock/local development)
  const authResult = await authenticateWithPassword(normalizedEmail, password);

  if (!authResult.success || !authResult.profile) {
    const recordResult = recordRateLimitAttempt('login', normalizedEmail, 5, 15 * 60, 15);
    if (recordResult.isLocked) {
      return {
        success: false,
        error: 'คุณกรอกรหัสผ่านผิดเกิน 5 ครั้ง บัญชีถูกระงับชั่วคราว 15 นาทีเพื่อความปลอดภัย',
        isLocked: true,
        retryAfterSeconds: recordResult.retryAfterSeconds,
      };
    }

    return {
      success: false,
      error: authResult.error || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง',
      isLocked: false,
      retryAfterSeconds: 0,
    };
  }

  resetRateLimit('login', normalizedEmail);
  const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7;
  await setServerSessionUser(authResult.profile.id, maxAge);

  const userRole = authResult.profile.role;
  let targetPath = '/dashboard';

  if (userRole === 'admin') {
    const dest = safeRedirectPath(nextUrl, '/admin');
    targetPath = dest.startsWith('/admin') ? dest : '/admin';
  } else {
    const dest = safeRedirectPath(nextUrl, '/dashboard');
    targetPath = dest.startsWith('/admin') ? '/dashboard' : dest;
  }

  redirect(targetPath);
}

/**
 * User Registration Server Action.
 */
export async function registerWithCredentialsAction(params: {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
}): Promise<AuthActionResult> {
  const { email, fullName, password, confirmPassword } = params;
  const normalizedEmail = email.trim().toLowerCase();

  // 1. Validate Form Fields
  if (!email || !fullName || !password) {
    return { success: false, error: 'กรุณากรอกข้อมูลให้ครบทุกช่อง' };
  }

  if (password !== confirmPassword) {
    return { success: false, error: 'รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน' };
  }

  // 2. Validate Password Strength
  const strengthCheck = validatePasswordStrength(password);
  if (!strengthCheck.isValid) {
    return {
      success: false,
      error: `รหัสผ่านไม่ปลอดภัย: ${strengthCheck.feedback.join(', ')}`,
    };
  }

  // 3. Rate Limit Registration
  const rateCheck = checkRateLimit('register', normalizedEmail, 5, 60 * 60);
  if (!rateCheck.allowed) {
    return { success: false, error: 'มีการลงทะเบียนบ่อยเกินไป กรุณารอสักครู่' };
  }

  // 4. Attempt Real Supabase SignUp with Auto-Confirm
  try {
    const admin = createAdminClient();
    const supabase = await createServerSupabaseClient();

    if (admin) {
      const { data: createData, error: createError } = await admin.auth.admin.createUser({
        email: normalizedEmail,
        password,
        email_confirm: true,
        user_metadata: {
          full_name: fullName,
          role: 'student',
        },
      });

      if (createError) {
        if (createError.message.toLowerCase().includes('already') || createError.message.toLowerCase().includes('exists')) {
          return { success: false, error: 'อีเมลนี้ถูกลงทะเบียนไว้แล้ว กรุณาเข้าสู่ระบบ' };
        }
        return { success: false, error: `ไม่สามารถลงทะเบียนได้: ${createError.message}` };
      }

      if (createData?.user) {
        // Upsert into profiles
        await admin.from('profiles').upsert({
          id: createData.user.id,
          email: normalizedEmail,
          full_name: fullName,
          role: 'student',
          is_email_verified: true,
        });

        // Sign in on SSR client
        if (supabase) {
          await supabase.auth.signInWithPassword({
            email: normalizedEmail,
            password,
          });
        }

        await setServerSessionUser(createData.user.id);
        redirect('/dashboard');
      }
    }
  } catch (err: any) {
    if (err?.message?.includes('NEXT_REDIRECT') || err?.digest?.includes('NEXT_REDIRECT')) {
      throw err;
    }
  }

  // 5. Fallback Registration
  const regResult = await registerUser({
    email: normalizedEmail,
    full_name: fullName,
    password,
    role: 'student',
  });

  if (!regResult.success || !regResult.profile) {
    return { success: false, error: regResult.error || 'การลงทะเบียนไม่สำเร็จ' };
  }

  await setServerSessionUser(regResult.profile.id);
  redirect('/dashboard');
}

/**
 * Logout Action.
 */
export async function logoutAction() {
  try {
    const supabase = await createServerSupabaseClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
  } catch {
    // Ignore
  }
  await clearServerSessionUser();
  redirect('/login');
}

/**
 * Forgot Password Request Action.
 */
export async function requestPasswordResetAction(email: string): Promise<AuthActionResult> {
  const normalized = email.trim().toLowerCase();
  const rate = checkRateLimit('password_reset', normalized, 3, 3600);
  if (!rate.allowed) {
    return { success: false, error: 'ส่งคำขอบ่อยเกินไป กรุณารอ 1 ชั่วโมง' };
  }

  recordRateLimitAttempt('password_reset', normalized, 3, 3600);

  const result = await requestPasswordReset(normalized);

  try {
    const supabase = await createServerSupabaseClient();
    if (supabase) {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
      await supabase.auth.resetPasswordForEmail(normalized, {
        redirectTo: `${siteUrl}/reset-password`,
      });
    }
  } catch {
    // Ignore and fallback
  }

  return { success: true, data: { resetToken: result.resetToken } };
}

/**
 * Reset Password with Token Action.
 */
export async function resetPasswordAction(params: {
  token: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<AuthActionResult> {
  const { token, newPassword, confirmPassword } = params;

  if (newPassword !== confirmPassword) {
    return { success: false, error: 'รหัสผ่านทั้งสองช่องไม่ตรงกัน' };
  }

  const strength = validatePasswordStrength(newPassword);
  if (!strength.isValid) {
    return { success: false, error: `รหัสผ่านไม่ผ่านเกณฑ์: ${strength.feedback.join(', ')}` };
  }

  const result = await resetPasswordWithToken(token, newPassword);
  if (!result.success) {
    return { success: false, error: result.error };
  }

  return { success: true };
}

/**
 * Change Password Action (Settings).
 */
export async function changePasswordAction(params: {
  userId: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<AuthActionResult> {
  const { userId, currentPassword, newPassword, confirmPassword } = params;

  if (newPassword !== confirmPassword) {
    return { success: false, error: 'รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน' };
  }

  const strength = validatePasswordStrength(newPassword);
  if (!strength.isValid) {
    return { success: false, error: `รหัสผ่านใหม่ไม่ปลอดภัย: ${strength.feedback.join(', ')}` };
  }

  const result = await changeUserPassword(userId, currentPassword, newPassword);
  return result;
}

/**
 * Revoke Active Session Action.
 */
export async function revokeSessionAction(sessionId: string, userId: string): Promise<AuthActionResult> {
  const success = await revokeUserSession(sessionId, userId);
  return { success };
}

/**
 * Revoke All Other Active Sessions Action.
 */
export async function revokeAllOtherSessionsAction(userId: string, currentSessionId: string): Promise<AuthActionResult> {
  const count = await revokeAllOtherSessions(userId, currentSessionId);
  return { success: true, data: { count } };
}

/**
 * Verify Email Action.
 */
export async function verifyEmailAction(token: string): Promise<AuthActionResult> {
  const res = await verifyEmailWithToken(token);
  return res;
}

/**
 * Resend Email Verification Action.
 */
export async function resendVerificationEmailAction(userId: string): Promise<AuthActionResult> {
  const res = await requestEmailVerification(userId);
  return { success: res.success, data: { token: res.token } };
}
