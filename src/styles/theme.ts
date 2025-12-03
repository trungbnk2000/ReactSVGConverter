// src/styles/theme.ts

/**
 * Dark theme color system
 */
export const colors = {
  background: {
    primary: '#0a0a0a',
    secondary: '#141414',
    tertiary: '#1e1e1e',
    hover: '#2a2a2a',
  },
  border: {
    default: '#2a2a2a',
    focus: '#3a3a3a',
    active: '#6366f1',
  },
  text: {
    primary: '#f5f5f5',
    secondary: '#a3a3a3',
    muted: '#737373',
  },
  accent: {
    indigo: '#6366f1',
    purple: '#8b5cf6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
};

/**
 * Spacing scale
 */
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '48px',
};

/**
 * Border radius
 */
export const borderRadius = {
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  full: '9999px',
};

/**
 * Typography
 */
export const typography = {
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", "Courier New", monospace',
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

/**
 * Shadows
 */
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
  indigo: '0 10px 15px -3px rgba(99, 102, 241, 0.3)',
};

/**
 * Z-index layers
 */
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  modal: 1200,
  popover: 1300,
  tooltip: 1400,
};

/**
 * Breakpoints
 */
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};
