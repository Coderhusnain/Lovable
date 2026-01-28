-- TABLES
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name TEXT,
  content TEXT,
  media_url TEXT,
  media_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id),
  guest_name TEXT,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS POLICIES
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow Public Read" ON posts FOR SELECT TO anon USING (true);
CREATE POLICY "Allow Public Insert" ON posts FOR INSERT TO anon WITH CHECK (true);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow Public Read" ON comments FOR SELECT TO anon USING (true);
CREATE POLICY "Allow Public Insert" ON comments FOR INSERT TO anon WITH CHECK (true);

-- STORAGE BUCKET POLICY (Set in Supabase Dashboard UI)
-- 1. Create a bucket named 'community-media'.
-- 2. Set policy: Allow 'anon' role (public) to INSERT and SELECT.
-- 3. Restrict file types to images/* and video/* in frontend logic.