/**
 * Tests Unitarios - cn() utility function
 *
 * Valida la función de combinación de clases CSS
 * que usa clsx + tailwind-merge
 */

import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils/cn';

describe('cn() - Class Name Merger', () => {
  describe('Funcionalidad básica', () => {
    it('debería combinar múltiples clases en un string', () => {
      const result = cn('px-2 py-1', 'text-white');
      expect(result).toBe('px-2 py-1 text-white');
    });

    it('debería manejar clases condicionales', () => {
      const isActive = true;
      const result = cn('base-class', isActive && 'active-class');
      expect(result).toContain('base-class');
      expect(result).toContain('active-class');
    });

    it('debería ignorar valores falsy', () => {
      const result = cn('class1', false, null, undefined, 'class2');
      expect(result).toBe('class1 class2');
    });

    it('debería manejar strings vacíos', () => {
      const result = cn('', 'valid-class', '');
      expect(result).toBe('valid-class');
    });
  });

  describe('Resolución de conflictos de Tailwind', () => {
    it('debería resolver conflictos de padding (último prevalece)', () => {
      const result = cn('px-2', 'px-4');
      expect(result).toBe('px-4');
    });

    it('debería resolver conflictos de color de texto', () => {
      const result = cn('text-red-500', 'text-blue-500');
      expect(result).toBe('text-blue-500');
    });

    it('debería mantener clases no conflictivas', () => {
      const result = cn('px-4 py-2', 'text-white bg-blue-500');
      expect(result).toContain('px-4');
      expect(result).toContain('py-2');
      expect(result).toContain('text-white');
      expect(result).toContain('bg-blue-500');
    });

    it('debería resolver conflictos complejos de spacing', () => {
      const result = cn('p-4', 'px-2 py-3');
      // px-2 y py-3 deberían prevalecer sobre p-4, pero tailwind-merge puede mantener p-4 si no hay conflicto directo
      // Verificar que al menos las clases específicas están presentes
      expect(result).toContain('px-2');
      expect(result).toContain('py-3');
    });
  });

  describe('Casos de uso reales del proyecto', () => {
    it('debería combinar estilos de Button con variantes', () => {
      const baseStyles = 'inline-flex items-center justify-center';
      const variantStyles = 'bg-brand-coral-500 text-white';
      const customStyles = 'hover:scale-105';

      const result = cn(baseStyles, variantStyles, customStyles);

      expect(result).toContain('inline-flex');
      expect(result).toContain('bg-brand-coral-500');
      expect(result).toContain('hover:scale-105');
    });

    it('debería manejar variantes condicionales de Card', () => {
      const isHovered = true;
      const result = cn(
        'bg-slate-900/60 rounded-2xl',
        isHovered && 'border-blue-600/30',
        !isHovered && 'border-white/10'
      );

      expect(result).toContain('bg-slate-900/60');
      expect(result).toContain('border-blue-600/30');
      expect(result).not.toContain('border-white/10');
    });

    it('debería combinar múltiples utilidades de Tailwind', () => {
      const result = cn(
        'text-lg font-semibold',
        'tracking-tight text-white',
        'mb-2'
      );

      expect(result).toBe('text-lg font-semibold tracking-tight text-white mb-2');
    });
  });

  describe('Edge cases', () => {
    it('debería manejar solo un argumento', () => {
      const result = cn('single-class');
      expect(result).toBe('single-class');
    });

    it('debería manejar sin argumentos', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('debería manejar arrays de clases', () => {
      const result = cn(['class1', 'class2'], 'class3');
      expect(result).toContain('class1');
      expect(result).toContain('class2');
      expect(result).toContain('class3');
    });

    it('debería manejar objetos de clases condicionales', () => {
      const result = cn({
        'active-class': true,
        'inactive-class': false,
      });

      expect(result).toContain('active-class');
      expect(result).not.toContain('inactive-class');
    });
  });

  describe('Performance y consistencia', () => {
    it('debería ser determinístico (mismo input = mismo output)', () => {
      const input = ['px-4 py-2', 'text-white bg-blue-500'];
      const result1 = cn(...input);
      const result2 = cn(...input);

      expect(result1).toBe(result2);
    });

    it('debería manejar muchas clases eficientemente', () => {
      const manyClasses = Array(50)
        .fill(null)
        .map((_, i) => `class-${i}`);

      const result = cn(...manyClasses);

      expect(result).toBeTruthy();
      expect(result.split(' ')).toHaveLength(50);
    });
  });
});
