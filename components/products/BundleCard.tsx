'use client'

import { Check } from 'lucide-react'

// ============================================
// TIPOS
// ============================================

export interface BundleCardProps {
  id: string
  title: string
  description: string
  price_mxn: number
  original_price_mxn: number
  discount_percentage: number
  ideal_for: string
  included_datasets: string[]
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
    return `$${price.toLocaleString('es-MX')}`
  }

  return (
    <div className="group relative backdrop-blur-sm bg-white/90 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col border border-slate-200">
      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/10 via-transparent to-emerald-500/10 pointer-events-none" />

      {/* Badge de descuento */}
      <span className="absolute top-4 right-4 px-3 py-1 text-xs font-bold bg-amber-500 text-white rounded-full shadow-lg shadow-amber-500/25">
        AHORRA {discount_percentage}%
      </span>

      {/* Título */}
      <h3 className="text-xl font-bold tracking-tight text-slate-900 pr-24 mb-2">
        {title}
      </h3>

      {/* Ideal para */}
      <p className="text-sm text-blue-600 font-medium mb-3">
        {ideal_for}
      </p>

      {/* Descripción */}
      <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
        {description}
      </p>

      {/* Datasets incluidos */}
      <div className="mb-5 flex-grow">
        <p className="text-sm font-semibold text-slate-700 mb-2">Incluye:</p>
        <ul className="space-y-1.5">
          {included_datasets.map((dataset, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-slate-600">
              <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span className="line-clamp-1">{dataset}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Precios */}
      <div className="mb-5">
        <p className="text-lg text-slate-400 line-through">
          {formatPrice(original_price_mxn)} MXN
        </p>
        <p className="text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
          {formatPrice(price_mxn)}
          <span className="text-lg font-medium text-slate-400 ml-2">MXN</span>
        </p>
      </div>

      {/* Botón de compra */}
      <button
        type="button"
        className="w-full py-3 px-6 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
      >
        Comprar paquete
      </button>
    </div>
  )
}
