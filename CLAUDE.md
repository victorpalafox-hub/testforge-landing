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

## Arquitectura del Proyecto

### Stack Técnico
- **Frontend**: Next.js 14 (App Router) + React 19 + TypeScript 5
- **Estilos**: Tailwind CSS + class-variance-authority
- **Backend**: Supabase (PostgreSQL + Auth)
- **Pagos**: Stripe
- **IA**: Claude API (generación de tests)
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

## Pre-commit Hook (4 validaciones)

El hook en `.husky/pre-commit` ejecuta secuencialmente:
1. `npm run type-check` - TypeScript
2. `npx lint-staged` - ESLint + Prettier en archivos staged
3. `npm run build` - Verificar que compila
4. `npm run auto-review` - 6 categorías de calidad

Si cualquier paso falla, el commit se bloquea.

## Auto-Revisión (`scripts/auto-review.js`)

Evalúa 6 categorías con reportes en `docs/reviews/`:
1. **Compilación y Sintaxis**: TypeScript, ESLint, dependencias
2. **Valores Hardcodeados**: API keys, credenciales, URLs
3. **Manejo de Errores**: async/await, try-catch
4. **Código Duplicado**: strings repetidos, bloques similares
5. **Best Practices**: tipos, nomenclatura, tamaño de archivos
6. **Seguridad**: .gitignore, inyecciones, secrets

## Agentes Especializados

El proyecto tiene configurados agentes especializados que se invocan automáticamente:

### qa-automation
**Cuándo se activa:**
- Después de cambios significativos en `/app/`, `/components/`, o `/lib/`
- Cuando se agregan nuevas features o endpoints
- Cuando se modifica lógica de negocio
- Invocación manual: `@qa-automation test /ruta`

**Qué hace:** Crea y ejecuta tests automatizados para el código modificado.

### refactoring-specialist
**Cuándo se activa:**
- Después de merge a main
- Tras implementar una feature grande
- Cuando code coverage baja del 70%
- Invocación manual: `@refactor /ruta --dry-run`

**Qué hace:** Limpia, optimiza y simplifica código sin romper funcionalidad. Elimina código muerto y reduce complejidad.

---

## Contexto del Proyecto TestForge

### Qué es
Plataforma SaaS que combina:
1. **Marketplace de Datasets Mexicanos**: RFC (SAT), CURP (RENAPO), direcciones (SEPOMEX), transacciones, perfiles
2. **Generador de Pruebas con IA**: Lenguaje natural → código Cypress/Selenium

### Estado Actual
- **Fase 1 (60% completo)**: Datasets + Rebranding visual
- **Fase 2 (pendiente)**: Conectar Stripe y Supabase
- **Fase 3 (pendiente)**: Integración completa Claude API para generación de tests

### Credenciales
Existen credenciales de producción de Stripe y Supabase del proyecto anterior "Datasets MX" que deben recuperarse para Fase 2.

## Contexto del Usuario

**Víctor** - QA Manual en transición a QA Automation
- Nivel intermedio-básico en automatización
- Prefiere explicaciones paso a paso con justificación técnica
- Enfoque en testing de microservicios

## Workflow Obligatorio para Claude Code

### Auto-actualización de CLAUDE.md

Después de cada cambio significativo, agregar entrada al historial:

```markdown
## [FECHA] - [TIPO] Descripción breve

### Cambios
- Descripción del cambio 1
- Descripción del cambio 2

### Archivos
- `ruta/archivo.ts` - Propósito

### Decisiones Técnicas
- Por qué se tomó cierta decisión
```

**Tipos**: [FEATURE], [REFACTOR], [FIX], [CONFIG], [DOCS], [STYLE], [SETUP]

### Secuencia de trabajo
1. Implementar código
2. Commit granular
3. Actualizar este archivo (sin que el usuario lo pida)
4. Commit de documentación: `docs: auto-update context [TIPO]`

---

# HISTORIAL DE CAMBIOS

## 2025-01-27 - [SETUP] Configuración inicial

### Cambios
- Creado CLAUDE.md con contexto del proyecto
- Configurado sistema de auto-revisión en pre-commit
- Establecido workflow de auto-documentación

### Archivos
- `CLAUDE.md` - Contexto para Claude Code
- `scripts/auto-review.js` - Script de revisión de calidad
- `.husky/pre-commit` - Hook con 4 validaciones

---

## 2026-01-28 - [DOCS] Reestructuración de CLAUDE.md

### Cambios
- Agregado prefijo estándar de Claude Code
- Reorganizado con comandos al inicio para acceso rápido
- Eliminada información redundante con README.md
- Simplificado historial de cambios
- Mantenido lo esencial: arquitectura, configuración, reglas

### Archivos
- `CLAUDE.md` - Reestructurado completamente

### Decisiones Técnicas
- Comandos al inicio porque es lo más consultado
- Historial condensado para reducir tamaño del archivo
- Información detallada de datasets/features se mantiene en README.md

---

## 2026-01-28 - [CONFIG] Agentes especializados

### Cambios
- Documentados agentes `qa-automation` y `refactoring-specialist`
- Agregada sección con triggers y funcionalidad de cada agente

