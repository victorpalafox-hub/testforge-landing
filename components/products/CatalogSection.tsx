'use client'

import { useState } from 'react'
import { Package } from 'lucide-react'
import { CONTENT } from '@/lib/config/content'
import DatasetCard from '@/components/datasets/DatasetCard'
import { ProductTabs, type ProductTabType } from './ProductTabs'

// ============================================
// TIPOS
// ============================================

interface Dataset {
  id: string
  title: string
  description: string
  price_mxn: number
  records_count: number
  category: string
}

export interface CatalogSectionProps {
  /** Datasets a mostrar */
  datasets: Dataset[] | null
  /** Si hubo error al cargar */
  error: boolean
}

// ============================================
// COMPONENTE
// ============================================

export function CatalogSection({ datasets, error }: CatalogSectionProps) {
  const [activeTab, setActiveTab] = useState<ProductTabType>('individual')

  const handleTabChange = (tab: ProductTabType) => {
    setActiveTab(tab)
  }

  // Determinar título y subtítulo según tab activo
  const title = activeTab === 'individual'
    ? CONTENT.catalog.title
    : CONTENT.catalog.titleBundles

  const subtitle = activeTab === 'individual'
    ? CONTENT.catalog.subtitle
    : CONTENT.catalog.subtitleBundles

  return (
    <section id="catalogo" className="max-w-7xl mx-auto px-8 pb-24">
      {/* Section header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
          {title}
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
          {subtitle}
        </p>

        {/* Tabs */}
        <ProductTabs onTabChange={handleTabChange} defaultTab="individual" />
      </div>

      {/* Contenido según tab */}
      {activeTab === 'individual' ? (
        // Tab Individual: mostrar datasets
        <>
          {error ? (
            <div className="text-center py-12">
              <div className="backdrop-blur-sm bg-red-50/90 border border-red-200 rounded-2xl p-8 max-w-md mx-auto shadow-xl">
                <p className="text-red-600 font-medium">
                  {CONTENT.catalog.errorMessage}
                </p>
              </div>
            </div>
          ) : !datasets || datasets.length === 0 ? (
            <div className="text-center py-12">
              <div className="backdrop-blur-sm bg-white/90 border border-slate-200/50 rounded-2xl p-10 max-w-md mx-auto shadow-xl">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
                <p className="text-slate-700 text-lg font-medium">
                  {CONTENT.catalog.emptyTitle}
                </p>
                <p className="text-slate-500 text-sm mt-2">
                  {CONTENT.catalog.emptySubtitle}
                </p>
              </div>
            </div>
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
        // Tab Bundles: mostrar coming soon
        <div className="text-center py-16">
          <div className="backdrop-blur-sm bg-gradient-to-br from-blue-50/90 to-emerald-50/90 border border-blue-200/50 rounded-2xl p-12 max-w-lg mx-auto shadow-xl">
            {/* Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Package className="w-10 h-10 text-white" />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-3">
              {CONTENT.catalog.comingSoon}
            </h3>

            {/* Description */}
            <p className="text-slate-600 leading-relaxed">
              {CONTENT.catalog.comingSoonSubtitle}
            </p>

            {/* Decorative badge */}
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full border border-slate-200/50">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium text-slate-600">
                En desarrollo
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
