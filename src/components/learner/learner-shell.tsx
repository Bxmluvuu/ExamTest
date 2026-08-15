'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { LearnerSidebar } from './learner-sidebar';
import { LearnerMobileNav } from './learner-mobile-nav';
import type { Profile } from '@/lib/types/database';

export function LearnerShell({
  profile,
  children,
}: {
  profile: Profile;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Active exam runner uses Focus Mode (minimal shell, no sidebar / bottom nav)
  const isExamFocusMode = pathname.startsWith('/attempts/') && !pathname.endsWith('/result');

  if (isExamFocusMode) {
    return (
      <main className="min-h-screen bg-[var(--background)] flex flex-col">
        {children}
      </main>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[var(--background)] text-[var(--foreground)]">
      {/* Desktop Sidebar (240px) */}
      <LearnerSidebar profile={profile} />

      {/* Mobile Top & Bottom Navigation */}
      <LearnerMobileNav profile={profile} />

      {/* Main Content Area */}
      <div className="flex-1 md:pl-60 flex flex-col min-w-0 pb-16 md:pb-0">
        <main className="flex-1 min-w-0 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
