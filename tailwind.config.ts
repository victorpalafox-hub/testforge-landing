/**
 * ═══════════════════════════════════════════════════════════════════════════
 * TAILWIND CSS - Configuración integrada con brand.config.ts
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Todos los valores vienen de: lib/config/brand.config.ts
 * Para cambiar colores, tipografía, espaciados → edita brand.config.ts
 *
 * CLASES GENERADAS:
 * - Colores: bg-brand-cyan-500, text-brand-blue-500, border-brand-purple-500
 * - Fondos: bg-background-primary, bg-background-card
 * - Gradientes: bg-gradient-primary, bg-gradient-hero
 * - Sombras: shadow-glow-cyan, shadow-glow-blue
 * - Espaciado: p-section, gap-xl, m-3xl
 * - Animaciones: animate-fade-in, animate-marquee, animate-float
 */

import type { Config } from 'tailwindcss';
import { brandConfig } from './lib/config/brand.config';

// ═══════════════════════════════════════════════════════════════════════════
// HELPERS para transformar valores de brandConfig
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Convierte string de font-family a array para Tailwind
 */
const parseFontFamily = (fontString: string): string[] =>
  fontString.split(',').map((f) => f.trim().replace(/['"]/g, ''));

/**
 * Extrae sombras planas (sin objetos anidados) para Tailwind
 */
const flattenShadows = () => {
  const { glow, ...baseShadows } = brandConfig.effects.shadows;
  return {
    ...baseShadows,
    'glow-cyan': glow.cyan,
    'glow-blue': glow.blue,
    'glow-purple': glow.purple,
  };
};

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURACIÓN DE TAILWIND
// ═══════════════════════════════════════════════════════════════════════════

const config: Config = {
  // ════════════════════════════════════════════════════════════════════════
  // ARCHIVOS A PROCESAR
  // ════════════════════════════════════════════════════════════════════════
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  // ════════════════════════════════════════════════════════════════════════
  // DARK MODE
  // ════════════════════════════════════════════════════════════════════════
  darkMode: ['class'],

  // ════════════════════════════════════════════════════════════════════════
  // TEMA EXTENDIDO
  // ════════════════════════════════════════════════════════════════════════
  theme: {
    extend: {
      // ══════════════════════════════════════════════════════════════════
      // COLORES desde brand.config
      // Uso: bg-brand-cyan-500, text-brand-blue-400, border-brand-purple-600
      // ══════════════════════════════════════════════════════════════════
      colors: {
        // Paletas de marca completas
        brand: {
          cyan: brandConfig.colors.brand.cyan,
          blue: brandConfig.colors.brand.blue,
          purple: brandConfig.colors.brand.purple,
        },

        // Fondos semánticos
        // Uso: bg-background-primary, bg-background-card
        background: brandConfig.colors.background,

        // Textos semánticos
        // Uso: text-text-primary, text-text-secondary
        'tf-text': brandConfig.colors.text,

        // Bordes semánticos
        // Uso: border-tf-border-default, border-tf-border-accent
        'tf-border': brandConfig.colors.border,

        // Estados
        // Uso: bg-state-success, text-state-error
        state: brandConfig.colors.state,

        // Urgencia (badges promocionales)
        // Uso: bg-urgency-badge, text-urgency-text
        urgency: brandConfig.colors.urgency,

        // Comparison table
        // Uso: text-comparison-check, text-comparison-cross
        comparison: brandConfig.colors.comparison,
      },

      // ══════════════════════════════════════════════════════════════════
      // TIPOGRAFÍA desde brand.config
      // Uso: font-sans, font-mono
      // ══════════════════════════════════════════════════════════════════
      fontFamily: {
        sans: parseFontFamily(brandConfig.typography.fontFamily.sans),
        mono: parseFontFamily(brandConfig.typography.fontFamily.mono),
      },

      // Tamaños de fuente
      // Uso: text-xs, text-7xl
      fontSize: brandConfig.typography.fontSize,

      // Pesos de fuente
      // Uso: font-normal, font-extrabold
      fontWeight: brandConfig.typography.fontWeight,

      // Alturas de línea
      // Uso: leading-tight, leading-relaxed
      lineHeight: brandConfig.typography.lineHeight,

      // ══════════════════════════════════════════════════════════════════
      // ESPACIADO desde brand.config
      // Uso: p-xs, m-section, gap-3xl
      // ══════════════════════════════════════════════════════════════════
      spacing: {
        xs: brandConfig.spacing.xs,
        sm: brandConfig.spacing.sm,
        md: brandConfig.spacing.md,
        lg: brandConfig.spacing.lg,
        xl: brandConfig.spacing.xl,
        '2xl': brandConfig.spacing['2xl'],
        '3xl': brandConfig.spacing['3xl'],
        section: brandConfig.spacing.section,
      },

      // ══════════════════════════════════════════════════════════════════
      // SOMBRAS desde brand.config
      // Uso: shadow-sm, shadow-lg, shadow-glow-cyan
      // ══════════════════════════════════════════════════════════════════
      boxShadow: flattenShadows(),

      // ══════════════════════════════════════════════════════════════════
      // BORDER RADIUS desde brand.config
      // Uso: rounded-sm, rounded-xl, rounded-full
      // ══════════════════════════════════════════════════════════════════
      borderRadius: brandConfig.effects.borderRadius,

      // ══════════════════════════════════════════════════════════════════
      // TRANSICIONES desde brand.config
      // Uso: duration-fast, duration-slow
      // ══════════════════════════════════════════════════════════════════
      transitionDuration: {
        fast: brandConfig.animations.duration.fast,
        normal: brandConfig.animations.duration.normal,
        slow: brandConfig.animations.duration.slow,
      },

      // Funciones de easing
      // Uso: ease-bounce, ease-easeInOut
      transitionTimingFunction: {
        linear: brandConfig.animations.easing.linear,
        'ease-in': brandConfig.animations.easing.easeIn,
        'ease-out': brandConfig.animations.easing.easeOut,
        'ease-in-out': brandConfig.animations.easing.easeInOut,
        bounce: brandConfig.animations.easing.bounce,
      },

      // ══════════════════════════════════════════════════════════════════
      // BREAKPOINTS desde brand.config
      // Uso: xs:flex, sm:hidden, 2xl:grid-cols-4
      // ══════════════════════════════════════════════════════════════════
      screens: {
        xs: brandConfig.breakpoints.xs,
        sm: brandConfig.breakpoints.sm,
        md: brandConfig.breakpoints.md,
        lg: brandConfig.breakpoints.lg,
        xl: brandConfig.breakpoints.xl,
        '2xl': brandConfig.breakpoints['2xl'],
      },

      // ══════════════════════════════════════════════════════════════════
      // Z-INDEX desde brand.config
      // Uso: z-dropdown, z-modal, z-tooltip
      // ══════════════════════════════════════════════════════════════════
      zIndex: {
        base: String(brandConfig.zIndex.base),
        dropdown: String(brandConfig.zIndex.dropdown),
        sticky: String(brandConfig.zIndex.sticky),
        fixed: String(brandConfig.zIndex.fixed),
        modal: String(brandConfig.zIndex.modal),
        popover: String(brandConfig.zIndex.popover),
        tooltip: String(brandConfig.zIndex.tooltip),
      },

      // ══════════════════════════════════════════════════════════════════
      // GRADIENTES desde brand.config
      // Uso: bg-gradient-primary, bg-gradient-hero
      // ══════════════════════════════════════════════════════════════════
      backgroundImage: {
        'gradient-primary': brandConfig.colors.gradients.primary,
        'gradient-secondary': brandConfig.colors.gradients.secondary,
        'gradient-background': brandConfig.colors.gradients.background,
        'gradient-card': brandConfig.colors.gradients.card,
        'gradient-hero': brandConfig.colors.gradients.hero,
      },

      // ══════════════════════════════════════════════════════════════════
      // BACKDROP BLUR
      // Uso: backdrop-blur-xs, backdrop-blur-xl
      // ══════════════════════════════════════════════════════════════════
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
      },

      // ══════════════════════════════════════════════════════════════════
      // KEYFRAMES para animaciones
      // ══════════════════════════════════════════════════════════════════
      keyframes: {
        // Fade in suave
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },

        // Fade in con movimiento hacia arriba
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },

        // Fade in con movimiento hacia abajo
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },

        // Slide desde la izquierda
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },

        // Slide desde la derecha
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },

        // Pulse con glow (para CTAs)
        pulseGlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(0, 217, 255, 0.5)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 40px rgba(0, 217, 255, 0.8)' },
        },

        // Float suave (para elementos decorativos)
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },

        // Marquee para badges (DesignBell style)
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },

        // Spin lento (para loaders)
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },

        // Scale on hover
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },

        // Shimmer effect (para skeletons)
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },

        // Bounce suave
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },

      // ══════════════════════════════════════════════════════════════════
      // ANIMACIONES predefinidas
      // Uso: animate-fade-in, animate-marquee, animate-float
      // ══════════════════════════════════════════════════════════════════
      animation: {
        // Básicas
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.6s ease-out forwards',

        // Slides
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',

        // Efectos continuos
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        'spin-slow': 'spinSlow 3s linear infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',

        // Marquee (para header badge)
        marquee: 'marquee 30s linear infinite',
        'marquee-fast': 'marquee 15s linear infinite',
        'marquee-slow': 'marquee 45s linear infinite',

        // Otros
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        shimmer: 'shimmer 2s linear infinite',
      },
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // PLUGINS
  // ════════════════════════════════════════════════════════════════════════
  plugins: [],
};

export default config;