### Archivos
- `CLAUDE.md` - Nueva sección "Agentes Especializados"

### Decisiones Técnicas
- Agentes se activan proactivamente según cambios en el código
- Permiten invocación manual con comandos específicos

---

## 2026-01-28 - [TESTING] Suite Completa de Pruebas Automatizadas

### Cambios Implementados
- Instalado y configurado Playwright para E2E tests
- Instalado y configurado Vitest para unit/integration tests
- Creada estructura completa de directorios `/test/`
- Implementados 118 tests unitarios (100% pass rate)
- Creados Page Objects siguiendo patrón POM
- Generadas fixtures de test data (datasets, bundles, users, content)
- Escritas 2 specs E2E completas (home, catalog)
- Generado reporte comprehensivo Test.md

### Archivos Creados
- `playwright.config.ts` - Configuración de Playwright (multi-browser, mobile)
- `vitest.config.ts` - Configuración de Vitest (jsdom, coverage)
- `test/setup.ts` - Setup global de Vitest
- `test/README.md` - Documentación completa de testing
- `test/.gitignore` - Ignorar reportes generados

#### Tests Unitarios (5 archivos, 118 tests)
- `test/unit/utils/cn.test.ts` - 17 tests para class name merger
- `test/unit/config/brand-helpers.test.ts` - 29 tests para config helpers
- `test/unit/components/Button.test.tsx` - 25 tests para Button
- `test/unit/components/Card.test.tsx` - 27 tests para Card
- `test/unit/components/Badge.test.tsx` - 20 tests para Badge

#### Page Objects E2E (2 archivos)
- `test/e2e/pages/HomePage.ts` - POM para landing page
- `test/e2e/pages/CatalogPage.ts` - POM para catálogo

#### Specs E2E (2 archivos)
- `test/e2e/specs/home.spec.ts` - Tests de Hero, Benefits, navegación
- `test/e2e/specs/catalog.spec.ts` - Tests de tabs, datasets, filtros

#### Fixtures (4 archivos)
- `test/e2e/fixtures/datasets.ts` - Test data de datasets
- `test/e2e/fixtures/bundles.ts` - Test data de paquetes
- `test/e2e/fixtures/users.ts` - Test data de usuarios
- `test/e2e/fixtures/content.ts` - Textos esperados en UI

#### Reportes
- `test/reports/Test.md` - Reporte comprehensivo con métricas y recomendaciones

### Métricas Alcanzadas
- **Total Tests**: 118 (100% pass)
- **Test Files**: 5
- **Coverage**: 20.96% overall, 100% en componentes testeados
- **Duración**: 3.59s para suite completa
- **Componentes con 100% coverage**: cn.ts, Button, Card, Badge

### Configuración Actualizada
- Agregados 10 scripts de testing a `package.json`
  - `test`, `test:unit`, `test:integration`, `test:ui`, `test:coverage`
  - `test:e2e`, `test:e2e:ui`, `test:e2e:headed`, `test:e2e:debug`
  - `test:all` (ejecuta todo)

### Dependencias Instaladas
```json
{
  "@playwright/test": "^1.58.0",
  "@testing-library/react": "^16.3.2",
  "@testing-library/jest-dom": "^6.9.1",
  "@testing-library/user-event": "^14.6.1",
  "vitest": "^4.0.18",
  "@vitest/coverage-v8": "^4.0.18",
  "@vitest/ui": "^4.0.18",
  "@vitejs/plugin-react": "^5.1.2",
  "jsdom": "^27.4.0",
  "happy-dom": "^20.4.0"
}
```

### Decisiones Técnicas
- **Playwright para E2E**: Multi-browser, mobile emulation, screenshots on failure
- **Vitest para Unit**: Fast execution, React Testing Library integration
- **Page Object Model**: Separation of concerns, reusabilidad, mantenibilidad
- **Fixtures**: Zero hardcoding en specs, test data centralizado
- **Coverage con v8**: Provider rápido y preciso

### Metodología Implementada
1. **POM (Page Object Model)**: Todos los E2E siguen este patrón
2. **Fixtures**: NO hardcodear valores en tests
3. **Independencia**: Tests no dependen de orden de ejecución
4. **Idempotencia**: Tests limpian su estado
5. **Descriptividad**: Nombres claros en español

### Prioridades de Testing Establecidas
- **P1 (Critical)**: Auth, pagos, generación datasets, IA - 100% coverage
- **P2 (High)**: API endpoints, validaciones, navegación - 90% coverage
- **P3 (Medium)**: UI components, errors, accesibilidad - 80% coverage
- **P4 (Low)**: Páginas estáticas, animaciones - 60% coverage

### Próximos Pasos Sugeridos
1. Ejecutar E2E tests: `npm run test:e2e`
2. Aumentar coverage a 80%+ (DatasetCard, BundleCard, CatalogSection)
3. Agregar tests de integración con Supabase
4. Implementar visual regression testing
5. Integrar con CI/CD pipeline

### Reporte Completo
Ver `/test/reports/Test.md` para métricas detalladas, cobertura por feature, y recomendaciones técnicas.

---
