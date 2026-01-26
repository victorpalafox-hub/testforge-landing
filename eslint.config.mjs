/**
 * Configuración de ESLint para TestForge
 *
 * FILOSOFÍA: Estricto pero sensato
 * - Detecta errores reales que causan bugs
 * - Mantiene código limpio y legible
 * - Sigue mejores prácticas de React/Next.js
 * - No es tan molesto que lo desactives
 */

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // ════════════════════════════════════════════════════════════
  // CONFIGURACIÓN BASE DE NEXT.JS
  // ════════════════════════════════════════════════════════════
  // Incluye reglas de:
  // - ESLint recomendadas
  // - React recomendadas
  // - Next.js específicas (no-img-element, no-html-link-for-pages, etc.)
  // - TypeScript recomendadas
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // ════════════════════════════════════════════════════════════
  // REGLAS PERSONALIZADAS PARA EL CÓDIGO DE LA APP
  // ════════════════════════════════════════════════════════════
  {
    rules: {
      // ──────────────────────────────────────────────────────
      // REGLAS DE TYPESCRIPT
      // ──────────────────────────────────────────────────────

      // Detecta uso de 'any' explícito
      // POR QUÉ: 'any' elimina los beneficios de TypeScript
      // NIVEL: warn (a veces es necesario, pero debería ser raro)
      '@typescript-eslint/no-explicit-any': 'warn',

      // Detecta variables/imports no usados
      // POR QUÉ: Código muerto aumenta complejidad sin beneficio
      // EXCEPCIÓN: Variables que empiezan con _ (ej: _unused)
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      // Permite inferencia de tipos (no requerir tipos explícitos)
      // POR QUÉ: TypeScript infiere bien, tipos explícitos son verbosos
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // Permite non-null assertions (!) cuando sabes que el valor existe
      // POR QUÉ: A veces TypeScript no puede inferir que un valor no es null
      '@typescript-eslint/no-non-null-assertion': 'warn',

      // ──────────────────────────────────────────────────────
      // REGLAS DE REACT HOOKS
      // ──────────────────────────────────────────────────────

      // Valida que hooks sigan las reglas de React
      // POR QUÉ: Hooks en condicionales/loops causan bugs difíciles
      // EJEMPLO MAL: if (x) { useState() } // ERROR
      'react-hooks/rules-of-hooks': 'error',

      // Valida dependencias de useEffect/useMemo/useCallback
      // POR QUÉ: Dependencias faltantes causan bugs sutiles
      // NIVEL: warn (a veces intencionalmente omites deps)
      'react-hooks/exhaustive-deps': 'warn',

      // ──────────────────────────────────────────────────────
      // REGLAS DE REACT/JSX
      // ──────────────────────────────────────────────────────

      // Requiere key prop en elementos de listas
      // POR QUÉ: React necesita keys para reconciliación eficiente
      // EJEMPLO: {items.map(item => <div key={item.id}>...)}
      'react/jsx-key': [
        'error',
        {
          checkFragmentShorthand: true,
          checkKeyMustBeforeSpread: true,
        },
      ],

      // Advierte sobre uso de índice como key
      // POR QUÉ: Índices causan bugs si la lista cambia orden
      // NIVEL: warn (a veces es aceptable en listas estáticas)
      'react/no-array-index-key': 'warn',

      // Detecta children pasados como prop y como contenido
      // POR QUÉ: Es confuso y probablemente un error
      'react/no-children-prop': 'error',

      // ──────────────────────────────────────────────────────
      // REGLAS DE ACCESIBILIDAD (A11Y)
      // ──────────────────────────────────────────────────────

      // Requiere alt en imágenes
      // POR QUÉ: Usuarios con screen readers necesitan descripción
      'jsx-a11y/alt-text': 'warn',

      // Requiere que botones tengan contenido accesible
      // POR QUÉ: Botones solo con iconos necesitan aria-label
      'jsx-a11y/anchor-has-content': 'warn',

      // Detecta elementos no interactivos con handlers
      // POR QUÉ: <div onClick> no es accesible, usar <button>
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',

      // ──────────────────────────────────────────────────────
      // REGLAS GENERALES DE JAVASCRIPT
      // ──────────────────────────────────────────────────────

      // Detecta console.log (pero permite warn/error)
      // POR QUÉ: console.logs no deben llegar a producción
      // PERMITE: console.warn y console.error (útiles para debugging)
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],

      // Desactivar regla base (usamos la de TypeScript)
      'no-unused-vars': 'off',

      // Prohíbe debugger
      // POR QUÉ: debugger no debe llegar a producción
      'no-debugger': 'error',

      // Requiere === y !== en lugar de == y !=
      // POR QUÉ: == hace coerción de tipos confusa
      // EJEMPLO: "0" == 0 es true (inesperado!)
      eqeqeq: ['error', 'always', { null: 'ignore' }],

      // Prohíbe var (usar let/const)
      // POR QUÉ: var tiene scoping confuso (function scope)
      'no-var': 'error',

      // Sugiere const si variable no se reasigna
      // POR QUÉ: const comunica intención (no cambiará)
      'prefer-const': 'warn',

      // Prohíbe eval()
      // POR QUÉ: eval es un riesgo de seguridad
      'no-eval': 'error',

      // Prohíbe with
      // POR QUÉ: with es confuso y deprecated
      'no-with': 'error',

      // Detecta return inconsistente en funciones
      // POR QUÉ: Funciones deben retornar siempre o nunca
      'consistent-return': 'warn',

      // Detecta condiciones que siempre son true/false
      // POR QUÉ: Probablemente es un bug
      'no-constant-condition': 'warn',

      // Detecta asignación en condiciones (if (x = 5))
      // POR QUÉ: Probablemente querías comparar (===)
      'no-cond-assign': 'error',
    },
  },

  // ════════════════════════════════════════════════════════════
  // EXCEPCIONES PARA SCRIPTS Y ARCHIVOS DE CONFIGURACIÓN
  // ════════════════════════════════════════════════════════════
  // Los scripts y configs tienen diferentes necesidades:
  // - Necesitan console.log para output
  // - Pueden usar any en configs flexibles
  // - Pueden usar require en Node.js puro
  {
    files: ['scripts/**/*.js', 'scripts/**/*.ts', '*.config.js', '*.config.mjs', '*.config.ts'],
    rules: {
      // Permitir console en scripts (necesitan mostrar output)
      'no-console': 'off',

      // Permitir any en archivos de configuración
      '@typescript-eslint/no-explicit-any': 'off',

      // Permitir require en scripts Node.js
      '@typescript-eslint/no-require-imports': 'off',
    },
  },

  // ════════════════════════════════════════════════════════════
  // ARCHIVOS IGNORADOS
  // ════════════════════════════════════════════════════════════
  {
    ignores: [
      // Build outputs
      '.next/**',
      'out/**',
      'build/**',
      'dist/**',

      // Dependencies
      'node_modules/**',

      // Generated files
      'next-env.d.ts',
      '*.min.js',

      // Coverage
      'coverage/**',
    ],
  },
];

export default eslintConfig;
