'use client';

import * as React from 'react';
import { LearnerPageHeader } from '@/components/learner/learner-page-header';
import { SubjectCard } from '@/components/learner/subject-card';
import { PageTransition } from '@/components/ui/page-transition';
import { SubjectSkeleton } from '@/components/ui/skeleton';
import { getSubjects, getUserAnalyticsData, getCurrentSessionUser } from '@/lib/db-adapter';
import type { Subject, UserAnalyticsSummary } from '@/lib/types/database';

export default function SubjectsListPage() {
  const [subjects, setSubjects] = React.useState<Subject[]>([]);
  const [analytics, setAnalytics] = React.useState<UserAnalyticsSummary | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const u = getCurrentSessionUser();
    setIsLoading(true);
    Promise.all([
      getSubjects(),
      getUserAnalyticsData(u.id),
    ]).then(([subs, userAnalytics]) => {
      setSubjects(subs);
      setAnalytics(userAnalytics);
      setIsLoading(false);
    });
  }, []);

  return (
    <PageTransition className="space-y-6">
      <LearnerPageHeader
        title="คลังวิชาและเอกสาร (Subjects & Materials)"
        description="เลือกวิชาเพื่ออ่านสไลด์เนื้อหา ศึกษาเอกสารประกอบ และทำแบบฝึกหัดตาม Exam Blueprint"
      />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SubjectSkeleton />
          <SubjectSkeleton />
          <SubjectSkeleton />
          <SubjectSkeleton />
        </div>
      ) : subjects.length === 0 ? (
        <div className="p-8 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--border)] text-center space-y-2">
          <p className="text-sm font-semibold text-[var(--foreground)]">ยังไม่มีรายวิชาในระบบ</p>
          <p className="text-xs text-[var(--foreground-muted)]">เมื่อเพิ่มรายวิชาและสไลด์ใน Admin Console รายวิชาจะปรากฏที่นี่</p>
        </div>
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
                chaptersCount={4}
                docsCount={subject.slug === 'database-systems' ? 4 : 2}
              />
            );
          })}
        </div>
      )}
    </PageTransition>
  );
}
