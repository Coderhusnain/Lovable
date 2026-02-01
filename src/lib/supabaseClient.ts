import { createClient } from '@supabase/supabase-js';

// Hardcoded values to ensure Community Hub always works
const SUPABASE_URL = "https://abxrphctohxctpmaozvc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFieHJwaGN0b2h4Y3RwbWFvenZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4MTIyNDgsImV4cCI6MjA2MTM4ODI0OH0.BHT8zdD4IuSrEzybqXxuADFB903FBl0f0C_yC7lSe_Q";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
