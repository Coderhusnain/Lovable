-- ============================================================================
-- LEGALGRAM — FULL DATABASE SETUP FOR NEW SUPABASE PROJECT
-- Project: yqodjtyzcbjcvsdlzext  (Legalgram)
-- HOW TO RUN:
--   1. Open new Supabase project dashboard
--   2. Left sidebar -> SQL Editor -> New query
--   3. Paste this ENTIRE file -> click "Run"
-- Safe to run more than once (uses IF NOT EXISTS / OR REPLACE).
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1) document_users : contact info captured before generating a document
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.document_users (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    document_type TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    ip_address INET,
    user_agent TEXT
);
CREATE INDEX IF NOT EXISTS idx_document_users_email ON public.document_users(email);
CREATE INDEX IF NOT EXISTS idx_document_users_document_type ON public.document_users(document_type);
CREATE INDEX IF NOT EXISTS idx_document_users_created_at ON public.document_users(created_at DESC);

-- ----------------------------------------------------------------------------
-- 2) consultations : "schedule a meeting" / contact requests
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.consultations (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    user_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_consultations_created_at ON public.consultations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultations_user_id ON public.consultations(user_id);

-- ----------------------------------------------------------------------------
-- 3) document_submissions : documents submitted for admin review
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.document_submissions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    content TEXT NOT NULL,
    user_email TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_document_submissions_created_at ON public.document_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_document_submissions_user_email ON public.document_submissions(user_email);

-- ----------------------------------------------------------------------------
-- 4) notifications : per-user notifications
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at DESC);

-- ----------------------------------------------------------------------------
-- 5) system_stats : numbers shown on the admin dashboard
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.system_stats (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    stat_name TEXT NOT NULL,
    stat_value NUMERIC NOT NULL DEFAULT 0,
    change_percentage NUMERIC NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- 6) posts + comments : Community Hub (anonymous, 4chan-style)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    guest_name TEXT NOT NULL DEFAULT 'Anonymous',
    content TEXT NOT NULL,
    media_url TEXT,
    media_type TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    ip_hash TEXT,
    upvotes INTEGER NOT NULL DEFAULT 0,
    downvotes INTEGER NOT NULL DEFAULT 0,
    is_pinned BOOLEAN NOT NULL DEFAULT false,
    is_hidden BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS public.comments (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    guest_name TEXT NOT NULL DEFAULT 'Anonymous',
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    parent_comment_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
    upvotes INTEGER NOT NULL DEFAULT 0,
    downvotes INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_posts_created_at ON public.posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_is_pinned ON public.posts(is_pinned DESC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON public.comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON public.comments(parent_comment_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON public.comments(created_at DESC);

-- Storage bucket for community media
INSERT INTO storage.buckets (id, name, public)
VALUES ('community-media', 'community-media', true)
ON CONFLICT (id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Community vote helper functions
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.upvote_post(post_id UUID)
RETURNS void AS $$ BEGIN UPDATE public.posts SET upvotes = upvotes + 1 WHERE id = post_id; END; $$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.downvote_post(post_id UUID)
RETURNS void AS $$ BEGIN UPDATE public.posts SET downvotes = downvotes + 1 WHERE id = post_id; END; $$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.upvote_comment(comment_id UUID)
RETURNS void AS $$ BEGIN UPDATE public.comments SET upvotes = upvotes + 1 WHERE id = comment_id; END; $$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.downvote_comment(comment_id UUID)
RETURNS void AS $$ BEGIN UPDATE public.comments SET downvotes = downvotes + 1 WHERE id = comment_id; END; $$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- ROW LEVEL SECURITY
-- The app talks to the DB with the public "anon" key, so we enable RLS and add
-- permissive policies (same behaviour the original project used). This keeps
-- every screen working. Tighten later if you want stricter access.
-- ============================================================================

-- Community tables: fully open (anonymous board)
ALTER TABLE public.posts    DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments DISABLE ROW LEVEL SECURITY;

-- Enable RLS + allow-all policies on the rest
ALTER TABLE public.document_users        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultations         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_submissions  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_stats          ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['document_users','consultations','document_submissions','notifications','system_stats']
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS "allow_all_select" ON public.%I;', t);
    EXECUTE format('DROP POLICY IF EXISTS "allow_all_insert" ON public.%I;', t);
    EXECUTE format('DROP POLICY IF EXISTS "allow_all_update" ON public.%I;', t);
    EXECUTE format('DROP POLICY IF EXISTS "allow_all_delete" ON public.%I;', t);
    EXECUTE format('CREATE POLICY "allow_all_select" ON public.%I FOR SELECT USING (true);', t);
    EXECUTE format('CREATE POLICY "allow_all_insert" ON public.%I FOR INSERT WITH CHECK (true);', t);
    EXECUTE format('CREATE POLICY "allow_all_update" ON public.%I FOR UPDATE USING (true) WITH CHECK (true);', t);
    EXECUTE format('CREATE POLICY "allow_all_delete" ON public.%I FOR DELETE USING (true);', t);
  END LOOP;
END $$;

-- Storage policy: public read/write for community-media bucket
DROP POLICY IF EXISTS "public_media_access" ON storage.objects;
CREATE POLICY "public_media_access" ON storage.objects
FOR ALL USING (bucket_id = 'community-media')
WITH CHECK (bucket_id = 'community-media');

-- Grant execute on vote functions to anonymous + logged-in users
GRANT EXECUTE ON FUNCTION public.upvote_post(UUID)      TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.downvote_post(UUID)    TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.upvote_comment(UUID)   TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.downvote_comment(UUID) TO anon, authenticated;

-- ============================================================================
-- DONE. All tables, policies, functions and the storage bucket are created.
-- ============================================================================
