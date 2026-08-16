'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { ResultOverview } from '@/components/learner/result-overview';
import { PageTransition } from '@/components/ui/page-transition';
import { HeaderSkeleton, MetricSkeleton, ListSkeleton, SectionSkeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/components/ui/error-state';
import { getExamAttempt, getCurrentSessionUser, getDataStore } from '@/lib/db-adapter';
import type { ExamAttempt, AttemptQuestion } from '@/lib/types/database';

export default function AttemptResultPage() {
  const params = useParams();
  const attemptId = params.id as string;

  const [attempt, setAttempt] = React.useState<ExamAttempt | null>(null);
  const [questions, setQuestions] = React.useState<AttemptQuestion[]>([]);
  const [subjectSlug, setSubjectSlug] = React.useState<string>('database-systems');
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  const loadResults = React.useCallback(() => {
    const user = getCurrentSessionUser();
    setIsLoading(true);
    setError('');

    getExamAttempt(attemptId, user.id)
      .then(res => {
        if (res) {
          setAttempt(res.attempt);
          setQuestions(res.questions);

          const store = getDataStore();
          const sub = store.subjects.find(s => s.id === res.attempt.subject_id);
          if (sub) setSubjectSlug(sub.slug);
        } else {
          setError('ไม่พบผลการทดสอบนี้');
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching result:', err);
        setError('เกิดข้อผิดพลาดในการโหลดผลคะแนน');
        setIsLoading(false);
      });
  }, [attemptId]);

  React.useEffect(() => {
    loadResults();
  }, [loadResults]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 motion-fade-in">
        <div className="p-6 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--border)] space-y-4">
          <HeaderSkeleton />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[var(--border)]">
            <MetricSkeleton />
            <MetricSkeleton />
            <MetricSkeleton />
            <MetricSkeleton />
          </div>
        </div>
        <SectionSkeleton className="min-h-[200px]" />
        <ListSkeleton rows={3} />
      </div>
    );
  }

  if (error || !attempt) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <ErrorState
          title="ไม่พบผลการทดสอบ"
          description={error || 'ไม่พบข้อมูลผลการสอบของชุดนี้'}
          onRetry={loadResults}
          backHref="/dashboard"
          backLabel="กลับสู่หน้าหลัก"
        />
      </div>
    );
  }

  return (
    <PageTransition className="max-w-4xl mx-auto space-y-6">
      <ResultOverview
        attempt={attempt}
        questions={questions}
        subjectSlug={subjectSlug}
      />
    </PageTransition>
  );
}
