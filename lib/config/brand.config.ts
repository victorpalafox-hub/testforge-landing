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
  // 4. COLORES - Cobalt Professional Theme
  // ═══════════════════════════════════════════════════════════════════════════
  /**
   * Sistema de colores completo con paletas semánticas.
   * Paleta Cobalt-inspired: Royal, profesional, confiable
   * - Primary: Cobalt blue profundo
   * - Accent warm: Coral (humaniza CTAs)
   * - Accent cool: Teal mint (tech/datos)
   */
  colors: {
    /** Colores de marca - paletas completas */
    brand: {
      /** Teal mint - para datos/tech/innovación */
      cyan: {
        50: '#F0F9FF',
        100: '#E0F2FE',
        200: '#BAE6FD',
        300: '#7DD3FC',
        400: '#38BDF8',
        500: '#00D4AA', // ← PRIMARY (Teal mint)
        600: '#00B894',
        700: '#009B7D',
        800: '#007D66',
        900: '#006654',
      },
      /** Cobalt/Azure - profesional y confiable */
      blue: {
        50: '#EFF6FF',
        100: '#DBEAFE',
        200: '#BFDBFE',
        300: '#93C5FD',
        400: '#60A5FA',
        500: '#0066CC', // ← SECONDARY (Azure bright)
        600: '#0047AB', // ← Cobalt profundo
        700: '#003D8F',
        800: '#003373',
        900: '#002957',
      },
      /** Purple - acentos y gradientes */
      purple: {
        50: '#FAF5FF',
        100: '#F3E8FF',
        200: '#E9D5FF',
        300: '#D8B4FE',
        400: '#C084FC',
        500: '#8B5CF6',
        600: '#7C3AED',
        700: '#6D28D9',
        800: '#5B21B6',
        900: '#4C1D95',
      },
      /** Coral - CTAs cálidos que humanizan */
      coral: {
        50: '#FFF5F5',
        100: '#FFE3E3',
        200: '#FFC9C9',
        300: '#FFA8A8',
        400: '#FF8787',
        500: '#FF8C73', // ← CTA PRIMARY (Coral suavizado)
        600: '#FF6B6B',
        700: '#FF5252',
        800: '#E03E3E',
        900: '#C92A2A',
      },
    },

    /** Fondos - jerarquía de superficies (Cobalt navy profundo) */
    background: {
      /** Fondo principal del sitio */
      primary: '#0A1628',
      /** Fondo de secciones alternadas / cards */
      secondary: '#162234',
      /** Fondo de elementos terciarios / hover */
      tertiary: '#1A2A3E',
      /** Fondo de cards */
      card: '#162234',
      /** Cards elevadas (modales, dropdowns) */
      elevated: '#1A2A3E',
      /** Estado hover de elementos */
      hover: '#1A2A3E',
      /** Fondo con tinte de color primario */
      accent: 'rgba(0, 71, 171, 0.08)',
    },

    /** Textos - jerarquía tipográfica */
    text: {
      /** Texto principal (headings, body) */
      primary: '#F8FAFC',
      /** Texto secundario (descripciones) */
      secondary: '#CBD5E1',
      /** Texto terciario (captions, labels) */
      tertiary: '#94A3B8',
      /** Texto con color de acento */
      accent: '#00D4AA',
      /** Texto muy tenue */
      muted: '#64748B',
    },

    /** Bordes */
    border: {
      default: 'rgba(255, 255, 255, 0.08)',
      subtle: 'rgba(255, 255, 255, 0.05)',
      light: 'rgba(255, 255, 255, 0.12)',
      accent: 'rgba(0, 71, 171, 0.3)',
    },

    /** Estados semánticos */
    state: {
      success: '#00D4AA',
      warning: '#FF8C73',
      error: '#FF5252',
      info: '#0066CC',
    },

    /** Urgencia (badge marquee) */
    urgency: {
      /** Color de badge de urgencia */
      badge: '#FF8C73',
      /** Texto sobre badge de urgencia */
      text: '#FFFFFF',
      /** Glow para efectos */
      glow: 'rgba(255, 140, 115, 0.3)',
    },

    /** Tabla de comparación */
    comparison: {
      /** Checkmark verde */
      check: '#00D4AA',
      /** X rojo */
      cross: '#FF5252',
    },

    /** Gradientes predefinidos */
    gradients: {
      /** Gradiente principal cobalt → azure → teal */
      primary: 'linear-gradient(135deg, #0047AB 0%, #0066CC 50%, #00D4AA 100%)',
      /** Gradiente secundario coral */
      secondary: 'linear-gradient(135deg, #FF8C73 0%, #FF6B6B 100%)',
      /** Gradiente de fondo sutil */
      background: 'radial-gradient(circle at 50% 50%, rgba(0, 71, 171, 0.08) 0%, transparent 50%)',
      /** Gradiente para cards */
      card: 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
      /** Gradiente para hero headline */
      hero: 'linear-gradient(135deg, #F8FAFC 0%, #DBEAFE 50%, #BAE6FD 100%)',
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
      /** Sombras con glow de color (Cobalt palette) */
      glow: {
        cyan: '0 0 20px rgba(0, 212, 170, 0.5)',
        blue: '0 0 20px rgba(0, 71, 171, 0.5)',
        purple: '0 0 20px rgba(139, 92, 246, 0.5)',
        coral: '0 0 40px rgba(255, 140, 115, 0.4)',
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
 * Obtiene el color primario de la marca (Teal mint)
 * @example
 * const teal = getPrimaryColor(); // '#00D4AA'
 */
export const getPrimaryColor = () => brandConfig.colors.brand.cyan[500];

/**
 * Obtiene el color secundario de la marca (Azure/Cobalt)
 * @example
 * const azure = getSecondaryColor(); // '#0066CC'
 */
export const getSecondaryColor = () => brandConfig.colors.brand.blue[500];

/**
 * Obtiene el color de CTA (Coral)
 * @example
 * const coral = getCtaColor(); // '#FF8C73'
 */
export const getCtaColor = () => brandConfig.colors.brand.coral[500];

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
