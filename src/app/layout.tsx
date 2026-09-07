import type { Metadata } from 'next';
import './globals.css';
import { PORTFOLIO_DATA } from '@/data/portfolio';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://shabbirhussain.vercel.app'),
  title: `${PORTFOLIO_DATA.personal.name} | Senior Full-Stack & Cross-Platform Engineer`,
  description: `${PORTFOLIO_DATA.personal.tagline} Shipped 299+ production apps from 1 codebase at Avialdo Solutions, leading enterprise native migrations at F-Tech Solution, and engineering complete systems across Web, Mobile, Desktop, and Cloud.`,
  keywords: [
    'Shabbir Hussain',
    'Senior Full-Stack Engineer',
    'Senior Flutter Engineer',
    'Cross-Platform Mobile Developer',
    'Web Application Developer',
    'Next.js React TypeScript',
    'Flutter Desktop Developer',
    'White-Label Apps Flutter',
    'Native to Flutter Migration',
    'Fastlane CI/CD Flutter',
    'BLoC Architecture',
    'Firebase Supabase Backend',
    'Groq AI LLM Mobile',
    'Dart',
    'Kotlin',
    'Karachi Pakistan',
  ],
  authors: [{ name: 'Shabbir Hussain', url: 'https://shabbirhussain.vercel.app' }],
  creator: 'Shabbir Hussain',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shabbirhussain.vercel.app',
    title: `${PORTFOLIO_DATA.personal.name} | Senior Full-Stack & Cross-Platform Engineer`,
    description: PORTFOLIO_DATA.personal.tagline,
    siteName: 'Shabbir Hussain Portfolio',
    images: [
      {
        url: '/assets/profile/portrait_hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Shabbir Hussain - Senior Full-Stack & Mobile Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PORTFOLIO_DATA.personal.name} | Senior Full-Stack & Cross-Platform Engineer`,
    description: PORTFOLIO_DATA.personal.tagline,
    images: ['/assets/profile/portrait_hero.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PORTFOLIO_DATA.personal.name,
    jobTitle: PORTFOLIO_DATA.personal.title,
    url: 'https://shabbirhussain.vercel.app',
    image: 'https://shabbirhussain.vercel.app/assets/profile/portrait_hero.jpg',
    sameAs: [
      PORTFOLIO_DATA.personal.socials.github,
      PORTFOLIO_DATA.personal.socials.linkedin,
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Karachi',
      addressCountry: 'Pakistan',
    },
    knowsAbout: [
      'Full-Stack Web Development',
      'React & Next.js',
      'Flutter & Dart',
      'Flutter Desktop',
      'TypeScript & Node.js',
      'Mobile Architecture',
      'BLoC Pattern',
      'Fastlane CI/CD',
      'White-Label Platforms',
      'Firebase & Supabase',
      'Applied Generative AI',
      'Groq LLM API',
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-[#05070D] text-slate-100 min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
