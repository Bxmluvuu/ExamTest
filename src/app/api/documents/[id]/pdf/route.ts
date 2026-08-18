import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getDocumentById } from '@/lib/db-adapter';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const doc = await getDocumentById(id);

  if (!doc) {
    return NextResponse.json({ error: 'Document not found' }, { status: 404 });
  }

  // 1. Check in public/documents first
  const publicPath = path.join(process.cwd(), 'public', 'documents', `${id}.pdf`);
  if (fs.existsSync(publicPath)) {
    const fileBuffer = fs.readFileSync(publicPath);
    return new Response(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${encodeURIComponent(path.basename(doc.file_path || `${id}.pdf`))}"`,
        'Cache-Control': 'public, max-age=86400, immutable',
      },
    });
  }

  // 2. Check in content directories
  const isExam = (doc.file_path || '').includes('past-exams');
  const baseDir = path.join(
    process.cwd(),
    'content',
    'subjects',
    'internetworking',
    isExam ? 'past-exams' : 'slides'
  );
  const baseName = path.basename(doc.file_path || '');
  const localFile = path.join(baseDir, baseName);

  if (fs.existsSync(localFile)) {
    const fileBuffer = fs.readFileSync(localFile);
    return new Response(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${encodeURIComponent(baseName)}"`,
        'Cache-Control': 'public, max-age=86400, immutable',
      },
    });
  }

  // 3. Fallback: Download from Supabase Storage
  try {
    const supabase = await createServerSupabaseClient();
    if (supabase && doc.storage_bucket && doc.file_path) {
      const { data, error } = await supabase.storage
        .from(doc.storage_bucket)
        .download(doc.file_path);

      if (!error && data) {
        const arrayBuffer = await data.arrayBuffer();
        return new Response(Buffer.from(arrayBuffer), {
          status: 200,
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `inline; filename="${encodeURIComponent(path.basename(doc.file_path))}"`,
          },
        });
      }
    }
  } catch (err) {
    console.error('Failed to stream PDF from storage:', err);
  }

  return NextResponse.json({ error: 'PDF file not available' }, { status: 404 });
}
