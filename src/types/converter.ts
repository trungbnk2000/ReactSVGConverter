// src/types/converter.ts

/**
 * Output format types
 */
export type OutputFormat = 'react-native' | 'react' | 'react-native-web';

/**
 * Export type options
 */
export type ExportType = 'default' | 'named' | 'both';

/**
 * Dimension mode options
 */
export type DimensionMode = 'remove' | 'keep' | 'custom';

/**
 * Props expansion options
 */
export type PropsExpansion = 'none' | 'start' | 'end';

/**
 * Preview mode options
 */
export type PreviewMode = 'code' | 'visual' | 'split';

/**
 * SVG element types (from react-native-svg)
 */
export type SVGElementType =
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

/**
 * Attribute replacement configuration
 */
export interface AttributeReplacement {
  find: string;
  replace: string;
  elements?: string[]; // Optional: specific elements to apply to
}

/**
 * Component configuration
 */
export interface ComponentConfig {
  name: string;
  exportType: ExportType;
  typescript: boolean;
  memo: boolean;
  forwardRef: boolean;
}

/**
 * Dimensions configuration
 */
export interface DimensionsConfig {
  mode: DimensionMode;
  customWidth?: number;
  customHeight?: number;
  preserveViewBox: boolean;
}

/**
 * Props configuration
 */
export interface PropsConfig {
  expandProps: PropsExpansion;
  native: boolean; // Add native prop for styling
  titleProp: boolean;
  descProp: boolean;
}

/**
 * Icon mode configuration (React Native specific)
 */
export interface IconConfig {
  enabled: boolean;
  defaultSize: number;
  replaceColor: boolean; // Replace fill/stroke with color prop
  accessible: boolean;
}

/**
 * Attribute transformation configuration
 */
export interface AttributesConfig {
  replacements: AttributeReplacement[];
  removeDataAttributes: boolean;
  removeAriaAttributes: boolean;
}

/**
 * SVGO plugin configuration
 */
export interface SVGOPluginConfig {
  name: string;
  params?: Record<string, unknown>;
}

/**
 * SVGO configuration
 */
export interface SVGOConfig {
  enabled: boolean;
  plugins: SVGOPluginConfig[];
}

/**
 * Code style configuration
 */
export interface CodeStyleConfig {
  semi: boolean;
  singleQuote: boolean;
  tabWidth: 2 | 4;
  printWidth: 80 | 100 | 120;
}

/**
 * Complete converter configuration
 */
export interface ConverterConfig {
  outputFormat: OutputFormat;
  component: ComponentConfig;
  dimensions: DimensionsConfig;
  props: PropsConfig;
  icon: IconConfig;
  attributes: AttributesConfig;
  svgo: SVGOConfig;
  codeStyle: CodeStyleConfig;
}

/**
 * SVG metadata
 */
export interface SVGMetadata {
  width?: number;
  height?: number;
  viewBox?: string;
  title?: string;
  desc?: string;
}

/**
 * Conversion statistics
 */
export interface ConversionStats {
  elementCount: number;
  originalSize: number;
  optimizedSize: number;
}

/**
 * Conversion result
 */
export interface ConversionResult {
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

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;
  error?: string;
  warnings?: string[];
}

/**
 * Parse result
 */
export interface ParseResult {
  valid: boolean;
  ast?: Element;
  metadata: SVGMetadata;
  elements: Set<string>;
  hasGradients: boolean;
  hasClipPaths: boolean;
  hasTransforms: boolean;
  error?: string;
}

/**
 * Transformation context
 */
export interface TransformContext {
  format: OutputFormat;
  config: ConverterConfig;
  usedElements: Set<string>;
}

/**
 * Generated code structure
 */
export interface GeneratedCode {
  imports: string;
  typeDefinitions: string;
  component: string;
  usageExample: string;
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
