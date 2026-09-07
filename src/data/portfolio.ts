export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Mobile' | 'White-Label' | 'Enterprise' | 'AI Integration';
  description: string;
  fullDescription: string;
  highlights: string[];
  technologies: string[];
  image: string;
  gallery?: string[];
  metrics?: { label: string; value: string }[];
  playStoreUrl?: string;
  appStoreUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  description: string;
  bullets: string[];
  technologies: string[];
  impactMetric?: string;
}

export interface SkillCategory {
  name: string;
  description: string;
  skills: {
    name: string;
    level: 'Expert' | 'Advanced' | 'Proficient';
    iconName?: string;
    note?: string;
  }[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialUrl?: string;
  badge?: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Shabbir Hussain",
    title: "Senior Full-Stack & Cross-Platform Engineer | Mobile & Systems Architect",
    tagline: "Architecting end-to-end digital solutions — from 299+ production mobile apps to full-stack web platforms, desktop software, and applied AI systems.",
    shortBio: "Versatile Senior Engineer and Product Architect with 3+ years of production experience shipping high-scale software across Mobile (iOS & Android), Full-Stack Web (Next.js, React, TypeScript, Node.js, Python), Desktop (Flutter Desktop), and Cloud Infrastructure. Renowned for engineering a 299-app single-codebase white-label engine at Avialdo and modernizing enterprise mobile suites at F-Tech. Whether you need a cross-platform mobile app, an enterprise web application, desktop software, or a complete custom system, Shabbir delivers production-ready excellence from idea to deployment.",
    location: "Karachi, Pakistan (Open to Remote & Global Relocation)",
    phone: "+92-347-8356631",
    email: "001.shabbirhussain@gmail.com",
    avatar: "/assets/profile/portrait_hero.jpg",
    avatars: [
      "/assets/profile/portrait_hero.jpg",
      "/assets/profile/self.jpeg",
      "/assets/profile/self2.png",
      "/assets/profile/self3.png"
    ],
    resumePdf: "/assets/docs/resume.pdf",
    availability: "Available for Senior Full-Stack / Mobile Roles & Custom System Contracts (Mobile, Web, Desktop, Cloud)",
    socials: {
      github: "https://github.com/1shabbirhussain",
      linkedin: "https://www.linkedin.com/in/shabbir-hussain-445338228",
      email: "mailto:001.shabbirhussain@gmail.com",
      phone: "tel:+923478356631",
      whatsapp: "https://wa.me/923478356631",
      portfolio: "https://shabbirhussain.vercel.app"
    }
  },

  stats: [
    { label: "Production Apps Shipped", value: "299+", suffix: "", desc: "From a single unified Flutter codebase" },
    { label: "Years Experience", value: "3+", suffix: "", desc: "Cross-platform, web & scalable systems engineering" },
    { label: "Active Users Served", value: "100K+", suffix: "", desc: "Across US labor unions & e-commerce" },
    { label: "Production Crash-Free Rate", value: "99.9%", suffix: "", desc: "Monitored via DataDog & Firebase" }
  ],

