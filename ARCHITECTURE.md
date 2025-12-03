# SVG to React Native Converter - Architecture Overview

## 🏛️ System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                       │
│                      (React + TypeScript)                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Config     │  │    Input     │  │    Output    │      │
│  │    Panel     │  │   Editor     │  │   Preview    │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                 │                 │              │
│         └─────────────────┼─────────────────┘              │
│                          │                                │
├──────────────────────────┼────────────────────────────────┤
│                    STATE MANAGEMENT                        │
│                      (Zustand Store)                       │
│                          │                                │
│  ┌──────────────────────────────────────────────────┐     │
│  │  • svgInput                                       │     │
│  │  • generatedCode                                  │     │
│  │  • config (format, dimensions, props, etc.)       │     │
│  │  • uiState (panels, theme, loading)               │     │
│  └──────────────────┬────────────────────────────────┘     │
│                    │                                      │
├────────────────────┼──────────────────────────────────────┤
│               CORE CONVERSION ENGINE                       │
│                                                            │
│  ┌─────────────┐   ┌──────────────┐   ┌──────────────┐   │
│  │   Parser    │──▶│  Transformer │──▶│   Generator  │   │
│  │             │   │              │   │              │   │
│  │ • Validate  │   │ • Elements   │   │ • Component  │   │
│  │ • Parse AST │   │ • Attributes │   │ • Imports    │   │
│  │ • Extract   │   │ • Optimize   │   │ • Types      │   │
│  └─────────────┘   └──────────────┘   └──────────────┘   │
│                                                            │
├────────────────────────────────────────────────────────────┤
│                    UTILITY LAYER                           │
│                                                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │   SVGO   │  │ Prettier │  │Clipboard │  │LocalStore│  │
│  │Optimizer │  │Formatter │  │  Helper  │  │  Helper  │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow

### Conversion Pipeline

```
┌──────────────┐
│ User Input   │
│ (Raw SVG)    │
└──────┬───────┘
       │
       ▼
┌──────────────────┐
│ 1. VALIDATION    │
│ • Valid SVG?     │
│ • Has content?   │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ 2. OPTIMIZATION  │◀── SVGO Config
│ (Optional)       │
│ • Remove junk    │
│ • Simplify paths │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ 3. PARSING       │
│ • Parse to AST   │
│ • Extract info   │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ 4. TRANSFORM     │◀── User Config
│ • Map elements   │    • Format
│ • Fix attributes │    • Dimensions
│ • Apply config   │    • Props
└──────┬───────────┘    • TypeScript
       │               • Icon mode
       ▼
┌──────────────────┐
│ 5. CODE GEN      │
│ • Component code │
│ • Import stmts   │
│ • Type defs      │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ 6. FORMATTING    │
│ • Prettier       │
│ • Syntax check   │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ OUTPUT           │
│ • Display code   │
│ • Visual preview │
│ • Copy/Download  │
└──────────────────┘
```

---

## 🗂️ State Management (Zustand)

### Store Structure

```typescript
// Main Converter Store
interface ConverterStore {
  // ===== INPUT STATE =====
  svgInput: string;
  setSvgInput: (svg: string) => void;

  // ===== OUTPUT STATE =====
  generatedCode: string;
  generatedImports: string;
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
  loadExample: (exampleId: string) => void;

  // ===== PRESETS =====
  savePreset: (name: string) => void;
  loadPreset: (name: string) => void;
  deletePreset: (name: string) => void;
  presets: Record<string, ConverterConfig>;
}

// UI Store (separate for performance)
interface UIStore {
  // Panel states
  configPanelOpen: boolean;
  previewMode: 'code' | 'visual' | 'split';

  // Panel sizes
  panelSizes: {
    config: number;
    editor: number;
    output: number;
  };

  // UI actions
  toggleConfigPanel: () => void;
  setPreviewMode: (mode: 'code' | 'visual' | 'split') => void;
  updatePanelSize: (panel: string, size: number) => void;

  // Preferences (persisted)
  preferences: {
    theme: 'dark' | 'light';
    autoConvert: boolean;
    showTooltips: boolean;
    rememberConfig: boolean;
  };
  updatePreference: <K extends keyof UIStore['preferences']>(
    key: K,
    value: UIStore['preferences'][K]
  ) => void;
}
```

