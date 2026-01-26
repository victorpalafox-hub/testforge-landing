/**
 * Sistema de validación de variables de entorno para TestForge
 *
 * FILOSOFÍA: Fail Fast
 * Si una variable falta o tiene formato incorrecto, la app falla
 * inmediatamente con un mensaje claro, nunca en runtime.
 *
 * USO:
 * import { env } from '@/lib/config/env.config';
 * console.log(env.NEXT_PUBLIC_SITE_URL); // Tipado y validado
 */

import { z } from 'zod';

// ═══════════════════════════════════════════════════════════════
// SCHEMA DE VALIDACIÓN
// ═══════════════════════════════════════════════════════════════

/**
 * Schema Zod para validar todas las variables de entorno.
 *
 * TIPOS DE VALIDACIÓN:
 * - z.string().url()          → Debe ser URL válida
 * - z.string().min(1)         → No puede estar vacía
 * - z.string().startsWith()   → Debe empezar con prefijo específico
 * - z.string().optional()     → Variable opcional
 * - z.enum()                  → Solo valores permitidos
 */
const envSchema = z.object({
  // ─────────────────────────────────────────────────────────────
  // Variables públicas (accesibles en cliente/browser)
  // NEXT_PUBLIC_* se exponen al bundle del cliente
  // ─────────────────────────────────────────────────────────────

  /** URL base del sitio (ej: http://localhost:3000 o https://testforge.com) */
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url({ message: 'NEXT_PUBLIC_SITE_URL debe ser una URL válida' })
    .default('http://localhost:3000'),

  /** URL del proyecto Supabase */
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .url({ message: 'NEXT_PUBLIC_SUPABASE_URL debe ser una URL válida' }),

  /** Clave anónima de Supabase (segura para exponer al cliente) */
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1, { message: 'NEXT_PUBLIC_SUPABASE_ANON_KEY es requerida' }),

  /** Clave pública de Stripe (pk_test_* o pk_live_*) */
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z
    .string()
    .startsWith('pk_', { message: 'STRIPE_PUBLISHABLE_KEY debe empezar con pk_' }),

  // ─────────────────────────────────────────────────────────────
  // Variables privadas (solo servidor - NUNCA exponer al cliente)
  // ─────────────────────────────────────────────────────────────

  /** Clave de servicio de Supabase (acceso admin, NUNCA exponer) */
  SUPABASE_SERVICE_ROLE_KEY: z
    .string()
    .min(1, { message: 'SUPABASE_SERVICE_ROLE_KEY es requerida' }),

  /** Clave secreta de Stripe (sk_test_* o sk_live_*) */
  STRIPE_SECRET_KEY: z
    .string()
    .startsWith('sk_', { message: 'STRIPE_SECRET_KEY debe empezar con sk_' }),

  /** Secreto de webhook de Stripe para verificar eventos */
  STRIPE_WEBHOOK_SECRET: z
    .string()
    .startsWith('whsec_', { message: 'STRIPE_WEBHOOK_SECRET debe empezar con whsec_' })
    .optional(),

  /** API Key de Resend para envío de emails */
  RESEND_API_KEY: z
    .string()
    .startsWith('re_', { message: 'RESEND_API_KEY debe empezar con re_' })
    .optional(),

  // ─────────────────────────────────────────────────────────────
  // Variables opcionales (Fase 3: Generador de Tests con AI)
  // ─────────────────────────────────────────────────────────────

  /** API Key de OpenAI (opcional, para generación de tests) */
  OPENAI_API_KEY: z
    .string()
    .startsWith('sk-', { message: 'OPENAI_API_KEY debe empezar con sk-' })
    .optional(),

  /** API Key de Anthropic/Claude (opcional, para generación de tests) */
  ANTHROPIC_API_KEY: z
    .string()
    .startsWith('sk-ant-', { message: 'ANTHROPIC_API_KEY debe empezar con sk-ant-' })
    .optional(),

  // ─────────────────────────────────────────────────────────────
  // Entorno de Node
  // ─────────────────────────────────────────────────────────────

  /** Entorno de ejecución */
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

// ═══════════════════════════════════════════════════════════════
// TIPOS EXPORTADOS
// ═══════════════════════════════════════════════════════════════

/** Tipo inferido del schema de variables de entorno */
export type Env = z.infer<typeof envSchema>;

/** Variables públicas (seguras para cliente) */
export type PublicEnv = Pick<
  Env,
  | 'NEXT_PUBLIC_SITE_URL'
  | 'NEXT_PUBLIC_SUPABASE_URL'
  | 'NEXT_PUBLIC_SUPABASE_ANON_KEY'
  | 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'
>;

// ═══════════════════════════════════════════════════════════════
// FUNCIÓN DE VALIDACIÓN
// ═══════════════════════════════════════════════════════════════

/**
 * Valida todas las variables de entorno contra el schema.
 *
 * COMPORTAMIENTO:
 * - Si todas las variables son válidas: retorna objeto tipado
 * - Si alguna falla: lanza error con detalles específicos
 *
 * @throws {Error} Si la validación falla
 */
function validateEnv(): Env {
  // Construir objeto con todas las variables
  const envObject = {
    // Públicas
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,

    // Privadas
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,

    // Opcionales (AI)
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,

    // Node
    NODE_ENV: process.env.NODE_ENV,
  };

  // Intentar validar
  const result = envSchema.safeParse(envObject);

  if (!result.success) {
    // Formatear errores de forma clara
    const errors = result.error.issues.map((issue) => {
      const path = issue.path.join('.');
      return `  ❌ ${path}: ${issue.message}`;
    });

    const errorMessage = [
      '',
      '╔══════════════════════════════════════════════════════════════╗',
      '║  ⚠️  ERROR: Variables de entorno inválidas                    ║',
      '╠══════════════════════════════════════════════════════════════╣',
      '║                                                              ║',
      ...errors.map((e) => `║ ${e.padEnd(60)} ║`),
      '║                                                              ║',
      '╠══════════════════════════════════════════════════════════════╣',
      '║  💡 Solución:                                                 ║',
      '║  1. Copia .env.local.example a .env.local                    ║',
      '║  2. Completa los valores faltantes                           ║',
      '║  3. Reinicia el servidor de desarrollo                       ║',
      '╚══════════════════════════════════════════════════════════════╝',
      '',
    ].join('\n');

    console.error(errorMessage);
    throw new Error('Configuración de entorno inválida. Revisa los errores arriba.');
  }

  return result.data;
}

// ═══════════════════════════════════════════════════════════════
// EXPORTACIÓN
// ═══════════════════════════════════════════════════════════════

/**
 * Variables de entorno validadas y tipadas.
 *
 * IMPORTANTE:
 * - Se valida una sola vez al importar el módulo
 * - Si falla, la app no arranca (fail fast)
 * - Todas las propiedades tienen tipos correctos
 *
 * USO:
 * ```typescript
 * import { env } from '@/lib/config/env.config';
 *
 * // Tipado automático
 * const url = env.NEXT_PUBLIC_SUPABASE_URL; // string
 * const key = env.OPENAI_API_KEY; // string | undefined
 * ```
 */
export const env = validateEnv();

/**
 * Retorna solo las variables públicas (seguras para cliente).
 * Útil para pasar a componentes cliente sin exponer secretos.
 */
export function getPublicEnv(): PublicEnv {
  return {
    NEXT_PUBLIC_SITE_URL: env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SUPABASE_URL: env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  };
}
