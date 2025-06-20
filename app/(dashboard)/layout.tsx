import Link from 'next/link';
import { LayoutGrid } from 'lucide-react';

function Header() {
  return (
    <header className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-gray-200/50 shadow-sm px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <LayoutGrid className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-xl font-semibold text-gray-900">FloorPlanAI</span>
        </Link>
        <div className="flex items-center space-x-4">
          {/* Auth removed for frontend-only mode */}
        </div>
      </div>
    </header>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      <div className="pt-28">
        {children}
      </div>
    </section>
  );
}