### Configuration Schema

```typescript
interface ConverterConfig {
  // ===== OUTPUT FORMAT =====
  outputFormat: 'react-native' | 'react' | 'react-native-web';

  // ===== COMPONENT OPTIONS =====
  component: {
    name: string;
    exportType: 'default' | 'named' | 'both';
    typescript: boolean;
    memo: boolean;
    forwardRef: boolean;
  };

  // ===== DIMENSIONS =====
  dimensions: {
    mode: 'remove' | 'keep' | 'custom';
    customWidth?: number;
    customHeight?: number;
    preserveViewBox: boolean;
  };

  // ===== PROPS =====
  props: {
    expandProps: 'none' | 'start' | 'end';
    native: boolean; // Add native prop for styling
    titleProp: boolean;
    descProp: boolean;
  };

  // ===== ICON MODE (React Native) =====
  icon: {
    enabled: boolean;
    defaultSize: number;
    replaceColor: boolean; // Replace fill/stroke with color prop
    accessible: boolean;
  };

  // ===== ATTRIBUTE TRANSFORMATION =====
  attributes: {
    replacements: Array<{
      find: string;
      replace: string;
      elements?: string[];
    }>;
    removeDataAttributes: boolean;
    removeAriaAttributes: boolean;
  };

  // ===== SVGO OPTIMIZATION =====
  svgo: {
    enabled: boolean;
    plugins: Array<{
      name: string;
      params?: Record<string, any>;
    }>;
  };

  // ===== CODE STYLE =====
  codeStyle: {
    semi: boolean;
    singleQuote: boolean;
    tabWidth: 2 | 4;
    printWidth: 80 | 100 | 120;
  };
}
```

---

## 🔌 Core Modules

### 1. SVG Parser (`src/core/converter/svgParser.ts`)

```typescript
interface ParseResult {
  ast: SVGElement;
  metadata: {
    width?: number;
    height?: number;
    viewBox?: string;
    title?: string;
    desc?: string;
  };
  elements: Set<string>; // Used SVG elements
  hasGradients: boolean;
  hasClipPaths: boolean;
  hasTransforms: boolean;
}

export function parseSVG(svgString: string): ParseResult;
export function validateSVG(svgString: string): ValidationResult;
export function extractMetadata(ast: SVGElement): Metadata;
```

### 2. Element Transformer (`src/core/converter/elementMapping.ts`)

```typescript
// Maps SVG elements to React Native SVG components
const ELEMENT_MAP: Record<string, string> = {
  'svg': 'Svg',
  'g': 'G',
  'path': 'Path',
  'circle': 'Circle',
  'rect': 'Rect',
  'ellipse': 'Ellipse',
  'line': 'Line',
  'polygon': 'Polygon',
  'polyline': 'Polyline',
  'text': 'Text',
  'tspan': 'TSpan',
  'defs': 'Defs',
  'linearGradient': 'LinearGradient',
  'radialGradient': 'RadialGradient',
  'stop': 'Stop',
  'clipPath': 'ClipPath',
  'mask': 'Mask',
  'image': 'Image',
  'use': 'Use',
  'symbol': 'Symbol',
};

export function transformElements(
  ast: SVGElement,
  format: OutputFormat
): TransformedAST;
```

### 3. Attribute Transformer (`src/core/converter/attributeTransform.ts`)

```typescript
// Converts SVG attributes to React Native format
const ATTRIBUTE_MAP: Record<string, string> = {
  'class': '', // Remove (not supported)
  'fill-rule': 'fillRule',
  'fill-opacity': 'fillOpacity',
  'stroke-width': 'strokeWidth',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'stroke-dasharray': 'strokeDasharray',
  'stroke-dashoffset': 'strokeDashoffset',
  'stroke-miterlimit': 'strokeMiterlimit',
  'stroke-opacity': 'strokeOpacity',
  'clip-path': 'clipPath',
  'clip-rule': 'clipRule',
  // ... more mappings
};

export function transformAttributes(
  element: Element,
  config: ConverterConfig
): TransformedAttributes;

export function handleStyleAttribute(
  styleString: string
): Record<string, any>;
```

### 4. Code Generator (`src/core/converter/codeGenerator.ts`)

