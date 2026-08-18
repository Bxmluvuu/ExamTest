'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LearnerPageHeader } from '@/components/learner/learner-page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageTransition } from '@/components/ui/page-transition';
import { FormSkeleton } from '@/components/ui/skeleton';
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
    <React.Suspense fallback={<div className="max-w-4xl mx-auto space-y-6"><FormSkeleton fields={4} /></div>}>
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
    if (!selectedSubjectId || isStarting) return;
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
    <PageTransition className="max-w-4xl mx-auto space-y-6">
      <LearnerPageHeader
        title="ตั้งค่าและเริ่มทำข้อสอบ (Exam Setup)"
        description="เลือกวิชา รูปแบบการทดสอบ และจำนวนข้อเพื่อสร้างชุดข้อสอบตาม Exam Blueprint"
      />

      {errorMsg && (
        <div
          role="alert"
          className="p-4 rounded-[var(--radius)] bg-red-50 text-red-700 border border-red-200 text-sm flex items-center gap-2 motion-slide-up"
        >
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-600" />
          <span className="font-medium">{errorMsg}</span>
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
                        'p-3 rounded-[var(--radius)] border text-left flex flex-col justify-between transition-all duration-150 cursor-pointer select-none',
                        isSelected
                          ? 'border-[var(--primary)] bg-[var(--primary-subtle)] text-[var(--primary)] ring-1 ring-[var(--primary)] font-medium'
                          : 'border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-subtle)] active:scale-[0.98]'
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
                        'p-3.5 rounded-[var(--radius)] border cursor-pointer transition-all duration-150 select-none',
                        isSelected
                          ? 'border-[var(--primary)] bg-[var(--primary-subtle)] text-[var(--primary)] ring-1 ring-[var(--primary)] font-medium'
                          : 'border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-subtle)] hover:border-[var(--border-strong)]'
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
            <Card className="motion-slide-up">
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
            <CardContent className="space-y-5">
              {/* Question Count Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-[var(--foreground)]">
                    จำนวนข้อสอบที่ต้องการทำ:
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[var(--primary)] bg-[var(--primary-subtle)] px-2.5 py-0.5 rounded-full border border-[var(--primary)]/20">
                      {questionCount} ข้อ
                    </span>
                    {availableQuestionsCount > 0 && questionCount !== availableQuestionsCount && (
                      <button
                        type="button"
                        onClick={() => setQuestionCount(Math.min(availableQuestionsCount, 100))}
                        className="text-[11px] text-[var(--primary)] hover:underline font-medium cursor-pointer"
                      >
                        (เลือกสูงสุด {Math.min(availableQuestionsCount, 100)} ข้อ)
                      </button>
                    )}
                  </div>
                </div>

                {/* Preset Chips */}
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 mb-3">
                  {[5, 10, 20, 25, 40, 50, 75, 100].map(cnt => {
                    const isExceed = availableQuestionsCount > 0 && cnt > availableQuestionsCount;
                    const isSelected = questionCount === cnt;
                    return (
                      <button
                        key={cnt}
                        type="button"
                        disabled={isExceed}
                        onClick={() => setQuestionCount(cnt)}
                        className={cn(
                          'py-1.5 px-2 rounded-[var(--radius)] border text-xs font-semibold transition-all duration-150 cursor-pointer text-center',
                          isSelected
                            ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-xs'
                            : isExceed
                            ? 'bg-[var(--surface-subtle)] text-[var(--foreground-muted)] border-[var(--border)] opacity-40 cursor-not-allowed'
                            : 'bg-[var(--surface)] text-[var(--foreground)] border-[var(--border)] hover:bg-[var(--surface-subtle)] hover:border-[var(--border-strong)]'
                        )}
                      >
                        {cnt} ข้อ
                      </button>
                    );
                  })}
                </div>

                {/* Slider + Custom Input */}
                <div className="flex items-center gap-3 pt-1">
                  <input
                    type="range"
                    min={5}
                    max={Math.max(25, Math.min(availableQuestionsCount || 100, 100))}
                    step={5}
                    value={questionCount}
                    onChange={e => setQuestionCount(Number(e.target.value))}
                    className="flex-1 accent-[var(--primary)] cursor-pointer h-2 bg-[var(--surface-subtle)] rounded-lg"
                  />
                  <div className="flex items-center gap-1.5 shrink-0">
                    <input
                      type="number"
                      min={1}
                      max={Math.max(1, availableQuestionsCount || 100)}
                      value={questionCount}
                      onChange={e => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val)) {
                          setQuestionCount(Math.max(1, Math.min(val, availableQuestionsCount || 100)));
                        }
                      }}
                      className="w-16 h-8 text-center text-xs font-bold rounded border border-[var(--border-strong)] bg-[var(--surface)] px-1"
                    />
                    <span className="text-xs text-[var(--foreground-muted)]">ข้อ</span>
                  </div>
                </div>
              </div>

              {/* Difficulty Selection */}
              <div>
                <label className="block text-xs font-semibold text-[var(--foreground)] mb-2">
                  ระดับความยาก (Difficulty Filter)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { key: 'all', label: 'ผสมตาม Blueprint', desc: 'ทุกระดับความยาก' },
                    { key: 'easy', label: 'ง่าย (Easy)', desc: 'ทบทวนพื้นฐาน' },
                    { key: 'medium', label: 'ปานกลาง (Medium)', desc: 'ระดับมาตรฐาน' },
                    { key: 'hard', label: 'ยาก (Hard)', desc: 'เจาะลึก/วิเคราะห์' },
                  ].map(d => (
                    <button
                      key={d.key}
                      type="button"
                      onClick={() => setDifficulty(d.key as any)}
                      className={cn(
                        'p-2.5 rounded-[var(--radius)] border text-left transition-all duration-150 cursor-pointer',
                        difficulty === d.key
                          ? 'border-[var(--primary)] bg-[var(--primary-subtle)] text-[var(--primary)] ring-1 ring-[var(--primary)] font-semibold'
                          : 'border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-subtle)]'
                      )}
                    >
                      <div className="text-xs font-semibold">{d.label}</div>
                      <div className="text-[10px] text-[var(--foreground-muted)] mt-0.5">{d.desc}</div>
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
              <div className="pt-2 border-t border-[var(--border)]">
                <span className="text-[11px] text-[var(--foreground-muted)] block mb-1.5 font-medium">รูปแบบข้อสอบที่รองรับ:</span>
                <div className="flex flex-wrap gap-1">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">ปรนัย 4 ตัวเลือก</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">เติมคำในช่องว่าง</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-teal-50 text-teal-700 border border-teal-200">จับคู่</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--border)]">
                <Button
                  onClick={handleStartExam}
                  disabled={!isFormValid || isStarting}
                  isLoading={isStarting}
                  variant="primary"
                  size="md"
                  className="w-full bg-blue-600 hover:bg-blue-700 shadow-xs"
                >
                  <span>{isStarting ? 'กำลังจัดเตรียมชุดข้อสอบ...' : 'เริ่มทำข้อสอบ'}</span>
                  {!isStarting && <ArrowRight className="h-4 w-4 ml-1.5" />}
                </Button>

                {!isFormValid && (
                  <p className="text-[11px] text-rose-600 mt-2 text-center font-medium">
                    * ไม่พบคำถามที่เผยแพร่ในระบบ กรุณาเลือกวิชาอื่น
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
