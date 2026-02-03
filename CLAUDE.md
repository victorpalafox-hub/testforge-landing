# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos de Desarrollo

```bash
# Desarrollo
npm run dev              # Servidor en localhost:3000

# Build y validación
npm run build            # Build de producción
npm run type-check       # Solo verificar tipos TypeScript
npm run lint             # ESLint
npm run lint:fix         # ESLint con auto-fix
npm run format           # Prettier
npm run validate         # type-check + lint + format:check (todo junto)

# Auto-revisión (6 categorías de calidad)
npm run auto-review      # Genera reporte en docs/reviews/
```

## Comandos de Testing

```bash
# Unit tests (Vitest)
npm run test                     # Modo watch
npm run test:unit                # Solo unitarios
npm run test:coverage            # Con coverage
npx vitest run path/to/file      # Ejecutar un solo archivo
npx vitest run -t "test name"    # Ejecutar test por nombre

# E2E tests (Playwright)
npm run test:e2e                 # Todos los E2E
npm run test:e2e:headed          # Ver navegador
npm run test:e2e:debug           # Modo debug
npx playwright test path/to/spec # Ejecutar una spec
npx playwright test --grep "pattern"  # Por patrón

# Suite completa
npm run test:all                 # Unit + coverage + E2E
```

## Arquitectura del Proyecto

### Stack Técnico
- **Frontend**: Next.js 15 (App Router) + React 19 + TypeScript 5
- **Estilos**: Tailwind CSS + class-variance-authority
- **Backend**: Supabase (PostgreSQL + Auth)
- **Pagos**: Stripe
- **IA**: Claude API (generación de tests)
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Calidad**: Husky pre-commit hooks + ESLint + Prettier

### Estructura de Configuración Centralizada

```
lib/config/
├── brand.ts          # Identidad de marca (nombre, colores, logos)
├── brand.config.ts   # Configuración extendida de marca
├── content.ts        # Textos y contenidos reutilizables
├── env.config.ts     # Variables de entorno tipadas
└── index.ts          # Re-exports
```

**REGLA CRÍTICA**: NO hardcodear valores. Todo debe provenir de `/lib/config/`.

### Sistema de Diseño "Cobalt"
- **Azul Principal**: #0066CC (60% del uso)
- **Acento Teal**: #00D4AA (30% del uso)
- **CTA Coral**: #FF8C73 (10% del uso)
- **Efectos**: Blur orbs, grid patterns, text glow

### Estructura de Tests

```
test/
├── e2e/
│   ├── pages/       # Page Object Models (POM)
│   ├── specs/       # Specs E2E
│   └── fixtures/    # Test data centralizado
├── unit/            # Tests unitarios por módulo
├── integration/     # Tests de integración
└── setup.ts         # Setup global de Vitest
```

**Reglas de testing**:
- Usar Page Object Model para E2E
- NO hardcodear valores - usar fixtures
- Tests independientes e idempotentes
- Usar `data-testid` para selectores

## Pre-commit Hook

El hook en `.husky/pre-commit` ejecuta secuencialmente:
1. `npm run type-check` - TypeScript
2. `npx lint-staged` - ESLint + Prettier en archivos staged
3. `npm run build` - Verificar que compila
4. `npm run auto-review` - 6 categorías de calidad

Si cualquier paso falla, el commit se bloquea.

## Agentes Especializados

Todos los agentes integran **Context7** obligatoriamente para consultar documentación actualizada antes de cualquier acción.

### qa-automation
- **Trigger**: Cambios en `/app/`, `/components/`, `/lib/`
- **Manual**: `@qa-automation test /ruta`
- **Función**: Crea y ejecuta tests para código modificado
- **Context7**: Consulta Playwright, Vitest, React Testing Library

### refactoring-specialist
- **Trigger**: Merge a main, feature grande completada
- **Manual**: `@refactor /ruta --dry-run`
- **Función**: Limpia y optimiza código sin romper funcionalidad
- **Context7**: Consulta Next.js, React, TypeScript, Tailwind

### documentation-keeper
- **Trigger**: Cambios exitosos + tests pasando
- **Función**: Mantiene README.md y CLAUDE.md sincronizados
- **Context7**: Verifica versiones y patrones antes de documentar

## Contexto del Proyecto

**TestForge**: Plataforma SaaS que combina:
1. **Marketplace de Datasets Mexicanos**: RFC (SAT), CURP (RENAPO), direcciones (SEPOMEX)
2. **Generador de Pruebas con IA**: Lenguaje natural → código Cypress/Selenium

### Estado Actual
- **Fase 1 (60%)**: Datasets + Rebranding visual
- **Fase 2 (pendiente)**: Conectar Stripe y Supabase
- **Fase 3 (pendiente)**: Integración Claude API para generación de tests

## Workflow de Documentación

Después de cambios significativos, agregar entrada al historial:

```markdown
## [FECHA] - [TIPO] Descripción breve
- Cambios realizados
- Archivos modificados
- Decisiones técnicas tomadas
```

**Tipos**: [FEATURE], [REFACTOR], [FIX], [CONFIG], [DOCS], [STYLE], [SETUP], [TESTING]

---

# HISTORIAL DE CAMBIOS

## 2026-02-03 - [CONFIG] Integración Context7 en Agentes
- Todos los agentes ahora consultan Context7 obligatoriamente
- qa-automation: Consulta docs de Playwright, Vitest, React Testing Library
- refactoring-specialist: Consulta docs de Next.js, React, TypeScript, Tailwind
- documentation-keeper: Verifica versiones y patrones antes de documentar
- Workflow: `resolve-library-id` → `query-docs` → aplicar mejores prácticas

## 2026-01-28 - [TESTING] Suite de Pruebas
- Configurado Playwright (E2E) y Vitest (unit)
- 118 tests unitarios implementados
- Page Objects y fixtures creados
- Ver `/test/README.md` para detalles

## 2026-01-28 - [CONFIG] Agentes especializados
- Configurados qa-automation, refactoring-specialist, documentation-keeper

## 2026-01-27 - [SETUP] Configuración inicial
- Creado CLAUDE.md con contexto del proyecto
- Configurado sistema de auto-revisión en pre-commit
