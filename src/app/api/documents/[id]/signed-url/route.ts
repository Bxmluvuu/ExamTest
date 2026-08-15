import { NextResponse } from 'next/server';
import { getDocumentById } from '@/lib/db-adapter';
import { getServerProfile } from '@/lib/auth/session';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Verify user is authenticated
  const profile = await getServerProfile();
  if (!profile) {
    return NextResponse.json({ error: 'Unauthorized: Authentication required' }, { status: 401 });
  }

  const { id } = await params;
  const doc = await getDocumentById(id);

  if (!doc) {
    return NextResponse.json({ error: 'Document not found' }, { status: 404 });
  }

  // Generate simulated short-lived signed URL (valid for 15 minutes)
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
  const signedUrl = `https://storage.supabase.co/object/sign/${doc.storage_bucket}/${doc.file_path}?token=sig_${Date.now()}_temp`;

  return NextResponse.json({
    documentId: doc.id,
    title: doc.title,
    signedUrl,
    expiresAt,
  });
}
