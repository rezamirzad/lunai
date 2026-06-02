/**
 * Teal & Black Theme Configuration
 * 
 * This file defines the design tokens for the Neon UI integration.
 * It is consumed by the Tailwind configuration to ensure visual consistency.
 */

export const neonTheme = {
  colors: {
    black: '#000000',
    white: '#FFFFFF',
    teal: {
      50: '#F0FDFA',
      100: '#CCFBF1',
      200: '#99F6E4',
      300: '#5EEAD4',
      400: '#2DD4BF',
      500: '#14B8A6', // Brand Teal
      600: '#0D9488',
      700: '#0F766E',
      800: '#115E59',
      900: '#134E4A',
      950: '#042F2E',
    },
    // Semantic colors
    brand: {
      primary: '#14B8A6', // Teal 500
      secondary: '#000000', // Black
      accent: '#2DD4BF', // Teal 400
    },
    background: {
      primary: '#000000',
      secondary: '#111111',
      tertiary: '#1A1A1A',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#99F6E4', // Teal 200
      muted: '#666666',
    },
    border: {
      primary: '#134E4A', // Teal 900
      secondary: '#0F766E', // Teal 700
    }
  },
  spacing: {
    touchTarget: '44px',
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    letterSpacing: {
      brand: '0.1em',
    }
  }
};
