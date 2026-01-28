import { supabase } from '@/lib/supabase/client';
import { Hero } from '@/components/home';
import { BRAND } from '@/lib/config/brand';
import { CONTENT } from '@/lib/config/content';
import { BenefitIcon } from '@/components/ui/BenefitIcon';
import { CatalogSection } from '@/components/products/CatalogSection';

export default async function Home() {
  let datasets = null;
  let error = null;

  try {
    const result = await supabase
      .from('datasets')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    datasets = result.data;
    error = result.error;
  } catch (e) {
    console.error('Error fetching datasets:', e);
    error = e;
  }

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
                className="group relative bg-slate-900/60 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-lg hover:border-blue-600/30 hover:bg-slate-900/80 transition-all duration-300"
              >
                {/* Icon container */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 bg-gradient-to-br from-blue-600/20 via-cyan-500/20 to-blue-500/20">
                  <BenefitIcon icon={benefit.icon} className="w-6 h-6 text-cyan-500" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold tracking-tight text-white mb-2">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed">{benefit.description}</p>
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
