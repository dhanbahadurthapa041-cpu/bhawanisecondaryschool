'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight } from 'lucide-react';
import { SCHOOL_INFO } from '@/lib/mock-data';
import { useLanguage } from '@/context/LanguageContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language, t } = useLanguage();

  const navLinks = [
    { name: t.nav.home, href: '/' },
    { name: t.nav.about, href: '/about' },
    { name: t.nav.academics, href: '/academics' },
    { name: t.nav.admissions, href: '/admissions' },
    { name: t.nav.news, href: '/news' },
    { name: t.nav.staff, href: '/staff' },
    { name: t.nav.contact, href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 min-h-[5rem] gap-2">
          {/* Logo & School Name */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0 min-w-0">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden shadow-xs border border-slate-200 bg-white group-hover:scale-105 transition-transform duration-200 shrink-0">
              <Image
                src={SCHOOL_INFO.logoUrl}
                alt="Shree Bhawani Secondary School Logo"
                fill
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] sm:text-xs font-semibold text-amber-700 tracking-wide truncate">
                {SCHOOL_INFO.nepaliName}
              </span>
              <span className="text-sm sm:text-base xl:text-lg font-bold font-heading text-slate-900 leading-tight group-hover:text-blue-900 transition-colors truncate">
                {SCHOOL_INFO.name}
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium hidden md:inline truncate">
                {language === 'ne' ? 'बढैयाताल-३ सेमरा, बर्दिया' : 'Badhaiyatal-3 Semara, Bardiya'} &bull; Estd. 2040 B.S.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 shrink-0">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2 py-1.5 xl:px-3 xl:py-2 rounded-lg text-xs xl:text-sm font-medium whitespace-nowrap transition-all ${
                    active
                      ? 'text-blue-900 bg-blue-50 font-semibold shadow-xs'
                      : 'text-slate-700 hover:text-blue-900 hover:bg-slate-100/80'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <Link
              href="/admissions"
              className="ml-1 xl:ml-2 inline-flex items-center gap-1 px-3 py-1.5 xl:px-4 xl:py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs xl:text-sm font-medium shadow-xs hover:shadow transition-all duration-150 active:scale-95 whitespace-nowrap shrink-0"
            >
              <span>{t.nav.applyNow}</span>
              <ChevronRight className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden shrink-0">
            <Link
              href="/admissions"
              className="px-2.5 py-1.5 rounded-md bg-amber-600 text-white text-xs font-medium whitespace-nowrap"
            >
              {t.nav.applyNow}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium ${
                  active
                    ? 'text-blue-900 bg-blue-50 font-semibold'
                    : 'text-slate-700 hover:text-blue-900 hover:bg-slate-50'
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className={`w-4 h-4 ${active ? 'text-blue-900' : 'text-slate-400'}`} />
              </Link>
            );
          })}
          <div className="pt-4 border-t border-slate-100 mt-2">
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center px-4 py-2.5 text-xs text-slate-500 bg-slate-50 rounded-lg hover:bg-slate-100"
            >
              Teacher & Staff Portal Access
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
