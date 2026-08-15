import { describe, it, expect, beforeEach } from 'vitest';
import {
  validatePasswordStrength,
  hashPassword,
  verifyPassword,
  isPasswordInHistory,
} from '@/lib/auth/password';
import {
  checkRateLimit,
  recordRateLimitAttempt,
  resetRateLimit,
  clearAllRateLimits,
} from '@/lib/auth/rate-limit';
import {
  generateSecureToken,
  generateNumericCode,
  createAuthToken,
  validateAuthToken,
  consumeAuthToken,
  clearAllTokens,
} from '@/lib/auth/tokens';
import { safeRedirectPath } from '@/lib/auth/server-guard';
import {
  registerUser,
  authenticateWithPassword,
  changeUserPassword,
  createUserSession,
  revokeUserSession,
  revokeAllOtherSessions,
  getUserSessions,
  verifyEmailWithToken,
  requestPasswordReset,
  resetPasswordWithToken,
  resetDataStore,
  getDataStore,
} from '@/lib/db-adapter';

describe('Production Authentication & Security System', () => {
  beforeEach(() => {
    resetDataStore();
    clearAllRateLimits();
    clearAllTokens();
  });

  describe('1. Password Strength & Crypto Hashing', () => {
    it('rejects passwords shorter than 8 characters', () => {
      const result = validatePasswordStrength('Short1!');
      expect(result.isValid).toBe(false);
      expect(result.criteria.minLength).toBe(false);
    });

    it('rejects passwords without numbers or special symbols', () => {
      const result = validatePasswordStrength('alllowercaseonly');
      expect(result.isValid).toBe(false);
      expect(result.criteria.hasUppercase).toBe(false);
      expect(result.criteria.hasNumber).toBe(false);
    });

    it('accepts strong passwords meeting security criteria', () => {
      const result = validatePasswordStrength('P@ssw0rdSecure2026!');
      expect(result.isValid).toBe(true);
      expect(result.score).toBeGreaterThanOrEqual(3);
      expect(result.criteria.minLength).toBe(true);
      expect(result.criteria.hasUppercase).toBe(true);
      expect(result.criteria.hasLowercase).toBe(true);
      expect(result.criteria.hasNumber).toBe(true);
      expect(result.criteria.hasSpecial).toBe(true);
    });

    it('hashes passwords with PBKDF2 and verifies accurately', async () => {
      const plain = 'MySecretPass123!';
      const hash = await hashPassword(plain);

      expect(hash).toMatch(/^pbkdf2:sha256:100000:[a-f0-9]+:[a-f0-9]+$/);
      expect(await verifyPassword(plain, hash)).toBe(true);
      expect(await verifyPassword('WrongPassword123!', hash)).toBe(false);
    });

    it('detects and prevents reuse of passwords in history', async () => {
      const h1 = await hashPassword('OldPass123!');
      const h2 = await hashPassword('PreviousPass456!');

      expect(await isPasswordInHistory('OldPass123!', [h1, h2])).toBe(true);
      expect(await isPasswordInHistory('PreviousPass456!', [h1, h2])).toBe(true);
      expect(await isPasswordInHistory('BrandNewPassword789!', [h1, h2])).toBe(false);
    });
  });

  describe('2. Rate Limiting & Account Lockout', () => {
    it('allows requests within rate limit threshold', () => {
      const identifier = 'user@example.com';
      const check1 = checkRateLimit('login', identifier, 5, 60);
      expect(check1.allowed).toBe(true);
      expect(check1.remaining).toBe(5);

      const rec1 = recordRateLimitAttempt('login', identifier, 5, 60);
      expect(rec1.allowed).toBe(true);
      expect(rec1.remaining).toBe(4);
    });

    it('locks account after reaching maximum failed attempts', () => {
      const email = 'victim@example.com';

      // 5 failed attempts
      for (let i = 0; i < 4; i++) {
        const res = recordRateLimitAttempt('login', email, 5, 60, 15);
        expect(res.allowed).toBe(true);
      }

      // 5th attempt triggers lockout
      const fifth = recordRateLimitAttempt('login', email, 5, 60, 15);
      expect(fifth.allowed).toBe(false);
      expect(fifth.isLocked).toBe(true);
      expect(fifth.retryAfterSeconds).toBeGreaterThan(0);

      // Subsequent check confirms locked status
      const checkLocked = checkRateLimit('login', email, 5, 60);
      expect(checkLocked.allowed).toBe(false);
      expect(checkLocked.isLocked).toBe(true);
    });

    it('resets rate limit on successful authentication', () => {
      const email = 'user@example.com';
      recordRateLimitAttempt('login', email, 5, 60);
      resetRateLimit('login', email);

      const check = checkRateLimit('login', email, 5, 60);
      expect(check.allowed).toBe(true);
      expect(check.remaining).toBe(5);
    });
  });

  describe('3. Cryptographic Tokens & Lifecycle', () => {
    it('generates secure random hex tokens and numeric codes', () => {
      const token = generateSecureToken(32);
      expect(token).toHaveLength(64);

      const code = generateNumericCode(6);
      expect(code).toMatch(/^[0-9]{6}$/);
    });

    it('creates, validates, and consumes auth tokens once', () => {
      const { rawToken } = createAuthToken('u-001', 'test@example.com', 'password_reset', 30);

      // Validate token
      const val = validateAuthToken(rawToken, 'password_reset');
      expect(val.valid).toBe(true);
      expect(val.record?.email).toBe('test@example.com');

      // Consume token
      const consume = consumeAuthToken(rawToken, 'password_reset');
      expect(consume.success).toBe(true);

      // Cannot consume twice
      const secondConsume = consumeAuthToken(rawToken, 'password_reset');
      expect(secondConsume.success).toBe(false);
      expect(secondConsume.error).toContain('ถูกใช้งานไปแล้ว');
    });
  });

  describe('4. Registration & Authentication Flow', () => {
    it('registers new student account and prevents duplicate emails', async () => {
      const reg = await registerUser({
        email: 'newstudent@example.com',
        full_name: 'นักเรียน ใหม่',
        password: 'Password123!',
      });

      expect(reg.success).toBe(true);
      expect(reg.profile?.role).toBe('student');
      expect(reg.profile?.is_email_verified).toBe(false);

      // Duplicate registration attempt
      const dup = await registerUser({
        email: 'newstudent@example.com',
        full_name: 'นักเรียน ซ้ำ',
        password: 'Password123!',
      });
      expect(dup.success).toBe(false);
      expect(dup.error).toContain('ลงทะเบียนในระบบแล้ว');
    });

    it('authenticates valid credentials and audits the event', async () => {
      const auth = await authenticateWithPassword('student@example.com', 'password123');
      expect(auth.success).toBe(true);
      expect(auth.profile?.email).toBe('student@example.com');

      const store = getDataStore();
      const audit = store.auth_audit_logs.find(a => a.event_type === 'login_success');
      expect(audit).toBeDefined();
    });

    it('rejects invalid password and logs failed attempt', async () => {
      const auth = await authenticateWithPassword('student@example.com', 'wrong_pass');
      expect(auth.success).toBe(false);

      const store = getDataStore();
      const audit = store.auth_audit_logs.find(a => a.event_type === 'login_failed');
      expect(audit).toBeDefined();
    });
  });

  describe('5. Multi-Device Sessions & Password Management', () => {
    it('tracks active device sessions and allows revoking individual sessions', async () => {
      const sess1 = await createUserSession('u-student-001', 'MacBook Pro Chrome');
      const sess2 = await createUserSession('u-student-001', 'iPhone Safari Mobile');

      const sessions = await getUserSessions('u-student-001');
      expect(sessions.length).toBeGreaterThanOrEqual(2);

      const revoked = await revokeUserSession(sess2.id, 'u-student-001');
      expect(revoked).toBe(true);

      const activeAfter = await getUserSessions('u-student-001');
      expect(activeAfter.some(s => s.id === sess2.id)).toBe(false);
    });

    it('revokes all other sessions except current session', async () => {
      const sess1 = await createUserSession('u-student-001', 'Device 1');
      const sess2 = await createUserSession('u-student-001', 'Device 2');
      const sess3 = await createUserSession('u-student-001', 'Device 3');

      const revokedCount = await revokeAllOtherSessions('u-student-001', sess1.id);
      expect(revokedCount).toBeGreaterThanOrEqual(2);

      const remaining = await getUserSessions('u-student-001');
      expect(remaining.length).toBe(1);
      expect(remaining[0].id).toBe(sess1.id);
    });

    it('changes password and verifies current password requirement', async () => {
      // Wrong current password
      const bad = await changeUserPassword('u-student-001', 'wrong_old', 'NewPass123!');
      expect(bad.success).toBe(false);
      expect(bad.error).toContain('รหัสผ่านปัจจุบันไม่ถูกต้อง');

      // Successful change
      const good = await changeUserPassword('u-student-001', 'password123', 'NewPass123!');
      expect(good.success).toBe(true);

      // Cannot reuse immediate previous password
      const reuse = await changeUserPassword('u-student-001', 'NewPass123!', 'NewPass123!');
      expect(reuse.success).toBe(false);
      expect(reuse.error).toContain('ไม่สามารถใช้รหัสผ่านเดิม');
    });
  });

  describe('6. Open Redirect Protection', () => {
    it('allows valid internal paths and normalizes fallback', () => {
      expect(safeRedirectPath('/dashboard')).toBe('/dashboard');
      expect(safeRedirectPath('/admin/questions')).toBe('/admin/questions');
      expect(safeRedirectPath('/subjects/database-systems')).toBe('/subjects/database-systems');
    });

    it('blocks dangerous open redirect URLs and protocol-relative paths', () => {
      expect(safeRedirectPath('https://evil-site.com', '/dashboard')).toBe('/dashboard');
      expect(safeRedirectPath('//attacker.com/steal-token', '/dashboard')).toBe('/dashboard');
      expect(safeRedirectPath('/\\evil.com', '/dashboard')).toBe('/dashboard');
      expect(safeRedirectPath(undefined, '/dashboard')).toBe('/dashboard');
    });
  });
});
