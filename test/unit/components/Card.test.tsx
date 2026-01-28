/**
 * Tests de Componente - Card y subcomponentes
 *
 * Valida Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/Card';

describe('Card Component', () => {
  describe('Card - Renderizado básico', () => {
    it('debería renderizar un div', () => {
      const { container } = render(<Card>Content</Card>);

      const card = container.firstChild as HTMLElement;
      expect(card.tagName).toBe('DIV');
    });

    it('debería renderizar contenido children', () => {
      render(<Card>Test content</Card>);

      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('debería aplicar className personalizado', () => {
      const { container } = render(<Card className="custom-class">Test</Card>);

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('custom-class');
    });
  });

  describe('Card - Variantes de estilo', () => {
    it('debería aplicar variante "default" por defecto', () => {
      const { container } = render(<Card>Default</Card>);

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('bg-slate-900/60');
      expect(card).toHaveClass('backdrop-blur-sm');
    });

    it('debería aplicar variante "glass"', () => {
      const { container } = render(<Card variant="glass">Glass</Card>);

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('bg-white/5');
      expect(card).toHaveClass('backdrop-blur-xl');
    });

    it('debería aplicar variante "elevated"', () => {
      const { container } = render(<Card variant="elevated">Elevated</Card>);

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('bg-slate-900/80');
      expect(card).toHaveClass('shadow-2xl');
    });

    it('debería aplicar variante "gradient"', () => {
      const { container } = render(<Card variant="gradient">Gradient</Card>);

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('bg-gradient-to-br');
    });
  });

  describe('Card - Padding', () => {
    it('debería aplicar padding "md" por defecto', () => {
      const { container } = render(<Card>Content</Card>);

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('p-6');
    });

    it('debería aplicar padding "none"', () => {
      const { container } = render(<Card padding="none">Content</Card>);

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('p-0');
    });

    it('debería aplicar padding "sm"', () => {
      const { container } = render(<Card padding="sm">Content</Card>);

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('p-4');
    });

    it('debería aplicar padding "lg"', () => {
      const { container } = render(<Card padding="lg">Content</Card>);

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('p-8');
    });
  });

  describe('Card - Efectos hover', () => {
    it('debería tener efectos hover aplicados', () => {
      const { container } = render(<Card>Hover me</Card>);

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('hover:-translate-y-0.5');
      expect(card).toHaveClass('hover:border-brand-blue-600/30');
    });

    it('debería tener transición', () => {
      const { container } = render(<Card>Animated</Card>);

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('transition-all');
      expect(card).toHaveClass('duration-400');
    });
  });

  describe('CardHeader', () => {
    it('debería renderizar un div', () => {
      const { container } = render(<CardHeader>Header</CardHeader>);

      const header = container.firstChild as HTMLElement;
      expect(header.tagName).toBe('DIV');
    });

    it('debería tener flex layout', () => {
      const { container } = render(<CardHeader>Header</CardHeader>);

      const header = container.firstChild as HTMLElement;
      expect(header).toHaveClass('flex');
      expect(header).toHaveClass('flex-col');
      expect(header).toHaveClass('space-y-1.5');
    });
  });

  describe('CardTitle', () => {
    it('debería renderizar un h3', () => {
      render(<CardTitle>Title</CardTitle>);

      const title = screen.getByRole('heading', { level: 3 });
      expect(title).toBeInTheDocument();
    });

    it('debería tener estilos de título', () => {
      render(<CardTitle>Title</CardTitle>);

      const title = screen.getByRole('heading');
      expect(title).toHaveClass('text-2xl');
      expect(title).toHaveClass('font-bold');
      expect(title).toHaveClass('text-white');
    });
  });

  describe('CardDescription', () => {
    it('debería renderizar un párrafo', () => {
      render(<CardDescription>Description text</CardDescription>);

      const description = screen.getByText('Description text');
      expect(description.tagName).toBe('P');
    });

    it('debería tener estilos de descripción', () => {
      render(<CardDescription>Description</CardDescription>);

      const description = screen.getByText('Description');
      expect(description).toHaveClass('text-sm');
      expect(description).toHaveClass('text-slate-400');
    });
  });

  describe('CardContent', () => {
    it('debería renderizar un div', () => {
      const { container } = render(<CardContent>Content</CardContent>);

      const content = container.firstChild as HTMLElement;
      expect(content.tagName).toBe('DIV');
    });

    it('debería tener padding top 0', () => {
      const { container } = render(<CardContent>Content</CardContent>);

      const content = container.firstChild as HTMLElement;
      expect(content).toHaveClass('pt-0');
    });
  });

  describe('CardFooter', () => {
    it('debería renderizar un div', () => {
      const { container } = render(<CardFooter>Footer</CardFooter>);

      const footer = container.firstChild as HTMLElement;
      expect(footer.tagName).toBe('DIV');
    });

    it('debería tener flex layout', () => {
      const { container } = render(<CardFooter>Footer</CardFooter>);

      const footer = container.firstChild as HTMLElement;
      expect(footer).toHaveClass('flex');
      expect(footer).toHaveClass('items-center');
      expect(footer).toHaveClass('pt-4');
    });
  });

  describe('Card - Composición completa', () => {
    it('debería renderizar una Card completa con todos los subcomponentes', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Test Title</CardTitle>
            <CardDescription>Test Description</CardDescription>
          </CardHeader>
          <CardContent>Test Content</CardContent>
          <CardFooter>Test Footer</CardFooter>
        </Card>
      );

      expect(screen.getByRole('heading', { name: 'Test Title' })).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
      expect(screen.getByText('Test Footer')).toBeInTheDocument();
    });

    it('debería funcionar con variantes y padding combinados', () => {
      const { container } = render(
        <Card variant="glass" padding="lg">
          <CardTitle>Glass Card</CardTitle>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('bg-white/5');
      expect(card).toHaveClass('p-8');
    });
  });

  describe('Ref forwarding', () => {
    it('Card debería forwardear ref', () => {
      const ref = { current: null };

      render(<Card ref={ref as any}>Test</Card>);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('CardHeader debería forwardear ref', () => {
      const ref = { current: null };

      render(<CardHeader ref={ref as any}>Test</CardHeader>);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});
