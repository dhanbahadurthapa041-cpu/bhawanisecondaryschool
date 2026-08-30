import React from 'react';
import Link from 'next/link';
import { GraduationCap, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 bg-slate-50">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center mb-6 shadow-sm border border-blue-100">
        <GraduationCap className="w-8 h-8" />
      </div>
      <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mb-3">
        404 - Page Not Found
      </span>
      <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
        The Page You Are Looking For Does Not Exist
      </h1>
      <p className="text-slate-600 text-sm max-w-md mx-auto mb-8 leading-relaxed">
        The requested URL was not found on our server. It may have been moved or removed.
      </p>
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold shadow-sm transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          href="/news"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-300 transition-colors"
        >
          <span>View Notices</span>
        </Link>
      </div>
    </div>
  );
}
