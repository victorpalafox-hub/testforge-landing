/**
 * Punto de entrada para toda la configuración
 *
 * Uso:
 * ```ts
 * import { BRAND, CONTENT } from '@/lib/config'
 * ```
 */

export { BRAND, brandColors } from './brand'
export type { BrandConfig, BrandColors, BrandStyles, TabStyles } from './brand'

export { CONTENT, HERO, BENEFITS, TABS, CATALOG, WHY_US, CTA, FOOTER } from './content'
export type { HeroContent, Benefit, WhyUsItem, TabContent, TabsConfig, CatalogContent, ContentConfig } from './content'
