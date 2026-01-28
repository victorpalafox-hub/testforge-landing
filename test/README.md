# TestForge - Suite de Pruebas Automatizadas

Suite completa de pruebas para la plataforma TestForge SaaS.

## Estructura del Proyecto

```
/test/
├── e2e/                    # Tests End-to-End (Playwright)
│   ├── pages/              # Page Object Models
│   ├── specs/              # Especificaciones de tests E2E
│   └── fixtures/           # Test data para E2E
├── integration/            # Tests de integración (Vitest)
├── unit/                   # Tests unitarios (Vitest)
├── utils/                  # Utilidades de testing
├── reports/                # Reportes generados
│   └── Test.md             # Reporte principal
└── setup.ts                # Configuración global de Vitest
```

## Comandos Disponibles

### Tests Unitarios y de Integración (Vitest)

```bash
# Ejecutar todos los tests en modo watch
npm run test

# Ejecutar solo tests unitarios
npm run test:unit

# Ejecutar solo tests de integración
npm run test:integration

# UI interactiva de Vitest
npm run test:ui

# Coverage report
npm run test:coverage
```

### Tests E2E (Playwright)

```bash
# Ejecutar todos los tests E2E
npm run test:e2e

# UI interactiva de Playwright
npm run test:e2e:ui

# Modo headed (ver el browser)
npm run test:e2e:headed

# Modo debug
npm run test:e2e:debug
```

### Suite Completa

```bash
# Ejecutar TODOS los tests (unit + integration + e2e)
npm run test:all
```

## Metodología

### Page Object Model (POM)

Todos los tests E2E siguen el patrón Page Object Model:

```typescript
// test/e2e/pages/HomePage.ts
import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly heroTitle: Locator;
  readonly ctaButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heroTitle = page.getByRole('heading', { level: 1 });
    this.ctaButton = page.getByRole('button', { name: /explorar/i });
  }

  async navigate() {
    await this.page.goto('/');
  }

  async clickCTA() {
    await this.ctaButton.click();
  }
}
```

### Fixtures para Test Data

NO hardcodear valores en los tests. Usar fixtures:

```typescript
// test/e2e/fixtures/datasets.ts
export const testDatasets = {
  rfc: {
    title: 'RFC Generator',
    price: 145,
    category: 'Fiscal',
  },
};

// En el test
import { testDatasets } from '../fixtures/datasets';
expect(price).toBe(testDatasets.rfc.price);
```

## Prioridades de Testing

### Critical (P1) - 100% Coverage
- Generación de datasets (RFC, CURP, direcciones)
- Integración con Supabase
- Procesamiento de pagos (Stripe)
- Generador de tests con IA

### High (P2) - 90%+ Coverage
- API endpoints
- Validación de formularios
- Flujos de navegación

### Medium (P3) - 80%+ Coverage
- Componentes UI
- Manejo de errores
- Accesibilidad

### Low (P4) - 60%+ Coverage
- Páginas estáticas
- Animaciones

## Coverage Requirements

- **Mínimo global**: 80%
- **Paths críticos**: 100%
- **Nuevas features**: Tests obligatorios antes de merge

## Reportes

Después de cada ejecución, se genera:

- **Test.md**: Reporte principal en `/test/reports/`
- **Coverage HTML**: En `/test/reports/coverage/`
- **Playwright HTML**: En `/test/reports/playwright-html/`

## Reglas Estrictas

1. **NUNCA** hardcodear test data en specs
2. **SIEMPRE** usar Page Objects para E2E
3. **SIEMPRE** limpiar estado después de tests
4. **NUNCA** depender del orden de ejecución
5. **SIEMPRE** hacer tests independientes e idempotentes
6. **SIEMPRE** usar data-testid para elementos críticos
7. **NUNCA** usar selectores frágiles (clases CSS)

## Estándares de Calidad

- Tests deben ser **legibles** (nombre descriptivo)
- Tests deben ser **mantenibles** (DRY, reusable)
- Tests deben ser **rápidos** (< 30s por spec E2E)
- Tests deben ser **determinísticos** (sin flakiness)

## Ejemplos

Ver documentación completa y ejemplos en cada subdirectorio:

- `/test/e2e/specs/` - Ejemplos de specs E2E
- `/test/unit/` - Ejemplos de tests unitarios
- `/test/integration/` - Ejemplos de tests de integración
