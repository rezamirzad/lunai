import React from 'react';
import { cn } from '@workspace/shared';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  clean?: boolean; // If true, removes default padding
}

export const Container = ({ 
  className, 
  size = 'md', 
  clean = false,
  children, 
  ...props 
}: ContainerProps) => {
  const sizes = {
    sm: 'max-w-xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  };

  return (
    <div 
      className={cn(
        'mx-auto w-full', 
        !clean && 'px-4 md:px-6',
        sizes[size], 
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};
Container.displayName = 'Container';
