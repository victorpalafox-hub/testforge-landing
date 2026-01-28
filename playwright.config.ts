import { defineConfig, devices } from '@playwright/test';

/**
 * Configuración de Playwright para TestForge
 *
 * Tests E2E para plataforma SaaS de Datasets Mexicanos + Generador de Tests IA
 *
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Directorio de tests E2E
  testDir: './test/e2e/specs',

  // Timeout global por test (30 segundos)
  timeout: 30 * 1000,

  // Timeout para expect assertions (5 segundos)
  expect: {
    timeout: 5000,
  },

  // Configuración de ejecución
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Reporter
  reporter: [
    ['html', { outputFolder: 'test/reports/playwright-html' }],
    ['json', { outputFile: 'test/reports/playwright-results.json' }],
    ['list'],
  ],

  // Configuración compartida para todos los proyectos
  use: {
    // Base URL para tests
    baseURL: 'http://localhost:3000',

    // Screenshot en caso de fallo
    screenshot: 'only-on-failure',

    // Video en caso de fallo
    video: 'retain-on-failure',

    // Trace
    trace: 'on-first-retry',

    // Locale español
    locale: 'es-MX',

    // Timezone Ciudad de México
    timezoneId: 'America/Mexico_City',
  },

  // Proyectos - diferentes browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // Mobile tests
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  // Servidor de desarrollo
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
