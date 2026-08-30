import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Users,
  GraduationCap,
  Mail,
  Award,
  BookOpen,
  Phone,
  ArrowRight,
  Info,
} from 'lucide-react';
import { SCHOOL_INFO, MOCK_STAFF } from '@/lib/mock-data';

export const metadata: Metadata = {
  title: 'Faculty & Administration',
  description: `Leadership and staff directory for ${SCHOOL_INFO.name}, Badhaiyatal-3, Bardiya.`,
};

export default function StaffPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/60 px-3.5 py-1 rounded-full inline-block">
              Our Educators & Administration
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Leadership & Staff Directory
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Meet the dedicated leadership, educators, and administrative personnel serving {SCHOOL_INFO.name}, Badhaiyatal-3 Semara, Bardiya.
            </p>
          </div>
        </div>
      </section>

      {/* Main Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-16">
        {/* School Leadership & Administration */}
        <div className="space-y-8">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full">
              Key Contacts
            </span>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mt-2">
              School Administration & In-Charge
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Head Teacher */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border-2 border-amber-300 shadow-sm">
                <Image
                  src={SCHOOL_INFO.principalPhotoUrl}
                  alt="Head Teacher"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 text-center sm:text-left flex-1">
                <div>
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                    School Leadership
                  </span>
                  <h3 className="font-heading text-lg font-bold text-slate-900">
                    Head Teacher
                  </h3>
                </div>
                <p className="text-xs font-semibold text-blue-900">
                  {SCHOOL_INFO.name}, Bardiya
                </p>
                <div className="pt-2 flex items-center justify-center sm:justify-start gap-2 text-xs">
                  <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                  <a
                    href={`tel:${SCHOOL_INFO.headTeacherPhone}`}
                    className="font-bold text-slate-900 hover:text-blue-900"
                  >
                    {SCHOOL_INFO.headTeacherPhone}
                  </a>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  Overseeing institutional governance, curriculum implementation, teacher mentorship, and community engagement.
                </p>
              </div>
            </div>

            {/* Accountant */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-slate-50 shrink-0 border-2 border-blue-200 shadow-sm flex items-center justify-center p-3">
                <Image
                  src={SCHOOL_INFO.logoUrl}
                  alt="School Emblem"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="space-y-2 text-center sm:text-left flex-1">
                <div>
                  <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                    Finance & Administration
                  </span>
                  <h3 className="font-heading text-lg font-bold text-slate-900">
                    Accountant
                  </h3>
                </div>
                <p className="text-xs font-semibold text-blue-900">
                  Accounts & Records Section
                </p>
                <div className="pt-2 flex items-center justify-center sm:justify-start gap-2 text-xs">
                  <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                  <a
                    href={`tel:${SCHOOL_INFO.accountantPhone}`}
                    className="font-bold text-slate-900 hover:text-blue-900"
                  >
                    {SCHOOL_INFO.accountantPhone}
                  </a>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  Responsible for student fee records, government scholarship distribution, accounting documentation, and administrative desks.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Directory Notice */}
        <div className="p-6 rounded-3xl bg-blue-50/80 border border-blue-200 text-blue-950 flex flex-col sm:flex-row items-start gap-4 text-xs sm:text-sm">
          <Info className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-blue-900">Teaching Faculty Roster</p>
            <p className="text-blue-800/80">
              Shree Bhawani Secondary School employs over 30 dedicated primary, lower secondary, and secondary teachers across ECD, Basic (1-8), Secondary (9-10), and Higher Secondary (+2) levels. The detailed teacher roster by department can be obtained from the school administration desk.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
