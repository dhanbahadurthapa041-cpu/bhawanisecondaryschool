'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  BookOpen,
  Award,
  Users,
  Compass,
  CheckCircle2,
  Calendar,
  Sparkles,
  ChevronRight,
  Bell,
  GraduationCap,
  FlaskConical,
  Briefcase,
  Trophy,
  Baby,
} from 'lucide-react';
import { SCHOOL_INFO, ACADEMIC_PROGRAMS } from '@/lib/mock-data';
import { useLanguage } from '@/context/LanguageContext';

interface HomeViewProps {
  latestNews: any[];
}

export const HomeView: React.FC<HomeViewProps> = ({ latestNews }) => {
  const { language, t } = useLanguage();
  const urgentNotice = latestNews[0];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Breaking Notice Bar */}
      {urgentNotice && (
        <div className="bg-amber-500 text-slate-950 font-medium py-2.5 px-4 text-xs sm:text-sm border-b border-amber-600">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="bg-slate-950 text-amber-300 uppercase tracking-wider text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                <Bell className="w-3 h-3 animate-bounce" /> {t.home.urgentNotice}
              </span>
              <span className="font-semibold line-clamp-1">{urgentNotice.title}</span>
            </div>
            <Link
              href={`/news/${urgentNotice.slug}`}
              className="inline-flex items-center gap-1 text-xs font-bold underline hover:text-white transition-colors shrink-0"
            >
              <span>{t.home.readNotice}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* 2. Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden py-16 sm:py-24 lg:py-28">
        {/* Background Overlay Decor */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline & Action */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-medium backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.home.heroBadge}</span>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {t.home.heroTitle}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                  (ECD – 12)
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                {t.home.heroDesc}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <Link
                  href="/admissions"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-lg hover:shadow-amber-500/20 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>{t.home.admissionsCTA}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/academics"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700 hover:border-slate-600 transition-all flex items-center justify-center gap-2"
                >
                  <span>{t.home.explorePrograms}</span>
                </Link>
              </div>

              {/* Stats Bar */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
                {SCHOOL_INFO.stats.map((stat, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-heading">
                      {stat.value}
                    </p>
                    <p className="text-xs text-slate-400 font-medium leading-tight">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Hero School Emblem Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border border-slate-700/60 bg-gradient-to-b from-slate-900 to-slate-950 p-8 backdrop-blur-sm flex flex-col items-center text-center space-y-5">
                <div className="relative w-36 h-36 rounded-2xl overflow-hidden bg-white border-2 border-amber-400/80 shadow-lg p-2">
                  <Image
                    src={SCHOOL_INFO.logoUrl}
                    alt="Shree Bhawani Secondary School Emblem"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="font-heading text-xl font-bold text-white">
                    {SCHOOL_INFO.name}
                  </h3>
                  <p className="text-xs text-amber-400 font-medium">
                    {language === 'ne' ? SCHOOL_INFO.addressNepali : SCHOOL_INFO.address}
                  </p>
                  <p className="text-xs text-slate-400">
                    Estd. 2040 B.S. &bull; Government Affiliated
                  </p>
                </div>

                <div className="w-full pt-4 border-t border-slate-800 text-xs text-slate-300 grid grid-cols-2 gap-3 text-left">
                  <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Contact</span>
                    <span className="font-semibold text-white">{SCHOOL_INFO.headTeacherPhone}</span>
                  </div>
                  <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Offerings</span>
                    <span className="font-semibold text-amber-300">ECD to Class 12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Welcome Message from the Head Teacher (With Real Photo) */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-64 sm:w-72 aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-4 border-amber-100 bg-slate-100">
                <Image
                  src={SCHOOL_INFO.principalPhotoUrl}
                  alt="Head Teacher - Shree Bhawani Secondary School"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent p-4 text-white">
                  <p className="font-heading font-bold text-sm">Head Teacher</p>
                  <p className="text-[11px] text-amber-400 font-medium">
                    {SCHOOL_INFO.name}, Bardiya
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-blue-900 text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5 text-blue-700" />
                <span>{t.home.principalMessageSubtitle}</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
                {t.home.principalMessageTitle}
              </h2>
              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>{t.home.principalMessageText}</p>
                <p>
                  {language === 'ne'
                    ? 'हाम्रो उद्देश्य विद्यार्थीहरूलाई किताबी ज्ञानमा मात्र सीमित नराखी नैतिक चरित्र, व्यावहारिक सीप र सामाजिक उत्तरदायित्व वहन गर्न सक्ने सक्षम नेतृत्वको रूपमा विकास गर्नु हो।'
                    : 'We ensure balanced academic rigor paired with inclusive care, preparing our students for higher education, SEE milestones, and board examinations with excellence.'}
                </p>
              </div>
              <div className="pt-2 flex items-center gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-900 hover:text-blue-700 group"
                >
                  <span>{language === 'ne' ? 'विद्यालयको बारेमा थप जान्नुहोस्' : 'Learn more about our school & values'}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Academic Programs: ECD to 12 */}
      <section className="py-16 sm:py-20 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
              Academic Levels
            </span>
            <h2 className="font-heading text-3xl font-bold text-slate-900">
              {t.home.academicCurriculumTitle}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              {t.home.academicCurriculumDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ACADEMIC_PROGRAMS.map((prog, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
                    {idx === 0 && <Baby className="w-6 h-6 text-amber-600" />}
                    {idx === 1 && <GraduationCap className="w-6 h-6 text-blue-700" />}
                    {idx === 2 && <BookOpen className="w-6 h-6 text-emerald-700" />}
                    {idx === 3 && <Briefcase className="w-6 h-6 text-indigo-700" />}
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-amber-600 uppercase tracking-wider">
                      {prog.level}
                    </span>
                    <h3 className="font-heading text-base font-bold text-slate-900 mt-1">
                      {language === 'ne' ? prog.nepaliTitle : prog.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{prog.description}</p>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <Link
                    href="/academics"
                    className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1"
                  >
                    <span>{t.common.viewDetails}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Latest News & Announcements */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full">
                Notice Board
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
                Latest News & Campus Notices
              </h2>
              <p className="text-slate-600 text-sm">
                Official announcements, examination schedules, admissions bulletins, and school circulars.
              </p>
            </div>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-900 hover:text-amber-600 transition-colors shrink-0"
            >
              <span>{t.home.viewAllNews}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {latestNews.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center text-sm text-slate-600 space-y-2">
              <p className="font-semibold text-slate-800">No published notices at the moment.</p>
              <p className="text-xs text-slate-500">Official updates from the school administration will appear here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestNews.map((post) => (
                <article
                  key={post.id}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                    {post.cover_image_url ? (
                      <Image
                        src={post.cover_image_url}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-800 flex items-center justify-center text-amber-400">
                        <BookOpen className="w-8 h-8" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="bg-slate-900/80 backdrop-blur-md text-amber-300 text-xs font-bold px-2.5 py-1 rounded-md">
                        {post.category || 'Notice'}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <time dateTime={post.published_at ?? undefined}>
                          {post.published_at
                            ? new Date(post.published_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })
                            : 'Date TBA'}
                        </time>
                      </div>
                      <h3 className="font-heading text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors line-clamp-2">
                        <Link href={`/news/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                        {post.body.replace(/[#*`]/g, '')}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        href={`/news/${post.slug}`}
                        className="text-xs font-bold text-blue-900 group-hover:text-amber-600 flex items-center gap-1 transition-colors"
                      >
                        <span>{t.common.readMore}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 6. Why Choose Us */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/60 px-3.5 py-1 rounded-full">
              {t.home.whyChooseTitle}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
              Cultivating Excellence, Character & Knowledge
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              {t.home.whyChooseDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BookOpen,
                title: "ECD to Grade 12 Continuity",
                desc: "Complete educational path allowing students to grow within a single supportive environment.",
              },
              {
                icon: Users,
                title: "Dedicated Faculty",
                desc: "Experienced, passionate educators focused on student comprehension and moral integrity.",
              },
              {
                icon: Trophy,
                title: "Sports & Cultural Activities",
                desc: "Active participation in local athletics, quiz competitions, cultural festivals, and community service.",
              },
              {
                icon: Award,
                title: "Inclusive & Accessible",
                desc: "Dedicated to welcoming learners across Bardiya with scholarship support and government assistance.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-800/70 p-6 rounded-2xl border border-slate-700/80 hover:border-amber-400/50 transition-colors space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-base font-bold text-white">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Call to Action Banner */}
      <section className="py-14 bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold">
            {t.home.readyToJoin}
          </h2>
          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto">
            {t.home.readyToJoinDesc}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/admissions"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-md transition-colors"
            >
              {t.home.admissionsCTA}
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-colors"
            >
              {t.common.contactUs}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
