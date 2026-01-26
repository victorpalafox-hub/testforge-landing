'use client';

import * as React from 'react';
import { Button, Badge } from '@/components/ui';
import { Container } from '@/components/layout';
import { brandConfig } from '@/lib/config';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Gradient - Purple tint radial */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(139, 92, 246, 0.15) 0%, #020617 50%)',
        }}
      />

      {/* Blur orbs for depth - cyan, blue, purple */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-40 right-20 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-20 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />

      <Container size="lg" className="relative z-10 py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge Social Proof - usando variant new (cyan) */}
          <div className="flex justify-center">
            <Badge variant="new" className="text-sm px-4 py-2">
              <span className="mr-1">✓</span>
              {brandConfig.site.stats.testsGenerated}+ pruebas ejecutadas
            </Badge>
          </div>

          {/* Headline - gradient cyan → blue → purple */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="block text-white">
              Datasets Premium
            </span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              para QA en México
            </span>
          </h1>

          {/* Description - text-gray-300 */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Datos reales de empresas mexicanas. Listos para usar en tus pruebas automatizadas.
            Genera casos de prueba con IA en segundos.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button variant="primary" size="lg" className="min-w-[200px]">
              Empezar Gratis
              <span className="ml-2">→</span>
            </Button>
            <Button variant="outline" size="lg" className="min-w-[200px]">
              Ver Datasets
            </Button>
          </div>

          {/* Stats Bar - glass effect con bg-white/5 border-white/10 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-3xl md:text-4xl font-bold text-cyan-400">
                {brandConfig.site.stats.datasets}
              </div>
              <div className="text-sm text-gray-400 mt-1">
                Datasets Premium
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-3xl md:text-4xl font-bold text-blue-400">
                {brandConfig.site.stats.testsGenerated}
              </div>
              <div className="text-sm text-gray-400 mt-1">
                Tests Generados
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-3xl md:text-4xl font-bold text-purple-400">
                {brandConfig.site.stats.teams}
              </div>
              <div className="text-sm text-gray-400 mt-1">
                Equipos QA
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-3xl md:text-4xl font-bold text-cyan-400">
                99.9%
              </div>
              <div className="text-sm text-gray-400 mt-1">
                Precisión
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
