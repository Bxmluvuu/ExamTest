'use client';

import * as React from 'react';
import { Button, ButtonProps } from './button';
import { cn } from '@/lib/utils';

export interface ButtonLoadingProps extends ButtonProps {
  loadingText?: string;
}

/**
 * ButtonLoading component wrapper that maintains fixed width and prevents layout shift during async operations.
 */
export function ButtonLoading({
  isLoading,
  loadingText = 'กำลังดำเนินการ...',
  children,
  className,
  disabled,
  ...props
}: ButtonLoadingProps) {
  return (
    <Button
      isLoading={isLoading}
      disabled={disabled || isLoading}
      className={cn('relative transition-all', className)}
      {...props}
    >
      {isLoading ? loadingText : children}
    </Button>
  );
}