```typescript
export function generateComponent(
  ast: TransformedAST,
  config: ConverterConfig
): GeneratedCode;

export function generateImports(
  elements: Set<string>,
  format: OutputFormat,
  typescript: boolean
): string;

export function generateTypeDefinitions(
  componentName: string,
  props: string[]
): string;

export function generateUsageExample(
  componentName: string,
  exportType: ExportType
): string;
```

---

## 🎨 Component Hierarchy

```
App
├── Header
│   ├── Logo
│   ├── FormatSelector (RN / React / RNWeb)
│   ├── ThemeToggle (future)
│   └── ExportButtons
│       ├── CopyButton
│       └── DownloadButton
│
├── MainLayout
│   ├── SplitPane (resizable)
│   │
│   ├── ConfigPanel (left)
│   │   ├── ConfigSection
│   │   │   ├── DimensionsConfig
│   │   │   ├── PropsConfig
│   │   │   ├── TypeScriptConfig
│   │   │   ├── IconConfig (RN only)
│   │   │   ├── AttributeReplaceConfig
│   │   │   ├── SVGOConfig
│   │   │   └── ExportConfig
│   │   └── PresetSelector
│   │
│   ├── EditorPanel (center)
│   │   ├── EditorToolbar
│   │   │   ├── PasteButton
│   │   │   ├── ClearButton
│   │   │   ├── FormatButton
│   │   │   └── ExamplesDropdown
│   │   └── CodeEditor (CodeMirror)
│   │
│   └── OutputPanel (right)
│       ├── PreviewTabs
│       │   ├── Tab: Code
│       │   ├── Tab: Preview
│       │   └── Tab: Types (if TS enabled)
│       │
│       ├── CodePreview (when Code tab active)
│       │   └── CodeEditor (readonly, syntax highlighted)
│       │
│       ├── VisualPreview (when Preview tab active)
│       │   └── SVGRenderer (renders actual SVG)
│       │
│       └── OutputToolbar
│           ├── CopyCodeButton
│           ├── DownloadButton
│           └── ShareConfigButton
│
└── ToastContainer (notifications)
```

---

## 🎯 Conversion Algorithm

### Step-by-step Process

```typescript
async function convertSVGToReactNative(
  svgInput: string,
  config: ConverterConfig
): Promise<ConversionResult> {
  try {
    // STEP 1: Validate input
    const validation = validateSVG(svgInput);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    // STEP 2: Optimize with SVGO (if enabled)
    let optimizedSVG = svgInput;
    if (config.svgo.enabled) {
      optimizedSVG = await optimizeSVG(svgInput, config.svgo.plugins);
    }

    // STEP 3: Parse SVG
    const parseResult = parseSVG(optimizedSVG);
    const { ast, metadata, elements } = parseResult;

    // STEP 4: Transform elements
    const transformedAST = transformElements(ast, config.outputFormat);

    // STEP 5: Transform attributes
    const withAttributes = transformAttributes(transformedAST, config);

    // STEP 6: Apply dimension config
    const withDimensions = applyDimensionConfig(
      withAttributes,
      config.dimensions,
      metadata
    );

    // STEP 7: Apply icon mode (React Native only)
    let finalAST = withDimensions;
    if (config.outputFormat === 'react-native' && config.icon.enabled) {
      finalAST = applyIconMode(withDimensions, config.icon);
    }

    // STEP 8: Apply attribute replacements
    if (config.attributes.replacements.length > 0) {
      finalAST = applyAttributeReplacements(
        finalAST,
        config.attributes.replacements
      );
    }

    // STEP 9: Generate imports
    const imports = generateImports(
      elements,
      config.outputFormat,
      config.component.typescript
    );

    // STEP 10: Generate component code
    const componentCode = generateComponent(finalAST, config);

    // STEP 11: Generate type definitions (if TypeScript)
    let typeDefinitions = '';
    if (config.component.typescript) {
      typeDefinitions = generateTypeDefinitions(
        config.component.name,
        extractProps(finalAST)
      );
    }

    // STEP 12: Combine and format
    const rawCode = combineCode(imports, typeDefinitions, componentCode);
    const formattedCode = await formatCode(rawCode, config.codeStyle);

    // STEP 13: Generate usage example
    const usageExample = generateUsageExample(
      config.component.name,
      config.component.exportType
    );

    return {
      success: true,
      code: formattedCode,
      imports,
      typeDefinitions,
      usageExample,
      metadata,
      stats: {
        originalSize: svgInput.length,
        optimizedSize: optimizedSVG.length,
        elementCount: elements.size,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      code: '',
    };
  }
}
```

