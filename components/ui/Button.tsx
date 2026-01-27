import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base styles - Cobalt professional
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        // Primary: Coral CTA with glow
        primary:
          'bg-brand-coral-500 text-white shadow-lg hover:bg-brand-coral-600 hover:shadow-[0_0_50px_rgba(255,140,115,0.5)] hover:scale-105',
        // Secondary: Blue Cobalt
        secondary:
          'bg-brand-blue-600 text-white shadow-md hover:bg-brand-blue-500 hover:shadow-lg',
        // Outline: Blue transparent
        outline:
          'border-2 border-brand-blue-600/30 bg-transparent text-slate-200 hover:bg-brand-blue-600/10 hover:border-brand-cyan-500/50',
        // Ghost: Hover cyan
        ghost:
          'bg-transparent text-slate-300 hover:bg-white/5 hover:text-brand-cyan-500',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
