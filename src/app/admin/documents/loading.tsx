import { HeaderSkeleton, TableSkeleton } from '@/components/ui/skeleton';

export default function AdminDocumentsLoading() {
  return (
    <div className="space-y-6 motion-fade-in">
      <HeaderSkeleton />
      <div className="h-12 bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--border)] animate-pulse" />
      <TableSkeleton rows={5} cols={7} />
    </div>
  );
}
