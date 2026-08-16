import { HeaderSkeleton, SubjectSkeleton } from '@/components/ui/skeleton';

export default function SubjectsLoading() {
  return (
    <div className="space-y-6 motion-fade-in">
      <HeaderSkeleton />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SubjectSkeleton />
        <SubjectSkeleton />
        <SubjectSkeleton />
        <SubjectSkeleton />
      </div>
    </div>
  );
}
