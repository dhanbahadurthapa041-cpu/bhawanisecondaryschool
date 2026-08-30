'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building,
  HelpCircle,
  User,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { SCHOOL_INFO } from '@/lib/mock-data';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
  const { language, t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in your name, email, and message.');
      return;
    }

    try {
      setSubmitting(true);
      const supabase = createClient();

      const { error } = await supabase.from('contact_messages').insert([
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || null,
          subject: formData.subject.trim() || 'General Inquiry',
          message: formData.message.trim(),
          status: 'unread',
        },
      ]);

      if (error) {
        throw error;
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (err: any) {
      setErrorMessage(
        err?.message || 'Failed to deliver message. Please contact the school directly via phone.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/60 px-3.5 py-1 rounded-full inline-block">
              {language === 'ne' ? 'सम्पर्क तथा सोधपुछ' : 'Get in Touch'}
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              {language === 'ne' ? 'विद्यालय प्रशासन तथा भर्ना डेस्क' : 'Contact School Administration'}
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {language === 'ne'
                ? 'श्री भवानी माध्यमिक विद्यालय, बढैयाताल-३ सेमरा, बर्दिया। भर्ना, परीक्षा तथा अन्य जानकारीका लागि सम्पर्क गर्नुहोस्।'
                : `We welcome parents, students, alumni, and community members to reach out to ${SCHOOL_INFO.name}, Badhaiyatal, Bardiya.`}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: School Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="font-heading text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                {language === 'ne' ? 'सम्पर्क विवरणहरू' : 'Official Contact Information'}
              </h2>

              <div className="space-y-4 text-sm text-slate-600">
                {/* Location */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                      {t.common.addressLabel}
                    </h3>
                    <p className="mt-0.5 font-medium text-slate-800">
                      {language === 'ne' ? SCHOOL_INFO.addressNepali : SCHOOL_INFO.address}
                    </p>
                    <p className="text-xs text-slate-500">{language === 'ne' ? 'लुम्बिनी प्रदेश, नेपाल' : 'Lumbini Province, Nepal'}</p>
                  </div>
                </div>

                {/* Head Teacher */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                      {t.common.headTeacher}
                    </h3>
                    <p className="mt-0.5">
                      <a href={`tel:${SCHOOL_INFO.headTeacherPhone}`} className="hover:text-blue-900 font-bold text-slate-900">
                        {SCHOOL_INFO.headTeacherPhone}
                      </a>
                    </p>
                    <p className="text-xs text-slate-500">{language === 'ne' ? 'प्रधानाध्यापक प्रत्यक्ष सम्पर्क' : 'Direct mobile for leadership inquiries'}</p>
                  </div>
                </div>

                {/* Accountant */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                      {t.common.accountant}
                    </h3>
                    <p className="mt-0.5">
                      <a href={`tel:${SCHOOL_INFO.accountantPhone}`} className="hover:text-blue-900 font-bold text-slate-900">
                        {SCHOOL_INFO.accountantPhone}
                      </a>
                    </p>
                    <p className="text-xs text-slate-500">{language === 'ne' ? 'शुल्क, प्रमाणपत्र तथा प्रशासनिक शाखा' : 'Fees, certificates & administration'}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                      {t.common.emailLabel}
                    </h3>
                    <p className="mt-0.5">
                      <a href={`mailto:${SCHOOL_INFO.email}`} className="hover:text-blue-900 underline font-medium text-slate-900 break-all">
                        {SCHOOL_INFO.email}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5 pt-2 border-t border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                      {language === 'ne' ? 'कार्यालय समय' : 'Working Hours'}
                    </h3>
                    <p className="mt-0.5 font-medium">{language === 'ne' ? 'आइतबार - शुक्रबार: बिहान ९:०० - दिउँसो ४:३०' : SCHOOL_INFO.officeHours}</p>
                    <p className="text-xs text-slate-500">{language === 'ne' ? 'शनिबार तथा सार्वजनिक बिदाका दिन बन्द' : 'Sunday to Friday (Closed on Saturdays & Holidays)'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full">
                  Direct Inquiries
                </span>
                <h2 className="font-heading text-2xl font-bold text-slate-900 mt-2">
                  Send Us a Direct Message
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Your message will be logged securely in our administrative inbox.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-emerald-950">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to Shree Bhawani Secondary School. Our administration will review your note promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Your Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Tharu"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Contact Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="98XXXXXXXX"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Subject / Topic
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g. Admission inquiry, Transfer Certificate"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your question or request here..."
                      className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-7 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-slate-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
