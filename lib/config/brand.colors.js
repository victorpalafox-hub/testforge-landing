/**
 * Colores del brand para Tailwind CSS
 *
 * Este archivo existe como JS puro para poder ser importado
 * en tailwind.config.js (que no soporta TypeScript directamente).
 *
 * IMPORTANTE: Mantener sincronizado con lib/config/brand.ts
 */

const brandColors = {
  brand: {
    primary: '#0F172A',     // Slate 900 - Headers, texto principal
    secondary: '#10B981',   // Emerald 500 - Precios, éxito, CTAs
    accent: '#3B82F6',      // Blue 500 - Enlaces, badges, highlights
    bg: '#F8FAFC',          // Slate 50 - Fondo principal
    'bg-alt': '#EFF6FF',    // Blue 50 - Fondo alternativo
  },
}

module.exports = { brandColors }
