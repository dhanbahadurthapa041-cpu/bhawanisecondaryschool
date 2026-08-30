'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  PlusCircle,
  Search,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  AlertTriangle,
  Loader2,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminNewsListPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from('news_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setActionError(error.message);
      } else if (data) {
        setPosts(data);
        setFilteredPosts(data);
      }
    } catch (err: any) {
      setActionError(err?.message || 'Failed to load posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    let result = posts;
    if (categoryFilter !== 'All') {
      result = result.filter((p) => p.category === categoryFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          p.body.toLowerCase().includes(q)
      );
    }
    setFilteredPosts(result);
  }, [searchQuery, categoryFilter, posts]);

  const togglePublishStatus = async (post: any) => {
    try {
      const supabase = createClient();
      const nextStatus = !post.is_published;
      const { error } = await supabase
        .from('news_posts')
        .update({
          is_published: nextStatus,
          published_at: nextStatus ? new Date().toISOString() : post.published_at,
          updated_at: new Date().toISOString(),
        })
        .eq('id', post.id);

      if (error) {
        setActionError(error.message);
      } else {
        setPosts((prev) =>
          prev.map((p) => (p.id === post.id ? { ...p, is_published: nextStatus } : p))
        );
      }
    } catch (err: any) {
      setActionError(err?.message || 'Could not update post status.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this announcement? This action cannot be undone.')) {
      return;
    }

    try {
      setDeletingId(id);
      const supabase = createClient();
      const { error } = await supabase.from('news_posts').delete().eq('id', id);

      if (error) {
        setActionError(error.message);
      } else {
        setPosts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err: any) {
      setActionError(err?.message || 'Failed to delete announcement.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            News & Announcements
          </h1>
          <p className="text-sm text-slate-400">
            Manage, edit, publish, and delete announcements shown on the public website.
          </p>
        </div>

        <Link
          href="/admin/news/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-md transition-colors w-fit"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Announcement</span>
        </Link>
      </div>

      {actionError && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{actionError}</span>
          </div>
          <button onClick={() => setActionError(null)} className="text-rose-400 hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      {/* Filters Bar */}
      <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by title or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400 hidden sm:inline">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full sm:w-auto bg-slate-900 border border-slate-700 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Categories</option>
            <option value="Notice">Notice</option>
            <option value="Academic">Academic</option>
            <option value="Event">Event</option>
            <option value="Achievement">Achievement</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-slate-950/80 rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
        {loading ? (
          <div className="py-16 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
            <span className="text-xs">Loading announcements from Supabase...</span>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-16 text-center space-y-3 px-4">
            <p className="text-slate-400 text-sm">No announcements matching your filter criteria.</p>
            <Link
              href="/admin/news/new"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:underline"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Create an announcement now</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800 font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Cover</th>
                  <th className="py-3.5 px-4">Title & Slug</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-900/40 transition-colors">
                    {/* Cover Thumbnail */}
                    <td className="py-3 px-4">
                      {post.cover_image_url ? (
                        <div className="relative w-12 h-9 rounded-md overflow-hidden bg-slate-800 border border-slate-700">
                          <Image
                            src={post.cover_image_url}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-9 rounded-md bg-slate-800 flex items-center justify-center text-[10px] text-slate-500 border border-slate-700">
                          None
                        </div>
                      )}
                    </td>

                    {/* Title */}
                    <td className="py-3 px-4 max-w-xs sm:max-w-md">
                      <p className="font-semibold text-white truncate">{post.title}</p>
                      <p className="text-[11px] text-slate-500 truncate">/{post.slug}</p>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-700">
                        {post.category || 'Notice'}
                      </span>
                    </td>

                    {/* Published Status Toggle */}
                    <td className="py-3 px-4">
                      <button
                        onClick={() => togglePublishStatus(post)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
                          post.is_published
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30'
                        }`}
                        title="Click to toggle publish status"
                      >
                        {post.is_published ? (
                          <>
                            <CheckCircle className="w-3 h-3 text-emerald-400" />
                            <span>Published</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3 text-amber-400" />
                            <span>Draft</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Date */}
                    <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {post.is_published && (
                          <Link
                            href={`/news/${post.slug}`}
                            target="_blank"
                            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                            title="View on site"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/news/${post.id}`}
                          className="p-1.5 text-blue-400 hover:text-blue-300 rounded-lg hover:bg-slate-800 transition-colors"
                          title="Edit post"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          disabled={deletingId === post.id}
                          onClick={() => handleDelete(post.id)}
                          className="p-1.5 text-rose-400 hover:text-rose-300 rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50 cursor-pointer"
                          title="Delete post"
                        >
                          {deletingId === post.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
