import React from 'react';
import { cn } from '@workspace/shared';

/**
 * Input & Textarea Design Tokens aligned with Neon UI "Teal & Black" brand identity.
 * Strictly prop-driven and stateless.
 */
export const inputVariants = {
  base: 'bg-background-primary border border-border-primary p-4 text-text-primary placeholder:text-text-muted focus:border-brand-primary outline-none transition-all duration-300 min-h-[44px]',
  fluid: 'w-full md:w-auto'
};

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** If true, the input will take full width on mobile devices */
  mobileFullWidth?: boolean;
}

/**
 * Input Component
 * 
 * Enforces "Teal & Black" design tokens and Mobile-First standards.
 * Follows the "Dumb" wrapping strategy.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, mobileFullWidth = true, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          inputVariants.base,
          mobileFullWidth && inputVariants.fluid,
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** If true, the textarea will take full width on mobile devices */
  mobileFullWidth?: boolean;
}

/**
 * Textarea Component
 * 
 * Enforces "Teal & Black" design tokens and Mobile-First standards.
 * Follows the "Dumb" wrapping strategy.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, mobileFullWidth = true, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          inputVariants.base,
          mobileFullWidth && inputVariants.fluid,
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';
