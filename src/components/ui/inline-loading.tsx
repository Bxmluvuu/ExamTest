'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InlineLoadingProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * InlineLoading component for spinners with accessible status text.
 */
export function InlineLoading({
  text = 'กำลังโหลด...',
  size = 'md',
  className,
}: InlineLoadingProps) {
  const spinnerSize = size === 'sm' ? 'h-3.5 w-3.5' : size === 'lg' ? 'h-6 w-6' : 'h-4 w-4';
  const textSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm';

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn('inline-flex items-center gap-2 text-[var(--foreground-muted)]', className)}
    >
      <svg className={cn('animate-spin text-[var(--primary)]', spinnerSize)} viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
      {text && <span className={cn('font-medium', textSize)}>{text}</span>}
    </div>
  );
}
