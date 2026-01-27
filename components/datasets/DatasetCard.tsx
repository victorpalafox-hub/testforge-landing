'use client';

interface DatasetCardProps {
  title: string;
  description: string;
  price_mxn: number;
  records_count: number;
  category: string;
}

export default function DatasetCard({
  title,
  description,
  price_mxn,
  records_count,
  category,
}: DatasetCardProps) {
  const formatPrice = (price: number): string => {
    return `$${price.toLocaleString('es-MX')}`;
  };

  const formatRecords = (count: number): string => {
    return `${count.toLocaleString('es-MX')} registros`;
  };

  return (
    <div className="group relative backdrop-blur-sm bg-slate-900/60 rounded-2xl p-6 shadow-lg hover:shadow-[0_20px_50px_rgba(0,71,171,0.2)] transition-all duration-500 hover:-translate-y-1 flex flex-col border border-white/10 hover:border-blue-600/30">
      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-500/10 pointer-events-none" />

      {/* Badge de categoría */}
      <span className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold bg-blue-600 text-white rounded-full shadow-md">
        {category}
      </span>

      {/* Título */}
      <h3 className="text-xl font-semibold tracking-tight text-white pr-24 mb-3">{title}</h3>

      {/* Descripción */}
      <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-2 flex-grow">
        {description}
      </p>

      {/* Cantidad de registros con icono */}
      <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
          />
        </svg>
        {formatRecords(records_count)}
      </div>

      {/* Precio prominente */}
      <div className="mb-5">
        <p className="text-3xl font-bold tracking-tight text-cyan-500">
          {formatPrice(price_mxn)}
          <span className="text-lg font-medium text-slate-500 ml-2">MXN</span>
        </p>
      </div>

      {/* Botón de compra - Coral */}
      <button
        type="button"
        className="w-full py-3 px-6 bg-[#FF8C73] hover:bg-[#FF6B6B] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-[0_0_40px_rgba(255,140,115,0.4)] hover:-translate-y-0.5"
      >
        Comprar ahora
      </button>
    </div>
  );
}
