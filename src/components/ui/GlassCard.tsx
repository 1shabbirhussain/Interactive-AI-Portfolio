'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowColor?: 'cyan' | 'violet' | 'emerald';
  onClick?: () => void;
}

export function GlassCard({
  children,
  className,
  hoverEffect = true,
  glowColor = 'cyan',
  onClick,
}: GlassCardProps) {
  const glowBorder = {
    cyan: 'hover:border-cyan-500/40 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.25)]',
    violet: 'hover:border-violet-500/40 hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.25)]',
    emerald: 'hover:border-emerald-500/40 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.25)]',
  };

  return (
    <motion.div
      onClick={onClick}
      whileHover={hoverEffect ? { y: -3, transition: { duration: 0.2 } } : undefined}
      className={cn(
        'relative rounded-2xl bg-slate-950/70 border border-slate-800/70 backdrop-blur-xl p-6 transition-all duration-300',
        hoverEffect && glowBorder[glowColor],
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
