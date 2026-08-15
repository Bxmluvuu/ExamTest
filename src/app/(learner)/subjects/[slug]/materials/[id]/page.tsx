'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { DocumentViewer } from '@/components/learner/document-viewer';
import { Button } from '@/components/ui/button';
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

  React.useEffect(() => {
    setIsLoading(true);
    Promise.all([
      getDocumentById(docId),
      getSubjectBySlug(slug),
    ]).then(([docRes, subRes]) => {
      setDoc(docRes);
      setSubject(subRes?.subject || null);
      setIsLoading(false);
    });
  }, [slug, docId]);

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-6 w-48 bg-[var(--surface-strong)] rounded" />
        <div className="h-[500px] bg-[var(--surface)] rounded border border-[var(--border)]" />
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">ไม่พบเอกสาร</h2>
        <Button asChild variant="primary" size="sm" className="mt-4">
          <Link href={`/subjects/${slug}`}>กลับหน้าวิชา</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href={`/subjects/${slug}`}
          className="inline-flex items-center text-xs font-medium text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>กลับไปยัง {subject?.name || 'หน้ารายวิชา'}</span>
        </Link>

        {subject && (
          <Button asChild variant="primary" size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs">
            <Link href={`/practice/new?subjectId=${subject.id}`}>
              <GraduationCap className="h-3.5 w-3.5 mr-1" />
              <span>ทดสอบความรู้จากสไลด์นี้</span>
            </Link>
          </Button>
        )}
      </div>

      {/* Private Document Viewer */}
      <DocumentViewer document={doc} signedUrl={`/api/documents/${doc.id}/signed-url`} />
    </div>
  );
}
