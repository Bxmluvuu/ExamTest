import * as React from 'react';
import { Target, CheckCircle2, Calendar, Award, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MetricStrip({
  averageScore,
  totalQuestionsAnswered,
  totalPracticeDays,
  overallAccuracy,
  className,
}: {
  averageScore: number;
  totalQuestionsAnswered: number;
  totalPracticeDays: number;
  overallAccuracy: number;
  className?: string;
}) {
  const metrics = [
    {
      label: 'คะแนนเฉลี่ย',
      value: `${averageScore}%`,
      subtext: 'จากการสอบทั้งหมด',
      icon: Award,
      color: 'text-[var(--primary)]',
      bg: 'bg-[var(--primary-subtle)]',
    },
    {
      label: 'จำนวนข้อที่ฝึกฝน',
      value: totalQuestionsAnswered.toLocaleString(),
      subtext: 'ข้อสอบที่ตอบแล้ว',
      icon: Target,
      color: 'text-[var(--accent-cyan)]',
      bg: 'bg-cyan-50',
    },
    {
      label: 'ความแม่นยำรวม',
      value: `${overallAccuracy}%`,
      subtext: 'อัตราตอบถูก',
      icon: CheckCircle2,
      color: 'text-[var(--success)]',
      bg: 'bg-[var(--success-subtle)]',
    },
    {
      label: 'วันที่ฝึกฝน',
      value: `${totalPracticeDays} วัน`,
      subtext: 'สะสมการเรียนรู้',
      icon: Calendar,
      color: 'text-[var(--accent-amber)]',
      bg: 'bg-amber-50',
    },
  ];

  return (
    <div className={cn('grid grid-cols-2 lg:grid-cols-4 gap-3', className)}>
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <div
            key={idx}
            className="p-4 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--border)] shadow-xs flex items-center gap-3.5"
          >
            <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center shrink-0', m.bg, m.color)}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs text-[var(--foreground-muted)] font-medium truncate">{m.label}</div>
              <div className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--foreground)] mt-0.5">
                {m.value}
              </div>
              <div className="text-[11px] text-[var(--foreground-muted)] truncate">{m.subtext}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
