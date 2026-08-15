'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  History,
  BarChart3,
  Bookmark,
  Settings,
  LogOut,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { quickDemoLoginAction, logoutAction } from '@/lib/auth/auth-actions';
import type { Profile } from '@/lib/types/database';

export function LearnerSidebar({ profile }: { profile: Profile }) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: 'ภาพรวม', href: '/dashboard', icon: LayoutDashboard, exact: true },
    { label: 'วิชาของฉัน', href: '/subjects', icon: BookOpen },
    { label: 'ฝึกทำข้อสอบ', href: '/practice/new', icon: GraduationCap },
    { label: 'ประวัติการสอบ', href: '/history', icon: History },
    { label: 'ผลการเรียน & สถิติ', href: '/analytics', icon: BarChart3 },
    { label: 'ข้อที่บันทึกไว้', href: '/bookmarks', icon: Bookmark },
  ];

  const handleSwitchToAdmin = async () => {
    await quickDemoLoginAction('admin', '/admin');
  };

  const handleLogout = async () => {
    await logoutAction();
  };

  return (
    <aside
      className="hidden md:flex md:w-60 md:flex-col md:fixed md:inset-y-0 border-r border-[var(--border)] bg-[var(--surface)] z-30 select-none"
      aria-label="Learner Navigation"
    >
      {/* Brand Header */}
      <div className="h-14 px-4 border-b border-[var(--border)] flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2.5 font-semibold text-base text-[var(--foreground)]">
          <div className="h-7 w-7 rounded-lg bg-[var(--primary)] text-white flex items-center justify-center font-bold text-sm shadow-xs">
            E
          </div>
          <span className="tracking-tight font-bold">ExamPlatform</span>
        </Link>
        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[var(--surface-subtle)] text-[var(--foreground-muted)] border border-[var(--border)]">
          ผู้เรียน
        </span>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-[var(--foreground-muted)] uppercase">
          เมนูหลัก
        </div>

        <nav className="space-y-1" aria-label="เมนูหลักของผู้เรียน">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-[var(--radius)] transition-colors relative min-h-[38px]',
                  isActive
                    ? 'bg-[var(--primary-subtle)] text-[var(--primary)] font-semibold'
                    : 'text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle)]'
                )}
              >
                <Icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-[var(--primary)]' : 'text-[var(--foreground-muted)]')} />
                <span className="truncate">{item.label}</span>
                {isActive && (
                  <div className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-[var(--primary)]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Footer with Profile & Actions */}
      <div className="p-3 border-t border-[var(--border)] bg-[var(--surface-subtle)]/40 space-y-2">
        {/* User Card */}
        <div className="flex items-center gap-2.5 p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] shadow-2xs">
          <div className="h-8 w-8 rounded-full bg-[var(--primary-subtle)] text-[var(--primary)] flex items-center justify-center text-xs font-bold shrink-0">
            {profile.full_name?.charAt(0) || 'S'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-[var(--foreground)] truncate">{profile.full_name}</div>
            <div className="text-[10px] text-[var(--foreground-muted)] truncate">{profile.email}</div>
          </div>
        </div>

        {/* If Admin is viewing learner app, provide clean return action */}
        {profile.role === 'admin' && (
          <button
            onClick={handleSwitchToAdmin}
            className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-medium rounded-[var(--radius)] bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>เปิดมุมมองผู้ดูแล (Admin)</span>
            </span>
            <ExternalLink className="h-3 w-3" />
          </button>
        )}

        <div className="flex gap-1 pt-1">
          <Link
            href="/settings"
            className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 text-[11px] font-medium text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] rounded border border-[var(--border)] transition-colors"
          >
            <Settings className="h-3 w-3" />
            <span>ตั้งค่าบัญชี</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center p-1.5 text-[var(--foreground-muted)] hover:text-rose-600 hover:bg-rose-50 rounded border border-[var(--border)] transition-colors cursor-pointer"
            aria-label="ออกจากระบบ"
            title="ออกจากระบบ"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
