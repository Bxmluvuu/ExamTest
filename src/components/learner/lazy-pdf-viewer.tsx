'use client';

import dynamic from 'next/dynamic';
import { DocumentSkeleton } from '@/components/ui/skeleton';

export const LazyDocumentViewer = dynamic(
  () => import('@/components/learner/document-viewer').then(mod => mod.DocumentViewer),
  {
    loading: () => <DocumentSkeleton />,
    ssr: false,
  }
);
