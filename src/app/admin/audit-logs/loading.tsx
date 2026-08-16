import { HeaderSkeleton, TableSkeleton } from '@/components/ui/skeleton';

export default function AdminAuditLogsLoading() {
  return (
    <div className="space-y-6 motion-fade-in">
      <HeaderSkeleton />
      <div className="flex gap-2 pb-2">
        <div className="h-8 w-36 bg-[var(--surface-strong)] rounded animate-pulse" />
        <div className="h-8 w-36 bg-[var(--surface-strong)] rounded animate-pulse" />
      </div>
      <TableSkeleton rows={8} cols={5} />
    </div>
  );
}
