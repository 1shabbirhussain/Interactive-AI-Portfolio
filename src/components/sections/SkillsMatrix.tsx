'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, CheckCircle2, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolio';

export function SkillsMatrix() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const categories = PORTFOLIO_DATA.skillCategories;

  return (
    <section id="skills" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider">
          <Cpu className="h-3.5 w-3.5" />
          <span>Technical Arsenal</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Mastered Technologies & <br />
          <span className="text-gradient-cyan">Architecture Stack</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
          From reactive Flutter state engines and native Kotlin bridges to Fastlane automation and Groq streaming LLMs.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat, index) => {
          const isActive = index === activeCategoryIndex;
          return (
            <button
              key={cat.name}
              onClick={() => setActiveCategoryIndex(index)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] font-bold'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-cyan-500/30'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Active Category Description */}
      <div className="text-center text-sm font-mono text-cyan-400/90 mb-8 max-w-2xl mx-auto">
        &ldquo;{categories[activeCategoryIndex].description}&rdquo;
      </div>

      {/* Skills Grid */}
      <motion.div
        key={activeCategoryIndex}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {categories[activeCategoryIndex].skills.map((skill, idx) => (
          <div
            key={skill.name}
            className="p-5 rounded-2xl bg-slate-950/75 border border-slate-800/80 hover:border-cyan-500/40 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {skill.name}
                </span>
                <span
                  className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    skill.level === 'Expert'
                      ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                      : 'bg-purple-500/15 text-purple-400 border border-purple-500/30'
                  }`}
                >
                  {skill.level}
                </span>
              </div>
            </div>

            {skill.note && (
              <div className="mt-3 pt-3 border-t border-slate-900 flex items-center gap-2 text-xs font-mono text-slate-400">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                <span>{skill.note}</span>
              </div>
            )}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
