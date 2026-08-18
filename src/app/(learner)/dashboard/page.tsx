'use client';

import * as React from 'react';
import Link from 'next/link';
import { LearnerPageHeader } from '@/components/learner/learner-page-header';
import { MetricStrip } from '@/components/learner/metric-strip';
import { SubjectCard } from '@/components/learner/subject-card';
import { LazyTrendChart } from '@/components/learner/lazy-chart';
import { TopicPerformanceList } from '@/components/learner/topic-performance-list';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageTransition } from '@/components/ui/page-transition';
import { SubjectSkeleton, ListSkeleton } from '@/components/ui/skeleton';
import {
  getCurrentSessionUser,
  getSubjects,
  getUserAnalyticsData,
  getDataStore,
} from '@/lib/db-adapter';
import {
  GraduationCap,
  ArrowRight,
  Play,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { useUser } from '@/lib/auth/user-context';
import type { Subject, UserAnalyticsSummary, ExamAttempt, Profile } from '@/lib/types/database';

export default function DashboardPage() {
  const { profile, displayName } = useUser();
  const [subjects, setSubjects] = React.useState<Subject[]>([]);
  const [analytics, setAnalytics] = React.useState<UserAnalyticsSummary | null>(null);
  const [inProgressAttempt, setInProgressAttempt] = React.useState<ExamAttempt | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const userId = profile?.id || getCurrentSessionUser().id;
    setIsLoading(true);

    Promise.all([
      getSubjects(),
      getUserAnalyticsData(userId),
    ]).then(([subs, userAnalytics]) => {
      setSubjects(subs);
      setAnalytics(userAnalytics);
      setIsLoading(false);
    });

    const store = getDataStore();
    const active = store.exam_attempts.find(a => a.user_id === userId && a.status === 'in_progress');
    setInProgressAttempt(active || null);
  }, [profile?.id]);

  const totalQuestions = analytics?.total_questions_answered || 0;
  const avgScore = analytics?.average_score_percentage || 0;
  const practiceDays = analytics?.total_practice_days || 0;
  const accuracy = analytics?.overall_accuracy || 0;

  return (
    <PageTransition className="space-y-6">
      {/* Page Header with Dynamic Greeting */}
      <LearnerPageHeader
        title={`สวัสดี, ${displayName}`}
        description="ยินดีต้อนรับสู่ระบบคลังข้อสอบและวิเคราะห์จุดอ่อนรายบุคคล ทบทวนเนื้อหาและฝึกฝนข้อสอบได้ตลอดเวลา"
        actions={
          <Button asChild variant="primary" size="md" className="bg-blue-600 hover:bg-blue-700 shadow-xs">
            <Link href="/practice/new">
              <GraduationCap className="h-4 w-4 mr-1.5" />
              <span>เริ่มทำข้อสอบจำลอง</span>
            </Link>
          </Button>
        }
      />

      {/* IN-PROGRESS ATTEMPT BANNER (If Any) */}
      {inProgressAttempt && (
        <Card className="border-blue-300 bg-blue-50/50 shadow-xs motion-slide-up">
          <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-[var(--primary)] text-white flex items-center justify-center shrink-0">
                <Play className="h-5 w-5 fill-current" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[var(--primary)] uppercase tracking-wider">
                  มีชุดข้อสอบที่ยังทำไม่เสร็จ (In-Progress Attempt)
                </div>
                <div className="text-sm sm:text-base font-bold text-[var(--foreground)] mt-0.5">
                  {inProgressAttempt.blueprint_name || inProgressAttempt.subject_name || 'แบบทดสอบ'}
                </div>
                <div className="text-xs text-[var(--foreground-muted)]">
                  จำนวน {inProgressAttempt.total_questions} ข้อ • เริ่มเมื่อ {new Date(inProgressAttempt.started_at).toLocaleTimeString('th-TH')}
                </div>
              </div>
            </div>

            <Button asChild variant="primary" size="md" className="shrink-0 bg-blue-600 hover:bg-blue-700">
              <Link href={`/attempts/${inProgressAttempt.id}`}>
                <span>ทำข้อสอบต่อ</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Metric Strip */}
      <MetricStrip
        averageScore={avgScore}
        totalQuestionsAnswered={totalQuestions}
        totalPracticeDays={practiceDays}
        overallAccuracy={accuracy}
        isLoading={isLoading}
      />

      {/* Actionable Recommendations (Deterministic) */}
      {analytics && analytics.recommendations.length > 0 && (
        <div className="space-y-3">
          <div className="text-sm font-semibold text-[var(--foreground)] flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-[var(--primary)]" />
            <span>คำแนะนำสำหรับการฝึกฝนวันนี้ (Recommendations)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {analytics.recommendations.slice(0, 2).map((rec, idx) => (
              <div
                key={idx}
                className="p-4 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--border)] shadow-xs flex items-start justify-between gap-3"
              >
                <div>
                  <h3 className="text-sm font-semibold text-[var(--foreground)]">{rec.title}</h3>
                  <p className="text-xs text-[var(--foreground-muted)] mt-1 leading-relaxed">
                    {rec.description}
                  </p>
                </div>
                <Button asChild variant="outline" size="sm" className="shrink-0 text-xs">
                  <Link href={rec.action_url}>
                    <span>{rec.action_label}</span>
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subjects Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-[var(--foreground)] flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-[var(--primary)]" />
            <span>วิชาของฉัน (My Subjects)</span>
          </h2>
          <Link href="/subjects" className="text-xs font-medium text-[var(--primary)] hover:underline flex items-center gap-0.5">
            <span>ดูทั้งหมด</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SubjectSkeleton />
            <SubjectSkeleton />
          </div>
        ) : subjects.length === 0 ? (
          <Card className="p-8 text-center space-y-2">
            <BookOpen className="h-8 w-8 mx-auto text-[var(--foreground-muted)] opacity-50" />
            <p className="text-sm font-semibold text-[var(--foreground)]">ยังไม่มีรายวิชาในระบบ</p>
            <p className="text-xs text-[var(--foreground-muted)]">เมื่อมีการเพิ่มรายวิชาและคลังข้อสอบ รายวิชาจะปรากฏที่นี่</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjects.map(subject => {
              const subStat = analytics?.subject_stats.find(s => s.subject_id === subject.id);
              return (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  coveragePercentage={subStat?.coverage_percentage || 0}
                  averageScore={subStat?.average_score}
                  chaptersCount={subject.chapters_count ?? 14}
                  docsCount={subject.documents_count ?? 16}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Analytics Breakdown & Trends Row with Lazy Loaded Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <LazyTrendChart data={analytics?.score_trends || []} />
        </div>

        <div className="lg:col-span-6">
          {isLoading ? (
            <ListSkeleton rows={4} />
          ) : (
            <TopicPerformanceList topics={analytics?.topic_accuracies || []} />
          )}
        </div>
      </div>
    </PageTransition>
  );
}
