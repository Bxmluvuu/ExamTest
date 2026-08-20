'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  RotateCcw,
  LayoutDashboard,
  ChevronDown,
  ChevronUp,
  FileText,
  Check,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimatedNumber } from '@/components/ui/animated-number';
import { ScoreBreakdown } from './score-breakdown';
import { QuestionTypeBadge, DifficultyBadge } from '@/components/ui/status-badge';
import { formatDuration, cn } from '@/lib/utils';
import type { ExamAttempt, AttemptQuestion } from '@/lib/types/database';

function isQuestionAttempted(q: AttemptQuestion): boolean {
  const qType = q.question_snapshot?.question_type || q.question_type || 'single_choice';
  if (qType === 'fill_in_the_blank') {
    return Boolean(q.fill_blank_answers && Object.values(q.fill_blank_answers).some(v => Boolean(v && v.trim())));
  }
  if (qType === 'matching') {
    return Boolean(q.matching_answers && Object.values(q.matching_answers).some(v => Boolean(v && v.trim())));
  }
  return Boolean(q.selected_choice_key);
}

export function ResultOverview({
  attempt,
  questions,
  subjectSlug,
}: {
  attempt: ExamAttempt;
  questions: AttemptQuestion[];
  subjectSlug?: string;
}) {
  const [filterMode, setFilterMode] = React.useState<'all' | 'incorrect' | 'correct' | 'partial'>('all');

  const totalQuestions = questions.length;
  const correctCount = questions.filter(q => q.is_correct === true).length;
  const partiallyCorrectCount = questions.filter(q => q.is_partially_correct === true || ((q.points_earned ?? 0) > 0 && (q.points_earned ?? 0) < (q.points_possible ?? 1))).length;
  const incorrectCount = questions.filter(q => q.is_correct !== true && !q.is_partially_correct && (q.points_earned ?? 0) === 0 && isQuestionAttempted(q)).length;
  const unansweredCount = questions.filter(q => !isQuestionAttempted(q)).length;

  const filteredQuestions = questions.filter(q => {
    const isPartially = q.is_partially_correct === true || ((q.points_earned ?? 0) > 0 && (q.points_earned ?? 0) < (q.points_possible ?? 1));
    if (filterMode === 'incorrect') return q.is_correct === false && !isPartially;
    if (filterMode === 'correct') return q.is_correct === true;
    if (filterMode === 'partial') return isPartially;
    return true;
  });

  const isPass = attempt.score_percentage >= 60;
  const hasDecimals = !Number.isInteger(attempt.score_total);

  return (
    <div className="space-y-6 motion-fade-in">
      {/* Top Score Summary Banner */}
      <Card className="border-[var(--border)] shadow-xs">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[var(--border)]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-[var(--primary-subtle)] text-[var(--primary)] border border-blue-200">
                  {attempt.mode === 'exam' ? 'Exam Simulation' : attempt.mode.toUpperCase()}
                </span>
                <span className="text-xs text-[var(--foreground-muted)]">
                  {new Date(attempt.completed_at || attempt.started_at).toLocaleString('th-TH')}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] tracking-tight">
                {attempt.blueprint_name || attempt.subject_name || 'ผลการทดสอบ'}
              </h1>
              <p className="text-sm text-[var(--foreground-muted)] mt-1">
                ระบบตรวจและประมวลผลคำตอบเรียบร้อยแล้ว (รองรับการคิดคะแนนย่อยแบบ Partial Credit)
              </p>
            </div>

            {/* Score Metric Focus with AnimatedNumber */}
            <div className="flex items-center gap-4 bg-[var(--surface-subtle)] p-4 rounded-[var(--radius)] border border-[var(--border)] shrink-0">
              <div className="text-center">
                <div className="text-xs text-[var(--foreground-muted)] font-medium">คะแนนรวม</div>
                <div className="text-3xl font-bold text-[var(--foreground)] mt-0.5">
                  <AnimatedNumber value={attempt.score_total} decimals={hasDecimals ? 2 : 0} />{' '}
                  <span className="text-lg font-normal text-[var(--foreground-muted)]">/ {attempt.score_max}</span>
                </div>
              </div>
              <div className="h-10 w-[1px] bg-[var(--border)]" />
              <div className="text-center">
                <div className="text-xs text-[var(--foreground-muted)] font-medium">คิดเป็น</div>
                <div className={cn('text-3xl font-bold mt-0.5', isPass ? 'text-[var(--success)]' : 'text-[var(--danger)]')}>
                  <AnimatedNumber value={attempt.score_percentage} decimals={1} suffix="%" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className={cn('grid gap-4 pt-6', partiallyCorrectCount > 0 ? 'grid-cols-2 sm:grid-cols-5' : 'grid-cols-2 sm:grid-cols-4')}>
            <div className="p-3 rounded bg-[var(--success-subtle)] border border-green-200 flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-[var(--success)] shrink-0" />
              <div>
                <div className="text-xs text-[var(--foreground-muted)]">ตอบถูกเต็ม</div>
                <div className="text-base font-semibold text-[var(--success)]">
                  <AnimatedNumber value={correctCount} suffix=" ข้อ" />
                </div>
              </div>
            </div>

            {partiallyCorrectCount > 0 && (
              <div className="p-3 rounded bg-amber-50 border border-amber-200 flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-amber-600 shrink-0" />
                <div>
                  <div className="text-xs text-amber-800">ถูกบางส่วน</div>
                  <div className="text-base font-semibold text-amber-700">
                    <AnimatedNumber value={partiallyCorrectCount} suffix=" ข้อ" />
                  </div>
                </div>
              </div>
            )}

            <div className="p-3 rounded bg-[var(--danger-subtle)] border border-red-200 flex items-center gap-3">
              <XCircle className="h-5 w-5 text-[var(--danger)] shrink-0" />
              <div>
                <div className="text-xs text-[var(--foreground-muted)]">ตอบผิด</div>
                <div className="text-base font-semibold text-[var(--danger)]">
                  <AnimatedNumber value={incorrectCount} suffix=" ข้อ" />
                </div>
              </div>
            </div>

            <div className="p-3 rounded bg-[var(--surface-subtle)] border border-[var(--border)] flex items-center gap-3">
              <HelpCircle className="h-5 w-5 text-[var(--foreground-muted)] shrink-0" />
              <div>
                <div className="text-xs text-[var(--foreground-muted)]">ไม่ตอบ</div>
                <div className="text-base font-semibold text-[var(--foreground)]">
                  <AnimatedNumber value={unansweredCount} suffix=" ข้อ" />
                </div>
              </div>
            </div>

            <div className="p-3 rounded bg-[var(--surface-subtle)] border border-[var(--border)] flex items-center gap-3">
              <Clock className="h-5 w-5 text-[var(--foreground-muted)] shrink-0" />
              <div>
                <div className="text-xs text-[var(--foreground-muted)]">เวลาที่ใช้</div>
                <div className="text-base font-semibold text-[var(--foreground)]">
                  {formatDuration(attempt.time_spent_seconds)}
                </div>
              </div>
            </div>
          </div>

          {/* 7-Day Retention Notice */}
          <div className="mt-4 p-2.5 rounded bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-center gap-2.5 text-xs text-amber-800 dark:text-amber-300">
            <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>ผลคะแนนและเฉลยละเอียดชุดนี้จะถูกจัดเก็บไว้ในระบบเป็นเวลา <strong>7 วัน</strong> คุณสามารถกลับมาทบทวนได้ตลอดเวลาผ่านหน้าประวัติการสอบ</span>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-6 mt-6 border-t border-[var(--border)]">
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/dashboard">
                  <LayoutDashboard className="h-4 w-4 mr-1.5" />
                  <span>กลับหน้าหลัก</span>
                </Link>
              </Button>
              {subjectSlug && (
                <Button asChild variant="secondary" size="sm">
                  <Link href={`/subjects/${subjectSlug}`}>
                    <span>ดูเนื้อหาวิชา</span>
                  </Link>
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              <Button asChild variant="primary" size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Link href={`/practice/new?subjectId=${attempt.subject_id}&mode=exam`}>
                  <RotateCcw className="h-4 w-4 mr-1.5" />
                  <span>ลองทำอีกครั้ง</span>
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown Component */}
      <ScoreBreakdown questions={questions} />

      {/* Detailed Question Review List */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold text-[var(--foreground)]">เฉลยและคำอธิบายละเอียด (Solutions & Citations)</h2>
            <p className="text-xs text-[var(--foreground-muted)]">ตรวจสอบคำตอบและที่มาของเนื้อหาจาก Slide/PDF</p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-md bg-[var(--surface)] border border-[var(--border)] text-xs">
            <button
              onClick={() => setFilterMode('all')}
              className={cn(
                'px-2.5 py-1 rounded font-medium transition-colors cursor-pointer',
                filterMode === 'all' ? 'bg-[var(--surface-strong)] text-[var(--foreground)] font-semibold' : 'text-[var(--foreground-muted)]'
              )}
            >
              ทั้งหมด ({totalQuestions})
            </button>
            <button
              onClick={() => setFilterMode('correct')}
              className={cn(
                'px-2.5 py-1 rounded font-medium transition-colors cursor-pointer',
                filterMode === 'correct' ? 'bg-green-100 text-green-700 font-semibold' : 'text-[var(--foreground-muted)]'
              )}
            >
              ถูกเต็ม ({correctCount})
            </button>
            {partiallyCorrectCount > 0 && (
              <button
                onClick={() => setFilterMode('partial')}
                className={cn(
                  'px-2.5 py-1 rounded font-medium transition-colors cursor-pointer',
                  filterMode === 'partial' ? 'bg-amber-100 text-amber-800 font-semibold' : 'text-[var(--foreground-muted)]'
                )}
              >
                ถูกบางส่วน ({partiallyCorrectCount})
              </button>
            )}
            <button
              onClick={() => setFilterMode('incorrect')}
              className={cn(
                'px-2.5 py-1 rounded font-medium transition-colors cursor-pointer',
                filterMode === 'incorrect' ? 'bg-red-100 text-red-700 font-semibold' : 'text-[var(--foreground-muted)]'
              )}
            >
              เฉพาะข้อที่ผิด ({incorrectCount + unansweredCount})
            </button>
          </div>
        </div>

        {/* Question Cards */}
        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => {
            const isCorrect = q.is_correct === true;
            const isPartiallyCorrect = q.is_partially_correct === true || ((q.points_earned ?? 0) > 0 && (q.points_earned ?? 0) < (q.points_possible ?? 1));
            const isAttempted = isQuestionAttempted(q);
            const isUnanswered = !isAttempted;
            const qType = q.question_snapshot?.question_type || q.question_type || 'single_choice';

            return (
              <Card
                key={q.id}
                className={cn(
                  'border transition-colors duration-150',
                  isCorrect ? 'border-green-200' : isPartiallyCorrect ? 'border-amber-300 bg-amber-50/10' : isUnanswered ? 'border-[var(--border)]' : 'border-red-200'
                )}
              >
                <CardContent className="p-5 space-y-4">
                  {/* Header Row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[var(--surface-subtle)] text-xs font-bold text-[var(--foreground)] border border-[var(--border)]">
                        ข้อที่ {q.sequence_order}
                      </span>
                      <QuestionTypeBadge type={qType} />
                      {isCorrect ? (
                        <span className="inline-flex items-center text-xs font-semibold text-[var(--success)] bg-[var(--success-subtle)] px-2 py-0.5 rounded border border-green-200">
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> ถูกต้อง (+1 คะแนน)
                        </span>
                      ) : isPartiallyCorrect ? (
                        <span className="inline-flex items-center text-xs font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> ถูกบางส่วน ({q.correct_sub_count ?? '?'}/{q.total_sub_count ?? '?'} จุด • +{q.points_earned} คะแนน)
                        </span>
                      ) : isUnanswered ? (
                        <span className="inline-flex items-center text-xs font-medium text-[var(--foreground-muted)] bg-[var(--surface-subtle)] px-2 py-0.5 rounded border border-[var(--border)]">
                          <HelpCircle className="h-3.5 w-3.5 mr-1" /> ไม่ได้ตอบ
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-xs font-semibold text-[var(--danger)] bg-[var(--danger-subtle)] px-2 py-0.5 rounded border border-red-200">
                          <XCircle className="h-3.5 w-3.5 mr-1" /> ตอบผิด (0 คะแนน)
                        </span>
                      )}
                      <span className="text-xs text-[var(--foreground-muted)]">
                        {q.question_snapshot.topic_title}
                      </span>
                    </div>

                    <div className="text-xs text-[var(--foreground-muted)]">
                      ความยาก: <strong>{q.question_snapshot.difficulty}</strong>
                    </div>
                  </div>

                  {/* 1. Fill in the Blank Review */}
                  {qType === 'fill_in_the_blank' && (
                    <div className="space-y-4 pt-1">
                      <div className="p-4 rounded-lg bg-[var(--surface-subtle)] border border-[var(--border)] leading-loose text-base text-[var(--foreground)]">
                        {(() => {
                          const text = q.question_snapshot.text;
                          const blanks = q.question_snapshot.blanks || [];
                          const userBlanks = q.fill_blank_answers || {};
                          const correctBlanks = q.correct_blank_answers || {};

                          const parts: React.ReactNode[] = [];
                          const tokenRegex = /\[(?:blank_)?([a-zA-Z0-9_-]+)\]/g;
                          let lastIndex = 0;
                          let match: RegExpExecArray | null;

                          while ((match = tokenRegex.exec(text)) !== null) {
                            const matchedKey = match[1];
                            const blankId = matchedKey.startsWith('blank_') ? matchedKey : `blank_${matchedKey}`;
                            const blankObj = blanks.find((b: any) => b.id === blankId || b.id === matchedKey);
                            const pos = blankObj?.position || parts.length + 1;

                            if (match.index > lastIndex) {
                              parts.push(
                                <span key={`t-${lastIndex}`}>{text.slice(lastIndex, match.index)}</span>
                              );
                            }

                            const userVal = userBlanks[blankId];
                            const correctVal = correctBlanks[blankId] || blankObj?.correct_word || '';
                            const isSlotCorrect = Boolean(
                              userVal && correctVal && userVal.trim().toLowerCase() === correctVal.trim().toLowerCase()
                            );

                            if (isSlotCorrect) {
                              parts.push(
                                <span
                                  key={`slot-${blankId}`}
                                  className="inline-flex items-center gap-1 mx-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-300"
                                >
                                  <CheckCircle2 className="h-3 w-3 text-green-600" />
                                  <span>#{pos}: {userVal}</span>
                                </span>
                              );
                            } else if (userVal) {
                              parts.push(
                                <span
                                  key={`slot-${blankId}`}
                                  className="inline-flex flex-wrap items-center gap-1 mx-1 px-2 py-0.5 rounded-lg text-xs border border-red-300 bg-red-50 text-red-800"
                                >
                                  <span className="line-through opacity-75">#{pos}: {userVal}</span>
                                  <span className="font-bold text-green-700 bg-white px-1.5 py-0.5 rounded border border-green-200 inline-flex items-center gap-0.5">
                                    <Check className="h-3 w-3 text-green-600" />
                                    <span>{correctVal}</span>
                                  </span>
                                </span>
                              );
                            } else {
                              parts.push(
                                <span
                                  key={`slot-${blankId}`}
                                  className="inline-flex items-center gap-1 mx-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-300"
                                >
                                  <span className="opacity-75">#{pos}: ไม่ได้ตอบ</span>
                                  <span className="font-bold text-green-700 bg-white px-1.5 py-0.5 rounded border border-green-200 inline-flex items-center gap-0.5">
                                    <Check className="h-3 w-3 text-green-600" />
                                    <span>{correctVal}</span>
                                  </span>
                                </span>
                              );
                            }

                            lastIndex = tokenRegex.lastIndex;
                          }

                          if (lastIndex < text.length) {
                            parts.push(<span key="t-end">{text.slice(lastIndex)}</span>);
                          }

                          return parts;
                        })()}
                      </div>

                      {/* Blanks Summary List */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {Object.entries(q.correct_blank_answers || {}).map(([bId, correctVal], bIdx) => {
                          const userVal = q.fill_blank_answers?.[bId];
                          const isSlotCorrect = userVal && userVal.trim().toLowerCase() === correctVal.trim().toLowerCase();

                          return (
                            <div
                              key={bId}
                              className={cn(
                                'p-3 rounded-md border text-xs flex items-start justify-between gap-2',
                                isSlotCorrect
                                  ? 'bg-green-50/70 border-green-200 text-green-900'
                                  : userVal
                                  ? 'bg-red-50/70 border-red-200 text-red-900'
                                  : 'bg-zinc-50 border-zinc-200 text-zinc-700'
                              )}
                            >
                              <div>
                                <span className="font-bold">ช่องที่ #{bIdx + 1}: </span>
                                {userVal ? (
                                  <span>คุณตอบ: <strong className={isSlotCorrect ? 'text-green-700' : 'text-red-600 line-through'}>{userVal}</strong></span>
                                ) : (
                                  <span className="italic text-zinc-500">ไม่ได้ตอบ</span>
                                )}
                              </div>
                              {!isSlotCorrect && (
                                <div className="text-right shrink-0">
                                  <span className="text-[11px] font-semibold text-green-700 bg-white px-1.5 py-0.5 rounded border border-green-300">
                                    เฉลย: {correctVal}
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 2. Matching Review */}
                  {qType === 'matching' && (
                    <div className="space-y-3 pt-1">
                      <div className="text-base font-medium text-[var(--foreground)]">
                        {q.question_snapshot.text}
                      </div>

                      <div className="space-y-2.5">
                        {(q.question_snapshot.matching_pairs || []).map((pair: any, pIdx: number) => {
                          const userRightId = q.matching_answers?.[pair.id];
                          const correctRightId = q.correct_matching?.[pair.id] || pair.id;
                          const isPairCorrect = userRightId === correctRightId;

                          const rights = q.question_snapshot.shuffled_matching_rights || (q.question_snapshot.matching_pairs || []).map((p: any) => ({ id: p.id, right: p.right }));
                          const userRightObj = rights.find((r: any) => r.id === userRightId);
                          const correctRightObj = rights.find((r: any) => r.id === correctRightId);

                          return (
                            <div
                              key={pair.id}
                              className={cn(
                                'p-3.5 rounded-lg border text-sm space-y-1.5',
                                isPairCorrect
                                  ? 'bg-green-50/70 border-green-200 text-green-950'
                                  : userRightId
                                  ? 'bg-red-50/70 border-red-200 text-red-950'
                                  : 'bg-zinc-50 border-zinc-200 text-zinc-800'
                              )}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="font-semibold text-sm flex items-center gap-2">
                                  <span className="h-5 w-5 rounded-full bg-white border flex items-center justify-center text-xs font-bold text-zinc-700">
                                    {String.fromCharCode(65 + pIdx)}
                                  </span>
                                  <span>{pair.left}</span>
                                </div>
                                {isPairCorrect ? (
                                  <span className="inline-flex items-center text-xs font-bold text-green-700 shrink-0">
                                    <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> ถูกต้อง
                                  </span>
                                ) : userRightId ? (
                                  <span className="inline-flex items-center text-xs font-bold text-red-600 shrink-0">
                                    <XCircle className="h-3.5 w-3.5 mr-1" /> ตอบผิด
                                  </span>
                                ) : (
                                  <span className="text-xs text-zinc-500 font-medium shrink-0">ไม่ได้จับคู่</span>
                                )}
                              </div>

                              {/* Details */}
                              <div className="pl-7 space-y-1 text-xs">
                                {userRightId && (
                                  <div className={cn(isPairCorrect ? 'text-green-800' : 'text-red-700')}>
                                    <span>คุณเลือก: </span>
                                    <span className={cn('font-medium', !isPairCorrect && 'line-through')}>
                                      {userRightObj?.right || userRightId}
                                    </span>
                                  </div>
                                )}
                                {!isPairCorrect && correctRightObj && (
                                  <div className="text-green-800 font-semibold flex items-center gap-1 pt-0.5">
                                    <span className="text-green-700 inline-flex items-center gap-0.5">
                                      <Check className="h-3 w-3" />
                                      <span>คำตอบที่ถูกต้อง:</span>
                                    </span>
                                    <span>{correctRightObj.right}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 3. Single Choice Review */}
                  {(qType === 'single_choice' || qType === 'numeric') && (
                    <div className="space-y-4">
                      {/* Question Stem */}
                      <div className="text-base font-medium text-[var(--foreground)]">
                        {q.question_snapshot.text}
                      </div>

                      {/* Choices with Indicator */}
                      <div className="grid grid-cols-1 gap-2 pt-1">
                        {q.shuffled_choices.map(c => {
                          const isUserSelection = q.selected_choice_key === c.key;
                          const isCorrectChoice = q.correct_choice_key === c.key;

                          let choiceClass = 'border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]';
                          if (isCorrectChoice) {
                            choiceClass = 'border-green-300 bg-green-50/70 text-green-900 font-medium';
                          } else if (isUserSelection && !isCorrect) {
                            choiceClass = 'border-red-300 bg-red-50 text-red-900 line-through';
                          }

                          return (
                            <div
                              key={c.key}
                              className={cn('flex items-start gap-3 p-3 rounded text-sm border', choiceClass)}
                            >
                              <div
                                className={cn(
                                  'h-6 w-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0',
                                  isCorrectChoice
                                    ? 'bg-green-600 text-white'
                                    : isUserSelection
                                    ? 'bg-red-600 text-white'
                                    : 'bg-[var(--surface-subtle)] text-[var(--foreground-secondary)] border border-[var(--border)]'
                                )}
                              >
                                {c.key}
                              </div>
                              <div className="flex-1 pt-0.5">{c.text}</div>
                              {isCorrectChoice && (
                                <span className="text-xs font-semibold text-green-700 shrink-0">คำตอบที่ถูกต้อง</span>
                              )}
                              {isUserSelection && !isCorrect && (
                                <span className="text-xs font-semibold text-red-600 shrink-0">คุณเลือกข้อนี้</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Solution & Explanation Box */}
                  <div className="mt-3 p-4 rounded-md bg-[var(--surface-subtle)] border border-[var(--border)] space-y-2 text-xs">
                    <div className="font-semibold text-[var(--foreground)] flex items-center gap-1.5">
                      <FileText className="h-4 w-4 text-[var(--primary)]" />
                      <span>คำอธิบายเฉลย:</span>
                    </div>
                    <p className="text-[var(--foreground-secondary)] leading-relaxed text-sm">
                      {q.explanation || 'ตารางต้องอยู่ใน 2NF และไม่มี Transitive Functional Dependency เพื่อป้องกันปัญหา Update Anomalies'}
                    </p>

                    {/* Source Citation */}
                    {q.source_citation && (
                      <div className="pt-2 mt-2 border-t border-[var(--border)] text-[11px] text-[var(--foreground-muted)] space-y-1">
                        <div>
                          <strong>แหล่งอ้างอิง:</strong> {q.source_citation.file_name} (หน้าที่ {q.source_citation.pages.join(', ')})
                        </div>
                        {q.source_citation.evidence && (
                          <div className="italic text-[var(--foreground-secondary)]">
                            &ldquo;{q.source_citation.evidence}&rdquo;
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
