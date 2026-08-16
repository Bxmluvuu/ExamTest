-- ==============================================================================
-- ExamPlatform Complete Production Schema Migration
-- Combines:
--   1. 20260815000000_init_schema.sql
--   2. 20260815000001_storage_setup.sql
--   3. 20260816000000_auth_system_hardening.sql
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- PART 1: CORE EXTENSIONS & ENUMS
-- ------------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- PART 2: PROFILES & USER MANAGEMENT
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL DEFAULT '',
    role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin')),
    avatar_url TEXT,
    is_email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    failed_login_attempts INTEGER NOT NULL DEFAULT 0,
    locked_until TIMESTAMPTZ,
    last_sign_in_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- User Sessions Table (Device tracking & concurrent sessions)
CREATE TABLE IF NOT EXISTS public.user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    session_token_hash TEXT NOT NULL,
    device_name TEXT NOT NULL DEFAULT 'Unknown Device',
    browser TEXT NOT NULL DEFAULT 'Browser',
    ip_address TEXT NOT NULL DEFAULT '127.0.0.1',
    last_active_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '7 days'),
    is_revoked BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON public.user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_active ON public.user_sessions(user_id, is_revoked, expires_at);

-- Password History Table
CREATE TABLE IF NOT EXISTS public.password_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_password_history_user ON public.password_history(user_id, created_at DESC);

-- Auth Security Audit Logs Table
CREATE TABLE IF NOT EXISTS public.auth_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    email TEXT,
    event_type TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_auth_audit_user ON public.auth_audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_auth_audit_event ON public.auth_audit_logs(event_type, created_at DESC);

-- Rate Limits Table
CREATE TABLE IF NOT EXISTS public.auth_rate_limits (
    key TEXT PRIMARY KEY,
    attempts_count INTEGER NOT NULL DEFAULT 1,
    first_attempt_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    locked_until TIMESTAMPTZ,
    expires_at TIMESTAMPTZ NOT NULL
);

-- Helper Security Functions
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.get_current_role()
RETURNS TEXT AS $$
BEGIN
    RETURN (
        SELECT role FROM public.profiles
        WHERE id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Trigger for auto-creating profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (
        id,
        email,
        full_name,
        role,
        is_email_verified
    )
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'role', 'student'),
        COALESCE((NEW.email_confirmed_at IS NOT NULL), FALSE)
    )
    ON CONFLICT (id) DO UPDATE
    SET 
        email = EXCLUDED.email,
        is_email_verified = COALESCE((NEW.email_confirmed_at IS NOT NULL), profiles.is_email_verified),
        updated_at = NOW();

    -- Log registration event
    INSERT INTO public.auth_audit_logs (user_id, email, event_type, metadata)
    VALUES (
        NEW.id,
        NEW.email,
        'register',
        jsonb_build_object('role', COALESCE(NEW.raw_user_meta_data->>'role', 'student'))
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ------------------------------------------------------------------------------
-- PART 3: ACADEMIC TAXONOMY & CONTENT REPOSITORY
-- ------------------------------------------------------------------------------

-- Subjects table
CREATE TABLE IF NOT EXISTS public.subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    language TEXT NOT NULL DEFAULT 'th',
    question_target INTEGER NOT NULL DEFAULT 500 CHECK (question_target > 0),
    icon TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Chapters table
CREATE TABLE IF NOT EXISTS public.chapters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    sequence_order INTEGER NOT NULL DEFAULT 1,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_chapters_subject_id ON public.chapters(subject_id);

-- Topics table
CREATE TABLE IF NOT EXISTS public.topics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    chapter_id UUID NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_topics_chapter_id ON public.topics(chapter_id);

-- Source Documents table
CREATE TABLE IF NOT EXISTS public.source_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    chapter_id UUID REFERENCES public.chapters(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    file_path TEXT NOT NULL,
    document_type TEXT NOT NULL CHECK (document_type IN ('slide', 'past_exam')),
    mime_type TEXT NOT NULL DEFAULT 'application/pdf',
    file_size BIGINT NOT NULL DEFAULT 0,
    page_count INTEGER NOT NULL DEFAULT 0,
    ocr_status TEXT NOT NULL DEFAULT 'ready' CHECK (ocr_status IN ('ready', 'needs_ocr', 'processing', 'failed')),
    extraction_text_summary TEXT,
    storage_bucket TEXT NOT NULL DEFAULT 'source-documents',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_source_docs_subject ON public.source_documents(subject_id);

-- Source Pages table
CREATE TABLE IF NOT EXISTS public.source_pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID NOT NULL REFERENCES public.source_documents(id) ON DELETE CASCADE,
    page_number INTEGER NOT NULL,
    raw_text TEXT NOT NULL DEFAULT '',
    token_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (document_id, page_number)
);

-- Reading Progress table
CREATE TABLE IF NOT EXISTS public.reading_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    document_id UUID NOT NULL REFERENCES public.source_documents(id) ON DELETE CASCADE,
    last_page_read INTEGER NOT NULL DEFAULT 1,
    total_pages INTEGER NOT NULL DEFAULT 1,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, document_id)
);

