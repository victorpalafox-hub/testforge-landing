/**
 * Page Object - Catalog Section
 *
 * Representa la sección de catálogo de datasets (puede estar en Home o en página separada).
 * Maneja tabs, filtros, dataset cards.
 */

import { Page, Locator, expect } from '@playwright/test';

export class CatalogPage {
  readonly page: Page;

  // Section Locators
  readonly catalogSection: Locator;
  readonly catalogTitle: Locator;
  readonly catalogSubtitle: Locator;

  // Tabs Locators
  readonly tabIndividual: Locator;
  readonly tabBundles: Locator;
  readonly activeTab: Locator;

  // Dataset Cards Locators
  readonly datasetCards: Locator;
  readonly datasetTitles: Locator;
  readonly datasetPrices: Locator;
  readonly datasetBuyButtons: Locator;
  readonly datasetCategories: Locator;

  // Bundle Cards Locators
  readonly bundleCards: Locator;

  // Empty States
  readonly emptyState: Locator;
  readonly errorState: Locator;

  // Loading States
  readonly loadingSpinner: Locator;

  constructor(page: Page) {
    this.page = page;

    // Main Section
    this.catalogSection = page.locator('#catalogo, section').filter({
      hasText: /explora nuestro catálogo|datasets|paquetes/i,
    });
    this.catalogTitle = page.getByRole('heading', { name: /explora nuestro catálogo/i });
    this.catalogSubtitle = page.getByText(/datasets verificados y listos para usar/i);

    // Tabs
    this.tabIndividual = page.getByRole('button', { name: /individual/i });
    this.tabBundles = page.getByRole('button', { name: /paquetes/i });
    this.activeTab = page.locator('button[aria-selected="true"], button.active');

    // Dataset Cards
    this.datasetCards = page.locator('[data-testid="dataset-card"], [class*="dataset-card"]').or(
      page.locator('div').filter({
        has: page.getByRole('button', { name: /comprar ahora/i }),
      })
    );
    this.datasetTitles = this.datasetCards.locator('h3');
    this.datasetPrices = this.datasetCards.getByText(/\$\d+/);
    this.datasetBuyButtons = this.datasetCards.getByRole('button', { name: /comprar ahora/i });
    this.datasetCategories = this.datasetCards.locator('[class*="badge"], span').filter({
      hasText: /fiscal|identidad|geolocalización|demográficos|financiero/i,
    });

    // Bundle Cards
    this.bundleCards = page.locator('[data-testid="bundle-card"], [class*="bundle-card"]');

    // States
    this.emptyState = page.getByText(/no hay datasets disponibles|no hay paquetes/i);
    this.errorState = page.getByText(/error al cargar/i);
    this.loadingSpinner = page.locator('[data-testid="loading"], .spinner, [class*="loading"]');
  }

  /**
   * Navega directamente a la sección de catálogo (via anchor)
   */
  async navigate(): Promise<void> {
    await this.page.goto('/#catalogo');
  }

  /**
   * Verifica que la sección de catálogo está visible
   */
  async expectToBeVisible(): Promise<void> {
    await expect(this.catalogSection).toBeVisible();
    await expect(this.catalogTitle).toBeVisible();
  }

  /**
   * Click en el tab "Individual"
   */
  async clickTabIndividual(): Promise<void> {
    await this.tabIndividual.click();
  }

  /**
   * Click en el tab "Paquetes/Bundles"
   */
  async clickTabBundles(): Promise<void> {
    await this.tabBundles.click();
  }

  /**
   * Verifica que el tab Individual está activo
   */
  async expectIndividualTabToBeActive(): Promise<void> {
    await expect(this.tabIndividual).toHaveAttribute('aria-selected', 'true');
  }

  /**
   * Verifica que el tab Bundles está activo
   */
  async expectBundlesTabToBeActive(): Promise<void> {
    await expect(this.tabBundles).toHaveAttribute('aria-selected', 'true');
  }

  /**
   * Cuenta el número de dataset cards visibles
   */
  async getDatasetCardsCount(): Promise<number> {
    await this.datasetCards.first().waitFor({ timeout: 5000 }).catch(() => {});
    return await this.datasetCards.count();
  }

