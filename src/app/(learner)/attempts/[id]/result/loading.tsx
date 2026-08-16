import { HeaderSkeleton, MetricSkeleton, ListSkeleton, SectionSkeleton } from '@/components/ui/skeleton';

export default function ResultLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 motion-fade-in">
      <div className="p-6 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--border)] space-y-4">
        <HeaderSkeleton />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[var(--border)]">
          <MetricSkeleton />
          <MetricSkeleton />
          <MetricSkeleton />
          <MetricSkeleton />
        </div>
      </div>
      <SectionSkeleton className="min-h-[220px]" />
      <ListSkeleton rows={3} />
    </div>
  );
}
