'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bot, FileDown, Layers, Terminal, Sparkles, Phone, Mail, ExternalLink, X } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolio';
import { copyToClipboard } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAI: () => void;
}

export function CommandPalette({ isOpen, onClose, onOpenAI }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [copiedToast, setCopiedToast] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : undefined;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const actions = [
    {
      id: 'ai',
      title: 'Ask AI Digital Representative',
      category: 'AI Assistant',
      icon: Bot,
      action: () => {
        onClose();
        onOpenAI();
      },
    },
    {
      id: 'resume',
      title: 'Download Resume (PDF)',
      category: 'Documents',
      icon: FileDown,
      action: () => {
        confetti({ particleCount: 60, spread: 60 });
        window.open(PORTFOLIO_DATA.personal.resumePdf, '_blank');
        onClose();
      },
    },
    {
      id: 'copy-email',
      title: 'Copy Email Address (001.shabbirhussain@gmail.com)',
      category: 'Contact',
      icon: Mail,
      action: async () => {
        await copyToClipboard(PORTFOLIO_DATA.personal.email);
        setCopiedToast(true);
        setTimeout(() => setCopiedToast(false), 2000);
      },
    },
    {
      id: 'whatsapp',
      title: 'Chat on WhatsApp (+92-347-8356631)',
      category: 'Contact',
      icon: Phone,
      action: () => {
        window.open(PORTFOLIO_DATA.personal.socials.whatsapp, '_blank');
        onClose();
      },
    },
    ...PORTFOLIO_DATA.projects.map((p) => ({
      id: `proj-${p.id}`,
      title: `View Project: ${p.title}`,
      category: 'Projects',
      icon: Layers,
      action: () => {
        window.location.href = `#project-${p.id}`;
        onClose();
      },
    })),
  ];

  const filtered = actions.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-slate-950/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="w-full max-w-2xl bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-slate-800 gap-3">
              <Search className="h-5 w-5 text-cyan-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command, search project, or jump to section..."
                className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm focus:outline-none font-mono"
                autoFocus
              />
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-800/40 font-sans">
              {copiedToast && (
                <div className="p-3 mb-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-emerald-400" />
                  Email copied to clipboard!
                </div>
              )}

              {filtered.length === 0 ? (
                <div className="py-10 text-center text-slate-500 text-sm">
                  No matching commands found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                filtered.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      className="w-full text-left flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-slate-800/80 group transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-slate-800 group-hover:bg-cyan-500/20 border border-slate-700/50 group-hover:border-cyan-500/40 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 transition-all">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-200 group-hover:text-cyan-300">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            {item.category}
                          </div>
                        </div>
                      </div>
                      <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-cyan-400" />
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Tip */}
            <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Use ⌘K or ESC to close</span>
              <span>Shabbir Hussain Portfolio v2.0</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
