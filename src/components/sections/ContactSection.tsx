'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, Copy, Sparkles, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { PORTFOLIO_DATA } from '@/data/portfolio';
import { copyToClipboard } from '@/lib/utils';
import confetti from 'canvas-confetti';

export function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCopyEmail = async () => {
    await copyToClipboard(PORTFOLIO_DATA.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSending(true);
    setErrorMsg('');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSending(false);
      setSubmitted(true);
      confetti({ particleCount: 80, spread: 70 });
      setFormData({ name: '', email: '', message: '' });
    } catch (err: any) {
      setSending(false);
      setErrorMsg(err.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider">
          <MessageSquare className="h-3.5 w-3.5" />
          <span>Let&apos;s Connect</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Ready to Build Something <br />
          <span className="text-gradient-cyan">Exceptional Together?</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
          Open for Senior Full-Stack & Mobile Engineering roles (Remote & Global Relocation) as well as end-to-end product development contracts across Mobile, Web, Desktop, and Cloud Systems.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Direct Channels & Fast Copy */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Quick Copy Email Card */}
          <div className="p-6 rounded-3xl bg-slate-950/80 border border-cyan-500/30 backdrop-blur-xl shadow-[0_0_30px_rgba(6,182,212,0.1)] space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Mail className="h-5 w-5" />
              </div>
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs font-mono text-cyan-300 transition-all cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-300">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase">Direct Email</div>
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="text-base sm:text-lg font-bold text-white hover:text-cyan-300 font-mono transition-colors"
              >
                {PORTFOLIO_DATA.personal.email}
              </a>
            </div>
          </div>

          {/* WhatsApp Direct */}
          <a
            href={PORTFOLIO_DATA.personal.socials.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="p-6 rounded-3xl bg-slate-950/80 border border-emerald-500/30 hover:border-emerald-400 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] flex items-center justify-between group block"
          >
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase">Direct Phone / WhatsApp</div>
                <div className="text-base font-bold text-white group-hover:text-emerald-300 font-mono">
                  {PORTFOLIO_DATA.personal.phone}
                </div>
              </div>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              Instant Chat
            </span>
          </a>

          {/* Location & Status Card */}
          <div className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800 backdrop-blur-xl space-y-2">
            <div className="flex items-center gap-3 text-slate-300 text-sm font-semibold">
              <MapPin className="h-4 w-4 text-cyan-400" />
              <span>{PORTFOLIO_DATA.personal.location}</span>
            </div>
            <div className="text-xs font-mono text-emerald-400 pl-7">
              🟢 Available immediately for full-time & contract engagements.
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <a
              href={PORTFOLIO_DATA.personal.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 flex items-center gap-3 text-slate-300 hover:text-cyan-300 transition-all font-mono text-xs"
            >
              <LinkedinIcon className="h-4 w-4 text-cyan-400" />
              <span>LinkedIn</span>
            </a>
            <a
              href={PORTFOLIO_DATA.personal.socials.github}
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 flex items-center gap-3 text-slate-300 hover:text-cyan-300 transition-all font-mono text-xs"
            >
              <GithubIcon className="h-4 w-4 text-cyan-400" />
              <span>GitHub</span>
            </a>
          </div>

        </div>

        {/* Right Column: Interactive Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/90 border border-cyan-500/20 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white">Send Direct Message</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">Quickly dispatch an inquiry to Shabbir</p>
              </div>
              <Sparkles className="h-5 w-5 text-cyan-400" />
            </div>

            {errorMsg && (
              <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {errorMsg}
              </div>
            )}

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="h-12 w-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-bold text-white">Message Sent Successfully!</h4>
                <p className="text-sm text-slate-400 max-w-sm mx-auto">
                  Your direct message has been securely delivered. Shabbir will get back to you shortly. You can also reach him on WhatsApp at +92-347-8356631.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-400 hover:bg-slate-800"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-cyan-400 focus:outline-none text-white text-sm placeholder-slate-600 font-sans"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Your Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-cyan-400 focus:outline-none text-white text-sm placeholder-slate-600 font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">Message / Opportunity Details *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, role, team requirements, or collaboration idea..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-cyan-400 focus:outline-none text-white text-sm placeholder-slate-600 font-sans"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all duration-300 disabled:opacity-50 cursor-pointer"
                >
                  {sending ? (
                    <span>Preparing Message...</span>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Message to Shabbir</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
