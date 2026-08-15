import * as React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TopicAccuracyItem {
  topic: string;
  chapter: string;
  total_answered: number;
  correct_count: number;
  accuracy_percentage: number;
  status: 'strong' | 'moderate' | 'weak';
}

export function TopicPerformanceList({
  topics,
  showQuickPractice = true,
}: {
  topics: TopicAccuracyItem[];
  showQuickPractice?: boolean;
}) {
  if (!topics || topics.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">วิเคราะห์ความแม่นยำรายหัวข้อ</CardTitle>
        </CardHeader>
        <CardContent className="py-6 text-center text-xs text-[var(--foreground-muted)]">
          ยังไม่มีข้อมูลหัวข้อที่ตอบ กรุณาเริ่มทำแบบฝึกหัดเพื่อวิเคราะห์จุดแข็งและจุดอ่อน
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base font-semibold">ความแม่นยำรายหัวข้อ (Topic Performance)</CardTitle>
          <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
            เรียงลำดับจากหัวข้อที่ควรทบทวน (Weak Topics) ก่อน
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-1">
        {topics.map((t, idx) => {
          const isWeak = t.status === 'weak' || t.accuracy_percentage < 60;
          const isStrong = t.status === 'strong' || t.accuracy_percentage >= 75;

          let badgeColor = 'bg-amber-50 text-amber-700 border-amber-200';
          let statusText = 'ปานกลาง';
          let icon = null;

          if (isWeak) {
            badgeColor = 'bg-rose-50 text-rose-700 border-rose-200';
            statusText = 'จุดอ่อน (Weak)';
            icon = <AlertTriangle className="h-3 w-3 mr-1 shrink-0" />;
          } else if (isStrong) {
            badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
            statusText = 'แม่นยำ (Strong)';
            icon = <CheckCircle2 className="h-3 w-3 mr-1 shrink-0" />;
          }

          return (
            <div
              key={idx}
              className={cn(
                'p-3 rounded-[var(--radius)] border transition-colors',
                isWeak
                  ? 'bg-red-50/30 border-red-200'
                  : 'bg-[var(--surface)] border-[var(--border)]'
              )}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="text-sm font-semibold text-[var(--foreground)]">{t.topic}</div>
                  <div className="text-xs text-[var(--foreground-muted)]">{t.chapter}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn('inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border', badgeColor)}>
                    {icon}
                    <span>{statusText}</span>
                  </span>
                  {showQuickPractice && isWeak && (
                    <Button asChild variant="subtle" size="sm" className="h-7 text-xs px-2.5">
                      <Link href={`/practice/new?mode=weakness&topic=${encodeURIComponent(t.topic)}`}>
                        <Zap className="h-3 w-3 mr-1" />
                        <span>ฝึกจุดนี้</span>
                      </Link>
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-[var(--foreground-muted)]">
                  <span>ตอบถูก {t.correct_count} จาก {t.total_answered} ข้อ</span>
                  <span className="font-semibold text-[var(--foreground)]">{t.accuracy_percentage}%</span>
                </div>
                <Progress
                  value={t.accuracy_percentage}
                  indicatorClassName={isWeak ? 'bg-[var(--danger)]' : isStrong ? 'bg-[var(--success)]' : 'bg-[var(--primary)]'}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
