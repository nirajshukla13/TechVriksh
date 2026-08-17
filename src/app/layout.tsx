import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import { SiteHeader } from '@/components/site-header';
import { ScrollScene } from '@/components/3d/ScrollScene';
import { LenisProvider } from '@/components/providers/LenisProvider';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Footer } from '@/components/ui/Footer';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk'
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono'
});

export const metadata: Metadata = {
  title: 'Tech Vriksh — Real. Relevant. Rooted.',
  description: 'A student-driven technology community connecting people, ideas and opportunities across India.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${jetBrainsMono.variable} tv-shell`}>
        <LenisProvider>
          <ScrollScene />
          <CustomCursor />
          <SiteHeader />
          <div className="tv-content-layer">{children}</div>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
