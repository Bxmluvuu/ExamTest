'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { ResultOverview } from '@/components/learner/result-overview';
import { getExamAttempt, getCurrentSessionUser, getDataStore } from '@/lib/db-adapter';
import type { ExamAttempt, AttemptQuestion } from '@/lib/types/database';

export default function AttemptResultPage() {
  const params = useParams();
  const attemptId = params.id as string;

  const [attempt, setAttempt] = React.useState<ExamAttempt | null>(null);
  const [questions, setQuestions] = React.useState<AttemptQuestion[]>([]);
  const [subjectSlug, setSubjectSlug] = React.useState<string>('database-systems');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const user = getCurrentSessionUser();
    setIsLoading(true);
    getExamAttempt(attemptId, user.id).then(res => {
      if (res) {
        setAttempt(res.attempt);
        setQuestions(res.questions);

        const store = getDataStore();
        const sub = store.subjects.find(s => s.id === res.attempt.subject_id);
        if (sub) setSubjectSlug(sub.slug);
      }
      setIsLoading(false);
    });
  }, [attemptId]);

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-40 bg-[var(--surface)] rounded border border-[var(--border)]" />
        <div className="h-60 bg-[var(--surface)] rounded border border-[var(--border)]" />
      </div>
    );
  }

  if (!attempt) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-base font-semibold text-[var(--foreground)]">ไม่พบผลการทดสอบ</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ResultOverview
        attempt={attempt}
        questions={questions}
        subjectSlug={subjectSlug}
      />
    </div>
  );
}
