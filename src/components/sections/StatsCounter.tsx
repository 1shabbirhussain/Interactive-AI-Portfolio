'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Clock, Users, ShieldAlert } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolio';

export function StatsCounter() {
  const icons = [Layers, Clock, Users, ShieldAlert];

  return (
    <section className="relative z-20 -mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {PORTFOLIO_DATA.stats.map((stat, index) => {
          const Icon = icons[index % icons.length];
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/40 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-white group-hover:text-cyan-300 font-mono tracking-tight transition-colors">
                  {stat.value}
                </span>
                <div className="h-9 w-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-all">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-200">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                {stat.desc}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
