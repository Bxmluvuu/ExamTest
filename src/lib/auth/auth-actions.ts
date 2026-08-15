'use server';

import { redirect } from 'next/navigation';
import { setServerSessionUser, clearServerSessionUser } from './session';
import { safeRedirectPath } from './server-guard';
import { getDataStore } from '@/lib/db-adapter';

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

export async function logoutAction() {
  await clearServerSessionUser();
  redirect('/login');
}
