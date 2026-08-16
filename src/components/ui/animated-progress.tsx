'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/lib/use-reduced-motion';

export interface AnimatedProgressProps {
  value: number; // 0 - 100
  max?: number;
  className?: string;
  indicatorClassName?: string;
  showLabel?: boolean;
}

/**
 * AnimatedProgress bar with smooth easing and reduced-motion awareness.
 */
export function AnimatedProgress({
  value,
  max = 100,
  className,
  indicatorClassName,
  showLabel = false,
}: AnimatedProgressProps) {
  const reducedMotion = useReducedMotion();
  const clamped = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="w-full space-y-1">
      {showLabel && (
        <div className="flex justify-between text-xs text-[var(--foreground-muted)] font-medium">
          <span>ความคืบหน้า</span>
          <span>{Math.round(clamped)}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={Math.round(clamped)}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn('relative h-2 w-full overflow-hidden rounded-full bg-[var(--surface-strong)]', className)}
      >
        <div
          className={cn(
            'h-full bg-[var(--primary)] rounded-full',
            reducedMotion ? '' : 'transition-[width] duration-300 ease-out',
            indicatorClassName
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
