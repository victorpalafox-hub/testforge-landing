/**
 * Script para generar archivo de muestra gratuita
 *
 * Ejecutar con: npm run generate:sample
 * o: npx ts-node scripts/generate-sample.ts
 */

import * as XLSX from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';

// ============================================
// DATOS FICTICIOS PERO VÁLIDOS
// ============================================

// RFCs ficticios (formato válido, personas inexistentes)
const rfcsData = [
  {
    RFC: 'GALA850312HN5',
    'Nombre Completo': 'García López Ana María',
    'Fecha Nacimiento': '1985-03-12',
    Tipo: 'Física',
  },
  {
    RFC: 'PELJ900718QR2',
    'Nombre Completo': 'Pérez Luna Juan Carlos',
    'Fecha Nacimiento': '1990-07-18',
    Tipo: 'Física',
  },
  {
    RFC: 'TEC150623AB1',
    'Nombre Completo': 'Tecnologías Ejemplo SA de CV',
    'Fecha Constitución': '2015-06-23',
    Tipo: 'Moral',
  },
  {
    RFC: 'MARS880425KL8',
    'Nombre Completo': 'Martínez Ríos Sofía',
    'Fecha Nacimiento': '1988-04-25',
    Tipo: 'Física',
  },
];

// CURPs ficticios (18 caracteres, formato válido)
const curpsData = [
  {
    CURP: 'GALA850312MDFRZN09',
    Nombre: 'Ana María',
    'Apellido Paterno': 'García',
    'Apellido Materno': 'López',
    'Fecha Nacimiento': '1985-03-12',
    Sexo: 'M',
    'Estado Nacimiento': 'DF',
  },
  {
    CURP: 'PELJ900718HDFRNN05',
    Nombre: 'Juan Carlos',
    'Apellido Paterno': 'Pérez',
    'Apellido Materno': 'Luna',
    'Fecha Nacimiento': '1990-07-18',
    Sexo: 'H',
    'Estado Nacimiento': 'DF',
  },
  {
    CURP: 'MARS880425MDFRTF08',
    Nombre: 'Sofía',
    'Apellido Paterno': 'Martínez',
    'Apellido Materno': 'Ríos',
    'Fecha Nacimiento': '1988-04-25',
    Sexo: 'M',
    'Estado Nacimiento': 'DF',
  },
];

// Direcciones ficticias (CPs reales de CDMX)
const direccionesData = [
  {
    Calle: 'Av. Insurgentes Sur',
    'Número Exterior': '1234',
    'Número Interior': 'Depto 501',
    Colonia: 'Del Valle Centro',
    'Código Postal': '03100',
    Municipio: 'Benito Juárez',
    Estado: 'Ciudad de México',
    Referencias: 'Entre Eugenia y Xola',
  },
  {
    Calle: 'Calle Durango',
    'Número Exterior': '567',
    'Número Interior': '',
    Colonia: 'Roma Norte',
    'Código Postal': '06700',
    Municipio: 'Cuauhtémoc',
    Estado: 'Ciudad de México',
    Referencias: 'Frente al parque',
  },
  {
    Calle: 'Av. Revolución',
    'Número Exterior': '890',
    'Número Interior': 'Local 3',
    Colonia: 'San Ángel',
    'Código Postal': '01000',
    Municipio: 'Álvaro Obregón',
    Estado: 'Ciudad de México',
    Referencias: 'A una cuadra del metro',
  },
];

// Usuarios ficticios
const usuariosData = [
  {
    ID: 'USR-001',
    'Nombre Completo': 'García López Ana María',
    Email: 'ana.garcia@ejemplo-ficticio.com',
    Teléfono: '+52 55 1234 5678',
    RFC: 'GALA850312HN5',
    CURP: 'GALA850312MDFRZN09',
    'Fecha Registro': '2024-01-15',
  },
  {
    ID: 'USR-002',
    'Nombre Completo': 'Pérez Luna Juan Carlos',
    Email: 'juan.perez@ejemplo-ficticio.com',
    Teléfono: '+52 55 9876 5432',
    RFC: 'PELJ900718QR2',
    CURP: 'PELJ900718HDFRNN05',
    'Fecha Registro': '2024-02-20',
  },
  {
    ID: 'USR-003',
    'Nombre Completo': 'Martínez Ríos Sofía',
    Email: 'sofia.martinez@ejemplo-ficticio.com',
    Teléfono: '+52 55 5555 1234',
    RFC: 'MARS880425KL8',
    CURP: 'MARS880425MDFRTF08',
    'Fecha Registro': '2024-03-10',
  },
];

// Transacciones ficticias
const transaccionesData = [
  {
    ID: 'TXN-2024-001',
    Fecha: '2024-06-15',
    'Monto MXN': 145.0,
    'Método Pago': 'Tarjeta de Crédito',
    Estatus: 'Completada',
    Producto: 'Dataset RFCs México',
    Cantidad: 1,
    Total: 145.0,
  },
  {
    ID: 'TXN-2024-002',
    Fecha: '2024-06-18',
    'Monto MXN': 475.0,
    'Método Pago': 'Transferencia SPEI',
    Estatus: 'Completada',
    Producto: 'Bundle Identidad Completo',
    Cantidad: 1,
    Total: 475.0,
  },
  {
    ID: 'TXN-2024-003',
    Fecha: '2024-06-20',
    'Monto MXN': 235.0,
    'Método Pago': 'PayPal',
    Estatus: 'Pendiente',
    Producto: 'Dataset Direcciones',
    Cantidad: 1,
    Total: 235.0,
  },
];

