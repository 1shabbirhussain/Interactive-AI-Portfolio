'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, GraduationCap, Laptop, Sparkles, X, ZoomIn, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA, Certificate } from '@/data/portfolio';

export function CertificatesGallery() {
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);

  return (
    <section id="achievements" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider">
          <Award className="h-3.5 w-3.5" />
          <span>Honors & Certifications</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Education, Hackathons & <br />
          <span className="text-gradient-cyan">Verified Credentials</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
          Recognized for technical distinction, hackathon execution, and continuous mastery across software engineering disciplines.
        </p>
      </div>

      {/* Top Cards: Degree Distinction & Devathon Laptop Award */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Degree */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-3xl bg-slate-950/80 border border-cyan-500/30 backdrop-blur-xl relative overflow-hidden group shadow-[0_0_30px_rgba(6,182,212,0.1)]"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/40">
              CGPA 3.5 / 4.0
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            BS in Software Engineering
          </h3>
          <div className="text-sm font-semibold text-cyan-400 font-mono mb-3">
            UBIT — University of Karachi (2020 – 2023)
          </div>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            Graduated with <strong>Distinction</strong>. Specialized in distributed mobile computing, data structures, algorithms, and applied machine intelligence.
          </p>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Graduated with Academic Honors</span>
          </div>
        </motion.div>

        {/* Devathon Laptop Victory */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="p-8 rounded-3xl bg-slate-950/80 border border-purple-500/30 backdrop-blur-xl relative overflow-hidden group shadow-[0_0_30px_rgba(139,92,246,0.1)]"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Laptop className="h-6 w-6" />
            </div>
            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 font-mono text-xs font-bold border border-purple-500/40">
              Top 10 of 70 Teams
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">
            Saylani Devathon Summit 1.0 Winner
          </h3>
          <div className="text-sm font-semibold text-purple-400 font-mono mb-3">
            Saylani Mass IT Training (SMIT)
          </div>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            Awarded a high-performance laptop for architecting and shipping the winning technical mobile application under competitive 48-hour hackathon conditions.
          </p>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-purple-300 bg-purple-950/40 border border-purple-500/30 px-3 py-1.5 rounded-xl">
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            <span>Laptop Awarded for Best Technical Execution</span>
          </div>
        </motion.div>
      </div>

      {/* Verified Certificates Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-cyan-400" />
          <span>Interactive Credentials Gallery (Click to Inspect)</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {PORTFOLIO_DATA.certificates.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => setActiveCert(cert)}
              className="group cursor-pointer rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 backdrop-blur-md overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.25)]"
            >
              <div className="relative aspect-[4/3] w-full bg-slate-900 overflow-hidden">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-transparent transition-colors flex items-center justify-center">
                  <div className="h-9 w-9 rounded-full bg-slate-950/80 border border-cyan-400/60 text-cyan-400 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all scale-75 group-hover:scale-100">
                    <ZoomIn className="h-4 w-4" />
                  </div>
                </div>
              </div>

              <div className="p-3.5 space-y-1">
                <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                  {cert.title}
                </div>
                <div className="text-[11px] text-slate-400 font-mono truncate">
                  {cert.issuer}
                </div>
                {cert.badge && (
                  <span className="inline-block mt-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    {cert.badge}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-3xl w-full bg-slate-900 border border-cyan-500/30 rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6"
            >
              <button
                onClick={() => setActiveCert(null)}
                aria-label="Close Certificate Zoom"
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative aspect-[4/3] w-full bg-slate-950 rounded-2xl overflow-hidden mb-4">
                <Image
                  src={activeCert.image}
                  alt={activeCert.title}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-white">{activeCert.title}</h3>
                  <p className="text-sm font-mono text-cyan-400">{activeCert.issuer} • {activeCert.date}</p>
                </div>
                {activeCert.badge && (
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    {activeCert.badge}
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
