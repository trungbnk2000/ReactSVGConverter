// src/store/converterStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  ConverterConfig,
  ConversionResult,
  ConfigPreset,
} from '../types/converter';
import { convertSVGToReactNative } from '../core/converter/index';

/**
 * Default converter configuration
 */
const DEFAULT_CONFIG: ConverterConfig = {
  outputFormat: 'react-native',
  component: {
    name: 'SvgComponent',
    exportType: 'default',
    typescript: true,
    memo: false,
    forwardRef: false,
  },
  dimensions: {
    mode: 'remove',
    preserveViewBox: true,
  },
  props: {
    expandProps: 'end',
    native: true,
    titleProp: false,
    descProp: false,
  },
  icon: {
    enabled: false,
    defaultSize: 24,
    replaceColor: false,
    accessible: true,
  },
  attributes: {
    replacements: [],
    removeDataAttributes: true,
    removeAriaAttributes: false,
  },
  svgo: {
    enabled: true,
    plugins: [
      { name: 'removeDoctype' },
      { name: 'removeXMLProcInst' },
      { name: 'removeComments' },
      { name: 'removeMetadata' },
      { name: 'removeEditorsNSData' },
      { name: 'cleanupAttrs' },
      { name: 'mergeStyles' },
      { name: 'inlineStyles' },
      { name: 'minifyStyles' },
      { name: 'cleanupIds' },
      { name: 'removeUselessDefs' },
      { name: 'cleanupNumericValues' },
      { name: 'convertColors' },
      { name: 'removeUnknownsAndDefaults' },
      { name: 'removeNonInheritableGroupAttrs' },
      { name: 'removeUselessStrokeAndFill' },
      { name: 'removeViewBox', params: { removeViewBox: false } },
      { name: 'cleanupEnableBackground' },
      { name: 'removeHiddenElems' },
      { name: 'removeEmptyText' },
      { name: 'convertShapeToPath' },
      { name: 'convertEllipseToCircle' },
      { name: 'moveElemsAttrsToGroup' },
      { name: 'moveGroupAttrsToElems' },
      { name: 'collapseGroups' },
      { name: 'convertPathData' },
      { name: 'convertTransform' },
      { name: 'removeEmptyAttrs' },
      { name: 'removeEmptyContainers' },
      { name: 'mergePaths' },
      { name: 'removeUnusedNS' },
      { name: 'sortAttrs' },
      { name: 'sortDefsChildren' },
      { name: 'removeTitle' },
      { name: 'removeDesc' },
    ],
  },
  codeStyle: {
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    printWidth: 100,
  },
};

/**
 * Converter store interface
 */
interface ConverterStore {
  // ===== INPUT STATE =====
  svgInput: string;
  setSvgInput: (svg: string) => void;

  // ===== OUTPUT STATE =====
  generatedCode: string;
  generatedImports: string;
  generatedTypes: string;
  generatedUsageExample: string;
  componentName: string;
  error: string | null;
  warnings: string[];

  // ===== CONVERSION STATE =====
  isConverting: boolean;
  lastConvertTime: number | null;

  // ===== CONFIGURATION =====
  config: ConverterConfig;
  updateConfig: <K extends keyof ConverterConfig>(
    key: K,
    value: ConverterConfig[K]
  ) => void;
  setConfig: (config: Partial<ConverterConfig>) => void;
  resetConfig: () => void;

  // ===== ACTIONS =====
  convert: () => Promise<void>;
  reset: () => void;
  clearError: () => void;

  // ===== PRESETS =====
  presets: Record<string, ConfigPreset>;
  savePreset: (name: string, description?: string) => void;
  loadPreset: (id: string) => void;
  deletePreset: (id: string) => void;
}

/**
 * Create converter store with persistence
 */
