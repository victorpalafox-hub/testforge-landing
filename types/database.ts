// =============================================
// TIPOS DE BASE DE DATOS - SUPABASE
// =============================================

// Tipo para la tabla: datasets
export type Dataset = {
  id: string
  slug: string
  title: string
  description: string
  category: 'identity' | 'financial' | 'ecommerce' | 'geographic' | 'healthcare'
  records_count: number
  price_mxn: number  // ✅ En pesos mexicanos
  file_formats: string[]
  sample_file_url: string | null
  is_published: boolean
  downloads_count: number
  created_at: string
  updated_at: string
}

// Tipo para la tabla: purchases
export type Purchase = {
  id: string
  user_id: string
  dataset_id: string
  stripe_payment_intent_id: string
  amount_mxn: number  // ✅ En pesos mexicanos
  download_token: string
  download_count: number
  max_downloads: number
  status: 'pending' | 'completed' | 'refunded'
  created_at: string
  updated_at: string
}

// =============================================
// TIPOS AUXILIARES
// =============================================

// Dataset con información de compra (para el dashboard del usuario)
export type DatasetWithPurchase = Dataset & {
  purchase?: Purchase
}

// Tipo para insertar un nuevo dataset (sin campos auto-generados)
export type DatasetInsert = Omit<Dataset, 'id' | 'created_at' | 'updated_at' | 'downloads_count'>

// Tipo para actualizar un dataset (todos los campos opcionales excepto id)
export type DatasetUpdate = Partial<Omit<Dataset, 'id' | 'created_at' | 'updated_at'>>

// Tipo para la tabla: bundles
export type Bundle = {
  id: string
  slug: string
  title: string
  description: string
  price_mxn: number
  original_price_mxn: number
  discount_percentage: number
  ideal_for: string
  is_published: boolean
  created_at: string
  updated_at: string
}

// Tipo para la tabla: bundle_datasets (relación many-to-many)
export type BundleDataset = {
  id: string
  bundle_id: string
  dataset_id: string
  created_at: string
}

// Bundle con datasets incluidos (para mostrar en UI)
export type BundleWithDatasets = Bundle & {
  included_datasets: Pick<Dataset, 'id' | 'title'>[]
}