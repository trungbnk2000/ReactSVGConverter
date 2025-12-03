// src/types/config.ts

import type { ConverterConfig } from './converter';

/**
 * Theme options
 */
export type Theme = 'dark' | 'light';

/**
 * Panel size configuration
 */
export interface PanelSizes {
  config: number;
  editor: number;
  output: number;
}

/**
 * User preferences (persisted to localStorage)
 */
export interface UserPreferences {
  theme: Theme;
  autoConvert: boolean;
  showTooltips: boolean;
  rememberConfig: boolean;
}

/**
 * UI state
 */
export interface UIState {
  configPanelOpen: boolean;
  previewMode: 'code' | 'visual' | 'split';
  panelSizes: PanelSizes;
  preferences: UserPreferences;
}

/**
 * Configuration preset
 */
export interface ConfigPreset {
  id: string;
  name: string;
  description?: string;
  config: ConverterConfig;
  createdAt: number;
}

/**
 * Example SVG
 */
export interface ExampleSVG {
  id: string;
  name: string;
  description: string;
  svg: string;
  category: 'icon' | 'illustration' | 'logo' | 'shape';
}
