// src/utils/constants.ts

/**
 * Application constants
 */
export const APP_NAME = 'SVG to React Native Converter';
export const APP_VERSION = '1.0.0';

/**
 * Default SVG example
 */
export const DEFAULT_SVG_EXAMPLE = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" fill="#000000"/>
</svg>`;

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  CONVERTER_CONFIG: 'svg-converter-config',
  UI_STATE: 'svg-converter-ui',
  RECENT_SVGS: 'svg-converter-recent',
};

/**
 * Keyboard shortcuts
 */
export const KEYBOARD_SHORTCUTS = {
  CONVERT: 'Ctrl+Enter',
  COPY: 'Ctrl+C',
  CLEAR: 'Ctrl+K',
  DOWNLOAD: 'Ctrl+S',
  TOGGLE_CONFIG: 'Ctrl+B',
};

/**
 * File extensions
 */
export const FILE_EXTENSIONS = {
  TYPESCRIPT: '.tsx',
  JAVASCRIPT: '.jsx',
  TYPE_DEFINITION: '.d.ts',
};

/**
 * Maximum file size (in bytes)
 */
export const MAX_SVG_SIZE = 1024 * 1024; // 1MB
