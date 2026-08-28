'use client';

import React, { useState } from 'react';
import { ParticleCanvas } from '@/components/ui/ParticleCanvas';
import { Navbar } from '@/components/layout/Navbar';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { StatsCounter } from '@/components/sections/StatsCounter';
import { InteractiveTerminal } from '@/components/sections/InteractiveTerminal';
import { About } from '@/components/sections/About';
import { SkillsMatrix } from '@/components/sections/SkillsMatrix';
import { ProjectsGallery } from '@/components/sections/ProjectsGallery';
import { ExperienceTimeline } from '@/components/sections/ExperienceTimeline';
import { CertificatesGallery } from '@/components/sections/CertificatesGallery';
import { ContactSection } from '@/components/sections/ContactSection';
import { AIAssistantFloating } from '@/components/ai/AIAssistantFloating';
import { ChatDrawer } from '@/components/ai/ChatDrawer';

export default function Home() {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#05070D] text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Background Interactive Constellation Particles */}
      <ParticleCanvas />

      {/* Navigation Bar */}
      <Navbar
        onOpenAI={() => setIsAIOpen(true)}
        onOpenCommand={() => setIsCommandOpen(true)}
      />

      {/* Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onOpenAI={() => setIsAIOpen(true)}
      />

      {/* Main Page Flow */}
      <main className="relative z-10 space-y-8">
        <Hero onOpenAI={() => setIsAIOpen(true)} />
        <StatsCounter />
        <InteractiveTerminal onOpenAI={() => setIsAIOpen(true)} />
        <About />
        <SkillsMatrix />
        <ProjectsGallery />
        <ExperienceTimeline />
        <CertificatesGallery />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating AI Button & Slide-over Chat Drawer */}
      <AIAssistantFloating onOpen={() => setIsAIOpen(true)} />
      <ChatDrawer isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
    </div>
  );
}
