import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const DEFAULT_SUPABASE_URL = 'https://wmaxgssluilvvjtolzeo.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtYXhnc3NsdWlsdnZqdG9semVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwODEzMTcsImV4cCI6MjEwMzY1NzMxN30.1AttJB6uAAuF3WhqHKIBZpvmSwiIMidoERQHbtuN960';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const pathname = request.nextUrl.pathname;

  // Explicitly exclude `/admin/login` and non-admin routes to avoid infinite redirect loops
  const isLoginPage = pathname === '/admin/login';
  const isAdminRoute = pathname.startsWith('/admin') && !isLoginPage;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isAdminRoute) {
    // 1. If not authenticated, redirect to /admin/login
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }

    // 2. Check if the user is listed in the `admins` table
    const { data: adminRecord, error: adminError } = await supabase
      .from('admins')
      .select('user_id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (adminError || !adminRecord) {
      // User is authenticated but NOT an authorized admin -> redirect to login with error
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      url.searchParams.set('error', 'unauthorized');
      return NextResponse.redirect(url);
    }
  }

  // If user is already an admin and visits /admin/login, redirect to /admin
  if (isLoginPage && user) {
    const { data: adminRecord } = await supabase
      .from('admins')
      .select('user_id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (adminRecord) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin';
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
