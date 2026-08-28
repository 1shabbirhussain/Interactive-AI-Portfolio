'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Play, CheckCircle2, Layers, Sparkles } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { Project } from '@/data/portfolio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!project) return null;

  const gallery = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-cyan-500/30 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden my-8"
        >
          {/* Header Close Button */}
          <button
            onClick={onClose}
            aria-label="Close Project Details"
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/80 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition-all cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Image Showcase */}
          <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden">
            <Image
              src={gallery[activeImageIndex]}
              alt={project.title}
              fill
              className="object-contain p-2"
              sizes="(max-width: 1024px) 100vw, 900px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-70" />

            {/* Gallery Thumbnails if multiple images exist */}
            {gallery.length > 1 && (
              <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2 overflow-x-auto pb-1">
                {gallery.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setActiveImageIndex(i)}
                    className={`relative h-12 w-20 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      i === activeImageIndex ? 'border-cyan-400 scale-105' : 'border-slate-700 opacity-60'
                    }`}
                  >
                    <Image src={img} alt="Thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Modal Content Details */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/15 text-purple-400 border border-purple-500/30 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Flagship Architecture
                  </span>
                )}
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {project.title}
              </h3>
              <p className="text-slate-400 text-sm sm:text-base mt-1">
                {project.tagline}
              </p>
            </div>

            {/* Metrics Grid */}
            {project.metrics && (
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                {project.metrics.map((m) => (
                  <div key={m.label} className="text-center">
                    <div className="text-xl sm:text-2xl font-extrabold text-cyan-400 font-mono">
                      {m.value}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Full Architectural Description */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-2">
                <Layers className="h-4 w-4 text-cyan-400" />
                <span>Architecture & Implementation</span>
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                {project.fullDescription}
              </p>
            </div>

            {/* Key Engineering Highlights */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-mono">
                Key Technical Highlights
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technology Stack Tags */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-slate-400">Tech Stack</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Direct Links */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-3">
              {project.playStoreUrl && (
                <a
                  href={project.playStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
                >
                  <Play className="h-4 w-4 fill-slate-950" />
                  <span>Google Play Store</span>
                </a>
              )}
              {project.appStoreUrl && (
                <a
                  href={project.appStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Apple App Store</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs border border-slate-700 transition-all"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
