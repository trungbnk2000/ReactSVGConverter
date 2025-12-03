# SVG to React Native Converter - Detailed Implementation Plan

## 📋 Project Overview

A modern web-based tool to convert raw SVG code from Figma (or any source) into React Native components with a focus on react-native-svg compatibility. The tool features a dark theme interface with superior UX/UI compared to existing solutions.

---

## 🎯 Core Objectives

1. **Primary Focus**: Convert SVG to React Native components using `react-native-svg`
2. **Secondary Support**: Also support React (web) conversion
3. **Modern UX**: Dark theme, intuitive interface, real-time preview
4. **Developer Experience**: Live code editor, syntax highlighting, instant conversion
5. **Flexibility**: Extensive configuration options for different use cases

---

## 🏗️ Technical Architecture

### Technology Stack

**Frontend Framework**
- ✅ React 19 with TypeScript
- ✅ Vite for build tooling
- ✅ Tailwind CSS v4 for styling
- ✅ Framer Motion for animations

**Additional Dependencies Needed**
- `@svgr/core` - Core SVG to JSX transformation
- `@svgr/plugin-jsx` - JSX transformation plugin
- `svgo` - SVG optimization
- `prettier` - Code formatting
- `@codemirror/state` & `@codemirror/view` - Code editor
- `@codemirror/lang-xml` - XML/SVG syntax highlighting
- `@codemirror/lang-javascript` - JSX syntax highlighting
- `@codemirror/theme-one-dark` - Dark theme for editor
- `react-hot-toast` - Toast notifications
- `lucide-react` - Icon library
- `zustand` - State management (lightweight)
- `@uiw/react-codemirror` - CodeMirror wrapper for React (alternative)

---

## 🎨 UI/UX Design (Dark Theme)

### Color Palette
```
Background Colors:
- Primary Background: #0a0a0a (near black)
- Secondary Background: #141414 (dark gray)
- Tertiary Background: #1e1e1e (lighter gray)
- Border Color: #2a2a2a (subtle borders)

Accent Colors:
- Primary Accent: #6366f1 (indigo)
- Secondary Accent: #8b5cf6 (purple)
- Success: #10b981 (green)
- Warning: #f59e0b (amber)
- Error: #ef4444 (red)

Text Colors:
- Primary Text: #f5f5f5 (almost white)
- Secondary Text: #a3a3a3 (gray)
- Muted Text: #737373 (darker gray)
```

### Layout Structure
```
┌─────────────────────────────────────────────────────────────┐
│  Header: Logo | Title | Runtime Selector | Export Button    │
├──────────┬─────────────────────────┬────────────────────────┤
│          │                         │                        │
│  Config  │    SVG Input Editor     │   Output Preview       │
│  Panel   │    (with syntax         │   (with syntax         │
│          │     highlighting)       │    highlighting)       │
│  (Left)  │                         │                        │
│          │    [Paste SVG Here]     │   [Generated Code]     │
│          │                         │                        │
│  - Format│                         │                        │
│  - Dims  │                         │   [Visual Preview]     │
│  - Props │                         │                        │
│  - SVGO  │                         │                        │
│  - Export│                         │                        │
│          │                         │                        │
└──────────┴─────────────────────────┴────────────────────────┘
```

### Enhanced UX Features

1. **Responsive Split Panes**
   - Adjustable panel widths with drag handles
   - Collapsible config panel
   - Mobile-responsive stack layout

2. **Live Preview**
   - Real-time code generation
   - Visual SVG preview
   - Error highlighting and validation

3. **Smooth Animations**
   - Panel transitions
   - Button hover effects
   - Loading states
   - Toast notifications

4. **Keyboard Shortcuts**
   - `Cmd/Ctrl + V` - Paste SVG
   - `Cmd/Ctrl + C` - Copy output
   - `Cmd/Ctrl + K` - Clear all
   - `Cmd/Ctrl + S` - Download component

5. **Smart Defaults**
   - Auto-detect SVG dimensions
   - Intelligent naming suggestions
   - Remember user preferences (localStorage)

---

## 🔧 Core Features & Configuration Options

### 1. Output Format Selection
```typescript
type OutputFormat = 'react-native' | 'react' | 'react-native-web';
```
- **React Native** (Primary focus) - uses react-native-svg
- **React** - standard React components
- **React Native Web** - compatible with both platforms

