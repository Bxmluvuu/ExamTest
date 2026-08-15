-- Production-Ready Authentication & Authorization Hardening Migration
-- Migration: 20260816000000_auth_system_hardening.sql

-- 1. Enrich profiles table
ALTER TABLE public.profiles 
    ADD COLUMN IF NOT EXISTS is_email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS failed_login_attempts INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS locked_until TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS last_sign_in_at TIMESTAMPTZ;

-- 2. User Sessions Table (Concurrent session management & device tracking)
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

-- 3. Password History Table (Prevent password reuse)
CREATE TABLE IF NOT EXISTS public.password_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_password_history_user ON public.password_history(user_id, created_at DESC);

-- 4. Auth Security Audit Logs Table
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

-- 5. Rate Limits Table (Brute-force protection)
CREATE TABLE IF NOT EXISTS public.auth_rate_limits (
    key TEXT PRIMARY KEY,
    attempts_count INTEGER NOT NULL DEFAULT 1,
    first_attempt_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    locked_until TIMESTAMPTZ,
    expires_at TIMESTAMPTZ NOT NULL
);

-- 6. Helper Security Functions for RLS
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

-- 7. Update handle_new_user Trigger
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

-- 8. Enable Row Level Security on New Tables
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.password_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auth_audit_logs ENABLE ROW LEVEL SECURITY;

-- User Sessions RLS Policies
DROP POLICY IF EXISTS "Users can view their own active sessions" ON public.user_sessions;
CREATE POLICY "Users can view their own active sessions"
    ON public.user_sessions FOR SELECT
    USING (auth.uid() = user_id OR public.is_admin());

DROP POLICY IF EXISTS "Users can revoke their own sessions" ON public.user_sessions;
CREATE POLICY "Users can revoke their own sessions"
    ON public.user_sessions FOR UPDATE
    USING (auth.uid() = user_id OR public.is_admin())
    WITH CHECK (auth.uid() = user_id OR public.is_admin());

-- Password History RLS Policies
DROP POLICY IF EXISTS "Password history is private to user and system" ON public.password_history;
CREATE POLICY "Password history is private to user and system"
    ON public.password_history FOR SELECT
    USING (auth.uid() = user_id);

-- Auth Audit Logs RLS Policies
DROP POLICY IF EXISTS "Admins can view all auth audit logs" ON public.auth_audit_logs;
CREATE POLICY "Admins can view all auth audit logs"
    ON public.auth_audit_logs FOR SELECT
    USING (public.is_admin());

DROP POLICY IF EXISTS "Users can view their own auth logs" ON public.auth_audit_logs;
CREATE POLICY "Users can view their own auth logs"
    ON public.auth_audit_logs FOR SELECT
    USING (auth.uid() = user_id);
