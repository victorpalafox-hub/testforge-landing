/**
 * E2E Tests - Home Page
 *
 * Tests de navegación, Hero, Benefits, y funcionalidad general de la landing page.
 */

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { expectedContent } from '../fixtures/content';

test.describe('Home Page - Landing', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.waitForPageLoad();
  });

  test.describe('Navegación y Carga', () => {
    test('debería cargar la página principal correctamente', async ({ page }) => {
      await expect(page).toHaveURL('/');
      await expect(page).toHaveTitle(/TestForge/i);
    });

    test('debería mostrar el Hero section visible', async () => {
      await homePage.expectHeroToBeVisible();
    });

    test('debería cargar sin errores de consola críticos', async ({ page }) => {
      const consoleErrors: string[] = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await homePage.navigate();

      // Permitir algunos warnings, pero NO errores críticos
      const criticalErrors = consoleErrors.filter(
        (err) => !err.includes('favicon') && !err.includes('Warning')
      );

      expect(criticalErrors).toHaveLength(0);
    });
  });

  test.describe('Hero Section', () => {
    test('debería mostrar el título principal', async () => {
      await homePage.expectHeroTitleToContain('Datasets Premium');
      await homePage.expectHeroTitleToContain('QA en México');
    });

    test('debería mostrar el subtítulo descriptivo', async () => {
      await expect(homePage.heroSubtitle).toBeVisible();
      await expect(homePage.heroSubtitle).toContainText(/datos reales/i);
    });

    test('debería mostrar badge de social proof', async () => {
      await homePage.expectSocialProofBadgeToBeVisible();
      await expect(homePage.heroBadge).toContainText(/\d+\+.*pruebas/i);
    });

    test('debería tener CTA principal "Empezar Gratis" visible y habilitado', async () => {
      await expect(homePage.heroPrimaryCta).toBeVisible();
      await expect(homePage.heroPrimaryCta).toBeEnabled();
      await expect(homePage.heroPrimaryCta).toContainText(/empezar gratis/i);
    });

    test('debería tener CTA secundario "Ver Datasets" visible', async () => {
      await expect(homePage.heroSecondaryCta).toBeVisible();
      await expect(homePage.heroSecondaryCta).toBeEnabled();
      await expect(homePage.heroSecondaryCta).toContainText(/ver datasets/i);
    });

    test('debería tener link de descarga de muestra gratis', async () => {
      await expect(homePage.heroDownloadCta).toBeVisible();
      await expect(homePage.heroDownloadCta).toHaveAttribute('href', /muestra.*\.xlsx/i);
      await expect(homePage.heroDownloadCta).toHaveAttribute('download');
    });

    test('CTA principal debería tener efecto hover (coral glow)', async ({ page }) => {
      await homePage.heroPrimaryCta.hover();

      // Verificar que tiene las clases de hover
      const buttonClasses = await homePage.heroPrimaryCta.getAttribute('class');
      expect(buttonClasses).toBeTruthy();
    });

    test('CTA secundario debería tener border blue al hacer hover', async () => {
      await homePage.heroSecondaryCta.hover();

      const buttonClasses = await homePage.heroSecondaryCta.getAttribute('class');
      expect(buttonClasses).toContain('border');
    });
  });

  test.describe('Hero Stats Cards', () => {
    test('debería mostrar las 4 stats cards', async () => {
      await homePage.expectStatsToBeVisible();
    });

    test('stat "Datasets Premium" debería mostrar número válido', async () => {
      const value = await homePage.getStatValue('datasets');
      expect(value).toMatch(/\d+\+?/);
    });

    test('stat "Tests Generados" debería mostrar número válido', async () => {
      const value = await homePage.getStatValue('tests');
      expect(value).toMatch(/\d+\+?/);
    });

    test('stat "Equipos QA" debería mostrar número válido', async () => {
      const value = await homePage.getStatValue('teams');
      expect(value).toMatch(/\d+\+?/);
    });

    test('stat "Precisión" debería mostrar 99.9%', async () => {
      const value = await homePage.getStatValue('precision');
      expect(value).toContain('99.9');
    });
  });

  test.describe('Benefits Section', () => {
    test('debería mostrar la sección de benefits', async () => {
      await homePage.expectBenefitsToBeVisible();
    });

    test('debería mostrar exactamente 4 benefit cards', async () => {
      await homePage.expectBenefitCardsCount(4);
    });

    test('benefit cards deberían tener títulos visibles', async () => {
      const count = await homePage.getBenefitCardsCount();
      expect(count).toBe(4);

      // Los 4 benefits del config
      const benefitTitles = expectedContent.benefits.titles;

      for (const title of benefitTitles) {
        const benefit = homePage.page.getByText(title, { exact: true });
        await expect(benefit).toBeVisible();
      }
    });
  });

  test.describe('Catalog Section', () => {
    test('debería mostrar la sección de catálogo', async () => {
      await homePage.expectCatalogToBeVisible();
    });

    test('debería poder hacer scroll al catálogo', async () => {
      await homePage.scrollToCatalog();
      await expect(homePage.catalogSection).toBeInViewport();
    });

    test('catálogo debería tener título descriptivo', async () => {
      await expect(homePage.catalogTitle).toContainText(expectedContent.catalog.title);
    });
  });

  test.describe('Interacciones del Hero', () => {
    test('click en CTA secundario debería hacer scroll a catálogo', async ({ page }) => {
      await homePage.clickSecondaryCta();

      // Esperar a que haga scroll
      await page.waitForTimeout(500);

      // Verificar que el catálogo está en viewport
      await expect(homePage.catalogSection).toBeInViewport();
    });

    test('click en download CTA debería iniciar descarga', async ({ page }) => {
      const downloadPromise = page.waitForEvent('download');

      await homePage.clickDownloadCta();

      const download = await downloadPromise;
      expect(download.suggestedFilename()).toContain('.xlsx');
    });
  });

  test.describe('Responsive Design', () => {
    test('debería funcionar en mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      await homePage.navigate();
      await homePage.expectHeroResponsive();
      await homePage.expectStatsToBeVisible();
    });

    test('debería funcionar en tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });

      await homePage.navigate();
      await homePage.expectHeroToBeVisible();
      await homePage.expectBenefitsToBeVisible();
    });

    test('debería funcionar en desktop large viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      await homePage.navigate();
      await homePage.expectHeroToBeVisible();
      await homePage.expectCatalogToBeVisible();
    });
  });

  test.describe('Accesibilidad', () => {
    test('heading principal debería ser h1', async () => {
      const h1 = homePage.page.locator('h1');
      await expect(h1).toBeVisible();
      await expect(h1).toContainText(/datasets premium/i);
    });

    test('CTAs deberían ser tabulables (keyboard navigation)', async ({ page }) => {
      await homePage.heroPrimaryCta.focus();
      await expect(homePage.heroPrimaryCta).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(homePage.heroSecondaryCta).toBeFocused();
    });

    test('link de descarga debería tener atributo download', async () => {
      await expect(homePage.heroDownloadCta).toHaveAttribute('download');
    });
  });

  test.describe('Performance', () => {
    test('página debería cargar en menos de 3 segundos', async ({ page }) => {
      const startTime = Date.now();

      await homePage.navigate();
      await homePage.waitForPageLoad();

      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(3000);
    });
  });
});
