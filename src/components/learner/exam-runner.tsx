'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowLeft,
  Send,
  HelpCircle,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';
import { QuestionNavigator } from './question-navigator';
import { ExamTimer } from './exam-timer';
import { DifficultyBadge } from '@/components/ui/status-badge';
import { saveAttemptAnswerAction, submitExamAttemptAction, toggleBookmarkAction } from '@/lib/db-adapter';
import type { ExamAttempt, AttemptQuestion, AttemptAnswer } from '@/lib/types/database';
import { cn } from '@/lib/utils';

export function ExamRunner({
  attempt,
  initialQuestions,
  initialAnswers,
  userId,
}: {
  attempt: ExamAttempt;
  initialQuestions: AttemptQuestion[];
  initialAnswers: AttemptAnswer[];
  userId: string;
}) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, 'A' | 'B' | 'C' | 'D'>>(() => {
    const map: Record<string, 'A' | 'B' | 'C' | 'D'> = {};
    initialAnswers.forEach(a => {
      if (a.selected_choice_key) {
        map[a.question_id] = a.selected_choice_key as 'A' | 'B' | 'C' | 'D';
      }
    });
    return map;
  });

  const [savingStatus, setSavingStatus] = React.useState<'idle' | 'saving' | 'saved'>('saved');
  const [spentSeconds, setSpentSeconds] = React.useState(attempt.time_spent_seconds || 0);
  const [bookmarkedSet, setBookmarkedSet] = React.useState<Set<number>>(new Set());
  const [isSubmitModalOpen, setIsSubmitModalOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  const questions = initialQuestions;
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  // Build answered map by index
  const answeredIndexMap = React.useMemo(() => {
    const map: Record<number, boolean> = {};
    questions.forEach((q, idx) => {
      map[idx] = Boolean(answers[q.question_id]);
    });
    return map;
  }, [questions, answers]);

  const answeredCount = Object.values(answeredIndexMap).filter(Boolean).length;
  const unansweredCount = totalQuestions - answeredCount;

  // Handle Choice Selection + Auto-save
  const handleSelectChoice = async (key: 'A' | 'B' | 'C' | 'D') => {
    if (!currentQuestion) return;

    setAnswers(prev => ({
      ...prev,
      [currentQuestion.question_id]: key,
    }));

    setSavingStatus('saving');
    try {
      await saveAttemptAnswerAction({
        attemptId: attempt.id,
        questionId: currentQuestion.question_id,
        selectedChoiceKey: key,
        userId,
        responseTimeSeconds: 5,
      });
      setSavingStatus('saved');
    } catch (err) {
      console.error('Auto-save error:', err);
      setSavingStatus('idle');
    }
  };

  // Bookmark toggle
  const handleToggleBookmark = async () => {
    if (!currentQuestion) return;
    const isCurrentlyBookmarked = bookmarkedSet.has(currentIndex);
    
    setBookmarkedSet(prev => {
      const next = new Set(prev);
      if (isCurrentlyBookmarked) next.delete(currentIndex);
      else next.add(currentIndex);
      return next;
    });

    try {
      await toggleBookmarkAction(userId, currentQuestion.question_id);
    } catch (err) {
      console.error('Bookmark toggle error:', err);
    }
  };

  // Handle Submission
  const handleSubmitExam = async () => {
    setIsSubmitting(true);
    try {
      const res = await submitExamAttemptAction({
        attemptId: attempt.id,
        userId,
        timeSpentSeconds: spentSeconds,
      });

      if (res.success) {
        router.push(`/attempts/${attempt.id}/result`);
      } else {
        alert('เกิดข้อผิดพลาดในการส่งข้อสอบ: ' + (res.error || ''));
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error('Submit error:', err);
      setIsSubmitting(false);
    }
  };

  if (!currentQuestion) {
    return (
      <div className="p-8 text-center">
        <p className="text-sm text-[var(--foreground-muted)]">ไม่พบข้อสอบ</p>
      </div>
    );
  }

  const selectedChoice = answers[currentQuestion.question_id];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 h-14 bg-[var(--surface)] border-b border-[var(--border)] px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-1.5 rounded-md text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle)]"
            title="ออกจากการทำข้อสอบ (บันทึกอัตโนมัติแล้ว)"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-sm font-semibold text-[var(--foreground)] truncate max-w-[200px] sm:max-w-md">
              {attempt.blueprint_name || attempt.subject_name || 'แบบทดสอบ'}
            </h1>
            <div className="text-[11px] text-[var(--foreground-muted)] flex items-center gap-2">
              <span>ข้อที่ {currentIndex + 1} จาก {totalQuestions}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[var(--success)] font-medium">
                <CheckCircle2 className="h-3 w-3" />
                {savingStatus === 'saving' ? 'กำลังบันทึก...' : 'บันทึกคำตอบแล้ว'}
              </span>
            </div>
          </div>
        </div>

        {/* Timer & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ExamTimer
            initialMinutes={attempt.duration_minutes || 30}
            initialSpentSeconds={attempt.time_spent_seconds || 0}
            onTick={s => setSpentSeconds(s)}
            onTimeExpired={() => {
              handleSubmitExam();
            }}
          />

          <button
            onClick={() => setMobileNavOpen(true)}
            className="md:hidden p-2 rounded border border-[var(--border)] bg-[var(--surface-subtle)] text-[var(--foreground-secondary)]"
            aria-label="Open Question Navigator"
          >
            <Menu className="h-4 w-4" />
          </button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsSubmitModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-3.5 w-3.5 mr-1.5" />
            <span>ส่งข้อสอบ</span>
          </Button>
        </div>
      </header>

      {/* Main Exam Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Question Stem Column */}
        <div className="md:col-span-8 space-y-6">
          <Card className="border-[var(--border)] shadow-xs">
            <CardContent className="p-6 sm:p-8 space-y-6">
              {/* Question Metadata */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] pb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-[var(--primary-subtle)] text-[var(--primary)] font-bold text-xs">
                    ข้อที่ {currentIndex + 1}
                  </span>
                  <DifficultyBadge difficulty={currentQuestion.question_snapshot.difficulty} />
                  <span className="text-xs text-[var(--foreground-muted)] font-medium">
                    {currentQuestion.question_snapshot.chapter_title} • {currentQuestion.question_snapshot.topic_title}
                  </span>
                </div>

                <button
                  onClick={handleToggleBookmark}
                  className={cn(
                    'flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded transition-colors cursor-pointer border',
                    bookmarkedSet.has(currentIndex)
                      ? 'bg-amber-50 text-amber-700 border-amber-300'
                      : 'text-[var(--foreground-muted)] border-[var(--border)] hover:bg-[var(--surface-subtle)]'
                  )}
                >
                  <Bookmark className={cn('h-3.5 w-3.5', bookmarkedSet.has(currentIndex) && 'fill-current')} />
                  <span>{bookmarkedSet.has(currentIndex) ? 'บันทึกแล้ว' : 'บันทึกข้อนี้'}</span>
                </button>
              </div>

              {/* Question Text */}
              <div className="text-base sm:text-lg font-medium text-[var(--foreground)] leading-relaxed">
                {currentQuestion.question_snapshot.text}
              </div>

              {/* Choices List */}
              <div className="space-y-3 pt-2" role="radiogroup" aria-label="Question choices">
                {currentQuestion.shuffled_choices.map(choice => {
                  const isSelected = selectedChoice === choice.key;
                  return (
                    <div
                      key={choice.key}
                      onClick={() => handleSelectChoice(choice.key as 'A' | 'B' | 'C' | 'D')}
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleSelectChoice(choice.key as 'A' | 'B' | 'C' | 'D');
                        }
                      }}
                      className={cn(
                        'flex items-start gap-3.5 p-4 rounded-[var(--radius)] border text-sm sm:text-base transition-all cursor-pointer select-none min-h-[48px]',
                        isSelected
                          ? 'border-[var(--primary)] bg-[var(--primary-subtle)] text-[var(--primary)] font-medium ring-1 ring-[var(--primary)]'
                          : 'border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]'
                      )}
                    >
                      <div
                        className={cn(
                          'h-7 w-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors',
                          isSelected
                            ? 'bg-[var(--primary)] text-white'
                            : 'bg-[var(--surface-subtle)] text-[var(--foreground-secondary)] border border-[var(--border)]'
                        )}
                      >
                        {choice.key}
                      </div>
                      <div className="pt-0.5 leading-relaxed flex-1">{choice.text}</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons Footer */}
          <div className="flex items-center justify-between pt-2">
            <Button
              variant="outline"
              size="md"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              <span>ข้อก่อนหน้า</span>
            </Button>

            <div className="text-xs text-[var(--foreground-muted)] hidden sm:block font-medium">
              ตอบแล้ว {answeredCount} / {totalQuestions} ข้อ
            </div>

            {currentIndex < totalQuestions - 1 ? (
              <Button
                variant="primary"
                size="md"
                onClick={() => setCurrentIndex(prev => Math.min(totalQuestions - 1, prev + 1))}
              >
                <span>ข้อถัดไป</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button
                variant="primary"
                size="md"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setIsSubmitModalOpen(true)}
              >
                <Send className="h-4 w-4 mr-1.5" />
                <span>ตรวจสอบและส่งข้อสอบ</span>
              </Button>
            )}
          </div>
        </div>

        {/* Sidebar Question Navigator (Desktop) */}
        <div className="hidden md:block md:col-span-4 sticky top-20">
          <QuestionNavigator
            totalQuestions={totalQuestions}
            currentIndex={currentIndex}
            onSelectIndex={idx => setCurrentIndex(idx)}
            answeredMap={answeredIndexMap}
            bookmarkedSet={bookmarkedSet}
          />
        </div>
      </div>

      {/* Mobile Drawer Navigator Modal */}
      <Dialog
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        title="เลือกข้อสอบ"
      >
        <QuestionNavigator
          totalQuestions={totalQuestions}
          currentIndex={currentIndex}
          onSelectIndex={idx => {
            setCurrentIndex(idx);
            setMobileNavOpen(false);
          }}
          answeredMap={answeredIndexMap}
          bookmarkedSet={bookmarkedSet}
        />
      </Dialog>

      {/* Confirm Submission Modal */}
      <Dialog
        open={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title="ยืนยันการส่งข้อสอบ"
        description="เมื่อส่งข้อสอบแล้ว ระบบจะตรวจคะแนนอัตโนมัติและไม่สามารถแก้ไขคำตอบได้อีก"
      >
        <div className="space-y-4 pt-2">
          <div className="p-4 rounded-md bg-[var(--surface-subtle)] border border-[var(--border)] space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--foreground-muted)]">ข้อสอบทั้งหมด:</span>
              <span className="font-semibold text-[var(--foreground)]">{totalQuestions} ข้อ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--foreground-muted)]">ตอบแล้ว:</span>
              <span className="font-semibold text-[var(--success)]">{answeredCount} ข้อ</span>
            </div>
            {unansweredCount > 0 && (
              <div className="flex justify-between text-rose-600 font-medium">
                <span className="flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>ยังไม่ได้ตอบ:</span>
                </span>
                <span>{unansweredCount} ข้อ</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              variant="outline"
              size="md"
              onClick={() => setIsSubmitModalOpen(false)}
              disabled={isSubmitting}
            >
              กลับไปทำต่อ
            </Button>
            <Button
              variant="primary"
              size="md"
              isLoading={isSubmitting}
              onClick={handleSubmitExam}
              className="bg-blue-600 hover:bg-blue-700"
            >
              ยืนยันส่งข้อสอบ
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
