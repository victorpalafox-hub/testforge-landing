'use client';

import { useState, useEffect } from 'react';
import { Package } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { CONTENT } from '@/lib/config/content';
import DatasetCard from '@/components/datasets/DatasetCard';
import BundleCard from './BundleCard';
import { ProductTabs, type ProductTabType } from './ProductTabs';

// ============================================
// TIPOS
// ============================================

interface Dataset {
  id: string;
  title: string;
  description: string;
  price_mxn: number;
  records_count: number;
  category: string;
}

interface Bundle {
  id: string;
  title: string;
  description: string;
  price_mxn: number;
  original_price_mxn: number;
  discount_percentage: number;
  ideal_for: string;
  included_datasets: string[];
}

interface BundleFromDB {
  id: string;
  title: string;
  description: string;
  price_mxn: number;
  original_price_mxn: number;
  discount_percentage: number;
  ideal_for: string;
  bundle_datasets: Array<{
    datasets: {
      title: string;
    } | null;
  }>;
}

export interface CatalogSectionProps {
  /** Datasets a mostrar */
  datasets: Dataset[] | null;
  /** Si hubo error al cargar */
  error: boolean;
}

// ============================================
// COMPONENTE
// ============================================

export function CatalogSection({ datasets, error }: CatalogSectionProps) {
  const [activeTab, setActiveTab] = useState<ProductTabType>('individual');
  const [bundles, setBundles] = useState<Bundle[] | null>(null);
  const [bundlesLoading, setBundlesLoading] = useState(false);
  const [bundlesError, setBundlesError] = useState(false);

  // Cargar bundles cuando se activa el tab
  useEffect(() => {
    if (activeTab === 'bundles' && bundles === null) {
      loadBundles();
    }
  }, [activeTab, bundles]);

  const loadBundles = async () => {
    setBundlesLoading(true);
    setBundlesError(false);

    try {
      const { data, error: queryError } = await supabase
        .from('bundles')
        .select(
          `
          id,
          title,
          description,
          price_mxn,
          original_price_mxn,
          discount_percentage,
          ideal_for,
          bundle_datasets(
            datasets(title)
          )
        `
        )
        .eq('is_published', true);

      if (queryError) {
        console.error('Error loading bundles:', queryError);
        setBundlesError(true);
        return;
      }

      // Transformar datos para extraer títulos de datasets
      const bundlesData = (data || []) as unknown as BundleFromDB[];
      const transformedBundles: Bundle[] = bundlesData.map((bundle) => ({
        id: bundle.id,
        title: bundle.title,
        description: bundle.description,
        price_mxn: bundle.price_mxn,
        original_price_mxn: bundle.original_price_mxn,
        discount_percentage: bundle.discount_percentage,
        ideal_for: bundle.ideal_for,
        included_datasets: bundle.bundle_datasets
          .filter(
            (bd): bd is typeof bd & { datasets: NonNullable<typeof bd.datasets> } =>
              bd.datasets !== null
          )
          .map((bd) => bd.datasets.title),
      }));

      setBundles(transformedBundles);
    } catch (err) {
      console.error('Error loading bundles:', err);
      setBundlesError(true);
    } finally {
      setBundlesLoading(false);
    }
  };

  const handleTabChange = (tab: ProductTabType) => {
    setActiveTab(tab);
  };

  // Determinar título y subtítulo según tab activo
  const title = activeTab === 'individual' ? CONTENT.catalog.title : CONTENT.catalog.titleBundles;

  const subtitle =
    activeTab === 'individual' ? CONTENT.catalog.subtitle : CONTENT.catalog.subtitleBundles;

  // Renderizar estado vacío
  const renderEmptyState = (message: string, submessage: string) => (
    <div className="text-center py-12">
      <div className="backdrop-blur-sm bg-slate-900/60 border border-white/10 rounded-2xl p-10 max-w-md mx-auto shadow-xl">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Package className="w-8 h-8 text-slate-400" />
        </div>
        <p className="text-white text-lg font-medium">{message}</p>
        <p className="text-slate-400 text-sm mt-2">{submessage}</p>
      </div>
    </div>
  );

  // Renderizar estado de error
  const renderErrorState = (message: string) => (
    <div className="text-center py-12">
      <div className="backdrop-blur-sm bg-red-500/10 border border-red-500/30 rounded-2xl p-8 max-w-md mx-auto shadow-xl">
        <p className="text-red-400 font-medium">{message}</p>
      </div>
    </div>
  );

  // Renderizar estado de carga
  const renderLoadingState = () => (
    <div className="text-center py-16">
      <div className="backdrop-blur-sm bg-slate-900/60 border border-white/10 rounded-2xl p-12 max-w-md mx-auto shadow-xl">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <Package className="w-8 h-8 text-cyan-500" />
        </div>
        <p className="text-slate-300 font-medium">{CONTENT.catalog.loadingBundles}</p>
      </div>
    </div>
  );

  return (
    <section id="catalogo" className="max-w-7xl mx-auto px-8 pb-24">
      {/* Section header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
          {title}
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">{subtitle}</p>

        {/* Tabs */}
        <ProductTabs onTabChange={handleTabChange} defaultTab="individual" />
      </div>

      {/* Contenido según tab */}
      {activeTab === 'individual' ? (
        // Tab Individual: mostrar datasets
        <>
          {error ? (
            renderErrorState(CONTENT.catalog.errorMessage)
          ) : !datasets || datasets.length === 0 ? (
            renderEmptyState(CONTENT.catalog.emptyTitle, CONTENT.catalog.emptySubtitle)
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {datasets.map((dataset) => (
                <DatasetCard
                  key={dataset.id}
                  title={dataset.title}
                  description={dataset.description}
                  price_mxn={dataset.price_mxn}
                  records_count={dataset.records_count}
                  category={dataset.category}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        // Tab Bundles: mostrar paquetes
        <>
          {bundlesLoading ? (
            renderLoadingState()
          ) : bundlesError ? (
            renderErrorState(CONTENT.catalog.errorMessageBundles)
          ) : !bundles || bundles.length === 0 ? (
            renderEmptyState(
              CONTENT.catalog.emptyBundlesTitle,
              CONTENT.catalog.emptyBundlesSubtitle
            )
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bundles.map((bundle) => (
                <BundleCard
                  key={bundle.id}
                  id={bundle.id}
                  title={bundle.title}
                  description={bundle.description}
                  price_mxn={bundle.price_mxn}
                  original_price_mxn={bundle.original_price_mxn}
                  discount_percentage={bundle.discount_percentage}
                  ideal_for={bundle.ideal_for}
                  included_datasets={bundle.included_datasets}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
