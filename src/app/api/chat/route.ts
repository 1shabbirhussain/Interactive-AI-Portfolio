import { NextRequest } from 'next/server';
import Groq from 'groq-sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AI_SYSTEM_PROMPT } from '@/data/knowledge';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'Messages array is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const groqKey = process.env.GROQ_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    // 1. Try Groq Primary
    if (groqKey && groqKey !== 'your_groq_api_key_here') {
      try {
        const groq = new Groq({ apiKey: groqKey });
        
        const groqMessages = [
          { role: 'system' as const, content: AI_SYSTEM_PROMPT },
          ...messages.slice(-8).map((m: { role: string; content: string }) => ({
            role: m.role === 'assistant' ? ('assistant' as const) : ('user' as const),
            content: m.content,
          })),
        ];

        const chatCompletion = await groq.chat.completions.create({
          messages: groqMessages,
          model: 'qwen/qwen3.8-27b',
          temperature: 0.3,
          max_tokens: 1024,
          stream: true,
        });

        const encoder = new TextEncoder();
        const customStream = new ReadableStream({
          async start(controller) {
            try {
              for await (const chunk of chatCompletion) {
                const content = chunk.choices[0]?.delta?.content || '';
                if (content) {
                  controller.enqueue(encoder.encode(content));
                }
              }
              controller.close();
            } catch (err) {
              controller.error(err);
            }
          },
        });

        return new Response(customStream, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Transfer-Encoding': 'chunked',
          },
        });
      } catch (groqErr) {
        console.warn('Groq primary failed, attempting fallback...', groqErr);
      }
    }

    // 2. Try Gemini Fallback
    if (geminiKey && geminiKey !== 'your_gemini_api_key_here') {
      try {
        const genAI = new GoogleGenerativeAI(geminiKey);
        const model = genAI.getGenerativeModel({
          model: 'gemini-1.5-flash',
          systemInstruction: AI_SYSTEM_PROMPT,
        });

        const lastUserMessage = messages.filter((m: { role: string }) => m.role === 'user').pop();
        const prompt = lastUserMessage?.content || 'Hello';

        const result = await model.generateContentStream(prompt);
        const encoder = new TextEncoder();

        const customStream = new ReadableStream({
          async start(controller) {
            try {
              for await (const chunk of result.stream) {
                const text = chunk.text();
                if (text) {
                  controller.enqueue(encoder.encode(text));
                }
              }
              controller.close();
            } catch (err) {
              controller.error(err);
            }
          },
        });

        return new Response(customStream, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Transfer-Encoding': 'chunked',
          },
        });
      } catch (geminiErr) {
        console.warn('Gemini failed, falling back to local heuristic response:', geminiErr);
      }
    }

    // 3. Fallback Local Knowledge Response
    const lastUserMessage = messages.filter((m: { role: string }) => m.role === 'user').pop()?.content.toLowerCase() || '';
    let fallbackAnswer = `Hi! I am Shabbir Hussain's AI portfolio representative.\n\nShabbir is a **Senior Flutter Engineer & Mobile Architect** with 3+ years of production experience shipping 299+ applications from a single unified codebase at Avialdo Solutions and leading enterprise native-to-Flutter migrations at F-Tech Solution.\n\nFeel free to explore his featured projects or reach out directly at **001.shabbirhussain@gmail.com** / WhatsApp **+92-347-8356631**.`;

    if (lastUserMessage.includes('experience') || lastUserMessage.includes('f-tech') || lastUserMessage.includes('avialdo') || lastUserMessage.includes('centillion')) {
      fallbackAnswer = `### Shabbir's Professional Experience:\n\n1. **Senior Software Engineer (Flutter)** @ *F-Tech Solution* (Sep 2025 – Present)\n   - Leading native-to-Flutter migration of enterprise mobile portfolio.\n   - High-throughput streaming and offline caching for Islamic Speeches (50K+ downloads).\n\n2. **Flutter Engineer** @ *Avialdo Solutions* (Jun 2024 – Sep 2025)\n   - Architected & maintained 299 white-label labor union mobile apps (Linked Union) from 1 single codebase with BLoC & Fastlane CI/CD.\n\n3. **Associate Flutter Developer** @ *Centillion* (Jan 2023 – Mar 2024)\n   - Shipped pixel-perfect mobile apps with Stripe, Google Maps, and Firebase.`;
    } else if (lastUserMessage.includes('299') || lastUserMessage.includes('white-label') || lastUserMessage.includes('linked union')) {
      fallbackAnswer = `### The 299 White-Label Apps Architecture (Linked Union):\n\nAt Avialdo Solutions, Shabbir solved the immense cost of maintaining 299 separate client repositories by architecting a **single multi-flavor Flutter codebase**:\n\n- **State Pattern**: Reactive BLoC architecture.\n- **CI/CD Automation**: Custom Fastlane build matrix automated batch compilation and store uploads.\n- **Real-Time Layer**: OneSignal push notifications, WebSockets, and DataDog observability.\n- **Result**: 98% code reuse and 85% reduction in release cycle overhead.`;
    } else if (lastUserMessage.includes('contact') || lastUserMessage.includes('email') || lastUserMessage.includes('hire') || lastUserMessage.includes('available')) {
      fallbackAnswer = `### Contact & Availability:\n\n- **Status**: Available for Full-Time Senior Mobile Roles (Remote & Relocation) and High-Impact Freelance Contracts.\n- **Email**: [001.shabbirhussain@gmail.com](mailto:001.shabbirhussain@gmail.com)\n- **WhatsApp / Phone**: [+92-347-8356631](https://wa.me/923478356631)\n- **LinkedIn**: [linkedin.com/in/shabbir-hussain-445338228](https://www.linkedin.com/in/shabbir-hussain-445338228)\n- **GitHub**: [github.com/1shabbirhussain](https://github.com/1shabbirhussain)`;
    }

    return new Response(fallbackAnswer, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
