'use client';

import * as React from 'react';
import {
  FileText,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  ExternalLink,
  Download,
  BookOpen,
  Presentation,
  List,
  Search,
  CheckCircle,
  Loader2,
  AlertCircle,
  Scan,
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
  const [totalPages, setTotalPages] = React.useState(document.page_count || 1);
  const [viewMode, setViewMode] = React.useState<'canvas' | 'text'>('canvas');
  const [zoomLevel, setZoomLevel] = React.useState(100);
  const [fitMode, setFitMode] = React.useState<'width' | 'page'>('width');
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [pages, setPages] = React.useState<SlidePage[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showOutline, setShowOutline] = React.useState(false);

  // Dynamic container dimensions for perfect full-width fit
  const [containerSize, setContainerSize] = React.useState<{ width: number; height: number }>({
    width: 1100,
    height: 750,
  });

  // PDF.js rendering states
  const [pdfDoc, setPdfDoc] = React.useState<any>(null);
  const [isLoadingPdf, setIsLoadingPdf] = React.useState(true);
  const [isRenderingPage, setIsRenderingPage] = React.useState(false);
  const [pdfLoadError, setPdfLoadError] = React.useState<string | null>(null);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const viewerBodyRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const renderTaskRef = React.useRef<any>(null);

  // PDF direct URL endpoints
  const pdfApiUrl = `/api/documents/${document.id}/pdf`;
  const pdfStaticUrl = `/documents/${document.id}.pdf`;

  // 1. Observe container size for responsive full-width fitting
  React.useEffect(() => {
    if (!viewerBodyRef.current) return;
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setContainerSize({
            width: Math.floor(entry.contentRect.width),
            height: Math.floor(entry.contentRect.height || 750),
          });
        }
      }
    });
    ro.observe(viewerBodyRef.current);
    return () => ro.disconnect();
  }, [showOutline, isFullscreen, viewMode]);

  // 2. Load pages metadata for outline & search
  React.useEffect(() => {
    fetch(`/api/documents/${document.id}/pages`)
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (data?.pages && data.pages.length > 0) {
          setPages(data.pages);
          if (data.pages.length > totalPages) {
            setTotalPages(data.pages.length);
          }
        } else {
          const map = internetworkingPages as Record<string, SlidePage[]>;
          const fallback = map[document.id] || [];
          setPages(fallback);
          if (fallback.length > 0) setTotalPages(fallback.length);
        }
      })
      .catch(() => {
        const map = internetworkingPages as Record<string, SlidePage[]>;
        const fallback = map[document.id] || [];
        setPages(fallback);
        if (fallback.length > 0) setTotalPages(fallback.length);
      });
  }, [document.id, totalPages]);

  // 3. Load PDF Document via PDF.js on Client-Side
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    let isMounted = true;
    setIsLoadingPdf(true);
    setPdfLoadError(null);

    async function initPdf() {
      try {
        const pdfjs = await import('pdfjs-dist');
        
        // Configure Web Worker using bundled local worker
        if (typeof window !== 'undefined') {
          pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;
        }

        const loadingTask = pdfjs.getDocument({
          url: pdfApiUrl,
          cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
          cMapPacked: true,
          standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
        });

        const doc = await loadingTask.promise;
        if (isMounted) {
          setPdfDoc(doc);
          setTotalPages(doc.numPages);
          setIsLoadingPdf(false);
        }
      } catch (err: any) {
        console.warn('Primary PDF load failed, trying cdn worker fallback:', err);
        try {
          const pdfjs = await import('pdfjs-dist');
          pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
          
          const staticTask = pdfjs.getDocument({
            url: pdfStaticUrl,
            cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
            cMapPacked: true,
          });
          const doc = await staticTask.promise;
          if (isMounted) {
            setPdfDoc(doc);
            setTotalPages(doc.numPages);
            setIsLoadingPdf(false);
            return;
          }
        } catch (staticErr) {
          if (isMounted) {
            setIsLoadingPdf(false);
            setPdfLoadError('ไม่สามารถโหลด Canvas PDF ได้ กรุณากดปุ่มเปิดแท็บใหม่ หรือดูโหมดสไลด์สรุปเนื้อหา');
          }
        }
      }
    }

    initPdf();

    return () => {
      isMounted = false;
    };
  }, [pdfApiUrl, pdfStaticUrl]);

  // 4. Render Canvas with Auto Full-Width Fitting
  React.useEffect(() => {
    if (!pdfDoc || !canvasRef.current || viewMode !== 'canvas') return;

    let isCancelled = false;

    async function renderPage() {
      try {
        if (renderTaskRef.current) {
          try {
            renderTaskRef.current.cancel();
          } catch {
            // Ignore cancel errors
          }
        }

        setIsRenderingPage(true);
        const page = await pdfDoc.getPage(currentPage);
        if (isCancelled || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const unscaledViewport = page.getViewport({ scale: 1 });
        
        // Compute available space (accounting for padding)
        const availableWidth = Math.max(320, containerSize.width - 24);
        const availableHeight = Math.max(400, containerSize.height - 24);

        let baseScale = 1.0;
        if (fitMode === 'page') {
          baseScale = Math.min(
            availableWidth / unscaledViewport.width,
            availableHeight / unscaledViewport.height
          );
        } else {
          // Fit Width (Default Full-Width)
          baseScale = availableWidth / unscaledViewport.width;
        }

        // Apply custom zoom multiplier
        const scale = baseScale * (zoomLevel / 100);

        const viewport = page.getViewport({ scale });
        const context = canvas.getContext('2d');
        if (!context) return;

        // Retina / High-DPI support (devicePixelRatio)
        const pixelRatio = window.devicePixelRatio || 1;
        canvas.width = Math.floor(viewport.width * pixelRatio);
        canvas.height = Math.floor(viewport.height * pixelRatio);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const transform = pixelRatio !== 1 ? [pixelRatio, 0, 0, pixelRatio, 0, 0] : null;

        const renderContext = {
          canvasContext: context,
          transform: transform || undefined,
          viewport: viewport,
        };

        const task = page.render(renderContext);
        renderTaskRef.current = task;

        await task.promise;
        if (!isCancelled) {
          setIsRenderingPage(false);
        }
      } catch (err: any) {
        if (err?.name !== 'RenderingCancelledException' && !isCancelled) {
          console.error('Canvas render error:', err);
          setIsRenderingPage(false);
        }
      }
    }

    renderPage();

    return () => {
      isCancelled = true;
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {
          // ignore
        }
      }
    };
  }, [pdfDoc, currentPage, zoomLevel, fitMode, containerSize, viewMode]);

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

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
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
    title: `${document.title} - หน้าที่ ${currentPage}`,
    rawText: `สไลด์บรรยาย: ${document.title} (หน้าที่ ${currentPage}/${totalPages})`,
    bullets: [document.extraction_text_summary || 'CCNP Enterprise Core Networking Lecture Material'],
  };

  const filteredPages = React.useMemo(() => {
    if (!searchQuery.trim()) return pages;
    const q = searchQuery.toLowerCase();
    return pages.filter(
      p => p.rawText?.toLowerCase().includes(q) || p.title?.toLowerCase().includes(q)
    );
  }, [pages, searchQuery]);

  return (
    <div
      ref={containerRef}
      className={`flex flex-col rounded-lg border border-[var(--border)] bg-[var(--surface)] overflow-hidden shadow-xs ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none bg-zinc-950 border-none' : ''
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
            <h2 className="text-sm font-semibold text-[var(--foreground)] truncate max-w-[240px] sm:max-w-md">
              {document.title}
            </h2>
            <div className="text-[11px] text-[var(--foreground-muted)] flex items-center gap-2">
              <span className="font-medium text-blue-600">สไลด์ PDF ({totalPages} หน้า)</span>
              <span>•</span>
              <span>หน้าที่ {currentPage} จาก {totalPages}</span>
            </div>
          </div>
        </div>

        {/* Center/Right: View Mode & Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Toggle between High-Res Canvas & Extracted Notes */}
          <div className="flex items-center rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] p-0.5 text-xs font-medium">
            <button
              onClick={() => setViewMode('canvas')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 cursor-pointer transition-colors ${
                viewMode === 'canvas'
                  ? 'bg-blue-600 text-white font-semibold shadow-2xs'
                  : 'text-[var(--foreground-secondary)] hover:text-[var(--foreground)]'
              }`}
            >
              <Presentation className="h-3.5 w-3.5" />
              <span>สไลด์ต้นฉบับ</span>
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
            title="สารบัญสไลด์"
          >
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">สารบัญ</span>
          </button>

          {/* Open in New Tab Button */}
          <a
            href={pdfApiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md border border-[var(--border-strong)] bg-[var(--surface)] hover:bg-[var(--surface-subtle)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors inline-flex items-center gap-1 text-xs"
            title="เปิดอ่าน PDF ในแท็บใหม่"
          >
            <ExternalLink className="h-4 w-4" />
            <span className="hidden md:inline">เปิดแท็บใหม่</span>
          </a>

          {/* Download Button */}
          <a
            href={pdfApiUrl}
            download={`${document.title}.pdf`}
            className="p-2 rounded-md border border-[var(--border-strong)] bg-[var(--surface)] hover:bg-[var(--surface-subtle)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors inline-flex items-center gap-1 text-xs"
            title="ดาวน์โหลดไฟล์ PDF"
          >
            <Download className="h-4 w-4" />
          </a>

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2 rounded-md border border-[var(--border-strong)] bg-[var(--surface)] hover:bg-[var(--surface-subtle)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
            title={isFullscreen ? 'ออกจากโหมดเต็มจอ' : 'เปิดเต็มจอ (Presentation)'}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Floating Presentation Control Bar */}
      <div className="bg-zinc-900 text-white px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-zinc-800">
        {/* Page Navigators */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrev}
            disabled={currentPage <= 1}
            className="h-8 px-2.5 text-zinc-300 hover:text-white hover:bg-zinc-800 disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span>ก่อนหน้า</span>
          </Button>

          <div className="flex items-center gap-1.5 px-2 font-mono text-zinc-300">
            <input
              type="number"
              min={1}
              max={totalPages}
              value={currentPage}
              onChange={e => {
                const val = parseInt(e.target.value, 10);
                if (!isNaN(val) && val >= 1 && val <= totalPages) {
                  setCurrentPage(val);
                }
              }}
              className="w-12 h-7 bg-zinc-800 text-center rounded border border-zinc-700 text-xs text-white focus:outline-none focus:border-blue-500 font-semibold"
            />
            <span className="text-zinc-500">/</span>
            <span>{totalPages}</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleNext}
            disabled={currentPage >= totalPages}
            className="h-8 px-2.5 text-zinc-300 hover:text-white hover:bg-zinc-800 disabled:opacity-30"
          >
            <span>ถัดไป</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Fit Presets & Zoom Controls */}
        <div className="flex items-center gap-2">
          {viewMode === 'canvas' && (
            <div className="flex items-center gap-1.5 border-r border-zinc-800 pr-3 mr-1">
              {/* Fit Width / Page Toggle */}
              <button
                type="button"
                onClick={() => {
                  setFitMode(fitMode === 'width' ? 'page' : 'width');
                  setZoomLevel(100);
                }}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors flex items-center gap-1 ${
                  fitMode === 'width'
                    ? 'bg-blue-600 text-white'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
                title={fitMode === 'width' ? 'สลับเป็นพอดีหน้าจอ' : 'สลับเป็นพอดีความกว้างเต็มจอ'}
              >
                <Scan className="h-3 w-3" />
                <span>{fitMode === 'width' ? 'พอดีความกว้าง' : 'พอดีทั้งหน้า'}</span>
              </button>

              {/* Zoom Controls */}
              <button
                type="button"
                onClick={() => setZoomLevel(prev => Math.max(50, prev - 15))}
                className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                title="ย่อขนาด"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <span className="w-12 text-center font-mono text-[11px] text-zinc-300 font-medium">
                {zoomLevel}%
              </span>
              <button
                type="button"
                onClick={() => setZoomLevel(prev => Math.min(250, prev + 15))}
                className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                title="ขยายขนาด"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          <span className="text-[11px] text-zinc-400 hidden sm:inline truncate max-w-[200px] lg:max-w-xs">
            {activePage?.title || document.title}
          </span>
        </div>
      </div>

      {/* Main Slide & Outline Split Body */}
      <div className="grid grid-cols-1 md:grid-cols-12 flex-1 min-h-[620px] overflow-hidden">
        {/* Slide Outline Sidebar */}
        {showOutline && (
          <div className="md:col-span-3 border-r border-zinc-800 bg-zinc-900 p-3 overflow-y-auto max-h-[800px] space-y-3">
            <div className="relative">
              <Search className="h-3.5 w-3.5 absolute left-2.5 top-2.5 text-zinc-500" />
              <input
                type="text"
                placeholder="ค้นหาในสไลด์..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full h-8 pl-8 pr-2 text-xs rounded bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              {filteredPages.map(p => {
                const isSelected = p.pageNumber === currentPage;
                return (
                  <button
                    key={p.pageNumber}
                    onClick={() => {
                      setCurrentPage(p.pageNumber);
                    }}
                    className={`w-full text-left p-2 rounded transition-colors cursor-pointer text-xs ${
                      isSelected
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'hover:bg-zinc-800 text-zinc-300'
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

        {/* Real Slide Canvas Viewport Body */}
        <div
          ref={viewerBodyRef}
          className={`${
            showOutline ? 'md:col-span-9' : 'md:col-span-12'
          } flex flex-col items-center justify-start p-2 sm:p-4 bg-zinc-950 min-h-[620px] overflow-auto relative`}
        >
          {viewMode === 'canvas' ? (
            /* AUTO FULL-WIDTH HIGH-DPI CANVAS VIEWER */
            <div className="w-full flex flex-col items-center justify-center min-h-[580px] my-auto">
              {isLoadingPdf ? (
                <div className="flex flex-col items-center gap-3 text-zinc-400 py-24">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                  <p className="text-sm font-medium">กำลังโหลดสไลด์ PDF...</p>
                </div>
              ) : pdfLoadError ? (
                <div className="max-w-md p-6 rounded-xl bg-zinc-900 border border-zinc-800 text-center space-y-4 text-zinc-300 my-auto">
                  <AlertCircle className="h-10 w-10 text-amber-400 mx-auto" />
                  <div>
                    <h3 className="font-semibold text-sm text-white mb-1">ไม่สามารถแสดงผล PDF Canvas ได้</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      คุณสามารถสลับไปดูโหมดสรุปสไลด์ หรือเปิดไฟล์ต้นฉบับในหน้าต่างใหม่ได้ทันที
                    </p>
                  </div>
                  <div className="flex justify-center gap-2 pt-2">
                    <Button
                      onClick={() => setViewMode('text')}
                      variant="primary"
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <BookOpen className="h-3.5 w-3.5 mr-1.5" />
                      <span>ดูโหมดสรุปสไลด์</span>
                    </Button>
                    <a
                      href={pdfApiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-md border border-zinc-700 hover:bg-zinc-800 text-xs font-medium inline-flex items-center gap-1.5 text-white"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>เปิดในแท็บใหม่</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="relative flex items-center justify-center rounded-lg shadow-2xl overflow-hidden border border-zinc-800 bg-zinc-900 transition-all max-w-full">
                  <canvas ref={canvasRef} className="block max-w-full h-auto" />
                  {isRenderingPage && (
                    <div className="absolute inset-0 bg-zinc-950/30 backdrop-blur-2xs flex items-center justify-center text-white">
                      <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* PRESENTATION SLIDE & NOTES VIEW */
            <div className="w-full max-w-4xl min-h-[520px] bg-white rounded-xl shadow-2xl border border-zinc-200 p-6 sm:p-10 flex flex-col justify-between my-auto">
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
                    <div className="space-y-3">
                      {activePage.bullets.map((b, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-800 bg-zinc-50 p-3 rounded-lg border border-zinc-100">
                          <span className="h-2 w-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                          <span className="leading-relaxed">{b}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-zinc-800 leading-relaxed">{activePage.rawText}</p>
                  )}

                  {activePage.rawText && activePage.rawText.length > 120 && (
                    <div className="mt-5 p-4 rounded-lg bg-zinc-50 border border-zinc-200 text-xs text-zinc-600">
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
                <span>ExamPlatform Slide Viewer</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="p-3 border-t border-[var(--border)] bg-[var(--surface)] flex flex-wrap items-center justify-between text-xs text-[var(--foreground-muted)] gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center text-emerald-600 font-medium">
            <CheckCircle className="h-4 w-4 mr-1" />
            <span>สไลด์พร้อมใช้งาน ({totalPages} หน้า)</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[var(--foreground-muted)]">
            กดปุ่มลูกศร ◀ ▶ หรือ Spacebar บนคีย์บอร์ดเพื่อเปลี่ยนหน้าสไลด์
          </span>
        </div>
      </div>
    </div>
  );
}
