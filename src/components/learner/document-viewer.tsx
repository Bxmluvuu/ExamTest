'use client';

import * as React from 'react';
import {
  FileText,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ExternalLink,
  Download,
  BookOpen,
  Presentation,
  List,
  Search,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { SourceDocument } from '@/lib/types/database';
import internetworkingPages from '@/lib/mock-data/internetworking-pages.json';

interface SlidePage {
  pageNumber: number;
  title: string;
  rawText: string;
  bullets?: string[];
  tokenCount?: number;
}

export function DocumentViewer({
  document,
  signedUrl,
}: {
  document: SourceDocument;
  signedUrl?: string;
}) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [viewMode, setViewMode] = React.useState<'pdf' | 'text'>('pdf');
  const [zoomLevel, setZoomLevel] = React.useState(100);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [pages, setPages] = React.useState<SlidePage[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showOutline, setShowOutline] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  // PDF direct URL (uses static route or API stream)
  const pdfUrl = `/documents/${document.id}.pdf`;
  const pdfApiUrl = `/api/documents/${document.id}/pdf`;

  // Load pages metadata for outline & search
  React.useEffect(() => {
    fetch(`/api/documents/${document.id}/pages`)
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (data?.pages && data.pages.length > 0) {
          setPages(data.pages);
        } else {
          const map = internetworkingPages as Record<string, SlidePage[]>;
          setPages(map[document.id] || []);
        }
      })
      .catch(() => {
        const map = internetworkingPages as Record<string, SlidePage[]>;
        setPages(map[document.id] || []);
      });
  }, [document.id]);

  const totalPages = pages.length || document.page_count || 1;

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // Keyboard navigation for presentation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (typeof window !== 'undefined' && window.document.exitFullscreen) {
        window.document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const activePage: SlidePage = pages[currentPage - 1] || {
    pageNumber: currentPage,
    title: `${document.title} - Page ${currentPage}`,
    rawText: `สไลด์บรรยาย: ${document.title} (หน้าที่ ${currentPage}/${totalPages})`,
    bullets: [document.extraction_text_summary || 'CCNP Enterprise Core Networking Lecture Material'],
  };

  const filteredPages = React.useMemo(() => {
    if (!searchQuery.trim()) return pages;
    const q = searchQuery.toLowerCase();
    return pages.filter(
      p => p.rawText.toLowerCase().includes(q) || p.title.toLowerCase().includes(q)
    );
  }, [pages, searchQuery]);

  return (
    <div
      ref={containerRef}
      className={`flex flex-col rounded-lg border border-[var(--border)] bg-[var(--surface)] overflow-hidden shadow-xs ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none bg-zinc-900 border-none' : ''
      }`}
    >
      {/* Top Toolbar */}
      <div className="p-3 border-b border-[var(--border)] bg-[var(--surface-subtle)] flex flex-wrap items-center justify-between gap-3">
        {/* Left: Document Info & View Switcher */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
            <Presentation className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[var(--foreground)] truncate max-w-[260px] sm:max-w-md">
              {document.title}
            </h2>
            <div className="text-[11px] text-[var(--foreground-muted)] flex items-center gap-2">
              <span className="font-medium text-blue-600">สไลด์จริง (Original PDF)</span>
              <span>•</span>
              <span>{totalPages} หน้าทั้งหมด</span>
            </div>
          </div>
        </div>

        {/* Center/Right: View Mode & Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Toggle between Real PDF Slide & Extracted Notes */}
          <div className="flex items-center rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] p-0.5 text-xs font-medium">
            <button
              onClick={() => setViewMode('pdf')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 cursor-pointer transition-colors ${
                viewMode === 'pdf'
                  ? 'bg-blue-600 text-white font-semibold shadow-2xs'
                  : 'text-[var(--foreground-secondary)] hover:text-[var(--foreground)]'
              }`}
            >
              <Presentation className="h-3.5 w-3.5" />
              <span>สไลด์จริง (PDF)</span>
            </button>
            <button
              onClick={() => setViewMode('text')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 cursor-pointer transition-colors ${
                viewMode === 'text'
                  ? 'bg-blue-600 text-white font-semibold shadow-2xs'
                  : 'text-[var(--foreground-secondary)] hover:text-[var(--foreground)]'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>สรุป & โน้ตย่อ</span>
            </button>
          </div>

          {/* Outline Button */}
          <button
            type="button"
            onClick={() => setShowOutline(!showOutline)}
            className={`p-2 rounded-md border text-xs flex items-center gap-1 cursor-pointer transition-colors ${
              showOutline
                ? 'bg-blue-600 text-white border-blue-600 font-medium'
                : 'border-[var(--border-strong)] bg-[var(--surface)] hover:bg-[var(--surface-subtle)] text-[var(--foreground)]'
            }`}
            title="สารบัญหน้าสไลด์"
          >
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">สารบัญ</span>
          </button>

          {/* External Open / Download */}
          <a
            href={pdfApiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md border border-[var(--border-strong)] bg-[var(--surface)] hover:bg-[var(--surface-subtle)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors inline-flex items-center gap-1 text-xs"
            title="เปิดสไลด์เต็มในแท็บใหม่"
          >
            <ExternalLink className="h-4 w-4" />
            <span className="hidden md:inline">เปิดแท็บใหม่</span>
          </a>

          <a
            href={pdfApiUrl}
            download={`${document.title}.pdf`}
            className="p-2 rounded-md border border-[var(--border-strong)] bg-[var(--surface)] hover:bg-[var(--surface-subtle)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors inline-flex items-center gap-1 text-xs"
            title="ดาวน์โหลดไฟล์สไลด์ PDF"
          >
            <Download className="h-4 w-4" />
            <span className="hidden md:inline">ดาวน์โหลด</span>
          </a>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-md border border-[var(--border-strong)] bg-[var(--surface)] hover:bg-[var(--surface-subtle)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
            title="เต็มหน้าจอ (Fullscreen)"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Content Viewer Body */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[600px] flex-1 bg-zinc-900">
        {/* Optional Sidebar for Outline / Search */}
        {showOutline && (
          <div className="md:col-span-3 border-r border-zinc-700 bg-zinc-800 p-3 space-y-3 max-h-[750px] overflow-y-auto">
            <div className="relative">
              <Search className="h-3.5 w-3.5 absolute left-2.5 top-2.5 text-zinc-400" />
              <input
                type="text"
                placeholder="ค้นหาในสไลด์..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full h-8 pl-8 pr-2 text-xs rounded border border-zinc-600 bg-zinc-700 text-white placeholder:text-zinc-400"
              />
            </div>

            <div className="space-y-1 text-xs">
              <div className="text-[11px] font-semibold text-zinc-400 px-1 uppercase tracking-wider">
                รายการหน้าสไลด์ ({filteredPages.length})
              </div>
              {filteredPages.map(p => {
                const isSelected = p.pageNumber === currentPage;
                return (
                  <button
                    key={p.pageNumber}
                    onClick={() => {
                      setCurrentPage(p.pageNumber);
                      if (iframeRef.current) {
                        iframeRef.current.src = `${pdfApiUrl}#page=${p.pageNumber}&view=FitH`;
                      }
                    }}
                    className={`w-full text-left p-2 rounded transition-colors cursor-pointer text-xs ${
                      isSelected
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'hover:bg-zinc-700 text-zinc-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-zinc-400">
                        P.{p.pageNumber}
                      </span>
                      {isSelected && <CheckCircle className="h-3.5 w-3.5 text-white" />}
                    </div>
                    <div className="line-clamp-2 mt-0.5">{p.title}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Real PDF Viewer Window */}
        <div
          className={`${
            showOutline ? 'md:col-span-9' : 'md:col-span-12'
          } flex flex-col items-center justify-center p-2 sm:p-4 bg-zinc-950 min-h-[600px]`}
        >
          {viewMode === 'pdf' ? (
            /* REAL PDF OBJECT / IFRAME VIEWER WITH ROBUST FALLBACK */
            <div className="w-full h-full min-h-[650px] flex flex-col rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
              {/* Quick Actions Helper Strip */}
              <div className="bg-zinc-800/80 px-4 py-2 border-b border-zinc-700/60 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-300">
                <span className="text-zinc-400">
                  หากเบราว์เซอร์ของคุณบล็อกการแสดงผล PDF ในหน้าเว็บ:
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={pdfApiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium inline-flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>เปิดสไลด์ในแท็บใหม่</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setViewMode('text')}
                    className="px-2.5 py-1 rounded bg-zinc-700 hover:bg-zinc-600 text-white font-medium inline-flex items-center gap-1.5 transition-colors"
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>สลับเป็นโหมดสรุปเนื้อหา</span>
                  </button>
                </div>
              </div>

              <object
                data={`${pdfApiUrl}#page=${currentPage}&view=FitH&toolbar=1`}
                type="application/pdf"
                className="w-full flex-1 min-h-[600px]"
              >
                <iframe
                  ref={iframeRef}
                  src={`${pdfApiUrl}#page=${currentPage}&view=FitH&toolbar=1`}
                  className="w-full flex-1 min-h-[600px] border-0"
                  title={document.title}
                  loading="eager"
                >
                  <div className="p-8 text-center text-zinc-400 space-y-3 my-auto">
                    <p>เบราว์เซอร์ไม่รองรับการแสดงผลไฟล์ PDF ในหน้านี้</p>
                    <div className="flex justify-center gap-3">
                      <a
                        href={pdfApiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold text-xs inline-flex items-center gap-1.5"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>เปิดอ่านไฟล์ PDF ในหน้าต่างใหม่</span>
                      </a>
                    </div>
                  </div>
                </iframe>
              </object>
            </div>
          ) : (
            /* TEXT / NOTES VIEW */
            <div className="w-full max-w-3xl min-h-[500px] bg-white rounded-lg shadow-xl border border-zinc-200 p-6 sm:p-10 flex flex-col justify-between my-auto">
              <div>
                <div className="flex justify-between items-start border-b border-zinc-200 pb-3 mb-5">
                  <div>
                    <span className="text-[11px] font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded">
                      CCNP Enterprise: Core Networking
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-zinc-900 mt-2">
                      {activePage.title}
                    </h3>
                  </div>
                  <div className="text-right text-xs text-zinc-400 font-mono pl-2">
                    P. {currentPage} / {totalPages}
                  </div>
                </div>

                <div className="space-y-4 text-zinc-700 text-sm leading-relaxed">
                  {activePage.bullets && activePage.bullets.length > 0 ? (
                    <div className="space-y-2.5">
                      {activePage.bullets.map((b, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-800">
                          <span className="h-2 w-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>{activePage.rawText}</p>
                  )}

                  {activePage.rawText && activePage.rawText.length > 120 && (
                    <div className="mt-5 p-4 rounded-md bg-zinc-50 border border-zinc-200 text-xs text-zinc-600">
                      <div className="font-semibold text-zinc-700 mb-1 flex items-center gap-1.5">
                        <BookOpen className="h-3.5 w-3.5 text-blue-600" />
                        <span>ข้อความสกัดจากเอกสารสไลด์ (Extracted Text):</span>
                      </div>
                      <p className="leading-relaxed">{activePage.rawText}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-100 flex justify-between items-center text-xs text-zinc-400">
                <span>Course: Internetworking</span>
                <span>ExamPlatform Lecture Viewer</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Status bar */}
      <div className="p-3 border-t border-[var(--border)] bg-[var(--surface)] flex flex-wrap items-center justify-between text-xs text-[var(--foreground-muted)] gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center text-emerald-600 font-medium">
            <CheckCircle className="h-4 w-4 mr-1" />
            <span>พร้อมเปิดอ่านสไลด์ต้นฉบับ ({totalPages} หน้า)</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[var(--foreground-muted)]">
            ใช้ปุ่มลูกศร ซ้าย/ขวา บนคีย์บอร์ดเพื่อเปลี่ยนหน้า
          </span>
        </div>
      </div>
    </div>
  );
}
