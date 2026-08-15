'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LearnerPageHeader } from '@/components/learner/learner-page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  GraduationCap,
  Layers,
  Zap,
  Clock,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import {
  getSubjects,
  getSubjectBySlug,
  createExamAttemptAction,
  getCurrentSessionUser,
  getDataStore,
} from '@/lib/db-adapter';
import { cn } from '@/lib/utils';
import type { Subject, ExamMode, QuestionDifficulty, Chapter, Topic } from '@/lib/types/database';

export default function ExamSetupPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-center text-xs text-[var(--foreground-muted)]">กำลังเตรียมหน้าต่างตั้งค่าการสอบ...</div>}>
      <ExamSetupForm />
    </React.Suspense>
  );
}

function ExamSetupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSubjectId = searchParams.get('subjectId');
  const initialMode = (searchParams.get('mode') as ExamMode) || 'exam';
  const initialChapterId = searchParams.get('chapterId') || '';

  const [subjects, setSubjects] = React.useState<Subject[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = React.useState(initialSubjectId || '');
  const [mode, setMode] = React.useState<ExamMode>(initialMode);
  const [questionCount, setQuestionCount] = React.useState<number>(10);
  const [difficulty, setDifficulty] = React.useState<QuestionDifficulty | 'all'>('all');
  const [selectedChapterId, setSelectedChapterId] = React.useState(initialChapterId);
  const [selectedTopicIds, setSelectedTopicIds] = React.useState<string[]>([]);

  const [chapters, setChapters] = React.useState<Array<Chapter & { topics: Topic[] }>>([]);
  const [isStarting, setIsStarting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  React.useEffect(() => {
    getSubjects().then(list => {
      setSubjects(list);
      if (!selectedSubjectId && list.length > 0) {
        setSelectedSubjectId(list[0].id);
      }
    });
  }, [selectedSubjectId]);

  React.useEffect(() => {
    if (selectedSubjectId) {
      const store = getDataStore();
      const sub = store.subjects.find(s => s.id === selectedSubjectId);
      if (sub) {
        getSubjectBySlug(sub.slug).then(res => {
          if (res) setChapters(res.chapters);
        });
      }
    }
  }, [selectedSubjectId]);

  const activeSubject = subjects.find(s => s.id === selectedSubjectId);

  // Available questions check
  const availableQuestionsCount = React.useMemo(() => {
    const store = getDataStore();
    return store.questions.filter(q => q.subject_id === selectedSubjectId && q.status === 'published').length;
  }, [selectedSubjectId]);

  const handleStartExam = async () => {
    if (!selectedSubjectId) return;
    setIsStarting(true);
    setErrorMsg('');

    const user = getCurrentSessionUser();

    try {
      const res = await createExamAttemptAction({
        userId: user.id,
        subjectId: selectedSubjectId,
        mode,
        targetCount: questionCount,
        chapterId: mode === 'chapter' ? selectedChapterId : undefined,
        topicIds: mode === 'chapter' ? selectedTopicIds : undefined,
        difficulty: difficulty === 'all' ? undefined : difficulty,
      });

      if (res.success && res.attemptId) {
        router.push(`/attempts/${res.attemptId}`);
      } else {
        setErrorMsg(res.error || 'ไม่สามารถสร้างชุดข้อสอบได้');
        setIsStarting(false);
      }
    } catch (err) {
      console.error('Failed to create attempt:', err);
      setErrorMsg('เกิดข้อผิดพลาดในการเริ่มทำข้อสอบ');
      setIsStarting(false);
    }
  };

  const isFormValid = Boolean(selectedSubjectId) && availableQuestionsCount > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <LearnerPageHeader
        title="ตั้งค่าและเริ่มทำข้อสอบ (Exam Setup)"
        description="เลือกวิชา รูปแบบการทดสอบ และจำนวนข้อเพื่อสร้างชุดข้อสอบตาม Exam Blueprint"
      />

      {errorMsg && (
        <div className="p-4 rounded-[var(--radius)] bg-red-50 text-red-700 border border-red-200 text-sm flex items-center gap-2">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Main Controls Column */}
        <div className="md:col-span-8 space-y-6">
          {/* 1. Mode Selection (Segmented Control) */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">1. เลือกโหมดการทดสอบ (Exam Mode)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { key: 'exam', label: 'Exam Blueprint', icon: GraduationCap, desc: 'จำลองสอบจริง' },
                  { key: 'chapter', label: 'ตามบทเรียน', icon: Layers, desc: 'เลือกบท/หัวข้อ' },
                  { key: 'weakness', label: 'ฝึกจุดอ่อน', icon: Zap, desc: 'เน้นข้อที่ผิดบ่อย' },
                  { key: 'mistakes', label: 'ทบทวนข้อผิด', icon: Clock, desc: 'ข้อที่เคยตอบผิด' },
                ].map(item => {
                  const Icon = item.icon;
                  const isSelected = mode === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setMode(item.key as ExamMode)}
                      className={cn(
                        'p-3 rounded-[var(--radius)] border text-left flex flex-col justify-between transition-all cursor-pointer select-none',
                        isSelected
                          ? 'border-[var(--primary)] bg-[var(--primary-subtle)] text-[var(--primary)] ring-1 ring-[var(--primary)] font-medium'
                          : 'border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-subtle)]'
                      )}
                    >
                      <Icon className="h-5 w-5 mb-2" />
                      <div>
                        <div className="text-xs font-semibold">{item.label}</div>
                        <div className="text-[10px] text-[var(--foreground-muted)]">{item.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* 2. Subject Selection */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">2. เลือกวิชา (Subject)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {subjects.map(sub => {
                  const isSelected = selectedSubjectId === sub.id;
                  return (
                    <div
                      key={sub.id}
                      onClick={() => setSelectedSubjectId(sub.id)}
                      className={cn(
                        'p-3.5 rounded-[var(--radius)] border cursor-pointer transition-all',
                        isSelected
                          ? 'border-[var(--primary)] bg-[var(--primary-subtle)] text-[var(--primary)] ring-1 ring-[var(--primary)]'
                          : 'border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-subtle)]'
                      )}
                    >
                      <div className="font-semibold text-sm text-[var(--foreground)]">{sub.name}</div>
                      <div className="text-xs text-[var(--foreground-muted)] mt-1 line-clamp-1">{sub.description}</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* 3. Chapter Details (If Chapter Mode) */}
          {mode === 'chapter' && chapters.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">3. เลือกบทเรียนที่ต้องการฝึก</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <select
                  value={selectedChapterId}
                  onChange={e => setSelectedChapterId(e.target.value)}
                  className="w-full h-10 rounded border border-[var(--border-strong)] bg-[var(--surface)] px-3 text-sm"
                >
                  <option value="">ทุกบทเรียนในวิชานี้</option>
                  {chapters.map(ch => (
                    <option key={ch.id} value={ch.id}>
                      บทที่ {ch.sequence_order}: {ch.title}
                    </option>
                  ))}
                </select>
              </CardContent>
            </Card>
          )}

          {/* 4. Question Count & Difficulty Stepper */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">4. กำหนดจำนวนข้อและระดับความยาก</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--foreground)] mb-2">
                  จำนวนข้อสอบ: <strong className="text-[var(--primary)]">{questionCount} ข้อ</strong>
                </label>
                <div className="flex gap-2">
                  {[5, 10, 15, 20, 25].map(cnt => (
                    <button
                      key={cnt}
                      type="button"
                      onClick={() => setQuestionCount(cnt)}
                      className={cn(
                        'flex-1 py-1.5 rounded border text-xs font-semibold transition-colors cursor-pointer',
                        questionCount === cnt
                          ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                          : 'bg-[var(--surface)] text-[var(--foreground)] border-[var(--border)] hover:bg-[var(--surface-subtle)]'
                      )}
                    >
                      {cnt} ข้อ
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--foreground)] mb-2">
                  ระดับความยาก (Difficulty Filter)
                </label>
                <div className="flex gap-2">
                  {[
                    { key: 'all', label: 'ผสมตาม Blueprint' },
                    { key: 'easy', label: 'ง่าย (Easy)' },
                    { key: 'medium', label: 'ปานกลาง (Medium)' },
                    { key: 'hard', label: 'ยาก (Hard)' },
                  ].map(d => (
                    <button
                      key={d.key}
                      type="button"
                      onClick={() => setDifficulty(d.key as any)}
                      className={cn(
                        'flex-1 py-1.5 rounded border text-xs font-medium transition-colors cursor-pointer',
                        difficulty === d.key
                          ? 'bg-[var(--primary)] text-white border-[var(--primary)] font-semibold'
                          : 'bg-[var(--surface)] text-[var(--foreground)] border-[var(--border)] hover:bg-[var(--surface-subtle)]'
                      )}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Summary Panel */}
        <div className="md:col-span-4 sticky top-20 space-y-4">
          <Card className="border-[var(--border)] shadow-xs">
            <CardHeader className="pb-3 border-b border-[var(--border)]">
              <CardTitle className="text-sm font-semibold">สรุปชุดข้อสอบ (Exam Summary)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-4 text-xs">
              <div className="flex justify-between">
                <span className="text-[var(--foreground-muted)]">วิชาที่เลือก:</span>
                <span className="font-semibold text-[var(--foreground)] truncate max-w-[150px]">
                  {activeSubject?.name || '-'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--foreground-muted)]">โหมดการสอบ:</span>
                <span className="font-semibold text-[var(--primary)] capitalize">{mode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--foreground-muted)]">จำนวนคำถาม:</span>
                <span className="font-semibold text-[var(--foreground)]">{questionCount} ข้อ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--foreground-muted)]">ระยะเวลาที่ให้:</span>
                <span className="font-semibold text-[var(--foreground)]">{questionCount * 2} นาที</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--foreground-muted)]">คลังข้อสอบพร้อมใช้งาน:</span>
                <span className="font-semibold text-[var(--success)]">{availableQuestionsCount} ข้อ</span>
              </div>

              <div className="pt-3 border-t border-[var(--border)]">
                <Button
                  onClick={handleStartExam}
                  disabled={!isFormValid || isStarting}
                  isLoading={isStarting}
                  variant="primary"
                  size="md"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <span>เริ่มทำข้อสอบ</span>
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>

                {!isFormValid && (
                  <p className="text-[11px] text-rose-600 mt-2 text-center">
                    * ไม่พบคำถามที่เผยแพร่ในระบบ กรุณาเลือกวิชาอื่น
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
