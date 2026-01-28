/**
 * Page Object - HomePage
 *
 * Representa la página principal de TestForge.
 * Incluye Hero, Benefits, y Catalog sections.
 */

import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  // Hero Section Locators
  readonly heroSection: Locator;
  readonly heroBadge: Locator;
  readonly heroTitle: Locator;
  readonly heroSubtitle: Locator;
  readonly heroPrimaryCta: Locator;
  readonly heroSecondaryCta: Locator;
  readonly heroDownloadCta: Locator;

  // Hero Stats Locators
  readonly statDatasets: Locator;
  readonly statTests: Locator;
  readonly statTeams: Locator;
  readonly statPrecision: Locator;

  // Benefits Section Locators
  readonly benefitsSection: Locator;
  readonly benefitCards: Locator;

  // Catalog Section Locators
  readonly catalogSection: Locator;
  readonly catalogTitle: Locator;
  readonly catalogTabs: Locator;
  readonly datasetCards: Locator;

  constructor(page: Page) {
    this.page = page;

    // Hero Section
    this.heroSection = page.locator('section').first();
    this.heroBadge = page.getByText(/pruebas ejecutadas/i);
    this.heroTitle = page.getByRole('heading', { level: 1 });
    this.heroSubtitle = page.getByText(/datos reales de empresas mexicanas/i);
    this.heroPrimaryCta = page.getByRole('button', { name: /empezar gratis/i });
    this.heroSecondaryCta = page.getByRole('button', { name: /ver datasets/i });
    this.heroDownloadCta = page.getByRole('link', { name: /descargar muestra/i });

    // Hero Stats
    this.statDatasets = page.getByText(/datasets premium/i).locator('..');
    this.statTests = page.getByText(/tests generados/i).locator('..');
    this.statTeams = page.getByText(/equipos qa/i).locator('..');
    this.statPrecision = page.getByText(/precisión/i).locator('..');

    // Benefits Section
    this.benefitsSection = page.locator('section').nth(1);
    this.benefitCards = page.locator('[class*="grid"]').locator('> div').filter({
      hasText: /datos verificados|compra segura|descarga inmediata|actualizaciones/i,
    });

    // Catalog Section
    this.catalogSection = page.locator('#catalogo, section').filter({
      hasText: /explora nuestro catálogo|datasets|paquetes/i,
    });
    this.catalogTitle = page.getByRole('heading', { name: /explora nuestro catálogo/i });
    this.catalogTabs = page.locator('button').filter({
      hasText: /individual|paquetes/i,
    });
    this.datasetCards = page.locator('[class*="card"]').filter({
      has: page.getByRole('button', { name: /comprar ahora/i }),
    });
  }

  /**
   * Navega a la página principal
   */
  async navigate(): Promise<void> {
    await this.page.goto('/');
  }

  /**
   * Verifica que el Hero está visible y correcto
   */
  async expectHeroToBeVisible(): Promise<void> {
    await expect(this.heroSection).toBeVisible();
    await expect(this.heroTitle).toBeVisible();
    await expect(this.heroSubtitle).toBeVisible();
    await expect(this.heroPrimaryCta).toBeVisible();
  }

  /**
   * Verifica que las 4 stats cards están visibles
   */
  async expectStatsToBeVisible(): Promise<void> {
    await expect(this.statDatasets).toBeVisible();
    await expect(this.statTests).toBeVisible();
    await expect(this.statTeams).toBeVisible();
    await expect(this.statPrecision).toBeVisible();
  }

  /**
   * Click en el CTA principal del Hero
   */
  async clickPrimaryCta(): Promise<void> {
    await this.heroPrimaryCta.click();
  }

  /**
   * Click en el CTA secundario del Hero
   */
  async clickSecondaryCta(): Promise<void> {
    await this.heroSecondaryCta.click();
  }

  /**
   * Click en el botón de descarga de muestra
   */
  async clickDownloadCta(): Promise<void> {
    await this.heroDownloadCta.click();
  }

  /**
   * Verifica que la sección de Benefits está visible
   */
  async expectBenefitsToBeVisible(): Promise<void> {
    await expect(this.benefitsSection).toBeVisible();
  }

  /**
   * Cuenta el número de benefit cards visibles
   */
  async getBenefitCardsCount(): Promise<number> {
    return await this.benefitCards.count();
  }

  /**
   * Verifica que hay exactamente N benefit cards
   */
  async expectBenefitCardsCount(count: number): Promise<void> {
    await expect(this.benefitCards).toHaveCount(count);
  }

  /**
   * Verifica que la sección de catálogo está visible
   */
  async expectCatalogToBeVisible(): Promise<void> {
    await expect(this.catalogSection).toBeVisible();
    await expect(this.catalogTitle).toBeVisible();
  }

  /**
   * Cuenta el número de dataset cards visibles
   */
  async getDatasetCardsCount(): Promise<number> {
    return await this.datasetCards.count();
  }

  /**
   * Click en un dataset card por índice
   */
  async clickDatasetCard(index: number): Promise<void> {
    await this.datasetCards.nth(index).click();
  }

  /**
   * Scroll a la sección de catálogo
   */
  async scrollToCatalog(): Promise<void> {
    await this.catalogSection.scrollIntoViewIfNeeded();
  }

  /**
   * Verifica que el Hero Title contiene texto específico
   */
  async expectHeroTitleToContain(text: string): Promise<void> {
    await expect(this.heroTitle).toContainText(text);
  }

  /**
   * Espera a que la página esté completamente cargada
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verifica que el badge social proof está visible
   */
  async expectSocialProofBadgeToBeVisible(): Promise<void> {
    await expect(this.heroBadge).toBeVisible();
  }

  /**
   * Obtiene el texto de una stat card específica
   */
  async getStatValue(statName: 'datasets' | 'tests' | 'teams' | 'precision'): Promise<string> {
    let locator: Locator;

    switch (statName) {
      case 'datasets':
        locator = this.statDatasets;
        break;
      case 'tests':
        locator = this.statTests;
        break;
      case 'teams':
        locator = this.statTeams;
        break;
      case 'precision':
        locator = this.statPrecision;
        break;
    }

    const text = await locator.textContent();
    return text || '';
  }

  /**
   * Verifica que todos los CTAs del Hero están habilitados
   */
  async expectCtasToBeEnabled(): Promise<void> {
    await expect(this.heroPrimaryCta).toBeEnabled();
    await expect(this.heroSecondaryCta).toBeEnabled();
  }

  /**
   * Scroll suave al Hero
   */
  async scrollToHero(): Promise<void> {
    await this.heroSection.scrollIntoViewIfNeeded();
  }

  /**
   * Toma screenshot de la sección Hero
   */
  async screenshotHero(): Promise<Buffer> {
    return await this.heroSection.screenshot();
  }

  /**
   * Verifica responsive: que el Hero esté visible en mobile
   */
  async expectHeroResponsive(): Promise<void> {
    await expect(this.heroSection).toBeVisible();
    await expect(this.heroTitle).toBeVisible();
    // En mobile, los CTAs pueden apilarse verticalmente
    await expect(this.heroPrimaryCta).toBeVisible();
  }
}
