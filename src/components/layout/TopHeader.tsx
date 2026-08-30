'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Lock, Globe } from 'lucide-react';
import { SCHOOL_INFO } from '@/lib/mock-data';
import { useLanguage } from '@/context/LanguageContext';

export const TopHeader: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="bg-slate-950 text-slate-200 text-xs border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row justify-between items-center gap-2">
        {/* Contact Highlights */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-5">
          <div className="flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{language === 'ne' ? SCHOOL_INFO.addressNepali : SCHOOL_INFO.address}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors">
            <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <a href={`tel:${SCHOOL_INFO.headTeacherPhone}`} title="Head Teacher">
              HT: {SCHOOL_INFO.headTeacherPhone}
            </a>
          </div>
          <div className="hidden lg:flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors">
            <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <a href={`tel:${SCHOOL_INFO.accountantPhone}`} title="Accountant">
              Acc: {SCHOOL_INFO.accountantPhone}
            </a>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors">
            <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <a href={`mailto:${SCHOOL_INFO.email}`}>{SCHOOL_INFO.email}</a>
          </div>
        </div>

        {/* Language Switcher & Admin Portal */}
        <div className="flex items-center gap-4 text-slate-300">
          {/* Bilingual Language Switcher Toggle */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-700/80 rounded-lg p-0.5 text-[11px]">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded-md font-semibold transition-all ${
                language === 'en'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('ne')}
              className={`px-2 py-0.5 rounded-md font-semibold transition-all ${
                language === 'ne'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              नेपाली
            </button>
          </div>

          <span className="text-slate-700">|</span>

          <Link
            href="/admin/login"
            className="flex items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors font-medium"
            title="School Staff/Admin Portal"
          >
            <Lock className="w-3 h-3" />
            <span>{t.nav.staffPortal}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
