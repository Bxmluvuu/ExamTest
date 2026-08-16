import { HeaderSkeleton, MetricSkeleton, ListSkeleton, SectionSkeleton } from '@/components/ui/skeleton';

export default function SubjectDetailLoading() {
  return (
    <div className="space-y-6 motion-fade-in">
      <HeaderSkeleton />
      <div className="flex gap-4 border-b border-[var(--border)] pb-2">
        <div className="h-6 w-20 bg-[var(--surface-strong)] rounded animate-pulse" />
        <div className="h-6 w-28 bg-[var(--surface-strong)] rounded animate-pulse" />
        <div className="h-6 w-28 bg-[var(--surface-strong)] rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricSkeleton />
        <MetricSkeleton />
        <MetricSkeleton />
      </div>
      <SectionSkeleton className="min-h-[280px]" />
    </div>
  );
}
