import { cookies } from 'next/headers';
import { getDataStore, setCurrentSessionUser } from '@/lib/db-adapter';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import type { Profile, UserRole } from '@/lib/types/database';

export const SESSION_COOKIE_NAME = 'exam_session_user';

/**
 * Reads the active user profile on the server.
 * Checks Supabase Auth session first, then session cookie.
 * Returns null if the visitor is anonymous (not logged in).
 */
export async function getServerProfile(): Promise<Profile | null> {
  try {
    // 1. Try Supabase Auth session if configured
    const supabase = await createServerSupabaseClient();
    if (supabase) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profile) {
          return profile as Profile;
        }

        // Return fallback profile from Supabase user data
        return {
          id: user.id,
          email: user.email || '',
          full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
          role: (user.user_metadata?.role as UserRole) || 'student',
          is_email_verified: Boolean(user.email_confirmed_at),
          created_at: user.created_at || new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
      }
    }
  } catch {
    // Supabase auth check failed or not configured, continue to cookie check
  }

  // 2. Cookie check (reads HTTP-only session cookie)
  try {
    const cookieStore = await cookies();
    const sessionUserId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (sessionUserId) {
      // Check Supabase profiles table directly
      const supabase = await createServerSupabaseClient();
      if (supabase) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', sessionUserId)
          .single();

        if (profile) return profile as Profile;
      }

      const store = getDataStore();
      const found = store.profiles.find(p => p.id === sessionUserId);
      if (found) return found;
    }
  } catch {
    // cookies() may fail outside request context
  }

  // 3. Anonymous visitor (not logged in) -> MUST return null
  return null;
}

/**
 * Sets the active session user cookie.
 */
export async function setServerSessionUser(
  userId: string,
  maxAgeSeconds: number = 60 * 60 * 24 * 7 // 7 days default
): Promise<void> {
  setCurrentSessionUser(userId);
  try {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, userId, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: maxAgeSeconds,
    });
  } catch {
    // Called in client or environment where cookies() cannot be mutated directly
  }
}

/**
 * Clears the active session user cookie.
 */
export async function clearServerSessionUser(): Promise<void> {
  setCurrentSessionUser('');
  try {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
  } catch {
    // Ignore
  }
}
