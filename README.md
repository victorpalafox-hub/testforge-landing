# TestForge

> Plataforma SaaS integral para datasets mexicanos y generacion automatica de pruebas con IA

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## Tabla de Contenidos

- [Descripcion General](#descripcion-general)
- [Caracteristicas](#caracteristicas)
- [Stack Tecnologico](#stack-tecnologico)
- [Primeros Pasos](#primeros-pasos)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Sistema de Diseno](#sistema-de-diseno)
- [Configuracion](#configuracion)
- [Desarrollo](#desarrollo)
- [Roadmap](#roadmap)
- [Licencia](#licencia)

---

## Descripcion General

TestForge combina dos servicios poderosos en una plataforma unificada:

### 1. Marketplace de Datasets Mexicanos
Acceso a datasets de prueba realistas y validos para el contexto mexicano:
- **RFC**: Generacion con algoritmo SAT oficial
- **CURP**: Validacion RENAPO integrada
- **Direcciones**: Base SEPOMEX con 145,000+ codigos postales
- **Transacciones**: Patrones realistas de e-commerce
- **Perfiles de Usuario**: Datos demograficamente precisos

### 2. Generador de Pruebas con IA
Convierte descripciones en lenguaje natural a codigo de pruebas automatizado:
- Soporta **Cypress** y **Selenium**
- Powered by **Claude API** (Anthropic)
- Enfoque en testing de **microservicios**
- Genera codigo mantenible y escalable

---

## Caracteristicas

### Funcionalidades Core
- **Generacion de Datos Mexicanos Validos**: RFC, CURP, direcciones con validacion oficial
- **Sistema de Configuracion Centralizado**: Zero hardcoding, maxima flexibilidad
- **UI Premium**: Efectos blur orbs, grid patterns, text glow
- **Diseno Responsive**: Mobile-first approach
- **Arquitectura Modular**: Componentes reutilizables y escalables
- **Generador IA de Tests**: Conversion lenguaje natural a codigo (en desarrollo)
- **Sistema de Pagos**: Integracion Stripe con planes escalados
- **Base de Datos**: Persistencia con Supabase

### Ventajas Competitivas
- **Especializado en Mexico**: Unicos datasets con validacion oficial mexicana
- **IA Integrada**: Generacion automatica de tests (no solo datasets)
- **Diseno Enterprise**: Alejado de esteticas startup, enfoque corporativo
- **Documentacion Continua**: Auto-actualizacion de contexto tecnico

---

## Stack Tecnologico

### Frontend
| Tecnologia | Version | Proposito |
|------------|---------|-----------|
| Next.js | 14 | Framework React (App Router) |
| TypeScript | 5.0 | Tipado estatico |
| Tailwind CSS | 3.4 | Estilos utilitarios |
| class-variance-authority | - | Variantes de componentes |
| Inter + JetBrains Mono | - | Sistema tipografico |

### Backend & Servicios
| Servicio | Proposito |
|----------|-----------|
| Supabase | Base de datos PostgreSQL + Auth |
| Stripe | Procesamiento de pagos |
| Claude API | Generacion de tests con IA |
| Vercel | Deployment (recomendado) |

### DevOps & Calidad
| Herramienta | Proposito |
|-------------|-----------|
| Git | Control de versiones |
| Husky | Pre-commit hooks |
| ESLint | Linting de codigo |
| TypeScript Strict | Type checking |

---

## Primeros Pasos

### Prerequisitos
```bash
Node.js >= 18.0.0
npm >= 9.0.0
Git
```

### Instalacion

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/testforge-landing.git
cd testforge-landing
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key_supabase

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=tu_key_stripe
STRIPE_SECRET_KEY=tu_secret_stripe

# Claude API
ANTHROPIC_API_KEY=tu_key_anthropic
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## Estructura del Proyecto

```
testforge-landing/
├── app/                      # Next.js App Router
│   ├── (marketing)/         # Rutas publicas (landing, pricing)
│   ├── (dashboard)/         # Rutas autenticadas
│   └── api/                 # API Routes
├── components/              # Componentes React
│   ├── ui/                  # Componentes base (buttons, cards)
│   ├── marketing/           # Componentes de landing
│   └── dashboard/           # Componentes de dashboard
├── lib/                     # Logica de negocio
│   ├── config/              # Configuracion centralizada
│   │   ├── brand.ts         # Identidad de marca
│   │   ├── pricing.ts       # Planes y precios
│   │   └── content.ts       # Textos y contenidos
│   ├── datasets/            # Generadores de datos
│   │   ├── rfc.ts
│   │   ├── curp.ts
│   │   ├── address.ts
│   │   └── transactions.ts
│   └── utils/               # Utilidades compartidas
├── public/                  # Assets estaticos
├── styles/                  # Estilos globales
├── CLAUDE.md                # Contexto para Claude Code
└── README.md                # Este archivo
```

---

## Sistema de Diseno

### Paleta de Colores "Cobalt"

| Color | Hex | Uso |
|-------|-----|-----|
| Azul Principal | `#0066CC` | 60% - Color primario |
| Acento Teal | `#00D4AA` | 30% - Acentos y highlights |
| CTA Coral | `#FF8C73` | 10% - Call-to-actions |
| Fondo | Dark Navy | Backgrounds |

### Formula de Diseno
```
60% Studio Nika + 30% DesignBell + 10% Dark Tech Aesthetics
```

### Efectos Premium
- Blur orbs animados
- Grid patterns sutiles
- Text glow en elementos destacados
- Gradientes con blend modes

---

## Configuracion

### Arquitectura de Configuracion Centralizada

**Regla Critica**: NO hardcodear valores. Todo debe provenir de archivos de configuracion.

```
/lib/config/
├── brand.ts    # Identidad de marca (nombre, colores, logos)
├── pricing.ts  # Planes, precios, features por tier
└── content.ts  # Textos, CTAs, copy reutilizable
```

### Ejemplo de uso
```typescript
// lib/config/brand.ts
export const brand = {
  name: 'TestForge',
  tagline: 'Datasets mexicanos + Tests con IA',
  colors: {
    primary: '#0066CC',
    accent: '#00D4AA',
    cta: '#FF8C73'
  }
}

// Uso en componentes
import { brand } from '@/lib/config/brand'
<h1>{brand.name}</h1>
```

---

## Desarrollo

### Comandos Disponibles

```bash
# Servidor de desarrollo
npm run dev

# Build de produccion
npm run build

# Iniciar build de produccion
npm start

# Linting
npm run lint

# Preparar hooks de Git
npm run prepare
```

### Principios de Desarrollo

1. **Sin Hardcoding**: Todo centralizado en `/lib/config/`
2. **Modularidad**: Componentes reutilizables y escalables
3. **Commits Granulares**: Seguimiento detallado de cambios
4. **Documentacion Continua**: Actualizacion automatica de CLAUDE.md
5. **Verificacion Visual**: Testing en cada paso

---

## Roadmap

### Fase 1: Datasets + Rebranding (60% completo)
- [x] Rebranding visual completo (Cobalt palette)
- [x] Sistema de configuracion centralizado
- [x] UI premium con efectos avanzados
- [x] Estructura modular de componentes
- [x] Generador RFC (algoritmo SAT)
- [x] Generador CURP (validacion RENAPO)
- [x] Direcciones SEPOMEX (145K+ codigos postales)
- [x] Transacciones e-commerce realistas
- [x] Perfiles demograficos precisos

### Fase 2: Integraciones (Pendiente)
- [ ] Conexion Stripe (pagos)
- [ ] Conexion Supabase (persistencia)
- [ ] Sistema de autenticacion
- [ ] Dashboard de usuario

### Fase 3: Generador IA (Pendiente)
- [ ] Integracion completa Claude API
- [ ] Generacion de tests Cypress
- [ ] Generacion de tests Selenium
- [ ] Evaluacion MCP (Model Context Protocol)

---

## Publico Objetivo

- Equipos QA en transicion Manual a Automation
- Desarrolladores que prueban microservicios
- Empresas que necesitan datos de prueba mexicanos validos
- Equipos que buscan acelerar creacion de tests automatizados

---

## Licencia

Este proyecto esta bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para mas detalles.

---

## Contacto

**TestForge** - Datasets mexicanos + Generacion de tests con IA

Desarrollado con Next.js 14 y Claude API

---

*Ultima actualizacion: 2025-01-27*
