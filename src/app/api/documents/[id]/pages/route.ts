import { NextResponse } from 'next/server';
import { getDocumentById, getDocumentPages } from '@/lib/db-adapter';
import internetworkingPages from '@/lib/mock-data/internetworking-pages.json';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const doc = await getDocumentById(id);

  if (!doc) {
    return NextResponse.json({ error: 'Document not found' }, { status: 404 });
  }

  // Check database or local extracted pages
  const pages = await getDocumentPages(id);
  if (pages && pages.length > 0) {
    return NextResponse.json({
      documentId: id,
      title: doc.title,
      pageCount: pages.length,
      pages,
    });
  }

  // Fallback to internetworking pages mapping
  const docPagesMap = internetworkingPages as Record<string, any[]>;
  const localPages = docPagesMap[id] || [];

  return NextResponse.json({
    documentId: id,
    title: doc.title,
    pageCount: localPages.length || doc.page_count,
    pages: localPages,
  });
}