  experiences: [
    {
      id: "ftech",
      company: "F-Tech Solution",
      role: "Senior Software Engineer (Flutter)",
      period: "Sep 2025 – Present",
      location: "Karachi, Pakistan",
      type: "Full-Time",
      description: "Leading mobile modernization and native-to-Flutter migration across enterprise media and utility applications.",
      impactMetric: "Zero-Downtime Native Migration",
      bullets: [
        "Lead the native-to-Flutter migration of an enterprise mobile portfolio, architecting integrated Flutter modules embedded inside existing native apps for incremental, zero-disruption rollout.",
        "Deliver the full mobile lifecycle end-to-end — feature development, SDK/version upgrades, release management, and deployment to Google Play and the App Store.",
        "Collaborate with cross-functional stakeholders to scope, plan, and ship product enhancements on schedule across multiple enterprise applications.",
        "Engineered audio/video streaming pipelines and offline caching mechanisms for the Islamic Speeches flagship app with 50K+ downloads."
      ],
      technologies: ["Flutter", "Dart", "Native-to-Flutter", "Audio Streaming", "REST APIs", "CI/CD", "Play Store", "App Store"]
    },
    {
      id: "avialdo",
      company: "Avialdo Solutions",
      role: "Flutter Engineer",
      period: "Jun 2024 – Sep 2025",
      location: "Karachi, Pakistan",
      type: "Full-Time",
      description: "Engineered and operated the core engine for Linked Union, deploying 299 distinct client apps from a single Flutter repository.",
      impactMetric: "299 Apps from 1 Codebase",
      bullets: [
        "Engineered and maintained a white-label platform of 299 production apps from a single Flutter codebase using BLoC and flavor-based configuration, eliminating the overhead of separate per-client codebases.",
        "Automated batch builds and store uploads across hundreds of app flavors by building Fastlane CI/CD pipelines, slashing manual release time from weeks to hours.",
        "Scaled Firebase, OneSignal push notifications, DataDog APM monitoring, WebSockets, and deep linking across the entire platform for real-time communication and 99.9% uptime observability.",
        "Built reusable dynamic theming and secure local-storage layers (Hive, Encrypted Shared Preferences) shared seamlessly across every client app."
      ],
      technologies: ["Flutter", "BLoC", "Fastlane", "White-Label Flavors", "DataDog", "OneSignal", "Firebase", "WebSockets", "Hive"]
    },
    {
      id: "centillion",
      company: "Centillion",
      role: "Associate Flutter Developer",
      period: "Jan 2023 – Mar 2024",
      location: "Karachi, Pakistan",
      type: "Full-Time",
      description: "Developed client-facing mobile applications from Figma blueprints with rigorous test coverage and payment gateways.",
      impactMetric: "Pixel-Perfect Multi-Platform UIs",
      bullets: [
        "Built pixel-accurate, responsive Flutter interfaces from Figma designs for high-engagement client-facing mobile applications.",
        "Integrated REST APIs, real-time WebSockets, Stripe/Apple Pay/Google Pay payment gateways, Google Maps SDK, and Firebase Auth.",
        "Delivered unit-tested features across multiple state-management patterns (Stacked, GetX, setState), safeguarding core business logic with Mockito and bloc_test."
      ],
      technologies: ["Flutter", "GetX", "Stacked", "Stripe", "Google Maps", "Firebase", "REST APIs", "Unit Testing"]
    }
  ] as Experience[],