-- ------------------------------------------------------------------------------
-- PART 4: EXAM BLUEPRINTS & QUESTION ENGINE
-- ------------------------------------------------------------------------------

-- Exam Blueprints table
CREATE TABLE IF NOT EXISTS public.exam_blueprints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    question_count INTEGER NOT NULL DEFAULT 30 CHECK (question_count > 0),
    duration_minutes INTEGER NOT NULL DEFAULT 60 CHECK (duration_minutes > 0),
    difficulty_distribution JSONB NOT NULL DEFAULT '{"easy": 0.2, "medium": 0.6, "hard": 0.2}'::jsonb,
    topic_distribution JSONB NOT NULL DEFAULT '[]'::jsonb,
    avoid_recent_question_count INTEGER NOT NULL DEFAULT 50,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (subject_id, slug)
);

-- Questions table
CREATE TABLE IF NOT EXISTS public.questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    chapter_id UUID NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
    topic_id UUID REFERENCES public.topics(id) ON DELETE SET NULL,
    question_text TEXT NOT NULL,
    question_type TEXT NOT NULL DEFAULT 'single_choice' CHECK (question_type IN ('single_choice', 'multiple_choice', 'numeric')),
    difficulty TEXT NOT NULL DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'needs_review', 'approved', 'published', 'retired')),
    is_ai_generated BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_questions_subject_status ON public.questions(subject_id, status);
CREATE INDEX IF NOT EXISTS idx_questions_chapter ON public.questions(chapter_id);

-- Question Versions table (Audit snapshot)
CREATE TABLE IF NOT EXISTS public.question_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL DEFAULT 1,
    question_text TEXT NOT NULL,
    choices_snapshot JSONB NOT NULL,
    explanation TEXT NOT NULL,
    created_by UUID REFERENCES auth.users(id),
    change_log TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Question Choices table
CREATE TABLE IF NOT EXISTS public.question_choices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    choice_key TEXT NOT NULL CHECK (choice_key IN ('A', 'B', 'C', 'D')),
    choice_text TEXT NOT NULL,
    sequence_order INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (question_id, choice_key)
);
CREATE INDEX IF NOT EXISTS idx_question_choices_qid ON public.question_choices(question_id);

-- Question Answer Keys table (Protected)
CREATE TABLE IF NOT EXISTS public.question_answer_keys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID UNIQUE NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    correct_choice_key TEXT NOT NULL CHECK (correct_choice_key IN ('A', 'B', 'C', 'D')),
    explanation TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Question Sources table
CREATE TABLE IF NOT EXISTS public.question_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID UNIQUE NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    document_id UUID REFERENCES public.source_documents(id) ON DELETE SET NULL,
    file_name TEXT NOT NULL,
    page_numbers INTEGER[] NOT NULL DEFAULT '{}',
    evidence_text TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Question Quality Flags table
CREATE TABLE IF NOT EXISTS public.question_quality_flags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    flag_type TEXT NOT NULL,
    severity TEXT NOT NULL DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high')),
    description TEXT NOT NULL,
    is_resolved BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Generation Runs table
