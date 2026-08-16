import { HeaderSkeleton, MetricSkeleton, ChartSkeleton, ListSkeleton } from '@/components/ui/skeleton';

export default function AnalyticsLoading() {
  return (
    <div className="space-y-6 motion-fade-in">
      <HeaderSkeleton />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricSkeleton />
        <MetricSkeleton />
        <MetricSkeleton />
        <MetricSkeleton />
      </div>
      <ChartSkeleton />
      <ListSkeleton rows={4} />
    </div>
  );
}
