'use client';

import * as React from 'react';
import { CheckCircle2, RefreshCw, AlertCircle, Cloud } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SaveStatusState = 'idle' | 'saving' | 'saved' | 'error';

export interface SaveStatusProps {
  status: SaveStatusState;
  className?: string;
  savedLabel?: string;
  savingLabel?: string;
  errorLabel?: string;
  idleLabel?: string;
  showIcon?: boolean;
}

/**
 * SaveStatus Component for smooth, non-intrusive feedback during auto-saving.
 * Includes accessible aria-live announcement.
 */
export function SaveStatus({
  status,
  className,
  savedLabel = 'บันทึกคำตอบแล้ว',
  savingLabel = 'กำลังบันทึก...',
  errorLabel = 'บันทึกไม่สำเร็จ',
  idleLabel = 'พร้อมบันทึก',
  showIcon = true,
}: SaveStatusProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'inline-flex items-center gap-1.5 text-xs font-medium transition-opacity duration-150',
        status === 'saving' && 'text-blue-600',
        status === 'saved' && 'text-[var(--success)]',
        status === 'error' && 'text-[var(--danger)]',
        status === 'idle' && 'text-[var(--foreground-muted)]',
        className
      )}
    >
      {showIcon && (
        <span className="shrink-0 flex items-center">
          {status === 'saving' && <RefreshCw className="h-3.5 w-3.5 animate-spin" />}
          {status === 'saved' && <CheckCircle2 className="h-3.5 w-3.5" />}
          {status === 'error' && <AlertCircle className="h-3.5 w-3.5" />}
          {status === 'idle' && <Cloud className="h-3.5 w-3.5" />}
        </span>
      )}
      <span>
        {status === 'saving' && savingLabel}
        {status === 'saved' && savedLabel}
        {status === 'error' && errorLabel}
        {status === 'idle' && idleLabel}
      </span>
    </div>
  );
}
