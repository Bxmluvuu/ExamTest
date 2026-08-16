'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ExamRunner } from '@/components/learner/exam-runner';
import { QuestionSkeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/components/ui/error-state';
import { getExamAttempt, getCurrentSessionUser } from '@/lib/db-adapter';
import type { ExamAttempt, AttemptQuestion, AttemptAnswer } from '@/lib/types/database';

export default function AttemptPage() {
  const params = useParams();
  const attemptId = params.id as string;
  const router = useRouter();

  const [data, setData] = React.useState<{
    attempt: ExamAttempt;
    questions: AttemptQuestion[];
    answers: AttemptAnswer[];
  } | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  const loadAttempt = React.useCallback(() => {
    const user = getCurrentSessionUser();
    setIsLoading(true);
    setError('');

    getExamAttempt(attemptId, user.id)
      .then(res => {
        if (!res) {
          setError('ไม่พบชุดข้อสอบนี้ หรือชุดข้อสอบอาจถูกลบไปแล้ว');
        } else if (res.attempt.status === 'submitted') {
          router.replace(`/attempts/${attemptId}/result`);
        } else {
          setData(res);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching attempt:', err);
        setError('ไม่สามารถโหลดข้อมูลข้อสอบได้ กรุณาลองใหม่อีกครั้ง');
        setIsLoading(false);
      });
  }, [attemptId, router]);

  React.useEffect(() => {
    loadAttempt();
  }, [loadAttempt]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--background)] p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <QuestionSkeleton />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--background)]">
        <ErrorState
          title="ไม่สามารถเปิดชุดข้อสอบได้"
          description={error || 'เกิดข้อผิดพลาดในการโหลดข้อสอบ'}
          onRetry={loadAttempt}
          backHref="/dashboard"
          backLabel="กลับสู่หน้าหลัก"
        />
      </div>
    );
  }

  const user = getCurrentSessionUser();

  return (
    <ExamRunner
      attempt={data.attempt}
      initialQuestions={data.questions}
      initialAnswers={data.answers}
      userId={user.id}
    />
  );
}
