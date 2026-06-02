import React from 'react';
import { cn } from '@workspace/shared';

/**
 * Card Design Tokens aligned with Neon UI "Teal & Black" brand identity.
 * Strictly prop-driven and stateless.
 */
export const cardVariants = {
  base: 'bg-background-secondary transition-all duration-300 overflow-hidden',
  bordered: 'border border-border-primary hover:border-brand-primary',
  hoverable: 'hover:bg-background-tertiary cursor-pointer',
  padding: {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  },
};

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The amount of padding inside the card */
  padding?: keyof typeof cardVariants.padding;
  /** If true, the card will have a border */
  bordered?: boolean;
  /** If true, the card will have a hover effect */
  hoverable?: boolean;
  /** If true, the card will take full width on mobile devices */
  mobileFullWidth?: boolean;
}

/**
 * Card Component
 * 
 * Enforces "Teal & Black" design tokens and Mobile-First standards.
 * Follows the "Dumb" wrapping strategy as per docs/neon-ui-architecture.md.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    children, 
    className, 
    padding = 'md', 
    bordered = true, 
    hoverable = false, 
    mobileFullWidth = false, 
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants.base,
          bordered && cardVariants.bordered,
          hoverable && cardVariants.hoverable,
          cardVariants.padding[padding],
          mobileFullWidth && 'w-full md:w-auto',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
