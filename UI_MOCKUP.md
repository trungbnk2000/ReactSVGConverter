# SVG to React Native Converter - Dark Theme UI Mockup

## 🎨 Complete Visual Design Specification

This document provides a detailed visual specification for the dark-themed user interface.

---

## 📐 Full Application Mockup (Text-Based)

```
┌───────────────────────────────────────────────────────────────────────────────────────────────────┐
│  ┌─┐  SVG Converter                    ┌─React Native─┬─React─┬─RN Web─┐    [Copy Code] [Download]│
│  └─┘  React Native First               └──────────────┴───────┴────────┘                          │
├───────────────────────────────────────────────────────────────────────────────────────────────────┤
│          │                                              │                                         │
│  ┌─────┐ │  Input SVG                   [Paste] [Clear]│  Output   [Code|Preview|Types]          │
│  │📐   │ │ ┌──────────────────────────────────────────┐│ ┌──────────────────────────────────────┐│
│  └─────┘ │ │ <?xml version="1.0"?>                    ││ │ import Svg, { Path } from ...        ││
│  Dims    │ │ <svg width="24" height="24">             ││ │                                      ││
│  ┌──┐   │ │   <path d="M12 0L..." fill="#000"/>      ││ │ const SvgComponent = (props) => {    ││
│  │☑️│Rm  │ │ </svg>                                   ││ │   return (                           ││
│  └──┘    │ │                                          ││ │     <Svg width={24} height={24}      ││
│          │ │                                          ││ │          viewBox="0 0 24 24"         ││
│  ┌─────┐ │ │                                          ││ │          {...props}>                 ││
│  │⚙️   │ │ │                                          ││ │       <Path                          ││
│  └─────┘ │ │                                          ││ │         d="M12 0L..."                ││
│  Props   │ │                                          ││ │         fill="#000"                  ││
│  ●Start  │ │                                          ││ │       />                             ││
│  ◯End    │ │                                          ││ │     </Svg>                           ││
│  ◯None   │ │                                          ││ │   );                                 ││
│          │ │                                          ││ │ };                                   ││
│  ┌─────┐ │ │                                          ││ │                                      ││
│  │📝   │ │ │                                          ││ │ export default SvgComponent;         ││
│  └─────┘ │ │                                          ││ │                                      ││
│  TS      │ │                                          ││ │                                      ││
│  ┌──┐   │ │                                          ││ │                                      ││
│  │☑️│On  │ │                                          ││ │                                      ││
│  └──┘    │ │                                          ││ │                                      ││
│          │ │                                          ││ │                                      ││
│  ┌─────┐ │ │                                          ││ │                                      ││
│  │🎯   │ │ │                                          ││ │                                      ││
│  └─────┘ │ │                                          ││ │                                      ││
│  Icon    │ │                                          ││ │                                      ││
│  ┌──┐   │ │                                          ││ │                                      ││
│  │☑️│En  │ │                                          ││ │                                      ││
│  └──┘    │ │                                          ││ │                                      ││
│  Size:24 │ │                                          ││ │                                      ││
│          │ └──────────────────────────────────────────┘│ └──────────────────────────────────────┘│
│  ┌─────┐ │                                              │                                         │
│  │🔧   │ │                                              │                                         │
│  └─────┘ │                                              │                                         │
│  SVGO    │                                              │                                         │
│  ┌──┐   │                                              │                                         │
│  │☑️│En  │                                              │                                         │
│  └──┘    │                                              │                                         │
│          │                                              │                                         │
└──────────┴──────────────────────────────────────────────┴─────────────────────────────────────────┘

COLORS:
  Main Background: #0a0a0a (near black)
  Panel Background: #141414 (dark gray)
  Card Background: #1e1e1e (lighter gray)
  Border: #2a2a2a (subtle gray)
  Text Primary: #f5f5f5 (almost white)
  Text Secondary: #a3a3a3 (medium gray)
  Accent: Gradient from #6366f1 (indigo) to #8b5cf6 (purple)
```

---

## 🎯 Component Breakdown with Exact Styling

### 1. Header Component

```
┌───────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                       │
│  ┌───┐  SVG Converter           ┌──────────────────────────┐                        │
│  │ S │  React Native First       │  React Native │ React │ RN Web │    [📋] [⬇️]     │
│  └───┘                           └──────────────────────────┘                        │
│                                                                                       │
└───────────────────────────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- Height: 64px (`h-16`)
- Background: `#0a0a0a`
- Border bottom: `1px solid #2a2a2a`
- Padding: `0 24px`

**Logo Section:**
- Square gradient box: 40×40px
- Gradient: `from-indigo-500 to-purple-600`
- Border radius: 8px
- Letter "S" in white, bold, 20px

