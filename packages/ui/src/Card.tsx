import React from 'react';
import { cn } from '@workspace/shared';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  bordered?: boolean;
  hoverable?: boolean;
  mobileFullWidth?: boolean;
}

export const Card = ({
  children,
  className,
  padding = 'md',
  bordered = true,
  hoverable = false,
  mobileFullWidth = false,
  ...props
}: CardProps) => {
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        'bg-black transition-all duration-300',
        bordered && 'border border-gray-800 hover:border-blue-500',
        hoverable && 'hover:bg-gray-900',
        mobileFullWidth ? 'w-full md:w-auto' : 'w-auto',
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
Card.displayName = 'Card';
