'use client';

import * as React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RetryButtonProps extends Omit<ButtonProps, 'children'> {
  onRetry: () => void | Promise<void>;
  label?: string;
  isRetrying?: boolean;
}

/**
 * Accessible RetryButton with spinner feedback and keyboard support.
 */
export function RetryButton({
  onRetry,
  label = 'ลองใหม่อีกครั้ง',
  isRetrying = false,
  className,
  variant = 'outline',
  size = 'sm',
  ...props
}: RetryButtonProps) {
  const [loading, setLoading] = React.useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await onRetry();
    } finally {
      setLoading(false);
    }
  };

  const isLoading = isRetrying || loading;

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={isLoading}
      isLoading={isLoading}
      className={cn('inline-flex items-center gap-1.5', className)}
      {...props}
    >
      {!isLoading && <RotateCcw className="h-3.5 w-3.5" />}
      <span>{label}</span>
    </Button>
  );
}
