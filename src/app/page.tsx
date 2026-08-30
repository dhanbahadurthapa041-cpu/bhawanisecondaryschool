import React from 'react';
import { createPublicClient } from '@/lib/supabase/server';
import { HomeView } from '@/components/home/HomeView';

export const revalidate = 60;

export default async function HomePage() {
  let latestNews: any[] = [];

  try {
    const supabase = createPublicClient();
    const { data: liveNews } = await supabase
      .from('news_posts')
      .select('id, title, slug, body, category, cover_image_url, published_at')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(3);

    if (liveNews) {
      latestNews = liveNews;
    }
  } catch (err) {
    console.error('Error fetching live news for homepage:', err);
  }

  return <HomeView latestNews={latestNews} />;
}
