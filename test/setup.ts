/**
 * Setup global para Vitest
 *
 * Este archivo se ejecuta antes de cada test suite.
 * Configura Testing Library, mocks globales, y utilities.
 */

import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Cleanup automático después de cada test
afterEach(() => {
  cleanup();
});

// Mock de window.matchMedia (necesario para componentes responsive)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Mock de IntersectionObserver (para lazy loading)
class IntersectionObserverMock {
  observe = () => null;
  disconnect = () => null;
  unobserve = () => null;
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});

// Mock de scrollTo (para tests de navegación)
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: () => {},
});
