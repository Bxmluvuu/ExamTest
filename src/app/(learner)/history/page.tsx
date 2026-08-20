'use client';

import * as React from 'react';
import Link from 'next/link';
import { LearnerPageHeader } from '@/components/learner/learner-page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { PageTransition } from '@/components/ui/page-transition';
import { ListSkeleton } from '@/components/ui/skeleton';
import { getUserAttempts, getCurrentSessionUser, getSubjects } from '@/lib/db-adapter';
import { History, ArrowRight, Clock, Calendar, Info } from 'lucide-react';
import { formatDuration, formatThaiDate, cn } from '@/lib/utils';
import type { ExamAttempt, Subject } from '@/lib/types/database';

export default function HistoryPage() {
  const [attempts, setAttempts] = React.useState<ExamAttempt[]>([]);
  const [subjects, setSubjects] = React.useState<Subject[]>([]);
  const [filterSubjectId, setFilterSubjectId] = React.useState<string>('all');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const user = getCurrentSessionUser();
    setIsLoading(true);
    Promise.all([
      getUserAttempts(user.id),
      getSubjects(),
    ]).then(([attList, subList]) => {
      setAttempts(attList);
      setSubjects(subList);
      setIsLoading(false);
    });
  }, []);

  const filteredAttempts = attempts.filter(a => {
    if (filterSubjectId === 'all') return true;
    return a.subject_id === filterSubjectId;
  });

  return (
    <PageTransition className="space-y-6">
      <LearnerPageHeader
        title="ประวัติการสอบ (Exam History)"
        description="ตรวจสอบผลคะแนนย้อนหลัง ทบทวนข้อที่เคยทำ และติดตามพัฒนาการของคุณ"
      />

      {/* 7-Day Retention Notice Banner */}
      <div className="p-3.5 sm:p-4 rounded-[var(--radius)] bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-amber-900 dark:text-amber-200 motion-slide-up">
        <Info className="h-5 w-5 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
        <div className="text-xs sm:text-sm space-y-0.5">
          <div className="font-semibold text-amber-900 dark:text-amber-200">
            นโยบายการจัดเก็บข้อมูล (7-Day Retention Policy)
          </div>
          <p className="text-amber-800/90 dark:text-amber-300/90 leading-relaxed text-xs sm:text-sm">
            ระบบจะจัดเก็บประวัติการทำข้อสอบย้อนหลังเป็นเวลา <strong>7 วัน</strong> เพื่อบริหารพื้นที่ฐานข้อมูลและรักษาความเร็วในการประมวลผล โปรดทบทวนข้อสอบและบันทึกคะแนนที่คุณสนใจภายในระยะเวลาดังกล่าว
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setFilterSubjectId('all')}
          className={cn(
            'px-3 py-1.5 rounded-[var(--radius)] font-medium border transition-colors cursor-pointer',
            filterSubjectId === 'all'
              ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
              : 'bg-[var(--surface)] text-[var(--foreground-muted)] border-[var(--border)] hover:bg-[var(--surface-subtle)]'
          )}
        >
          ทุกวิชา ({attempts.length})
        </button>
        {subjects.map(sub => {
          const count = attempts.filter(a => a.subject_id === sub.id).length;
          return (
            <button
              key={sub.id}
              onClick={() => setFilterSubjectId(sub.id)}
              className={cn(
                'px-3 py-1.5 rounded-[var(--radius)] font-medium border transition-colors cursor-pointer whitespace-nowrap',
                filterSubjectId === sub.id
                  ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                  : 'bg-[var(--surface)] text-[var(--foreground-muted)] border-[var(--border)] hover:bg-[var(--surface-subtle)]'
              )}
            >
              {sub.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Attempts List */}
      {isLoading ? (
        <ListSkeleton rows={5} />
      ) : filteredAttempts.length === 0 ? (
        <EmptyState
          icon={History}
          title="ยังไม่มีประวัติการสอบ"
          description="คุณยังไม่ได้เริ่มทำแบบทดสอบ เริ่มทำชุดแรกเพื่อบันทึกประวัติและวิเคราะห์ผลลัพธ์"
          actionLabel="เริ่มทำข้อสอบตอนนี้"
          actionHref="/practice/new"
        />
      ) : (
        <div className="space-y-3">
          {filteredAttempts.map(att => {
            const isSubmitted = att.status === 'submitted';
            const isPass = att.score_percentage >= 60;
            const daysLeft = Math.max(1, 7 - Math.floor((Date.now() - new Date(att.started_at).getTime()) / (1000 * 60 * 60 * 24)));

            return (
              <Card key={att.id} className="hover:border-[var(--border-strong)] transition-all motion-slide-up">
                <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[var(--primary-subtle)] text-[var(--primary)] border border-blue-200">
                        {att.mode.toUpperCase()}
                      </span>
                      <span className="text-xs text-[var(--foreground-muted)] flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatThaiDate(att.started_at)}
                      </span>
                      <span className="text-[11px] font-medium text-amber-700 bg-amber-100/70 dark:bg-amber-900/30 dark:text-amber-300 px-2 py-0.5 rounded flex items-center gap-1 border border-amber-300/50">
                        <Clock className="h-3 w-3" />
                        <span>เหลือเวลา {daysLeft} วัน</span>
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-[var(--foreground)] mt-1">
                      {att.blueprint_name || att.subject_name || 'แบบทดสอบ'}
                    </h3>

                    <div className="flex items-center gap-4 text-xs text-[var(--foreground-muted)] pt-0.5">
                      <span>จำนวน {att.total_questions} ข้อ</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {formatDuration(att.time_spent_seconds)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[var(--border)]">
                    {isSubmitted ? (
                      <div className="text-right">
                        <div className={cn('text-xl font-bold', isPass ? 'text-[var(--success)]' : 'text-[var(--danger)]')}>
                          {Number.isInteger(att.score_total) ? att.score_total : att.score_total.toFixed(2)} / {att.score_max}
                        </div>
                        <div className="text-xs text-[var(--foreground-muted)]">
                          คิดเป็น {att.score_percentage}%
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-200">
                        ยังทำไม่เสร็จ
                      </div>
                    )}

                    <Button asChild variant="outline" size="sm">
                      <Link href={isSubmitted ? `/attempts/${att.id}/result` : `/attempts/${att.id}`}>
                        <span>{isSubmitted ? 'ดูผลเฉลย' : 'ทำต่อ'}</span>
                        <ArrowRight className="h-3.5 w-3.5 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </PageTransition>
  );
}
