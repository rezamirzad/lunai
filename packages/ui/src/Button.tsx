import React from 'react';
import { cn } from '@workspace/shared';

export const buttonVariants = {
  base: 'font-black uppercase tracking-widest transition-all duration-300 disabled:opacity-50 inline-block text-center',
  variant: {
    primary: 'bg-white text-black hover:bg-blue-500 hover:text-white',
    secondary: 'bg-blue-500 text-white hover:bg-blue-600',
    outline: 'border border-gray-800 text-white hover:border-blue-500',
    ghost: 'text-gray-400 hover:text-white'
  },
  size: {
    sm: 'px-4 py-2 text-[10px]',
    md: 'px-6 py-3 text-xs',
    lg: 'px-16 py-6 text-sm'
  }
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants.variant;
  size?: keyof typeof buttonVariants.size;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants.base,
          buttonVariants.variant[variant],
          buttonVariants.size[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
