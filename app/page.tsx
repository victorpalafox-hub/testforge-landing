import { supabase } from '@/lib/supabase/client';
import { Hero } from '@/components/home';
import { BRAND } from '@/lib/config/brand';
import { CONTENT } from '@/lib/config/content';
import { BenefitIcon } from '@/components/ui/BenefitIcon';
import { CatalogSection } from '@/components/products/CatalogSection';

export default async function Home() {
  const { data: datasets, error } = await supabase
    .from('datasets')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-slate-950">
      {/* ========================================
          HERO SECTION - Nuevo componente dark theme
          ======================================== */}
      <Hero />

      <div className="space-y-24 pb-24">
        {/* ========================================
            BENEFITS SECTION
            ======================================== */}
        <section className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONTENT.benefits.map((benefit) => (
              <div
                key={benefit.id}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-300"
              >
                {/* Icon container */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
                  <BenefitIcon icon={benefit.icon} className="w-6 h-6 text-cyan-400" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold tracking-tight text-white mb-2">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
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
  );
}
