import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { SWRConfig } from 'swr';

export const metadata: Metadata = {
  title: 'FloorPlanAI - AI-Powered Floor Plan Generator',
  description: 'Create professional floor plans instantly with AI. Just describe your space in natural language and get editable floor plans. Built for contractors and homeowners.'
};

export const viewport: Viewport = {
  maximumScale: 1
};

const manrope = Manrope({ subsets: ['latin'] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`bg-white dark:bg-gray-950 text-black dark:text-white ${manrope.className}`}
    >
      <body className="min-h-[100dvh] bg-gray-50">
        <SWRConfig
          value={{
            fallback: {}
          }}
        >
          {children}
        </SWRConfig>
      </body>
    </html>
  );
}