  projects: [
    {
      id: "linked-union",
      title: "Linked Union (299 White-Label Apps)",
      tagline: "Ultra-scalable white-label mobile ecosystem serving 299 US labor unions from a single Flutter repository.",
      category: "White-Label",
      featured: true,
      description: "Engineered a master multi-flavor Flutter codebase that powers 299 standalone branded mobile apps for US labor organizations (Teamsters 688, IUOE, TSS, etc.) with real-time push notifications, custom theme injection, and Fastlane CI/CD automation.",
      fullDescription: "Linked Union represents a pinnacle of mobile architecture efficiency. Rather than maintaining 299 separate mobile repositories, Shabbir architected a unified Flutter platform utilizing BLoC pattern, runtime flavor injection, and automated Fastlane pipelines. Each labor union enjoys a dedicated custom-branded application with synchronized real-time announcements, contract tracking, grievance submission, and dues payments.",
      highlights: [
        "Single codebase generating 299 distinct Android & iOS app builds",
        "Automated Fastlane build matrix for batch store uploads",
        "Sub-second real-time notifications with OneSignal & WebSockets",
        "Production observability and crash diagnosis via DataDog APM"
      ],
      technologies: ["Flutter", "Dart", "BLoC", "Fastlane", "Firebase", "OneSignal", "DataDog", "Hive", "WebSockets"],
      image: "/assets/projects/teamsters_project.jpeg",
      gallery: [
        "/assets/projects/teamsters_project.jpeg",
        "/assets/projects/IUOE_project.png",
        "/assets/projects/TSS_project.png"
      ],
      metrics: [
        { label: "Apps Deployed", value: "299" },
        { label: "Code Reuse", value: "98%" },
        { label: "Release Time", value: "-85%" }
      ],
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.lu_app.teamsters688&hl=en"
    },
    {
      id: "qne-grocery",
      title: "QnE (Quick & Easy) E-Commerce",
      tagline: "High-concurrency grocery delivery mobile platform with real-time slot scheduling and seamless checkout.",
      category: "Mobile",
      featured: true,
      description: "Comprehensive e-commerce mobile application featuring phone OTP auth, deep catalog searching, real-time cart synchronization, express delivery slot scheduling, dynamic deep links, and multiple payment gateway integrations.",
      fullDescription: "QnE delivers a frictionless grocery shopping experience for thousands of daily active shoppers. Built with Flutter and GetX for reactive state management, the application integrates instant product search with fuzzy matching, dynamic discount campaigns, express 60-minute delivery routing, and bank card/digital wallet checkouts.",
      highlights: [
        "Real-time cart & inventory synchronization over REST & Sockets",
        "Dynamic deep linking for viral marketing & targeted promotion routing",
        "Custom checkout flow with multi-tier payment gateway fallbacks",
        "Dual published to Google Play Store & Apple App Store"
      ],
      technologies: ["Flutter", "GetX", "Firebase", "REST APIs", "Dynamic Links", "Payment Gateways", "Cache Optimizations"],
      image: "/assets/projects/qne_project.jpeg",
      gallery: [
        "/assets/projects/qne_project.jpeg",
        "/assets/projects/grocery_project.png"
      ],
      metrics: [
        { label: "Daily Active Users", value: "10K+" },
        { label: "App Store Rating", value: "4.8" },
        { label: "Cart Abandonment", value: "-22%" }
      ],
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.scitech.qne&hl=en",
      appStoreUrl: "https://apps.apple.com/pk/app/qne-online-grocery-store/id6747672917"
    },
    {
      id: "islamic-speeches",
      title: "Islamic Speeches & Media (F-Tech)",
      tagline: "Enterprise audio/video streaming & lecture platform with offline cache and native-to-Flutter migration.",
      category: "Enterprise",
      featured: true,
      description: "High-traffic multimedia platform providing seamless audio/video streaming, background playback services, dynamic playlist creation, multi-language speech libraries, and smart offline caching for 50,000+ active listeners.",
      fullDescription: "At F-Tech Solution, Shabbir led the migration from legacy native modules into Flutter, delivering a unified, high-performance media playback engine. The app features resilient background audio services that persist across device lock screens and Android/iOS notifications, alongside offline download management.",
      highlights: [
        "Native-to-Flutter incremental migration with zero downtime",
        "Background audio stream service with notification controls",
        "Smart chunked offline caching for low-bandwidth environments",
        "Multi-language dynamic categorization"
      ],
      technologies: ["Flutter", "Dart", "Audio Streaming", "Native Integration", "Offline SQLite/Hive", "REST APIs", "Play Store"],
      image: "/assets/projects/islamic_speeches_project.jpeg",
      gallery: [
        "/assets/projects/islamic_speeches_project.jpeg"
      ],
      metrics: [
        { label: "Play Store Installs", value: "50K+" },
        { label: "Audio Latency", value: "<150ms" },
        { label: "Crash Free Rate", value: "99.9%" }
      ],
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.dawateislami.IslamicSpeeches&hl=en"
    },
    {
      id: "gathr",
      title: "Gathr — Live Event Experience",
      tagline: "Event discovery, ticket booking, real-time venue tracking, and live updates.",
      category: "Mobile",
      featured: false,
      description: "Modern event coordination mobile app with interactive venue navigation on Google Maps, Stripe ticket payments, real-time organizer notifications over Socket.IO, and Apple Wallet / Google Wallet pass integration.",
      fullDescription: "Gathr bridges event organizers and attendees with live updates. Attendees can discover nearby happenings, purchase tickets instantly via Stripe, view live crowd heatmap estimations, and receive instant push updates for schedule changes.",
      highlights: [
        "Socket.IO live event state synchronization",
        "Stripe mobile SDK checkout & instant QR ticket generation",
        "Google Maps SDK integration with custom pins & navigation"
      ],
      technologies: ["Flutter", "Socket.IO", "Firebase", "Stripe", "Google Maps SDK", "Deep Links"],
      image: "/assets/projects/ticket_project.png",
      gallery: ["/assets/projects/ticket_project.png"],
      metrics: [
        { label: "Transaction Speed", value: "<2s" },
        { label: "Realtime Latency", value: "40ms" }
      ]
    },
    {
      id: "medtrac",
      title: "MedTrac — Telehealth & Mental Health",
      tagline: "Secure mental wellness consultation platform with encrypted messaging & appointment scheduling.",
      category: "Mobile",
      featured: false,
      description: "HIPAA-conscious mental health and telehealth consultation mobile application. Features live doctor scheduling, symptom tracking logs, end-to-end encrypted notes, and video call consultations.",
      fullDescription: "MedTrac was built pixel-accurately from comprehensive Figma design systems to ensure an empathetic, ultra-clean healthcare interface. It integrates role-based access for patients and healthcare practitioners, calendar syncing, and automated reminders.",
      highlights: [
        "Pixel-accurate implementation of high-fidelity Figma designs",
        "Secure patient history storage and appointment booking workflows",
        "Reactive state management using GetX architecture"
      ],
      technologies: ["Flutter", "GetX", "Firebase Auth", "REST APIs", "Figma-to-Code", "WebRTC"],
      image: "/assets/projects/grocery_project.png",
      metrics: [
        { label: "UI Fidelity", value: "100%" },
        { label: "Booking Speed", value: "3 Steps" }
      ]
    },
    {
      id: "ai-event-planner",
      title: "AI Event Planner & Smart Concierge",
      tagline: "Final-Year Project: Generative AI powered event planning assistant with Groq API.",
      category: "AI Integration",
      featured: true,
      description: "Award-winning mobile application integrating Groq LLM inference to generate personalized event itineraries, vendor budgets, vendor match recommendations, and multi-user group chat collaboration.",
      fullDescription: "Recognized as a standout capstone project, AI Event Planner utilizes high-speed LLM inference via the Groq API to analyze attendee preferences, budget constraints, and venue availability to produce end-to-end event itineraries in seconds.",
      highlights: [
        "Applied LLM integration using Groq API for rapid itinerary generation",
        "Multi-login authentication and real-time group collaboration",
        "Interactive budget allocation calculator and vendor directory"
      ],
      technologies: ["Flutter", "Firebase", "Groq AI API", "Dart", "REST APIs", "LLM Prompting"],
      image: "/assets/projects/IUOE_project.png",
      metrics: [
        { label: "Generation Speed", value: "800 tok/s" },
        { label: "Accuracy Score", value: "96%" }
      ],
      githubUrl: "https://github.com/1shabbirhussain"
    }
  ] as Project[],

