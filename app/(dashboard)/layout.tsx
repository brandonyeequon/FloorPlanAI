'use client';

import Link from 'next/link';
import { LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';

function Header() {
  return (
    <header className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-gray-200/50 shadow-sm px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <LayoutGrid className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-xl font-semibold text-gray-900">FloorPlanAI</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Button 
            variant="default" 
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4"
            onClick={() => document.getElementById('demo-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Request a Demo
          </Button>
        </div>
      </div>
    </header>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col min-h-screen paper-texture">
      <Header />
      <div className="pt-24">
        {children}
      </div>
    </section>
  );
}
