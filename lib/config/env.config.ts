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
    .min(1)
    .refine((val) => val.startsWith('sb_publishable_') || val.startsWith('eyJ'), {
      message: 'Debe ser una Supabase anon key válida (formato sb_publishable_ o JWT legacy)',
    }),

  /** Clave pública de Stripe (pk_test_* o pk_live_*) */
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z
    .string()
    .min(1)
    .refine((val) => val.startsWith('pk_test_') || val.startsWith('pk_live_'), {
      message: 'Debe ser una Stripe publishable key válida (pk_test_ o pk_live_)',
    }),

  // ─────────────────────────────────────────────────────────────
  // Variables privadas (solo servidor - NUNCA exponer al cliente)
  // ─────────────────────────────────────────────────────────────

  /** Clave de servicio de Supabase (acceso admin, NUNCA exponer) */
  SUPABASE_SERVICE_ROLE_KEY: z
    .string()
    .min(1)
    .refine((val) => val.startsWith('sb_secret_') || val.startsWith('eyJ'), {
      message: 'Debe ser una Supabase service_role key válida (formato sb_secret_ o JWT legacy)',
    })
    .optional(),

  /** Clave secreta de Stripe (sk_test_* o sk_live_*) */
  STRIPE_SECRET_KEY: z
    .string()
    .min(1)
    .refine((val) => val.startsWith('sk_test_') || val.startsWith('sk_live_'), {
      message: 'Debe ser una Stripe secret key válida (sk_test_ o sk_live_)',
    })
    .optional(),

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
    .optional()
    .refine((val) => !val || val.startsWith('sk-') || val.startsWith('sk-proj-'), {
      message: 'Si se proporciona, debe ser una OpenAI API key válida',
    }),

  /** API Key de Anthropic/Claude (opcional, para generación de tests) */
  ANTHROPIC_API_KEY: z
    .string()
    .optional()
    .refine((val) => !val || val.startsWith('sk-ant-'), {
      message: 'Si se proporciona, debe ser una Anthropic API key válida',
    }),

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
 * Formatea los errores de Zod de forma legible.
 */
function formatErrorMessage(error: z.ZodError): string {
  const errors = error.issues.map((issue) => {
    const path = issue.path.join('.');
    return `  ❌ ${path}: ${issue.message}`;
  });

  return [
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
}

/**
 * Valida solo las variables públicas (NEXT_PUBLIC_*) para el cliente.
 * En el navegador, las variables de servidor no están disponibles.
 */
function validateEnvClient() {
  const clientSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    NEXT_PUBLIC_SITE_URL: z
      .string()
      .url({ message: 'NEXT_PUBLIC_SITE_URL debe ser una URL válida' })
      .default('http://localhost:3000'),
    NEXT_PUBLIC_SUPABASE_URL: z
      .string()
      .url({ message: 'NEXT_PUBLIC_SUPABASE_URL debe ser una URL válida' }),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z
      .string()
      .min(1)
      .refine((val) => val.startsWith('sb_publishable_') || val.startsWith('eyJ'), {
        message: 'Debe ser una Supabase anon key válida',
      }),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z
      .string()
      .min(1)
      .refine((val) => val.startsWith('pk_test_') || val.startsWith('pk_live_'), {
        message: 'Debe ser una Stripe publishable key válida',
      }),
  });

  const clientEnv = {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  };

  const result = clientSchema.safeParse(clientEnv);

  if (!result.success) {
    const errorMessage = formatErrorMessage(result.error);
    console.error(errorMessage);
    throw new Error('Configuración de entorno inválida. Revisa los errores arriba.');
  }

  // Retornamos un objeto compatible con Env (con valores opcionales undefined)
  return {
    ...result.data,
    SUPABASE_SERVICE_ROLE_KEY: undefined,
    STRIPE_SECRET_KEY: undefined,
    STRIPE_WEBHOOK_SECRET: undefined,
    RESEND_API_KEY: undefined,
    OPENAI_API_KEY: undefined,
    ANTHROPIC_API_KEY: undefined,
  } as Env;
}

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
    const errorMessage = formatErrorMessage(result.error);
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
 * - En el CLIENTE: solo valida variables NEXT_PUBLIC_*
 * - En el SERVIDOR: valida TODAS las variables
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
// Solo validar en el servidor, en el cliente solo validar las NEXT_PUBLIC_
export const env = typeof window === 'undefined' ? validateEnv() : validateEnvClient();

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
