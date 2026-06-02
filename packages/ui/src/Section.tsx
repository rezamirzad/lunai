import React from 'react';
import { cn } from '@workspace/shared';
import { Container } from './Container';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  clean?: boolean;
  variant?: 'primary' | 'secondary' | 'tertiary';
}

export const Section = ({ 
  className, 
  containerSize = 'md', 
  clean = false,
  variant = 'primary',
  children, 
  ...props 
}: SectionProps) => {
  const variants = {
    primary: 'bg-background-primary',
    secondary: 'bg-background-secondary',
    tertiary: 'bg-background-tertiary'
  };

  return (
    <section 
      className={cn(
        'py-12 md:py-24', 
        variants[variant],
        className
      )} 
      {...props}
    >
      <Container size={containerSize} clean={clean}>
        {children}
      </Container>
    </section>
  );
};
Section.displayName = 'Section';
