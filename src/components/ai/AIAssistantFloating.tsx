'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles } from 'lucide-react';

export function AIAssistantFloating({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <motion.button
        onClick={onOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-950/90 border border-cyan-500/50 backdrop-blur-xl shadow-[0_0_30px_rgba(6,182,212,0.35)] hover:shadow-[0_0_45px_rgba(6,182,212,0.6)] hover:border-cyan-400 transition-all duration-300 cursor-pointer"
      >
        {/* Ambient Pulsing Aura */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 opacity-40 blur-md group-hover:opacity-75 transition-opacity" />

        {/* Inner Content */}
        <div className="relative flex items-center gap-2 text-cyan-300 group-hover:text-white">
          <div className="h-7 w-7 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Bot className="h-4 w-4 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold font-mono flex items-center gap-1">
              Ask AI Assistant
              <Sparkles className="h-3 w-3 text-cyan-400 animate-pulse" />
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Groq Llama 3.3 Powered
            </div>
          </div>
        </div>
      </motion.button>
    </div>
  );
}
