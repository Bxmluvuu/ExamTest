'use client';

import * as React from 'react';
import Link from 'next/link';
import { LearnerPageHeader } from '@/components/learner/learner-page-header';
import { MetricStrip } from '@/components/learner/metric-strip';
import { TrendChart } from '@/components/learner/trend-chart';
import { TopicPerformanceList } from '@/components/learner/topic-performance-list';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { getUserAnalyticsData, getCurrentSessionUser } from '@/lib/db-adapter';
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import type { UserAnalyticsSummary } from '@/lib/types/database';

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = React.useState<UserAnalyticsSummary | null>(null);

  React.useEffect(() => {
    const user = getCurrentSessionUser();
    getUserAnalyticsData(user.id).then(setAnalytics);
  }, []);

  return (
    <div className="space-y-6">
      <LearnerPageHeader
        title="สถิติและการวิเคราะห์จุดอ่อน (Analytics & Insights)"
        description="ระบบวิเคราะห์ผลคะแนนย้อนหลัง อัตราความแม่นยำรายหัวข้อ และข้อเสนอแนะในการทบทวน"
      />

      {/* Top Metric Strip */}
      <MetricStrip
        averageScore={analytics?.average_score_percentage || 0}
        totalQuestionsAnswered={analytics?.total_questions_answered || 0}
        totalPracticeDays={analytics?.total_practice_days || 0}
        overallAccuracy={analytics?.overall_accuracy || 0}
      />

      {/* Actionable Recommendations */}
      {analytics && analytics.recommendations.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-[var(--foreground)] flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[var(--primary)]" />
            <span>ข้อเสนอแนะเพื่อยกระดับคะแนน (Actionable Recommendations)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analytics.recommendations.map((rec, idx) => (
              <Card key={idx} className="p-4 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--primary)] bg-[var(--primary-subtle)] px-2 py-0.5 rounded border border-blue-200">
                    {rec.type}
                  </span>
                  <h3 className="text-sm font-semibold text-[var(--foreground)] mt-2">{rec.title}</h3>
                  <p className="text-xs text-[var(--foreground-muted)] mt-1 leading-relaxed">
                    {rec.description}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-[var(--border)] flex justify-end">
                  <Button asChild variant="primary" size="sm" className="text-xs">
                    <Link href={rec.action_url}>
                      <span>{rec.action_label}</span>
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Score Trends Line Chart */}
      <TrendChart data={analytics?.score_trends || []} />

      {/* Subject Stats Grid */}
      <div className="space-y-3">
        <h2 className="text-base font-semibold text-[var(--foreground)] flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-[var(--primary)]" />
          <span>สถิติแยกตามรายวิชา (Subject Performance)</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analytics?.subject_stats.map(sub => (
            <Card key={sub.subject_id} className="p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-base text-[var(--foreground)]">{sub.subject_name}</h3>
                  <p className="text-xs text-[var(--foreground-muted)]">ทำข้อสอบไปแล้ว {sub.attempts_count} ครั้ง</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-[var(--primary)]">{sub.average_score}%</div>
                  <div className="text-[11px] text-[var(--foreground-muted)]">คะแนนเฉลี่ย</div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] text-[var(--foreground-muted)] mb-1">
                    <span>ความครอบคลุมคลังข้อสอบ</span>
                    <span>{sub.coverage_percentage}%</span>
                  </div>
                  <Progress value={sub.coverage_percentage} />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-[var(--foreground-muted)] mb-1">
                    <span>ความแม่นยำในการตอบ</span>
                    <span>{sub.accuracy}%</span>
                  </div>
                  <Progress
                    value={sub.accuracy}
                    indicatorClassName={sub.accuracy >= 70 ? 'bg-[var(--success)]' : 'bg-[var(--primary)]'}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Detailed Topic Accuracies */}
      <TopicPerformanceList topics={analytics?.topic_accuracies || []} />
    </div>
  );
}
