'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShieldAlert,
  Menu,
  X,
  LayoutDashboard,
  BookOpen,
  Layers,
  FileText,
  Database,
  Sliders,
  Sparkles,
  Flag,
  FileSpreadsheet,
  Settings,
  GraduationCap,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { logoutAction } from '@/lib/auth/auth-actions';
import type { Profile } from '@/lib/types/database';

export function AdminMobileNav({ profile }: { profile: Profile }) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  React.useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  const navItems = [
    { label: 'ภาพรวมระบบ', href: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'จัดการรายวิชา', href: '/admin/subjects', icon: BookOpen },
    { label: 'บทและหัวข้อ', href: '/admin/chapters', icon: Layers },
    { label: 'เอกสาร & สไลด์', href: '/admin/documents', icon: FileText },
    { label: 'คลังคำถาม', href: '/admin/questions', icon: Database },
    { label: 'Exam Blueprints', href: '/admin/blueprints', icon: Sliders },
    { label: 'รายงานคุณภาพ', href: '/admin/reports', icon: Flag },
    { label: 'AI Generation Runs', href: '/admin/generation-runs', icon: Sparkles },
    { label: 'Audit Logs', href: '/admin/audit-logs', icon: FileSpreadsheet },
    { label: 'ตั้งค่าระบบ', href: '/admin/settings', icon: Settings },
  ];

  return (
    <>
      {/* Compact Admin Mobile Top Bar */}
      <header className="md:hidden sticky top-0 z-40 h-14 border-b border-[var(--border)] bg-[var(--surface)] px-4 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2 font-semibold text-sm text-[var(--foreground)]">
          <div className="h-7 w-7 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            <ShieldAlert className="h-4 w-4" />
          </div>
          <div>
            <span className="font-bold">ExamPlatform</span>
            <span className="ml-1 text-[10px] font-bold text-[var(--primary)] uppercase">Admin</span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="p-1.5 rounded-md text-[var(--foreground)] hover:bg-[var(--surface-subtle)] border border-[var(--border)]"
            aria-label="Toggle Admin Menu"
          >
            {drawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Admin Mobile Navigation Drawer */}
      {drawerOpen && (
        <div
          className="md:hidden fixed inset-0 top-14 z-50 bg-black/40 backdrop-blur-xs flex flex-col"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="bg-[var(--surface)] border-b border-[var(--border)] p-4 space-y-4 max-h-[85vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-zinc-900 text-white font-bold text-xs flex items-center justify-center">
                  {profile.full_name?.charAt(0) || 'A'}
                </div>
                <div>
                  <div className="text-xs font-semibold text-[var(--foreground)]">{profile.full_name}</div>
                  <div className="text-[10px] text-zinc-500 font-medium">Administrator</div>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[var(--primary)] border border-blue-200">
                Admin Console
              </span>
            </div>

            <nav className="space-y-1" aria-label="Admin Mobile Navigation">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-[var(--radius)] transition-colors',
                      isActive
                        ? 'bg-[var(--primary-subtle)] text-[var(--primary)] font-semibold'
                        : 'text-[var(--foreground)] hover:bg-[var(--surface-subtle)]'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-[var(--border)] space-y-2">
              <Link
                href="/dashboard"
                onClick={() => setDrawerOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold bg-[var(--primary)] text-white"
              >
                <GraduationCap className="h-4 w-4" />
                <span>เปิดมุมมองผู้เรียน (Learner View)</span>
              </Link>

              <button
                onClick={() => {
                  logoutAction();
                  setDrawerOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 border border-rose-200"
              >
                <LogOut className="h-4 w-4" />
                <span>ออกจากระบบ</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
