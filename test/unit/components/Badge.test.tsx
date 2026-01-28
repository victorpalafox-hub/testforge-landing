/**
 * Tests de Componente - Badge
 *
 * Valida el componente Badge con todas sus variantes.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/ui/Badge';

describe('Badge Component', () => {
  describe('Renderizado básico', () => {
    it('debería renderizar con texto', () => {
      render(<Badge>Test Badge</Badge>);

      expect(screen.getByText('Test Badge')).toBeInTheDocument();
    });

    it('debería renderizar como un div', () => {
      const { container } = render(<Badge>Badge</Badge>);

      const badge = container.firstChild as HTMLElement;
      expect(badge.tagName).toBe('DIV');
    });

    it('debería aplicar className personalizado', () => {
      const { container } = render(<Badge className="custom-class">Badge</Badge>);

      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('custom-class');
    });
  });

  describe('Variantes de estilo', () => {
    it('debería aplicar variante "default" por defecto', () => {
      const { container } = render(<Badge>Default</Badge>);

      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-slate-800/50');
      expect(badge).toHaveClass('text-slate-300');
    });

    it('debería aplicar variante "urgency"', () => {
      const { container } = render(<Badge variant="urgency">Urgency</Badge>);

      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-brand-coral-500/10');
      expect(badge).toHaveClass('text-brand-coral-400');
    });

    it('debería aplicar variante "new"', () => {
      const { container } = render(<Badge variant="new">New</Badge>);

      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-slate-900/80');
      expect(badge).toHaveClass('text-slate-400');
    });

    it('debería aplicar variante "social-proof"', () => {
      const { container } = render(<Badge variant="social-proof">Social</Badge>);

      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-brand-blue-600/10');
      expect(badge).toHaveClass('text-blue-300');
    });
  });

  describe('Estilos base', () => {
    it('debería tener estilos base aplicados', () => {
      const { container } = render(<Badge>Badge</Badge>);

      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('inline-flex');
      expect(badge).toHaveClass('items-center');
      expect(badge).toHaveClass('rounded-full');
      expect(badge).toHaveClass('px-3');
      expect(badge).toHaveClass('py-1');
      expect(badge).toHaveClass('text-xs');
      expect(badge).toHaveClass('font-medium');
    });

    it('debería tener transición', () => {
      const { container } = render(<Badge>Animated</Badge>);

      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('transition-all');
      expect(badge).toHaveClass('duration-300');
    });

    it('debería tener gap entre elementos', () => {
      const { container } = render(<Badge>Badge</Badge>);

      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('gap-1.5');
    });
  });

  describe('Casos de uso del proyecto', () => {
    it('debería renderizar badge de urgencia en header marquee', () => {
      const { container } = render(
        <Badge variant="urgency">3 FREE TRIALS</Badge>
      );

      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-brand-coral-500/10');
      expect(screen.getByText('3 FREE TRIALS')).toBeInTheDocument();
    });

    it('debería renderizar badge de social proof en hero', () => {
      const { container } = render(
        <Badge variant="social-proof">40+ QA TEAMS TRUST TESTFORGE</Badge>
      );

      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-brand-blue-600/10');
      expect(screen.getByText(/40\+ QA TEAMS/i)).toBeInTheDocument();
    });

    it('debería renderizar badge de categoría en DatasetCard', () => {
      const { container } = render(<Badge>Fiscal</Badge>);

      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-slate-800/50');
      expect(screen.getByText('Fiscal')).toBeInTheDocument();
    });

    it('debería renderizar badge "NEW" para features nuevas', () => {
      const { container } = render(<Badge variant="new">NUEVO</Badge>);

      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-slate-900/80');
      expect(screen.getByText('NUEVO')).toBeInTheDocument();
    });
  });

  describe('Contenido dinámico', () => {
    it('debería renderizar múltiples children', () => {
      render(
        <Badge>
          <span>Icon</span>
          <span>Text</span>
        </Badge>
      );

      expect(screen.getByText('Icon')).toBeInTheDocument();
      expect(screen.getByText('Text')).toBeInTheDocument();
    });

    it('debería manejar contenido vacío', () => {
      const { container } = render(<Badge />);

      const badge = container.firstChild as HTMLElement;
      expect(badge).toBeInTheDocument();
    });
  });

  describe('Props HTML', () => {
    it('debería soportar onClick', () => {
      const handleClick = vi.fn();
      const { container } = render(<Badge onClick={handleClick}>Clickable</Badge>);

      const badge = container.firstChild as HTMLElement;
      badge.click();

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('debería soportar data attributes', () => {
      const { container } = render(
        <Badge data-testid="test-badge">Badge</Badge>
      );

      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveAttribute('data-testid', 'test-badge');
    });

    it('debería soportar aria attributes', () => {
      const { container } = render(
        <Badge aria-label="Custom label">Badge</Badge>
      );

      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveAttribute('aria-label', 'Custom label');
    });
  });

  describe('Combinaciones', () => {
    it('debería combinar variante + className', () => {
      const { container } = render(
        <Badge variant="urgency" className="custom">
          Combined
        </Badge>
      );

      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-brand-coral-500/10'); // variant
      expect(badge).toHaveClass('custom'); // className
    });
  });
});