### 2. Component Configuration

#### Dimensions
- [ ] Remove width/height (make responsive)
- [ ] Keep original dimensions
- [ ] Custom dimensions (input fields)
- [ ] ViewBox preservation

#### Props Expansion
- [ ] No props spreading
- [ ] Spread at start `{...props}`
- [ ] Spread at end
- [ ] Specific props only

#### TypeScript Support
- [ ] Generate TypeScript (.tsx)
- [ ] Add proper type definitions
- [ ] Props interface generation

#### Component Options
- [ ] Memo wrapper
- [ ] ForwardRef support
- [ ] Named export
- [ ] Default export
- [ ] Include PropTypes (for React)

### 3. React Native Specific Options

#### Icon Mode
- [ ] Enable icon mode
- [ ] Default size prop
- [ ] Color prop (replace fills/strokes)
- [ ] Accessible label

#### SVG Element Mapping
```typescript
// Automatic transformation:
<svg> → <Svg>
<g> → <G>
<path> → <Path>
<circle> → <Circle>
<rect> → <Rect>
<line> → <Line>
<polygon> → <Polygon>
<polyline> → <Polyline>
<ellipse> → <Ellipse>
<text> → <Text>
<linearGradient> → <LinearGradient>
<radialGradient> → <RadialGradient>
<defs> → <Defs>
<stop> → <Stop>
<clipPath> → <ClipPath>
```

#### Import Generation
```tsx
import Svg, { Path, G, Circle, ... } from 'react-native-svg';
```

### 4. Attribute Transformation

#### Replace Attribute Values
```typescript
interface AttributeReplacement {
  find: string;
  replace: string;
  elements?: string[]; // Optional: specific elements
}
```
Examples:
- Replace colors: `#000000 → currentColor`
- Replace hardcoded values with props
- Convert units (px → number)

#### React Native Attribute Fixes
- `class` → remove (not supported)
- `style` → convert to object syntax
- `fill-rule` → `fillRule`
- `stroke-width` → `strokeWidth`
- `stroke-linecap` → `strokeLinecap`
- etc.

### 5. SVGO Optimization

#### Optimization Options
- [ ] Enable SVGO
- [ ] Remove title
- [ ] Remove desc
- [ ] Remove comments
- [ ] Remove hidden elements
- [ ] Merge paths
- [ ] Convert colors
- [ ] Remove unnecessary attributes
- [ ] Precision (decimal places)

#### Custom SVGO Config
```typescript
interface SVGOConfig {
  plugins: Array<{
    name: string;
    params?: Record<string, any>;
  }>;
}
```

### 6. Export Options

#### Component Naming
- Auto-generated from SVG title/filename
- Custom name input
- Naming conventions (PascalCase, camelCase)

