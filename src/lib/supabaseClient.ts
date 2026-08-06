import { createClient } from '@supabase/supabase-js';

// Hardcoded values to ensure Community Hub always works
const SUPABASE_URL = "https://nksumgiugukzdmrhhroj.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_FgnQ7RAGAQy8qpSo4VpNTw_CHCNh2_L";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
