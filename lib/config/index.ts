/**
 * Punto de entrada para toda la configuración
 *
 * Uso:
 * ```ts
 * import { BRAND, CONTENT, brandConfig } from '@/lib/config'
 * ```
 */

export { BRAND, brandColors } from './brand';
export type {
  BrandConfig,
  BrandColors,
  BrandStyles,
  TabStyles,
  HeaderStyles,
  FooterStyles,
} from './brand';

// Sistema de diseño completo v2
export {
  brandConfig,
  getPrimaryColor,
  getSecondaryColor,
  formatPrice,
  getAvailableSpots,
} from './brand.config';
export type {
  BrandConfig as BrandConfigV2,
  BrandColors as BrandColorsV2,
  PricingConfig,
  LimitsConfig,
  PatternsConfig,
} from './brand.config';

export { CONTENT, HEADER, HERO, BENEFITS, TABS, CATALOG, WHY_US, CTA, FOOTER } from './content';
export type {
  HeaderContent,
  NavLink,
  HeroCTA,
  HeroContent,
  Benefit,
  WhyUsItem,
  TabContent,
  TabsConfig,
  CatalogContent,
  FooterContent,
  FooterLink,
  ContentConfig,
} from './content';
