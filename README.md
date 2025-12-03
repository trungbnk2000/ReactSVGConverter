# SVG to React Native Converter

> A modern, dark-themed web tool to convert raw SVG code from Figma (or any source) into production-ready React Native components.

![Status](https://img.shields.io/badge/status-planning-blue)
![React](https://img.shields.io/badge/React-19-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1-38bdf8)

---

## 🎯 Project Vision

Create the **best-in-class SVG to React Native converter** with a focus on:

- **React Native First**: Optimized for `react-native-svg` with full component mapping
- **Beautiful Dark UI**: Modern, professional interface optimized for developers
- **Superior UX**: Live preview, syntax highlighting, real-time conversion
- **Figma Integration**: Handles Figma SVG exports seamlessly
- **Full Control**: Extensive configuration options for every use case

---

## 🚀 Key Features (Planned)

### Core Conversion
- ✅ SVG to React Native component transformation
- ✅ Automatic element mapping (`<svg>` → `<Svg>`, `<path>` → `<Path>`, etc.)
- ✅ Attribute conversion (kebab-case → camelCase)
- ✅ TypeScript support with type definitions
- ✅ Icon mode with customizable props

### UI/UX
- ✅ Dark theme interface (optimized for long sessions)
- ✅ Three-panel layout: Config | Input | Output
- ✅ Live code editor with syntax highlighting (CodeMirror)
- ✅ Visual SVG preview
- ✅ Real-time conversion with debouncing

### Configuration Options
- **Dimensions**: Remove, keep, or customize width/height
- **Props**: Control props spreading (start, end, none)
- **TypeScript**: Generate .tsx with proper types
- **Icon Mode**: Transform SVG into icon component with color props
- **SVGO**: Optimize SVG before conversion
- **Attributes**: Find and replace attribute values
- **Export**: Choose default/named exports

### Developer Experience
- 📋 Copy to clipboard
- ⬇️ Download as .tsx/.jsx file
- 💾 Save/load configuration presets
- ⌨️ Keyboard shortcuts
- 🔄 Example library
- 📚 Usage examples generated

---

## 📁 Project Structure

```
ReactSVGConverter/
├── docs/
│   ├── PLAN.md              # Comprehensive 10-week implementation plan
│   ├── ARCHITECTURE.md      # System architecture and technical design
│   ├── QUICK_START.md       # Day-by-day getting started guide
│   └── UI_MOCKUP.md         # Detailed dark theme UI specifications
│
├── src/
│   ├── components/          # React components
│   │   ├── layout/          # Header, panels, split panes
│   │   ├── config/          # Configuration options
│   │   ├── editor/          # Code editor components
│   │   ├── preview/         # Output preview components
│   │   └── ui/              # Reusable UI components
│   │
│   ├── core/                # Core conversion logic
│   │   ├── converter/       # SVG parsing and transformation
│   │   ├── optimizer/       # SVGO integration
│   │   ├── formatter/       # Prettier integration
│   │   └── validator/       # Input validation
│   │
│   ├── store/               # Zustand state management
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Helper functions
│   ├── types/               # TypeScript type definitions
│   └── styles/              # Theme and animations
│
└── package.json
```

---

## 📚 Documentation

Comprehensive planning documents are available:

1. **[PLAN.md](./PLAN.md)** - 10-week implementation roadmap with:
   - Detailed feature specifications
   - Phase-by-phase breakdown
   - Technical considerations
   - Success metrics

2. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Technical architecture including:
   - System design and data flow
   - Component hierarchy
   - State management strategy
   - Type system and interfaces

3. **[QUICK_START.md](./QUICK_START.md)** - Getting started guide with:
   - Day-by-day implementation tasks
   - Code templates and examples
   - Setup instructions
   - Learning resources

4. **[UI_MOCKUP.md](./UI_MOCKUP.md)** - UI/UX design specifications:
   - Dark theme color system
   - Component mockups
   - Interactive states
   - Animation guidelines

---

## 🛠️ Tech Stack

### Core
- **React 19** - UI framework
- **TypeScript 5.9** - Type safety
- **Vite 7** - Build tool
- **Tailwind CSS 4** - Styling
- **Framer Motion 12** - Animations

### SVG Processing
- **@svgr/core** - SVG transformation
- **svgo** - SVG optimization
- **prettier** - Code formatting

### UI Components
- **CodeMirror 6** - Code editor
- **lucide-react** - Icons
- **react-hot-toast** - Notifications

### State Management
- **Zustand** - Lightweight state management

---

## 🚦 Current Status

**Phase**: Planning & Design ✅

**Next Steps**:
1. Install dependencies
2. Set up project structure
3. Implement core conversion engine
4. Build UI components
5. Integrate and test

See [QUICK_START.md](./QUICK_START.md) for detailed implementation roadmap.

---

## 🎨 Design Preview

The tool features a modern **dark theme interface** with:

- **Near-black background** (#0a0a0a) for reduced eye strain
- **Indigo-purple gradient** accents (#6366f1 → #8b5cf6)
- **Three-panel layout**: Config | Input Editor | Output Preview
- **Syntax-highlighted** code editors (One Dark theme)
- **Live preview** with visual SVG rendering
- **Smooth animations** powered by Framer Motion

See [UI_MOCKUP.md](./UI_MOCKUP.md) for complete design specifications.

---

## 🎯 Target Use Cases

1. **Figma to React Native**: Convert Figma-exported SVGs directly to RN components
2. **Icon Libraries**: Build custom icon component libraries
3. **Illustration Components**: Transform complex SVGs into components
4. **Batch Processing**: Convert multiple SVGs with consistent configuration
5. **Learning Tool**: Understand SVG → React Native transformation

---

## 🔧 Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup
```bash
# Clone the repository
git clone <repo-url>
cd ReactSVGConverter

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

---

## 📖 How It Works

```
┌────────────┐
│  SVG Input │  Raw SVG from Figma or any source
└─────┬──────┘
      │
      ▼
┌────────────┐
│ Validation │  Check SVG validity
└─────┬──────┘
      │
      ▼
┌────────────┐
│SVGO (opt.) │  Optimize and clean SVG
└─────┬──────┘
      │
      ▼
┌────────────┐
│   Parser   │  Parse to AST, extract metadata
└─────┬──────┘
      │
      ▼
┌────────────┐
│ Transform  │  Map elements, fix attributes
└─────┬──────┘
      │
      ▼
┌────────────┐
│  Generate  │  Create React Native component
└─────┬──────┘
      │
      ▼
┌────────────┐
│   Format   │  Prettier formatting
└─────┬──────┘
      │
      ▼
┌────────────┐
│   Output   │  Display, copy, or download
└────────────┘
```

---

## 🎓 Learning Resources

- [React Native SVG Documentation](https://github.com/software-mansion/react-native-svg)
- [SVGR (inspiration)](https://react-svgr.com/)
- [SVG Specification](https://www.w3.org/TR/SVG2/)
- [CodeMirror 6 Docs](https://codemirror.net/)

---

## 🤝 Contributing

This project is currently in the planning phase. Contributions will be welcome once the initial implementation is complete.

---

## 📝 License

MIT

---

## 🙏 Acknowledgments

- **SVGR** - Inspiration for the concept
- **Tailwind UI** - Design patterns
- **Framer Motion** - Animation library
- **CodeMirror** - Code editor

---

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ for the React Native community**
