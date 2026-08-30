import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bhawanischool.edu.np';

  const staticRoutes = [
    '',
    '/about',
    '/academics',
    '/admissions',
    '/news',
    '/staff',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const supabase = await createClient();
  const { data } = await supabase
    .from('news_posts')
    .select('slug, published_at, updated_at')
    .eq('is_published', true);

  const newsRoutes: MetadataRoute.Sitemap = (data ?? []).map((post) => ({
    url: `${baseUrl}/news/${post.slug}`,
    lastModified: new Date(post.updated_at || post.published_at || Date.now()),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...newsRoutes];
}