CREATE TABLE IF NOT EXISTS public.generation_runs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    model_name TEXT NOT NULL,
    prompt_version TEXT NOT NULL DEFAULT 'v1.0',
    total_requested INTEGER NOT NULL DEFAULT 0,
    total_generated INTEGER NOT NULL DEFAULT 0,
    total_imported INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'running' CHECK (status IN ('running', 'completed', 'failed', 'cancelled')),
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Generation Batches table
CREATE TABLE IF NOT EXISTS public.generation_batches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    run_id UUID NOT NULL REFERENCES public.generation_runs(id) ON DELETE CASCADE,
    batch_number INTEGER NOT NULL DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    items_count INTEGER NOT NULL DEFAULT 0,
    error_log TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- PART 5: EXAM ATTEMPTS, SCORING & BOOKMARKS
-- ------------------------------------------------------------------------------

-- Exam Attempts table
CREATE TABLE IF NOT EXISTS public.exam_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    blueprint_id UUID REFERENCES public.exam_blueprints(id) ON DELETE SET NULL,
    mode TEXT NOT NULL CHECK (mode IN ('exam', 'chapter', 'weakness', 'mistakes')),
    total_questions INTEGER NOT NULL CHECK (total_questions > 0),
    duration_minutes INTEGER NOT NULL DEFAULT 60,
    time_spent_seconds INTEGER NOT NULL DEFAULT 0,
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'submitted', 'abandoned')),
    score_total INTEGER NOT NULL DEFAULT 0,
    score_max INTEGER NOT NULL DEFAULT 0,
    score_percentage NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    is_graded BOOLEAN NOT NULL DEFAULT FALSE,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb
);
CREATE INDEX IF NOT EXISTS idx_exam_attempts_user_subject ON public.exam_attempts(user_id, subject_id);

-- Attempt Questions table
CREATE TABLE IF NOT EXISTS public.attempt_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attempt_id UUID NOT NULL REFERENCES public.exam_attempts(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    sequence_order INTEGER NOT NULL,
    shuffled_choices JSONB NOT NULL,
    question_snapshot JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (attempt_id, question_id),
    UNIQUE (attempt_id, sequence_order)
);

-- Attempt Answers table
CREATE TABLE IF NOT EXISTS public.attempt_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attempt_id UUID NOT NULL REFERENCES public.exam_attempts(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    selected_choice_key TEXT CHECK (selected_choice_key IN ('A', 'B', 'C', 'D')),
    is_correct BOOLEAN,
    answered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    response_time_seconds INTEGER DEFAULT 0,
    UNIQUE (attempt_id, question_id)
);

-- Bookmarks table
CREATE TABLE IF NOT EXISTS public.bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, question_id)
);

-- Question Reports table
CREATE TABLE IF NOT EXISTS public.question_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    reason TEXT NOT NULL,
    details TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'dismissed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Admin Audit Logs table
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    target_entity TEXT NOT NULL,
    target_id TEXT NOT NULL,
    details JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- PART 6: STORAGE BUCKETS SETUP
-- ------------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
    ('source-documents', 'source-documents', false, 52428800, ARRAY['application/pdf']),
    ('question-assets', 'question-assets', false, 10485760, ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'])
ON CONFLICT (id) DO UPDATE SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- ------------------------------------------------------------------------------
-- PART 7: ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.password_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auth_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.source_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.source_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reading_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_blueprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_choices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_answer_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_quality_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generation_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generation_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attempt_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attempt_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- 1. Profiles policies
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id OR public.is_admin());

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id) WITH CHECK (role = (SELECT role FROM public.profiles WHERE id = auth.uid()));

DROP POLICY IF EXISTS "Admins can update any profile" ON public.profiles;
CREATE POLICY "Admins can update any profile" ON public.profiles
    FOR UPDATE USING (public.is_admin());

-- 2. User Sessions policies
DROP POLICY IF EXISTS "Users can view their own active sessions" ON public.user_sessions;
CREATE POLICY "Users can view their own active sessions"
    ON public.user_sessions FOR SELECT
    USING (auth.uid() = user_id OR public.is_admin());

DROP POLICY IF EXISTS "Users can revoke their own sessions" ON public.user_sessions;
CREATE POLICY "Users can revoke their own sessions"
    ON public.user_sessions FOR UPDATE
    USING (auth.uid() = user_id OR public.is_admin())
    WITH CHECK (auth.uid() = user_id OR public.is_admin());

