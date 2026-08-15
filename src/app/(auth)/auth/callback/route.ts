import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { setServerSessionUser } from '@/lib/auth/session';
import { safeRedirectPath } from '@/lib/auth/server-guard';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') || '/dashboard';

  let safeRedirect = safeRedirectPath(next, '/dashboard');

  if (code) {
    try {
      const supabase = await createServerSupabaseClient();
      if (supabase) {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error && data?.user) {
          await setServerSessionUser(data.user.id);
          const role = data.user.user_metadata?.role || 'student';
          if (role === 'admin' && !safeRedirect.startsWith('/admin')) {
            safeRedirect = '/admin';
          }
        }
      }
    } catch {
      // Ignore fallback
    }
  }

  return NextResponse.redirect(new URL(safeRedirect, origin));
}
