import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText,
  CheckCircle2,
  Calendar,
  Award,
  HelpCircle,
  Phone,
  ArrowRight,
  Info,
  Layers,
} from 'lucide-react';
import { SCHOOL_INFO } from '@/lib/mock-data';

export const metadata: Metadata = {
  title: 'Admissions & Scholarships (ECD to Class 12)',
  description: `Admissions process, documentation checklist, and scholarship options at ${SCHOOL_INFO.name}, Badhaiyatal-3, Bardiya.`,
};

export default function AdmissionsPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/60 px-3.5 py-1 rounded-full inline-block">
              Join Shree Bhawani Secondary School
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Admissions & Enrollment (ECD – 12)
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Transparent, accessible admission procedures for students from Early Childhood Development (ECD) through Grade 12 in Badhaiyatal, Bardiya.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-16">
        {/* Step-by-Step Admission Process */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full">
              Application Steps
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
              Admission Procedure
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Simple, straightforward enrollment steps for new and transferring students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Inquiry & Form",
                desc: "Visit the school administration desk in Badhaiyatal-3 to collect the student admission registration form.",
              },
              {
                step: "02",
                title: "Document Submission",
                desc: "Submit birth certificate, transfer certificate (TC) and previous school grade-sheets as applicable.",
              },
              {
                step: "03",
                title: "Counseling / Assessment",
                desc: "Brief interaction with subject teachers to determine appropriate grade placement and stream selection.",
              },
              {
                step: "04",
                title: "Enrollment Confirmation",
                desc: "Completion of student record registry, textbook collection, and issuance of school identification.",
              },
            ].map((st, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative space-y-3"
              >
                <span className="text-3xl font-extrabold font-heading text-blue-900/20">
                  {st.step}
                </span>
                <h3 className="font-heading text-base font-bold text-slate-900">{st.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements & Checklist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Eligibility Criteria */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-slate-900">
                  Eligibility Criteria
                </h3>
                <p className="text-xs text-slate-500">By educational level</p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <h4 className="font-bold text-slate-900 text-sm">ECD & Pre-Primary</h4>
                <p className="text-slate-600">
                  Age 3+ years completed. Official birth certificate required.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <h4 className="font-bold text-slate-900 text-sm">Basic & Secondary (Grade 1 to 10)</h4>
                <p className="text-slate-600">
                  Successful completion of the preceding grade with Character / Transfer Certificate.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <h4 className="font-bold text-slate-900 text-sm">Higher Secondary (Grade 11 & 12)</h4>
                <p className="text-slate-600">
                  Passing grades in the Secondary Education Examination (SEE) as prescribed by the National Examination Board (NEB).
                </p>
              </div>
            </div>
          </div>

          {/* Required Documents */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-slate-900">
                  Required Documents Checklist
                </h3>
                <p className="text-xs text-slate-500">Bring originals and photocopies</p>
              </div>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Student Birth Certificate (or Citizenship certificate for +2 students)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Transfer Certificate (TC) & Character Certificate from previous school</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>SEE Marksheet / Grade-sheet copy (for Grade 11 applicants)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Passport-size photographs of the student (3 copies)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Parent/Guardian contact number and identification document</span>
              </li>
            </ul>

            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                For assistance with forms or scholarship eligibility, please contact the accountant office directly.
              </span>
            </div>
          </div>
        </div>

        {/* Scholarships */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-slate-900">
                Government & Community Scholarships
              </h3>
              <p className="text-xs text-slate-500">Ensuring education for all children in Badhaiyatal</p>
            </div>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            In coordination with government directives and local municipality guidelines, {SCHOOL_INFO.name} provides fee concessions, free textbook distribution, and stipend assistance for Dalit, Janajati, disabled, female, and economically disadvantaged students.
          </p>
        </div>

        {/* Call to Action */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 text-center space-y-4">
          <h3 className="font-heading text-2xl font-bold">Have Questions About Enrollment?</h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
            Contact the Head Teacher or Accountant desk directly via telephone.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={`tel:${SCHOOL_INFO.headTeacherPhone}`}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Head Teacher ({SCHOOL_INFO.headTeacherPhone})</span>
            </a>
            <a
              href={`tel:${SCHOOL_INFO.accountantPhone}`}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>Call Accountant ({SCHOOL_INFO.accountantPhone})</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
