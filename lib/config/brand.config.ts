/**
 * ═══════════════════════════════════════════════════════════════════════════
 * TESTFORGE - SISTEMA DE DISEÑO COMPLETO
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Centraliza TODA la configuración visual y de negocio del sitio.
 *
 * FILOSOFÍA: ZERO HARDCODING
 * - Cambiar color → 1 línea aquí
 * - Cambiar precio → 1 número aquí
 * - Todo configurable centralmente
 *
 * INSPIRACIÓN:
 * - 60% Studio Nika: testimonials carousel, comparison table, 3-tier pricing
 * - 30% DesignBell: badge marquee, 1 CTA hero, spacing generoso
 * - 10% Dark tech: navy backgrounds, gradientes cyan/blue
 *
 * @example
 * ```ts
 * import { brandConfig } from '@/lib/config/brand.config';
 *
 * // Acceder a colores
 * const primaryColor = brandConfig.colors.brand.cyan[500];
 *
 * // Acceder a límites de negocio
 * const freeTrials = brandConfig.limits.freeTestGenerations;
 *
 * // Acceder a precios
 * const bundlePrice = brandConfig.pricing.bundles.bundle;
 * ```
 */

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURACIÓN PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════

export const brandConfig = {
  // ═══════════════════════════════════════════════════════════════════════════
  // 1. INFORMACIÓN DEL SITIO
  // ═══════════════════════════════════════════════════════════════════════════
  /**
   * Datos básicos del sitio para SEO, metadata y contenido estático.
   * Cambiar aquí actualiza automáticamente headers, footers y meta tags.
   */
  site: {
    /** Nombre de la marca - aparece en logo, títulos, etc. */
    name: 'TestForge',
    /** Eslogan corto - usado en header y hero */
    tagline: 'Testing Tools for Modern QA',
    /** Descripción para SEO - meta description */
    description:
      'Premium Mexican test data and AI-powered test script generation for quality assurance teams.',
    /** URL base del sitio */
    url: 'https://testforge.mx',
    /** Imagen para Open Graph (compartir en redes) */
    ogImage: '/images/og-image.png',

    /** Información de contacto */
    contact: {
      support: 'support@testforge.mx',
      sales: 'sales@testforge.mx',
      twitter: '@testforge',
      github: 'https://github.com/victorpalafox-hub/testforge-landing',
    },

    /** Social proof - estadísticas para mostrar credibilidad */
    stats: {
      datasets: '1,000+',
      teams: '40+',
      testsGenerated: '500+',
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. LÍMITES Y CUOTAS (Configuración de Negocio)
  // ═══════════════════════════════════════════════════════════════════════════
  /**
   * Límites del producto - controla funcionalidad gratuita vs. de pago.
   * Cambiar aquí afecta la lógica de negocio en toda la aplicación.
   */
  limits: {
    /** Número de generaciones de tests gratuitas por usuario */
    freeTestGenerations: 3,

    /** Descargas permitidas por compra de dataset (-1 = ilimitado) */
    datasetsDownloadsPerPurchase: -1,
    /** Días de validez de una compra de dataset */
    datasetsPurchaseValidityDays: 30,

    /** Timeout para generación de tests (segundos) */
    testGenerationTimeout: 60,
    /** Tokens máximos por nivel de complejidad */
    testGenerationMaxTokens: {
      low: 500,
      medium: 1500,
      high: 3000,
    },

    /** Spots disponibles para urgencia (Studio Nika style) */
    availableSpots: {
      single: 5,
      bundle: 3,
      allAccess: 2,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 3. PRECIOS (Configuración de Negocio)
  // ═══════════════════════════════════════════════════════════════════════════
  /**
   * Estructura de precios completa.
   * Cambiar aquí actualiza automáticamente todos los componentes de pricing.
   */
  pricing: {
    /** Moneda para mostrar precios */
    currency: 'MXN',
    /** ¿El IVA está incluido en los precios? */
    taxIncluded: true,

    /** Precios de datasets individuales */
    datasets: {
      rfc: 145,
      curp: 145,
      direcciones: 235,
      usuarios: 285,
      transacciones: 190,
    },

    /** Bundles (3 tiers - Studio Nika) */
    bundles: {
      /** Tier 1: Dataset individual */
      single: 145,
      /** Tier 2: Bundle múltiples datasets (POPULAR) */
      bundle: 665,
      /** Tier 3: Todo + Generator */
      allAccess: 760,
    },

    /** Precios de generación de tests por complejidad */
    testGeneration: {
      low: 0,
      medium: 195,
      high: 385,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 4. COLORES - Dark Theme Tech
  // ═══════════════════════════════════════════════════════════════════════════
  /**
   * Sistema de colores completo con paletas semánticas.
   * Basado en: Navy backgrounds (#0F172A), gradientes cyan/blue
   */
  colors: {
    /** Colores de marca - paletas completas */
    brand: {
      cyan: {
        50: '#ECFEFF',
        100: '#CFFAFE',
        200: '#A5F3FC',
        300: '#67E8F9',
        400: '#22D3EE',
        500: '#00D9FF', // ← PRIMARY
        600: '#0891B2',
        700: '#0E7490',
        800: '#155E75',
        900: '#164E63',
      },
      blue: {
        50: '#EFF6FF',
        100: '#DBEAFE',
        200: '#BFDBFE',
        300: '#93C5FD',
        400: '#60A5FA',
        500: '#0EA5E9', // ← SECONDARY
        600: '#2563EB',
        700: '#1D4ED8',
        800: '#1E40AF',
        900: '#1E3A8A',
      },
      purple: {
        500: '#8B5CF6',
        600: '#7C3AED',
      },
    },

    /** Fondos - jerarquía de superficies */
    background: {
      /** Fondo principal del sitio */
      primary: '#0F172A',
      /** Fondo de secciones alternadas */
      secondary: '#1E293B',
      /** Fondo de elementos terciarios */
      tertiary: '#334155',
      /** Fondo de cards */
      card: '#1E293B',
      /** Cards elevadas (modales, dropdowns) */
      elevated: '#1E293B',
      /** Estado hover de elementos */
      hover: '#334155',
      /** Fondo con tinte de color primario */
      accent: 'rgba(0, 217, 255, 0.05)',
    },

    /** Textos - jerarquía tipográfica */
    text: {
      /** Texto principal (headings, body) */
      primary: '#FFFFFF',
      /** Texto secundario (descripciones) */
      secondary: '#94A3B8',
      /** Texto terciario (captions, labels) */
      tertiary: '#64748B',
      /** Texto con color de acento */
      accent: '#00D9FF',
      /** Texto muy tenue */
      muted: '#475569',
    },

    /** Bordes */
    border: {
      default: '#334155',
      light: '#475569',
      accent: '#00D9FF',
    },

    /** Estados semánticos */
    state: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
    },

    /** Urgencia (DesignBell + Studio Nika) */
    urgency: {
      /** Color de badge de urgencia */
      badge: '#FFD700',
      /** Texto sobre badge de urgencia */
      text: '#1A1A1A',
    },

    /** Tabla de comparación */
    comparison: {
      /** Checkmark verde */
      check: '#10B981',
      /** X rojo */
      cross: '#EF4444',
    },

    /** Gradientes predefinidos */
    gradients: {
      /** Gradiente principal cyan → blue */
      primary: 'linear-gradient(135deg, #00D9FF 0%, #0EA5E9 100%)',
      /** Gradiente secundario purple → blue */
      secondary: 'linear-gradient(135deg, #8B5CF6 0%, #0EA5E9 100%)',
      /** Gradiente de fondo sutil */
      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
      /** Gradiente para cards */
      card: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
      /** Gradiente radial para hero */
      hero: 'radial-gradient(ellipse at top, rgba(139, 92, 246, 0.15) 0%, #0F172A 50%)',
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 5. TIPOGRAFÍA
  // ═══════════════════════════════════════════════════════════════════════════
  /**
   * Sistema tipográfico completo.
   * Las variables CSS (--font-*) se definen en layout.tsx
   */
  typography: {
    /** Familias tipográficas */
    fontFamily: {
      /** Sans-serif principal (Inter) */
      sans: 'var(--font-inter), system-ui, -apple-system, sans-serif',
      /** Monospace para código (JetBrains Mono) */
      mono: 'var(--font-jetbrains-mono), "Courier New", monospace',
    },

    /** Escala de tamaños */
    fontSize: {
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      base: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem', // 48px
      '6xl': '3.75rem', // 60px
      '7xl': '4.5rem', // 72px
    },

    /** Pesos tipográficos */
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },

    /** Alturas de línea */
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 6. ESPACIADOS (DesignBell generoso)
  // ═══════════════════════════════════════════════════════════════════════════
  /**
   * Sistema de espaciado consistente.
   * DesignBell usa espaciados generosos para dar respiración al diseño.
   */
  spacing: {
    xs: '0.5rem', // 8px
    sm: '1rem', // 16px
    md: '1.5rem', // 24px
    lg: '2rem', // 32px
    xl: '3rem', // 48px
    '2xl': '4rem', // 64px
    '3xl': '6rem', // 96px
    /** Espaciado entre secciones principales */
    section: '120px',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 7. EFECTOS VISUALES
  // ═══════════════════════════════════════════════════════════════════════════
  /**
   * Sombras, bordes redondeados, transiciones y efectos especiales.
   */
  effects: {
    /** Sombras para elevación */
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
      default: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
      md: '0 6px 12px -2px rgba(0, 0, 0, 0.3)',
      lg: '0 10px 20px -3px rgba(0, 0, 0, 0.4)',
      xl: '0 20px 40px -4px rgba(0, 0, 0, 0.5)',
      /** Sombras con glow de color */
      glow: {
        cyan: '0 0 20px rgba(0, 217, 255, 0.5)',
        blue: '0 0 20px rgba(14, 165, 233, 0.5)',
        purple: '0 0 20px rgba(139, 92, 246, 0.5)',
      },
    },

    /** Border radius consistente */
    borderRadius: {
      sm: '0.375rem', // 6px
      default: '0.5rem', // 8px
      md: '0.75rem', // 12px
      lg: '1rem', // 16px
      xl: '1.5rem', // 24px
      full: '9999px',
    },

    /** Transiciones para interacciones */
    transitions: {
      fast: '150ms ease-in-out',
      default: '200ms ease-in-out',
      slow: '300ms ease-in-out',
    },

    /** Filtros de blur */
    blur: {
      sm: 'blur(4px)',
      default: 'blur(8px)',
      lg: 'blur(16px)',
    },

    /** Efecto glassmorphism */
    glass: {
      background: 'rgba(30, 41, 59, 0.6)',
      backdropFilter: 'blur(12px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 8. BREAKPOINTS
  // ═══════════════════════════════════════════════════════════════════════════
  /**
   * Puntos de quiebre para diseño responsive.
   * Alineados con Tailwind CSS defaults.
   */
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 9. Z-INDEX
  // ═══════════════════════════════════════════════════════════════════════════
  /**
   * Escala de z-index para controlar capas de UI.
   */
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modal: 1300,
    popover: 1400,
    tooltip: 1500,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 10. ANIMACIONES
  // ═══════════════════════════════════════════════════════════════════════════
  /**
   * Duraciones y funciones de easing para animaciones.
   */
  animations: {
    /** Duraciones estándar */
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    /** Funciones de easing */
    easing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 11. UI PATTERNS (Studio Nika + DesignBell)
  // ═══════════════════════════════════════════════════════════════════════════
  /**
   * Patrones de UI predefinidos basados en las referencias de diseño.
   * Configura comportamiento de componentes sin tocar código.
   */
  patterns: {
    /** Configuración del header */
    header: {
      badge: {
        /** Tipo de badge: 'marquee' | 'static' */
        type: 'marquee' as const,
        /** Texto del marquee */
        text: '3 FREE TRIALS • JOIN EARLY ACCESS • 3 FREE TRIALS',
        /** Velocidad: 'slow' | 'medium' | 'fast' */
        speed: 'medium' as const,
      },
    },

    /** Configuración del hero */
    hero: {
      badge: {
        /** Tipo: 'social-proof' | 'announcement' */
        type: 'social-proof' as const,
        /** Texto del badge */
        text: '40+ QA TEAMS TRUST TESTFORGE',
      },
      headline: {
        /** Número de líneas del headline */
        lines: 2,
        /** Ancho máximo del headline */
        maxWidth: '900px',
      },
      cta: {
        /** Número de CTAs principales (DesignBell = 1) */
        primary: 1,
        /** Número de CTAs secundarios */
        secondary: 0,
      },
      stats: {
        /** ¿Mostrar stats en hero? */
        show: true,
        /** Número de stats a mostrar */
        items: 3,
      },
    },

    /** Configuración del portfolio/bento grid */
    portfolio: {
      /** Tipo: 'bento-grid' | 'masonry' | 'carousel' */
      type: 'bento-grid' as const,
      /** Número de items a mostrar */
      items: 8,
      /** ¿Scroll horizontal? */
      scroll: false,
    },

    /** Configuración de benefits */
    benefits: {
      /** Número de benefits (Studio Nika = 3) */
      count: 3,
      /** Layout: 'vertical' | 'horizontal' | 'grid' */
      layout: 'vertical' as const,
      /** Tamaño de iconos */
      iconSize: '96px',
    },

    /** Configuración de services */
    services: {
      /** Número de servicios principales */
      count: 2,
      /** Layout: 'cards' | 'list' | 'tabs' */
      layout: 'cards' as const,
      /** Tamaño de cards: 'small' | 'medium' | 'large' */
      size: 'large' as const,
    },

    /** Configuración del proceso */
    process: {
      /** Número de pasos */
      steps: 4,
      /** Tamaño de iconos */
      iconSize: '120px',
      /** ¿Mostrar números? */
      numbered: true,
      /** Estilo: 'horizontal' | 'vertical' | 'zigzag' */
      style: 'vertical' as const,
    },

    /** Configuración de testimonials */
    testimonials: {
      /** Tipo: 'carousel' | 'grid' | 'masonry' */
      type: 'carousel' as const,
      /** Número de testimonials */
      count: 6,
      /** ¿Autoplay en carousel? */
      autoplay: true,
      /** Velocidad de autoplay (ms) */
      speed: 5000,
    },

    /** Configuración de comparison table */
    comparison: {
      /** ¿Mostrar tabla de comparación? */
      show: true,
      /** Número de competidores a comparar */
      competitors: 2,
      /** Estilo: 'table' | 'cards' */
      style: 'table' as const,
    },

    /** Configuración de pricing */
    pricing: {
      /** Número de tiers (Studio Nika = 3) */
      tiers: 3,
      /** Tier destacado (1-indexed) */
      highlight: 2,
      /** Configuración de urgencia */
      urgency: {
        /** Tipo: 'spots-left' | 'countdown' | 'none' */
        type: 'spots-left' as const,
        /** ¿Mostrar urgencia? */
        show: true,
      },
    },

    /** Configuración de logos de clientes */
    logos: {
      /** Display: 'grid' | 'marquee' | 'carousel' */
      display: 'grid' as const,
      /** Columnas en grid */
      columns: 6,
      /** ¿Escala de grises? */
      grayscale: true,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 12. RECURSOS
  // ═══════════════════════════════════════════════════════════════════════════
  /**
   * Rutas a assets estáticos.
   */
  assets: {
    logo: '/images/logo.svg',
    logoDark: '/images/logo-dark.svg',
    heroIllustration: '/images/hero-illustration.png',
    ogImage: '/images/og-image.png',

    /** Iconos de datasets */
    icons: {
      rfc: '/images/icons/rfc.svg',
      curp: '/images/icons/curp.svg',
      address: '/images/icons/address.svg',
      user: '/images/icons/user.svg',
      transaction: '/images/icons/transaction.svg',
    },
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// TIPOS TYPESCRIPT
// ═══════════════════════════════════════════════════════════════════════════

/** Tipo completo de la configuración de marca */
export type BrandConfig = typeof brandConfig;

/** Tipo para colores de marca */
export type BrandColors = typeof brandConfig.colors;

/** Tipo para precios */
export type PricingConfig = typeof brandConfig.pricing;

/** Tipo para límites */
export type LimitsConfig = typeof brandConfig.limits;

/** Tipo para patrones de UI */
export type PatternsConfig = typeof brandConfig.patterns;

// ═══════════════════════════════════════════════════════════════════════════
// HELPERS DE ACCESO
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Obtiene el color primario de la marca
 * @example
 * const cyan = getPrimaryColor(); // '#00D9FF'
 */
export const getPrimaryColor = () => brandConfig.colors.brand.cyan[500];

/**
 * Obtiene el color secundario de la marca
 * @example
 * const blue = getSecondaryColor(); // '#0EA5E9'
 */
export const getSecondaryColor = () => brandConfig.colors.brand.blue[500];

/**
 * Formatea un precio con la moneda configurada
 * @example
 * formatPrice(665); // '$665 MXN'
 */
export const formatPrice = (amount: number): string => {
  const { currency, taxIncluded } = brandConfig.pricing;
  const formatted = `$${amount.toLocaleString('es-MX')} ${currency}`;
  return taxIncluded ? formatted : `${formatted} + IVA`;
};

/**
 * Obtiene los spots disponibles para un tier
 * @example
 * getAvailableSpots('bundle'); // 3
 */
export const getAvailableSpots = (tier: keyof typeof brandConfig.limits.availableSpots): number => {
  return brandConfig.limits.availableSpots[tier];
};

// ═══════════════════════════════════════════════════════════════════════════
// EXPORT DEFAULT
// ═══════════════════════════════════════════════════════════════════════════

export default brandConfig;
