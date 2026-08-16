import { HeaderSkeleton, MetricSkeleton, TableSkeleton } from '@/components/ui/skeleton';

export default function AdminRootLoading() {
  return (
    <div className="space-y-6 motion-fade-in">
      <HeaderSkeleton />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricSkeleton />
        <MetricSkeleton />
        <MetricSkeleton />
        <MetricSkeleton />
      </div>
      <TableSkeleton rows={5} cols={5} />
    </div>
  );
}
