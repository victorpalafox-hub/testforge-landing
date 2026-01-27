'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { brandConfig } from '@/lib/config';

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Badge Marquee - Sutil (Cobalt style) */}
      <div className="bg-slate-900/80 border-b border-white/10 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap py-2 text-center">
          <span className="inline-block px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">
            ✨ 3 pruebas gratis • Acceso anticipado disponible • 3 pruebas gratis
          </span>
          <span className="inline-block px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">
            ✨ 3 pruebas gratis • Acceso anticipado disponible • 3 pruebas gratis
          </span>
          <span className="inline-block px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">
            ✨ 3 pruebas gratis • Acceso anticipado disponible • 3 pruebas gratis
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={cn(
          'transition-all duration-300',
          isScrolled
            ? 'bg-slate-950/95 backdrop-blur-xl shadow-xl border-b border-white/10'
            : 'bg-transparent'
        )}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Gradient blue→cyan profesional */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative text-2xl font-bold bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-500 bg-clip-text text-transparent">
                  {brandConfig.site.name}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - slate-300 hover:cyan-500 */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="#datasets"
                className="text-slate-300 hover:text-cyan-500 transition-colors text-sm font-medium"
              >
                Datasets
              </Link>
              <Link
                href="#generator"
                className="text-slate-300 hover:text-cyan-500 transition-colors text-sm font-medium"
              >
                Generador AI
              </Link>
              <Link
                href="#pricing"
                className="text-slate-300 hover:text-cyan-500 transition-colors text-sm font-medium"
              >
                Precios
              </Link>
              <Link
                href="#faq"
                className="text-slate-300 hover:text-cyan-500 transition-colors text-sm font-medium"
              >
                FAQ
              </Link>
            </div>

            {/* CTA Button - Coral suave */}
            <div className="flex items-center gap-4">
              <button className="bg-[#FF8C73] hover:bg-[#FF6B6B] text-white font-semibold px-6 py-2.5 rounded-lg shadow-lg shadow-[#FF8C73]/25 hover:shadow-[#FF6B6B]/30 transition-all duration-300 hover:scale-105">
                Empezar Gratis
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
