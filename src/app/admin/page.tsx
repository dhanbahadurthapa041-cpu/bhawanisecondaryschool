'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Newspaper,
  MessageSquare,
  FileCheck2,
  FileClock,
  PlusCircle,
  ArrowRight,
  Sparkles,
  Calendar,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    unreadMessages: 0,
  });
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const supabase = createClient();

        // 1. Fetch posts
        const { data: posts, error: postsError } = await supabase
          .from('news_posts')
          .select('id, title, slug, is_published, category, published_at, created_at')
          .order('created_at', { ascending: false });

        // 2. Fetch contact messages count
        const { count: unreadCount } = await supabase
          .from('contact_messages')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'unread');

        if (!postsError && posts) {
          const published = posts.filter((p) => p.is_published).length;
          setStats({
            totalPosts: posts.length,
            publishedPosts: published,
            draftPosts: posts.length - published,
            unreadMessages: unreadCount || 0,
          });
          setRecentPosts(posts.slice(0, 5));
        }
      } catch (err) {
        console.error('Error fetching admin dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Administration Dashboard
          </h1>
          <p className="text-sm text-slate-400">
            Overview of announcements, publications, and visitor inquiries.
          </p>
        </div>

        <Link
          href="/admin/news/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-md transition-colors w-fit"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Post</span>
        </Link>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Posts</span>
            <Newspaper className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-3xl font-extrabold text-white font-heading">{stats.totalPosts}</p>
          <p className="text-xs text-slate-500">All announcements created</p>
        </div>

        <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Published</span>
            <FileCheck2 className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-400 font-heading">
            {stats.publishedPosts}
          </p>
          <p className="text-xs text-slate-500">Visible on public website</p>
        </div>

        <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Drafts</span>
            <FileClock className="w-5 h-5 text-amber-400" />
          </div>
          <p className="text-3xl font-extrabold text-amber-400 font-heading">{stats.draftPosts}</p>
          <p className="text-xs text-slate-500">Unpublished or in progress</p>
        </div>

        <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Unread Messages</span>
            <MessageSquare className="w-5 h-5 text-indigo-400" />
          </div>
          <p className="text-3xl font-extrabold text-indigo-400 font-heading">
            {stats.unreadMessages}
          </p>
          <p className="text-xs text-slate-500">From public contact form</p>
        </div>
      </div>

      {/* Recent Posts Section */}
      <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold text-white">Recent News & Announcements</h2>
          <Link
            href="/admin/news"
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="py-8 text-center text-slate-500 text-sm">Loading announcements...</div>
        ) : recentPosts.length === 0 ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
              <Sparkles className="w-6 h-6" />
            </div>
            <p className="text-slate-400 text-sm">No announcements found in database.</p>
            <Link
              href="/admin/news/new"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:underline"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Create your first announcement</span>
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-800">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        post.is_published
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {post.is_published ? 'Published' : 'Draft'}
                    </span>
                    <span className="text-xs text-slate-500">&bull;</span>
                    <span className="text-xs text-slate-400">{post.category}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white hover:text-amber-400 transition-colors">
                    <Link href={`/admin/news/${post.id}`}>{post.title}</Link>
                  </h3>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-400 shrink-0">
                  <div className="flex items-center gap-1 text-slate-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                  <Link
                    href={`/admin/news/${post.id}`}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
