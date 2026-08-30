'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  UploadCloud,
  FileText,
  Eye,
  CheckCircle,
  AlertCircle,
  Loader2,
  Trash2,
  Sparkles,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface PostFormProps {
  initialData?: {
    id?: string;
    title: string;
    slug: string;
    category: string;
    body: string;
    cover_image_url?: string | null;
    is_published: boolean;
  };
  isEditing?: boolean;
}

export function PostForm({ initialData, isEditing = false }: PostFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [category, setCategory] = useState(initialData?.category || 'Notice');
  const [body, setBody] = useState(initialData?.body || '');
  const [coverImageUrl, setCoverImageUrl] = useState(initialData?.cover_image_url || '');
  const [isPublished, setIsPublished] = useState(initialData?.is_published ?? true);

  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!isEditing || !slug) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generatedSlug);
    }
  };

  // Image Upload handler to Supabase Storage 'news-covers'
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Image size exceeds 5MB limit.');
      return;
    }

    // Validate type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
    if (!allowedTypes.includes(file.type)) {
      setErrorMessage('Please upload a valid image file (JPEG, PNG, WebP, AVIF).');
      return;
    }

    try {
      setUploadingImage(true);
      setErrorMessage(null);
      const supabase = createClient();

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `covers/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('news-covers')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: publicUrlData } = supabase.storage
        .from('news-covers')
        .getPublicUrl(filePath);

      setCoverImageUrl(publicUrlData.publicUrl);
    } catch (err: any) {
      setErrorMessage(
        err?.message ||
          'Failed to upload image to Supabase Storage. You can also paste an image URL directly.'
      );
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!title.trim() || !slug.trim() || !body.trim()) {
      setErrorMessage('Please fill in the title, slug, and post body.');
      return;
    }

    try {
      setSubmitting(true);
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const postPayload = {
        title: title.trim(),
        slug: slug.trim(),
        category,
        body: body.trim(),
        cover_image_url: coverImageUrl.trim() || null,
        is_published: isPublished,
        published_at: isPublished ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
        ...(isEditing ? {} : { created_by: user?.id || null }),
      };

      if (isEditing && initialData?.id) {
        const { error } = await supabase
          .from('news_posts')
          .update(postPayload)
          .eq('id', initialData.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('news_posts').insert([postPayload]);
        if (error) throw error;
      }

      router.push('/admin/news');
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to save announcement.');
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/news"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-heading text-2xl font-bold text-white">
              {isEditing ? 'Edit Announcement' : 'Create New Announcement'}
            </h1>
            <p className="text-xs text-slate-400">
              {isEditing
                ? 'Update the details and content of this announcement.'
                : 'Publish official news, events, notices, and academic bulletins.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/news"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
          >
            {submitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{isEditing ? 'Save Changes' : 'Publish Announcement'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-rose-400 hover:text-white"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Main Content Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-5">
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Announcement Title <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={handleTitleChange}
                placeholder="e.g., Annual Sports Meet 2081 or Grade 11 Admission Notice"
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                URL Slug <span className="text-rose-400">*</span>
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2.5 bg-slate-900/90 border border-r-0 border-slate-700 rounded-l-xl text-xs text-slate-500 select-none">
                  /news/
                </span>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="post-url-slug"
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-r-xl text-white text-xs placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Markdown Body with Live Preview */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Post Content (Markdown supported) <span className="text-rose-400">*</span>
                </label>
                <div className="flex items-center rounded-lg bg-slate-900 p-1 border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setActiveTab('write')}
                    className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                      activeTab === 'write'
                        ? 'bg-blue-900 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5 inline mr-1" />
                    Write
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('preview')}
                    className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                      activeTab === 'preview'
                        ? 'bg-blue-900 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5 inline mr-1" />
                    Preview
                  </button>
                </div>
              </div>

              {activeTab === 'write' ? (
                <textarea
                  required
                  rows={14}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Write the full announcement here. Use Markdown for headings (###), bold (**text**), bullet points (- item), etc."
                  className="w-full p-4 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
                />
              ) : (
                <div className="min-h-[350px] p-6 bg-slate-900 border border-slate-700 rounded-xl prose prose-invert max-w-none text-slate-200 text-sm whitespace-pre-wrap leading-relaxed">
                  {body.trim() ? (
                    body
                  ) : (
                    <span className="text-slate-500 italic">No content written yet to preview.</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Settings & Media Upload */}
        <div className="space-y-6">
          {/* Publishing Settings */}
          <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
              Publishing Options
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Notice">Notice</option>
                <option value="Academic">Academic</option>
                <option value="Event">Event</option>
                <option value="Achievement">Achievement</option>
              </select>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-200">Visible to Public</p>
                <p className="text-[11px] text-slate-400">
                  {isPublished ? 'Published on live website' : 'Saved as private draft'}
                </p>
              </div>
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900 bg-slate-800 border-slate-700 cursor-pointer"
              />
            </div>
          </div>

          {/* Cover Image Uploader */}
          <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
              Cover Image
            </h3>

            {coverImageUrl ? (
              <div className="space-y-3">
                <div className="relative h-44 w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-700">
                  <Image
                    src={coverImageUrl}
                    alt="Cover preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setCoverImageUrl('')}
                  className="w-full py-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove Image</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-xl p-6 cursor-pointer bg-slate-900/50 hover:bg-slate-900 transition-colors">
                  <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
                  <span className="text-xs font-medium text-slate-300">
                    {uploadingImage ? 'Uploading...' : 'Upload Image File'}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1">
                    PNG, JPG, WebP up to 5MB
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={uploadingImage}
                    className="hidden"
                  />
                </label>

                <div className="text-center text-[11px] text-slate-500">or paste image URL</div>

                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={coverImageUrl}
                  onChange={(e) => setCoverImageUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
