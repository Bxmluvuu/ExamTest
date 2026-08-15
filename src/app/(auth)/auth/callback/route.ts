import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const next = searchParams.get('next') || '/dashboard';

  // Open Redirect Protection
  let safeRedirectUrl = '/dashboard';

  if (next.startsWith('/') && !next.startsWith('//')) {
    safeRedirectUrl = next;
  } else {
    try {
      const parsedUrl = new URL(next);
      if (parsedUrl.origin === origin) {
        safeRedirectUrl = parsedUrl.pathname + parsedUrl.search;
      }
    } catch {
      safeRedirectUrl = '/dashboard';
    }
  }

  return NextResponse.redirect(new URL(safeRedirectUrl, origin));
}
