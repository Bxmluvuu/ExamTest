import { HeaderSkeleton, MetricSkeleton, SubjectSkeleton, ChartSkeleton, ListSkeleton } from '@/components/ui/skeleton';

export default function DashboardLoading() {
  return (
    <div className="space-y-6 motion-fade-in">
      <HeaderSkeleton />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricSkeleton />
        <MetricSkeleton />
        <MetricSkeleton />
        <MetricSkeleton />
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
