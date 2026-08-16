import { HeaderSkeleton, ListSkeleton } from '@/components/ui/skeleton';

export default function HistoryLoading() {
  return (
    <div className="space-y-6 motion-fade-in">
      <HeaderSkeleton />
      <div className="flex gap-2 pb-1">
        <div className="h-7 w-20 bg-[var(--surface-strong)] rounded animate-pulse" />
        <div className="h-7 w-28 bg-[var(--surface-strong)] rounded animate-pulse" />
      </div>
      <ListSkeleton rows={5} />
    </div>
  );
}
