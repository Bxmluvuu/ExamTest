import type { Metadata } from 'next';
import { requireAdmin } from '@/lib/auth/server-guard';
import { AdminShell } from '@/components/admin/admin-shell';

export const metadata: Metadata = {
  title: {
    default: 'Admin Console | ExamPlatform',
    template: '%s | Admin | ExamPlatform',
  },
  description: 'ศูนย์ควบคุมและจัดการเนื้อหา ข้อสอบ Blueprint และ AI Pipeline',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side Admin Authorization Guard
  const profile = await requireAdmin();

  return <AdminShell profile={profile}>{children}</AdminShell>;
}
