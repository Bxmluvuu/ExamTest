import * as React from 'react';
import { LucideIcon, Inbox } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
  className?: string;
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center rounded-[var(--radius)] border border-dashed border-[var(--border-strong)] bg-[var(--surface)]/50',
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface-subtle)] text-[var(--foreground-muted)] mb-3">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-[var(--foreground)] mb-1">{title}</h3>
      <p className="text-sm text-[var(--foreground-muted)] max-w-sm mb-4 leading-relaxed">{description}</p>
      {actionLabel && (
        actionHref ? (
          <Button asChild variant="primary" size="sm">
            <a href={actionHref}>{actionLabel}</a>
          </Button>
        ) : (
          <Button variant="primary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        )
      )}
    </div>
  );
}
