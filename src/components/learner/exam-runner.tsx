'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  AlertCircle,
  ArrowLeft,
  Send,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';
import { SaveStatus, SaveStatusState } from '@/components/ui/save-status';
import { QuestionTransition } from './question-transition';
import { QuestionNavigator } from './question-navigator';
import { ExamTimer } from './exam-timer';
import { DifficultyBadge, QuestionTypeBadge } from '@/components/ui/status-badge';
import { FillBlankPlayer } from './fill-blank-player';
import { MatchingPlayer } from './matching-player';
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
  
  // Single Choice Answers
  const [answers, setAnswers] = React.useState<Record<string, 'A' | 'B' | 'C' | 'D'>>(() => {
    const map: Record<string, 'A' | 'B' | 'C' | 'D'> = {};
    initialAnswers.forEach(a => {
      if (a.selected_choice_key) {
        map[a.question_id] = a.selected_choice_key as 'A' | 'B' | 'C' | 'D';
      }
    });
    return map;
  });

  // Fill in the Blank Answers (question_id -> blank_id -> word)
  const [fillBlankAnswers, setFillBlankAnswers] = React.useState<Record<string, Record<string, string>>>(() => {
    const map: Record<string, Record<string, string>> = {};
    initialAnswers.forEach(a => {
      if (a.fill_blank_answers) {
        map[a.question_id] = a.fill_blank_answers;
      }
    });
    return map;
  });

  // Matching Answers (question_id -> left_id -> right_id)
  const [matchingAnswers, setMatchingAnswers] = React.useState<Record<string, Record<string, string>>>(() => {
    const map: Record<string, Record<string, string>> = {};
    initialAnswers.forEach(a => {
      if (a.matching_answers) {
        map[a.question_id] = a.matching_answers;
      }
    });
    return map;
  });

  const [savingStatus, setSavingStatus] = React.useState<SaveStatusState>('saved');
  const spentSecondsRef = React.useRef(attempt.time_spent_seconds || 0);
  const [bookmarkedSet, setBookmarkedSet] = React.useState<Set<number>>(new Set());
  const [isSubmitModalOpen, setIsSubmitModalOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  const handleTick = React.useCallback((s: number) => {
    spentSecondsRef.current = s;
  }, []);

  const questions = initialQuestions;
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  // Build answered map by index
  const answeredIndexMap = React.useMemo(() => {
    const map: Record<number, boolean> = {};
    questions.forEach((q, idx) => {
      const qType = q.question_snapshot?.question_type || q.question_type || 'single_choice';
      if (qType === 'fill_in_the_blank') {
        const blanks = fillBlankAnswers[q.question_id];
        map[idx] = Boolean(blanks && Object.values(blanks).some(v => Boolean(v && v.trim())));
      } else if (qType === 'matching') {
        const matches = matchingAnswers[q.question_id];
        map[idx] = Boolean(matches && Object.values(matches).some(v => Boolean(v && v.trim())));
      } else {
        map[idx] = Boolean(answers[q.question_id]);
      }
    });
    return map;
  }, [questions, answers, fillBlankAnswers, matchingAnswers]);

  const answeredCount = Object.values(answeredIndexMap).filter(Boolean).length;
  const unansweredCount = totalQuestions - answeredCount;

  // Handle Choice Selection + Auto-save
  const handleSelectChoice = React.useCallback(async (key: 'A' | 'B' | 'C' | 'D') => {
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
      setSavingStatus('error');
    }
  }, [currentQuestion, attempt.id, userId]);

  // Handle Fill in the blank + Auto-save
  const handleFillBlankChange = React.useCallback(async (newAnswers: Record<string, string>) => {
    if (!currentQuestion) return;

    setFillBlankAnswers(prev => ({
      ...prev,
      [currentQuestion.question_id]: newAnswers,
    }));

    setSavingStatus('saving');
    try {
      await saveAttemptAnswerAction({
        attemptId: attempt.id,
        questionId: currentQuestion.question_id,
        fillBlankAnswers: newAnswers,
        userId,
        responseTimeSeconds: 5,
      });
      setSavingStatus('saved');
    } catch (err) {
      console.error('Auto-save fill-in-blank error:', err);
      setSavingStatus('error');
    }
  }, [currentQuestion, attempt.id, userId]);

  // Handle Matching + Auto-save
  const handleMatchingChange = React.useCallback(async (newAnswers: Record<string, string>) => {
    if (!currentQuestion) return;

    setMatchingAnswers(prev => ({
      ...prev,
      [currentQuestion.question_id]: newAnswers,
    }));

    setSavingStatus('saving');
    try {
      await saveAttemptAnswerAction({
        attemptId: attempt.id,
        questionId: currentQuestion.question_id,
        matchingAnswers: newAnswers,
        userId,
        responseTimeSeconds: 5,
      });
      setSavingStatus('saved');
    } catch (err) {
      console.error('Auto-save matching error:', err);
      setSavingStatus('error');
    }
  }, [currentQuestion, attempt.id, userId]);

  // Bookmark toggle
  const handleToggleBookmark = React.useCallback(async () => {
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
  }, [currentQuestion, bookmarkedSet, currentIndex, userId]);

  // Handle Submission
  const handleSubmitExam = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const res = await submitExamAttemptAction({
        attemptId: attempt.id,
        userId,
        timeSpentSeconds: spentSecondsRef.current,
      });

      if (res.success) {
        router.push(`/attempts/${attempt.id}/result`);
      } else {
        alert(res.error || 'ไม่สามารถส่งข้อสอบได้ กรุณาลองใหม่อีกครั้ง');
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error('Submit error:', err);
      setIsSubmitting(false);
    }
  };

  // Keyboard Navigation for Focus Mode
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input/textarea or if modal is open
      if (isSubmitModalOpen || mobileNavOpen) return;
      if (['input', 'textarea', 'select'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) return;

      if (e.key === '1' || e.key.toLowerCase() === 'a') {
        const choice = currentQuestion?.shuffled_choices[0]?.key as 'A' | 'B' | 'C' | 'D';
        if (choice) handleSelectChoice(choice);
      } else if (e.key === '2' || e.key.toLowerCase() === 'b' && !e.metaKey && !e.ctrlKey) {
        const choice = currentQuestion?.shuffled_choices[1]?.key as 'A' | 'B' | 'C' | 'D';
        if (choice) handleSelectChoice(choice);
      } else if (e.key === '3' || e.key.toLowerCase() === 'c') {
        const choice = currentQuestion?.shuffled_choices[2]?.key as 'A' | 'B' | 'C' | 'D';
        if (choice) handleSelectChoice(choice);
      } else if (e.key === '4' || e.key.toLowerCase() === 'd') {
        const choice = currentQuestion?.shuffled_choices[3]?.key as 'A' | 'B' | 'C' | 'D';
        if (choice) handleSelectChoice(choice);
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex(prev => Math.min(totalQuestions - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex(prev => Math.max(0, prev - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestion, isSubmitModalOpen, mobileNavOpen, handleSelectChoice, totalQuestions]);

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
      <header className="sticky top-0 z-40 h-14 bg-[var(--surface)] border-b border-[var(--border)] px-4 sm:px-6 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-1.5 rounded-md text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle)] transition-colors"
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
              <SaveStatus status={savingStatus} />
            </div>
          </div>
        </div>

        {/* Timer & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ExamTimer
            initialMinutes={attempt.duration_minutes || 30}
            initialSpentSeconds={attempt.time_spent_seconds || 0}
            onTick={handleTick}
            onTimeExpired={() => {
              handleSubmitExam();
            }}
          />

          <button
            onClick={() => setMobileNavOpen(true)}
            className="md:hidden p-2 rounded border border-[var(--border)] bg-[var(--surface-subtle)] text-[var(--foreground-secondary)] hover:bg-[var(--surface-strong)] transition-colors"
            aria-label="Open Question Navigator"
          >
            <Menu className="h-4 w-4" />
          </button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsSubmitModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 shadow-xs"
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
          <QuestionTransition questionKey={currentQuestion.question_id}>
            <Card className="border-[var(--border)] shadow-xs">
              <CardContent className="p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
                {/* Question Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] pb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-[var(--primary-subtle)] text-[var(--primary)] font-bold text-xs">
                      ข้อที่ {currentIndex + 1}
                    </span>
                    <QuestionTypeBadge type={currentQuestion.question_snapshot.question_type || currentQuestion.question_type} />
                    <DifficultyBadge difficulty={currentQuestion.question_snapshot.difficulty} />
                    <span className="text-xs text-[var(--foreground-muted)] font-medium">
                      {currentQuestion.question_snapshot.chapter_title} • {currentQuestion.question_snapshot.topic_title}
                    </span>
                  </div>

                  <button
                    onClick={handleToggleBookmark}
                    className={cn(
                      'flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded transition-colors cursor-pointer border touch-manipulation',
                      bookmarkedSet.has(currentIndex)
                        ? 'bg-amber-50 text-amber-700 border-amber-300 font-semibold'
                        : 'text-[var(--foreground-muted)] border-[var(--border)] hover:bg-[var(--surface-subtle)]'
                    )}
                  >
                    <Bookmark className={cn('h-3.5 w-3.5', bookmarkedSet.has(currentIndex) && 'fill-current')} />
                    <span>{bookmarkedSet.has(currentIndex) ? 'บันทึกแล้ว' : 'บันทึกข้อนี้'}</span>
                  </button>
                </div>

                {/* Question Body Depending on Question Type */}
                {(currentQuestion.question_snapshot.question_type === 'fill_in_the_blank' || currentQuestion.question_type === 'fill_in_the_blank') ? (
                  <FillBlankPlayer
                    text={currentQuestion.question_snapshot.text}
                    wordBank={currentQuestion.question_snapshot.word_bank || []}
                    blanks={currentQuestion.question_snapshot.blanks || []}
                    userAnswers={fillBlankAnswers[currentQuestion.question_id] || {}}
                    onAnswerChange={handleFillBlankChange}
                  />
                ) : (currentQuestion.question_snapshot.question_type === 'matching' || currentQuestion.question_type === 'matching') ? (
                  <div className="space-y-4">
                    <div className="text-base sm:text-lg font-medium text-[var(--foreground)] leading-relaxed break-words">
                      {currentQuestion.question_snapshot.text}
                    </div>
                    <MatchingPlayer
                      matchingPairs={currentQuestion.question_snapshot.matching_pairs || []}
                      shuffledRights={currentQuestion.question_snapshot.shuffled_matching_rights}
                      userAnswers={matchingAnswers[currentQuestion.question_id] || {}}
                      onAnswerChange={handleMatchingChange}
                    />
                  </div>
                ) : (
                  <div className="space-y-5 sm:space-y-6">
                    {/* Question Text */}
                    <div className="text-base sm:text-lg font-medium text-[var(--foreground)] leading-relaxed break-words">
                      {currentQuestion.question_snapshot.text}
                    </div>

                    {/* Choices List */}
                    <div className="space-y-2.5 sm:space-y-3 pt-1" role="radiogroup" aria-label="Question choices">
                      {currentQuestion.shuffled_choices.map((choice, cIdx) => {
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
                                e.preventDefault();
                                handleSelectChoice(choice.key as 'A' | 'B' | 'C' | 'D');
                              }
                            }}
                            className={cn(
                              'flex items-start gap-3 p-3.5 sm:p-4 rounded-[var(--radius)] border text-sm sm:text-base transition-colors duration-150 cursor-pointer select-none min-h-[48px] touch-manipulation w-full',
                              isSelected
                                ? 'border-[var(--primary)] bg-[var(--primary-subtle)] text-[var(--primary)] font-semibold ring-1 ring-[var(--primary)] shadow-2xs'
                                : 'border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]'
                            )}
                          >
                            <div
                              className={cn(
                                'h-7 w-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors mt-0.5',
                                isSelected
                                  ? 'bg-[var(--primary)] text-white'
                                  : 'bg-[var(--surface-subtle)] text-[var(--foreground-secondary)] border border-[var(--border)]'
                              )}
                            >
                              {choice.key}
                            </div>
                            <div className="pt-0.5 leading-relaxed flex-1 break-words">{choice.text}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </QuestionTransition>

          {/* Navigation Buttons Footer */}
          <div className="flex items-center justify-between pt-4 pb-6 mt-2 relative z-10">
            <Button
              variant="outline"
              size="md"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              className="h-10 px-4 touch-manipulation"
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
                className="h-10 px-4 bg-blue-600 hover:bg-blue-700 touch-manipulation"
              >
                <span>ข้อถัดไป</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button
                variant="primary"
                size="md"
                className="h-10 px-4 bg-blue-600 hover:bg-blue-700 touch-manipulation shadow-xs"
                onClick={() => setIsSubmitModalOpen(true)}
              >
                <Send className="h-4 w-4 mr-1.5" />
                <span>ตรวจ & ส่งข้อสอบ</span>
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
        onClose={() => !isSubmitting && setIsSubmitModalOpen(false)}
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
              disabled={isSubmitting}
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
