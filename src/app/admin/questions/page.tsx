'use client';

import * as React from 'react';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QuestionStatusBadge, DifficultyBadge, QuestionTypeBadge } from '@/components/ui/status-badge';
import { QuestionEditModal } from '@/components/admin/question-edit-modal';
import { PageTransition } from '@/components/ui/page-transition';
import { TableSkeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/toast';
import {
  getAdminQuestions,
  updateQuestionStatusAction,
  getSubjects,
  getCurrentSessionUser,
} from '@/lib/db-adapter';
import {
  Search,
  Plus,
  Edit2,
  CheckCircle2,
  Archive,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Question, QuestionStatus, QuestionDifficulty, Subject } from '@/lib/types/database';

export default function AdminQuestionsPage() {
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [total, setTotal] = React.useState(0);
  const [subjects, setSubjects] = React.useState<Subject[]>([]);
  const { showToast } = useToast();

  // Filters
  const [search, setSearch] = React.useState('');
  const [selectedSubjectId, setSelectedSubjectId] = React.useState<string>('');
  const [selectedStatus, setSelectedStatus] = React.useState<QuestionStatus | ''>('');
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<QuestionDifficulty | ''>('');

  // Bulk Selection
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
  const [isBatchUpdating, setIsBatchUpdating] = React.useState(false);

  // Edit Modal
  const [editingQuestion, setEditingQuestion] = React.useState<Question | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(true);

  const fetchQuestions = React.useCallback(() => {
    setIsLoading(true);
    getAdminQuestions({
      subjectId: selectedSubjectId || undefined,
      status: selectedStatus || undefined,
      difficulty: selectedDifficulty || undefined,
      search: search || undefined,
    }).then(res => {
      setQuestions(res.questions);
      setTotal(res.total);
      setIsLoading(false);
    });
  }, [selectedSubjectId, selectedStatus, selectedDifficulty, search]);

  React.useEffect(() => {
    getSubjects().then(setSubjects);
    fetchQuestions();
  }, [fetchQuestions]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(new Set(questions.map(q => q.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleBatchStatus = async (status: QuestionStatus) => {
    if (selectedIds.size === 0 || isBatchUpdating) return;
    setIsBatchUpdating(true);
    try {
      const user = getCurrentSessionUser();
      await updateQuestionStatusAction(Array.from(selectedIds), status, user.id);
      showToast(`เปลี่ยนสถานะ ${selectedIds.size} ข้อสอบเป็น "${status}" เรียบร้อยแล้ว`, 'success');
      setSelectedIds(new Set());
      fetchQuestions();
    } catch (err) {
      console.error('Batch status update error:', err);
      showToast('ไม่สามารถอัปเดตสถานะข้อสอบได้', 'error');
    } finally {
      setIsBatchUpdating(false);
    }
  };

  const user = getCurrentSessionUser();

  const publishedCount = questions.filter(q => q.status === 'published').length;
  const reviewCount = questions.filter(q => q.status === 'needs_review').length;

  return (
    <PageTransition className="space-y-6">
      <AdminPageHeader
        breadcrumbs={[{ label: 'ข้อสอบ' }, { label: 'คลังคำถาม' }]}
        title="คลังคำถามและจัดการข้อสอบ (Question Bank)"
        subtitle="ค้นหา ตรวจสอบ อนุมัติ และเผยแพร่ข้อสอบสู่ระบบจำลองการสอบจริง"
        badges={
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[var(--primary)] border border-blue-200">
              {total} ข้อทั้งหมด
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-[var(--success)] border border-emerald-200">
              {publishedCount} เผยแพร่แล้ว
            </span>
            {reviewCount > 0 && (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                {reviewCount} รอตรวจ
              </span>
            )}
          </div>
        }
        actions={
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setEditingQuestion(null);
              setIsModalOpen(true);
            }}
            className="shadow-xs"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            <span>เพิ่มคำถามใหม่</span>
          </Button>
        }
      />

      {/* Filter Toolbar */}
      <Card className="p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="h-4 w-4 text-[var(--foreground-muted)] absolute left-3 top-3" />
            <input
              type="text"
              placeholder="ค้นหาโจทย์คำถามหรือหัวข้อ..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="h-10 w-full rounded-[var(--radius)] border border-[var(--border-strong)] bg-[var(--surface)] pl-9 pr-3 text-xs text-[var(--foreground)]"
            />
          </div>

          <select
            value={selectedSubjectId}
            onChange={e => setSelectedSubjectId(e.target.value)}
            className="h-10 rounded-[var(--radius)] border border-[var(--border-strong)] bg-[var(--surface)] px-3 text-xs text-[var(--foreground)]"
          >
            <option value="">ทุกวิชา</option>
            {subjects.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value as any)}
            className="h-10 rounded-[var(--radius)] border border-[var(--border-strong)] bg-[var(--surface)] px-3 text-xs text-[var(--foreground)]"
          >
            <option value="">ทุกสถานะ (Lifecycle)</option>
            <option value="draft">Draft (ฉบับร่าง)</option>
            <option value="needs_review">Needs Review (รอตรวจ)</option>
            <option value="approved">Approved (อนุมัติแล้ว)</option>
            <option value="published">Published (เผยแพร่แล้ว)</option>
            <option value="retired">Retired (ยกเลิก)</option>
          </select>

          <select
            value={selectedDifficulty}
            onChange={e => setSelectedDifficulty(e.target.value as any)}
            className="h-10 rounded-[var(--radius)] border border-[var(--border-strong)] bg-[var(--surface)] px-3 text-xs text-[var(--foreground)]"
          >
            <option value="">ทุกระดับความยาก</option>
            <option value="easy">Easy (ง่าย)</option>
            <option value="medium">Medium (ปานกลาง)</option>
            <option value="hard">Hard (ยาก)</option>
          </select>
        </div>

        {/* Bulk Action Bar (When selected) */}
        {selectedIds.size > 0 && (
          <div className="p-2.5 rounded bg-[var(--primary-subtle)] border border-blue-200 flex flex-wrap items-center justify-between gap-2 text-xs motion-slide-up">
            <span className="font-semibold text-[var(--primary)]">
              เลือกแล้ว {selectedIds.size} รายการ:
            </span>
            <div className="flex items-center gap-1.5">
              <Button
                variant="primary"
                size="sm"
                className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700"
                disabled={isBatchUpdating}
                isLoading={isBatchUpdating}
                onClick={() => handleBatchStatus('published')}
              >
                <CheckCircle2 className="h-3 w-3 mr-1" />
                <span>Batch Publish</span>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="h-7 text-xs"
                disabled={isBatchUpdating}
                onClick={() => handleBatchStatus('approved')}
              >
                <span>Batch Approve</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs text-rose-600 hover:bg-red-50"
                disabled={isBatchUpdating}
                onClick={() => handleBatchStatus('retired')}
              >
                <Archive className="h-3 w-3 mr-1" />
                <span>Batch Retire</span>
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Questions Data Table */}
      {isLoading ? (
        <TableSkeleton rows={8} cols={7} />
      ) : (
        <Card>
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold">
              รายการคำถาม ({questions.length} จากทั้งหมด {total} ข้อ)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-t border-[var(--border)]">
                <thead className="bg-[var(--surface-subtle)] text-[var(--foreground-muted)] uppercase border-b border-[var(--border)]">
                  <tr>
                    <th className="p-3 w-10 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.size === questions.length && questions.length > 0}
                        onChange={handleSelectAll}
                        className="rounded cursor-pointer"
                        aria-label="Select all"
                      />
                    </th>
                    <th className="p-3">โจทย์คำถาม</th>
                    <th className="p-3">หัวข้อ / บท</th>
                    <th className="p-3">ความยาก</th>
                    <th className="p-3">สถานะ</th>
                    <th className="p-3">Citation</th>
                    <th className="p-3 text-right">การจัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {questions.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-xs text-[var(--foreground-muted)]">
                        ยังไม่มีคำถามในคลังข้อสอบ (คลิก &quot;เพิ่มคำถามใหม่&quot; หรือใช้ AI Generation Runs เพื่อเริ่มต้น)
                      </td>
                    </tr>
                  ) : (
                    questions.map(q => {
                    const isSelected = selectedIds.has(q.id);
                    return (
                      <tr
                        key={q.id}
                        className={cn(
                          'hover:bg-[var(--surface-subtle)]/70 transition-colors duration-120',
                          isSelected && 'bg-blue-50/40'
                        )}
                      >
                        <td className="p-3 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleSelect(q.id)}
                            className="rounded cursor-pointer"
                            aria-label={`Select question ${q.id}`}
                          />
                        </td>
                        <td className="p-3 max-w-sm">
                          <div className="font-medium text-[var(--foreground)] line-clamp-2">
                            {q.question_text}
                          </div>
                          <div className="flex items-center gap-1.5 mt-1">
                            <QuestionTypeBadge type={q.question_type} />
                            {q.is_ai_generated && (
                              <span className="text-[10px] text-purple-600 bg-purple-50 px-1 rounded inline-block border border-purple-200">
                                AI Generated
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <div className="text-[var(--foreground)]">{q.topic_title || '-'}</div>
                          <div className="text-[10px] text-[var(--foreground-muted)]">{q.chapter_title}</div>
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <DifficultyBadge difficulty={q.difficulty} />
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <QuestionStatusBadge status={q.status} />
                        </td>
                        <td className="p-3 whitespace-nowrap text-[11px] text-[var(--foreground-muted)]">
                          {q.source ? `${q.source.file_name} (p.${q.source.page_numbers.join(',')})` : '-'}
                        </td>
                        <td className="p-3 text-right whitespace-nowrap">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs hover:bg-[var(--surface-subtle)]"
                            onClick={() => {
                              setEditingQuestion(q);
                              setIsModalOpen(true);
                            }}
                          >
                            <Edit2 className="h-3.5 w-3.5 mr-1" />
                            <span>แก้ไข</span>
                          </Button>
                        </td>
                      </tr>
                    );
                  }))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Question Edit / Create Drawer Modal */}
      <QuestionEditModal
        question={editingQuestion}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={fetchQuestions}
        adminUserId={user.id}
        subjects={subjects}
      />
    </PageTransition>
  );
}
