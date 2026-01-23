/**
 * Configuración de contenido del Marketplace
 *
 * Este archivo centraliza todos los textos y contenido estático.
 * Modifica estos valores para personalizar el copy del sitio.
 */

// ============================================
// TIPOS
// ============================================

export interface HeroContent {
  /** Título principal del hero - soporta HTML para estilos */
  title: string
  /** Subtítulo descriptivo */
  subtitle: string
  /** Texto del botón principal CTA */
  ctaText: string
  /** Texto del botón secundario (opcional) */
  ctaSecondaryText?: string
}

export interface Benefit {
  /** Nombre del ícono (Heroicons) */
  icon: 'database' | 'shield' | 'lightning' | 'chart' | 'download' | 'support' | 'lock' | 'refresh'
  /** Título corto del beneficio */
  title: string
  /** Descripción del beneficio - 1-2 oraciones */
  description: string
}

export interface WhyUsItem {
  /** Número o estadística destacada */
  stat: string
  /** Etiqueta descriptiva */
  label: string
}

export interface TabContent {
  /** Etiqueta del tab */
  label: string
  /** Descripción corta del tab */
  description: string
}

export interface TabsConfig {
  /** Tab de productos individuales */
  individual: TabContent
  /** Tab de paquetes/bundles */
  bundles: TabContent
}

export interface CatalogContent {
  /** Título de la sección del catálogo */
  title: string
  /** Título alternativo para bundles */
  titleBundles: string
  /** Subtítulo descriptivo */
  subtitle: string
  /** Subtítulo para bundles */
  subtitleBundles: string
  /** Mensaje cuando no hay datasets */
  emptyTitle: string
  /** Mensaje secundario cuando no hay datasets */
  emptySubtitle: string
  /** Mensaje de error */
  errorMessage: string
  /** Mensaje de "próximamente" */
  comingSoon: string
  /** Subtítulo de coming soon */
  comingSoonSubtitle: string
}

export interface ContentConfig {
  hero: HeroContent
  benefits: Benefit[]
  tabs: TabsConfig
  catalog: CatalogContent
  whyUs: {
    title: string
    subtitle: string
    items: WhyUsItem[]
  }
  cta: {
    title: string
    subtitle: string
    buttonText: string
    viewProducts: string
    contactSales: string
  }
  footer: {
    copyright: string
    links: Array<{ label: string; href: string }>
  }
}

// ============================================
// CONFIGURACIÓN
// ============================================

/**
 * Contenido del Hero Section
 *
 * Para modificar el hero de la página principal:
 * 1. Cambia `title` para tu mensaje principal
 * 2. Ajusta `subtitle` con tu propuesta de valor
 * 3. Personaliza los textos de los botones CTA
 */
export const HERO: HeroContent = {
  title: 'Marketplace de Datasets',
  subtitle: 'Descubre datasets premium de alta calidad, curados por expertos para potenciar tus proyectos de análisis, machine learning e inteligencia artificial.',
  ctaText: 'Explorar Datasets',
  ctaSecondaryText: 'Conocer más',
}

/**
 * Beneficios del marketplace
 *
 * Array de 4 beneficios principales. Cada uno necesita:
 * - icon: nombre del ícono (ver tipo Benefit para opciones)
 * - title: título corto (3-5 palabras)
 * - description: explicación breve (1-2 oraciones)
 */
export const BENEFITS: Benefit[] = [
  {
    icon: 'database',
    title: 'Datos Verificados',
    description: 'Cada dataset pasa por un riguroso proceso de validación para garantizar precisión y consistencia en la información.',
  },
  {
    icon: 'shield',
    title: 'Compra Segura',
    description: 'Transacciones protegidas con encriptación de grado bancario. Tu información financiera siempre está segura.',
  },
  {
    icon: 'lightning',
    title: 'Descarga Inmediata',
    description: 'Accede a tus datasets al instante después de la compra. Sin tiempos de espera, sin complicaciones.',
  },
  {
    icon: 'refresh',
    title: 'Actualizaciones Incluidas',
    description: 'Recibe actualizaciones gratuitas de los datasets por 12 meses. Mantén tus datos siempre frescos.',
  },
]

/**
 * Sección "Por qué elegirnos"
 *
 * Estadísticas y números que generan confianza.
 * Usa números redondeados y fáciles de recordar.
 */
export const WHY_US = {
  title: 'Por qué elegirnos',
  subtitle: 'Miles de profesionales confían en nosotros para sus proyectos de datos',
  items: [
    { stat: '500+', label: 'Datasets disponibles' },
    { stat: '10k+', label: 'Clientes satisfechos' },
    { stat: '99.9%', label: 'Uptime garantizado' },
    { stat: '24/7', label: 'Soporte técnico' },
  ] as WhyUsItem[],
}

/**
 * Tabs del catálogo
 *
 * Configura las pestañas de filtrado del catálogo.
 */
export const TABS: TabsConfig = {
  individual: {
    label: 'Individual',
    description: 'Datasets unitarios para proyectos específicos',
  },
  bundles: {
    label: 'Paquetes',
    description: 'Colecciones de datasets con descuento',
  },
}

/**
 * Catálogo de datasets
 *
 * Textos para la sección principal del catálogo.
 */
export const CATALOG: CatalogContent = {
  title: 'Explora nuestro catálogo',
  titleBundles: 'Paquetes de Datasets',
  subtitle: 'Datasets verificados y listos para usar en tus proyectos',
  subtitleBundles: 'Ahorra con nuestras colecciones curadas de datasets',
  emptyTitle: 'No hay datasets disponibles',
  emptySubtitle: 'Vuelve pronto para descubrir nuevos datasets',
  errorMessage: 'Error al cargar los datasets',
  comingSoon: 'Paquetes disponibles pronto',
  comingSoonSubtitle: 'Estamos preparando colecciones especiales de datasets con precios exclusivos. ¡Mantente atento!',
}

/**
 * Call to Action final
 *
 * Sección de conversión al final de la página.
 */
export const CTA = {
  title: '¿Listo para potenciar tus proyectos?',
  subtitle: 'Únete a miles de profesionales que ya utilizan nuestros datasets.',
  buttonText: 'Comenzar ahora',
  viewProducts: 'Ver Datasets',
  contactSales: 'Contactar Ventas',
}

/**
 * Footer
 */
export const FOOTER = {
  copyright: `© ${new Date().getFullYear()} DataMarket. Todos los derechos reservados.`,
  links: [
    { label: 'Términos de uso', href: '/terminos' },
    { label: 'Privacidad', href: '/privacidad' },
    { label: 'Contacto', href: '/contacto' },
  ],
}

// ============================================
// EXPORTACIÓN CONSOLIDADA
// ============================================

/**
 * Objeto consolidado con todo el contenido
 *
 * Uso:
 * ```ts
 * import { CONTENT } from '@/lib/config/content'
 * console.log(CONTENT.hero.title)
 * ```
 */
export const CONTENT: ContentConfig = {
  hero: HERO,
  benefits: BENEFITS,
  tabs: TABS,
  catalog: CATALOG,
  whyUs: WHY_US,
  cta: CTA,
  footer: FOOTER,
}
