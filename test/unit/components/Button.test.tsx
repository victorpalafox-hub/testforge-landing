/**
 * Tests de Componente - Button
 *
 * Valida el componente Button con todas sus variantes y comportamientos.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/ui/Button';

describe('Button Component', () => {
  describe('Renderizado básico', () => {
    it('debería renderizar con texto', () => {
      render(<Button>Click me</Button>);

      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
    });

    it('debería renderizar como elemento button por defecto', () => {
      render(<Button>Test</Button>);

      const button = screen.getByRole('button');
      expect(button.tagName).toBe('BUTTON');
    });

    it('debería aplicar className personalizado', () => {
      render(<Button className="custom-class">Test</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });
  });

  describe('Variantes de estilo', () => {
    it('debería aplicar variante "primary" por defecto', () => {
      render(<Button>Primary</Button>);

      const button = screen.getByRole('button');
      // Debe tener los estilos de primary (coral)
      expect(button).toHaveClass('bg-brand-coral-500');
    });

    it('debería aplicar variante "secondary"', () => {
      render(<Button variant="secondary">Secondary</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-brand-blue-600');
    });

    it('debería aplicar variante "outline"', () => {
      render(<Button variant="outline">Outline</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('border-2');
      expect(button).toHaveClass('bg-transparent');
    });

    it('debería aplicar variante "ghost"', () => {
      render(<Button variant="ghost">Ghost</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-transparent');
    });
  });

  describe('Tamaños', () => {
    it('debería aplicar tamaño "md" por defecto', () => {
      render(<Button>Medium</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-11');
      expect(button).toHaveClass('px-6');
    });

    it('debería aplicar tamaño "sm"', () => {
      render(<Button size="sm">Small</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-9');
      expect(button).toHaveClass('px-4');
    });

    it('debería aplicar tamaño "lg"', () => {
      render(<Button size="lg">Large</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-14');
      expect(button).toHaveClass('px-8');
    });
  });

  describe('Estados', () => {
    it('debería aplicar estado disabled', () => {
      render(<Button disabled>Disabled</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('disabled:opacity-50');
    });

    it('debería NO ser clickeable cuando está disabled', async () => {
      const handleClick = vi.fn();
      render(<Button disabled onClick={handleClick}>Disabled</Button>);

      const button = screen.getByRole('button');
      await userEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Interacciones', () => {
    it('debería llamar onClick cuando se hace click', async () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Clickable</Button>);

      const button = screen.getByRole('button');
      await userEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('debería pasar el evento al handler onClick', async () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Test</Button>);

      const button = screen.getByRole('button');
      await userEvent.click(button);

      expect(handleClick).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'click',
        })
      );
    });

    it('debería ser focuseable', () => {
      render(<Button>Focus me</Button>);

      const button = screen.getByRole('button');
      button.focus();

      expect(button).toHaveFocus();
    });
  });

  describe('Accesibilidad', () => {
    it('debería tener role="button"', () => {
      render(<Button>Accessible</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('debería soportar aria-label', () => {
      render(<Button aria-label="Custom label">Icon only</Button>);

      const button = screen.getByLabelText('Custom label');
      expect(button).toBeInTheDocument();
    });

    it('debería soportar aria-disabled', () => {
      render(<Button disabled aria-disabled="true">Disabled</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Casos de uso del proyecto', () => {
    it('debería renderizar CTA principal del Hero', () => {
      render(
        <Button variant="primary" size="lg">
          Explorar Datasets
        </Button>
      );

      const button = screen.getByRole('button', { name: /explorar datasets/i });
      expect(button).toHaveClass('bg-brand-coral-500');
      expect(button).toHaveClass('h-14');
    });

    it('debería renderizar botón secundario del Hero', () => {
      render(
        <Button variant="outline" size="lg">
          Descarga Muestra Gratis
        </Button>
      );

      const button = screen.getByRole('button', { name: /descarga muestra/i });
      expect(button).toHaveClass('border-2');
      expect(button).toHaveClass('bg-transparent');
    });

    it('debería renderizar botón de compra en DatasetCard', () => {
      render(
        <Button variant="primary" className="w-full">
          Comprar ahora
        </Button>
      );

      const button = screen.getByRole('button', { name: /comprar ahora/i });
      expect(button).toHaveClass('w-full');
      expect(button).toHaveClass('bg-brand-coral-500');
    });

    it('debería aplicar hover effects (via className)', () => {
      render(<Button>Hover me</Button>);

      const button = screen.getByRole('button');
      // El componente tiene hover:scale-105 y hover:shadow-glow
      expect(button).toHaveClass('hover:bg-brand-coral-600');
      expect(button).toHaveClass('hover:scale-105');
    });
  });

  describe('Estilos de transición', () => {
    it('debería tener transición aplicada', () => {
      render(<Button>Animated</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('transition-all');
      expect(button).toHaveClass('duration-300');
    });
  });

  describe('Combinaciones de props', () => {
    it('debería combinar variant + size + className', () => {
      render(
        <Button variant="secondary" size="sm" className="custom">
          Combined
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-brand-blue-600'); // variant
      expect(button).toHaveClass('h-9'); // size
      expect(button).toHaveClass('custom'); // className
    });
  });

  describe('Ref forwarding', () => {
    it('debería forwardear ref correctamente', () => {
      const ref = { current: null };

      render(<Button ref={ref as any}>With Ref</Button>);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });
});
