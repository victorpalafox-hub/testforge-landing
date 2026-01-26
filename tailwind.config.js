/** @type {import('tailwindcss').Config} */

// Importar colores centralizados del brand
// Para modificar colores, editar: lib/config/brand.colors.js
const { brandColors } = require('./lib/config/brand.colors.js');

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Colores legacy (mantener por compatibilidad)
        primary: brandColors.brand.primary,
        secondary: brandColors.brand.secondary,
        accent: brandColors.brand.accent,

        // Nuevos colores con namespace 'brand'
        // Uso: bg-brand-primary, text-brand-secondary, etc.
        ...brandColors,
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
