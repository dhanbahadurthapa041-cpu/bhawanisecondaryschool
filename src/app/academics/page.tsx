import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen,
  FlaskConical,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  Calendar,
  Layers,
  Award,
  ChevronRight,
  Baby,
} from 'lucide-react';
import { SCHOOL_INFO, ACADEMIC_PROGRAMS } from '@/lib/mock-data';

export const metadata: Metadata = {
  title: 'Academics & Streams (ECD to Class 12)',
  description: `Explore academic levels, CDC curriculum, and Higher Secondary (+2) education at ${SCHOOL_INFO.name}, Badhaiyatal-3, Bardiya.`,
};

export default function AcademicsPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/60 px-3.5 py-1 rounded-full inline-block">
              Academic Curriculum
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Education from ECD to Class 12
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Approved by the Curriculum Development Centre (CDC) and National Examination Board (NEB), Nepal. Quality education fostering character, competence, and continuous growth.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-16">
        {/* 1. Early Childhood Development (ECD) */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Baby className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Pre-Primary Education
              </span>
              <h2 className="font-heading text-2xl font-bold text-slate-900">
                Early Childhood Development (ECD)
              </h2>
            </div>
          </div>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Our ECD program provides a safe, nurturing, play-based setting for children aged 3 to 5. We focus on early literacy, language building in Nepali and English, socialization, creative arts, and foundational motor development.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            <div className="space-y-3">
              <h3 className="font-heading font-bold text-base text-slate-900">
                Key Learning Areas:
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Interactive storytelling, singing & nursery rhymes</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Number recognition, shapes, colors & sensory games</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Drawing, coloring & creative handicraft activities</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-heading font-bold text-base text-slate-900">
                Care & Environment:
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Child-safe, clean and engaging classroom decor</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Nutritious snack support and attentive care</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Close interaction between parents and ECD educators</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2. Basic Level Education (Grade 1 to 8) */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                Grades 1 to 8 &bull; CDC Framework
              </span>
              <h2 className="font-heading text-2xl font-bold text-slate-900">
                Basic Level Education (आधारभूत तह)
              </h2>
            </div>
          </div>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Following the curriculum set by the Curriculum Development Centre (CDC), our Basic Level program develops strong competencies in core languages, fundamental mathematics, general sciences, social studies, and moral education.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            <div className="space-y-3">
              <h3 className="font-heading font-bold text-base text-slate-900">
                Curriculum Subjects:
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Nepali, English & Local Curriculum Studies</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Mathematics, Science & Health Education</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Social Studies, Civic Values & Creative Arts</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-heading font-bold text-base text-slate-900">
                Assessment System:
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Continuous Assessment System (CAS) & regular homework reviews</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Terminal evaluation examinations & report card conferences</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Basic Level Examination (BLE / Grade 8 Board) preparation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. Secondary Level (Grade 9 & 10 - SEE) */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Grade 9 & 10 &bull; SEE Board
              </span>
              <h2 className="font-heading text-2xl font-bold text-slate-900">
                Secondary Level Education (माध्यमिक तह - SEE)
              </h2>
            </div>
          </div>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Secondary education builds deep subject comprehension and analytical skills, guiding students toward successful performance in the national Secondary Education Examination (SEE).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            <div className="space-y-3">
              <h3 className="font-heading font-bold text-base text-slate-900">
                Subject Structure:
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Compulsory English, Nepali, Compulsory Mathematics & Science</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Social Studies & Technical / Optional Subjects</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-heading font-bold text-base text-slate-900">
                Exam Preparation:
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Weekly model exams and previous year question solving</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Special coaching sessions for subjects requiring reinforcement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. Higher Secondary (+2: Grade 11 & 12) */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
              <Briefcase className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                Grade 11 & 12 &bull; NEB Affiliated
              </span>
              <h2 className="font-heading text-2xl font-bold text-slate-900">
                Higher Secondary Education (+२ कार्यक्रम)
              </h2>
            </div>
          </div>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Our Higher Secondary program offers standard streams under the National Examination Board (NEB), preparing students for university education, teacher training, management careers, and public service exams.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            <div className="space-y-3">
              <h3 className="font-heading font-bold text-base text-slate-900">
                Available Academic Streams:
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Education Stream (शिक्षा सङ्काय)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Humanities & Social Sciences Stream (मानविकी)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Management & General Subjects (व्यवस्थापन)</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-heading font-bold text-base text-slate-900">
                Student Support:
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Experienced subject lecturers with regular class monitoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Tuition scholarship waivers for meritorious and deserving candidates</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 text-center space-y-6">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold">
            Admissions Open for ECD to Class 12
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Contact our school administration office at Badhaiyatal-3, Bardiya for enrollment inquiries and details.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/admissions"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-colors"
            >
              View Admission Process
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm border border-slate-700 transition-colors"
            >
              Contact Administration Desk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
