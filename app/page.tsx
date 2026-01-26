import { supabase } from '@/lib/supabase/client'
import { Download } from 'lucide-react'
import { BRAND } from '@/lib/config/brand'
import { CONTENT } from '@/lib/config/content'
import { BenefitIcon } from '@/components/ui/BenefitIcon'
import { CatalogSection } from '@/components/products/CatalogSection'

export default async function Home() {
  const { data: datasets, error } = await supabase
    .from('datasets')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 font-sans">
      <div className="space-y-24">
        {/* ========================================
            HERO SECTION
            ======================================== */}
        <section className="relative py-24 overflow-hidden">
          {/* Grid pattern background */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Decorative gradient orbs */}
          <div
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: BRAND.colors.accent }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: BRAND.colors.secondary }}
          />

          <div className="relative max-w-7xl mx-auto px-8">
            <div className="text-center max-w-4xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-8">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-medium text-slate-600">
                  {BRAND.tagline}
                </span>
              </div>

              {/* Title with gradient */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
                <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-emerald-600 bg-clip-text text-transparent">
                  {CONTENT.hero.title}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-12 max-w-3xl mx-auto">
                {CONTENT.hero.subtitle}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {CONTENT.hero.buttons.map((button, index) => (
                  <a
                    key={index}
                    href={button.href}
                    download={button.download ? true : undefined}
                    className={`w-full sm:w-auto px-8 py-4 font-semibold rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 ${
                      button.variant === 'primary'
                        ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5'
                        : button.variant === 'outline'
                        ? 'bg-white hover:bg-emerald-50 text-emerald-600 border-2 border-emerald-500 hover:border-emerald-600 shadow-sm'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    {button.download && <Download className="w-5 h-5" />}
                    {button.text}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================
            BENEFITS SECTION
            ======================================== */}
        <section className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONTENT.benefits.map((benefit, index) => (
              <div
                key={index}
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-300"
              >
                {/* Icon container */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${BRAND.colors.accent}15, ${BRAND.colors.secondary}15)`,
                  }}
                >
                  <BenefitIcon
                    icon={benefit.icon}
                    className="w-6 h-6 text-blue-600"
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold tracking-tight text-slate-900 mb-2">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================
            CATALOG SECTION
            ======================================== */}
        <CatalogSection datasets={datasets} error={!!error} />
      </div>
    </div>
  )
}
