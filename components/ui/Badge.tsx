import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  // Base styles
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all duration-300',
  {
    variants: {
      variant: {
        urgency:
          'bg-urgency-badge text-background-primary shadow-md animate-pulse',
        new: 'bg-gradient-secondary text-white shadow-glow-purple',
        'social-proof':
          'bg-background-secondary text-text-primary border border-brand-cyan-500/30',
        default:
          'bg-background-secondary text-text-secondary border border-border-default',
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