#### Export Formats
- [ ] Copy to clipboard
- [ ] Download as .tsx/.jsx file
- [ ] Download with type definitions (.d.ts)
- [ ] Export multiple variations
- [ ] Generate usage example

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx              # Top navigation bar
│   │   ├── ConfigPanel.tsx         # Left sidebar config
│   │   ├── EditorPanel.tsx         # Middle SVG input editor
│   │   ├── OutputPanel.tsx         # Right output/preview panel
│   │   └── SplitPane.tsx           # Resizable split container
│   │
│   ├── config/
│   │   ├── FormatSelector.tsx      # React Native/React selector
│   │   ├── DimensionsConfig.tsx    # Dimensions options
│   │   ├── PropsConfig.tsx         # Props expansion config
│   │   ├── TypeScriptConfig.tsx    # TypeScript options
│   │   ├── IconConfig.tsx          # Icon mode config (RN specific)
│   │   ├── AttributeReplace.tsx    # Attribute replacement
│   │   ├── SVGOConfig.tsx          # SVGO optimization
│   │   └── ExportConfig.tsx        # Export options
│   │
│   ├── editor/
│   │   ├── CodeEditor.tsx          # CodeMirror wrapper
│   │   ├── SyntaxHighlight.tsx     # Syntax highlighting config
│   │   └── EditorToolbar.tsx       # Editor actions (clear, format)
│   │
│   ├── preview/
│   │   ├── CodePreview.tsx         # Generated code display
│   │   ├── VisualPreview.tsx       # SVG visual preview
│   │   └── PreviewTabs.tsx         # Tab switcher
│   │
│   └── ui/
│       ├── Button.tsx              # Custom button component
│       ├── Checkbox.tsx            # Checkbox component
│       ├── RadioGroup.tsx          # Radio button group
│       ├── Input.tsx               # Text input
│       ├── Select.tsx              # Dropdown select
│       ├── Tabs.tsx                # Tab component
│       ├── Toast.tsx               # Toast notification
│       ├── Tooltip.tsx             # Tooltip component
│       └── Card.tsx                # Card container
│
├── core/
│   ├── converter/
│   │   ├── svgParser.ts            # Parse SVG string
│   │   ├── reactNativeTransform.ts # Transform to RN components
│   │   ├── reactTransform.ts       # Transform to React components
│   │   ├── attributeTransform.ts   # Handle attribute conversion
│   │   ├── elementMapping.ts       # SVG to RN-SVG element mapping
│   │   └── importGenerator.ts      # Generate import statements
│   │
│   ├── optimizer/
│   │   ├── svgo.ts                 # SVGO integration
│   │   └── svgoConfig.ts           # SVGO configuration presets
│   │
│   ├── formatter/
│   │   ├── prettier.ts             # Prettier integration
│   │   └── codeFormatter.ts        # Code formatting utilities
│   │
│   └── validator/
│       ├── svgValidator.ts         # Validate SVG input
│       └── configValidator.ts      # Validate user config
│
├── store/
│   ├── converterStore.ts           # Main converter state (Zustand)
│   ├── configStore.ts              # Configuration state
│   └── uiStore.ts                  # UI state (panels, theme)
│
├── hooks/
│   ├── useConverter.ts             # Conversion logic hook
│   ├── useClipboard.ts             # Clipboard operations
│   ├── useLocalStorage.ts          # Persist user preferences
│   ├── useKeyboardShortcuts.ts     # Keyboard shortcuts
│   └── useDebounce.ts              # Debounce for live updates
│
├── utils/
│   ├── constants.ts                # App constants
│   ├── defaultConfigs.ts           # Default configuration values
│   ├── helpers.ts                  # Helper functions
│   └── examples.ts                 # Example SVG snippets
│
├── types/
│   ├── converter.ts                # Converter type definitions
│   ├── config.ts                   # Configuration types
│   └── svg.ts                      # SVG-related types
│
├── styles/
│   ├── theme.ts                    # Theme configuration
│   └── animations.ts               # Framer Motion animations
│
├── App.tsx                          # Main app component
├── main.tsx                         # App entry point
└── index.css                        # Global styles (Tailwind)
```

---

## 🔄 Implementation Phases

### Phase 1: Foundation & Setup (Week 1)
**Goal**: Set up project infrastructure and core dependencies

- [ ] Install all required dependencies
- [ ] Set up project structure
- [ ] Configure TypeScript types
- [ ] Create theme configuration
- [ ] Set up Zustand stores
- [ ] Create base UI components (Button, Input, Checkbox, etc.)

**Deliverable**: Clean project structure with working dev environment

---

### Phase 2: Core Conversion Engine (Week 2)
**Goal**: Build the SVG to React Native conversion logic

- [ ] Implement SVG parser
- [ ] Create element mapping (svg → Svg, path → Path, etc.)
- [ ] Implement attribute transformation
  - [ ] camelCase conversion (fill-rule → fillRule)
  - [ ] Remove unsupported attributes
  - [ ] Handle style object conversion
- [ ] Build import statement generator
- [ ] Implement basic React Native component generation
- [ ] Add error handling and validation
- [ ] Write unit tests for core conversion

**Deliverable**: Working conversion engine (CLI or basic UI)

---

### Phase 3: UI Layout & Design System (Week 3)
**Goal**: Build the dark theme interface

- [ ] Create Header component
- [ ] Build three-panel layout
  - [ ] Config Panel (left)
  - [ ] Input Editor (center)
  - [ ] Output Preview (right)
- [ ] Implement SplitPane with resize functionality
- [ ] Style components with dark theme
- [ ] Add Framer Motion animations
- [ ] Make responsive for mobile/tablet

**Deliverable**: Beautiful dark-themed UI shell

---

### Phase 4: Code Editors Integration (Week 4)
**Goal**: Add syntax-highlighted code editors

- [ ] Integrate CodeMirror
- [ ] Set up XML/SVG language support for input
- [ ] Set up JavaScript/JSX for output
- [ ] Apply One Dark theme
- [ ] Add editor toolbar (clear, format, paste)
- [ ] Implement live update with debouncing
- [ ] Add error highlighting

**Deliverable**: Working input and output editors

---

### Phase 5: Configuration Panel (Week 5)
**Goal**: Build all configuration options

- [ ] Format selector (React Native / React)
- [ ] Dimensions configuration
- [ ] Props expansion options
- [ ] TypeScript toggle
- [ ] Icon mode configuration
- [ ] Attribute replacement
- [ ] Component naming
- [ ] Export type selection
- [ ] Wire all configs to converter engine
- [ ] Add preset configurations

**Deliverable**: Fully functional configuration panel

---

### Phase 6: SVGO Integration (Week 6)
**Goal**: Add SVG optimization capabilities

- [ ] Integrate SVGO library
- [ ] Create SVGO configuration UI
- [ ] Implement optimization presets
- [ ] Add before/after comparison
- [ ] Show optimization stats
- [ ] Make optimization optional

**Deliverable**: Working SVG optimization feature

---

### Phase 7: Preview & Export (Week 7)
**Goal**: Add preview and export functionality

- [ ] Create visual SVG preview
- [ ] Add syntax-highlighted code preview
- [ ] Implement copy to clipboard
- [ ] Add download as file (.tsx/.jsx)
- [ ] Generate type definitions (.d.ts)
- [ ] Create usage example generator
- [ ] Add toast notifications for actions

**Deliverable**: Complete preview and export system

---

### Phase 8: Enhanced UX Features (Week 8)
**Goal**: Polish user experience

- [ ] Implement keyboard shortcuts
- [ ] Add localStorage for preferences
- [ ] Create example SVG library
- [ ] Add drag-and-drop SVG file upload
- [ ] Implement "Paste from Figma" detection
- [ ] Add helpful tooltips
- [ ] Create onboarding tour
- [ ] Add share configuration URL feature

**Deliverable**: Polished, production-ready UX

---

### Phase 9: Testing & Optimization (Week 9)
**Goal**: Ensure quality and performance

- [ ] Write comprehensive unit tests
- [ ] Add integration tests
- [ ] Test with various SVG inputs (Figma, Sketch, Illustrator)
- [ ] Performance optimization
- [ ] Bundle size optimization
- [ ] Cross-browser testing
- [ ] Mobile responsiveness testing
- [ ] Accessibility audit

**Deliverable**: Tested, optimized application

---

### Phase 10: Documentation & Deployment (Week 10)
**Goal**: Deploy and document

- [ ] Write user documentation
- [ ] Create API documentation
- [ ] Add README with examples
- [ ] Create demo video
- [ ] Set up CI/CD pipeline
- [ ] Deploy to production (Vercel/Netlify)
- [ ] Set up analytics
- [ ] Create feedback mechanism

**Deliverable**: Live, documented application

---

## 💡 Key Technical Considerations

### 1. React Native SVG Transformation Rules

```typescript
// Example transformation logic
const transformSVGToReactNative = (svgString: string) => {
  // 1. Parse SVG
  const ast = parseSVG(svgString);

  // 2. Transform elements
  const transformed = transformElements(ast, {
    'svg': 'Svg',
    'g': 'G',
    'path': 'Path',
    // ... etc
  });

  // 3. Transform attributes
  const withAttrs = transformAttributes(transformed, {
    'fill-rule': 'fillRule',
    'stroke-width': 'strokeWidth',
    // ... etc
  });

  // 4. Generate imports
  const imports = generateImports(withAttrs);

  // 5. Generate component
  const component = generateComponent(withAttrs, config);

  return `${imports}\n\n${component}`;
};
```

### 2. Handling Figma SVG Specifics

Figma exports often include:
- Unnecessary `<defs>` sections
- Hidden elements
- Overly precise decimal values
- Inline styles instead of attributes

**Solution**: Aggressive SVGO optimization with custom plugins

### 3. Performance Optimization

- Debounce conversion (300ms)
- Web Worker for heavy parsing (optional)
- Memoize conversion results
- Lazy load code editor
- Code splitting for different routes

### 4. State Management Strategy

```typescript
// Zustand store structure
interface ConverterState {
  // Input
  svgInput: string;
  setSvgInput: (svg: string) => void;

