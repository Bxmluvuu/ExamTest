'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShieldAlert,
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
  LogOut,
  ExternalLink,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { quickDemoLoginAction, logoutAction } from '@/lib/auth/auth-actions';
import type { Profile } from '@/lib/types/database';

interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean;
}

interface AdminNavSection {
  title: string;
  items: AdminNavItem[];
}

export function AdminSidebar({ profile }: { profile: Profile }) {
  const pathname = usePathname();

  const sections: AdminNavSection[] = [
    {
      title: 'ภาพรวมระบบ',
      items: [
        { label: 'ภาพรวมระบบ', href: '/admin', icon: LayoutDashboard, exact: true },
      ],
    },
    {
      title: 'เนื้อหา',
      items: [
        { label: 'รายวิชา', href: '/admin/subjects', icon: BookOpen },
        { label: 'บทและหัวข้อ', href: '/admin/chapters', icon: Layers },
        { label: 'เอกสาร & สไลด์', href: '/admin/documents', icon: FileText },
      ],
    },
    {
      title: 'ข้อสอบ',
      items: [
        { label: 'คลังคำถาม', href: '/admin/questions', icon: Database },
        { label: 'Exam Blueprints', href: '/admin/blueprints', icon: Sliders },
        { label: 'รายงานคุณภาพ', href: '/admin/reports', icon: Flag },
      ],
    },
    {
      title: 'Pipeline',
      items: [
        { label: 'AI Generation Runs', href: '/admin/generation-runs', icon: Sparkles },
      ],
    },
    {
      title: 'ระบบ',
      items: [
        { label: 'บันทึกการทำงาน (Audit Logs)', href: '/admin/audit-logs', icon: FileSpreadsheet },
        { label: 'ตั้งค่าระบบ', href: '/admin/settings', icon: Settings },
      ],
    },
  ];

  const handleSwitchToLearner = async () => {
    await quickDemoLoginAction('student', '/dashboard');
  };

  const handleLogout = async () => {
    await logoutAction();
  };

  return (
    <aside
      className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r border-[var(--border)] bg-[var(--surface)] z-30 select-none"
      aria-label="Admin Navigation"
    >
      {/* Brand & Admin Console Header */}
      <div className="h-14 px-4 border-b border-[var(--border)] flex items-center justify-between bg-[var(--surface)]">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            <ShieldAlert className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs font-bold leading-none text-[var(--foreground)]">ExamPlatform</div>
            <div className="text-[10px] font-semibold text-[var(--primary)] uppercase tracking-wider mt-0.5">
              Admin Console
            </div>
          </div>
        </Link>
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-[var(--primary)] border border-blue-200 uppercase">
          Ops
        </span>
      </div>

      {/* Structured Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        {sections.map((sec, sIdx) => (
          <div key={sIdx} className="space-y-1">
            <div className="px-2.5 text-[10px] font-bold tracking-wider text-[var(--foreground-muted)] uppercase">
              {sec.title}
            </div>
            <nav className="space-y-0.5" aria-label={sec.title}>
              {sec.items.map(item => {
                const Icon = item.icon;
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'flex items-center gap-2.5 px-2.5 py-1.5 text-xs font-medium rounded-[var(--radius)] transition-colors relative min-h-[34px]',
                      isActive
                        ? 'bg-[var(--primary-subtle)] text-[var(--primary)] font-semibold'
                        : 'text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle)]'
                    )}
                  >
                    <Icon className={cn('h-3.5 w-3.5 shrink-0', isActive ? 'text-[var(--primary)]' : 'text-[var(--foreground-muted)]')} />
                    <span className="truncate">{item.label}</span>
                    {isActive && (
                      <div className="absolute left-0 top-1 bottom-1 w-0.5 rounded-r-full bg-[var(--primary)]" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Admin Footer & Action to View Learner App */}
      <div className="p-3 border-t border-[var(--border)] bg-[var(--surface-subtle)]/40 space-y-2">
        {/* User Card */}
        <div className="flex items-center gap-2 p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] shadow-2xs">
          <div className="h-7 w-7 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
            {profile.full_name?.charAt(0) || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-[var(--foreground)] truncate">{profile.full_name}</div>
            <div className="text-[10px] text-zinc-500 font-medium">Administrator</div>
          </div>
        </div>

        {/* Action: เปิดมุมมองผู้เรียน */}
        <button
          onClick={handleSwitchToLearner}
          className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-semibold rounded-[var(--radius)] bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition-colors shadow-xs cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>เปิดมุมมองผู้เรียน</span>
          </span>
          <ExternalLink className="h-3 w-3 opacity-80" />
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-1.5 py-1 text-[11px] font-medium text-[var(--foreground-muted)] hover:text-rose-600 rounded transition-colors cursor-pointer"
        >
          <LogOut className="h-3 w-3" />
          <span>ออกจากระบบ</span>
        </button>
      </div>
    </aside>
  );
}
