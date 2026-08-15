'use client';

import * as React from 'react';
import { FileText, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Bookmark, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { SourceDocument } from '@/lib/types/database';

export function DocumentViewer({
  document,
  signedUrl,
}: {
  document: SourceDocument;
  signedUrl?: string;
}) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [zoomLevel, setZoomLevel] = React.useState(100);
  const [isCompleted, setIsCompleted] = React.useState(false);

  const totalPages = document.page_count || 4;

  const handleNext = () => {
    if (currentPage < totalPages) {
      const next = currentPage + 1;
      setCurrentPage(next);
      if (next === totalPages) setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Sample page text contents corresponding to the slide
  const pageContents: Record<number, { title: string; body: string; highlights: string[] }> = {
    1: {
      title: 'ภาพรวมเนื้อหาและแนวคิดพื้นฐาน (Overview & Core Concepts)',
      body: 'สไลด์หน้านี้อธิบายหลักการของฐานข้อมูลเชิงสัมพันธ์ ความแตกต่างระหว่างระบบไฟล์และ DBMS ตลอดจนความเป็นเอกภาพของข้อมูล (Data Consistency & Concurrency Control)',
      highlights: ['DBMS architecture', 'Schema vs Instance', 'Data Independence'],
    },
    2: {
      title: 'คีย์หลัก คีย์นอก และความสมบูรณ์ของข้อมูล (Keys & Integrity)',
      body: 'Primary Key ต้องเป็นคอลัมน์ที่มีค่าไม่ซ้ำ (Unique) และห้ามเป็น NULL (Entity Integrity) ส่วน Foreign Key ใช้เชื่อมโยงข้อมูลข้ามตารางและรักษาความถูกต้องแบบ Referential Integrity',
      highlights: ['Primary Key: Unique & NOT NULL', 'Foreign Key: References Parent Table', 'Referential Integrity Constraint'],
    },
    3: {
      title: 'การจัดการข้อมูลและการสอบถาม (SQL Queries & Joins)',
      body: 'การใช้งาน INNER JOIN และ OUTER JOIN ในการรวมตาราง รวมถึงการใช้ GROUP BY และ HAVING เพื่อจัดกลุ่มและกรองผลลัพธ์จากการคำนวณ Aggregate Functions',
      highlights: ['INNER JOIN: exact match only', 'LEFT OUTER JOIN: preserves left rows', 'HAVING: filters aggregated groups'],
    },
    4: {
      title: 'การทำ Normalization และการลดความซ้ำซ้อน (1NF - 3NF - BCNF)',
      body: 'ขั้นตอนการจัดตารางเพื่อกำจัด Update, Insert และ Delete Anomalies โดย 1NF กำจัด Repeating Groups, 2NF กำจัด Partial Dependencies และ 3NF กำจัด Transitive Dependencies',
      highlights: ['1NF: Atomic values', '2NF: No partial key dependency', '3NF: No transitive dependency', 'BCNF: Determinant is superkey'],
    },
    5: {
      title: 'สรุปและแบบฝึกหัดท้ายบท (Summary & Review Problems)',
      body: 'ทบทวนเนื้อหาสำคัญและแนวข้อสอบกลางภาคเพื่อเตรียมความพร้อมสำหรับการทำ Exam Simulation',
      highlights: ['Review key terms', 'Practice question citations'],
    },
  };

  const activeContent = pageContents[currentPage] || pageContents[1];

  return (
    <Card className="flex flex-col border-[var(--border)] overflow-hidden">
      {/* Top Toolbar */}
      <div className="p-3 border-b border-[var(--border)] bg-[var(--surface-subtle)] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-[var(--primary-subtle)] text-[var(--primary)] flex items-center justify-center font-bold">
            <FileText className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[var(--foreground)] truncate max-w-[280px] sm:max-w-md">
              {document.title}
            </h2>
            <div className="text-[11px] text-[var(--foreground-muted)]">
              PDF Document • Private Storage • {document.ocr_status === 'ready' ? 'พร้อมอ่าน (OCR Verified)' : 'Scanned'}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded border border-[var(--border-strong)] bg-[var(--surface)] text-xs">
            <button
              onClick={handlePrev}
              disabled={currentPage <= 1}
              className="p-1.5 hover:bg-[var(--surface-subtle)] disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous Page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-2.5 font-medium select-none">
              หน้า {currentPage} / {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage >= totalPages}
              className="p-1.5 hover:bg-[var(--surface-subtle)] disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next Page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="hidden sm:flex items-center rounded border border-[var(--border-strong)] bg-[var(--surface)] text-xs">
            <button
              onClick={() => setZoomLevel(Math.max(75, zoomLevel - 15))}
              className="p-1.5 hover:bg-[var(--surface-subtle)]"
              aria-label="Zoom Out"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="px-2 font-medium">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel(Math.min(150, zoomLevel + 15))}
              className="p-1.5 hover:bg-[var(--surface-subtle)]"
              aria-label="Zoom In"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide / PDF Render Canvas */}
      <div className="min-h-[440px] bg-zinc-100 p-4 sm:p-8 flex items-center justify-center overflow-auto">
        <div
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'center top' }}
          className="w-full max-w-3xl min-h-[400px] bg-white rounded-lg shadow-md border border-zinc-200 p-8 sm:p-12 transition-transform duration-150 flex flex-col justify-between"
        >
          {/* Header of Slide */}
          <div>
            <div className="flex justify-between items-start border-b border-zinc-200 pb-4 mb-6">
              <div>
                <span className="text-[11px] font-semibold tracking-wider text-blue-600 uppercase">
                  Lecture Slide Material
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 mt-1">
                  {activeContent.title}
                </h3>
              </div>
              <div className="text-right text-xs text-zinc-400 font-mono">
                P. {currentPage} / {totalPages}
              </div>
            </div>

            {/* Slide Body */}
            <div className="space-y-4 text-zinc-700 text-sm sm:text-base leading-relaxed">
              <p>{activeContent.body}</p>

              <div className="mt-6 p-4 rounded-md bg-zinc-50 border border-zinc-200">
                <div className="text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-2">
                  Key Takeaways & Citations:
                </div>
                <ul className="space-y-2">
                  {activeContent.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-800">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Slide Footer */}
          <div className="pt-8 border-t border-zinc-100 flex justify-between items-center text-xs text-zinc-400">
            <span>Course: Database Systems & Architecture</span>
            <span>ExamPlatform Private Secure Viewer</span>
          </div>
        </div>
      </div>

      {/* Bottom Status bar */}
      <div className="p-3 border-t border-[var(--border)] bg-[var(--surface)] flex items-center justify-between text-xs text-[var(--foreground-muted)]">
        <div className="flex items-center gap-2">
          {isCompleted ? (
            <span className="inline-flex items-center text-[var(--success)] font-medium">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span>อ่านครบทั้งเอกสารแล้ว</span>
            </span>
          ) : (
            <span>ความคืบหน้าการอ่าน: {Math.round((currentPage / totalPages) * 100)}%</span>
          )}
        </div>
        <div>
          <span>หน้าปัจจุบันถูกบันทึกอัตโนมัติ (Page {currentPage})</span>
        </div>
      </div>
    </Card>
  );
}
