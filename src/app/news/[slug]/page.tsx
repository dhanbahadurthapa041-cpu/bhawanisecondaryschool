import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  ArrowLeft,
  Share2,
  Tag,
  BookOpen,
  Phone,
  Mail,
  ChevronRight,
} from 'lucide-react';
import { createPublicClient } from '@/lib/supabase/server';
import { MarkdownBody } from '@/components/news/MarkdownBody';
import { SCHOOL_INFO } from '@/lib/mock-data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let post: any = null;

  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from('news_posts')
      .select('title, body, cover_image_url, published_at')
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle();
    post = data;
  } catch (err) {
    console.error('Error generating metadata for post:', err);
  }

  if (!post) {
    return {
      title: 'Announcement Not Found',
    };
  }

  const excerpt = post.body.replace(/[#*`]/g, '').substring(0, 155) + '...';

  return {
    title: post.title,
    description: excerpt,
    openGraph: {
      title: `${post.title} | ${SCHOOL_INFO.name}`,
      description: excerpt,
      images: post.cover_image_url ? [post.cover_image_url] : [],
      type: 'article',
      publishedTime: post.published_at,
    },
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let post: any = null;

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('news_posts')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle();

    if (!error && data) {
      post = data;
    }
  } catch (err) {
    console.error('Error fetching post detail:', err);
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-blue-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Announcements</span>
          </Link>
          <span className="text-xs text-slate-400 font-medium">
            {SCHOOL_INFO.name}
          </span>
        </div>

        {/* Main Article Container */}
        <article className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          {/* Cover Image */}
          {post.cover_image_url && (
            <div className="relative h-64 sm:h-96 w-full bg-slate-900">
              <Image
                src={post.cover_image_url}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Article Header & Body */}
          <div className="p-6 sm:p-10 lg:p-12 space-y-8">
            {/* Metadata Tags */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-900 font-bold border border-blue-100 uppercase tracking-wider">
                {post.category || 'Announcement'}
              </span>
              <div className="flex items-center gap-1.5 text-slate-500">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <time dateTime={post.published_at}>
                  {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
              </div>
            </div>

            {/* Post Title */}
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
              {post.title}
            </h1>

            {/* Divider */}
            <div className="h-px bg-slate-200" />

            {/* Formatted Markdown Content */}
            <div className="min-h-[200px]">
              <MarkdownBody content={post.body} />
            </div>

            {/* Inquiry Box */}
            <div className="mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-heading font-bold text-sm text-slate-900">
                  Questions about this announcement?
                </h4>
                <p className="text-xs text-slate-600">
                  Contact our administrative office for clarification or assistance.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/contact"
                  className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  Contact Desk
                </Link>
                <a
                  href={`tel:${SCHOOL_INFO.headTeacherPhone}`}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-300 transition-colors"
                >
                  Call Office
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
