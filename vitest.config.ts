import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

/**
 * Configuración de Vitest para TestForge
 *
 * Tests unitarios y de integración para utilidades y componentes
 *
 * @see https://vitest.dev/config/
 */
export default defineConfig({
  plugins: [react()],

  test: {
    // Entorno de ejecución (jsdom para React components)
    environment: 'jsdom',

    // Setup files
    setupFiles: ['./test/setup.ts'],

    // Incluir archivos de test
    include: [
      'test/unit/**/*.{test,spec}.{ts,tsx}',
      'test/integration/**/*.{test,spec}.{ts,tsx}',
    ],

    // Coverage
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './test/reports/coverage',
      include: [
        'lib/**/*.{ts,tsx}',
        'components/**/*.{ts,tsx}',
        'app/**/*.{ts,tsx}',
      ],
      exclude: [
        'node_modules/',
        'test/',
        '**/*.d.ts',
        '**/*.config.{ts,js}',
        '**/index.{ts,tsx}',
      ],
      // Thresholds
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80,
    },

    // Globals (permite usar describe, it, expect sin importar)
    globals: true,
  },

  // Path aliases (igual que tsconfig.json)
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
