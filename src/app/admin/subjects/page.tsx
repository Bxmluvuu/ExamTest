'use client';

import * as React from 'react';
import Link from 'next/link';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog } from '@/components/ui/dialog';
import { getSubjects, getDataStore, getCurrentSessionUser } from '@/lib/db-adapter';
import { BookOpen, FileText, Plus, Upload, CheckCircle2, ArrowRight } from 'lucide-react';
import type { Subject, SourceDocument } from '@/lib/types/database';

export default function AdminSubjectsPage() {
  const [subjects, setSubjects] = React.useState<Subject[]>([]);
  const [documents, setDocuments] = React.useState<SourceDocument[]>([]);
  const [isNewSubjectModalOpen, setIsNewSubjectModalOpen] = React.useState(false);
  const [isUploadDocModalOpen, setIsUploadDocModalOpen] = React.useState(false);

  // Form states
  const [newSubName, setNewSubName] = React.useState('');
  const [newSubSlug, setNewSubSlug] = React.useState('');
  const [newSubDesc, setNewSubDesc] = React.useState('');
  const [newSubTarget, setNewSubTarget] = React.useState(500);

  const [uploadSubId, setUploadSubId] = React.useState('');
  const [uploadTitle, setUploadTitle] = React.useState('');
  const [uploadType, setUploadType] = React.useState<'slide' | 'past_exam'>('slide');

  const refreshData = React.useCallback(() => {
    const store = getDataStore();
    setSubjects([...store.subjects]);
    setDocuments([...store.source_documents]);
  }, []);

  React.useEffect(() => {
    refreshData();
  }, [refreshData]);

  const handleCreateSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubName.trim()) return;

    const store = getDataStore();
    const newSubject: Subject = {
      id: `sub-${Date.now()}`,
      slug: newSubSlug || newSubName.toLowerCase().replace(/\s+/g, '-'),
      name: newSubName,
      description: newSubDesc,
      language: 'th',
      question_target: Number(newSubTarget) || 500,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    store.subjects.push(newSubject);
    setIsNewSubjectModalOpen(false);
    refreshData();
  };

  const handleUploadDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim() || !uploadSubId) return;

    const store = getDataStore();
    const newDoc: SourceDocument = {
      id: `doc-${Date.now()}`,
      subject_id: uploadSubId,
      title: uploadTitle,
      file_path: `content/subjects/${uploadTitle.toLowerCase().replace(/\s+/g, '-')}.pdf`,
      document_type: uploadType,
      mime_type: 'application/pdf',
      file_size: 48000,
      page_count: 4,
      ocr_status: 'ready',
      extraction_text_summary: 'เอกสารประกอบการสอน อัปโหลดผ่าน Admin Workspace',
      storage_bucket: 'source-documents',
      created_at: new Date().toISOString(),
    };

    store.source_documents.push(newDoc);
    setIsUploadDocModalOpen(false);
    refreshData();
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        breadcrumbs={[{ label: 'เนื้อหา' }, { label: 'รายวิชา' }]}
        title="จัดการรายวิชาและโครงสร้างหลักสูตร (Subjects)"
        subtitle="จัดการรายวิชา โครงสร้างบทเรียน และเอกสารสไลด์/ข้อสอบเก่าในระบบ"
        badges={
          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[var(--primary)] border border-blue-200">
            {subjects.length} วิชา
          </span>
        }
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsUploadDocModalOpen(true)}>
              <Upload className="h-3.5 w-3.5 mr-1.5" />
              <span>อัปโหลดเอกสาร PDF</span>
            </Button>
            <Button variant="primary" size="sm" onClick={() => setIsNewSubjectModalOpen(true)}>
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              <span>เพิ่มวิชาใหม่</span>
            </Button>
          </div>
        }
      />

      {/* Subjects List */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-[var(--foreground)]">รายวิชาทั้งหมดในระบบ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjects.map(sub => {
            const subDocs = documents.filter(d => d.subject_id === sub.id);
            return (
              <Card key={sub.id} className="p-5 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="h-8 w-8 rounded bg-[var(--primary-subtle)] text-[var(--primary)] flex items-center justify-center font-bold">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded bg-[var(--surface-subtle)] border border-[var(--border)] font-medium">
                      เป้าหมาย {sub.question_target} ข้อ
                    </span>
                  </div>

                  <h3 className="font-semibold text-base text-[var(--foreground)] mt-2">{sub.name}</h3>
                  <p className="text-xs text-[var(--foreground-muted)] line-clamp-2">{sub.description}</p>

                  <div className="pt-2 flex items-center gap-2 text-xs text-[var(--foreground-muted)]">
                    <span>{sub.chapters_count || 14} บทเรียน</span>
                    <span>•</span>
                    <span>{subDocs.length} เอกสาร PDF</span>
                    <span>•</span>
                    <span>Slug: <code>{sub.slug}</code></span>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-[var(--border)] flex justify-between items-center">
                  <span className="text-xs text-[var(--success)] font-medium">✓ Active</span>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/subjects/${sub.slug}`}>
                      <span>ดูในมุมมองผู้เรียน</span>
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Documents Table */}
      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <FileText className="h-4 w-4 text-[var(--primary)]" />
            <span>เอกสารสไลด์และข้อสอบเก่า (Source Documents)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-t border-[var(--border)]">
              <thead className="bg-[var(--surface-subtle)] text-[var(--foreground-muted)] uppercase border-b border-[var(--border)]">
                <tr>
                  <th className="p-3">ชื่อเอกสาร</th>
                  <th className="p-3">วิชา</th>
                  <th className="p-3">ประเภท</th>
                  <th className="p-3">จำนวนหน้า</th>
                  <th className="p-3">สถานะ OCR</th>
                  <th className="p-3 text-right">เปิดอ่าน</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {documents.map(doc => {
                  const sub = subjects.find(s => s.id === doc.subject_id);
                  return (
                    <tr key={doc.id} className="hover:bg-[var(--surface-subtle)]">
                      <td className="p-3 font-medium text-[var(--foreground)] max-w-xs truncate">
                        {doc.title}
                      </td>
                      <td className="p-3 whitespace-nowrap">{sub?.name || '-'}</td>
                      <td className="p-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded bg-[var(--surface-subtle)] border text-[11px]">
                          {doc.document_type === 'slide' ? 'Lecture Slide' : 'Past Exam'}
                        </span>
                      </td>
                      <td className="p-3">{doc.page_count} หน้า</td>
                      <td className="p-3 whitespace-nowrap">
                        <span className="inline-flex items-center text-[var(--success)] font-medium">
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                          <span>OCR Verified</span>
                        </span>
                      </td>
                      <td className="p-3 text-right whitespace-nowrap">
                        {sub && (
                          <Button asChild variant="ghost" size="sm" className="h-7 text-xs">
                            <Link href={`/subjects/${sub.slug}/materials/${doc.id}`}>
                              <span>เปิดดู</span>
                            </Link>
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal: Create Subject */}
      <Dialog open={isNewSubjectModalOpen} onClose={() => setIsNewSubjectModalOpen(false)} title="เพิ่มวิชาใหม่">
        <form onSubmit={handleCreateSubject} className="space-y-3 pt-2">
          <Input label="ชื่อวิชา (Subject Name)" value={newSubName} onChange={e => setNewSubName(e.target.value)} required />
          <Input label="Slug ภาษาอังกฤษ (เช่น database-systems)" value={newSubSlug} onChange={e => setNewSubSlug(e.target.value)} />
          <Input label="คำอธิบายวิชา" value={newSubDesc} onChange={e => setNewSubDesc(e.target.value)} />
          <Input label="เป้าหมายจำนวนข้อสอบ (Question Target)" type="number" value={newSubTarget} onChange={e => setNewSubTarget(Number(e.target.value))} />
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsNewSubjectModalOpen(false)}>ยกเลิก</Button>
            <Button type="submit" variant="primary" size="sm">สร้างรายวิชา</Button>
          </div>
        </form>
      </Dialog>

      {/* Modal: Upload Document */}
      <Dialog open={isUploadDocModalOpen} onClose={() => setIsUploadDocModalOpen(false)} title="อัปโหลดเอกสาร PDF เข้า Private Storage">
        <form onSubmit={handleUploadDocument} className="space-y-3 pt-2">
          <div>
            <label className="block text-xs font-semibold mb-1">เลือกวิชาปลายทาง</label>
            <select
              value={uploadSubId}
              onChange={e => setUploadSubId(e.target.value)}
              className="w-full h-9 rounded border border-[var(--border-strong)] bg-[var(--surface)] px-2 text-xs"
              required
            >
              <option value="">-- กรุณาเลือกวิชา --</option>
              {subjects.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <Input label="ชื่อหัวข้อเอกสาร (เช่น Chapter 04 - Transactions.pdf)" value={uploadTitle} onChange={e => setUploadTitle(e.target.value)} required />
          <div>
            <label className="block text-xs font-semibold mb-1">ประเภทเอกสาร</label>
            <select
              value={uploadType}
              onChange={e => setUploadType(e.target.value as any)}
              className="w-full h-9 rounded border border-[var(--border-strong)] bg-[var(--surface)] px-2 text-xs"
            >
              <option value="slide">Slide บรรยายประกอบการสอน</option>
              <option value="past_exam">Past Exam ข้อสอบเก่า</option>
            </select>
          </div>
          <div className="p-3 rounded border border-dashed border-[var(--border-strong)] text-center text-xs text-[var(--foreground-muted)]">
            ลากไฟล์ PDF มาวางที่นี่ หรือจำลองการลงทะเบียนเอกสาร
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsUploadDocModalOpen(false)}>ยกเลิก</Button>
            <Button type="submit" variant="primary" size="sm">บันทึกเอกสาร</Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