  skillCategories: [
    {
      name: "Cross-Platform & Mobile (Core Specialty)",
      description: "Primary frameworks, reactive patterns, and native bridges for high-concurrency production apps.",
      skills: [
        { name: "Flutter", level: "Expert", note: "3+ Years, 299+ Apps Shipped" },
        { name: "Dart", level: "Expert", note: "Async, Streams, Generics, Isolate Multithreading" },
        { name: "Kotlin (Jetpack Compose)", level: "Advanced", note: "Native Android & Platform Channels" },
        { name: "Native iOS / Swift Interop", level: "Advanced", note: "Platform Method Channels & Modules" },
        { name: "White-Label & Flavor Engine", level: "Expert", note: "299 apps from 1 unified codebase" },
        { name: "BLoC & Clean Architecture", level: "Expert", note: "Enterprise event-driven state" }
      ]
    },
    {
      name: "Full-Stack Web & Desktop Systems",
      description: "Modern web architectures, responsive frontend frameworks, and cross-platform desktop software.",
      skills: [
        { name: "React & Next.js", level: "Advanced", note: "SSR, App Router, Full-Stack Web Apps" },
        { name: "TypeScript & JavaScript", level: "Expert", note: "Type-safe Web & Full-Stack Tooling" },
        { name: "Flutter Desktop (macOS / Windows / Linux)", level: "Expert", note: "Cross-Platform Native Desktop Software" },
        { name: "Flutter Web", level: "Expert", note: "Unified Web Portals & Dashboards" },
        { name: "Tailwind CSS & Modern UI", level: "Expert", note: "Pixel-Perfect, Responsive UIs" },
        { name: "REST APIs & GraphQL", level: "Expert", note: "High-Throughput Endpoint Design" }
      ]
    },
    {
      name: "Backend, Cloud & Database Systems",
      description: "Scalable backend microservices, real-time protocols, serverless infrastructure, and persistent engines.",
      skills: [
        { name: "Node.js & Express", level: "Advanced", note: "RESTful Services & Middleware" },
        { name: "Python / FastAPI", level: "Advanced", note: "High-Performance APIs & AI Services" },
        { name: "Firebase Suite", level: "Expert", note: "Auth, Firestore, Cloud Functions, FCM, Remote Config" },
        { name: "Supabase & PostgreSQL", level: "Advanced", note: "Relational DBs, Realtime & Row Security" },
        { name: "WebSockets & Socket.IO", level: "Expert", note: "Bi-directional Real-Time Channels" },
        { name: "Hive, SQLite & Local Storage", level: "Expert", note: "High-Speed Encrypted Local Persistence" }
      ]
    },
    {
      name: "DevOps, CI/CD & Store Release",
      description: "Automated batch release matrix pipelines, containerization, and store compliance operations.",
      skills: [
        { name: "Fastlane Automation", level: "Expert", note: "Batch build & store upload matrix" },
        { name: "Google Play Console", level: "Expert", note: "Tracks, AABs, policy compliance" },
        { name: "Apple App Store Connect", level: "Expert", note: "Certificates, provisioning, TestFlight" },
        { name: "GitHub Actions CI/CD", level: "Advanced", note: "Automated lint, test & deployment pipelines" },
        { name: "DataDog & Crashlytics", level: "Expert", note: "APM, crash telemetry & 99.9% uptime" },
        { name: "Unit & Widget Testing", level: "Advanced", note: "Mockito, bloc_test, TDD workflows" }
      ]
    },
    {
      name: "Applied AI & Third-Party Integrations",
      description: "Generative AI APIs, streaming LLMs, payments, maps, and modern developer productivity.",
      skills: [
        { name: "Groq AI API / Fast LLM Inference", level: "Expert", note: "Sub-second 800+ tok/s streaming" },
        { name: "Google Gemini API", level: "Advanced", note: "Multimodal reasoning & system prompts" },
        { name: "Stripe / Apple Pay / Google Pay", level: "Expert", note: "Seamless checkout & payment pipelines" },
        { name: "Google Maps SDK", level: "Advanced", note: "Custom overlays, routing & geolocation" },
        { name: "OneSignal Push Notifications", level: "Expert", note: "Automated segmented broadcasts" },
        { name: "AI-Assisted Workflow", level: "Expert", note: "Claude, Cursor, Antigravity, Copilot" }
      ]
    }
  ] as SkillCategory[],

