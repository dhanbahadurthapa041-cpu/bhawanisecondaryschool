'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  GraduationCap,
  LayoutDashboard,
  Newspaper,
  MessageSquare,
  LogOut,
  ExternalLink,
  PlusCircle,
  Menu,
  X,
  User,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { SCHOOL_INFO } from '@/lib/mock-data';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) return;

    const fetchUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.email) {
        setUserEmail(user.email);
      }
    };
    fetchUser();
  }, [isLoginPage]);

  // Login uses the same layout file but must not render the dashboard chrome
  if (isLoginPage) {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  const navItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'News & Announcements', href: '/admin/news', icon: Newspaper },
    { name: 'Contact Inquiries', href: '/admin/messages', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-900 flex items-center justify-center text-amber-400">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="font-heading font-bold text-sm text-white">Admin Panel</span>
        </div>
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-2 text-slate-400 hover:text-white"
        >
          {mobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar for Desktop & Mobile Toggle */}
      <aside
        className={`${
          mobileNavOpen ? 'block' : 'hidden'
        } md:flex flex-col w-full md:w-64 bg-slate-950 border-r border-slate-800 shrink-0 z-30`}
      >
        {/* Brand */}
        <div className="p-6 border-b border-slate-800 hidden md:flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-800 to-indigo-900 flex items-center justify-center text-amber-400 shadow-md border border-blue-700">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-sm text-white leading-tight">
              Bhawani School
            </h2>
            <p className="text-[11px] text-amber-400 font-medium">Administration</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="px-4 py-4">
          <Link
            href="/admin/news/new"
            onClick={() => setMobileNavOpen(false)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Announcement</span>
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 space-y-1.5 py-2">
          {navItems.map((item) => {
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileNavOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-900/60 text-white font-semibold border border-blue-700/60'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <item.icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info & Footer Actions */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center gap-2.5 px-2 py-1.5 text-xs text-slate-400 bg-slate-900/70 rounded-lg border border-slate-800">
            <User className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{userEmail || 'Administrator'}</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-slate-900 min-h-screen overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
