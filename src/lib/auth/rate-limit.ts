interface RateLimitEntry {
  count: number;
  firstAttemptAt: number;
  lastAttemptAt: number;
  lockedUntil?: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export interface RateLimitCheckResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
  isLocked: boolean;
}

/**
 * Checks rate limit for a specific action and identifier (e.g. login, register, password_reset).
 */
export function checkRateLimit(
  action: string,
  identifier: string,
  maxAttempts: number = 5,
  windowSeconds: number = 60 * 15 // 15 minutes default
): RateLimitCheckResult {
  const key = `${action}:${identifier.toLowerCase()}`;
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry) {
    return {
      allowed: true,
      remaining: maxAttempts,
      retryAfterSeconds: 0,
      isLocked: false,
    };
  }

  // Check if account is temporarily locked
  if (entry.lockedUntil && entry.lockedUntil > now) {
    const retryAfterSeconds = Math.ceil((entry.lockedUntil - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds,
      isLocked: true,
    };
  }

  // Check if window has expired
  const windowMs = windowSeconds * 1000;
  if (now - entry.firstAttemptAt > windowMs) {
    // Window expired, reset
    rateLimitStore.delete(key);
    return {
      allowed: true,
      remaining: maxAttempts,
      retryAfterSeconds: 0,
      isLocked: false,
    };
  }

  const remaining = Math.max(0, maxAttempts - entry.count);
  const allowed = entry.count < maxAttempts;
  const retryAfterSeconds = allowed ? 0 : Math.ceil((entry.firstAttemptAt + windowMs - now) / 1000);

  return {
    allowed,
    remaining,
    retryAfterSeconds,
    isLocked: false,
  };
}

/**
 * Records a failed attempt for rate limiting and locks out if threshold reached.
 */
export function recordRateLimitAttempt(
  action: string,
  identifier: string,
  maxAttempts: number = 5,
  windowSeconds: number = 60 * 15,
  lockoutMinutes: number = 15
): RateLimitCheckResult {
  const key = `${action}:${identifier.toLowerCase()}`;
  const now = Date.now();
  const entry = rateLimitStore.get(key);
  const windowMs = windowSeconds * 1000;

  if (!entry || now - entry.firstAttemptAt > windowMs) {
    const newEntry: RateLimitEntry = {
      count: 1,
      firstAttemptAt: now,
      lastAttemptAt: now,
    };
    rateLimitStore.set(key, newEntry);
    return {
      allowed: true,
      remaining: maxAttempts - 1,
      retryAfterSeconds: 0,
      isLocked: false,
    };
  }

  entry.count += 1;
  entry.lastAttemptAt = now;

  if (entry.count >= maxAttempts) {
    entry.lockedUntil = now + lockoutMinutes * 60 * 1000;
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: lockoutMinutes * 60,
      isLocked: true,
    };
  }

  return {
    allowed: true,
    remaining: maxAttempts - entry.count,
    retryAfterSeconds: 0,
    isLocked: false,
  };
}

/**
 * Resets rate limit counter upon successful operation (e.g. successful login).
 */
export function resetRateLimit(action: string, identifier: string): void {
  const key = `${action}:${identifier.toLowerCase()}`;
  rateLimitStore.delete(key);
}

/**
 * Clears all rate limit memory (useful for test setup).
 */
export function clearAllRateLimits(): void {
  rateLimitStore.clear();
}
