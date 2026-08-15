import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'outline' | 'subtle';
  size?: 'sm' | 'md';
}

export function Badge({ className, variant = 'default', size = 'md', ...props }: BadgeProps) {
  const base = 'inline-flex items-center font-medium rounded-md border transition-colors select-none';

  const variants = {
    default: 'bg-[var(--surface-subtle)] text-[var(--foreground-secondary)] border-[var(--border)]',
    primary: 'bg-[var(--primary-subtle)] text-[var(--primary)] border-blue-200',
    success: 'bg-[var(--success-subtle)] text-[var(--success)] border-green-200',
    warning: 'bg-[var(--warning-subtle)] text-[var(--warning)] border-amber-200',
    danger: 'bg-[var(--danger-subtle)] text-[var(--danger)] border-red-200',
    outline: 'bg-transparent text-[var(--foreground-secondary)] border-[var(--border-strong)]',
    subtle: 'bg-[var(--surface-subtle)] text-[var(--foreground)] border-transparent',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
  };

  return <div className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}