  // Output
  generatedCode: string;
  error: string | null;

  // Config
  config: ConverterConfig;
  updateConfig: (partial: Partial<ConverterConfig>) => void;

  // Actions
  convert: () => void;
  reset: () => void;

  // UI State
  isConverting: boolean;
  showPreview: boolean;
}
```

---

## 🎯 Success Metrics

1. **Accuracy**: 95%+ successful conversion of common SVGs
2. **Performance**: Conversion in < 500ms for typical SVGs
3. **User Satisfaction**: Clean, readable output code
4. **Compatibility**: Works with Figma, Sketch, Illustrator exports
5. **Usability**: Intuitive UI requiring no documentation

---

## 🚀 Future Enhancements (Post-MVP)

1. **Batch Conversion**: Upload multiple SVG files
2. **Figma Plugin**: Direct integration with Figma
3. **Component Library**: Save and organize converted components
4. **CLI Tool**: Command-line version for automation
5. **VS Code Extension**: Convert SVG directly in editor
6. **AI Enhancement**: Optimize SVG structure with AI
7. **Animation Support**: Convert SVG animations to Reanimated
8. **Team Collaboration**: Share and collaborate on configs
9. **Version History**: Track conversion history
10. **Dark/Light Theme Toggle**: User preference

---

## 📚 Reference Resources

### Libraries & Tools
- [SVGR Documentation](https://react-svgr.com/)
- [react-native-svg](https://github.com/software-mansion/react-native-svg)
- [SVGO](https://github.com/svg/svgo)
- [CodeMirror 6](https://codemirror.net/)
- [Zustand](https://github.com/pmndrs/zustand)

### Design Inspiration
- Current SVGR Playground (reference image)
- [Excalidraw](https://excalidraw.com/) - for UI patterns
- [Ray.so](https://ray.so/) - for code preview aesthetics
- [Tailwind UI](https://tailwindui.com/) - for dark theme patterns

### React Native SVG Documentation
- [react-native-svg API](https://github.com/software-mansion/react-native-svg#common-props)
- [SVG vs react-native-svg differences](https://github.com/software-mansion/react-native-svg#supported-elements)

---

## 🎨 UI Component Examples

### Config Panel Item (Dark Theme)
```tsx
<div className="space-y-3 p-4 bg-[#141414] rounded-lg border border-[#2a2a2a]">
  <h3 className="text-sm font-semibold text-[#f5f5f5]">Dimensions</h3>
  <div className="space-y-2">
    <label className="flex items-center gap-2 cursor-pointer group">
      <input
        type="checkbox"
        className="accent-indigo-500"
      />
      <span className="text-sm text-[#a3a3a3] group-hover:text-[#f5f5f5] transition-colors">
        Remove dimensions
      </span>
    </label>
  </div>
