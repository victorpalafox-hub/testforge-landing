/**
 * Test Fixtures - Content
 *
 * Textos y contenido esperado en la UI.
 * Útil para tests de contenido y traducciones.
 */

export const expectedContent = {
  hero: {
    title: 'Marketplace de Datasets',
    subtitle: /datasets premium.*análisis.*machine learning/i,
    ctaPrimary: 'Ver Datasets',
    ctaSecondary: 'Descarga Muestra Gratis',
  },

  benefits: {
    titles: ['Datos Verificados', 'Compra Segura', 'Descarga Inmediata', 'Actualizaciones Incluidas'],
    count: 4,
  },

  catalog: {
    title: 'Explora nuestro catálogo',
    subtitle: 'Datasets verificados y listos para usar en tus proyectos',
    emptyMessage: 'No hay datasets disponibles',
    errorMessage: 'Error al cargar los datasets',
  },

  pricing: {
    currency: 'MXN',
    tiers: ['Pack Básico', 'Pack Profesional', 'All Access'],
  },

  footer: {
    brand: 'TestForge',
    copyright: /© 202[0-9] TestForge/,
    email: 'hola@testforge.mx',
    sections: ['Sobre Nosotros', 'Enlaces', 'Contacto'],
  },

  navigation: {
    links: ['Inicio', 'Catálogo', 'Muestra', 'Contacto'],
  },

  datasetCard: {
    buyButton: 'Comprar ahora',
    formatLabel: /registros?/i,
  },
};

/**
 * Mensajes de error esperados
 */
export const errorMessages = {
  auth: {
    invalidCredentials: 'Credenciales inválidas',
    emailRequired: 'El email es requerido',
    passwordRequired: 'La contraseña es requerida',
    weakPassword: 'La contraseña debe tener al menos 8 caracteres',
  },

  datasets: {
    notFound: 'Dataset no encontrado',
    loadError: 'Error al cargar los datasets',
    purchaseError: 'Error al procesar la compra',
  },

  general: {
    networkError: 'Error de conexión',
    serverError: 'Error del servidor',
    notAuthorized: 'No autorizado',
  },
};

/**
 * URLs esperadas
 */
export const expectedUrls = {
  home: '/',
  catalog: '#catalogo',
  contact: '#contacto',
  sample: '/muestras/muestra-gratuita.xlsx',
  terms: '/terminos',
  privacy: '/privacidad',
  faq: '/faq',
};