-- 3. Password History policies
DROP POLICY IF EXISTS "Password history is private to user and system" ON public.password_history;
CREATE POLICY "Password history is private to user and system"
    ON public.password_history FOR SELECT
    USING (auth.uid() = user_id);

-- 4. Auth Audit Logs policies
DROP POLICY IF EXISTS "Admins can view all auth audit logs" ON public.auth_audit_logs;
CREATE POLICY "Admins can view all auth audit logs"
    ON public.auth_audit_logs FOR SELECT
    USING (public.is_admin());

DROP POLICY IF EXISTS "Users can view their own auth logs" ON public.auth_audit_logs;
CREATE POLICY "Users can view their own auth logs"
    ON public.auth_audit_logs FOR SELECT
    USING (auth.uid() = user_id);

-- 5. Subjects policies
DROP POLICY IF EXISTS "Anyone can read subjects" ON public.subjects;
CREATE POLICY "Anyone can read subjects" ON public.subjects
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage subjects" ON public.subjects;
CREATE POLICY "Admins can manage subjects" ON public.subjects
    FOR ALL USING (public.is_admin());

-- 6. Chapters & Topics policies
DROP POLICY IF EXISTS "Anyone can read chapters" ON public.chapters;
CREATE POLICY "Anyone can read chapters" ON public.chapters FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage chapters" ON public.chapters;
CREATE POLICY "Admins can manage chapters" ON public.chapters FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Anyone can read topics" ON public.topics;
CREATE POLICY "Anyone can read topics" ON public.topics FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage topics" ON public.topics;
CREATE POLICY "Admins can manage topics" ON public.topics FOR ALL USING (public.is_admin());

-- 7. Source Documents & Pages policies
DROP POLICY IF EXISTS "Authenticated users can read source docs" ON public.source_documents;
CREATE POLICY "Authenticated users can read source docs" ON public.source_documents
    FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can manage source docs" ON public.source_documents;
CREATE POLICY "Admins can manage source docs" ON public.source_documents
    FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Authenticated users can read source pages" ON public.source_pages;
CREATE POLICY "Authenticated users can read source pages" ON public.source_pages
    FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can manage source pages" ON public.source_pages;
CREATE POLICY "Admins can manage source pages" ON public.source_pages
    FOR ALL USING (public.is_admin());

-- 8. Reading Progress policies
DROP POLICY IF EXISTS "Users can manage own reading progress" ON public.reading_progress;
CREATE POLICY "Users can manage own reading progress" ON public.reading_progress
    FOR ALL USING (auth.uid() = user_id);

-- 9. Blueprints policies
DROP POLICY IF EXISTS "Authenticated users can read active blueprints" ON public.exam_blueprints;
CREATE POLICY "Authenticated users can read active blueprints" ON public.exam_blueprints
    FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can manage blueprints" ON public.exam_blueprints;
CREATE POLICY "Admins can manage blueprints" ON public.exam_blueprints
    FOR ALL USING (public.is_admin());

-- 10. Questions policies
DROP POLICY IF EXISTS "Students see published questions" ON public.questions;
CREATE POLICY "Students see published questions" ON public.questions
    FOR SELECT USING (status = 'published' OR public.is_admin());

DROP POLICY IF EXISTS "Admins can manage questions" ON public.questions;
CREATE POLICY "Admins can manage questions" ON public.questions
    FOR ALL USING (public.is_admin());

-- 11. Question Choices policies
DROP POLICY IF EXISTS "Read choices for viewable questions" ON public.question_choices;
CREATE POLICY "Read choices for viewable questions" ON public.question_choices
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.questions q
            WHERE q.id = question_id AND (q.status = 'published' OR public.is_admin())
        )
    );

DROP POLICY IF EXISTS "Admins can manage choices" ON public.question_choices;
CREATE POLICY "Admins can manage choices" ON public.question_choices
    FOR ALL USING (public.is_admin());

-- 12. Answer Keys (Admin & RPC Only)
DROP POLICY IF EXISTS "Only admins read answer keys" ON public.question_answer_keys;
CREATE POLICY "Only admins read answer keys" ON public.question_answer_keys
    FOR SELECT USING (public.is_admin());

