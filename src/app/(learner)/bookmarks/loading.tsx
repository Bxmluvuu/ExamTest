import { HeaderSkeleton, ListSkeleton } from '@/components/ui/skeleton';

export default function BookmarksLoading() {
  return (
    <div className="space-y-6 motion-fade-in">
      <HeaderSkeleton />
      <ListSkeleton rows={4} />
    </div>
  );
}
