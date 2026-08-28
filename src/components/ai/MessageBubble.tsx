'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, User, Copy, Check, Sparkles } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
}

export function MessageBubble({ message }: { message: ChatMessage }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = async () => {
    await copyToClipboard(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'} group`}>
      {/* Bot Avatar */}
      {!isUser && (
        <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-purple-600 p-[1px] shrink-0 mt-0.5 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
          <div className="h-full w-full bg-slate-950 rounded-[11px] flex items-center justify-center text-cyan-400">
            <Bot className="h-4 w-4" />
          </div>
        </div>
      )}

      {/* Bubble Container */}
      <div
        className={`relative max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed transition-all ${
          isUser
            ? 'bg-cyan-500 text-slate-950 font-medium rounded-br-none shadow-[0_0_20px_rgba(6,182,212,0.25)]'
            : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-bl-none shadow-md'
        }`}
      >
        {!isUser ? (
          <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800 prose-a:text-cyan-400 hover:prose-a:text-cyan-300">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        ) : (
          <div className="whitespace-pre-wrap">{message.content}</div>
        )}

        {/* Copy button for Assistant messages */}
        {!isUser && message.content && (
          <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span className="flex items-center gap-1 text-cyan-400">
              <Sparkles className="h-3 w-3" />
              Verified Portfolio AI
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 hover:text-cyan-300 transition-colors p-0.5 rounded"
              aria-label="Copy message text"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="h-8 w-8 rounded-xl bg-slate-800 border border-slate-700 shrink-0 mt-0.5 flex items-center justify-center text-slate-300">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  );
}
