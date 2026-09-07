'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Bot, ArrowRight, FileDown, Sparkles, Layers, ShieldCheck, Zap, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '@/data/portfolio';

interface HeroProps {
  onOpenAI: () => void;
}

export function Hero({ onOpenAI }: HeroProps) {
  const roles = [
    "Full-Stack Web, Mobile & Desktop Architect",
    "299+ Production Apps from 1 Codebase",
    "High-Performance Cloud & Backend Systems",
    "Enterprise Native-to-Flutter Modernization",
    "Applied AI & High-Speed LLM Integrations"
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [roles.length]);

  const handleResumeDownload = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.3 },
      colors: ['#06b6d4', '#3b82f6', '#8b5cf6', '#10b981'],
    });
    window.open(PORTFOLIO_DATA.personal.resumePdf, '_blank');
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-wide backdrop-blur-md"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse" />
              <span>Available for Senior Mobile Roles & High-Impact Contracts</span>
            </motion.div>

            {/* Main Name & Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-tight">
                Shabbir <span className="text-gradient-cyan">Hussain</span>
              </h1>
              <div className="text-xl sm:text-2xl font-bold text-slate-300 flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span>Senior Flutter Engineer</span>
                <span className="text-cyan-500">•</span>
                <span className="text-cyan-400 font-mono text-lg sm:text-xl">Mobile Architect</span>
              </div>
            </motion.div>

            {/* Rotating Specialization Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-10 flex items-center justify-center lg:justify-start"
            >
              <div className="px-3.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-cyan-300 font-mono text-sm sm:text-base flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
                <span>{roles[currentRoleIndex]}</span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal"
            >
              Architected a white-label mobile engine deploying <strong className="text-slate-100 font-semibold">299 production apps from 1 codebase</strong>, leading enterprise native-to-Flutter migrations with zero downtime, and building custom production systems across <strong className="text-slate-100 font-semibold">Mobile, Full-Stack Web, Desktop & Cloud</strong>.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2"
            >
              <a
                href="#projects"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all duration-300 group"
              >
                <span>Explore Featured Work</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={onOpenAI}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 hover:text-white font-semibold text-sm shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:border-cyan-400 transition-all duration-300 cursor-pointer"
              >
                <Bot className="h-4 w-4 text-cyan-400" />
                <span>Talk to My AI</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 font-mono">
                  AI Agent
                </span>
              </button>

              <button
                onClick={handleResumeDownload}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-slate-300 hover:text-white font-medium text-sm transition-all duration-300 cursor-pointer"
              >
                <FileDown className="h-4 w-4 text-slate-400" />
                <span>Download CV</span>
              </button>
            </motion.div>

            {/* Social Links Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-xs font-mono text-slate-400"
            >
              <span>Connect:</span>
              <a
                href={PORTFOLIO_DATA.personal.socials.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 flex items-center gap-1 transition-colors"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>
              <span className="text-slate-700">•</span>
              <a
                href={PORTFOLIO_DATA.personal.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 flex items-center gap-1 transition-colors"
              >
                <LinkedinIcon className="h-3.5 w-3.5" />
                <span>LinkedIn</span>
              </a>
              <span className="text-slate-700">•</span>
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="hover:text-cyan-400 flex items-center gap-1 transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Email</span>
              </a>
            </motion.div>

          </div>

          {/* Right Column: 3D-Tilt Holographic Portrait & Badges */}
          <div className="lg:col-span-5 flex justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-72 sm:w-88"
            >
              {/* Outer Cyber Glow Frame */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-cyan-500 via-blue-500 to-purple-600 opacity-60 blur-xl group-hover:opacity-100 transition duration-1000 animate-pulse-glow" />

              {/* Card Container */}
              <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-cyan-500/40 p-2 shadow-2xl">
                <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-slate-900">
                  <Image
                    src={PORTFOLIO_DATA.personal.avatar}
                    alt={PORTFOLIO_DATA.personal.name}
                    fill
                    priority
                    className="object-cover object-top hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                </div>

                {/* Floating Micro Tech Chips on Card */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-cyan-500/20 text-xs font-mono">
                  <div className="flex items-center justify-between text-slate-300 font-bold">
                    <span>Shabbir Hussain</span>
                    <span className="text-cyan-400 text-[10px]">CGPA 3.5 Distinction</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Senior Full-Stack & Mobile Architect
                  </div>
                </div>
              </div>

              {/* Floating Orbit Badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-6 px-3 py-2 rounded-xl bg-slate-900/90 border border-cyan-500/30 backdrop-blur-md shadow-lg flex items-center gap-2 text-xs font-mono text-cyan-300"
              >
                <Layers className="h-4 w-4 text-cyan-400" />
                <span>299 Apps Engine</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-1/2 -right-8 px-3 py-2 rounded-xl bg-slate-900/90 border border-purple-500/30 backdrop-blur-md shadow-lg flex items-center gap-2 text-xs font-mono text-purple-300"
              >
                <Zap className="h-4 w-4 text-purple-400" />
                <span>Full-Stack & Applied AI</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-4 -left-4 px-3 py-2 rounded-xl bg-slate-900/90 border border-emerald-500/30 backdrop-blur-md shadow-lg flex items-center gap-2 text-xs font-mono text-emerald-300"
              >
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>99.9% Crash Free</span>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
