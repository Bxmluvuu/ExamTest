import { HeaderSkeleton, TableSkeleton } from '@/components/ui/skeleton';

export default function AdminBlueprintsLoading() {
  return (
    <div className="space-y-6 motion-fade-in">
      <HeaderSkeleton />
      <TableSkeleton rows={4} cols={5} />
    </div>
  );
}
