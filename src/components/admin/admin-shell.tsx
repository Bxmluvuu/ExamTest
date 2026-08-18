'use client';

import * as React from 'react';
import { AdminSidebar } from './admin-sidebar';
import { AdminMobileNav } from './admin-mobile-nav';
import { UserProvider } from '@/lib/auth/user-context';
import type { Profile } from '@/lib/types/database';

export function AdminShell({
  profile,
  children,
}: {
  profile: Profile;
  children: React.ReactNode;
}) {
  return (
    <UserProvider initialProfile={profile}>
      <div className="min-h-screen flex flex-col md:flex-row bg-[var(--background)] text-[var(--foreground)]">
        {/* Desktop Sidebar (256px) */}
        <AdminSidebar profile={profile} />

        {/* Compact Mobile Navigation Top Bar + Drawer */}
        <AdminMobileNav profile={profile} />

        {/* Main Content Area */}
        <div className="flex-1 md:pl-64 flex flex-col min-w-0">
          <main className="flex-1 min-w-0 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </UserProvider>
  );
}
