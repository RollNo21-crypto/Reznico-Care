/**
 * Reznico Care Design System
 * Based on Landing Page Aesthetics
 */

export const colors = {
  // Primary Brand Color - Lime Green
  primary: {
    DEFAULT: '#D4FF00',
    hover: '#C4EF00',
    dark: '#B5E000',
  },
  
  // Background Colors
  background: {
    dark: '#000000',
    gray900: '#111827',
    gray800: '#1F2937',
  },
  
  // Text Colors
  text: {
    white: '#FFFFFF',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
  },
}

export const typography = {
  // Font Families (using system defaults)
  fontFamily: {
    sans: 'system-ui, -apple-system, sans-serif',
  },
  
  // Font Sizes
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
    '7xl': '4.5rem',   // 72px
    '8xl': '6rem',     // 96px
    '9xl': '8rem',     // 128px
  },
  
  // Font Weights
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  // Letter Spacing
  tracking: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
  },
}

export const spacing = {
  // Consistent spacing scale
  px: {
    mobile: '1.5rem',    // 24px (px-6)
    tablet: '3rem',      // 48px (md:px-12)
    desktop: '4rem',     // 64px (lg:px-16)
  },
  py: {
    mobile: '1.25rem',   // 20px (py-5)
    tablet: '1.5rem',    // 24px
    desktop: '2rem',     // 32px
  },
  gap: {
    sm: '0.75rem',       // 12px (gap-3)
    md: '1rem',          // 16px (gap-4)
    lg: '1.5rem',        // 24px (gap-6)
    xl: '2rem',          // 32px (gap-8)
  },
}

export const borderRadius = {
  sm: '0.375rem',   // 6px
  md: '0.5rem',     // 8px
  lg: '0.75rem',    // 12px
  xl: '1rem',       // 16px
  '2xl': '1.5rem',  // 24px
  full: '9999px',   // rounded-full
}

export const effects = {
  // Transitions
  transition: {
    DEFAULT: 'all 300ms',
    fast: 'all 150ms',
    slow: 'all 500ms',
  },
  
  // Transform scales
  scale: {
    hover: 1.05,
    active: 0.95,
    button: 1.10,
  },
  
  // Shadows
  shadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },
}

export const components = {
  // Button Styles
  button: {
    primary: {
      className: 'rounded-full bg-[#D4FF00] hover:bg-[#C4EF00] text-black font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl',
    },
    outline: {
      className: 'rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-300',
    },
  },
  
  // Card Styles
  card: {
    dark: {
      className: 'border-gray-800 shadow-2xl bg-gray-900/50 backdrop-blur-sm',
    },
  },
  
  // Input Styles
  input: {
    dark: {
      className: 'bg-gray-800/50 border-gray-700 text-white rounded-lg h-11',
    },
  },
}

// Gradient Configurations
export const gradients = {
  background: {
    dark: 'from-gray-900 via-black to-gray-900',
    primary: 'from-[#D4FF00] to-[#C4EF00]',
  },
  text: {
    primary: 'from-[#D4FF00] to-[#C4EF00]',
  },
  overlay: {
    video: 'from-black/40 via-transparent to-black/60',
  },
}