**Format Selector:**
- Background: `#141414`
- Border: `1px solid #2a2a2a`
- Border radius: 8px
- Padding: 4px
- Active button: Gradient `from-indigo-600 to-purple-600`
- Inactive button: Text color `#a3a3a3`, hover `#f5f5f5`

**Action Buttons:**
- Copy button: Background `#1e1e1e`, border `#2a2a2a`
- Download button: Gradient `from-indigo-600 to-purple-600`
- Hover: Slightly darker gradient
- Icons: 16×16px (lucide-react)

---

### 2. Config Panel (Left Sidebar)

```
┌──────────────────────────┐
│                          │
│  ┌────────────────────┐  │
│  │ 📐 Dimensions      │  │
│  ├────────────────────┤  │
│  │ ☑️ Remove dims     │  │
│  │   Make responsive  │  │
│  │                    │  │
│  │ ◯ Keep original    │  │
│  │ ◯ Custom size      │  │
│  │   ┌─────┐ ┌─────┐ │  │
│  │   │  W  │ │  H  │ │  │
│  │   └─────┘ └─────┘ │  │
│  │                    │  │
│  │ ☑️ Preserve viewBox│  │
│  └────────────────────┘  │
│                          │
│  ┌────────────────────┐  │
│  │ ⚙️ Props           │  │
│  ├────────────────────┤  │
│  │ Expand props:      │  │
│  │ ● Start            │  │
│  │ ◯ End              │  │
│  │ ◯ None             │  │
│  │                    │  │
│  │ ☑️ Native prop     │  │
│  │ ☐ Title prop       │  │
│  │ ☐ Desc prop        │  │
│  └────────────────────┘  │
│                          │
│  ┌────────────────────┐  │
│  │ 📝 TypeScript      │  │
│  ├────────────────────┤  │
│  │ ☑️ Use TypeScript  │  │
│  │ ☑️ Generate types  │  │
│  │ ☐ Memo wrapper     │  │
│  │ ☐ ForwardRef       │  │
│  └────────────────────┘  │
│                          │
│  ┌────────────────────┐  │
│  │ 🎯 Icon Mode (RN)  │  │
│  ├────────────────────┤  │
│  │ ☑️ Enable icon mode│  │
│  │                    │  │
│  │ Default size:      │  │
│  │ ┌────────────────┐ │  │
│  │ │ 24             │ │  │
│  │ └────────────────┘ │  │
│  │                    │  │
│  │ ☑️ Replace color   │  │
│  │   with prop        │  │
│  │                    │  │
│  │ ☑️ Add accessible  │  │
│  │   label            │  │
│  └────────────────────┘  │
│                          │
│  ┌────────────────────┐  │
│  │ 🔄 Replace Attrs   │  │
│  ├────────────────────┤  │
│  │ Find:   Replace:   │  │
│  │ ┌────┐  ┌────────┐│  │
│  │ │#000│→│current │││  │
│  │ └────┘  └────────┘│  │
│  │         [+ Add]    │  │
│  └────────────────────┘  │
│                          │
│  ┌────────────────────┐  │
│  │ 🔧 SVGO            │  │
│  ├────────────────────┤  │
│  │ ☑️ Enable SVGO     │  │
│  │                    │  │
│  │ ☑️ Remove title    │  │
│  │ ☑️ Remove desc     │  │
│  │ ☑️ Remove comments │  │
│  │ ☑️ Merge paths     │  │
│  │                    │  │
│  │ [⚙️ Advanced...]   │  │
│  └────────────────────┘  │
│                          │
│  ┌────────────────────┐  │
│  │ 📤 Export          │  │
│  ├────────────────────┤  │
│  │ Component name:    │  │
│  │ ┌────────────────┐ │  │
│  │ │ SvgComponent   │ │  │
│  │ └────────────────┘ │  │
│  │                    │  │
│  │ Export type:       │  │
│  │ ● Default          │  │
│  │ ◯ Named            │  │
│  │ ◯ Both             │  │
│  └────────────────────┘  │
│                          │
│  [💾 Save Preset]        │
│  [📂 Load Preset]        │
│                          │
└──────────────────────────┘
```

**Specifications:**
- Width: 320px (`w-80`)
- Background: `#141414`
- Padding: 24px
- Scroll: Auto overflow

**Section Card:**
- Background: `#1e1e1e`
- Border: `1px solid #2a2a2a`
- Border radius: 8px
- Padding: 16px
- Margin bottom: 24px

**Section Header:**
- Icon size: 16×16px
- Icon color: `#6366f1` (indigo-400)
- Text: 14px, semibold, `#f5f5f5`
- Margin bottom: 12px

**Checkbox/Radio:**
- Size: 16×16px
- Background: `#141414`
- Border: `#3a3a3a`
- Checked: `#6366f1` (indigo-500)
- Focus ring: `#6366f1`

