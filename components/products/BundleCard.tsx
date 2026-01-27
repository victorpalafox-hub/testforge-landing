'use client';

import { Check } from 'lucide-react';

// ============================================
// TIPOS
// ============================================

export interface BundleCardProps {
  id: string;
  title: string;
  description: string;
  price_mxn: number;
  original_price_mxn: number;
  discount_percentage: number;
  ideal_for: string;
  included_datasets: string[];
}

// ============================================
// COMPONENTE
// ============================================

export default function BundleCard({
  title,
  description,
  price_mxn,
  original_price_mxn,
  discount_percentage,
  ideal_for,
  included_datasets,
}: BundleCardProps) {
  const formatPrice = (price: number): string => {
    return `$${price.toLocaleString('es-MX')}`;
  };

  return (
    <div className="group relative backdrop-blur-md bg-slate-900/80 rounded-2xl p-6 shadow-xl hover:shadow-[0_25px_60px_rgba(0,71,171,0.25)] transition-all duration-500 hover:scale-[1.02] flex flex-col border border-white/10 hover:border-blue-600/30">
      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-500/10 pointer-events-none" />

      {/* Badge de descuento - Coral */}
      <span className="absolute top-4 right-4 px-3 py-1 text-xs font-bold bg-[#FF8C73] text-white rounded-full shadow-md">
        AHORRA {discount_percentage}%
      </span>

      {/* Título */}
      <h3 className="text-xl font-semibold tracking-tight text-white pr-24 mb-2">{title}</h3>

      {/* Ideal para */}
      <p className="text-sm text-cyan-500 font-medium mb-3">{ideal_for}</p>

      {/* Descripción */}
      <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">{description}</p>

      {/* Datasets incluidos */}
      <div className="mb-5 flex-grow">
        <p className="text-sm font-semibold text-slate-300 mb-2">Incluye:</p>
        <ul className="space-y-1.5">
          {included_datasets.map((dataset) => (
            <li key={dataset} className="flex items-center gap-2 text-sm text-slate-400">
              <Check className="w-4 h-4 text-cyan-500 flex-shrink-0" />
              <span className="line-clamp-1">{dataset}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Precios */}
      <div className="mb-5">
        <p className="text-lg text-slate-500 line-through">{formatPrice(original_price_mxn)} MXN</p>
        <p className="text-4xl font-bold tracking-tight text-cyan-500">
          {formatPrice(price_mxn)}
          <span className="text-lg font-medium text-slate-500 ml-2">MXN</span>
        </p>
      </div>

      {/* Botón de compra - Coral */}
      <button
        type="button"
        className="w-full py-3 px-6 bg-[#FF8C73] hover:bg-[#FF6B6B] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-[0_0_40px_rgba(255,140,115,0.4)] hover:-translate-y-0.5"
      >
        Comprar paquete
      </button>
    </div>
  );
}
