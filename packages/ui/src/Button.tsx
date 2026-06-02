import React from 'react';
import { cn } from '@workspace/shared';

/**
 * Button Variants aligned with Neon UI "Teal & Black" brand identity.
 * Strictly prop-driven and stateless.
 */
export const buttonVariants = {
  base: 'font-black uppercase tracking-brand transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center text-center min-h-[44px] min-w-[44px]',
  variant: {
    primary: 'bg-brand-primary text-black hover:bg-brand-accent',
    secondary: 'bg-black text-white border border-brand-primary hover:bg-brand-primary hover:text-black',
    outline: 'border border-teal-900 text-teal-200 hover:border-brand-primary hover:text-white',
    ghost: 'text-teal-200 hover:text-white hover:bg-teal-900/20'
  },
  size: {
    sm: 'px-4 py-2 text-[10px]',
    md: 'px-6 py-3 text-xs',
    lg: 'px-16 py-6 text-sm'
  }
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The visual style of the button */
  variant?: keyof typeof buttonVariants.variant;
  /** The size of the button */
  size?: keyof typeof buttonVariants.size;
  /** If true, the button will take full width on mobile devices */
  mobileFullWidth?: boolean;
}

/**
 * Button Component
 * 
 * Enforces "Teal & Black" design tokens and Mobile-First standards.
 * Follows the "Dumb" wrapping strategy as per docs/neon-ui-architecture.md.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', mobileFullWidth = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants.base,
          buttonVariants.variant[variant],
          buttonVariants.size[size],
          mobileFullWidth && 'w-full md:w-auto',
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
