'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/lib/use-reduced-motion';

export function PageTransition({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        !reducedMotion && 'motion-fade-in',
        className
      )}
    >
      {children}
    </div>
  );
}
