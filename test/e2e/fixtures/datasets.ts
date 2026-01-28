/**
 * Test Fixtures - Datasets
 *
 * Test data para datasets del marketplace.
 * NO hardcodear estos valores en los tests.
 */

export const testDatasets = {
  rfc: {
    id: 'test-rfc-001',
    title: 'Generador de RFC',
    description:
      'Dataset completo de RFCs válidos siguiendo el algoritmo del SAT. Perfecto para testing de sistemas fiscales.',
    price_mxn: 145,
    records_count: 10000,
    category: 'Fiscal',
    is_published: true,
    slug: 'rfc-generator',
    format: 'XLSX, CSV, JSON',
    lastUpdated: '2025-01-15',
  },

  curp: {
    id: 'test-curp-001',
    title: 'Generador de CURP',
    description:
      'CURPs válidas según algoritmo RENAPO. Datos demográficos realistas para pruebas de identidad.',
    price_mxn: 145,
    records_count: 10000,
    category: 'Identidad',
    is_published: true,
    slug: 'curp-generator',
    format: 'XLSX, CSV, JSON',
    lastUpdated: '2025-01-15',
  },

  direcciones: {
    id: 'test-dir-001',
    title: 'Direcciones SEPOMEX',
    description:
      'Base completa de códigos postales mexicanos con colonias y municipios. Validado contra catálogo oficial SEPOMEX.',
    price_mxn: 235,
    records_count: 145000,
    category: 'Geolocalización',
    is_published: true,
    slug: 'direcciones-sepomex',
    format: 'XLSX, CSV, JSON',
    lastUpdated: '2025-01-10',
  },

  usuarios: {
    id: 'test-users-001',
    title: 'Perfiles de Usuario',
    description:
      'Perfiles completos de usuarios mexicanos con nombres, emails, teléfonos y datos demográficos realistas.',
    price_mxn: 285,
    records_count: 50000,
    category: 'Demográficos',
    is_published: true,
    slug: 'perfiles-usuario',
    format: 'XLSX, CSV, JSON',
    lastUpdated: '2025-01-12',
  },

  transacciones: {
    id: 'test-trans-001',
    title: 'Transacciones E-commerce',
    description:
      'Datos de transacciones de comercio electrónico con patrones realistas de compra y montos en MXN.',
    price_mxn: 190,
    records_count: 25000,
    category: 'Financiero',
    is_published: true,
    slug: 'transacciones-ecommerce',
    format: 'XLSX, CSV, JSON',
    lastUpdated: '2025-01-18',
  },

  // Dataset no publicado (para tests de filtrado)
  unpublished: {
    id: 'test-unpub-001',
    title: 'Dataset No Publicado',
    description: 'Este dataset no debería aparecer en el catálogo público',
    price_mxn: 100,
    records_count: 1000,
    category: 'Test',
    is_published: false,
    slug: 'unpublished-test',
    format: 'JSON',
    lastUpdated: '2025-01-01',
  },
};

/**
 * Arrays de datasets para tests
 */
export const publishedDatasets = [
  testDatasets.rfc,
  testDatasets.curp,
  testDatasets.direcciones,
  testDatasets.usuarios,
  testDatasets.transacciones,
];

export const allDatasets = [...publishedDatasets, testDatasets.unpublished];

/**
 * Datasets por categoría
 */
export const datasetsByCategory = {
  Fiscal: [testDatasets.rfc],
  Identidad: [testDatasets.curp],
  Geolocalización: [testDatasets.direcciones],
  Demográficos: [testDatasets.usuarios],
  Financiero: [testDatasets.transacciones],
};

/**
 * Utilidad para generar datasets de prueba dinámicamente
 */
export function generateTestDataset(overrides: Partial<typeof testDatasets.rfc> = {}) {
  return {
    id: `test-${Date.now()}`,
    title: 'Dataset de Prueba',
    description: 'Dataset generado para testing',
    price_mxn: 100,
    records_count: 1000,
    category: 'Test',
    is_published: true,
    slug: 'test-dataset',
    format: 'JSON',
    lastUpdated: new Date().toISOString().split('T')[0],
    ...overrides,
  };
}
