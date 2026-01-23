/**
 * Configuración de marca del Marketplace
 *
 * Este archivo centraliza toda la identidad visual y de marca.
 * Para personalizar el marketplace, modifica los valores aquí.
 */

// ============================================
// TIPOS
// ============================================

export interface BrandColors {
  /** Color principal - usado en headers, CTAs principales */
  primary: string
  /** Color secundario - usado en elementos de éxito, precios */
  secondary: string
  /** Color de acento - usado en badges, enlaces, highlights */
  accent: string
  /** Fondo principal */
  background: string
  /** Fondo secundario para secciones alternadas */
  backgroundAlt: string
}

export interface TabStyles {
  /** Clases para tab activo */
  active: string
  /** Clases para tab inactivo */
  inactive: string
  /** Clases para el contenedor de tabs */
  container: string
}

export interface HeaderStyles {
  /** Clases del contenedor principal */
  container: string
  /** Clases del contenedor interno */
  inner: string
  /** Clases del logo/nombre */
  logo: string
  /** Clases del contenedor de navegación */
  nav: string
  /** Clases de links de navegación */
  link: string
  /** Clases de link activo */
  linkActive: string
}

export interface BrandStyles {
  /** Estilos de tabs de navegación */
  tab: TabStyles
  /** Estilos del header */
  header: HeaderStyles
}

export interface BrandConfig {
  /** Nombre del marketplace */
  name: string
  /** Eslogan corto que aparece junto al logo */
  tagline: string
  /** Descripción para SEO (meta description) */
  metaDescription: string
  /** Paleta de colores del brand */
  colors: BrandColors
  /** Estilos de componentes reutilizables */
  styles: BrandStyles
  /** Rutas de assets del logo */
  logo: {
    /** Logo principal (claro, para fondos oscuros) */
    light: string
    /** Logo para fondos claros */
    dark: string
    /** Favicon */
    favicon: string
  }
  /** Redes sociales y contacto */
  social: {
    twitter?: string
    linkedin?: string
    github?: string
    email?: string
  }
}

// ============================================
// CONFIGURACIÓN
// ============================================

/**
 * Configuración principal del brand
 *
 * Para cambiar la identidad del marketplace:
 * 1. Modifica `name` y `tagline` para el nombre de tu empresa
 * 2. Ajusta `colors` para tu paleta de colores
 * 3. Actualiza `logo` con las rutas a tus archivos de logo
 * 4. Completa `social` con tus redes sociales
 */
export const BRAND: BrandConfig = {
  // Nombre que aparece en el header y títulos
  name: 'DataMarket',

  // Eslogan corto - máximo 60 caracteres recomendado
  tagline: 'Datasets premium para decisiones inteligentes',

  // Meta description para SEO - máximo 160 caracteres
  metaDescription: 'Marketplace de datasets de alta calidad. Encuentra datos curados para análisis, machine learning e inteligencia artificial. Compra segura y descarga inmediata.',

  // Paleta de colores
  // Usa formato hexadecimal (#RRGGBB)
  colors: {
    primary: '#0F172A',    // Slate 900 - Headers, texto principal
    secondary: '#10B981',  // Emerald 500 - Precios, éxito, CTAs
    accent: '#3B82F6',     // Blue 500 - Enlaces, badges, highlights
    background: '#F8FAFC', // Slate 50 - Fondo principal
    backgroundAlt: '#EFF6FF', // Blue 50 - Fondo alternativo
  },

  // Estilos de componentes
  // Usa clases de Tailwind CSS
  styles: {
    tab: {
      // Tab activo: fondo con gradiente, texto blanco, sombra
      active: 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/25',
      // Tab inactivo: fondo transparente, texto gris, hover sutil
      inactive: 'bg-white/60 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200/50',
      // Contenedor: fondo glassmorphism, padding, rounded
      container: 'inline-flex items-center gap-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 shadow-sm',
    },
    header: {
      // Contenedor sticky con glassmorphism
      container: 'sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200',
      // Layout interno
      inner: 'max-w-7xl mx-auto px-8 py-4 flex justify-between items-center',
      // Logo con gradiente
      logo: 'text-2xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-emerald-600 bg-clip-text text-transparent',
      // Navegación (oculta en móvil)
      nav: 'hidden md:flex gap-8',
      // Links normales
      link: 'text-slate-600 hover:text-emerald-600 transition-colors duration-200',
      // Link activo
      linkActive: 'text-emerald-600 font-medium',
    },
  },

  // Rutas de logos (relativas a /public)
  logo: {
    light: '/logo-light.svg',
    dark: '/logo-dark.svg',
    favicon: '/favicon.ico',
  },

  // Redes sociales (dejar vacío si no aplica)
  social: {
    twitter: 'https://twitter.com/datamarket',
    linkedin: 'https://linkedin.com/company/datamarket',
    github: 'https://github.com/datamarket',
    email: 'contacto@datamarket.com',
  },
}

// ============================================
// COLORES PARA TAILWIND
// ============================================

/**
 * Exportación de colores para usar en tailwind.config.js
 *
 * Uso en tailwind.config.js:
 * ```js
 * const { brandColors } = require('./lib/config/brand.colors.js')
 * ```
 */
export const brandColors = {
  brand: {
    primary: BRAND.colors.primary,
    secondary: BRAND.colors.secondary,
    accent: BRAND.colors.accent,
    bg: BRAND.colors.background,
    'bg-alt': BRAND.colors.backgroundAlt,
  },
} as const
