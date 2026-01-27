'use client';

import * as React from 'react';
import { Container } from '@/components/layout';
import { brandConfig } from '@/lib/config';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Gradient - Cobalt tint radial */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(0, 71, 171, 0.12) 0%, #0A1628 50%)',
        }}
      />

      {/* Blur orbs for depth - Cobalt palette */}
      <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[200px]" />
      <div className="absolute top-40 right-20 w-[450px] h-[450px] bg-cyan-500/8 rounded-full blur-[180px]" />
      <div className="absolute bottom-20 left-10 w-[550px] h-[550px] bg-[#FF8C73]/6 rounded-full blur-[220px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[160px]" />

      <Container size="lg" className="relative z-10 py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge Social Proof - Cobalt style discreto */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/80 border border-white/10 hover:border-blue-600/30 transition-all duration-300">
              <span className="text-slate-500">✨</span>
              <span className="text-sm font-medium text-slate-400">
                {brandConfig.site.stats.testsGenerated}+ pruebas ejecutadas
              </span>
            </div>
          </div>

          {/* Headline - blue→cyan gradient (NO purple) */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="block text-white">
              Datasets Premium
            </span>
            <span className="block mt-2 bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
              para QA en México
            </span>
          </h1>

          {/* Description - slate-300 */}
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Datos reales de empresas mexicanas. Listos para usar en tus pruebas automatizadas.
            Genera casos de prueba con IA en segundos.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {/* Primary CTA - Coral */}
            <button
              className="min-w-[200px] px-8 py-4 rounded-xl font-semibold text-white bg-[#FF8C73] hover:bg-[#FF6B6B] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              style={{ boxShadow: '0 0 40px rgba(255, 140, 115, 0.4)' }}
            >
              Empezar Gratis
              <span className="ml-2">→</span>
            </button>

            {/* Secondary CTA - Blue outline */}
            <button className="min-w-[200px] px-8 py-4 rounded-xl font-semibold text-slate-200 bg-transparent border-2 border-blue-600/30 hover:border-cyan-500/50 hover:bg-blue-600/10 transition-all duration-300">
              Ver Datasets
            </button>
          </div>

          {/* Stats Cards - Cobalt glassmorphism */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16">
            {/* Stat 1: Datasets - cyan→blue gradient */}
            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-blue-600/30 hover:-translate-y-1 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {brandConfig.site.stats.datasets}
              </div>
              <div className="text-sm text-slate-400 mt-1">
                Datasets Premium
              </div>
            </div>

            {/* Stat 2: Tests - coral gradient */}
            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-blue-600/30 hover:-translate-y-1 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FF8787] to-[#FF8C73] bg-clip-text text-transparent">
                {brandConfig.site.stats.testsGenerated}
              </div>
              <div className="text-sm text-slate-400 mt-1">
                Tests Generados
              </div>
            </div>

            {/* Stat 3: Teams - blue→cyan gradient */}
            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-blue-600/30 hover:-translate-y-1 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                {brandConfig.site.stats.teams}
              </div>
              <div className="text-sm text-slate-400 mt-1">
                Equipos QA
              </div>
            </div>

            {/* Stat 4: Precision - purple→blue gradient */}
            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-blue-600/30 hover:-translate-y-1 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                99.9%
              </div>
              <div className="text-sm text-slate-400 mt-1">
                Precisión
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
