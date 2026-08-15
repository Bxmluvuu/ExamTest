import { redirect } from 'next/navigation';
import { getServerProfile } from './session';
import type { Profile } from '@/lib/types/database';

/**
 * Validates a redirect path to prevent Open Redirect vulnerabilities.
 * Ensures the target is an absolute local path (e.g. /dashboard or /admin/questions).
 */
export function safeRedirectPath(nextPath?: string | null, fallbackPath: string = '/dashboard'): string {
  if (!nextPath || typeof nextPath !== 'string') {
    return fallbackPath;
  }

  // Must start with '/' and not start with '//' (protocol-relative URL)
  if (nextPath.startsWith('/') && !nextPath.startsWith('//') && !nextPath.includes('\\')) {
    return nextPath;
  }

  return fallbackPath;
}

/**
 * Server Guard: Ensures the user is authenticated.
 * If anonymous, redirects to /login?next=<safe-current-path>.
 */
export async function requireUser(options?: { redirectTo?: string }): Promise<Profile> {
  const profile = await getServerProfile();

  if (!profile) {
    const next = options?.redirectTo ? `?next=${encodeURIComponent(safeRedirectPath(options.redirectTo, '/dashboard'))}` : '';
    redirect(`/login${next}`);
  }

  return profile;
}

/**
 * Server Guard: Ensures the user is authorized to access the Learner App.
 * Both students and admins (testing learner view) can access.
 * If anonymous, redirects to /login?next=<safe-current-path>.
 */
export async function requireStudent(options?: { redirectTo?: string }): Promise<Profile> {
  const profile = await requireUser(options);
  return profile;
}

/**
 * Server Guard: Ensures the user has 'admin' role.
 * - Anonymous -> /login?next=<safe-admin-path>
 * - Student -> /unauthorized
 * - Admin -> returns Profile
 */
export async function requireAdmin(options?: { redirectTo?: string }): Promise<Profile> {
  const profile = await getServerProfile();

  if (!profile) {
    const next = options?.redirectTo ? `?next=${encodeURIComponent(safeRedirectPath(options.redirectTo, '/admin'))}` : '?next=/admin';
    redirect(`/login${next}`);
  }

  if (profile.role !== 'admin') {
    // Student attempting to access /admin route directly
    redirect('/unauthorized');
  }

  return profile;
}

/**
 * Gets the current profile without throwing a redirect.
 */
export async function getCurrentProfile(): Promise<Profile | null> {
  return getServerProfile();
}

/**
 * Server-side check helper for APIs & Server Actions to verify Admin permission.
 */
export async function assertAdminPermission(): Promise<Profile> {
  const profile = await getServerProfile();
  if (!profile || profile.role !== 'admin') {
    throw new Error('Forbidden: Admin permission required');
  }
  return profile;
}
