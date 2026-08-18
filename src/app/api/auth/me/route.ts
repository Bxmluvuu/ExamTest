import { NextResponse } from 'next/server';
import { getServerProfile } from '@/lib/auth/session';

export async function GET() {
  const profile = await getServerProfile();
  if (!profile) {
    return NextResponse.json({ profile: null }, { status: 401 });
  }

  return NextResponse.json({ profile });
}
