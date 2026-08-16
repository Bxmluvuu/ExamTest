'use client';

import * as React from 'react';
import Link from 'next/link';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog } from '@/components/ui/dialog';
import { PageTransition } from '@/components/ui/page-transition';
import { TableSkeleton } from '@/components/ui/skeleton';
import { UploadProgress } from '@/components/ui/upload-progress';
import { useToast } from '@/components/ui/toast';
import { getDataStore, getSubjects } from '@/lib/db-adapter';
import { FileText, Upload, CheckCircle2, Search, ExternalLink } from 'lucide-react';
import type { SourceDocument, Subject } from '@/lib/types/database';

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = React.useState<SourceDocument[]>([]);
  const [subjects, setSubjects] = React.useState<Subject[]>([]);
  const [search, setSearch] = React.useState('');
  const [selectedSubId, setSelectedSubId] = React.useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const { showToast } = useToast();

  // Form states
  const [uploadSubId, setUploadSubId] = React.useState('');
  const [uploadTitle, setUploadTitle] = React.useState('');
  const [uploadType, setUploadType] = React.useState<'slide' | 'past_exam'>('slide');

  const refreshData = React.useCallback(() => {
    setIsLoading(true);
    const store = getDataStore();
    setDocuments([...store.source_documents]);
    setSubjects([...store.subjects]);
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    refreshData();
  }, [refreshData]);

  const handleUploadDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim() || !uploadSubId || isUploading) return;

    setIsUploading(true);
    setUploadProgress(15);

    // Simulate smooth upload & OCR steps
    const timer1 = setTimeout(() => setUploadProgress(50), 300);
    const timer2 = setTimeout(() => setUploadProgress(85), 600);
    const timer3 = setTimeout(() => {
      setUploadProgress(100);

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
      setIsUploading(false);
      setIsUploadModalOpen(false);
      setUploadTitle('');
      setUploadProgress(0);
      refreshData();
      showToast(`อัปโหลดเอกสาร "${uploadTitle}" สำเร็จและผ่านการตรวจสอบ OCR`, 'success');
    }, 900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  const filteredDocs = documents.filter(d => {
    const matchSub = !selectedSubId || d.subject_id === selectedSubId;
    const matchSearch = !search || d.title.toLowerCase().includes(search.toLowerCase());
    return matchSub && matchSearch;
  });

  return (
    <PageTransition className="space-y-6">
      <AdminPageHeader
        breadcrumbs={[{ label: 'เนื้อหา' }, { label: 'เอกสาร & สไลด์' }]}
        title="จัดการเอกสารและสไลด์เนื้อหา (Source Documents)"
        subtitle="คลังเอกสาร PDF ใน Private Storage สำหรับการประมวลผล OCR และ AI Question Extraction"
        badges={
          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[var(--primary)] border border-blue-200">
            {documents.length} ฉบับในระบบ
          </span>
        }
        actions={
          <Button variant="primary" size="sm" onClick={() => setIsUploadModalOpen(true)} className="shadow-xs">
            <Upload className="h-3.5 w-3.5 mr-1.5" />
            <span>อัปโหลดเอกสาร PDF</span>
          </Button>
        }
      />

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <Search className="h-4 w-4 text-[var(--foreground-muted)] absolute left-3 top-3" />
            <input
              type="text"
              placeholder="ค้นหาชื่อเอกสาร..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="h-10 w-full rounded-[var(--radius)] border border-[var(--border-strong)] bg-[var(--surface)] pl-9 pr-3 text-xs text-[var(--foreground)]"
            />
          </div>

          <select
            value={selectedSubId}
            onChange={e => setSelectedSubId(e.target.value)}
            className="h-10 rounded-[var(--radius)] border border-[var(--border-strong)] bg-[var(--surface)] px-3 text-xs text-[var(--foreground)]"
          >
            <option value="">ทุกวิชา</option>
            {subjects.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Documents Table */}
      {isLoading ? (
        <TableSkeleton rows={5} cols={7} />
      ) : (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">
              รายการเอกสาร ({filteredDocs.length} ฉบับ)
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
                    <th className="p-3">Private Bucket</th>
                    <th className="p-3">สถานะ OCR</th>
                    <th className="p-3 text-right">เปิดดู</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {filteredDocs.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-xs text-[var(--foreground-muted)]">
                        ยังไม่มีเอกสารในระบบ (คลิก &quot;อัปโหลดเอกสาร PDF&quot; เพื่อเริ่มต้น)
                      </td>
                    </tr>
                  ) : (
                    filteredDocs.map(doc => {
                    const sub = subjects.find(s => s.id === doc.subject_id);
                    return (
                      <tr key={doc.id} className="hover:bg-[var(--surface-subtle)] transition-colors duration-120">
                        <td className="p-3 font-medium text-[var(--foreground)]">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-[var(--primary)] shrink-0" />
                            <span>{doc.title}</span>
                          </div>
                        </td>
                        <td className="p-3 whitespace-nowrap">{sub?.name || '-'}</td>
                        <td className="p-3 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded bg-[var(--surface-subtle)] border text-[11px]">
                            {doc.document_type === 'slide' ? 'Lecture Slide' : 'Past Exam'}
                          </span>
                        </td>
                        <td className="p-3 whitespace-nowrap">{doc.page_count} หน้า</td>
                        <td className="p-3 whitespace-nowrap font-mono text-[11px] text-[var(--foreground-muted)]">
                          {doc.storage_bucket}
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <span className="inline-flex items-center text-[var(--success)] font-medium">
                            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                            <span>OCR Verified Ready</span>
                          </span>
                        </td>
                        <td className="p-3 text-right whitespace-nowrap">
                          {sub && (
                            <Button asChild variant="ghost" size="sm" className="h-7 text-xs hover:bg-[var(--surface-subtle)]">
                              <Link href={`/subjects/${sub.slug}/materials/${doc.id}`} target="_blank">
                                <span>เปิดอ่าน</span>
                                <ExternalLink className="h-3 w-3 ml-1" />
                              </Link>
                            </Button>
                          )}
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

      {/* Upload Modal */}
      <Dialog open={isUploadModalOpen} onClose={() => !isUploading && setIsUploadModalOpen(false)} title="อัปโหลดเอกสาร PDF">
        <form onSubmit={handleUploadDocument} className="space-y-3 pt-2">
          {isUploading ? (
            <UploadProgress
              progress={uploadProgress}
              fileName={uploadTitle || 'document.pdf'}
              status="uploading"
            />
          ) : (
            <>
              <div>
                <label className="block text-xs font-semibold mb-1">เลือกวิชา</label>
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
              <Input label="ชื่อเอกสาร" value={uploadTitle} onChange={e => setUploadTitle(e.target.value)} required />
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
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsUploadModalOpen(false)}>ยกเลิก</Button>
                <Button type="submit" variant="primary" size="sm">บันทึกเอกสาร</Button>
              </div>
            </>
          )}
        </form>
      </Dialog>
    </PageTransition>
  );
}
