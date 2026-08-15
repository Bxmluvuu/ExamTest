import { redirect } from 'next/navigation';
import { getServerProfile } from '@/lib/auth/session';

export default async function RootPage() {
  const profile = await getServerProfile();

  if (!profile) {
    redirect('/login');
  }

  if (profile.role === 'admin') {
    redirect('/admin');
  }

  redirect('/dashboard');
}
