'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, CornerDownLeft } from 'lucide-react';

interface CommandOutput {
  command: string;
  response: string | React.ReactNode;
}

export function InteractiveTerminal({ onOpenAI }: { onOpenAI: () => void }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'init',
      response: 'Welcome to Shabbir Hussain v2.0 interactive terminal. Type "help" or click any quick command below.',
    },
  ]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (history.length > 1 && scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [history]);

  const executeCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    let res: string | React.ReactNode = '';

    switch (cleanCmd) {
      case 'help':
        res = (
          <div className="space-y-1">
            <div>Available Commands:</div>
            <div className="text-cyan-300">
              • <span className="font-bold">about</span> : Summary of Shabbir's engineering background
            </div>
            <div className="text-cyan-300">
              • <span className="font-bold">systems</span> : End-to-end full-stack web, mobile & desktop capabilities
            </div>
            <div className="text-cyan-300">
              • <span className="font-bold">299apps</span> : Architectural breakdown of 299 apps from 1 codebase
            </div>
            <div className="text-cyan-300">
              • <span className="font-bold">skills</span> : Key technologies, web frameworks & cloud stack
            </div>
            <div className="text-cyan-300">
              • <span className="font-bold">projects</span> : List top featured applications
            </div>
            <div className="text-cyan-300">
              • <span className="font-bold">contact</span> : Direct email, phone, and social links
            </div>
            <div className="text-cyan-300">
              • <span className="font-bold">chat</span> : Launch the live streaming AI assistant
            </div>
            <div className="text-cyan-300">
              • <span className="font-bold">clear</span> : Clear console screen
            </div>
          </div>
        );
        break;
      case 'about':
        res = `Shabbir Hussain — Senior Full-Stack & Cross-Platform Engineer with 3+ years experience. Graduated with Distinction (CGPA 3.5/4.0) from UBIT, University of Karachi. Top 10 Winner at Saylani Devathon Summit 1.0. Architected 299 apps from 1 codebase at Avialdo and enterprise native migrations at F-Tech. Builds custom production systems across Mobile, Web, Desktop & Cloud.`;
        break;
      case 'systems':
      case 'fullstack':
      case 'web':
        res = `Full-Stack System Engineering: Shabbir builds complete, production-grade systems end-to-end:\n• Web Apps: React, Next.js (App Router, SSR), TypeScript, Tailwind CSS\n• Desktop Software: Cross-platform macOS, Windows, Linux via Flutter Desktop\n• Mobile Apps: Flutter (iOS/Android), Kotlin Compose, native method channels\n• Backend & Cloud: Node.js, Python / FastAPI, Firebase, Supabase, PostgreSQL, WebSockets\n• Applied AI: Sub-second Groq streaming LLMs & Gemini multimodal reasoning\nIf you came to build a product or system, we can architect and ship it together!`;
        break;
      case '299apps':
      case 'whitelabel':
        res = `Linked Union Case Study: Shabbir architected a single Flutter codebase utilizing BLoC and runtime flavor injection that compiles 299 separate Android & iOS labor union apps. Automated batch deployment via Fastlane CI/CD reduced manual release overhead by 85% with 98% code reuse.`;
        break;
      case 'skills':
        res = `Mobile: Flutter, Dart, Kotlin, Swift Interop, BLoC, Clean Architecture\nWeb & Desktop: React, Next.js, TypeScript, Flutter Desktop (macOS/Win/Linux), Tailwind CSS\nBackend & Cloud: Node.js, Python / FastAPI, Firebase Suite, Supabase, PostgreSQL, WebSockets\nDevOps & AI: Fastlane, GitHub Actions, Groq API (800+ tok/s), Google Gemini, DataDog APM`;
        break;
      case 'projects':
        res = `1. Linked Union (299 Labor Union Apps from 1 Codebase)\n2. QnE Grocery Store (Play Store & App Store Live)\n3. Islamic Speeches (F-Tech Enterprise Native Migration, 50K+ downloads)\n4. Gathr (Socket.IO + Stripe + Maps)\n5. AI Event Planner (Groq LLM Powered Full-Stack Concierge)`;
        break;
      case 'contact':
        res = `Email: 001.shabbirhussain@gmail.com\nWhatsApp/Phone: +92-347-8356631\nLinkedIn: linkedin.com/in/shabbir-hussain-445338228\nGitHub: github.com/1shabbirhussain`;
        break;
      case 'chat':
      case 'ai':
        onOpenAI();
        res = `Launching Shabbir's AI Portfolio Representative...`;
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        res = `Command not recognized: "${cleanCmd}". Type "help" for a list of valid commands.`;
    }

    setHistory((prev) => [...prev, { command: cmd, response: res }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input) {
      executeCommand(input);
    }
  };

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl bg-slate-950/90 border border-cyan-500/30 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)]"
      >
        {/* Terminal Header */}
        <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
            <span className="text-xs font-mono text-slate-400 ml-2">shabbir@architect: ~/terminal</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400">
            <Terminal className="h-3.5 w-3.5" />
            <span>Interactive CLI</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div 
          ref={scrollRef}
          className="p-5 font-mono text-xs sm:text-sm text-slate-300 space-y-3 max-h-72 overflow-y-auto"
        >
          {history.map((h, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex items-center gap-2 text-cyan-400">
                <span>shabbir@portfolio:~$</span>
                <span className="text-white font-semibold">{h.command}</span>
              </div>
              <div className="text-slate-400 pl-4 border-l-2 border-slate-800 leading-relaxed whitespace-pre-line">
                {h.response}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Command Chips */}
        <div className="px-5 py-2.5 bg-slate-900/60 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-slate-400 text-[11px]">Quick Run:</span>
          {['help', 'systems', '299apps', 'skills', 'projects', 'contact', 'chat'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => executeCommand(cmd)}
              className="px-2.5 py-1 rounded bg-slate-800/80 hover:bg-cyan-500/20 text-cyan-300 hover:text-cyan-200 border border-slate-700/60 hover:border-cyan-500/40 transition-all text-[11px]"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Input Bar */}
        <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 flex items-center gap-3">
          <span className="text-cyan-400 font-mono text-sm">shabbir@portfolio:~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command (e.g. systems, 299apps, skills, chat)..."
            className="flex-1 bg-transparent text-slate-100 placeholder-slate-600 text-xs sm:text-sm font-mono focus:outline-none"
          />
          <button
            onClick={() => input && executeCommand(input)}
            className="p-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 hover:text-cyan-300 border border-cyan-500/30"
          >
            <CornerDownLeft className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
