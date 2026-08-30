import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Target,
  Eye,
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  Building,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { SCHOOL_INFO } from '@/lib/mock-data';

export const metadata: Metadata = {
  title: 'About Our School',
  description: `Learn about the history, mission, vision, and leadership of ${SCHOOL_INFO.name}, Badhaiyatal-3, Bardiya.`,
};

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/60 px-3.5 py-1 rounded-full inline-block">
              About Our Institution
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Heritage of Excellence & Service
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Established in {SCHOOL_INFO.established}, {SCHOOL_INFO.name} has been dedicated to cultivating disciplined, forward-thinking, and socially responsible students in Badhaiyatal, Bardiya.
            </p>
          </div>
        </div>
      </section>

      {/* History & Background */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full">
                Our Educational Journey
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
                Four Decades of Dedicated Service in Bardiya
              </h2>
              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Founded in 2040 B.S., <strong>Shree Bhawani Secondary School</strong> began with a clear purpose: to deliver accessible, high-standard schooling to the children and youth of Semara, Badhaiyatal and surrounding communities in Bardiya district.
                </p>
                <p>
                  Over the decades, through community collaboration, dedicated teachers, and institutional progress, the school expanded from basic education to a complete educational institution offering classes from Early Childhood Development (ECD) through Grade 12.
                </p>
                <p>
                  We strive to provide a safe, respectful, and nurturing environment where learners develop academic competence, digital awareness, and moral integrity.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative h-96 w-full rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-900 flex items-center justify-center p-8">
                <div className="relative w-48 h-48 bg-white rounded-2xl p-4 shadow-lg">
                  <Image
                    src={SCHOOL_INFO.logoUrl}
                    alt="Shree Bhawani Secondary School"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="py-16 sm:py-20 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <h2 className="font-heading text-3xl font-bold text-slate-900">
              Guiding Principles & Vision
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              The core tenets directing our teaching practices and student growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Vision */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-slate-900">Our Vision</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To be a vibrant center of learning in Bardiya that empowers all students with knowledge, moral values, and skills to build successful futures.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-slate-900">Our Mission</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Provide inclusive, quality education across all levels (ECD–12) through experienced teaching, interactive learning methods, and strong parent-teacher partnerships.
              </p>
            </div>

            {/* Core Values */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-slate-900">Core Values</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Discipline & Academic Integrity</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Respect, Inclusivity & Harmony</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Curiosity & Life Skills</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Community Commitment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full">
              School Environment
            </span>
            <h2 className="font-heading text-3xl font-bold text-slate-900">
              Campus Facilities & Learning Spaces
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Providing necessary physical and academic resources for productive learning.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "ECD Child-Friendly Corner",
                desc: "Colorful, safe space with age-appropriate learning kits, toys, and activity charts for pre-primary learners.",
              },
              {
                title: "Science Practical Apparatus",
                desc: "Basic scientific models and laboratory equipment supporting practical understanding for grades 6 through 12.",
              },
              {
                title: "Computer & Digital Literacy",
                desc: "Computer lab providing students with digital literacy, typing, and fundamental software skills.",
              },
              {
                title: "School Library & Books",
                desc: "Curriculum textbooks, reference materials, children's storybooks, and reading corners.",
              },
              {
                title: "Sports Ground & Activities",
                desc: "Spacious outdoor grounds for football, volleyball, badminton, athletics, and annual sports competitions.",
              },
              {
                title: "Clean Drinking Water & Sanitation",
                desc: "Safe filtered drinking water facilities and separate sanitary restrooms for students and staff.",
              },
            ].map((facility, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-colors space-y-2.5"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-xs">
                  0{idx + 1}
                </div>
                <h3 className="font-heading text-lg font-bold text-slate-900">{facility.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{facility.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
