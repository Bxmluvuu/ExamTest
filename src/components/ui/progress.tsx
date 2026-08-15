import * as React from 'react';
import { cn } from '@/lib/utils';

export function Progress({
  value = 0,
  max = 100,
  className,
  indicatorClassName,
}: {
  value?: number;
  max?: number;
  className?: string;
  indicatorClassName?: string;
}) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cn('relative h-2 w-full overflow-hidden rounded-full bg-[var(--surface-strong)]', className)}
    >
      <div
        className={cn('h-full bg-[var(--primary)] transition-all duration-300 ease-in-out', indicatorClassName)}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-[var(--radius)] bg-[var(--surface-strong)]', className)}
      {...props}
    />
  );
}
