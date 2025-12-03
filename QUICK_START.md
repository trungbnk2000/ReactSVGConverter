# SVG to React Native Converter - Quick Start Guide

## 🚀 Getting Started

This guide will help you start building the SVG to React Native Converter tool immediately.

---

## 📋 Prerequisites

- ✅ Node.js 18+ installed
- ✅ Git configured
- ✅ Basic knowledge of React, TypeScript, and Tailwind CSS
- ✅ Familiarity with React Native SVG (helpful but not required)

---

## 🎯 Immediate Next Steps (Day 1)

### 1. Install Required Dependencies

```bash
# Navigate to project directory
cd /home/user/ReactSVGConverter

# Install SVG processing libraries
npm install @svgr/core @svgr/plugin-jsx svgo

# Install code editor
npm install @uiw/react-codemirror @codemirror/lang-xml @codemirror/lang-javascript @codemirror/theme-one-dark

# Install state management
npm install zustand

# Install UI utilities
npm install lucide-react react-hot-toast clsx copy-to-clipboard

# Install code formatting
npm install prettier

# Install type definitions
npm install -D @types/node
```

### 2. Create Project Structure

```bash
# Create directory structure
mkdir -p src/{components/{layout,config,editor,preview,ui},core/{converter,optimizer,formatter,validator},store,hooks,utils,types,styles}

# Create initial files
touch src/store/converterStore.ts
touch src/store/uiStore.ts
touch src/types/converter.ts
touch src/types/config.ts
touch src/core/converter/svgParser.ts
touch src/core/converter/reactNativeTransform.ts
```

### 3. Set Up Base Configuration

Create type definitions and store structure (detailed in following sections).

---

## 🎨 Dark Theme UI Specification

### Color Variables (Tailwind Config)

Add to `tailwind.config.js` or use inline:

```javascript
// Dark theme colors
const colors = {
  background: {
    primary: '#0a0a0a',    // Main background
    secondary: '#141414',  // Cards, panels
    tertiary: '#1e1e1e',   // Elevated elements
    hover: '#2a2a2a',      // Hover states
  },
  border: {
    default: '#2a2a2a',
    focus: '#3a3a3a',
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
```

### UI Component Specifications

