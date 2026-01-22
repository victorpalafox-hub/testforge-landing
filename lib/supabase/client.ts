import { createClient } from '@supabase/supabase-js'
// Importa la función para crear el cliente de Supabase

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
// Lee la URL desde tu archivo .env.local
// El "!" le dice a TypeScript: "confía en mí, esta variable existe"

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// Lee la clave pública desde .env.local

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
// Crea y exporta el cliente de Supabase
// Ahora puedes importarlo en cualquier archivo con: import { supabase } from '@/lib/supabase/client'
