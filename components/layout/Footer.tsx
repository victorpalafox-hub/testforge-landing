'use client';

import { BRAND } from '@/lib/config/brand';
import { CONTENT } from '@/lib/config/content';

export default function Footer() {
  return (
    <footer className={BRAND.styles.footer.container}>
      <div className={BRAND.styles.footer.inner}>
        {/* Grid de 3 columnas */}
        <div className={BRAND.styles.footer.grid}>
          {/* Sección: Sobre Nosotros */}
          <div className={BRAND.styles.footer.section}>
            <h3 className={BRAND.styles.footer.title}>{CONTENT.footer.about.title}</h3>
            <p className={BRAND.styles.footer.text}>{CONTENT.footer.about.description}</p>
          </div>

          {/* Sección: Enlaces */}
          <div className={BRAND.styles.footer.section}>
            <h3 className={BRAND.styles.footer.title}>{CONTENT.footer.links.title}</h3>
            <nav className="space-y-2">
              {CONTENT.footer.links.items.map((link) => (
                <a key={link.href} href={link.href} className={BRAND.styles.footer.link}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Sección: Contacto */}
          <div className={BRAND.styles.footer.section}>
            <h3 className={BRAND.styles.footer.title}>{CONTENT.footer.contact.title}</h3>
            <a href={`mailto:${CONTENT.footer.contact.email}`} className={BRAND.styles.footer.link}>
              {CONTENT.footer.contact.email}
            </a>
          </div>
        </div>

        {/* Copyright */}
        <p className={BRAND.styles.footer.copyright}>{CONTENT.footer.copyright}</p>
      </div>
    </footer>
  );
}
