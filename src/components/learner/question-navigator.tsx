'use client';

import * as React from 'react';
import { Bookmark, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function QuestionNavigator({
  totalQuestions,
  currentIndex,
  onSelectIndex,
  answeredMap,
  bookmarkedSet,
  className,
}: {
  totalQuestions: number;
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  answeredMap: Record<number, boolean>;
  bookmarkedSet: Set<number>;
  className?: string;
}) {
  const answeredCount = Object.values(answeredMap).filter(Boolean).length;

  return (
    <div className={cn('p-4 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--border)]', className)}>
      <div className="flex items-center justify-between mb-3 text-xs">
        <span className="font-semibold text-[var(--foreground)]">ภาพรวมข้อสอบ</span>
        <span className="text-[var(--foreground-muted)] font-medium">
          ตอบแล้ว <strong className="text-[var(--primary)]">{answeredCount}</strong> / {totalQuestions}
        </span>
      </div>

      {/* Grid of numbers */}
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-5 gap-1.5">
        {Array.from({ length: totalQuestions }, (_, i) => {
          const isCurrent = i === currentIndex;
          const isAnswered = Boolean(answeredMap[i]);
          const isBookmarked = bookmarkedSet.has(i);

          return (
            <button
              key={i}
              onClick={() => onSelectIndex(i)}
              className={cn(
                'relative h-9 w-full rounded font-medium text-xs flex items-center justify-center transition-all cursor-pointer select-none',
                isCurrent && 'ring-2 ring-[var(--primary)] ring-offset-1 z-10 font-bold',
                isAnswered
                  ? 'bg-[var(--primary-subtle)] text-[var(--primary)] border border-blue-200'
                  : 'bg-[var(--surface-subtle)] text-[var(--foreground-secondary)] border border-[var(--border)] hover:bg-[var(--surface-strong)]'
              )}
              aria-label={`Go to question ${i + 1}${isAnswered ? ' (Answered)' : ''}${isBookmarked ? ' (Bookmarked)' : ''}`}
            >
              <span>{i + 1}</span>
              {isBookmarked && (
                <span className="absolute top-0.5 right-0.5 text-amber-500">
                  <Bookmark className="h-2.5 w-2.5 fill-current" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-[var(--border)] grid grid-cols-2 gap-2 text-[11px] text-[var(--foreground-muted)]">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded bg-[var(--primary-subtle)] border border-blue-200" />
          <span>ตอบแล้ว</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded bg-[var(--surface-subtle)] border border-[var(--border)]" />
          <span>ยังไม่ตอบ</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded ring-1 ring-[var(--primary)] bg-white" />
          <span>ข้อปัจจุบัน</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Bookmark className="h-3 w-3 text-amber-500 fill-current" />
          <span>บันทึกไว้</span>
        </div>
      </div>
    </div>
  );
}
