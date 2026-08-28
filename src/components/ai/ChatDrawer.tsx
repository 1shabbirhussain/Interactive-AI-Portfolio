'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, RefreshCw, Layers, ShieldCheck, Zap } from 'lucide-react';
import { MessageBubble, ChatMessage } from './MessageBubble';
import { PORTFOLIO_DATA } from '@/data/portfolio';

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatDrawer({ isOpen, onClose }: ChatDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: `Hello! I am **Shabbir Hussain's AI Digital Representative**.\n\nI can answer any question regarding his **3+ years of production experience**, how he architected **299 apps from 1 codebase at Avialdo**, his **native-to-Flutter enterprise migrations at F-Tech**, technical skills, or hiring availability.\n\nWhat would you like to explore?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const assistantMsgId = `assistant-${Date.now()}`;
    const initialAssistantMsg: ChatMessage = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
    };

    setMessages((prev) => [...prev, initialAssistantMsg]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      if (!res.body) {
        const text = await res.text();
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantMsgId ? { ...m, content: text } : m))
        );
        setIsLoading(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let streamedContent = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        streamedContent += chunk;

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId ? { ...m, content: streamedContent } : m
          )
        );
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsgId
            ? {
                ...m,
                content:
                  "I encountered a momentary connectivity glitch. Shabbir is a **Senior Flutter Engineer with 3+ years experience** who architected 299 apps from 1 codebase at Avialdo Solutions and leads enterprise native-to-Flutter migrations at F-Tech Solution.\n\nYou can reach him directly at **001.shabbirhussain@gmail.com** or WhatsApp **+92-347-8356631**.",
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        role: 'assistant',
        content: `Chat session reset! Ask me anything about Shabbir's production apps, architecture, or skills.`,
      },
    ]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
          />

          {/* Slide-in Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="absolute top-0 right-0 bottom-0 w-full sm:w-[480px] bg-slate-950 border-l border-cyan-500/30 flex flex-col shadow-[-10px_0_50px_rgba(0,0,0,0.8)]"
          >
            {/* Drawer Header */}
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-500 to-purple-600 p-[1px] shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                  <div className="h-full w-full bg-slate-950 rounded-[11px] flex items-center justify-center text-cyan-400">
                    <Bot className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">Shabbir AI Agent</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 font-mono">
                      Groq Llama 3.3
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online • 800+ tok/sec Stream
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleClearChat}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button
                  onClick={onClose}
                  aria-label="Close Chat"
                  className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans">
              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}

              {isLoading && messages[messages.length - 1]?.content === '' && (
                <div className="flex gap-2 items-center text-xs font-mono text-cyan-400 pl-11">
                  <Sparkles className="h-4 w-4 animate-spin" />
                  <span>Synthesizing response from verified portfolio facts...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompt Chips */}
            <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800/80 overflow-x-auto">
              <div className="flex items-center gap-1.5 text-[11px] whitespace-nowrap pb-1">
                <span className="text-slate-400 font-mono text-[10px]">Suggestions:</span>
                {PORTFOLIO_DATA.suggestedQuestions.slice(0, 4).map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSendMessage(q)}
                    disabled={isLoading}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-500/20 text-cyan-300 border border-slate-700 hover:border-cyan-500/40 text-[11px] transition-all shrink-0 font-sans"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-slate-950 border-t border-slate-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Shabbir's 299-app architecture, skills, roles..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-400 focus:outline-none text-white text-xs sm:text-sm placeholder-slate-500 font-sans"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  aria-label="Send message"
                  className="p-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
              <div className="mt-2 text-[10px] font-mono text-center text-slate-400">
                Ground-truth responses based on verified production experience.
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
