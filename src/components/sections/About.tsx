'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Smartphone, Cpu, Globe, Award } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolio';

export function About() {
  const pillars = [
    {
      title: "The 299-App White-Label Architecture",
      icon: Layers,
      color: "cyan",
      description: "At Avialdo Solutions, I architected a unified Flutter codebase serving 299 distinct US labor union apps (Teamsters 688, IUOE, TSS) using reactive BLoC, flavor-based theming, and Fastlane CI/CD automation. This eliminated per-client codebases and achieved 98% code reuse across Android & iOS.",
      tag: "Mobile Architecture"
    },
    {
      title: "End-to-End Web & Desktop Engineering",
      icon: Globe,
      color: "blue",
      description: "Beyond mobile, I build high-performance web applications with React, Next.js, TypeScript, and Tailwind CSS, as well as cross-platform desktop software with Flutter Desktop. Backed by Node.js, Python/FastAPI, Firebase, and PostgreSQL, I engineer complete custom systems from UI to cloud infrastructure.",
      tag: "Full-Stack & Desktop"
    },
    {
      title: "Zero-Downtime Enterprise Migration",
      icon: Smartphone,
      color: "purple",
      description: "At F-Tech Solution, I lead the enterprise native-to-Flutter transition by embedding modular Flutter viewports incrementally into existing production apps. This delivers modern UI responsiveness and rapid release velocity without breaking legacy infrastructure.",
      tag: "Migration Engineering"
    },
    {
      title: "Applied AI & Real-Time Observability",
      icon: Cpu,
      color: "violet",
      description: "Pioneering applied generative AI with sub-second streaming inference via Groq LLMs and Gemini multimodal reasoning. Combined with WebSockets, OneSignal push segmentation, and DataDog telemetry for 99.9% crash-free production stability.",
      tag: "AI & Telemetry"
    }
  ];

  return (
    <section id="about" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider">
          <span>Engineering DNA</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Architecting High-Scale Systems, <br />
          <span className="text-gradient-cyan">Not Just Writing Code</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
          I bridge the gap between industrial-scale cross-platform architecture, modern full-stack web & desktop engineering, and next-generation applied artificial intelligence.
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-7 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/40 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="h-11 w-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/40 group-hover:bg-cyan-500/10 transition-all">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-cyan-300 group-hover:border-cyan-500/30 transition-all">
                  {pillar.tag}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                {pillar.title}
              </h3>

              <p className="text-slate-400 text-sm leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
