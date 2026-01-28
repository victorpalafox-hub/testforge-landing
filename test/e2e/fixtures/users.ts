/**
 * Test Fixtures - Users
 *
 * Test data para usuarios del sistema.
 * NUNCA usar credenciales reales en tests.
 */

export const testUsers = {
  /** Usuario válido para login exitoso */
  valid: {
    email: 'test@testforge.dev',
    password: 'TestPassword123!',
    name: 'Usuario de Prueba',
    role: 'customer',
  },

  /** Usuario administrador */
  admin: {
    email: 'admin@testforge.dev',
    password: 'AdminPassword123!',
    name: 'Admin TestForge',
    role: 'admin',
  },

  /** Usuario con datos inválidos para tests de error */
  invalid: {
    email: 'invalid@test.com',
    password: 'wrongpassword',
    name: 'Invalid User',
    role: 'customer',
  },

  /** Usuario sin verificar email */
  unverified: {
    email: 'unverified@testforge.dev',
    password: 'Unverified123!',
    name: 'Usuario Sin Verificar',
    role: 'customer',
    emailVerified: false,
  },

  /** Usuario premium con suscripción activa */
  premium: {
    email: 'premium@testforge.dev',
    password: 'Premium123!',
    name: 'Usuario Premium',
    role: 'customer',
    subscription: 'allAccess',
    subscriptionEndDate: '2026-12-31',
  },
};

/**
 * Datos de perfil de usuario
 */
export const userProfiles = {
  complete: {
    name: 'Juan Pérez García',
    email: 'juan.perez@testforge.dev',
    phone: '+52 55 1234 5678',
    company: 'TestForge QA Team',
    position: 'QA Automation Engineer',
    country: 'México',
    city: 'Ciudad de México',
  },

  incomplete: {
    name: 'María López',
    email: 'maria.lopez@testforge.dev',
    // Campos faltantes para tests de validación
  },
};

/**
 * Utilidad para generar usuarios de prueba
 */
export function generateTestUser(
  overrides: Partial<typeof testUsers.valid> = {}
) {
  const timestamp = Date.now();

  return {
    email: `test-${timestamp}@testforge.dev`,
    password: 'TestPassword123!',
    name: `Test User ${timestamp}`,
    role: 'customer' as const,
    ...overrides,
  };
}
