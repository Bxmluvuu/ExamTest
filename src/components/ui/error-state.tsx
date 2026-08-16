'use client';

import * as React from 'react';
import { AlertCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { RetryButton } from './retry-button';
import { Button } from './button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void | Promise<void>;
  retryLabel?: string;
  backHref?: string;
  backLabel?: string;
  className?: string;
  variant?: 'inline' | 'card' | 'page';
}

/**
 * Standardized ErrorState component with accessible role="alert".
 */
export function ErrorState({
  title = 'เกิดข้อผิดพลาดในการโหลดข้อมูล',
  description = 'ไม่สามารถเชื่อมต่อหรือประมวลผลข้อมูลได้ กรุณาลองใหม่อีกครั้ง',
  onRetry,
  retryLabel = 'ลองใหม่อีกครั้ง',
  backHref,
  backLabel = 'กลับสู่หน้าหลัก',
  className,
  variant = 'card',
}: ErrorStateProps) {
  const content = (
    <div
      role="alert"
      className={cn(
        'text-center space-y-3',
        variant === 'page' && 'min-h-[360px] flex flex-col items-center justify-center p-8',
        variant === 'card' && 'p-8 rounded-[var(--radius)] bg-[var(--surface)] border border-red-200 shadow-xs',
        variant === 'inline' && 'p-4 rounded-[var(--radius)] bg-red-50/50 border border-red-200 text-left flex items-start gap-3',
        className
      )}
    >
      <div className={cn(
        'rounded-full flex items-center justify-center shrink-0 mx-auto',
        variant === 'inline' ? 'h-8 w-8 bg-red-100 text-rose-600' : 'h-12 w-12 bg-red-100 text-rose-600 mb-1'
      )}>
        <AlertCircle className={cn(variant === 'inline' ? 'h-4 w-4' : 'h-6 w-6')} />
      </div>

      <div className={cn('space-y-1', variant === 'inline' && 'flex-1')}>
        <h3 className="text-sm sm:text-base font-bold text-rose-800">{title}</h3>
        <p className="text-xs text-[var(--foreground-muted)] max-w-md mx-auto leading-relaxed">
          {description}
        </p>

        {(onRetry || backHref) && (
          <div className={cn('flex flex-wrap items-center gap-2 pt-3', variant === 'inline' ? 'justify-start' : 'justify-center')}>
            {onRetry && (
              <RetryButton onRetry={onRetry} label={retryLabel} />
            )}
            {backHref && (
              <Button asChild variant="ghost" size="sm" className="text-xs">
                <Link href={backHref}>{backLabel}</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return content;
}
