'use client'

import { BRAND } from '@/lib/config/brand'
import { CONTENT } from '@/lib/config/content'

export default function Header() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Solo manejar anchors (enlaces internos con #)
    if (href.startsWith('#')) {
      e.preventDefault()
      const targetId = href.slice(1)
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <header className={BRAND.styles.header.container}>
      <div className={BRAND.styles.header.inner}>
        {/* Logo / Brand Name */}
        <a href="/" className={BRAND.styles.header.logo}>
          {CONTENT.header.brandName}
        </a>

        {/* Navigation */}
        <nav className={BRAND.styles.header.nav}>
          {CONTENT.header.navigation.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={BRAND.styles.header.link}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