DROP POLICY IF EXISTS "Only admins manage answer keys" ON public.question_answer_keys;
CREATE POLICY "Only admins manage answer keys" ON public.question_answer_keys
    FOR ALL USING (public.is_admin());

-- 13. Question Sources policies
DROP POLICY IF EXISTS "Read sources for viewable questions" ON public.question_sources;
CREATE POLICY "Read sources for viewable questions" ON public.question_sources
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.questions q
            WHERE q.id = question_id AND (q.status = 'published' OR public.is_admin())
        )
    );

DROP POLICY IF EXISTS "Admins manage sources" ON public.question_sources;
CREATE POLICY "Admins manage sources" ON public.question_sources
    FOR ALL USING (public.is_admin());

-- 14. Flags, Generation Runs & Batches policies
DROP POLICY IF EXISTS "Admin only flags" ON public.question_quality_flags;
CREATE POLICY "Admin only flags" ON public.question_quality_flags FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin only generation runs" ON public.generation_runs;
CREATE POLICY "Admin only generation runs" ON public.generation_runs FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin only generation batches" ON public.generation_batches;
CREATE POLICY "Admin only generation batches" ON public.generation_batches FOR ALL USING (public.is_admin());

-- 15. Exam Attempts policies
DROP POLICY IF EXISTS "Users read own attempts" ON public.exam_attempts;
CREATE POLICY "Users read own attempts" ON public.exam_attempts
    FOR SELECT USING (auth.uid() = user_id OR public.is_admin());

DROP POLICY IF EXISTS "Users create own attempts" ON public.exam_attempts;
CREATE POLICY "Users create own attempts" ON public.exam_attempts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users update in-progress attempts" ON public.exam_attempts;
CREATE POLICY "Users update in-progress attempts" ON public.exam_attempts
    FOR UPDATE USING (auth.uid() = user_id AND status = 'in_progress');

-- 16. Attempt Questions policies
DROP POLICY IF EXISTS "Users read own attempt questions" ON public.attempt_questions;
CREATE POLICY "Users read own attempt questions" ON public.attempt_questions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.exam_attempts a
            WHERE a.id = attempt_id AND (a.user_id = auth.uid() OR public.is_admin())
        )
    );

-- 17. Attempt Answers policies
DROP POLICY IF EXISTS "Users read own attempt answers" ON public.attempt_answers;
CREATE POLICY "Users read own attempt answers" ON public.attempt_answers
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.exam_attempts a
            WHERE a.id = attempt_id AND (a.user_id = auth.uid() OR public.is_admin())
        )
    );

DROP POLICY IF EXISTS "Users write answers to in-progress attempt" ON public.attempt_answers;
CREATE POLICY "Users write answers to in-progress attempt" ON public.attempt_answers
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.exam_attempts a
            WHERE a.id = attempt_id AND a.user_id = auth.uid() AND a.status = 'in_progress'
        )
    );

DROP POLICY IF EXISTS "Users update answers to in-progress attempt" ON public.attempt_answers;
CREATE POLICY "Users update answers to in-progress attempt" ON public.attempt_answers
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.exam_attempts a
            WHERE a.id = attempt_id AND a.user_id = auth.uid() AND a.status = 'in_progress'
        )
    );

-- 18. Bookmarks policies
DROP POLICY IF EXISTS "Users manage own bookmarks" ON public.bookmarks;
CREATE POLICY "Users manage own bookmarks" ON public.bookmarks
    FOR ALL USING (auth.uid() = user_id);

-- 19. Question Reports policies
DROP POLICY IF EXISTS "Users insert reports" ON public.question_reports;
CREATE POLICY "Users insert reports" ON public.question_reports
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins manage reports" ON public.question_reports;
CREATE POLICY "Admins manage reports" ON public.question_reports
    FOR ALL USING (public.is_admin());

-- 20. Admin Audit Logs policies
DROP POLICY IF EXISTS "Admins read audit logs" ON public.admin_audit_logs;
CREATE POLICY "Admins read audit logs" ON public.admin_audit_logs
    FOR SELECT USING (public.is_admin());

DROP POLICY IF EXISTS "Admins insert audit logs" ON public.admin_audit_logs;
CREATE POLICY "Admins insert audit logs" ON public.admin_audit_logs
    FOR INSERT WITH CHECK (public.is_admin());

