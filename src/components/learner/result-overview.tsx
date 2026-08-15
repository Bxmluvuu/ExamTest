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
  Award,
  ChevronDown,
  ChevronUp,
  FileText,
  Bookmark,
  Share2,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScoreBreakdown } from './score-breakdown';
import { formatDuration, cn } from '@/lib/utils';
import type { ExamAttempt, AttemptQuestion } from '@/lib/types/database';

export function ResultOverview({
  attempt,
  questions,
  subjectSlug,
}: {
  attempt: ExamAttempt;
  questions: AttemptQuestion[];
  subjectSlug?: string;
}) {
  const [filterMode, setFilterMode] = React.useState<'all' | 'incorrect' | 'correct'>('all');
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

  const totalQuestions = questions.length;
  const correctCount = questions.filter(q => q.is_correct === true).length;
  const incorrectCount = questions.filter(q => q.is_correct === false && q.selected_choice_key).length;
  const unansweredCount = questions.filter(q => !q.selected_choice_key).length;

  const filteredQuestions = questions.filter(q => {
    if (filterMode === 'incorrect') return q.is_correct === false;
    if (filterMode === 'correct') return q.is_correct === true;
    return true;
  });

  const isPass = attempt.score_percentage >= 60;

  return (
    <div className="space-y-6">
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
                ระบบตรวจและประมวลผลคำตอบเรียบร้อยแล้ว
              </p>
            </div>

            {/* Score Metric Focus */}
            <div className="flex items-center gap-4 bg-[var(--surface-subtle)] p-4 rounded-[var(--radius)] border border-[var(--border)] shrink-0">
              <div className="text-center">
                <div className="text-xs text-[var(--foreground-muted)] font-medium">คะแนนรวม</div>
                <div className="text-3xl font-bold text-[var(--foreground)] mt-0.5">
                  {attempt.score_total} <span className="text-lg font-normal text-[var(--foreground-muted)]">/ {attempt.score_max}</span>
                </div>
              </div>
              <div className="h-10 w-[1px] bg-[var(--border)]" />
              <div className="text-center">
                <div className="text-xs text-[var(--foreground-muted)] font-medium">คิดเป็น</div>
                <div className={cn('text-3xl font-bold mt-0.5', isPass ? 'text-[var(--success)]' : 'text-[var(--danger)]')}>
                  {attempt.score_percentage}%
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
            <div className="p-3 rounded bg-[var(--success-subtle)] border border-green-200 flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-[var(--success)] shrink-0" />
              <div>
                <div className="text-xs text-[var(--foreground-muted)]">ตอบถูกต้อง</div>
                <div className="text-base font-semibold text-[var(--success)]">{correctCount} ข้อ</div>
              </div>
            </div>

            <div className="p-3 rounded bg-[var(--danger-subtle)] border border-red-200 flex items-center gap-3">
              <XCircle className="h-5 w-5 text-[var(--danger)] shrink-0" />
              <div>
                <div className="text-xs text-[var(--foreground-muted)]">ตอบผิด</div>
                <div className="text-base font-semibold text-[var(--danger)]">{incorrectCount} ข้อ</div>
              </div>
            </div>

            <div className="p-3 rounded bg-[var(--surface-subtle)] border border-[var(--border)] flex items-center gap-3">
              <HelpCircle className="h-5 w-5 text-[var(--foreground-muted)] shrink-0" />
              <div>
                <div className="text-xs text-[var(--foreground-muted)]">ไม่ตอบ</div>
                <div className="text-base font-semibold text-[var(--foreground)]">{unansweredCount} ข้อ</div>
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
              onClick={() => setFilterMode('incorrect')}
              className={cn(
                'px-2.5 py-1 rounded font-medium transition-colors cursor-pointer',
                filterMode === 'incorrect' ? 'bg-red-100 text-red-700 font-semibold' : 'text-[var(--foreground-muted)]'
              )}
            >
              เฉพาะข้อที่ผิด ({incorrectCount + unansweredCount})
            </button>
            <button
              onClick={() => setFilterMode('correct')}
              className={cn(
                'px-2.5 py-1 rounded font-medium transition-colors cursor-pointer',
                filterMode === 'correct' ? 'bg-green-100 text-green-700 font-semibold' : 'text-[var(--foreground-muted)]'
              )}
            >
              เฉพาะข้อที่ถูก ({correctCount})
            </button>
          </div>
        </div>

        {/* Question Cards */}
        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => {
            const isCorrect = q.is_correct === true;
            const isUnanswered = !q.selected_choice_key;
            const isExpanded = expandedIndex === idx;

            return (
              <Card
                key={q.id}
                className={cn(
                  'border transition-colors',
                  isCorrect ? 'border-green-200' : isUnanswered ? 'border-[var(--border)]' : 'border-red-200'
                )}
              >
                <CardContent className="p-5 space-y-4">
                  {/* Header Row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[var(--surface-subtle)] text-xs font-bold text-[var(--foreground)] border border-[var(--border)]">
                        ข้อที่ {q.sequence_order}
                      </span>
                      {isCorrect ? (
                        <span className="inline-flex items-center text-xs font-semibold text-[var(--success)] bg-[var(--success-subtle)] px-2 py-0.5 rounded border border-green-200">
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> ถูกต้อง
                        </span>
                      ) : isUnanswered ? (
                        <span className="inline-flex items-center text-xs font-medium text-[var(--foreground-muted)] bg-[var(--surface-subtle)] px-2 py-0.5 rounded border border-[var(--border)]">
                          <HelpCircle className="h-3.5 w-3.5 mr-1" /> ไม่ได้ตอบ
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-xs font-semibold text-[var(--danger)] bg-[var(--danger-subtle)] px-2 py-0.5 rounded border border-red-200">
                          <XCircle className="h-3.5 w-3.5 mr-1" /> ตอบผิด
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