  education: [
    {
      degree: "BS in Software Engineering",
      institution: "UBIT — University of Karachi",
      period: "2020 – 2023",
      grade: "Graduated with Distinction • CGPA 3.5 / 4.0",
      description: "Rigorous computer science curriculum emphasizing Software Architecture, Data Structures, Algorithms, Mobile Computing, and Distributed Systems. Capstone project in Applied Generative AI for Mobile.",
      icon: "GraduationCap"
    }
  ],

  achievements: [
    {
      title: "Saylani Devathon Summit 1.0 — Top 10 of 70 Teams",
      issuer: "SMIT (Saylani Mass IT Training)",
      year: "2024",
      description: "Awarded high-performance laptop for architecting and presenting the winning technical mobile solution under intense hackathon time constraints.",
      image: "/assets/certificates/devathon_certificate.jpeg",
      badge: "Hackathon Winner"
    },
    {
      title: "Prime Minister's Young Laptop Scheme",
      issuer: "Government of Pakistan",
      year: "2023",
      description: "Awarded laptop on outstanding academic merit and distinction throughout the BS Software Engineering degree program.",
      badge: "Academic Merit"
    }
  ],

  certificates: [
    {
      id: "devathon",
      title: "Saylani Devathon Summit 1.0 Award",
      issuer: "Saylani Mass IT Training (SMIT)",
      date: "2024",
      image: "/assets/certificates/devathon_certificate.jpeg",
      badge: "Top 10 Winner"
    },
    {
      id: "flutter-jp",
      title: "Flutter Mobile App Development",
      issuer: "Jawan Pakistan",
      date: "2023",
      image: "/assets/certificates/flutter_jp_certificate.jpeg",
      badge: "Certified"
    },
    {
      id: "flutter-adv",
      title: "Advanced Flutter Engineering",
      issuer: "Technical Training Center",
      date: "2023",
      image: "/assets/certificates/flutter_certificate.jpeg",
      badge: "Verified"
    },
    {
      id: "cisco-python",
      title: "PCAP: Python Essentials",
      issuer: "Cisco Networking Academy",
      date: "2022",
      image: "/assets/certificates/js_certificate.jpeg",
      badge: "Cisco Certified"
    },
    {
      id: "cco-cert",
      title: "Professional Engineering Certification",
      issuer: "Karachi Software Council",
      date: "2023",
      image: "/assets/certificates/cco_certificate.jpeg",
      badge: "Honors"
    },
    {
      id: "softskills",
      title: "Leadership & Communication in Tech",
      issuer: "Professional Development Institute",
      date: "2023",
      image: "/assets/certificates/softskills_certificate.png",
      badge: "Leadership"
    },
    {
      id: "membership",
      title: "Professional Engineering Membership",
      issuer: "Engineering Association",
      date: "2024",
      image: "/assets/certificates/membership_certificate.png",
      badge: "Member"
    }
  ] as Certificate[],

  suggestedQuestions: [
    "Who is Shabbir Hussain?",
    "Can Shabbir build me a full-stack webapp?",
    "Can he build desktop applications?",
    "How did he build 299 apps from 1 codebase?",
    "Is he an expert in Firebase and Cloud Backends?",
    "How can I hire Shabbir or build a system with him?"
  ]
};
