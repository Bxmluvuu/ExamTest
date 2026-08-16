import { QuestionSkeleton } from '@/components/ui/skeleton';

export default function AttemptLoading() {
  return (
    <div className="min-h-screen bg-[var(--background)] p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <QuestionSkeleton />
      </div>
    </div>
  );
}
