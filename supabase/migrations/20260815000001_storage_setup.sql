-- Storage Buckets & Policies Setup
-- Migration: 20260815000001_storage_setup.sql

-- 1. Create Private Buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
    ('source-documents', 'source-documents', false, 52428800, ARRAY['application/pdf']),
    ('question-assets', 'question-assets', false, 10485760, ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'])
ON CONFLICT (id) DO UPDATE SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. Storage Policies for source-documents
CREATE POLICY "Authenticated users can read source documents"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'source-documents');

CREATE POLICY "Admins can upload source documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'source-documents' AND
    public.is_admin()
);

CREATE POLICY "Admins can update source documents"
ON storage.objects FOR UPDATE
TO authenticated
USING (
    bucket_id = 'source-documents' AND
    public.is_admin()
);

CREATE POLICY "Admins can delete source documents"
ON storage.objects FOR DELETE
TO authenticated
USING (
    bucket_id = 'source-documents' AND
    public.is_admin()
);

-- 3. Storage Policies for question-assets
CREATE POLICY "Authenticated users can read question assets"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'question-assets');

CREATE POLICY "Admins can manage question assets"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'question-assets' AND public.is_admin())
WITH CHECK (bucket_id = 'question-assets' AND public.is_admin());
