/**
 * Configuración de contenido del Marketplace
 *
 * Este archivo centraliza todos los textos y contenido estático.
 * Modifica estos valores para personalizar el copy del sitio.
 */

// ============================================
// TIPOS
// ============================================

export interface HeroCTA {
  /** Texto del botón */
  text: string
  /** URL del enlace */
  href: string
  /** Variante de estilo */
  variant: 'primary' | 'secondary' | 'outline'
  /** Si es descarga directa */
  download?: boolean
}

export interface HeroContent {
  /** Título principal del hero - soporta HTML para estilos */
  title: string
  /** Subtítulo descriptivo */
  subtitle: string
  /** Texto del botón principal CTA (legacy) */
  ctaText: string
  /** Texto del botón secundario (legacy) */
  ctaSecondaryText?: string
  /** Botones CTA configurables */
  buttons: HeroCTA[]
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

export interface NavLink {
  /** Texto del enlace */
  label: string
  /** URL o anchor del enlace */
  href: string
  /** Identificador único */
  id: string
  /** Si es un enlace de descarga */
  download?: boolean
  /** Badge opcional (ej: "GRATIS") */
  badge?: string
}

export interface HeaderContent {
  /** Nombre de la marca en el header */
  brandName: string
  /** Links de navegación */
  navigation: NavLink[]
}

export interface FooterLink {
  /** Texto del enlace */
  label: string
  /** URL del enlace */
  href: string
}

export interface FooterContent {
  /** Sección "Sobre nosotros" */
  about: {
    title: string
    description: string
  }
  /** Sección de enlaces */
  links: {
    title: string
    items: FooterLink[]
  }
  /** Sección de contacto */
  contact: {
    title: string
    email: string
  }
  /** Texto de copyright */
  copyright: string
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
  /** Mensaje cuando no hay bundles */
  emptyBundlesTitle: string
  /** Mensaje secundario cuando no hay bundles */
  emptyBundlesSubtitle: string
  /** Mensaje de error */
  errorMessage: string
  /** Mensaje de error para bundles */
  errorMessageBundles: string
  /** Mensaje de carga de bundles */
  loadingBundles: string
  /** Mensaje de "próximamente" */
  comingSoon: string
  /** Subtítulo de coming soon */
  comingSoonSubtitle: string
}

export interface ContentConfig {
  header: HeaderContent
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
  footer: FooterContent
}

// ============================================
// CONFIGURACIÓN
// ============================================

/**
 * Contenido del Header
 *
 * Para modificar la navegación principal:
 * 1. Cambia `brandName` para el nombre en el header
 * 2. Ajusta `navigation` para los enlaces de navegación
 */
export const HEADER: HeaderContent = {
  brandName: 'Datasets MX',
  navigation: [
    { label: 'Inicio', href: '/', id: 'inicio' },
    { label: 'Catálogo', href: '#catalogo', id: 'catalogo' },
    { label: 'Muestra', href: '/muestras/muestra-gratuita.xlsx', id: 'muestra', download: true, badge: 'GRATIS' },
    { label: 'Contacto', href: '#contacto', id: 'contacto' },
  ],
}

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
  buttons: [
    { text: 'Ver Datasets', href: '#catalogo', variant: 'primary' },
    { text: 'Descarga Muestra Gratis', href: '/muestras/muestra-gratuita.xlsx', variant: 'outline', download: true },
  ],
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
  emptyBundlesTitle: 'No hay paquetes disponibles',
  emptyBundlesSubtitle: 'Pronto agregaremos paquetes con descuentos especiales',
  errorMessage: 'Error al cargar los datasets',
  errorMessageBundles: 'Error al cargar los paquetes',
  loadingBundles: 'Cargando paquetes...',
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
 *
 * Configuración del pie de página con 3 secciones.
 */
export const FOOTER: FooterContent = {
  about: {
    title: 'Sobre Nosotros',
    description: 'Datos profesionales para equipos de desarrollo y testing en México. Datasets curados y verificados para potenciar tus proyectos.',
  },
  links: {
    title: 'Enlaces',
    items: [
      { label: 'Términos y Condiciones', href: '/terminos' },
      { label: 'Política de Privacidad', href: '/privacidad' },
      { label: 'Preguntas Frecuentes', href: '/faq' },
    ],
  },
  contact: {
    title: 'Contacto',
    email: 'hola@datasetsmx.com',
  },
  copyright: `© ${new Date().getFullYear()} Datasets MX. Todos los precios en MXN. IVA incluido.`,
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
  header: HEADER,
  hero: HERO,
  benefits: BENEFITS,
  tabs: TABS,
  catalog: CATALOG,
  whyUs: WHY_US,
  cta: CTA,
  footer: FOOTER,
}