// README
const readmeData = [
  { Contenido: 'MUESTRA GRATUITA - DATASETS MX' },
  { Contenido: '' },
  { Contenido: 'Incluye 3 registros de ejemplo de cada tipo de dato.' },
  { Contenido: '' },
  { Contenido: '⚠️ DATOS FICTICIOS PARA TESTING' },
  { Contenido: '' },
  { Contenido: 'Estos datos son válidos técnicamente pero NO corresponden' },
  { Contenido: 'a personas o entidades reales.' },
  { Contenido: '' },
  { Contenido: '✓ Seguros para desarrollo y QA' },
  { Contenido: '✓ Cumplen reglas de validación' },
  { Contenido: '✗ NO usar en producción' },
  { Contenido: '' },
  { Contenido: 'Descarga datasets completos en:' },
  { Contenido: 'https://datasetsmx.com' },
  { Contenido: '' },
  { Contenido: 'Contacto: hola@datasetsmx.com' },
];

// AVISO LEGAL
const avisoLegalData = [
  { Contenido: '⚠️ TÉRMINOS DE USO' },
  { Contenido: '' },
  { Contenido: '1. NATURALEZA DE LOS DATOS' },
  { Contenido: 'Los datos son FICTICIOS, generados algorítmicamente' },
  { Contenido: 'para propósitos exclusivos de testing y desarrollo.' },
  { Contenido: '' },
  { Contenido: '2. VALIDEZ TÉCNICA' },
  { Contenido: '- Cumplen algoritmos oficiales (SAT, RENAPO, SEPOMEX)' },
  { Contenido: '- Pasan validaciones de formato' },
  { Contenido: '- NO existen en registros reales' },
  { Contenido: '' },
  { Contenido: '3. USO PERMITIDO' },
  { Contenido: '✓ Testing de aplicaciones' },
  { Contenido: '✓ Desarrollo de software' },
  { Contenido: '✓ Capacitación y demos' },
  { Contenido: '✓ Ambientes de QA' },
  { Contenido: '' },
  { Contenido: '4. USO PROHIBIDO' },
  { Contenido: '✗ Sistemas productivos' },
  { Contenido: '✗ Actividades fraudulentas' },
  { Contenido: '✗ Suplantación de identidad' },
  { Contenido: '' },
  { Contenido: '5. RESPONSABILIDAD' },
  { Contenido: 'El uso indebido es responsabilidad exclusiva del usuario.' },
  { Contenido: 'Datasets MX no se responsabiliza por mal uso.' },
  { Contenido: '' },
  { Contenido: '© 2026 Datasets MX. Todos los derechos reservados.' },
];

// ============================================
// GENERAR ARCHIVO XLSX
// ============================================

function generateSampleFile() {
  // Crear workbook
  const wb = XLSX.utils.book_new();

  // Agregar hojas
  const wsRFCs = XLSX.utils.json_to_sheet(rfcsData);
  XLSX.utils.book_append_sheet(wb, wsRFCs, 'RFCs');

  const wsCURPs = XLSX.utils.json_to_sheet(curpsData);
  XLSX.utils.book_append_sheet(wb, wsCURPs, 'CURPs');

  const wsDirecciones = XLSX.utils.json_to_sheet(direccionesData);
  XLSX.utils.book_append_sheet(wb, wsDirecciones, 'Direcciones');

  const wsUsuarios = XLSX.utils.json_to_sheet(usuariosData);
  XLSX.utils.book_append_sheet(wb, wsUsuarios, 'Usuarios');

  const wsTransacciones = XLSX.utils.json_to_sheet(transaccionesData);
  XLSX.utils.book_append_sheet(wb, wsTransacciones, 'Transacciones');

  const wsReadme = XLSX.utils.json_to_sheet(readmeData);
  XLSX.utils.book_append_sheet(wb, wsReadme, 'README');

  const wsAvisoLegal = XLSX.utils.json_to_sheet(avisoLegalData);
  XLSX.utils.book_append_sheet(wb, wsAvisoLegal, 'AVISO_LEGAL');

  // Ajustar anchos de columna
  const setColumnWidths = (ws: XLSX.WorkSheet, widths: number[]) => {
    ws['!cols'] = widths.map((w) => ({ wch: w }));
  };

  setColumnWidths(wsRFCs, [18, 30, 15, 10]);
  setColumnWidths(wsCURPs, [20, 15, 18, 18, 15, 8, 12]);
  setColumnWidths(wsDirecciones, [25, 15, 15, 20, 12, 20, 20, 30]);
  setColumnWidths(wsUsuarios, [10, 30, 35, 18, 18, 20, 15]);
  setColumnWidths(wsTransacciones, [15, 12, 12, 20, 12, 25, 10, 12]);
  setColumnWidths(wsReadme, [60]);
  setColumnWidths(wsAvisoLegal, [60]);

  // Guardar archivo
  const outputDir = path.join(process.cwd(), 'public', 'muestras');

  // Crear directorio si no existe
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'muestra-gratuita.xlsx');
  XLSX.writeFile(wb, outputPath);

  console.log('✅ Archivo generado exitosamente:');
  console.log(`   ${outputPath}`);
  console.log('');
  console.log('📊 Hojas incluidas:');
  console.log('   - RFCs (3 registros)');
  console.log('   - CURPs (3 registros)');
  console.log('   - Direcciones (3 registros)');
  console.log('   - Usuarios (3 registros)');
  console.log('   - Transacciones (3 registros)');
  console.log('   - README');
  console.log('   - AVISO_LEGAL');
}

// Ejecutar
generateSampleFile();
