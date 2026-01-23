'use client'

interface DatasetCardProps {
  title: string
  description: string
  price_mxn: number
  records_count: number
  category: string
}

export default function DatasetCard({
  title,
  description,
  price_mxn,
  records_count,
  category,
}: DatasetCardProps) {
  const formatPrice = (price: number): string => {
    return `$${price.toLocaleString('es-MX')}`
  }

  const formatRecords = (count: number): string => {
    return `${count.toLocaleString('es-MX')} registros`
  }

  return (
    <div className="group relative backdrop-blur-sm bg-white/90 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col border border-white/20">
      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 via-transparent to-emerald-500/10 pointer-events-none" />

      {/* Badge de categoría con gradiente */}
      <span className="absolute top-4 right-4 px-4 py-1.5 text-xs font-semibold bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full shadow-lg shadow-blue-500/25">
        {category}
      </span>

      {/* Título */}
      <h3 className="text-xl font-bold tracking-tight text-slate-900 pr-24 mb-3">
        {title}
      </h3>

      {/* Descripción */}
      <p className="text-slate-600 text-sm leading-relaxed mb-5 line-clamp-2 flex-grow">
        {description}
      </p>

      {/* Cantidad de registros con icono */}
      <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
        {formatRecords(records_count)}
      </div>

      {/* Precio prominente */}
      <div className="mb-5">
        <p className="text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
          {formatPrice(price_mxn)}
          <span className="text-lg font-medium text-slate-400 ml-2">MXN</span>
        </p>
      </div>

      {/* Botón de compra con gradiente */}
      <button
        type="button"
        className="w-full py-3 px-6 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
      >
        Comprar ahora
      </button>
    </div>
  )
}