  /**
   * Verifica que hay al menos N dataset cards
   */
  async expectMinimumDatasetCards(min: number): Promise<void> {
    const count = await this.getDatasetCardsCount();
    expect(count).toBeGreaterThanOrEqual(min);
  }

  /**
   * Obtiene el título de un dataset por índice
   */
  async getDatasetTitle(index: number): Promise<string> {
    const title = await this.datasetTitles.nth(index).textContent();
    return title || '';
  }

  /**
   * Obtiene el precio de un dataset por índice
   */
  async getDatasetPrice(index: number): Promise<string> {
    const price = await this.datasetPrices.nth(index).textContent();
    return price || '';
  }

  /**
   * Click en el botón "Comprar ahora" de un dataset
   */
  async clickBuyButton(index: number): Promise<void> {
    await this.datasetBuyButtons.nth(index).click();
  }

  /**
   * Busca un dataset por título
   */
  async findDatasetByTitle(title: string): Promise<Locator> {
    return this.datasetCards.filter({ hasText: title });
  }

  /**
   * Verifica que un dataset con título específico está visible
   */
  async expectDatasetWithTitleToBeVisible(title: string): Promise<void> {
    const dataset = await this.findDatasetByTitle(title);
    await expect(dataset).toBeVisible();
  }

  /**
   * Verifica que el estado vacío está visible
   */
  async expectEmptyStateToBeVisible(): Promise<void> {
    await expect(this.emptyState).toBeVisible();
  }

  /**
   * Verifica que hay un estado de error
   */
  async expectErrorStateToBeVisible(): Promise<void> {
    await expect(this.errorState).toBeVisible();
  }

  /**
   * Espera a que termine la carga
   */
  async waitForLoadingToFinish(): Promise<void> {
    await this.loadingSpinner.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
  }

  /**
   * Filtra datasets por categoría
   */
  async filterByCategory(category: string): Promise<void> {
    // Si hubiera un filtro de categoría, se implementaría aquí
    // Por ahora, solo busca datasets con esa categoría visible
    const categoryBadge = this.catalogSection.getByText(category, { exact: true });
    await expect(categoryBadge.first()).toBeVisible();
  }

  /**
   * Verifica que todos los precios están en formato MXN
   */
  async expectAllPricesToBeInMXN(): Promise<void> {
    const count = await this.datasetPrices.count();

    for (let i = 0; i < count; i++) {
      const price = await this.datasetPrices.nth(i).textContent();
      expect(price).toMatch(/\$\d+/);
    }
  }

  /**
   * Verifica que todos los dataset cards tienen botón de compra
   */
  async expectAllCardsToHaveBuyButton(): Promise<void> {
    const cardsCount = await this.datasetCards.count();
    const buttonsCount = await this.datasetBuyButtons.count();

    expect(buttonsCount).toBe(cardsCount);
  }

  /**
   * Scroll a la sección de catálogo
   */
  async scrollToSection(): Promise<void> {
    await this.catalogSection.scrollIntoViewIfNeeded();
  }

  /**
   * Verifica que las tabs están visibles
   */
  async expectTabsToBeVisible(): Promise<void> {
    await expect(this.tabIndividual).toBeVisible();
    await expect(this.tabBundles).toBeVisible();
  }

  /**
   * Toma screenshot de la sección completa
   */
  async screenshotSection(): Promise<Buffer> {
    return await this.catalogSection.screenshot();
  }

  /**
   * Obtiene todas las categorías visibles
   */
  async getVisibleCategories(): Promise<string[]> {
    const count = await this.datasetCategories.count();
    const categories: string[] = [];

    for (let i = 0; i < count; i++) {
      const text = await this.datasetCategories.nth(i).textContent();
      if (text) categories.push(text.trim());
    }

    return [...new Set(categories)]; // Unique categories
  }

  /**
   * Verifica que un dataset específico tiene la categoría correcta
   */
  async expectDatasetToHaveCategory(datasetIndex: number, expectedCategory: string): Promise<void> {
    const card = this.datasetCards.nth(datasetIndex);
    const category = card.locator('[class*="badge"]');

    await expect(category).toContainText(expectedCategory);
  }
}
