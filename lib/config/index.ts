/**
 * Punto de entrada para toda la configuración
 *
 * Uso:
 * ```ts
 * import { BRAND, CONTENT } from '@/lib/config'
 * ```
 */

export { BRAND, brandColors } from './brand'
export type { BrandConfig, BrandColors, BrandStyles, TabStyles, HeaderStyles, FooterStyles } from './brand'

export { CONTENT, HEADER, HERO, BENEFITS, TABS, CATALOG, WHY_US, CTA, FOOTER } from './content'
export type { HeaderContent, NavLink, HeroContent, Benefit, WhyUsItem, TabContent, TabsConfig, CatalogContent, FooterContent, FooterLink, ContentConfig } from './content'
