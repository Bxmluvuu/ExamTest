import { HeaderSkeleton, FormSkeleton } from '@/components/ui/skeleton';

export default function PracticeLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 motion-fade-in">
      <HeaderSkeleton />
      <FormSkeleton fields={4} />
    </div>
  );
}
