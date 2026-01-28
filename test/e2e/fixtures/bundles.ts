/**
 * Test Fixtures - Bundles (Paquetes)
 *
 * Test data para bundles/paquetes de datasets.
 */

export const testBundles = {
  starter: {
    id: 'bundle-starter-001',
    name: 'Pack Básico',
    description: 'Dataset individual para comenzar con tus pruebas',
    price_mxn: 145,
    datasets_included: ['rfc'],
    tier: 'single' as const,
    popular: false,
    savings_percentage: 0,
    features: [
      '1 Dataset a elección',
      'Descarga inmediata',
      'Formato XLSX, CSV, JSON',
      '30 días de actualizaciones',
    ],
    spotsLeft: 5,
  },

  professional: {
    id: 'bundle-pro-001',
    name: 'Pack Profesional',
    description: 'Bundle múltiple con los datasets más populares',
    price_mxn: 665,
    datasets_included: ['rfc', 'curp', 'direcciones'],
    tier: 'bundle' as const,
    popular: true,
    savings_percentage: 15,
    features: [
      '3 Datasets premium',
      'RFC + CURP + Direcciones',
      'Formatos múltiples',
      '60 días de actualizaciones',
      'Soporte prioritario',
    ],
    spotsLeft: 3,
  },

  enterprise: {
    id: 'bundle-all-001',
    name: 'All Access',
    description: 'Todos los datasets + Generador de Tests con IA',
    price_mxn: 760,
    datasets_included: ['rfc', 'curp', 'direcciones', 'usuarios', 'transacciones'],
    tier: 'allAccess' as const,
    popular: false,
    savings_percentage: 25,
    features: [
      'Todos los datasets',
      'Generador de Tests IA',
      '3 generaciones gratuitas',
      'Actualizaciones por 12 meses',
      'Soporte dedicado 24/7',
      'API access',
    ],
    spotsLeft: 2,
  },
};

/**
 * Arrays de bundles
 */
export const allBundles = [
  testBundles.starter,
  testBundles.professional,
  testBundles.enterprise,
];

export const popularBundles = allBundles.filter((bundle) => bundle.popular);

/**
 * Utilidad para generar bundles de prueba
 */
export function generateTestBundle(
  overrides: Partial<typeof testBundles.starter> = {}
) {
  return {
    id: `test-bundle-${Date.now()}`,
    name: 'Bundle de Prueba',
    description: 'Bundle generado para testing',
    price_mxn: 500,
    datasets_included: ['test-dataset'],
    tier: 'bundle' as const,
    popular: false,
    savings_percentage: 10,
    features: ['Feature 1', 'Feature 2'],
    spotsLeft: 5,
    ...overrides,
  };
}
