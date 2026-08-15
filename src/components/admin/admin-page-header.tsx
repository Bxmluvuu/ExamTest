import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ChevronRight, ShieldAlert } from 'lucide-react';

export function AdminPageHeader({
  breadcrumbs,
  title,
  subtitle,
  badges,
  actions,
  className,
}: {
  breadcrumbs?: Array<{ label: string; href?: string }>;
  title: string;
  subtitle?: string;
  badges?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn('mb-6 space-y-2', className)}>
      {/* Admin Console Breadcrumb & Tag */}
      <div className="flex items-center gap-2 text-xs text-[var(--foreground-muted)] flex-wrap">
        <div className="inline-flex items-center gap-1 font-semibold text-zinc-900 bg-zinc-100 px-1.5 py-0.5 rounded text-[10px] uppercase border border-zinc-200">
          <ShieldAlert className="h-3 w-3" />
          <span>Admin Console</span>
        </div>

        {breadcrumbs && breadcrumbs.length > 0 && (
          <>
            <ChevronRight className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
            {breadcrumbs.map((b, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <ChevronRight className="h-3.5 w-3.5 text-zinc-400 shrink-0" />}
                {b.href ? (
                  <Link href={b.href} className="hover:text-[var(--foreground)] hover:underline">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-[var(--foreground)] font-medium">{b.label}</span>
                )}
              </React.Fragment>
            ))}
          </>
        )}
      </div>

      {/* Main Title & Action Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-1">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
              {title}
            </h1>
            {badges && <div className="flex items-center gap-1.5">{badges}</div>}
          </div>
          {subtitle && (
            <p className="text-xs text-[var(--foreground-muted)] mt-1 max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
    </header>
  );
}
