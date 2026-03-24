'use client';

import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-navy-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-navy-800 rounded-lg flex items-center justify-center group-hover:bg-navy-700 transition-colors">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-navy-900 tracking-tight">
            Tenant<span className="text-trust-green">Shield</span>
          </span>
        </Link>

        <nav className="hidden sm:flex items-center gap-6">
          <Link href="/#how-it-works" className="text-sm text-gray-600 hover:text-navy-800 transition-colors">
            How It Works
          </Link>
          <Link href="/blog" className="text-sm text-gray-600 hover:text-navy-800 transition-colors">
            Blog
          </Link>
          <Link href="/#faq" className="text-sm text-gray-600 hover:text-navy-800 transition-colors">
            FAQ
          </Link>
          <Link
            href="/wizard"
            className="bg-navy-800 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-navy-700 transition-colors"
          >
            Generate Letter
          </Link>
        </nav>

        {/* Mobile CTA */}
        <Link
          href="/wizard"
          className="sm:hidden bg-navy-800 text-white text-sm font-medium px-3 py-2 rounded-lg"
        >
          Start
        </Link>
      </div>
    </header>
  );
}
