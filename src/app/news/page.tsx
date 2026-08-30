import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  ArrowRight,
  Sparkles,
  Tag,
  Search,
  Bell,
  BookOpen,
} from 'lucide-react';
import { createPublicClient } from '@/lib/supabase/server';
import { SCHOOL_INFO } from '@/lib/mock-data';

export const metadata: Metadata = {
  title: 'News & Official Notices',
  description: `Official announcements, examination routines, admissions bulletins, and events from ${SCHOOL_INFO.name}, Badhaiyatal-3, Bardiya.`,
};

export const revalidate = 60; // Revalidate every minute

export default async function NewsPage() {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('news_posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  const posts = !error && data ? data : [];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/60 px-3.5 py-1 rounded-full inline-block">
              Notice Board & Updates
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              News & Announcements
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Stay up-to-date with official notifications, academic schedules, admissions information, and school achievements.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        {posts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 sm:p-16 text-center border border-slate-200 shadow-sm max-w-2xl mx-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
              <Bell className="w-7 h-7" />
            </div>
            <h2 className="font-heading text-xl font-bold text-slate-900">
              No Published Announcements Yet
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              There are currently no active public announcements posted. Please check back soon or contact our administration desk for immediate queries.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                <span>Contact School Desk</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Featured Latest Post */}
            {posts[0] && (
              <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-lg transition-all grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-7 relative h-72 lg:h-auto min-h-[280px] bg-slate-100">
                  {posts[0].cover_image_url ? (
                    <Image
                      src={posts[0].cover_image_url}
                      alt={posts[0].title}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-900 text-amber-400">
                      <BookOpen className="w-12 h-12" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-slate-950/80 backdrop-blur-md text-amber-300 text-xs font-bold px-3 py-1 rounded-md">
                      Featured Notice
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      <time dateTime={posts[0].published_at}>
                        {new Date(posts[0].published_at || posts[0].created_at).toLocaleDateString(
                          'en-US',
                          {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          }
                        )}
                      </time>
                      <span className="text-slate-300">&bull;</span>
                      <span className="font-semibold text-blue-900">
                        {posts[0].category || 'Announcement'}
                      </span>
                    </div>

                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 hover:text-blue-900 transition-colors">
                      <Link href={`/news/${posts[0].slug}`}>{posts[0].title}</Link>
                    </h2>

                    <p className="text-sm text-slate-600 line-clamp-4 leading-relaxed">
                      {posts[0].body.replace(/[#*`]/g, '')}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <Link
                      href={`/news/${posts[0].slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-sm transition-all group"
                    >
                      <span>Read Full Details</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Grid of Remaining Posts */}
            {posts.length > 1 && (
              <div className="space-y-6">
                <h3 className="font-heading text-xl font-bold text-slate-900 border-b border-slate-200 pb-3">
                  All Announcements
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.slice(1).map((post) => (
                    <article
                      key={post.id}
                      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-lg transition-all"
                    >
                      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                        {post.cover_image_url ? (
                          <Image
                            src={post.cover_image_url}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500">
                            <BookOpen className="w-8 h-8" />
                          </div>
                        )}
                        <div className="absolute top-3 left-3">
                          <span className="bg-slate-900/80 backdrop-blur-md text-amber-300 text-[11px] font-bold px-2.5 py-1 rounded-md">
                            {post.category || 'Notice'}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2.5">
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <time dateTime={post.published_at}>
                              {new Date(post.published_at || post.created_at).toLocaleDateString(
                                'en-US',
                                {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                }
                              )}
                            </time>
                          </div>
                          <h4 className="font-heading text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors line-clamp-2">
                            <Link href={`/news/${post.slug}`}>{post.title}</Link>
                          </h4>
                          <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                            {post.body.replace(/[#*`]/g, '')}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-100">
                          <Link
                            href={`/news/${post.slug}`}
                            className="text-xs font-bold text-blue-900 group-hover:text-amber-600 flex items-center gap-1 transition-colors"
                          >
                            <span>Read Notice</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
