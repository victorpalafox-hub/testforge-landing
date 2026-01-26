'use client'

import { Download } from 'lucide-react'
import { BRAND } from '@/lib/config/brand'
import { CONTENT } from '@/lib/config/content'

export default function Header() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isDownload?: boolean) => {
    // No interferir con descargas
    if (isDownload) return

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
              onClick={(e) => handleNavClick(e, link.href, link.download)}
              download={link.download ? true : undefined}
              className={`${link.download ? 'text-emerald-600 font-medium' : BRAND.styles.header.link} inline-flex items-center gap-1.5`}
            >
              {link.download && <Download className="w-4 h-4" />}
              {link.label}
              {link.badge && (
                <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-emerald-500 text-white rounded-full">
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
