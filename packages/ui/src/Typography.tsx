import React from 'react';
import { cn } from '@workspace/shared';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'label';
  variant?: 'hero' | 'title' | 'subtitle' | 'body' | 'badge' | 'label';
}

export const Typography = ({ 
  as: Component = 'p', 
  variant = 'body', 
  className, 
  children, 
  ...props 
}: TypographyProps) => {
  const variants = {
    hero: 'text-[6rem] md:text-[12rem] lg:text-[18rem] font-black tracking-tighter text-text-primary leading-none mb-8 select-none',
    title: 'text-2xl font-black mb-12 uppercase tracking-brand border-l-4 border-brand-primary pl-4 text-text-primary',
    subtitle: 'text-text-secondary text-lg md:text-2xl max-w-4xl leading-relaxed mb-16 font-medium',
    body: 'text-zinc-400 text-base leading-relaxed',
    badge: 'text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] text-brand-primary',
    label: 'block text-[10px] font-black uppercase tracking-brand text-text-muted mb-2'
  };

  return (
    <Component className={cn(variants[variant as keyof typeof variants] || '', className)} {...props}>
      {children}
    </Component>
  );
};
Typography.displayName = 'Typography';
