'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PostForm } from '@/components/admin/PostForm';
import { createClient } from '@/lib/supabase/client';
import { Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function EditPostPage() {
  const params = useParams();
  const id = params?.id as string;

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPost() {
      if (!id) return;
      try {
        setLoading(true);
        const supabase = createClient();
        const { data, error: fetchErr } = await supabase
          .from('news_posts')
          .select('*')
          .eq('id', id)
          .single();

        if (fetchErr) {
          setError(fetchErr.message);
        } else {
          setPost(data);
        }
      } catch (err: any) {
        setError(err?.message || 'Failed to fetch announcement details.');
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
        <p className="text-sm">Loading announcement data...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="py-16 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-white">Announcement Not Found</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          {error || 'The requested announcement could not be found or has been deleted.'}
        </p>
        <Link
          href="/admin/news"
          className="inline-flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl"
        >
          Back to Announcements
        </Link>
      </div>
    );
  }

  return <PostForm initialData={post} isEditing={true} />;
}
