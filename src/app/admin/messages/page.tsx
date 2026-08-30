'use client';

import React, { useEffect, useState } from 'react';
import {
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  Archive,
  Trash2,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'archived'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const { data, error: fetchErr } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchErr) {
        setError(fetchErr.message);
      } else if (data) {
        setMessages(data);
        if (data.length > 0 && !selectedMessage) {
          setSelectedMessage(data[0]);
        }
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch contact inquiries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const updateMessageStatus = async (id: string, newStatus: string) => {
    try {
      const supabase = createClient();
      const { error: updateErr } = await supabase
        .from('contact_messages')
        .update({ status: newStatus })
        .eq('id', id);

      if (!updateErr) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
        );
        if (selectedMessage?.id === id) {
          setSelectedMessage((prev: any) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      console.error('Failed to update message status', err);
    }
  };

  const filteredMessages = messages.filter((m) => {
    if (filter === 'all') return true;
    return m.status === filter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Visitor Inquiries & Contact Messages
          </h1>
          <p className="text-sm text-slate-400">
            Messages submitted by parents, students, and prospective applicants through the contact form.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start">
          {(['all', 'unread', 'read', 'archived'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                filter === tab
                  ? 'bg-blue-900 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3 bg-slate-950/80 rounded-2xl border border-slate-800">
          <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
          <span className="text-xs">Loading inquiries from database...</span>
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="py-16 text-center space-y-2 bg-slate-950/80 rounded-2xl border border-slate-800 px-4">
          <MessageSquare className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-slate-300 font-semibold text-sm">No messages found</p>
          <p className="text-xs text-slate-500">
            Inquiries sent from the public website contact form will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Message List (Left 5 Cols) */}
          <div className="lg:col-span-5 bg-slate-950/80 rounded-2xl border border-slate-800 overflow-hidden divide-y divide-slate-800">
            {filteredMessages.map((msg) => {
              const isSelected = selectedMessage?.id === msg.id;
              return (
                <button
                  key={msg.id}
                  onClick={() => {
                    setSelectedMessage(msg);
                    if (msg.status === 'unread') {
                      updateMessageStatus(msg.id, 'read');
                    }
                  }}
                  className={`w-full text-left p-4 transition-colors flex flex-col gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-950/50 border-l-4 border-amber-400'
                      : 'hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-white truncate max-w-[180px]">
                      {msg.name}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium truncate">{msg.subject}</p>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{msg.message}</p>
                  <div className="pt-1 flex items-center gap-2">
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        msg.status === 'unread'
                          ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                          : msg.status === 'read'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-700 text-slate-400'
                      }`}
                    >
                      {msg.status}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Message Detail (Right 7 Cols) */}
          <div className="lg:col-span-7 bg-slate-950/80 rounded-2xl border border-slate-800 p-6 space-y-6">
            {selectedMessage ? (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="font-heading text-lg font-bold text-white">
                      {selectedMessage.subject}
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      From: <strong className="text-slate-200">{selectedMessage.name}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateMessageStatus(
                          selectedMessage.id,
                          selectedMessage.status === 'read' ? 'unread' : 'read'
                        )
                      }
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
                    >
                      Mark {selectedMessage.status === 'read' ? 'Unread' : 'Read'}
                    </button>
                    <button
                      onClick={() => updateMessageStatus(selectedMessage.id, 'archived')}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      title="Archive message"
                    >
                      <Archive className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Contact Meta */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="hover:text-amber-400 underline truncate"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>
                  {selectedMessage.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                      <a href={`tel:${selectedMessage.phone}`} className="hover:text-amber-400">
                        {selectedMessage.phone}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
                    <span className="text-slate-400">
                      {new Date(selectedMessage.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Message Body */}
                <div className="space-y-2">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">
                    Message Body
                  </label>
                  <div className="p-4 bg-slate-900 rounded-xl text-slate-200 text-sm whitespace-pre-wrap leading-relaxed border border-slate-800 min-h-[160px]">
                    {selectedMessage.message}
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                      selectedMessage.subject
                    )}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Reply via Email Client</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center text-slate-500 text-xs">
                Select an inquiry from the list to view its full details.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
