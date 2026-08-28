import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'violet' | 'emerald' | 'amber' | 'neutral';
  className?: string;
  dot?: boolean;
}

export function Badge({ children, variant = 'cyan', className, dot = false }: BadgeProps) {
  const variantStyles = {
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    violet: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    neutral: 'bg-slate-800/60 text-slate-300 border-slate-700/50',
  };

  const dotStyles = {
    cyan: 'bg-cyan-400 shadow-[0_0_8px_#06b6d4]',
    violet: 'bg-violet-400 shadow-[0_0_8px_#8b5cf6]',
    emerald: 'bg-emerald-400 shadow-[0_0_8px_#10b981]',
    amber: 'bg-amber-400 shadow-[0_0_8px_#f59e0b]',
    neutral: 'bg-slate-400',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border tracking-wide uppercase',
        variantStyles[variant],
        className
      )}
    >
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full animate-pulse', dotStyles[variant])} />}
      {children}
    </span>
  );
}
