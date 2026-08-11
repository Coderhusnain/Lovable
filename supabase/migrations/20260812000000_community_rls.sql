-- Lock down community tables (posts, comments).
-- The community is a guest-posting feed: anyone may read and create,
-- but nothing may be edited or deleted through the public API.
-- Applied to production on 2026-08-12 via the management API.

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Remove the legacy wide-open policies that allowed public update/delete
DROP POLICY IF EXISTS public_posts_select ON public.posts;
DROP POLICY IF EXISTS public_posts_insert ON public.posts;
DROP POLICY IF EXISTS public_posts_update ON public.posts;
DROP POLICY IF EXISTS public_posts_delete ON public.posts;
DROP POLICY IF EXISTS public_comments_select ON public.comments;
DROP POLICY IF EXISTS public_comments_insert ON public.comments;
DROP POLICY IF EXISTS public_comments_update ON public.comments;
DROP POLICY IF EXISTS public_comments_delete ON public.comments;

DROP POLICY IF EXISTS "Public can read posts" ON public.posts;
DROP POLICY IF EXISTS "Anyone can create posts" ON public.posts;
DROP POLICY IF EXISTS "Public can read comments" ON public.comments;
DROP POLICY IF EXISTS "Anyone can create comments" ON public.comments;

CREATE POLICY "Public can read posts"
  ON public.posts FOR SELECT
  TO anon, authenticated
  USING (true);

-- New posts must start unpinned, visible, and with zero votes
CREATE POLICY "Anyone can create posts"
  ON public.posts FOR INSERT
  TO anon, authenticated
  WITH CHECK (is_pinned = false AND is_hidden = false AND upvotes = 0 AND downvotes = 0);

CREATE POLICY "Public can read comments"
  ON public.comments FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can create comments"
  ON public.comments FOR INSERT
  TO anon, authenticated
  WITH CHECK (upvotes = 0 AND downvotes = 0);

-- No UPDATE or DELETE policies on purpose: the app never edits or removes
-- community content through the public API, so nobody else can either.
