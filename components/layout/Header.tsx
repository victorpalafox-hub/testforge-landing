'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
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
      {/* Badge Marquee - Urgencia */}
      <div className="bg-urgency-badge overflow-hidden">
        <div className="animate-marquee whitespace-nowrap py-2 text-center">
          <span className="inline-block px-4 text-xs font-bold text-background-primary uppercase tracking-wider">
            ⚡ OFERTA LIMITADA: Solo quedan 12 spots disponibles este mes
          </span>
          <span className="inline-block px-4 text-xs font-bold text-background-primary uppercase tracking-wider">
            ⚡ OFERTA LIMITADA: Solo quedan 12 spots disponibles este mes
          </span>
          <span className="inline-block px-4 text-xs font-bold text-background-primary uppercase tracking-wider">
            ⚡ OFERTA LIMITADA: Solo quedan 12 spots disponibles este mes
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={cn(
          'transition-all duration-300',
          isScrolled
            ? 'bg-background-primary/95 backdrop-blur-xl shadow-xl border-b border-border-default'
            : 'bg-transparent'
        )}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                <span className="relative text-2xl font-bold bg-gradient-to-r from-brand-cyan-400 to-brand-blue-500 bg-clip-text text-transparent">
                  {brandConfig.site.name}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="#datasets"
                className="text-text-secondary hover:text-brand-cyan-500 transition-colors text-sm font-medium"
              >
                Datasets
              </Link>
              <Link
                href="#generator"
                className="text-text-secondary hover:text-brand-cyan-500 transition-colors text-sm font-medium"
              >
                Generador AI
              </Link>
              <Link
                href="#pricing"
                className="text-text-secondary hover:text-brand-cyan-500 transition-colors text-sm font-medium"
              >
                Precios
              </Link>
              <Link
                href="#faq"
                className="text-text-secondary hover:text-brand-cyan-500 transition-colors text-sm font-medium"
              >
                FAQ
              </Link>
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-4">
              <Button variant="primary" size="md">
                Empezar Gratis
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
