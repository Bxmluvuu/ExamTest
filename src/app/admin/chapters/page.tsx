'use client';

import * as React from 'react';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog } from '@/components/ui/dialog';
import { getDataStore, getSubjects } from '@/lib/db-adapter';
import { Layers, Plus, BookOpen } from 'lucide-react';
import type { Chapter, Topic, Subject } from '@/lib/types/database';

export default function AdminChaptersPage() {
  const [subjects, setSubjects] = React.useState<Subject[]>([]);
  const [chapters, setChapters] = React.useState<Chapter[]>([]);
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Form states
  const [newTitle, setNewTitle] = React.useState('');
  const [newDesc, setNewDesc] = React.useState('');
  const [newOrder, setNewOrder] = React.useState(1);

  const refreshData = React.useCallback(() => {
    const store = getDataStore();
    setSubjects([...store.subjects]);
    setChapters([...store.chapters]);
    setTopics([...store.topics]);
    if (!selectedSubjectId && store.subjects.length > 0) {
      setSelectedSubjectId(store.subjects[0].id);
    }
  }, [selectedSubjectId]);

  React.useEffect(() => {
    refreshData();
  }, [refreshData]);

  const filteredChapters = chapters.filter(c => c.subject_id === selectedSubjectId);

  const handleCreateChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !selectedSubjectId) return;

    const store = getDataStore();
    const newCh: Chapter = {
      id: `ch-${Date.now()}`,
      subject_id: selectedSubjectId,
      sequence_order: Number(newOrder) || (filteredChapters.length + 1),
      title: newTitle,
      description: newDesc,
      created_at: new Date().toISOString(),
    };

    store.chapters.push(newCh);
    setIsModalOpen(false);
    refreshData();
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        breadcrumbs={[{ label: 'เนื้อหา' }, { label: 'บทและหัวข้อ' }]}
        title="จัดการบทเรียนและหัวข้อย่อย (Chapters & Topics)"
        subtitle="จัดการลำดับบทเรียนและหัวข้อย่อยสำหรับผูกโยงกับ Blueprint และคลังข้อสอบ"
        badges={
          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[var(--primary)] border border-blue-200">
            {chapters.length} บทเรียนทั้งหมด
          </span>
        }
        actions={
          <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            <span>เพิ่มบทเรียนใหม่</span>
          </Button>
        }
      />

      {/* Subject Filter Bar */}
      <Card className="p-3">
        <div className="flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[var(--foreground-muted)] font-medium shrink-0">เลือกวิชา:</span>
          {subjects.map(s => (
            <button
              key={s.id}
              onClick={() => setSelectedSubjectId(s.id)}
              className={`px-3 py-1.5 rounded font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                selectedSubjectId === s.id
                  ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                  : 'bg-[var(--surface)] text-[var(--foreground)] border-[var(--border)] hover:bg-[var(--surface-subtle)]'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </Card>

      {/* Chapters list */}
      <div className="space-y-4">
        {filteredChapters.map(ch => {
          const chTopics = topics.filter(t => t.chapter_id === ch.id);
          return (
            <Card key={ch.id} className="p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-6 w-6 rounded bg-[var(--primary-subtle)] text-[var(--primary)] font-bold text-xs flex items-center justify-center">
                    {ch.sequence_order}
                  </span>
                  <h3 className="font-semibold text-sm text-[var(--foreground)]">{ch.title}</h3>
                </div>
                <span className="text-xs text-[var(--foreground-muted)]">{chTopics.length} หัวข้อย่อย</span>
              </div>

              {ch.description && (
                <p className="text-xs text-[var(--foreground-muted)]">{ch.description}</p>
              )}

              <div className="pt-2 border-t border-[var(--border)] space-y-1.5">
                <div className="text-[11px] font-semibold text-[var(--foreground-muted)] uppercase">
                  หัวข้อ (Topics):
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {chTopics.map(t => (
                    <span
                      key={t.id}
                      className="px-2.5 py-1 rounded bg-[var(--surface-subtle)] text-[var(--foreground)] text-xs border border-[var(--border)]"
                    >
                      {t.title}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Modal: Create Chapter */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} title="เพิ่มบทเรียนใหม่">
        <form onSubmit={handleCreateChapter} className="space-y-3 pt-2">
          <Input label="ชื่อบทเรียน" value={newTitle} onChange={e => setNewTitle(e.target.value)} required />
          <Input label="ลำดับบทเรียน (Sequence Order)" type="number" value={newOrder} onChange={e => setNewOrder(Number(e.target.value))} />
          <Input label="คำอธิบายสั้น" value={newDesc} onChange={e => setNewDesc(e.target.value)} />
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>ยกเลิก</Button>
            <Button type="submit" variant="primary" size="sm">บันทึกบทเรียน</Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