#### 1. Layout Grid

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER (h-16, bg-[#0a0a0a], border-b border-[#2a2a2a])     │
├──────────┬─────────────────────────┬────────────────────────┤
│          │                         │                        │
│ CONFIG   │    SVG INPUT            │   JSX OUTPUT           │
│          │                         │                        │
│ w-80     │    flex-1               │   flex-1               │
│ bg-      │    bg-[#141414]         │   bg-[#141414]         │
│ [#141414]│                         │                        │
│          │                         │                        │
│ p-6      │    p-0                  │   p-0                  │
│          │    (editor full height) │   (editor full height) │
│          │                         │                        │
│          │                         │                        │
│          │                         │                        │
│          │                         │                        │
│          │                         │                        │
└──────────┴─────────────────────────┴────────────────────────┘
```

#### 2. Header Component

```tsx
<header className="h-16 bg-[#0a0a0a] border-b border-[#2a2a2a] px-6 flex items-center justify-between">
  {/* Left: Logo & Title */}
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
      <span className="text-white font-bold text-xl">S</span>
    </div>
    <div>
      <h1 className="text-lg font-bold text-[#f5f5f5]">SVG Converter</h1>
      <p className="text-xs text-[#737373]">React Native First</p>
    </div>
  </div>

  {/* Center: Format Selector */}
  <div className="flex items-center gap-2 bg-[#141414] rounded-lg p-1 border border-[#2a2a2a]">
    <button className="px-4 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium">
      React Native
    </button>
    <button className="px-4 py-2 rounded-md text-[#a3a3a3] hover:text-[#f5f5f5] text-sm font-medium">
      React
    </button>
    <button className="px-4 py-2 rounded-md text-[#a3a3a3] hover:text-[#f5f5f5] text-sm font-medium">
      RN Web
    </button>
  </div>

  {/* Right: Actions */}
  <div className="flex items-center gap-2">
    <button className="px-4 py-2 bg-[#1e1e1e] hover:bg-[#2a2a2a] border border-[#2a2a2a] rounded-lg text-[#f5f5f5] text-sm font-medium flex items-center gap-2">
      <CopyIcon className="w-4 h-4" />
      Copy Code
    </button>
    <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg text-white text-sm font-medium flex items-center gap-2">
      <DownloadIcon className="w-4 h-4" />
      Download
    </button>
  </div>
</header>
```

#### 3. Config Panel Items

```tsx
{/* Section Container */}
<div className="mb-6">
  <h3 className="text-sm font-semibold text-[#f5f5f5] mb-3 flex items-center gap-2">
    <LayoutIcon className="w-4 h-4 text-indigo-400" />
    Dimensions
  </h3>

  <div className="space-y-2 p-4 bg-[#1e1e1e] rounded-lg border border-[#2a2a2a]">
    {/* Checkbox Option */}
    <label className="flex items-start gap-3 cursor-pointer group">
      <input
        type="checkbox"
        className="mt-0.5 w-4 h-4 rounded border-[#3a3a3a] bg-[#141414] text-indigo-500 focus:ring-indigo-500 focus:ring-offset-0 focus:ring-offset-[#0a0a0a]"
      />
      <div className="flex-1">
        <div className="text-sm text-[#f5f5f5] group-hover:text-white transition-colors">
          Remove dimensions
        </div>
        <div className="text-xs text-[#737373] mt-0.5">
          Make component responsive
        </div>
      </div>
    </label>

    {/* Radio Option */}
    <label className="flex items-start gap-3 cursor-pointer group">
      <input
        type="radio"
        name="dimensions"
        className="mt-0.5 w-4 h-4 border-[#3a3a3a] bg-[#141414] text-indigo-500 focus:ring-indigo-500"
      />
      <div className="flex-1">
        <div className="text-sm text-[#f5f5f5] group-hover:text-white transition-colors">
          Keep original dimensions
        </div>
      </div>
    </label>

    {/* Input Option */}
    <div className="pt-2">
      <label className="text-xs text-[#a3a3a3] mb-1.5 block">Custom Size</label>
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Width"
          className="flex-1 px-3 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-md text-sm text-[#f5f5f5] placeholder-[#737373] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
        <input
          type="number"
          placeholder="Height"
          className="flex-1 px-3 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-md text-sm text-[#f5f5f5] placeholder-[#737373] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
      </div>
    </div>
  </div>
</div>
```

#### 4. Code Editor Styling

```tsx
<div className="h-full flex flex-col">
  {/* Editor Toolbar */}
  <div className="h-12 bg-[#0a0a0a] border-b border-[#2a2a2a] px-4 flex items-center justify-between">
    <span className="text-sm font-medium text-[#a3a3a3]">Input SVG</span>
    <div className="flex items-center gap-2">
      <button className="p-2 hover:bg-[#1e1e1e] rounded-md text-[#a3a3a3] hover:text-[#f5f5f5]">
        <PasteIcon className="w-4 h-4" />
      </button>
      <button className="p-2 hover:bg-[#1e1e1e] rounded-md text-[#a3a3a3] hover:text-[#f5f5f5]">
        <TrashIcon className="w-4 h-4" />
      </button>
    </div>
  </div>

  {/* Editor */}
  <div className="flex-1 overflow-auto">
    <CodeMirror
      value={svgInput}
      height="100%"
      theme={oneDark}
      extensions={[xml()]}
      onChange={(value) => setSvgInput(value)}
      className="h-full"
    />
  </div>
</div>
```

#### 5. Output Preview with Tabs

```tsx
<div className="h-full flex flex-col">
  {/* Tab Header */}
  <div className="h-12 bg-[#0a0a0a] border-b border-[#2a2a2a] px-4 flex items-center justify-between">
    <div className="flex items-center gap-1">
      <button className="px-3 py-1.5 rounded-md bg-[#1e1e1e] text-[#f5f5f5] text-sm font-medium">
        Code
      </button>
      <button className="px-3 py-1.5 rounded-md text-[#a3a3a3] hover:text-[#f5f5f5] text-sm font-medium">
        Preview
      </button>
      <button className="px-3 py-1.5 rounded-md text-[#a3a3a3] hover:text-[#f5f5f5] text-sm font-medium">
        Types
      </button>
    </div>
  </div>

  {/* Tab Content */}
  <div className="flex-1 overflow-auto">
    {activeTab === 'code' && (
      <CodeMirror
        value={generatedCode}
        height="100%"
        theme={oneDark}
        extensions={[javascript({ jsx: true, typescript: true })]}
        readOnly
      />
    )}

    {activeTab === 'preview' && (
      <div className="h-full flex items-center justify-center bg-[#0a0a0a] p-8">
        <div className="max-w-md">
          <div className="mb-4 text-center">
            <span className="text-sm text-[#737373]">Visual Preview</span>
          </div>
          <div
            className="p-8 bg-[#1e1e1e] rounded-lg border border-[#2a2a2a] flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: svgInput }}
          />
          <div className="mt-4 text-center text-xs text-[#737373]">
            Dimensions: 24×24 • Elements: 5
          </div>
        </div>
      </div>
    )}
  </div>
</div>
```

---

## 🔨 Implementation Checklist (Week 1)

### Day 1: Setup ✓
- [ ] Install all dependencies
- [ ] Create folder structure
- [ ] Set up Git branch
- [ ] Create base type definitions

### Day 2: Type System & Store
- [ ] Define all TypeScript interfaces (`types/converter.ts`, `types/config.ts`)
- [ ] Create Zustand converter store (`store/converterStore.ts`)
- [ ] Create Zustand UI store (`store/uiStore.ts`)
- [ ] Add localStorage persistence

### Day 3: Core Parser
- [ ] Implement SVG parser (`core/converter/svgParser.ts`)
- [ ] Add SVG validation
- [ ] Extract metadata (width, height, viewBox)
- [ ] Detect used elements
- [ ] Write unit tests

### Day 4: Element Transformer
- [ ] Create element mapping (`core/converter/elementMapping.ts`)
- [ ] Transform SVG elements to React Native components
- [ ] Handle nested elements
- [ ] Write unit tests

### Day 5: Attribute Transformer
- [ ] Implement attribute transformation (`core/converter/attributeTransform.ts`)
- [ ] Map SVG attributes to React Native (fill-rule → fillRule)
- [ ] Handle style attribute parsing
- [ ] Remove unsupported attributes
- [ ] Write unit tests

### Day 6: Code Generator
- [ ] Implement import generator
- [ ] Implement component code generator
- [ ] Add TypeScript type definitions generator
- [ ] Integrate Prettier for formatting
- [ ] Write unit tests

### Day 7: Testing & Integration
- [ ] Integration tests for full conversion pipeline
- [ ] Test with real Figma SVG exports
- [ ] Test with complex SVGs (gradients, masks, etc.)
- [ ] Fix bugs and edge cases
- [ ] Document any limitations

---

## 📝 Code Templates to Start With

### 1. Type Definitions (`src/types/converter.ts`)

```typescript
// src/types/converter.ts
export type OutputFormat = 'react-native' | 'react' | 'react-native-web';
export type ExportType = 'default' | 'named' | 'both';
export type DimensionMode = 'remove' | 'keep' | 'custom';
export type PropsExpansion = 'none' | 'start' | 'end';

export interface ConverterConfig {
  outputFormat: OutputFormat;
  component: {
    name: string;
    exportType: ExportType;
    typescript: boolean;
    memo: boolean;
    forwardRef: boolean;
  };
  dimensions: {
    mode: DimensionMode;
    customWidth?: number;
    customHeight?: number;
    preserveViewBox: boolean;
  };
  props: {
    expandProps: PropsExpansion;
    native: boolean;
    titleProp: boolean;
    descProp: boolean;
  };
  icon: {
    enabled: boolean;
    defaultSize: number;
    replaceColor: boolean;
    accessible: boolean;
  };
  attributes: {
    replacements: Array<{
      find: string;
      replace: string;
      elements?: string[];
    }>;
    removeDataAttributes: boolean;
    removeAriaAttributes: boolean;
  };
  svgo: {
    enabled: boolean;
  };
}

export interface ConversionResult {
  success: boolean;
  code: string;
  imports?: string;
  error?: string;
  warnings?: string[];
  stats?: {
    elementCount: number;
    originalSize: number;
    optimizedSize: number;
  };
}
```

### 2. Converter Store (`src/store/converterStore.ts`)

```typescript
// src/store/converterStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ConverterConfig, ConversionResult } from '../types/converter';

interface ConverterStore {
  svgInput: string;
  generatedCode: string;
  error: string | null;
  isConverting: boolean;

  config: ConverterConfig;

  setSvgInput: (svg: string) => void;
  updateConfig: (partial: Partial<ConverterConfig>) => void;
  convert: () => Promise<void>;
  reset: () => void;
}

export const useConverterStore = create<ConverterStore>()(
  persist(
    (set, get) => ({
      svgInput: '',
      generatedCode: '',
      error: null,
      isConverting: false,

      config: {
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
        },
      },

      setSvgInput: (svg) => {
        set({ svgInput: svg });
        // Auto-convert after input change (debounced in component)
      },

      updateConfig: (partial) => {
        set((state) => ({
          config: { ...state.config, ...partial },
        }));
        // Re-convert after config change
        get().convert();
      },

      convert: async () => {
        const { svgInput, config } = get();

        if (!svgInput.trim()) {
          set({ generatedCode: '', error: null });
          return;
        }

        set({ isConverting: true, error: null });

        try {
          // TODO: Implement actual conversion
          const result: ConversionResult = {
            success: true,
            code: '// Conversion result will appear here',
          };

          if (result.success) {
            set({ generatedCode: result.code, error: null });
          } else {
            set({ error: result.error || 'Conversion failed' });
          }
        } catch (error) {
          set({ error: error.message });
        } finally {
          set({ isConverting: false });
        }
      },

      reset: () => {
        set({
          svgInput: '',
          generatedCode: '',
          error: null,
        });
      },
    }),
    {
      name: 'svg-converter-store',
      partialize: (state) => ({ config: state.config }), // Only persist config
    }
  )
);
```

### 3. SVG Parser Starter (`src/core/converter/svgParser.ts`)

```typescript
// src/core/converter/svgParser.ts
export interface SVGMetadata {
  width?: number;
  height?: number;
  viewBox?: string;
  title?: string;
  desc?: string;
}

export interface ParseResult {
  valid: boolean;
  metadata: SVGMetadata;
  elements: Set<string>;
  error?: string;
}

export function parseSVG(svgString: string): ParseResult {
  try {
    // Create a DOM parser
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, 'image/svg+xml');

    // Check for parse errors
    const parseError = doc.querySelector('parsererror');
    if (parseError) {
      return {
        valid: false,
        error: 'Invalid SVG markup',
        metadata: {},
        elements: new Set(),
      };
    }

    const svgElement = doc.querySelector('svg');
    if (!svgElement) {
      return {
        valid: false,
        error: 'No SVG element found',
        metadata: {},
        elements: new Set(),
      };
    }

    // Extract metadata
    const metadata: SVGMetadata = {
      width: svgElement.getAttribute('width')
        ? parseFloat(svgElement.getAttribute('width')!)
        : undefined,
      height: svgElement.getAttribute('height')
        ? parseFloat(svgElement.getAttribute('height')!)
        : undefined,
      viewBox: svgElement.getAttribute('viewBox') || undefined,
      title: doc.querySelector('title')?.textContent || undefined,
      desc: doc.querySelector('desc')?.textContent || undefined,
    };

    // Collect all unique element types
    const elements = new Set<string>();
    const allElements = svgElement.querySelectorAll('*');
    allElements.forEach((el) => {
      elements.add(el.tagName.toLowerCase());
    });

    return {
      valid: true,
      metadata,
      elements,
    };
  } catch (error) {
    return {
      valid: false,
      error: error.message,
      metadata: {},
      elements: new Set(),
    };
  }
}

export function validateSVG(svgString: string): { valid: boolean; error?: string } {
  if (!svgString.trim()) {
    return { valid: false, error: 'SVG input is empty' };
  }

  if (!svgString.includes('<svg')) {
    return { valid: false, error: 'No SVG element found' };
  }

  const result = parseSVG(svgString);
  return { valid: result.valid, error: result.error };
}
```

---

## 🎯 Success Criteria for Week 1

By the end of Week 1, you should have:

1. ✅ All dependencies installed
2. ✅ Complete project structure created
3. ✅ Type system defined
4. ✅ Zustand stores implemented
5. ✅ Basic SVG parser working
6. ✅ Element transformer functional
7. ✅ Attribute transformer working
8. ✅ Code generator producing valid React Native code
9. ✅ Unit tests for core functions
10. ✅ Able to convert a simple SVG to React Native component

**Deliverable**: A working conversion engine (even if UI is minimal)

---

## 💡 Tips & Best Practices

1. **Start Simple**: Begin with basic SVG shapes (circle, rect, path)
2. **Test Continuously**: Write tests as you build each module
3. **Use Real Examples**: Test with actual Figma exports early
4. **Iterate on UX**: Get the core working first, then polish the UI
5. **Document Edge Cases**: Note any SVG features that don't work
6. **Version Control**: Commit frequently with clear messages
7. **Ask for Feedback**: Share progress with users/team regularly

---

## 🐛 Common Pitfalls to Avoid

1. ❌ Don't try to support every SVG feature initially
2. ❌ Don't over-optimize prematurely
3. ❌ Don't skip testing with real-world SVGs
4. ❌ Don't forget about error handling
5. ❌ Don't hardcode values - use configuration
6. ❌ Don't ignore accessibility (especially for icon mode)
7. ❌ Don't forget to handle edge cases (empty SVG, malformed XML)

---

## 📚 Learning Resources

### SVG
- [MDN SVG Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial)
- [SVG Pocket Guide](https://svgpocketguide.com/)

### React Native SVG
- [react-native-svg Documentation](https://github.com/software-mansion/react-native-svg)
- [React Native SVG Examples](https://github.com/react-native-svg/react-native-svg/tree/main/Example)

### Code Transformation
- [AST Explorer](https://astexplorer.net/) - Understand AST structures
- [SVGR Source Code](https://github.com/gregberge/svgr) - Learn from existing solution

### TypeScript
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

---

## 🤝 Getting Help

If you get stuck:

1. Check the PLAN.md for detailed specifications
2. Review ARCHITECTURE.md for system design
3. Look at reference implementation (SVGR)
4. Test with simple SVG first, then complex ones
5. Add detailed error logging to understand issues

---

**Ready to start building!** 🚀

Begin with Day 1 tasks and work through systematically. The goal for Week 1 is a working conversion engine - UI polish comes later.

Good luck! 💪
