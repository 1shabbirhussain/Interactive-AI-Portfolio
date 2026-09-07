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

    // 1. Try Groq Primary (Ultra-fast streaming)
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
          model: 'gemini-3.6-flash',
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

    // 3. Fallback Local Knowledge Response (Multi-Intent Semantic Matcher)
    const lastUserMessage = messages.filter((m: { role: string }) => m.role === 'user').pop()?.content.toLowerCase() || '';
    let fallbackAnswer = `Shabbir Hussain is a **Senior Full-Stack & Cross-Platform Engineer and Systems Architect** with 3+ years of production experience.\n\nHe architected Linked Union—a white-label platform powering **299 production apps from 1 unified codebase** at Avialdo Solutions—and leads enterprise native-to-Flutter migrations at F-Tech Solution. Beyond mobile, he builds complete **Full-Stack Web Applications, Desktop Software, and Applied AI Systems** for clients worldwide.\n\nFeel free to explore his featured projects or reach out directly at **001.shabbirhussain@gmail.com** / WhatsApp **+92-347-8356631**.`;

    if (
      lastUserMessage.includes('web') ||
      lastUserMessage.includes('webapp') ||
      lastUserMessage.includes('full stack') ||
      lastUserMessage.includes('fullstack') ||
      lastUserMessage.includes('react') ||
      lastUserMessage.includes('next') ||
      lastUserMessage.includes('website') ||
      lastUserMessage.includes('saas')
    ) {
      fallbackAnswer = `### Yes, Absolutely! Full-Stack Web Development:

While Shabbir is widely renowned for his mobile architecture, he is a versatile **Full-Stack Engineer** who builds complete, high-performance web applications and SaaS platforms.

- **Frontend:** React, Next.js (App Router, SSR/SSG), TypeScript, Tailwind CSS, Flutter Web.
- **Backend & APIs:** Node.js, Python / FastAPI, REST APIs, GraphQL, WebSockets.
- **Databases & Cloud:** Firebase, Supabase, PostgreSQL, Cloud Run, Serverless.

Whether you need a consumer web app, an enterprise dashboard, or an end-to-end custom platform, Shabbir can architect and ship the entire system with you.

**Start your project:**
- WhatsApp: [+92-347-8356631](https://wa.me/923478356631)
- Email: [001.shabbirhussain@gmail.com](mailto:001.shabbirhussain@gmail.com)`;
    } else if (
      lastUserMessage.includes('desktop') ||
      lastUserMessage.includes('windows') ||
      lastUserMessage.includes('mac') ||
      lastUserMessage.includes('linux')
    ) {
      fallbackAnswer = `### Cross-Platform Desktop Applications:

Yes! Shabbir builds cross-platform desktop applications for **Windows, macOS, and Linux** using **Flutter Desktop** and modern tooling.

This architecture enables:
- **Unified Codebase:** Shared business logic, state models, and backend integrations across Desktop, Web, and Mobile.
- **Native Performance:** Native 60+ FPS rendering, local SQLite/Hive persistence, and deep OS-level window integrations.
- **Faster Time-to-Market:** Deliver synchronized desktop and mobile clients with zero logic duplication.`;
    } else if (
      lastUserMessage.includes('firebase') ||
      lastUserMessage.includes('firestore') ||
      lastUserMessage.includes('database') ||
      lastUserMessage.includes('supabase')
    ) {
      fallbackAnswer = `### Firebase & Cloud Backend Mastery:

Yes, Shabbir is an **expert in Firebase** and cloud backend systems, having scaled them across hundreds of production apps:

1. **Authentication:** Phone OTP, OAuth, multi-tenant security rules.
2. **Cloud Firestore & Realtime DB:** High-concurrency schema design, real-time sync listeners, offline persistence.
3. **Cloud Functions & FCM:** Serverless webhook automations and targeted push notification campaigns via OneSignal & FCM.
4. **Reliability & Telemetry:** Remote Config feature flags and DataDog / Firebase Crashlytics maintaining a 99.9% crash-free rate.
5. **Relational DBs:** Also proficient with Supabase, PostgreSQL, and SQLite.`;
    } else if (
      lastUserMessage.includes('skill') ||
      lastUserMessage.includes('strongest') ||
      lastUserMessage.includes('ai') ||
      lastUserMessage.includes('groq') ||
      lastUserMessage.includes('tech stack')
    ) {
      fallbackAnswer = `### Shabbir's Core Technical Capabilities:

1. **High-Scale Mobile & Cross-Platform Architecture:**
   - Single-codebase white-label multi-flavor engine (299 production apps, 98% code reuse).
   - Event-driven BLoC, Clean Architecture, and Fastlane batch CI/CD release matrix.
   - Native Android (Kotlin / Jetpack Compose) and iOS interop method channels.

2. **Full-Stack Web & Desktop:**
   - React, Next.js, TypeScript, Tailwind CSS, and Flutter Desktop (macOS/Windows/Linux).

3. **Applied Generative AI:**
   - High-throughput streaming LLM inference via Groq API (800+ tok/s) and Google Gemini multimodal reasoning.

4. **Backend & Real-Time Cloud:**
   - Node.js, Python / FastAPI, Firebase Suite, Supabase, WebSockets, and encrypted local storage (Hive/SQLite).`;
    } else if (
      lastUserMessage.includes('299') ||
      lastUserMessage.includes('white-label') ||
      lastUserMessage.includes('whitelabel') ||
      lastUserMessage.includes('linked union')
    ) {
      fallbackAnswer = `### The 299 White-Label Apps Architecture (Linked Union):

At Avialdo Solutions, Shabbir solved the challenge of maintaining hundreds of client apps by architecting a **single multi-flavor Flutter codebase**:

- **Flavor-Based Configuration:** Dynamic runtime injection of branding, endpoints, themes, and feature sets per client without duplicating code.
- **State Pattern:** Reactive event-driven BLoC pattern for rock-solid stability.
- **Fastlane CI/CD Automation:** Automated batch build and store upload matrix, reducing release overhead from weeks to hours.
- **Outcome:** 98% code reuse across 299 distinct client apps and an 85% cut in release overhead.`;
    } else if (
      lastUserMessage.includes('f-tech') ||
      lastUserMessage.includes('avialdo') ||
      lastUserMessage.includes('experience') ||
      lastUserMessage.includes('work') ||
      lastUserMessage.includes('career')
    ) {
      fallbackAnswer = `### Shabbir's Professional Journey:

1. **Senior Software Engineer (Flutter)** @ *F-Tech Solution* (Sep 2025 – Present)
   - Leading native-to-Flutter enterprise migrations with zero-downtime modular rollout.
   - Engineered audio/video streaming & offline caching for Islamic Speeches (50K+ downloads).

2. **Flutter Engineer** @ *Avialdo Solutions* (Jun 2024 – Sep 2025)
   - Architected 299 white-label labor union apps from 1 Flutter codebase with BLoC & Fastlane CI/CD.

3. **Associate Flutter Developer** @ *Centillion* (Jan 2023 – Mar 2024)
   - Shipped client-facing apps with Stripe, Google Maps, and Firebase Auth.`;
    } else if (
      lastUserMessage.includes('build') ||
      lastUserMessage.includes('create') ||
      lastUserMessage.includes('system') ||
      lastUserMessage.includes('make') ||
      lastUserMessage.includes('project')
    ) {
      fallbackAnswer = `### Building Your System With Shabbir:

If you have come with an idea, business problem, or technical requirement, **Shabbir can design, architect, and ship that complete system with you**.

He covers the full software lifecycle:
- Product UI/UX & Responsive Frontend (Mobile, Web, or Desktop)
- Robust Backend APIs, Microservices & Cloud Databases
- Authentication, Payment Gateways & Third-Party Integrations
- Automated CI/CD, App Store & Web Deployment

**Let's discuss your project scope:**
- WhatsApp: [+92-347-8356631](https://wa.me/923478356631)
- Email: [001.shabbirhussain@gmail.com](mailto:001.shabbirhussain@gmail.com)`;
    } else if (
      lastUserMessage.includes('contact') ||
      lastUserMessage.includes('email') ||
      lastUserMessage.includes('hire') ||
      lastUserMessage.includes('available') ||
      lastUserMessage.includes('interview') ||
      lastUserMessage.includes('phone') ||
      lastUserMessage.includes('whatsapp')
    ) {
      fallbackAnswer = `### Contact & Availability:

- **Status:** Available for Senior Full-Stack & Mobile Roles (Remote & Global Relocation) and End-to-End Product Contracts.
- **Email:** [001.shabbirhussain@gmail.com](mailto:001.shabbirhussain@gmail.com)
- **WhatsApp / Phone:** [+92-347-8356631](https://wa.me/923478356631)
- **LinkedIn:** [linkedin.com/in/shabbir-hussain-445338228](https://www.linkedin.com/in/shabbir-hussain-445338228)
- **GitHub:** [github.com/1shabbirhussain](https://github.com/1shabbirhussain)`;
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
