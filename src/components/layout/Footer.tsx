'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { SCHOOL_INFO } from '@/lib/mock-data';
import { useLanguage } from '@/context/LanguageContext';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Top Banner Accent */}
      <div className="h-1.5 bg-gradient-to-r from-blue-700 via-amber-500 to-indigo-700 w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: School Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-white border border-slate-700 shrink-0">
                <Image
                  src={SCHOOL_INFO.logoUrl}
                  alt="Shree Bhawani Secondary School Logo"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-white leading-snug">
                  {SCHOOL_INFO.name}
                </h3>
                <p className="text-xs text-amber-400">{SCHOOL_INFO.nepaliName}</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {language === 'ne'
                ? 'गुणस्तरीय, संस्कारयुक्त तथा प्रविधिमैत्री शिक्षा प्रदान गर्दै बालबालिकाको सुनौलो भविष्य निर्माणमा वि.सं. २०४० देखि समर्पित।'
                : `${SCHOOL_INFO.tagline}. Providing quality education, ethical values, and inclusive learning since ${SCHOOL_INFO.established}.`}
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/80 p-2.5 rounded-md border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{language === 'ne' ? 'नेपाल सरकार / राष्ट्रिय परीक्षा बोर्ड मान्यता प्राप्त' : 'Affiliated with NEB / Government of Nepal'}</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4 border-b border-slate-800 pb-2">
              {language === 'ne' ? 'द्रुत लिङ्कहरू' : 'Quick Links'}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                { name: t.nav.about, href: '/about' },
                { name: t.nav.academics, href: '/academics' },
                { name: t.nav.admissions, href: '/admissions' },
                { name: t.nav.news, href: '/news' },
                { name: t.nav.staff, href: '/staff' },
                { name: t.nav.contact, href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-amber-400 transition-colors flex items-center gap-2 text-slate-400 hover:translate-x-1 duration-150"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Academic Levels */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4 border-b border-slate-800 pb-2">
              {language === 'ne' ? 'शैक्षिक तहहरू' : 'Academic Levels (ECD – 12)'}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li className="flex flex-col">
                <span className="text-slate-200 font-medium">Early Childhood Development (ECD)</span>
                <span className="text-[11px] text-slate-500">Pre-Primary Play-based Learning</span>
              </li>
              <li className="flex flex-col">
                <span className="text-slate-200 font-medium">Basic Level Education</span>
                <span className="text-[11px] text-slate-500">Grades 1 to 8 (CDC Nepal Curriculum)</span>
              </li>
              <li className="flex flex-col">
                <span className="text-slate-200 font-medium">Secondary Level (SEE Track)</span>
                <span className="text-[11px] text-slate-500">Grade 9 & 10 (Secondary Board)</span>
              </li>
              <li className="flex flex-col">
                <span className="text-slate-200 font-medium">Higher Secondary (+2)</span>
                <span className="text-[11px] text-slate-500">Grade 11 & 12 (NEB Affiliated Streams)</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Visiting Info */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4 border-b border-slate-800 pb-2">
              {language === 'ne' ? 'सम्पर्क विवरण' : 'Contact & Location'}
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{language === 'ne' ? SCHOOL_INFO.addressNepali : SCHOOL_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <a href={`tel:${SCHOOL_INFO.headTeacherPhone}`} className="hover:text-white block font-medium">
                    HT: {SCHOOL_INFO.headTeacherPhone}
                  </a>
                  <a href={`tel:${SCHOOL_INFO.accountantPhone}`} className="hover:text-white text-[11px] text-slate-400 block">
                    Acc: {SCHOOL_INFO.accountantPhone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${SCHOOL_INFO.email}`} className="break-all hover:text-white">
                  {SCHOOL_INFO.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5 pt-2 border-t border-slate-800/80">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-[11px]">
                  <p className="text-slate-300 font-medium">Administration Desk</p>
                  <p>{SCHOOL_INFO.officeHours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {SCHOOL_INFO.name}. {t.common.allRightsReserved}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/admin/login" className="hover:text-amber-400 transition-colors">
              Administration Login
            </Link>
            <span>&bull;</span>
            <span className="flex items-center gap-1 text-slate-500">
              Badhaiyatal, Bardiya &bull; Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
