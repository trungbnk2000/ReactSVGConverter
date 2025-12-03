// src/store/uiStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UIState, PanelSizes, UserPreferences } from '../types/config';

/**
 * Default panel sizes (in pixels or percentages)
 */
const DEFAULT_PANEL_SIZES: PanelSizes = {
  config: 320, // Fixed width for config panel
  editor: 50, // Percentage
  output: 50, // Percentage
};

/**
 * Default user preferences
 */
const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'dark',
  autoConvert: true,
  showTooltips: true,
  rememberConfig: true,
};

/**
 * UI store interface
 */
interface UIStore extends UIState {
  // ===== PANEL ACTIONS =====
  toggleConfigPanel: () => void;
  setPreviewMode: (mode: 'code' | 'visual' | 'split') => void;
  updatePanelSize: (panel: keyof PanelSizes, size: number) => void;
  resetPanelSizes: () => void;

  // ===== PREFERENCE ACTIONS =====
  updatePreference: <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => void;
  resetPreferences: () => void;
}

/**
 * Create UI store with persistence
 */
export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      // ===== INITIAL STATE =====
      configPanelOpen: true,
      previewMode: 'code',
      panelSizes: DEFAULT_PANEL_SIZES,
      preferences: DEFAULT_PREFERENCES,

      // ===== PANEL ACTIONS =====
      toggleConfigPanel: () => {
        set((state) => ({
          configPanelOpen: !state.configPanelOpen,
        }));
      },

      setPreviewMode: (mode) => {
        set({ previewMode: mode });
      },

      updatePanelSize: (panel, size) => {
        set((state) => ({
          panelSizes: {
            ...state.panelSizes,
            [panel]: size,
          },
        }));
      },

      resetPanelSizes: () => {
        set({ panelSizes: DEFAULT_PANEL_SIZES });
      },

      // ===== PREFERENCE ACTIONS =====
      updatePreference: (key, value) => {
        set((state) => ({
          preferences: {
            ...state.preferences,
            [key]: value,
          },
        }));
      },

      resetPreferences: () => {
        set({ preferences: DEFAULT_PREFERENCES });
      },
    }),
    {
      name: 'svg-converter-ui-store',
      // Persist all UI state
    }
  )
);