-- 21. Storage Policies
DROP POLICY IF EXISTS "Authenticated users can read source documents" ON storage.objects;
CREATE POLICY "Authenticated users can read source documents"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'source-documents');

DROP POLICY IF EXISTS "Admins can upload source documents" ON storage.objects;
CREATE POLICY "Admins can upload source documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'source-documents' AND
    public.is_admin()
);

DROP POLICY IF EXISTS "Admins can update source documents" ON storage.objects;
CREATE POLICY "Admins can update source documents"
ON storage.objects FOR UPDATE
TO authenticated
USING (
    bucket_id = 'source-documents' AND
    public.is_admin()
);

DROP POLICY IF EXISTS "Admins can delete source documents" ON storage.objects;
CREATE POLICY "Admins can delete source documents"
ON storage.objects FOR DELETE
TO authenticated
USING (
    bucket_id = 'source-documents' AND
    public.is_admin()
);

DROP POLICY IF EXISTS "Authenticated users can read question assets" ON storage.objects;
CREATE POLICY "Authenticated users can read question assets"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'question-assets');

DROP POLICY IF EXISTS "Admins can manage question assets" ON storage.objects;
CREATE POLICY "Admins can manage question assets"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'question-assets' AND public.is_admin())
WITH CHECK (bucket_id = 'question-assets' AND public.is_admin());

-- ------------------------------------------------------------------------------
-- PART 8: ATOMIC RPC FUNCTIONS (SECURITY DEFINER)
-- ------------------------------------------------------------------------------

-- Submit & Score Exam Attempt RPC
CREATE OR REPLACE FUNCTION public.submit_exam_attempt_rpc(
    p_attempt_id UUID,
    p_time_spent INTEGER
)
RETURNS JSONB AS $$
DECLARE
    v_user_id UUID;
    v_attempt RECORD;
    v_correct_count INTEGER := 0;
    v_total_count INTEGER := 0;
    v_score_pct NUMERIC(5,2);
    v_ans RECORD;
    v_key RECORD;
BEGIN
    -- Check attempt ownership and status
    SELECT * INTO v_attempt FROM public.exam_attempts WHERE id = p_attempt_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Attempt not found';
    END IF;

    IF v_attempt.user_id != auth.uid() AND NOT public.is_admin() THEN
        RAISE EXCEPTION 'Unauthorized';
    END IF;

    IF v_attempt.status = 'submitted' THEN
        RETURN jsonb_build_object('success', true, 'message', 'Already submitted', 'score', v_attempt.score_total);
    END IF;

    -- Count total questions
    SELECT COUNT(*) INTO v_total_count FROM public.attempt_questions WHERE attempt_id = p_attempt_id;

    -- Grade each answer securely
    FOR v_ans IN (SELECT * FROM public.attempt_answers WHERE attempt_id = p_attempt_id) LOOP
        SELECT * INTO v_key FROM public.question_answer_keys WHERE question_id = v_ans.question_id;
        
        IF FOUND AND v_ans.selected_choice_key IS NOT NULL AND v_ans.selected_choice_key = v_key.correct_choice_key THEN
            UPDATE public.attempt_answers
            SET is_correct = TRUE
            WHERE id = v_ans.id;
            v_correct_count := v_correct_count + 1;
        ELSE
            UPDATE public.attempt_answers
            SET is_correct = FALSE
            WHERE id = v_ans.id;
        END IF;
    END LOOP;

    -- Calculate score percentage
    IF v_total_count > 0 THEN
        v_score_pct := ROUND((v_correct_count::numeric / v_total_count::numeric) * 100.0, 2);
    ELSE
        v_score_pct := 0.0;
    END IF;

    -- Update attempt status
    UPDATE public.exam_attempts
    SET status = 'submitted',
        completed_at = NOW(),
        time_spent_seconds = p_time_spent,
        score_total = v_correct_count,
        score_max = v_total_count,
        score_percentage = v_score_pct,
        is_graded = TRUE
    WHERE id = p_attempt_id;

    RETURN jsonb_build_object(
        'success', true,
        'attempt_id', p_attempt_id,
        'score_total', v_correct_count,
        'score_max', v_total_count,
        'score_percentage', v_score_pct
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
