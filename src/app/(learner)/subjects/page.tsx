'use client';

import * as React from 'react';
import { LearnerPageHeader } from '@/components/learner/learner-page-header';
import { SubjectCard } from '@/components/learner/subject-card';
import { getSubjects, getUserAnalyticsData, getCurrentSessionUser } from '@/lib/db-adapter';
import type { Subject, UserAnalyticsSummary } from '@/lib/types/database';

export default function SubjectsListPage() {
  const [subjects, setSubjects] = React.useState<Subject[]>([]);
  const [analytics, setAnalytics] = React.useState<UserAnalyticsSummary | null>(null);

  React.useEffect(() => {
    const u = getCurrentSessionUser();
    getSubjects().then(setSubjects);
    getUserAnalyticsData(u.id).then(setAnalytics);
  }, []);

  return (
    <div className="space-y-6">
      <LearnerPageHeader
        title="คลังวิชาและเอกสาร (Subjects & Materials)"
        description="เลือกวิชาเพื่ออ่านสไลด์เนื้อหา ศึกษาเอกสารประกอบ และทำแบบฝึกหัดตาม Exam Blueprint"
      />

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
    </div>
  );
}
