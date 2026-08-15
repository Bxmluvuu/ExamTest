'use server';

import { redirect } from 'next/navigation';
import { setServerSessionUser, clearServerSessionUser } from './session';
import { safeRedirectPath } from './server-guard';
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

export interface AuthActionResult {
  success: boolean;
  error?: string;
  isLocked?: boolean;
  retryAfterSeconds?: number;
  data?: any;
}

/**
 * Full Email + Password Login Server Action with brute-force protection.
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

  // 2. Authenticate
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

  // 3. Reset rate limit on success
  resetRateLimit('login', normalizedEmail);

  // 4. Set Session Cookie (7 days for rememberMe, 1 day default)
  const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7;
  await setServerSessionUser(authResult.profile.id, maxAge);

  // 5. Determine Redirect
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
 * Direct Login by User ID (for Demo testing).
 */
export async function loginWithUserIdAction(targetUserId: string, nextUrl?: string) {
  await setServerSessionUser(targetUserId);

  const store = getDataStore();
  const user = store.profiles.find(p => p.id === targetUserId);

  if (user?.role === 'admin') {
    const dest = safeRedirectPath(nextUrl, '/admin');
    redirect(dest.startsWith('/admin') ? dest : '/admin');
  } else {
    const dest = safeRedirectPath(nextUrl, '/dashboard');
    redirect(dest.startsWith('/admin') ? '/dashboard' : dest);
  }
}

/**
 * Quick Demo Role Switch Action.
 */
export async function quickDemoLoginAction(role: 'student' | 'admin', nextUrl?: string) {
  const targetId = role === 'admin' ? 'u-admin-001' : 'u-student-001';
  await setServerSessionUser(targetId);

  if (role === 'admin') {
    const dest = safeRedirectPath(nextUrl, '/admin');
    redirect(dest.startsWith('/admin') ? dest : '/admin');
  } else {
    const dest = safeRedirectPath(nextUrl, '/dashboard');
    redirect(dest.startsWith('/admin') ? '/dashboard' : dest);
  }
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

  // 4. Register
  const regResult = await registerUser({
    email: normalizedEmail,
    full_name: fullName,
    password,
    role: 'student',
  });

  if (!regResult.success || !regResult.profile) {
    return { success: false, error: regResult.error || 'การลงทะเบียนไม่สำเร็จ' };
  }

  // 5. Establish Session
  await setServerSessionUser(regResult.profile.id);

  redirect('/dashboard');
}

/**
 * Logout Action.
 */
export async function logoutAction() {
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
