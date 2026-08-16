'use client';

import * as React from 'react';
import { FileText, CheckCircle2, AlertCircle, RefreshCw, X } from 'lucide-react';
import { AnimatedProgress } from './animated-progress';
import { cn } from '@/lib/utils';

export interface UploadProgressProps {
  fileName: string;
  fileSize?: string;
  progress: number; // 0 - 100
  status: 'uploading' | 'processing' | 'completed' | 'error';
  errorMessage?: string;
  onCancel?: () => void;
  onRetry?: () => void;
  className?: string;
}

/**
 * UploadProgress component for file and document uploads with clear feedback.
 */
export function UploadProgress({
  fileName,
  fileSize,
  progress,
  status,
  errorMessage,
  onCancel,
  onRetry,
  className,
}: UploadProgressProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'p-3.5 rounded-[var(--radius)] border bg-[var(--surface)] shadow-xs space-y-2.5 text-xs',
        status === 'error' ? 'border-red-200 bg-red-50/20' : 'border-[var(--border)]',
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="h-8 w-8 rounded bg-[var(--primary-subtle)] text-[var(--primary)] flex items-center justify-center shrink-0">
            <FileText className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-[var(--foreground)] truncate">{fileName}</div>
            <div className="text-[11px] text-[var(--foreground-muted)]">
              {fileSize && <span>{fileSize} • </span>}
              {status === 'uploading' && `กำลังอัปโหลด ${Math.round(progress)}%`}
              {status === 'processing' && 'กำลังประมวลผล OCR & Indexing...'}
              {status === 'completed' && 'อัปโหลดเสร็จสมบูรณ์'}
              {status === 'error' && (errorMessage || 'เกิดข้อผิดพลาดในการอัปโหลด')}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {status === 'completed' && (
            <CheckCircle2 className="h-4 w-4 text-[var(--success)]" />
          )}
          {status === 'error' && (
            <AlertCircle className="h-4 w-4 text-[var(--danger)]" />
          )}
          {status === 'uploading' && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="p-1 text-[var(--foreground-muted)] hover:text-[var(--foreground)] rounded"
              aria-label="Cancel upload"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          {status === 'error' && onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="p-1 text-[var(--primary)] hover:underline flex items-center gap-1 text-[11px]"
            >
              <RefreshCw className="h-3 w-3" />
              <span>ลองใหม่</span>
            </button>
          )}
        </div>
      </div>

      {(status === 'uploading' || status === 'processing') && (
        <AnimatedProgress
          value={status === 'processing' ? 100 : progress}
          indicatorClassName={status === 'processing' ? 'bg-purple-600 animate-pulse' : 'bg-[var(--primary)]'}
        />
      )}
    </div>
  );
}
