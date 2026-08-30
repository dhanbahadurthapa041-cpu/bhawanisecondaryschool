-- ====================================================================
-- Bhawani Secondary School - Supabase Database Schema & RLS Policies
-- ====================================================================

-- 1. Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Admins Table
-- Gated admin table referencing auth.users.
-- Do NOT treat every authenticated Supabase user as admin.
CREATE TABLE IF NOT EXISTS public.admins (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on admins table
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Keep the helper off the public Data API. RLS still calls it internally.
CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC;
GRANT USAGE ON SCHEMA private TO postgres, authenticated, service_role;

CREATE OR REPLACE FUNCTION private.is_admin(uid UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admins WHERE user_id = uid
  );
$$;

REVOKE ALL ON FUNCTION private.is_admin(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.is_admin(UUID) TO authenticated, service_role;

-- Allow authenticated users to check only their own admin status
CREATE POLICY "Admins can view their own record"
ON public.admins
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- 3. News & Announcements Table
CREATE TABLE IF NOT EXISTS public.news_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    body TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Notice',
    cover_image_url TEXT,
    is_published BOOLEAN NOT NULL DEFAULT false,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast lookup by slug and published state
CREATE INDEX IF NOT EXISTS idx_news_posts_slug ON public.news_posts(slug);
CREATE INDEX IF NOT EXISTS idx_news_posts_published ON public.news_posts(is_published, published_at DESC);

-- Enable RLS on news_posts
ALTER TABLE public.news_posts ENABLE ROW LEVEL SECURITY;

-- Public read access: ONLY published posts
CREATE POLICY "Public can view published news posts"
ON public.news_posts
FOR SELECT
TO anon, authenticated
USING (is_published = true);

-- Admin read access: ALL posts (including unpublished drafts)
CREATE POLICY "Admins can view all news posts"
ON public.news_posts
FOR SELECT
TO authenticated
USING (private.is_admin(auth.uid()));

-- Admin insert access: Only users in admins table
CREATE POLICY "Admins can insert news posts"
ON public.news_posts
FOR INSERT
TO authenticated
WITH CHECK (private.is_admin(auth.uid()));

-- Admin update access: Only users in admins table
CREATE POLICY "Admins can update news posts"
ON public.news_posts
FOR UPDATE
TO authenticated
USING (private.is_admin(auth.uid()))
WITH CHECK (private.is_admin(auth.uid()));

-- Admin delete access: Only users in admins table
CREATE POLICY "Admins can delete news posts"
ON public.news_posts
FOR DELETE
TO authenticated
USING (private.is_admin(auth.uid()));

-- 4. Contact Inquiries Table (Real contact form delivery)
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on contact_messages
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Public insert policy (allowing visitors to submit inquiries)
CREATE POLICY "Public can submit contact messages"
ON public.contact_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (
    LENGTH(TRIM(name)) > 0 AND
    LENGTH(TRIM(email)) > 3 AND
    LENGTH(TRIM(message)) > 0 AND
    status = 'unread'
);

-- Admin only SELECT access for contact messages
CREATE POLICY "Admins can view contact messages"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (private.is_admin(auth.uid()));

-- Admin only UPDATE access (e.g. mark as read)
CREATE POLICY "Admins can update contact messages"
ON public.contact_messages
FOR UPDATE
TO authenticated
USING (private.is_admin(auth.uid()))
WITH CHECK (private.is_admin(auth.uid()));

-- Admin only DELETE access
CREATE POLICY "Admins can delete contact messages"
ON public.contact_messages
FOR DELETE
TO authenticated
USING (private.is_admin(auth.uid()));

-- 5. Storage Setup for News Cover Images
-- Creates storage bucket 'news-covers' if using Supabase Storage
INSERT INTO storage.buckets (id, name, public)
VALUES ('news-covers', 'news-covers', true)
ON CONFLICT (id) DO NOTHING;

-- Public can read cover images
CREATE POLICY "Public can read news covers"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'news-covers');

-- Only admins can upload cover images
CREATE POLICY "Admins can upload news covers"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'news-covers' AND
    private.is_admin(auth.uid())
);

-- Only admins can update cover images
CREATE POLICY "Admins can update news covers"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
    bucket_id = 'news-covers' AND
    private.is_admin(auth.uid())
);

-- Only admins can delete cover images
CREATE POLICY "Admins can delete news covers"
ON storage.objects
FOR DELETE
TO authenticated
USING (
    bucket_id = 'news-covers' AND
    private.is_admin(auth.uid())
);

-- ====================================================================
-- Helper snippet to add an initial admin user:
-- 1. Create a user via Supabase Dashboard -> Authentication -> Users.
-- 2. Run: INSERT INTO public.admins (user_id) VALUES ('<USER_UUID_HERE>');
-- ====================================================================
