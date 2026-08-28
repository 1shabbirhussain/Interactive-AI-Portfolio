'use client';

import React from 'react';
import { Mail, Phone, Cpu, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { PORTFOLIO_DATA } from '@/data/portfolio';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-800/80 bg-slate-950 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand & Bio */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1px]">
                <div className="h-full w-full bg-slate-950 rounded-[11px] flex items-center justify-center font-bold text-cyan-400 text-sm">
                  SH
                </div>
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight">Shabbir Hussain</span>
                <span className="text-xs text-cyan-400 font-mono block">Senior Flutter & Mobile Architect</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Specialized in high-scale cross-platform mobile architectures, white-label engines powering hundreds of production apps from a single repository, and applied LLM intelligence.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={PORTFOLIO_DATA.personal.socials.github}
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                aria-label="GitHub"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href={PORTFOLIO_DATA.personal.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href={PORTFOLIO_DATA.personal.socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-all"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Navigation</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#about" className="hover:text-cyan-400 transition-colors">About & Philosophy</a></li>
              <li><a href="#skills" className="hover:text-cyan-400 transition-colors">Skills Universe</a></li>
              <li><a href="#projects" className="hover:text-cyan-400 transition-colors">Production Projects</a></li>
              <li><a href="#experience" className="hover:text-cyan-400 transition-colors">Career Timeline</a></li>
              <li><a href="#achievements" className="hover:text-cyan-400 transition-colors">Awards & Certifications</a></li>
              <li><a href="#contact" className="hover:text-cyan-400 transition-colors">Get in Touch</a></li>
            </ul>
          </div>

          {/* Location & Back to top */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Location & Status</h4>
            <div className="text-sm text-slate-300">
              Karachi, Pakistan
              <span className="block text-xs text-emerald-400 font-mono mt-1">🟢 Open to Global Relocation & Remote</span>
            </div>
            <div className="pt-3">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
              >
                <ArrowUp className="h-3.5 w-3.5" />
                Back to top
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3 font-mono">
          <div>
            © {new Date().getFullYear()} Shabbir Hussain. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Engineered with Next.js 15 & Groq AI</span>
            <Cpu className="h-3.5 w-3.5 text-cyan-400" />
          </div>
        </div>
      </div>
    </footer>
  );
}
