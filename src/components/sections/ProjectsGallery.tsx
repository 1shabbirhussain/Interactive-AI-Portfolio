'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Layers, Play, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '@/data/portfolio';
import { ProjectModal } from './ProjectModal';

export function ProjectsGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'White-Label', 'Mobile', 'Enterprise', 'AI Integration'];

  const filteredProjects =
    selectedCategory === 'All'
      ? PORTFOLIO_DATA.projects
      : PORTFOLIO_DATA.projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider">
          <Layers className="h-3.5 w-3.5" />
          <span>Proven Production Systems</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Featured Projects & <br />
          <span className="text-gradient-cyan">Flagship Case Studies</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
          Real production mobile platforms serving hundreds of thousands of users across Google Play & Apple App Store.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
              selectedCategory === cat
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] font-bold'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-cyan-500/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            id={`project-${project.id}`}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group rounded-3xl bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/40 backdrop-blur-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
          >
            {/* Screenshot Header */}
            <div
              onClick={() => setActiveModalProject(project)}
              className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden cursor-pointer"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

              {/* Badges on Screenshot */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-purple-950/80 backdrop-blur-md text-purple-300 border border-purple-500/30 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Flagship
                  </span>
                )}
              </div>

              {/* Metrics pill */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-slate-950/90 border border-slate-800 text-[11px] font-mono text-cyan-400">
                  {project.metrics[0].label}: <strong className="text-white">{project.metrics[0].value}</strong>
                </div>
              )}
            </div>

            {/* Card Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3
                  onClick={() => setActiveModalProject(project)}
                  className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  {project.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-400">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 border-t border-slate-900 flex items-center justify-between">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-0.5 transition-all"
                >
                  <span>Case Study & Architecture</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  {project.playStoreUrl && (
                    <a
                      href={project.playStoreUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Google Play Store"
                      className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                    >
                      <Play className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {project.appStoreUrl && (
                    <a
                      href={project.appStoreUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Apple App Store"
                      className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-blue-500/40 transition-all"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Deep Dive Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
