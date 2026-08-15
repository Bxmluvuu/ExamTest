import * as React from 'react';
import { cn } from '@/lib/utils';

export function LearnerPageHeader({
  title,
  description,
  context,
  actions,
  className,
}: {
  title: string;
  description?: string;
  context?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn('mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between', className)}>
      <div className="space-y-1">
        {context && <div className="text-xs font-medium text-[var(--foreground-muted)]">{context}</div>}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">{title}</h1>
        {description && <p className="text-sm text-[var(--foreground-muted)] max-w-2xl">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2.5 shrink-0 pt-1 sm:pt-0">{actions}</div>}
    </header>
  );
}
