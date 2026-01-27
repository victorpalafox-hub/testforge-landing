import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  // Base styles - Cobalt professional
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all duration-300',
  {
    variants: {
      variant: {
        // Default: Slate discreto
        default:
          'bg-slate-800/50 border border-white/10 text-slate-300 backdrop-blur-sm',
        // Urgency: Coral suave (para marquee)
        urgency:
          'bg-brand-coral-500/10 border border-brand-coral-500/30 text-brand-coral-400 shadow-sm',
        // New: Profesional slate (para social proof)
        new:
          'bg-slate-900/80 border border-white/10 text-slate-400 backdrop-blur-md',
        // Social-proof: Blue sutil
        'social-proof':
          'bg-brand-blue-600/10 border border-brand-blue-500/20 text-blue-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
