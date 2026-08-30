import { createBrowserClient } from '@supabase/ssr';

const DEFAULT_SUPABASE_URL = 'https://wmaxgssluilvvjtolzeo.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtYXhnc3NsdWlsdnZqdG9semVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwODEzMTcsImV4cCI6MjEwMzY1NzMxN30.1AttJB6uAAuF3WhqHKIBZpvmSwiIMidoERQHbtuN960';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
