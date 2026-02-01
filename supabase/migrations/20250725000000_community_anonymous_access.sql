-- ============================================================================
-- LEGALGRAM COMMUNITY HUB - ANONYMOUS POSTING SETUP
-- Run this in your Supabase SQL Editor
-- ============================================================================

-- Create posts table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    guest_name TEXT NOT NULL DEFAULT 'Anonymous',
    content TEXT NOT NULL,
    media_url TEXT,
    media_type TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    ip_hash TEXT, -- Hashed IP for spam prevention (privacy preserving)
    upvotes INTEGER NOT NULL DEFAULT 0,
    downvotes INTEGER NOT NULL DEFAULT 0,
    is_pinned BOOLEAN NOT NULL DEFAULT false,
    is_hidden BOOLEAN NOT NULL DEFAULT false
);

-- Create comments table if it doesn't exist
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

-- Create storage bucket for community media if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('community-media', 'community-media', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- DISABLE ROW LEVEL SECURITY FOR TRUE ANONYMOUS ACCESS (4chan-style)
-- ============================================================================

-- Disable RLS on posts table
ALTER TABLE public.posts DISABLE ROW LEVEL SECURITY;

-- Disable RLS on comments table  
ALTER TABLE public.comments DISABLE ROW LEVEL SECURITY;

-- Drop any existing restrictive policies
DROP POLICY IF EXISTS "Anyone can view posts" ON public.posts;
DROP POLICY IF EXISTS "Authenticated users can create posts" ON public.posts;
DROP POLICY IF EXISTS "Anyone can insert posts" ON public.posts;
DROP POLICY IF EXISTS "Anyone can view comments" ON public.comments;
DROP POLICY IF EXISTS "Authenticated users can create comments" ON public.comments;
DROP POLICY IF EXISTS "Anyone can insert comments" ON public.comments;

-- ============================================================================
-- CREATE PERMISSIVE POLICIES (if RLS is re-enabled in future)
-- ============================================================================

-- Posts: Anyone can do anything
CREATE POLICY "public_posts_select" ON public.posts FOR SELECT USING (true);
CREATE POLICY "public_posts_insert" ON public.posts FOR INSERT WITH CHECK (true);
CREATE POLICY "public_posts_update" ON public.posts FOR UPDATE USING (true);
CREATE POLICY "public_posts_delete" ON public.posts FOR DELETE USING (true);

-- Comments: Anyone can do anything
CREATE POLICY "public_comments_select" ON public.comments FOR SELECT USING (true);
CREATE POLICY "public_comments_insert" ON public.comments FOR INSERT WITH CHECK (true);
CREATE POLICY "public_comments_update" ON public.comments FOR UPDATE USING (true);
CREATE POLICY "public_comments_delete" ON public.comments FOR DELETE USING (true);

-- Storage: Allow public upload and download
DROP POLICY IF EXISTS "Give public access to community-media" ON storage.objects;
CREATE POLICY "public_media_access" ON storage.objects
FOR ALL USING (bucket_id = 'community-media')
WITH CHECK (bucket_id = 'community-media');

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_posts_created_at ON public.posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_is_pinned ON public.posts(is_pinned DESC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON public.comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON public.comments(parent_comment_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON public.comments(created_at DESC);

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to upvote a post
CREATE OR REPLACE FUNCTION public.upvote_post(post_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE public.posts SET upvotes = upvotes + 1 WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to downvote a post
CREATE OR REPLACE FUNCTION public.downvote_post(post_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE public.posts SET downvotes = downvotes + 1 WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to upvote a comment
CREATE OR REPLACE FUNCTION public.upvote_comment(comment_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE public.comments SET upvotes = upvotes + 1 WHERE id = comment_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to downvote a comment
CREATE OR REPLACE FUNCTION public.downvote_comment(comment_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE public.comments SET downvotes = downvotes + 1 WHERE id = comment_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions to anonymous users
GRANT EXECUTE ON FUNCTION public.upvote_post(UUID) TO anon;
GRANT EXECUTE ON FUNCTION public.downvote_post(UUID) TO anon;
GRANT EXECUTE ON FUNCTION public.upvote_comment(UUID) TO anon;
GRANT EXECUTE ON FUNCTION public.downvote_comment(UUID) TO anon;

-- ============================================================================
-- DONE! Community Hub is now fully anonymous
-- ============================================================================
