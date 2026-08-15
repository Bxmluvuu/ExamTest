import { getRandomValues, createHash } from 'crypto';

export interface AuthTokenRecord {
  tokenHash: string;
  userId: string;
  email: string;
  tokenType: 'email_verification' | 'password_reset' | 'magic_link';
  expiresAt: number;
  consumed: boolean;
  metadata?: Record<string, any>;
}

// In-memory token store for verification & resets (persisted in data store as well)
const tokenStore = new Map<string, AuthTokenRecord>();

/**
 * Generates a cryptographically random hex token.
 */
export function generateSecureToken(bytes: number = 32): string {
  const buffer = new Uint8Array(bytes);
  getRandomValues(buffer);
  return Buffer.from(buffer).toString('hex');
}

/**
 * Generates a 6-digit numeric verification code for email/SMS.
 */
export function generateNumericCode(digits: number = 6): string {
  const buffer = new Uint8Array(4);
  getRandomValues(buffer);
  const num = (buffer[0] << 24) | (buffer[1] << 16) | (buffer[2] << 8) | buffer[3];
  const positive = Math.abs(num);
  const str = (positive % Math.pow(10, digits)).toString().padStart(digits, '0');
  return str;
}

/**
 * Hashes a token using SHA-256 for secure database storage.
 */
export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

/**
 * Creates and stores an authentication token with expiration.
 */
export function createAuthToken(
  userId: string,
  email: string,
  tokenType: AuthTokenRecord['tokenType'],
  ttlMinutes: number = 60
): { rawToken: string; expiresAt: string } {
  const rawToken = generateSecureToken(32);
  const tokenHash = hashToken(rawToken);
  const expiresAt = Date.now() + ttlMinutes * 60 * 1000;

  const record: AuthTokenRecord = {
    tokenHash,
    userId,
    email: email.toLowerCase(),
    tokenType,
    expiresAt,
    consumed: false,
  };

  tokenStore.set(tokenHash, record);

  return {
    rawToken,
    expiresAt: new Date(expiresAt).toISOString(),
  };
}

/**
 * Validates a raw token without consuming it.
 */
export function validateAuthToken(
  rawToken: string,
  tokenType: AuthTokenRecord['tokenType']
): { valid: boolean; record?: AuthTokenRecord; error?: string } {
  const tokenHash = hashToken(rawToken);
  const record = tokenStore.get(tokenHash);

  if (!record) {
    return { valid: false, error: 'โทเค็นไม่ถูกต้องหรือไม่พบในระบบ' };
  }

  if (record.tokenType !== tokenType) {
    return { valid: false, error: 'ประเภทของโทเค็นไม่ตรงกับคำขอ' };
  }

  if (record.consumed) {
    return { valid: false, error: 'โทเค็นนี้ถูกใช้งานไปแล้ว' };
  }

  if (Date.now() > record.expiresAt) {
    return { valid: false, error: 'โทเค็นนี้หมดอายุแล้ว กรุณาทำรายการใหม่อีกครั้ง' };
  }

  return { valid: true, record };
}

/**
 * Consumes (marks used) a valid token.
 */
export function consumeAuthToken(
  rawToken: string,
  tokenType: AuthTokenRecord['tokenType']
): { success: boolean; record?: AuthTokenRecord; error?: string } {
  const check = validateAuthToken(rawToken, tokenType);
  if (!check.valid || !check.record) {
    return { success: false, error: check.error };
  }

  check.record.consumed = true;
  return { success: true, record: check.record };
}

/**
 * Clear token store (for testing).
 */
export function clearAllTokens(): void {
  tokenStore.clear();
}