---

## 🔐 Type Safety

### Core Type Definitions

```typescript
// Output formats
type OutputFormat = 'react-native' | 'react' | 'react-native-web';

// Export types
type ExportType = 'default' | 'named' | 'both';

// Dimension modes
type DimensionMode = 'remove' | 'keep' | 'custom';

// Props expansion
type PropsExpansion = 'none' | 'start' | 'end';

// Preview modes
type PreviewMode = 'code' | 'visual' | 'split';

// SVG Element types (from react-native-svg)
type SVGElement =
  | 'Svg'
  | 'G'
  | 'Path'
  | 'Circle'
  | 'Rect'
  | 'Ellipse'
  | 'Line'
  | 'Polygon'
  | 'Polyline'
  | 'Text'
  | 'TSpan'
  | 'Defs'
  | 'LinearGradient'
  | 'RadialGradient'
  | 'Stop'
  | 'ClipPath'
  | 'Mask'
  | 'Image'
  | 'Use'
  | 'Symbol';

// Conversion result
interface ConversionResult {
  success: boolean;
  code: string;
  imports?: string;
  typeDefinitions?: string;
  usageExample?: string;
  metadata?: SVGMetadata;
  stats?: ConversionStats;
  error?: string;
  warnings?: string[];
}

// Validation result
interface ValidationResult {
  valid: boolean;
  error?: string;
  warnings?: string[];
}
```

---

## 📦 Dependencies Overview

### Production Dependencies
```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "framer-motion": "^12.23.25",

  // SVG Processing
  "@svgr/core": "^8.1.0",
  "@svgr/plugin-jsx": "^8.1.0",
  "svgo": "^3.0.2",

  // Code Editing
  "@uiw/react-codemirror": "^4.21.21",
  "@codemirror/lang-xml": "^6.0.2",
  "@codemirror/lang-javascript": "^6.2.1",
  "@codemirror/theme-one-dark": "^6.1.2",

  // Code Formatting
  "prettier": "^3.1.0",

  // State Management
  "zustand": "^4.4.7",

  // UI Components
  "lucide-react": "^0.294.0",
  "react-hot-toast": "^2.4.1",

  // Utilities
  "clsx": "^2.0.0",
  "copy-to-clipboard": "^3.3.3"
}
```

### Development Dependencies
```json
{
  "@types/react": "^19.2.5",
  "@types/react-dom": "^19.2.3",
  "@vitejs/plugin-react": "^5.1.1",
  "typescript": "~5.9.3",
  "vite": "^7.2.4",
  "tailwindcss": "^4.1.17",
  "autoprefixer": "^10.4.22",
  "postcss": "^8.5.6",

  // Testing (to be added)
  "vitest": "^1.0.4",
  "@testing-library/react": "^14.1.2",
  "@testing-library/jest-dom": "^6.1.5",
  "@testing-library/user-event": "^14.5.1"
}
```

---

## 🚀 Performance Optimizations

### 1. Debounced Conversion
```typescript
const debouncedConvert = useMemo(
  () => debounce(convert, 300),
  [convert]
);
```

### 2. Memoized Results
```typescript
const memoizedConversion = useMemo(
  () => convertSVGToReactNative(svgInput, config),
  [svgInput, config]
);
```

### 3. Code Splitting
```typescript
// Lazy load heavy components
const CodeEditor = lazy(() => import('./components/CodeEditor'));
const SVGOConfig = lazy(() => import('./components/SVGOConfig'));
```

### 4. Virtual Rendering
- Use react-window for large list of examples
- Lazy render config sections

### 5. Web Worker (Future)
```typescript
// Offload heavy parsing to Web Worker
const worker = new Worker(new URL('./converter.worker.ts', import.meta.url));
worker.postMessage({ svg: svgInput, config });
```

---

## 📊 Monitoring & Analytics

### Events to Track
- Conversion attempts
- Conversion success/failure rate
- Average conversion time
- Most used config options
- Error types and frequency
- Export method usage (copy vs download)
- Example usage

---

**Architecture Version**: 1.0
**Last Updated**: December 2025
