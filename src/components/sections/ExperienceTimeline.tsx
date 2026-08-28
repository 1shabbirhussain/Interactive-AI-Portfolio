'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolio';

export function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider">
          <Briefcase className="h-3.5 w-3.5" />
          <span>Track Record</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Professional Journey & <br />
          <span className="text-gradient-cyan">Engineering Impact</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
          Full lifecycle production delivery across enterprise applications, high-scale white-label platforms, and client products.
        </p>
      </div>

      <div className="relative border-l-2 border-slate-800/80 ml-4 sm:ml-32 space-y-12">
        {PORTFOLIO_DATA.experiences.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="relative pl-6 sm:pl-10"
          >
            {/* Timeline Glowing Node */}
            <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-slate-950 border-2 border-cyan-400 shadow-[0_0_12px_#06b6d4]" />

            {/* Left Date Label for Desktop */}
            <div className="hidden sm:block absolute -left-36 top-1 text-right w-28 text-xs font-mono text-cyan-400 font-bold">
              {exp.period}
            </div>

            {/* Experience Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/40 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] space-y-4">
              
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <span className="sm:hidden block text-xs font-mono text-cyan-400 font-bold mb-1">
                    {exp.period}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {exp.role}
                  </h3>
                  <div className="text-base font-semibold text-cyan-300 mt-0.5">
                    {exp.company}
                  </div>
                </div>

                {exp.impactMetric && (
                  <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold flex items-center gap-1.5">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>{exp.impactMetric}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  {exp.location}
                </span>
                <span>•</span>
                <span>{exp.type}</span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {exp.description}
              </p>

              {/* Responsibilities */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Core Accomplishments
                </h4>
                <ul className="space-y-2">
                  {exp.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="pt-3 border-t border-slate-900 flex flex-wrap gap-1.5">
                {exp.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
