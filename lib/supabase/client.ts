import { createClient } from '@supabase/supabase-js';
import { env } from '@/lib/config/env.config';

/**
 * Cliente de Supabase para operaciones del lado del cliente.
 *
 * Usa la clave ANON (pública) que es segura para exponer al browser.
 * Las variables de entorno ya están validadas por env.config.ts.
 *
 * USO:
 * ```typescript
 * import { supabase } from '@/lib/supabase/client';
 *
 * const { data, error } = await supabase
 *   .from('datasets')
 *   .select('*');
 * ```
 */
export const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
