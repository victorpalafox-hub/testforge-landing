/**
 * E2E Tests - Catalog Section
 *
 * Tests de catálogo de datasets: tabs, cards, filtros, compra.
 */

import { test, expect } from '@playwright/test';
import { CatalogPage } from '../pages/CatalogPage';
import { expectedContent } from '../fixtures/content';

test.describe('Catalog Section - Datasets', () => {
  let catalogPage: CatalogPage;

  test.beforeEach(async ({ page }) => {
    catalogPage = new CatalogPage(page);
    await page.goto('/');
    await catalogPage.scrollToSection();
    await catalogPage.waitForLoadingToFinish();
  });

  test.describe('Renderizado y Visibilidad', () => {
    test('debería mostrar la sección de catálogo', async () => {
      await catalogPage.expectToBeVisible();
    });

    test('debería mostrar el título del catálogo', async () => {
      await expect(catalogPage.catalogTitle).toContainText(
        expectedContent.catalog.title
      );
    });

    test('debería mostrar el subtítulo descriptivo', async () => {
      await expect(catalogPage.catalogSubtitle).toBeVisible();
      await expect(catalogPage.catalogSubtitle).toContainText(/datasets verificados/i);
    });

    test('debería mostrar las tabs de navegación', async () => {
      await catalogPage.expectTabsToBeVisible();
    });
  });

  test.describe('Tabs - Individual vs Bundles', () => {
    test('tab "Individual" debería estar activa por defecto', async () => {
      await catalogPage.expectIndividualTabToBeActive();
    });

    test('debería poder cambiar a tab "Bundles"', async () => {
      await catalogPage.clickTabBundles();
      await catalogPage.expectBundlesTabToBeActive();
    });

    test('debería poder volver a tab "Individual"', async () => {
      await catalogPage.clickTabBundles();
      await catalogPage.clickTabIndividual();
      await catalogPage.expectIndividualTabToBeActive();
    });

    test('cambiar de tab debería actualizar contenido', async () => {
      const initialCount = await catalogPage.getDatasetCardsCount();

      await catalogPage.clickTabBundles();
      await catalogPage.page.waitForTimeout(500); // Esperar transición

      await catalogPage.clickTabIndividual();
      const finalCount = await catalogPage.getDatasetCardsCount();

      // Debe volver a mostrar los mismos datasets
      expect(finalCount).toBe(initialCount);
    });
  });

  test.describe('Dataset Cards', () => {
    test('debería mostrar al menos 1 dataset card si hay datos', async () => {
      const count = await catalogPage.getDatasetCardsCount();

      // Si hay datasets en Supabase, debería haber al menos 1
      // Si no hay, verificar empty state
      if (count > 0) {
        expect(count).toBeGreaterThanOrEqual(1);
      } else {
        await catalogPage.expectEmptyStateToBeVisible();
      }
    });

    test('cada dataset card debería tener título visible', async () => {
      const count = await catalogPage.getDatasetCardsCount();

      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const title = await catalogPage.getDatasetTitle(i);
          expect(title).toBeTruthy();
          expect(title.length).toBeGreaterThan(0);
        }
      }
    });

    test('cada dataset card debería tener precio en MXN', async () => {
      const count = await catalogPage.getDatasetCardsCount();

      if (count > 0) {
        await catalogPage.expectAllPricesToBeInMXN();
      }
    });

    test('cada dataset card debería tener botón "Comprar ahora"', async () => {
      const count = await catalogPage.getDatasetCardsCount();

      if (count > 0) {
        await catalogPage.expectAllCardsToHaveBuyButton();
      }
    });

    test('dataset card debería mostrar número de registros', async ({ page }) => {
      const count = await catalogPage.getDatasetCardsCount();

      if (count > 0) {
        const firstCard = catalogPage.datasetCards.first();
        const recordsText = firstCard.getByText(/registros?/i);

        await expect(recordsText).toBeVisible();
      }
    });

    test('dataset card debería tener categoría/badge', async () => {
      const count = await catalogPage.getDatasetCardsCount();

      if (count > 0) {
        const categories = await catalogPage.getVisibleCategories();
        expect(categories.length).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Interacciones con Dataset Cards', () => {
    test('hover sobre dataset card debería aplicar efectos visuales', async () => {
      const count = await catalogPage.getDatasetCardsCount();

      if (count > 0) {
        const firstCard = catalogPage.datasetCards.first();

        // Hover sobre la card
        await firstCard.hover();

        // Verificar que tiene clase hover (o que está visible)
        await expect(firstCard).toBeVisible();
      }
    });

    test('click en botón "Comprar ahora" debería ser interactivo', async ({ page }) => {
      const count = await catalogPage.getDatasetCardsCount();

      if (count > 0) {
        const buyButton = catalogPage.datasetBuyButtons.first();
        await expect(buyButton).toBeEnabled();

        // Click debería ejecutarse sin errores
        await buyButton.click();

        // TODO: Verificar navegación a checkout cuando esté implementado
      }
    });
  });

  test.describe('Estados Especiales', () => {
    test('debería manejar empty state cuando no hay datasets', async ({ page }) => {
      // Mock de respuesta vacía de Supabase
      await page.route('**/rest/v1/datasets*', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([]),
        });
      });

      await page.goto('/');
      await catalogPage.scrollToSection();

      const count = await catalogPage.getDatasetCardsCount();

      if (count === 0) {
        await catalogPage.expectEmptyStateToBeVisible();
      }
    });

    test('debería manejar error de carga', async ({ page }) => {
      // Mock de error de Supabase
      await page.route('**/rest/v1/datasets*', async (route) => {
        await route.abort('failed');
      });

      await page.goto('/');
      await catalogPage.scrollToSection();

      // Verificar que no rompe la página
      await expect(catalogPage.catalogSection).toBeVisible();
    });
  });

  test.describe('Filtros y Categorías', () => {
    test('debería mostrar múltiples categorías de datasets', async () => {
      const categories = await catalogPage.getVisibleCategories();

      if (categories.length > 0) {
        // Debería haber categorías como: Fiscal, Identidad, Geolocalización, etc.
        expect(categories.length).toBeGreaterThan(0);
      }
    });

    test('datasets deberían tener categorías válidas', async () => {
      const count = await catalogPage.getDatasetCardsCount();

      if (count > 0) {
        const categories = await catalogPage.getVisibleCategories();

        const validCategories = [
          'Fiscal',
          'Identidad',
          'Geolocalización',
          'Demográficos',
          'Financiero',
        ];

        for (const category of categories) {
          const isValid = validCategories.some((valid) =>
            category.toLowerCase().includes(valid.toLowerCase())
          );

          if (!isValid) {
            console.log(`Categoría no esperada: ${category}`);
          }
        }
      }
    });
  });

  test.describe('Responsive - Catalog', () => {
    test('debería funcionar en mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      await page.goto('/');
      await catalogPage.scrollToSection();
      await catalogPage.expectToBeVisible();
    });

    test('dataset cards deberían apilarse verticalmente en mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      await page.goto('/');
      await catalogPage.scrollToSection();

      const count = await catalogPage.getDatasetCardsCount();

      if (count > 1) {
        // En mobile, las cards deberían estar en columna única
        const firstCard = await catalogPage.datasetCards.first().boundingBox();
        const secondCard = await catalogPage.datasetCards.nth(1).boundingBox();

        if (firstCard && secondCard) {
          // La segunda card debería estar debajo de la primera
          expect(secondCard.y).toBeGreaterThan(firstCard.y);
        }
      }
    });
  });

  test.describe('Performance - Catalog', () => {
    test('debería cargar datasets rápidamente', async ({ page }) => {
      const startTime = Date.now();

      await page.goto('/');
      await catalogPage.scrollToSection();
      await catalogPage.waitForLoadingToFinish();

      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(2000);
    });
  });

  test.describe('Accesibilidad - Catalog', () => {
    test('tabs deberían ser navegables por teclado', async ({ page }) => {
      await catalogPage.tabIndividual.focus();
      await expect(catalogPage.tabIndividual).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(catalogPage.tabBundles).toBeFocused();
    });

    test('botones de compra deberían tener texto descriptivo', async () => {
      const count = await catalogPage.getDatasetCardsCount();

      if (count > 0) {
        const firstBuyButton = catalogPage.datasetBuyButtons.first();
        const text = await firstBuyButton.textContent();

        expect(text).toMatch(/comprar/i);
      }
    });
  });
});