export const useConverterStore = create<ConverterStore>()(
  persist(
    (set, get) => ({
      // ===== INITIAL STATE =====
      svgInput: '',
      generatedCode: '',
      generatedImports: '',
      generatedTypes: '',
      generatedUsageExample: '',
      componentName: 'SvgComponent',
      error: null,
      warnings: [],
      isConverting: false,
      lastConvertTime: null,
      config: DEFAULT_CONFIG,
      presets: {},

      // ===== INPUT ACTIONS =====
      setSvgInput: (svg) => {
        set({ svgInput: svg, error: null });
      },

      // ===== CONFIGURATION ACTIONS =====
      updateConfig: (key, value) => {
        set((state) => ({
          config: {
            ...state.config,
            [key]: value,
          },
        }));
        // Auto-convert after config change if there's input
        const { svgInput } = get();
        if (svgInput.trim()) {
          get().convert();
        }
      },

      setConfig: (partial) => {
        set((state) => ({
          config: { ...state.config, ...partial },
        }));
        // Auto-convert after config change if there's input
        const { svgInput } = get();
        if (svgInput.trim()) {
          get().convert();
        }
      },

      resetConfig: () => {
        set({ config: DEFAULT_CONFIG });
      },

      // ===== CONVERSION ACTION =====
      convert: async () => {
        const { svgInput, config } = get();

        // If no input, clear output
        if (!svgInput.trim()) {
          set({
            generatedCode: '',
            generatedImports: '',
            generatedTypes: '',
            generatedUsageExample: '',
            error: null,
            warnings: [],
          });
          return;
        }

        set({ isConverting: true, error: null, warnings: [] });

        try {
          const startTime = Date.now();

          // Perform conversion
          const result: ConversionResult = await convertSVGToReactNative(
            svgInput,
            config
          );

          const endTime = Date.now();

          if (result.success) {
            set({
              generatedCode: result.code,
              generatedImports: result.imports || '',
              generatedTypes: result.typeDefinitions || '',
              generatedUsageExample: result.usageExample || '',
              componentName: config.component.name,
              error: null,
              warnings: result.warnings || [],
              lastConvertTime: endTime - startTime,
            });
          } else {
            set({
              error: result.error || 'Conversion failed',
              warnings: result.warnings || [],
              generatedCode: '',
              generatedImports: '',
              generatedTypes: '',
              generatedUsageExample: '',
            });
          }
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : 'Unknown error occurred',
            generatedCode: '',
            generatedImports: '',
            generatedTypes: '',
            generatedUsageExample: '',
          });
        } finally {
          set({ isConverting: false });
        }
      },

      // ===== RESET ACTION =====
      reset: () => {
        set({
          svgInput: '',
          generatedCode: '',
          generatedImports: '',
          generatedTypes: '',
          generatedUsageExample: '',
          error: null,
          warnings: [],
          componentName: 'SvgComponent',
        });
      },

      // ===== CLEAR ERROR =====
      clearError: () => {
        set({ error: null, warnings: [] });
      },

      // ===== PRESET ACTIONS =====
      savePreset: (name, description) => {
        const { config, presets } = get();
        const id = `preset_${Date.now()}`;
        const newPreset: ConfigPreset = {
          id,
          name,
          description,
          config: { ...config },
          createdAt: Date.now(),
        };
        set({
          presets: {
            ...presets,
            [id]: newPreset,
          },
        });
      },

      loadPreset: (id) => {
        const { presets } = get();
        const preset = presets[id];
        if (preset) {
          set({ config: { ...preset.config } });
          // Auto-convert with new config
          const { svgInput } = get();
          if (svgInput.trim()) {
            get().convert();
          }
        }
      },

      deletePreset: (id) => {
        const { presets } = get();
        const newPresets = { ...presets };
        delete newPresets[id];
        set({ presets: newPresets });
      },
    }),
    {
      name: 'svg-converter-store',
      // Only persist config and presets, not the input/output
      partialize: (state) => ({
        config: state.config,
        presets: state.presets,
      }),
    }
  )
);