**Input Fields:**
- Background: `#0a0a0a`
- Border: `1px solid #2a2a2a`
- Border radius: 6px
- Padding: 8px 12px
- Text: 14px, `#f5f5f5`
- Placeholder: `#737373`
- Focus: Border `#6366f1`, ring `1px #6366f1`

**Labels:**
- Primary: 14px, `#f5f5f5`
- Secondary (help text): 12px, `#737373`

---

### 3. Editor Panel (Center)

```
┌─────────────────────────────────────────────────────┐
│  Input SVG                      [📋 Paste] [🗑️ Clear]│
├─────────────────────────────────────────────────────┤
│ 1  <?xml version="1.0" encoding="UTF-8"?>          │
│ 2  <svg                                            │
│ 3    width="24"                                    │
│ 4    height="24"                                   │
│ 5    viewBox="0 0 24 24"                           │
│ 6    fill="none"                                   │
│ 7    xmlns="http://www.w3.org/2000/svg"            │
│ 8  >                                               │
│ 9    <path                                         │
│10      d="M12 2L2 7v10c0 5.55 3.84..."            │
│11      fill="#000000"                              │
│12    />                                            │
│13  </svg>                                          │
│14                                                  │
│15  [Drop SVG file here or paste code]             │
│16                                                  │
│                                                    │
│                                                    │
│                                                    │
│                                                    │
│                                                    │
│                                                    │
│                                                    │
└─────────────────────────────────────────────────────┘
```

**Specifications:**
- Background: `#141414`
- No padding (editor fills full height)

**Toolbar:**
- Height: 48px
- Background: `#0a0a0a`
- Border bottom: `1px solid #2a2a2a`
- Padding: 0 16px

**Editor:**
- Theme: One Dark
- Font: Monospace (JetBrains Mono, Fira Code, or system)
- Font size: 14px
- Line height: 1.5
- Line numbers: Enabled
- Syntax: XML/SVG

**Placeholder (when empty):**
- Center-aligned
- Text: `#737373`
- Icon: Upload cloud (64×64px, `#3a3a3a`)

---

### 4. Output Panel (Right)

```
┌─────────────────────────────────────────────────────┐
│  Output    [Code] [Preview] [Types]   [📋] [⬇️]     │
├─────────────────────────────────────────────────────┤
│ 1  import * as React from 'react';                 │
│ 2  import Svg, { Path } from 'react-native-svg';   │
│ 3                                                  │
│ 4  interface SvgComponentProps {                   │
│ 5    width?: number;                               │
│ 6    height?: number;                              │
│ 7    color?: string;                               │
│ 8  }                                               │
│ 9                                                  │
│10  const SvgComponent = ({                         │
│11    width = 24,                                   │
│12    height = 24,                                  │
│13    color = '#000',                               │
│14    ...props                                      │
│15  }: SvgComponentProps) => {                      │
│16    return (                                      │
│17      <Svg                                        │
│18        width={width}                             │
│19        height={height}                           │
│20        viewBox="0 0 24 24"                       │
│21        {...props}                                │
│22      >                                           │
│23        <Path                                     │
│24          d="M12 2L2 7v10c0..."                  │
│25          fill={color}                            │
│26        />                                        │
│27      </Svg>                                      │
│28    );                                            │
│29  };                                              │
│30                                                  │
│31  export default SvgComponent;                    │
└─────────────────────────────────────────────────────┘
```

**Preview Tab:**

```
┌─────────────────────────────────────────────────────┐
│  Output    [Code] [Preview] [Types]   [📋] [⬇️]     │
├─────────────────────────────────────────────────────┤
│                                                    │
│                  Visual Preview                    │
│                                                    │
│              ┌────────────────┐                    │
│              │                │                    │
│              │    ┌────┐      │                    │
│              │    │ 📱 │      │                    │
│              │    └────┘      │                    │
│              │                │                    │
│              │    24 × 24     │                    │
│              └────────────────┘                    │
│                                                    │
│          Dimensions: 24×24                         │
│          Elements: 5                               │
│          Size: 1.2 KB                              │
│                                                    │
│                                                    │
│                                                    │
└─────────────────────────────────────────────────────┘
```

**Specifications:**
- Same structure as Editor Panel
- Tabs: Active has background `#1e1e1e`, inactive is transparent
- Code view: Read-only CodeMirror with One Dark theme
- Preview: Centered, with stats below
- Types tab: Shows TypeScript definition file

---

## 🎨 Color System Reference

### Background Colors
```css
--bg-primary:   #0a0a0a;  /* Main app background */
--bg-secondary: #141414;  /* Panels, sidebars */
--bg-tertiary:  #1e1e1e;  /* Cards, elevated elements */
--bg-hover:     #2a2a2a;  /* Hover states */
```

