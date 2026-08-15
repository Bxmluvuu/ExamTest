'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ExamRunner } from '@/components/learner/exam-runner';
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

  React.useEffect(() => {
    const user = getCurrentSessionUser();
    setIsLoading(true);
    getExamAttempt(attemptId, user.id)
      .then(res => {
        if (!res) {
          setError('ไม่พบชุดข้อสอบนี้');
        } else if (res.attempt.status === 'submitted') {
          // If already submitted, forward to results
          router.replace(`/attempts/${attemptId}/result`);
        } else {
          setData(res);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching attempt:', err);
        setError('ไม่สามารถโหลดข้อมูลข้อสอบได้');
        setIsLoading(false);
      });
  }, [attemptId, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-center space-y-3">
          <div className="h-8 w-8 rounded-full border-2 border-[var(--primary)] border-t-transparent animate-spin mx-auto" />
          <p className="text-sm text-[var(--foreground-muted)] font-medium">กำลังเตรียมชุดข้อสอบตาม Blueprint...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--background)]">
        <div className="text-center space-y-4">
          <p className="text-base text-rose-600 font-semibold">{error || 'เกิดข้อผิดพลาด'}</p>
          <a href="/dashboard" className="text-xs text-[var(--primary)] underline font-medium">
            กลับสู่หน้าหลัก
          </a>
        </div>
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
