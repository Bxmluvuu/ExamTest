import * as React from 'react';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[var(--background)] selection:bg-[var(--primary-subtle)] selection:text-[var(--primary)]">
      <div className="w-full max-w-md space-y-4">
        {children}
      </div>
    </div>
  );
}
