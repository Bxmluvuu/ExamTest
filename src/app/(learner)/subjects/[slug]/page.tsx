'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { LearnerPageHeader } from '@/components/learner/learner-page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TopicPerformanceList } from '@/components/learner/topic-performance-list';
import { getSubjectBySlug, getUserAnalyticsData, getCurrentSessionUser } from '@/lib/db-adapter';
import {
  BookOpen,
  FileText,
  GraduationCap,
  BarChart3,
  Layers,
  Clock,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Subject, Chapter, Topic, SourceDocument, ExamBlueprint, UserAnalyticsSummary } from '@/lib/types/database';

export default function SubjectWorkspacePage() {
  const params = useParams();
  const slug = params.slug as string;

  const [activeTab, setActiveTab] = React.useState<'overview' | 'materials' | 'practice' | 'analytics'>('overview');
  const [data, setData] = React.useState<{
    subject: Subject;
    chapters: Array<Chapter & { topics: Topic[] }>;
    documents: SourceDocument[];
    blueprints: ExamBlueprint[];
  } | null>(null);
  const [analytics, setAnalytics] = React.useState<UserAnalyticsSummary | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const user = getCurrentSessionUser();
    setIsLoading(true);
    getSubjectBySlug(slug).then(res => {
      setData(res);
      setIsLoading(false);
    });
    getUserAnalyticsData(user.id).then(setAnalytics);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 w-64 bg-[var(--surface-strong)] rounded" />
        <div className="h-4 w-96 bg-[var(--surface-strong)] rounded" />
        <div className="h-64 bg-[var(--surface)] rounded border border-[var(--border)]" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">ไม่พบวิชานี้</h2>
        <Button asChild variant="primary" size="sm" className="mt-4">
          <Link href="/subjects">กลับหน้ารายการวิชา</Link>
        </Button>
      </div>
    );
  }

  const { subject, chapters, documents, blueprints } = data;
  const subStat = analytics?.subject_stats.find(s => s.subject_id === subject.id);
  const subTopics = analytics?.topic_accuracies || [];

  return (
    <div className="space-y-6">
      {/* Workspace Header */}
      <LearnerPageHeader
        context={
          <div className="flex items-center gap-1 text-[var(--foreground-muted)]">
            <Link href="/subjects" className="hover:underline">คลังวิชา</Link>
            <span>/</span>
            <span>{subject.name}</span>
          </div>
        }
        title={subject.name}
        description={subject.description}
        actions={
          <Button asChild variant="primary" size="md" className="bg-blue-600 hover:bg-blue-700">
            <Link href={`/practice/new?subjectId=${subject.id}`}>
              <GraduationCap className="h-4 w-4 mr-1.5" />
              <span>เริ่มทำข้อสอบจำลอง</span>
            </Link>
          </Button>
        }
      />

      {/* Segmented Control Tabs */}
      <div className="border-b border-[var(--border)]">
        <div className="flex gap-2 sm:gap-4 overflow-x-auto text-sm font-medium">
          {[
            { key: 'overview', label: 'ภาพรวม', icon: BookOpen },
            { key: 'materials', label: `เนื้อหา & สไลด์ (${documents.length})`, icon: FileText },
            { key: 'practice', label: 'แบบฝึกหัด & Blueprint', icon: GraduationCap },
            { key: 'analytics', label: 'ผลการเรียน & สถิติ', icon: BarChart3 },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={cn(
                  'flex items-center gap-2 py-3 px-1 border-b-2 font-medium transition-colors cursor-pointer select-none whitespace-nowrap',
                  isActive
                    ? 'border-[var(--primary)] text-[var(--primary)] font-semibold'
                    : 'border-transparent text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:border-[var(--border-strong)]'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: ภาพรวม (Overview) */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Metric Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="text-xs text-[var(--foreground-muted)] font-medium">เป้าหมายคลังข้อสอบ</div>
              <div className="text-xl font-bold text-[var(--foreground)] mt-1">{subject.question_target} ข้อ</div>
              <div className="text-[11px] text-[var(--foreground-muted)]">ครอบคลุมแล้ว {subStat?.coverage_percentage || 0}%</div>
            </Card>
            <Card className="p-4">
              <div className="text-xs text-[var(--foreground-muted)] font-medium">คะแนนเฉลี่ยของคุณ</div>
              <div className="text-xl font-bold text-[var(--primary)] mt-1">{subStat?.average_score || 0}%</div>
              <div className="text-[11px] text-[var(--foreground-muted)]">จาก {subStat?.attempts_count || 0} ครั้งที่สอบ</div>
            </Card>
            <Card className="p-4">
              <div className="text-xs text-[var(--foreground-muted)] font-medium">เอกสารการสอน</div>
              <div className="text-xl font-bold text-[var(--foreground)] mt-1">{documents.length} เอกสาร</div>
              <div className="text-[11px] text-[var(--foreground-muted)]">สไลด์บรรยายและข้อสอบเก่า</div>
            </Card>
          </div>

          {/* Chapters & Topics List */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">โครงสร้างบทเรียน (Course Outline)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {chapters.map((ch) => (
                <div key={ch.id} className="p-4 rounded-[var(--radius)] bg-[var(--surface-subtle)] border border-[var(--border)]">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="h-6 w-6 rounded bg-[var(--primary-subtle)] text-[var(--primary)] font-bold text-xs flex items-center justify-center">
                        {ch.sequence_order}
                      </span>
                      <h4 className="text-sm font-semibold text-[var(--foreground)]">{ch.title}</h4>
                    </div>
                    <Button asChild variant="outline" size="sm" className="h-7 text-xs">
                      <Link href={`/practice/new?subjectId=${subject.id}&chapterId=${ch.id}&mode=chapter`}>
                        <span>ฝึกเฉพาะบทนี้</span>
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Link>
                    </Button>
                  </div>

                  {ch.description && (
                    <p className="text-xs text-[var(--foreground-muted)] mb-3">{ch.description}</p>
                  )}

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {ch.topics.map(t => (
                      <span
                        key={t.id}
                        className="px-2 py-0.5 rounded bg-[var(--surface)] text-[var(--foreground-secondary)] text-xs border border-[var(--border)]"
                      >
                        {t.title}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB 2: เนื้อหา & สไลด์ (Materials) */}
      {activeTab === 'materials' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[var(--foreground-muted)]">
              เอกสารประกอบการสอนในระบบ Private Storage พร้อมระบบตรวจจับความสมบูรณ์ OCR
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map(doc => (
              <Card key={doc.id} className="flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="h-9 w-9 rounded-md bg-[var(--primary-subtle)] text-[var(--primary)] flex items-center justify-center font-bold">
                      <FileText className="h-5 w-5" />
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded bg-[var(--surface-subtle)] text-[var(--foreground-muted)] border border-[var(--border)]">
                      {doc.document_type === 'slide' ? 'Slide บรรยาย' : 'Past Exam ข้อสอบเก่า'}
                    </span>
                  </div>
                  <CardTitle className="text-sm font-semibold mt-2 text-[var(--foreground)]">
                    {doc.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="py-2 flex-1 space-y-2 text-xs text-[var(--foreground-muted)]">
                  <p>{doc.extraction_text_summary || 'เอกสารประกอบการสอน'}</p>
                  <div className="flex items-center gap-3 pt-1">
                    <span>{doc.page_count} หน้า</span>
                    <span>•</span>
                    <span className="text-[var(--success)] font-medium">
                      {doc.ocr_status === 'ready' ? '✓ OCR Verified' : 'Needs OCR'}
                    </span>
                  </div>
                </CardContent>

                <div className="p-4 pt-3 border-t border-[var(--border)] flex items-center justify-between">
                  <span className="text-xs text-[var(--foreground-muted)]">
                    Private Secure PDF
                  </span>
                  <Button asChild variant="primary" size="sm">
                    <Link href={`/subjects/${subject.slug}/materials/${doc.id}`}>
                      <span>เปิดอ่านเอกสาร</span>
                      <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: แบบฝึกหัด & Blueprint (Practice) */}
      {activeTab === 'practice' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-5 flex flex-col justify-between border-blue-200 bg-blue-50/20">
              <div className="space-y-2">
                <div className="h-9 w-9 rounded bg-[var(--primary)] text-white flex items-center justify-center font-bold">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-sm text-[var(--foreground)]">Exam Simulation</h3>
                <p className="text-xs text-[var(--foreground-muted)]">
                  จำลองการสอบจริงตาม Exam Blueprint พร้อมจับเวลาและคำนวณสัดส่วนความยาก
                </p>
              </div>
              <Button asChild variant="primary" size="sm" className="mt-4 w-full bg-blue-600 hover:bg-blue-700">
                <Link href={`/practice/new?subjectId=${subject.id}&mode=exam`}>
                  เริ่มทำข้อสอบ
                </Link>
              </Button>
            </Card>

            <Card className="p-5 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="h-9 w-9 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-sm text-[var(--foreground)]">Chapter Practice</h3>
                <p className="text-xs text-[var(--foreground-muted)]">
                  เลือกฝึกฝนเฉพาะบทเรียนหรือหัวข้อที่ต้องการทบทวนเป็นพิเศษ
                </p>
              </div>
              <Button asChild variant="secondary" size="sm" className="mt-4 w-full">
                <Link href={`/practice/new?subjectId=${subject.id}&mode=chapter`}>
                  เลือกบทเรียน
                </Link>
              </Button>
            </Card>

            <Card className="p-5 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="h-9 w-9 rounded bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-sm text-[var(--foreground)]">Weakness Mode</h3>
                <p className="text-xs text-[var(--foreground-muted)]">
                  เน้นสุ่มคำถามในหัวข้อที่คุณตอบผิดบ่อยเพื่อปิดจุดอ่อน
                </p>
              </div>
              <Button asChild variant="secondary" size="sm" className="mt-4 w-full">
                <Link href={`/practice/new?subjectId=${subject.id}&mode=weakness`}>
                  ฝึกจุดอ่อน
                </Link>
              </Button>
            </Card>

            <Card className="p-5 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="h-9 w-9 rounded bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-sm text-[var(--foreground)]">Mistakes Review</h3>
                <p className="text-xs text-[var(--foreground-muted)]">
                  ทบทวนเฉพาะข้อที่คุณเคยตอบผิดในอดีตเพื่อความแม่นยำ
                </p>
              </div>
              <Button asChild variant="secondary" size="sm" className="mt-4 w-full">
                <Link href={`/practice/new?subjectId=${subject.id}&mode=mistakes`}>
                  ทบทวนข้อผิด
                </Link>
              </Button>
            </Card>
          </div>

          {/* Blueprints Detail Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">พิมพ์เขียวข้อสอบมาตรฐาน (Active Blueprints)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {blueprints.map(bp => (
                <div key={bp.id} className="p-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--foreground)]">{bp.name}</h4>
                    <p className="text-xs text-[var(--foreground-muted)] mt-0.5">{bp.description}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-[var(--foreground-muted)] mt-2">
                      <span>จำนวน {bp.question_count} ข้อ</span>
                      <span>•</span>
                      <span>เวลา {bp.duration_minutes} นาที</span>
                      <span>•</span>
                      <span>สัดส่วน Easy {bp.difficulty_distribution.easy * 100}%, Med {bp.difficulty_distribution.medium * 100}%, Hard {bp.difficulty_distribution.hard * 100}%</span>
                    </div>
                  </div>

                  <Button asChild variant="primary" size="sm" className="shrink-0 bg-blue-600 hover:bg-blue-700">
                    <Link href={`/practice/new?subjectId=${subject.id}&blueprintId=${bp.id}&mode=exam`}>
                      <span>เริ่มสอบชุดนี้</span>
                      <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Link>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB 4: ผลการเรียน (Subject Analytics) */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <TopicPerformanceList topics={subTopics} />
        </div>
      )}
    </div>
  );
}
