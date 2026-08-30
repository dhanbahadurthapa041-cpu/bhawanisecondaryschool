/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL:
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      "https://wmaxgssluilvvjtolzeo.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtYXhnc3NsdWlsdnZqdG9semVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwODEzMTcsImV4cCI6MjEwMzY1NzMxN30.1AttJB6uAAuF3WhqHKIBZpvmSwiIMidoERQHbtuN960",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "wmaxgssluilvvjtolzeo.supabase.co",
      },
    ],
  },
};

export default nextConfig;