</div>
```

### Button Variants
```tsx
// Primary button
<button className="
  px-4 py-2
  bg-gradient-to-r from-indigo-600 to-purple-600
  text-white font-medium rounded-lg
  hover:from-indigo-700 hover:to-purple-700
  transition-all duration-200
  shadow-lg shadow-indigo-500/30
">
  Convert
</button>

// Secondary button
<button className="
  px-4 py-2
  bg-[#1e1e1e]
  text-[#f5f5f5] font-medium rounded-lg
  hover:bg-[#2a2a2a]
  border border-[#2a2a2a]
  transition-all duration-200
">
  Copy Code
</button>
```

---

## ✅ Definition of Done

The project is complete when:

1. ✅ All Phase 1-10 tasks are completed
2. ✅ SVG to React Native conversion works reliably
3. ✅ Dark theme UI is implemented and polished
4. ✅ All configuration options are functional
5. ✅ Code is properly tested (>80% coverage)
6. ✅ Documentation is complete
7. ✅ App is deployed and accessible
8. ✅ No critical bugs in production
9. ✅ Performance targets are met
10. ✅ Accessibility standards are met (WCAG AA)

---

## 📝 Notes

- Prioritize React Native conversion quality over React web
- Focus on Figma export compatibility (most common use case)
- Keep UI simple and fast - avoid over-engineering
- Make the tool educational - show what's happening during conversion
- Consider adding "Why this conversion?" tooltips
- Make output code production-ready (no manual edits needed)

---

**Last Updated**: December 2025
**Status**: Planning Phase
**Next Step**: Phase 1 - Foundation & Setup
