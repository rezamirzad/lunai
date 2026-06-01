/**
 * Canonical Breakpoints for LunAI
 * These are the standard breakpoints used across the workspace to ensure consistent responsiveness.
 * They align with Tailwind CSS defaults for seamless integration.
 */

export const BREAKPOINTS = {
  // Mobile: 0px - 639px
  MOBILE: 320,
  
  // Tablet: 640px - 1023px
  TABLET: 768,
  
  // Desktop: 1024px+
  DESKTOP: 1024,
  
  // Large Desktop: 1280px+
  WIDE: 1280,
  
  // Ultra Wide: 1536px+
  ULTRA: 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * Media query helper strings for use in styled-components or JS-based styles.
 */
export const QUERIES = {
  sm: `(min-width: ${BREAKPOINTS.MOBILE}px)`,
  md: `(min-width: ${BREAKPOINTS.TABLET}px)`,
  lg: `(min-width: ${BREAKPOINTS.DESKTOP}px)`,
  xl: `(min-width: ${BREAKPOINTS.WIDE}px)`,
  '2xl': `(min-width: ${BREAKPOINTS.ULTRA}px)`,
} as const;
