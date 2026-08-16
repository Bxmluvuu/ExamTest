import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  circle?: boolean;
}

/**
 * Basic Skeleton component with shimmer effect.
 */
export function Skeleton({ className, circle = false, ...props }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading..."
      className={cn(
        'skeleton-shimmer bg-[var(--surface-subtle)]',
        circle ? 'rounded-full' : 'rounded-[var(--radius)]',
        className
      )}
      {...props}
    />
  );
}

/**
 * Metric Card Skeleton (matches MetricStrip card).
 */
export function MetricSkeleton() {
  return (
    <div className="p-4 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--border)] space-y-2">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton circle className="h-7 w-7" />
      </div>
      <Skeleton className="h-7 w-16" />
      <Skeleton className="h-3 w-32" />
    </div>
  );
}

/**
 * Header Skeleton for page titles.
 */
export function HeaderSkeleton() {
  return (
    <div className="space-y-2 pb-2">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-96 max-w-full" />
    </div>
  );
}

/**
 * Subject Card Skeleton.
 */
export function SubjectSkeleton() {
  return (
    <div className="p-5 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--border)] space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Skeleton circle className="h-10 w-10 shrink-0" />
          <div className="space-y-1.5">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-3 w-28" />
          </div>
        </div>
        <Skeleton className="h-5 w-16" />
      </div>
      <Skeleton className="h-3 w-full" />
      <div className="pt-2 border-t border-[var(--border)] flex justify-between items-center">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-24 rounded" />
      </div>
    </div>
  );
}

/**
 * Chart Skeleton matching TrendChart height & structure.
 */
export function ChartSkeleton({ height = 'h-64' }: { height?: string }) {
  return (
    <div className="p-5 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--border)] space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="h-6 w-20" />
      </div>
      <div className={cn('w-full flex items-end gap-3 pt-4 px-2', height)}>
        <Skeleton className="h-1/3 flex-1 rounded-t" />
        <Skeleton className="h-1/2 flex-1 rounded-t" />
        <Skeleton className="h-2/3 flex-1 rounded-t" />
        <Skeleton className="h-3/4 flex-1 rounded-t" />
        <Skeleton className="h-full flex-1 rounded-t" />
      </div>
      <Skeleton className="h-8 w-full rounded" />
    </div>
  );
}

/**
 * List Item / Topic Accuracy Skeleton.
 */
export function ListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="p-5 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--border)] space-y-3">
      <Skeleton className="h-5 w-48 mb-2" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="p-3 rounded bg-[var(--surface-subtle)] border border-[var(--border)] flex items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-4 w-12" />
        </div>
      ))}
    </div>
  );
}

/**
 * Table Skeleton matching Admin Data Tables.
 */
export function TableSkeleton({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--border)] overflow-hidden">
      <div className="p-4 border-b border-[var(--border)] flex justify-between items-center">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-8 w-32" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-[var(--surface-subtle)] border-b border-[var(--border)]">
            <tr>
              {Array.from({ length: cols }).map((_, i) => (
                <th key={i} className="p-3">
                  <Skeleton className="h-4 w-20" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {Array.from({ length: rows }).map((_, r) => (
              <tr key={r}>
                {Array.from({ length: cols }).map((_, c) => (
                  <td key={c} className="p-3">
                    <Skeleton className="h-4 w-full max-w-[120px]" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * Question / Exam Focus Mode Skeleton.
 */
export function QuestionSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="p-6 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--border)] space-y-6">
        <div className="flex justify-between items-center border-b border-[var(--border)] pb-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="h-8 w-4/5" />
        <div className="space-y-3 pt-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-4 rounded border border-[var(--border)] flex items-center gap-3">
              <Skeleton circle className="h-7 w-7 shrink-0" />
              <Skeleton className="h-4 flex-1" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-10 w-28" />
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-10 w-28" />
      </div>
    </div>
  );
}

/**
 * Document / PDF Viewer Skeleton.
 */
export function DocumentSkeleton() {
  return (
    <div className="rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--border)] overflow-hidden space-y-4">
      <div className="p-3 border-b border-[var(--border)] bg-[var(--surface-subtle)] flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Skeleton circle className="h-8 w-8" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
      <div className="min-h-[440px] bg-zinc-100 p-8 flex items-center justify-center">
        <div className="w-full max-w-3xl min-h-[380px] bg-white rounded-lg border border-zinc-200 p-8 space-y-6">
          <div className="flex justify-between border-b border-zinc-100 pb-4">
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <div className="p-4 rounded bg-zinc-50 border border-zinc-200 space-y-2 mt-6">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
            <Skeleton className="h-3 w-40" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Form Skeleton.
 */
export function FormSkeleton({ fields = 3 }: { fields?: number }) {
  return (
    <div className="p-6 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--border)] space-y-4">
      <Skeleton className="h-5 w-40 mb-2" />
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-1.5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
      <div className="pt-2 flex justify-end gap-2">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-28" />
      </div>
    </div>
  );
}

/**
 * Section Skeleton (Generic container).
 */
export function SectionSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('p-5 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--border)] space-y-4', className)}>
      <Skeleton className="h-5 w-48" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}

/**
 * Full Page Skeleton for dashboard / overview.
 */
export function PageSkeleton() {
  return (
    <div className="space-y-6 motion-fade-in">
      <HeaderSkeleton />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <MetricSkeleton key={i} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SubjectSkeleton />
        <SubjectSkeleton />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <ChartSkeleton />
        </div>
        <div className="lg:col-span-6">
          <ListSkeleton />
        </div>
      </div>
    </div>
  );
}
