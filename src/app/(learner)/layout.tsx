import { requireStudent } from '@/lib/auth/server-guard';
import { LearnerShell } from '@/components/learner/learner-shell';

export default async function LearnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await requireStudent();

  return <LearnerShell profile={profile}>{children}</LearnerShell>;
}
