'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  BarChart3,
  MoreHorizontal,
  History,
  Bookmark,
  Settings,
  LogOut,
  X,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { quickDemoLoginAction, logoutAction } from '@/lib/auth/auth-actions';
import type { Profile } from '@/lib/types/database';

export function LearnerMobileNav({ profile }: { profile: Profile }) {
  const pathname = usePathname();
  const [moreMenuOpen, setMoreMenuOpen] = React.useState(false);

  // Close sheet on route change
  React.useEffect(() => {
    setMoreMenuOpen(false);
  }, [pathname]);

  const mainTabs = [
    { label: 'ภาพรวม', href: '/dashboard', icon: LayoutDashboard, exact: true },
    { label: 'วิชา', href: '/subjects', icon: BookOpen },
    { label: 'ฝึกทำ', href: '/practice/new', icon: GraduationCap },
    { label: 'สถิติ', href: '/analytics', icon: BarChart3 },
  ];

  return (
    <>
      {/* Mobile Top Header */}
      <header className="md:hidden sticky top-0 z-40 h-14 border-b border-[var(--border)] bg-[var(--surface)] px-4 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-sm text-[var(--foreground)]">
          <div className="h-7 w-7 rounded-lg bg-[var(--primary)] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            E
          </div>
          <span>ExamPlatform</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[var(--surface-subtle)] text-[var(--foreground-muted)] border border-[var(--border)]">
            ผู้เรียน
          </span>
        </div>
      </header>

      {/* Mobile Drawer Sheet for "More" options */}
      {moreMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex flex-col justify-end animate-in fade-in"
          onClick={() => setMoreMenuOpen(false)}
        >
          <div
            className="bg-[var(--surface)] border-t border-[var(--border)] rounded-t-2xl p-5 space-y-4 max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-[var(--primary-subtle)] text-[var(--primary)] font-bold text-xs flex items-center justify-center">
                  {profile.full_name?.charAt(0) || 'S'}
                </div>
                <div>
                  <div className="text-xs font-semibold text-[var(--foreground)]">{profile.full_name}</div>
                  <div className="text-[10px] text-[var(--foreground-muted)]">{profile.email}</div>
                </div>
              </div>
              <button
                onClick={() => setMoreMenuOpen(false)}
                className="p-1 rounded-full text-[var(--foreground-muted)] hover:bg-[var(--surface-subtle)]"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-1">
              <div className="text-[11px] font-semibold text-[var(--foreground-muted)] uppercase px-2 mb-1">
                เมนูเพิ่มเติม
              </div>

              <Link
                href="/history"
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  pathname.startsWith('/history') ? 'bg-[var(--primary-subtle)] text-[var(--primary)]' : 'text-[var(--foreground)] hover:bg-[var(--surface-subtle)]'
                )}
              >
                <History className="h-4 w-4 text-[var(--primary)]" />
                <span>ประวัติการสอบ (History)</span>
              </Link>

              <Link
                href="/bookmarks"
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  pathname.startsWith('/bookmarks') ? 'bg-[var(--primary-subtle)] text-[var(--primary)]' : 'text-[var(--foreground)] hover:bg-[var(--surface-subtle)]'
                )}
              >
                <Bookmark className="h-4 w-4 text-amber-600" />
                <span>ข้อที่บันทึกไว้ (Bookmarks)</span>
              </Link>

              <Link
                href="/settings"
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  pathname.startsWith('/settings') ? 'bg-[var(--primary-subtle)] text-[var(--primary)]' : 'text-[var(--foreground)] hover:bg-[var(--surface-subtle)]'
                )}
              >
                <Settings className="h-4 w-4 text-[var(--foreground-muted)]" />
                <span>ตั้งค่าบัญชี (Settings)</span>
              </Link>
            </div>

            {profile.role === 'admin' && (
              <div className="pt-2 border-t border-[var(--border)]">
                <button
                  onClick={() => quickDemoLoginAction('admin', '/admin')}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>เปิดมุมมองผู้ดูแล (Admin Console)</span>
                </button>
              </div>
            )}

            <div className="pt-2 border-t border-[var(--border)]">
              <button
                onClick={() => logoutAction()}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>ออกจากระบบ</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar (Fixed - Exactly 5 items) */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 h-14 bg-[var(--surface)] border-t border-[var(--border)] flex items-center justify-around px-1 select-none"
        aria-label="Learner Mobile Bottom Navigation"
      >
        {mainTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = tab.exact
            ? pathname === tab.href
            : pathname === tab.href || pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex flex-col items-center justify-center flex-1 h-full text-[10px] gap-0.5 min-w-[56px] transition-colors',
                isActive ? 'text-[var(--primary)] font-semibold' : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{tab.label}</span>
            </Link>
          );
        })}

        {/* 5th item: More / Sheet */}
        <button
          onClick={() => setMoreMenuOpen(true)}
          className={cn(
            'flex flex-col items-center justify-center flex-1 h-full text-[10px] gap-0.5 min-w-[56px] cursor-pointer transition-colors',
            moreMenuOpen || pathname.startsWith('/history') || pathname.startsWith('/bookmarks') || pathname.startsWith('/settings')
              ? 'text-[var(--primary)] font-semibold'
              : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
          )}
          aria-label="เมนูเพิ่มเติม"
        >
          <MoreHorizontal className="h-4 w-4 shrink-0" />
          <span>เพิ่มเติม</span>
        </button>
      </nav>
    </>
  );
}