### Border Colors
```css
--border-default: #2a2a2a;  /* Default borders */
--border-focus:   #3a3a3a;  /* Focus states */
--border-active:  #6366f1;  /* Active/focus with accent */
```

### Text Colors
```css
--text-primary:   #f5f5f5;  /* Main text */
--text-secondary: #a3a3a3;  /* Secondary text */
--text-muted:     #737373;  /* Muted/disabled text */
```

### Accent Colors
```css
--accent-indigo:  #6366f1;  /* Primary accent */
--accent-purple:  #8b5cf6;  /* Secondary accent */
--success:        #10b981;  /* Success states */
--warning:        #f59e0b;  /* Warning states */
--error:          #ef4444;  /* Error states */
```

### Gradients
```css
--gradient-primary: linear-gradient(to right, #6366f1, #8b5cf6);
--gradient-hover:   linear-gradient(to right, #5558e3, #7c3aed);
```

---

## 🎭 Interactive States

### Button States

**Primary Button (Gradient):**
- Default: `bg-gradient-to-r from-indigo-600 to-purple-600`
- Hover: `from-indigo-700 to-purple-700`
- Active: `from-indigo-800 to-purple-800`
- Disabled: `opacity-50 cursor-not-allowed`
- Shadow: `shadow-lg shadow-indigo-500/30`

**Secondary Button:**
- Default: `bg-[#1e1e1e] border-[#2a2a2a]`
- Hover: `bg-[#2a2a2a]`
- Active: `bg-[#3a3a3a]`
- Disabled: `opacity-50 cursor-not-allowed`

**Icon Button:**
- Default: `text-[#a3a3a3]`
- Hover: `bg-[#1e1e1e] text-[#f5f5f5]`
- Active: `bg-[#2a2a2a]`
- Size: 32×32px padding, 16×16px icon

### Input States

**Text Input:**
- Default: `bg-[#0a0a0a] border-[#2a2a2a]`
- Hover: `border-[#3a3a3a]`
- Focus: `border-indigo-500 ring-1 ring-indigo-500`
- Error: `border-red-500 ring-1 ring-red-500`
- Disabled: `opacity-50 cursor-not-allowed`

### Checkbox/Radio States

- Default: `bg-[#141414] border-[#3a3a3a]`
- Hover: `border-[#4a4a4a]`
- Checked: `bg-indigo-500 border-indigo-500`
- Focus: `ring-2 ring-indigo-500 ring-offset-2 ring-offset-[#0a0a0a]`

---

## 🔄 Animations

### Framer Motion Presets

```typescript
// Fade in from bottom
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

// Fade in
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.2 }
};

// Scale on hover
const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { duration: 0.2 }
};

// Slide in from left (config panel)
const slideInLeft = {
  initial: { x: -320, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -320, opacity: 0 },
  transition: { type: 'spring', damping: 25, stiffness: 200 }
};
```

---

## 📱 Responsive Breakpoints

### Desktop (1280px+)
- 3-column layout (config | input | output)
- Config panel: 320px fixed
- Input/Output: flex-1 each

### Tablet (768px - 1279px)
- 2-column layout (input | output)
- Config panel: Collapsible drawer from left
- Input/Output: 50/50 split

### Mobile (< 768px)
- 1-column stacked layout
- Tabs for Input / Output / Config
- Full width editors

---

## 🎯 Design Principles

1. **Dark First**: Optimized for long coding sessions
2. **High Contrast**: Ensure readability (WCAG AA minimum)
3. **Consistent Spacing**: 4px base unit (4, 8, 12, 16, 24, 32, 48)
4. **Subtle Animations**: Enhance UX without distraction
5. **Clear Hierarchy**: Size, weight, and color indicate importance
6. **Icon Clarity**: 16×16px for inline, 20×20px for buttons
7. **Touch Targets**: Minimum 44×44px for interactive elements

---

## ✨ Polish Details

### Micro-interactions
- Button press: Scale 0.95
- Hover: Subtle background color change
- Focus: Clear ring indicator
- Loading: Subtle pulse animation
- Success: Green glow effect
- Error: Red shake animation

### Shadows
- Cards: `shadow-lg shadow-black/50`
- Buttons: `shadow-md shadow-indigo-500/30` (gradient buttons)
- Modals: `shadow-2xl shadow-black/70`

### Transitions
- Background: `transition-colors duration-200`
- Transform: `transition-transform duration-200`
- All: `transition-all duration-300` (use sparingly)

---

**Design Version**: 1.0
**Last Updated**: December 2025
**Status**: Ready for Implementation

Use this mockup as the source of truth for all UI implementation decisions.
