'use client';

import * as React from 'react';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog } from '@/components/ui/dialog';
import { PageTransition } from '@/components/ui/page-transition';
import { SectionSkeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/toast';
import { getDataStore, getSubjects } from '@/lib/db-adapter';
import { calculateBlueprintQuota } from '@/lib/blueprint-engine';
import { Plus, CheckCircle2, AlertTriangle, Sliders } from 'lucide-react';
import type { ExamBlueprint, Subject, Question } from '@/lib/types/database';

export default function AdminBlueprintsPage() {
  const [blueprints, setBlueprints] = React.useState<ExamBlueprint[]>([]);
  const [subjects, setSubjects] = React.useState<Subject[]>([]);
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const { showToast } = useToast();

  // Form states
  const [name, setName] = React.useState('');
  const [slug, setSlug] = React.useState('');
  const [subjectId, setSubjectId] = React.useState('');
  const [questionCount, setQuestionCount] = React.useState(20);
  const [durationMinutes, setDurationMinutes] = React.useState(40);

  const refreshData = React.useCallback(() => {
    setIsLoading(true);
    const store = getDataStore();
    setBlueprints([...store.exam_blueprints]);
    setSubjects([...store.subjects]);
    setQuestions([...store.questions]);
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    refreshData();
  }, [refreshData]);

  const handleCreateBlueprint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !subjectId) return;

    const store = getDataStore();
    const newBp: ExamBlueprint = {
      id: `bp-${Date.now()}`,
      subject_id: subjectId,
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      description: `แบบทดสอบมาตรฐาน สร้างโดยผู้ดูแลระบบ (${questionCount} ข้อ / ${durationMinutes} นาที)`,
      question_count: Number(questionCount) || 20,
      duration_minutes: Number(durationMinutes) || 40,
      difficulty_distribution: { easy: 0.25, medium: 0.55, hard: 0.20 },
      topic_distribution: [
        { topic: 'Relational Model Concepts', weight: 0.3 },
        { topic: 'Primary & Foreign Keys', weight: 0.3 },
        { topic: 'Third Normal Form (3NF)', weight: 0.4 },
      ],
      avoid_recent_question_count: 20,
      is_active: true,
      created_at: new Date().toISOString(),
    };

    store.exam_blueprints.push(newBp);
    setIsModalOpen(false);
    showToast(`สร้าง Blueprint "${name}" เรียบร้อยแล้ว`, 'success');
    refreshData();
  };

  return (
    <PageTransition className="space-y-6">
      <AdminPageHeader
        breadcrumbs={[{ label: 'ข้อสอบ' }, { label: 'Exam Blueprints' }]}
        title="จัดการ Exam Blueprints & Quota Validation"
        subtitle="กำหนดพิมพ์เขียวการจำลองสอบ สัดส่วนความยาก การกระจายหัวข้อ และตรวจสอบความพอเพียงของคลังข้อสอบ"
        badges={
          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[var(--primary)] border border-blue-200">
            {blueprints.length} พิมพ์เขียว
          </span>
        }
        actions={
          <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)} className="shadow-xs">
            <Plus className="h-4 w-4 mr-1.5" />
            <span>สร้าง Blueprint ใหม่</span>
          </Button>
        }
      />

      {/* Blueprints and Validation Cards */}
      {isLoading ? (
        <div className="space-y-4">
          <SectionSkeleton className="min-h-[160px]" />
          <SectionSkeleton className="min-h-[160px]" />
        </div>
      ) : (
        <div className="space-y-4">
          {blueprints.length === 0 ? (
            <Card className="p-8 text-center space-y-2">
              <Sliders className="h-8 w-8 mx-auto text-[var(--foreground-muted)] opacity-50" />
              <p className="text-sm font-semibold text-[var(--foreground)]">ยังไม่มี Exam Blueprint ในระบบ</p>
              <p className="text-xs text-[var(--foreground-muted)]">คลิก &quot;สร้าง Blueprint ใหม่&quot; เพื่อกำหนดเกณฑ์การจำลองสอบ</p>
            </Card>
          ) : (
            blueprints.map(bp => {
            const sub = subjects.find(s => s.id === bp.subject_id);
            const subQuestions = questions.filter(q => q.subject_id === bp.subject_id && q.status === 'published');
            const quotas = calculateBlueprintQuota(bp.question_count, bp.topic_distribution, bp.difficulty_distribution);

            let totalShortage = 0;
            const quotaDetails = quotas.map(q => {
              const available = subQuestions.filter(
                item => item.topic_title?.toLowerCase() === q.topic.toLowerCase() && item.difficulty === q.difficulty
              ).length;
              const isShort = available < q.count;
              if (isShort) totalShortage += (q.count - available);
              return { ...q, available, isShort };
            });

            const isFullySatisfied = totalShortage === 0;

            return (
              <Card key={bp.id} className="p-5 space-y-4 border-[var(--border)] hover:border-[var(--border-strong)] transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--border)]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[var(--primary-subtle)] text-[var(--primary)] border border-blue-200">
                        {sub?.name || 'Subject'}
                      </span>
                      <span className="text-xs text-[var(--foreground-muted)]">Slug: <code>{bp.slug}</code></span>
                    </div>
                    <h3 className="text-base font-bold text-[var(--foreground)] mt-1">{bp.name}</h3>
                    <p className="text-xs text-[var(--foreground-muted)]">{bp.description}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right text-xs">
                      <div><strong>{bp.question_count}</strong> ข้อ / <strong>{bp.duration_minutes}</strong> นาที</div>
                      <div className="text-[11px] text-[var(--foreground-muted)]">
                        Easy {bp.difficulty_distribution.easy * 100}% | Med {bp.difficulty_distribution.medium * 100}% | Hard {bp.difficulty_distribution.hard * 100}%
                      </div>
                    </div>
                    {isFullySatisfied ? (
                      <span className="inline-flex items-center text-xs font-semibold text-[var(--success)] bg-[var(--success-subtle)] px-2.5 py-1 rounded border border-green-200">
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        <span>Quota Validated</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                        <AlertTriangle className="h-4 w-4 mr-1 text-amber-600" />
                        <span>Fallback Active ({totalShortage} ข้อขาด)</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Quota Breakdown Table */}
                <div className="space-y-1.5">
                  <div className="text-xs font-semibold text-[var(--foreground)]">
                    การจัดสรรโควตาตามพิมพ์เขียว (Blueprint Quota Matrix):
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                    {quotaDetails.map((qd, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded bg-[var(--surface-subtle)] border border-[var(--border)] flex justify-between items-center"
                      >
                        <div>
                          <div className="font-semibold text-[var(--foreground)] truncate max-w-[160px]">
                            {qd.topic}
                          </div>
                          <div className="text-[10px] text-[var(--foreground-muted)] capitalize">
                            ความยาก: {qd.difficulty}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-semibold">
                            ต้องการ {qd.count} ข้อ
                          </div>
                          <div className={qd.isShort ? 'text-amber-600 text-[10px]' : 'text-green-600 text-[10px]'}>
                            (มีในคลัง {qd.available} ข้อ)
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            );
          }))}
        </div>
      )}

      {/* Modal: Create Blueprint */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} title="สร้างพิมพ์เขียวข้อสอบ (Exam Blueprint)">
        <form onSubmit={handleCreateBlueprint} className="space-y-3 pt-2">
          <div>
            <label className="block text-xs font-semibold mb-1">เลือกวิชา</label>
            <select
              value={subjectId}
              onChange={e => setSubjectId(e.target.value)}
              className="w-full h-9 rounded border border-[var(--border-strong)] bg-[var(--surface)] px-2 text-xs"
              required
            >
              <option value="">-- กรุณาเลือกวิชา --</option>
              {subjects.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <Input label="ชื่อ Blueprint (เช่น Database Midterm 2026)" value={name} onChange={e => setName(e.target.value)} required />
          <Input label="Slug (เช่น db-midterm-2026)" value={slug} onChange={e => setSlug(e.target.value)} />
          <div className="grid grid-cols-2 gap-2">
            <Input label="จำนวนข้อสอบ" type="number" value={questionCount} onChange={e => setQuestionCount(Number(e.target.value))} />
            <Input label="ระยะเวลา (นาที)" type="number" value={durationMinutes} onChange={e => setDurationMinutes(Number(e.target.value))} />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>ยกเลิก</Button>
            <Button type="submit" variant="primary" size="sm">บันทึก Blueprint</Button>
          </div>
        </form>
      </Dialog>
    </PageTransition>
  );
}
