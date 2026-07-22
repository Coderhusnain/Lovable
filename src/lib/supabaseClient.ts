import { createClient } from '@supabase/supabase-js';

// Hardcoded values to ensure Community Hub always works
const SUPABASE_URL = "https://yqodjtyzcbjcvsdlzext.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlxb2RqdHl6Y2JqY3ZzZGx6ZXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQwMjU4NjYsImV4cCI6MjA5OTYwMTg2Nn0.xayGK2eHVLkaFrHCiftoOYJkk2dkBKhclXccQ5M2ahs";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
