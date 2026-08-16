'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { LazyDocumentViewer } from '@/components/learner/lazy-pdf-viewer';
import { Button } from '@/components/ui/button';
import { PageTransition } from '@/components/ui/page-transition';
import { DocumentSkeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/components/ui/error-state';
import { getDocumentById, getSubjectBySlug } from '@/lib/db-adapter';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import type { SourceDocument, Subject } from '@/lib/types/database';

export default function DocumentMaterialPage() {
  const params = useParams();
  const slug = params.slug as string;
  const docId = params.id as string;

  const [doc, setDoc] = React.useState<SourceDocument | null>(null);
  const [subject, setSubject] = React.useState<Subject | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  const loadData = React.useCallback(() => {
    setIsLoading(true);
    setError('');
    Promise.all([
      getDocumentById(docId),
      getSubjectBySlug(slug),
    ]).then(([docRes, subRes]) => {
      if (!docRes) {
        setError('ไม่พบเอกสารนี้ในระบบ');
      } else {
        setDoc(docRes);
        setSubject(subRes?.subject || null);
      }
      setIsLoading(false);
    }).catch(err => {
      console.error('Failed to load document:', err);
      setError('เกิดข้อผิดพลาดในการโหลดเอกสาร');
      setIsLoading(false);
    });
  }, [slug, docId]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  if (isLoading) {
    return (
      <div className="space-y-4 motion-fade-in">
        <div className="h-6 w-48 bg-[var(--surface-strong)] rounded animate-pulse" />
        <DocumentSkeleton />
      </div>
    );
  }

  if (error || !doc) {
    return (
      <div className="p-8">
        <ErrorState
          title="ไม่พบเอกสาร"
          description={error || 'ไม่พบเอกสารนี้ในระบบ หรือคุณอาจไม่มีสิทธิ์เข้าถึง'}
          onRetry={loadData}
          backHref={`/subjects/${slug}`}
          backLabel="กลับหน้าวิชา"
        />
      </div>
    );
  }

  return (
    <PageTransition className="space-y-4">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href={`/subjects/${slug}`}
          className="inline-flex items-center text-xs font-medium text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>กลับไปยัง {subject?.name || 'หน้ารายวิชา'}</span>
        </Link>

        {subject && (
          <Button asChild variant="primary" size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs shadow-xs">
            <Link href={`/practice/new?subjectId=${subject.id}`}>
              <GraduationCap className="h-3.5 w-3.5 mr-1" />
              <span>ทดสอบความรู้จากสไลด์นี้</span>
            </Link>
          </Button>
        )}
      </div>

      {/* Private Document Viewer with Lazy Import and Fallback */}
      <LazyDocumentViewer document={doc} signedUrl={`/api/documents/${doc.id}/signed-url`} />
    </PageTransition>
  );
}
