import React from 'react';
import { cn } from '@workspace/shared';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Section = ({ className, containerSize = 'md', children, ...props }: SectionProps) => {
  const containerSizes = {
    sm: 'max-w-xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  };

  return (
    <section className={cn('py-24 px-6', className)} {...props}>
      <div className={cn('mx-auto', containerSizes[containerSize as keyof typeof containerSizes] || '')}>
        {children}
      </div>
    </section>
  );
};
Section.displayName = 'Section';
