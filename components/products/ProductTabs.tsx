'use client';

import { useState } from 'react';
import { BRAND } from '@/lib/config/brand';
import { CONTENT } from '@/lib/config/content';

// ============================================
// TIPOS
// ============================================

/** Tipos de tabs disponibles */
export type ProductTabType = 'individual' | 'bundles';

/** Props del componente ProductTabs */
export interface ProductTabsProps {
  /** Callback cuando cambia el tab activo */
  onTabChange: (tab: ProductTabType) => void;
  /** Tab inicial seleccionado */
  defaultTab?: ProductTabType;
}

// ============================================
// COMPONENTE
// ============================================

/**
 * Componente de tabs para filtrar productos
 *
 * Uso:
 * ```tsx
 * <ProductTabs onTabChange={(tab) => setActiveTab(tab)} />
 * ```
 */
export function ProductTabs({ onTabChange, defaultTab = 'individual' }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<ProductTabType>(defaultTab);

  const handleTabChange = (tab: ProductTabType) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  const tabs: { key: ProductTabType; label: string }[] = [
    { key: 'individual', label: CONTENT.tabs.individual.label },
    { key: 'bundles', label: CONTENT.tabs.bundles.label },
  ];

  return (
    <div className="inline-flex items-center gap-2 p-1 bg-slate-900/60 backdrop-blur-sm rounded-xl border border-white/10">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => handleTabChange(tab.key)}
          className={`
            px-6 py-2.5 rounded-lg font-medium text-sm
            transition-all duration-300 ease-out
            ${activeTab === tab.key
              ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
              : 'bg-transparent text-slate-400 hover:bg-white/5 hover:text-slate-300'}
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
