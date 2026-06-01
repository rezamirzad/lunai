import React from 'react';
import { cn } from '@workspace/shared';
import { Container } from './Container';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  clean?: boolean;
}

export const Section = ({ 
  className, 
  containerSize = 'md', 
  clean = false,
  children, 
  ...props 
}: SectionProps) => {
  return (
    <section className={cn('py-12 md:py-24', className)} {...props}>
      <Container size={containerSize} clean={clean}>
        {children}
      </Container>
    </section>
  );
};
Section.displayName = 'Section';
