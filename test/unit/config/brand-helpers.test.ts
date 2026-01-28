/**
 * Tests Unitarios - Brand Config Helper Functions
 *
 * Valida las funciones auxiliares de brand.config.ts:
 * - getPrimaryColor
 * - getSecondaryColor
 * - getCtaColor
 * - formatPrice
 * - getAvailableSpots
 */

import { describe, it, expect } from 'vitest';
import {
  getPrimaryColor,
  getSecondaryColor,
  getCtaColor,
  formatPrice,
  getAvailableSpots,
  brandConfig,
} from '@/lib/config/brand.config';

describe('Brand Config - Helper Functions', () => {
  describe('getPrimaryColor()', () => {
    it('debería retornar el color Teal mint (#00D4AA)', () => {
      const color = getPrimaryColor();
      expect(color).toBe('#00D4AA');
    });

    it('debería coincidir con cyan[500] del config', () => {
      const color = getPrimaryColor();
      expect(color).toBe(brandConfig.colors.brand.cyan[500]);
    });
  });

  describe('getSecondaryColor()', () => {
    it('debería retornar el color Azure/Cobalt (#0066CC)', () => {
      const color = getSecondaryColor();
      expect(color).toBe('#0066CC');
    });

    it('debería coincidir con blue[500] del config', () => {
      const color = getSecondaryColor();
      expect(color).toBe(brandConfig.colors.brand.blue[500]);
    });
  });

  describe('getCtaColor()', () => {
    it('debería retornar el color Coral (#FF8C73)', () => {
      const color = getCtaColor();
      expect(color).toBe('#FF8C73');
    });

    it('debería coincidir con coral[500] del config', () => {
      const color = getCtaColor();
      expect(color).toBe(brandConfig.colors.brand.coral[500]);
    });
  });

  describe('formatPrice()', () => {
    it('debería formatear precio básico con moneda MXN', () => {
      const formatted = formatPrice(145);
      expect(formatted).toContain('145');
      expect(formatted).toContain('MXN');
    });

    it('debería formatear precios con separador de miles', () => {
      const formatted = formatPrice(1000);
      expect(formatted).toMatch(/1[,\s]000/); // Acepta , o espacio como separador
    });

    it('debería incluir símbolo de peso', () => {
      const formatted = formatPrice(665);
      expect(formatted).toContain('$');
    });

    it('debería NO incluir "+ IVA" cuando taxIncluded es true', () => {
      const formatted = formatPrice(145);
      expect(formatted).not.toContain('+ IVA');
    });

    it('debería formatear correctamente los precios del config', () => {
      const rfcPrice = formatPrice(brandConfig.pricing.datasets.rfc);
      expect(rfcPrice).toContain('145');

      const bundlePrice = formatPrice(brandConfig.pricing.bundles.bundle);
      expect(bundlePrice).toContain('665');
    });

    it('debería manejar precio 0', () => {
      const formatted = formatPrice(0);
      expect(formatted).toContain('0');
      expect(formatted).toContain('MXN');
    });

    it('debería manejar precios grandes', () => {
      const formatted = formatPrice(999999);
      expect(formatted).toBeTruthy();
      expect(formatted).toContain('MXN');
    });
  });

  describe('getAvailableSpots()', () => {
    it('debería retornar 5 spots para tier "single"', () => {
      const spots = getAvailableSpots('single');
      expect(spots).toBe(5);
    });

    it('debería retornar 3 spots para tier "bundle"', () => {
      const spots = getAvailableSpots('bundle');
      expect(spots).toBe(3);
    });

    it('debería retornar 2 spots para tier "allAccess"', () => {
      const spots = getAvailableSpots('allAccess');
      expect(spots).toBe(2);
    });

    it('debería coincidir con los valores del config', () => {
      expect(getAvailableSpots('single')).toBe(brandConfig.limits.availableSpots.single);
      expect(getAvailableSpots('bundle')).toBe(brandConfig.limits.availableSpots.bundle);
      expect(getAvailableSpots('allAccess')).toBe(
        brandConfig.limits.availableSpots.allAccess
      );
    });
  });

  describe('brandConfig - Estructura y Valores', () => {
    it('debería tener todas las secciones principales', () => {
      expect(brandConfig).toHaveProperty('site');
      expect(brandConfig).toHaveProperty('limits');
      expect(brandConfig).toHaveProperty('pricing');
      expect(brandConfig).toHaveProperty('colors');
      expect(brandConfig).toHaveProperty('typography');
      expect(brandConfig).toHaveProperty('patterns');
    });

    it('debería tener información del sitio completa', () => {
      expect(brandConfig.site.name).toBe('TestForge');
      expect(brandConfig.site.tagline).toBeTruthy();
      expect(brandConfig.site.url).toBeTruthy();
      expect(brandConfig.site.contact.support).toContain('@');
    });

    it('debería tener precios válidos (números positivos)', () => {
      expect(brandConfig.pricing.datasets.rfc).toBeGreaterThan(0);
      expect(brandConfig.pricing.datasets.curp).toBeGreaterThan(0);
      expect(brandConfig.pricing.bundles.bundle).toBeGreaterThan(0);
    });

    it('debería tener límites de negocio configurados', () => {
      expect(brandConfig.limits.freeTestGenerations).toBeGreaterThan(0);
      expect(brandConfig.limits.testGenerationTimeout).toBeGreaterThan(0);
    });

    it('debería tener paleta de colores completa', () => {
      const { cyan, blue, coral } = brandConfig.colors.brand;

      // Validar que tengan todas las tonalidades
      [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].forEach((shade) => {
        expect(cyan[shade as keyof typeof cyan]).toBeTruthy();
        expect(blue[shade as keyof typeof blue]).toBeTruthy();
        expect(coral[shade as keyof typeof coral]).toBeTruthy();
      });
    });

    it('debería tener colores en formato hexadecimal válido', () => {
      const hexRegex = /^#[0-9A-F]{6}$/i;

      expect(getPrimaryColor()).toMatch(hexRegex);
      expect(getSecondaryColor()).toMatch(hexRegex);
      expect(getCtaColor()).toMatch(hexRegex);
    });

    it('debería tener tipografía configurada', () => {
      expect(brandConfig.typography.fontFamily.sans).toContain('font-inter');
      expect(brandConfig.typography.fontFamily.mono).toContain('jetbrains');
    });

    it('debería tener patrones de UI configurados', () => {
      expect(brandConfig.patterns.hero.badge.type).toBe('social-proof');
      expect(brandConfig.patterns.pricing.tiers).toBe(3);
      expect(brandConfig.patterns.testimonials.type).toBe('carousel');
    });
  });

  describe('Consistencia de Configuración', () => {
    it('debería tener moneda consistente en todo el config', () => {
      expect(brandConfig.pricing.currency).toBe('MXN');
    });

    it('debería tener bundle más barato o similar a la suma de productos individuales', () => {
      const { rfc, curp, direcciones } = brandConfig.pricing.datasets;
      const totalIndividual = rfc + curp + direcciones;
      const bundlePrice = brandConfig.pricing.bundles.bundle;

      // El bundle debería dar descuento o ser competitivo
      expect(bundlePrice).toBeLessThanOrEqual(totalIndividual + 200); // Margen razonable
    });

    it('debería tener spots disponibles en orden descendente (single > bundle > allAccess)', () => {
      const { single, bundle, allAccess } = brandConfig.limits.availableSpots;

      expect(single).toBeGreaterThan(bundle);
      expect(bundle).toBeGreaterThan(allAccess);
    });

    it('debería tener timeouts razonables', () => {
      const timeout = brandConfig.limits.testGenerationTimeout;

      // Timeout entre 30 y 300 segundos
      expect(timeout).toBeGreaterThanOrEqual(30);
      expect(timeout).toBeLessThanOrEqual(300);
    });
  });
});
