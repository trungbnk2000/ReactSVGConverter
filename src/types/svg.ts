// src/types/svg.ts

/**
 * SVG element names (standard SVG)
 */
export type SVGElementName =
  | 'svg'
  | 'g'
  | 'path'
  | 'circle'
  | 'rect'
  | 'ellipse'
  | 'line'
  | 'polygon'
  | 'polyline'
  | 'text'
  | 'tspan'
  | 'defs'
  | 'linearGradient'
  | 'radialGradient'
  | 'stop'
  | 'clipPath'
  | 'mask'
  | 'image'
  | 'use'
  | 'symbol'
  | 'pattern'
  | 'marker';

/**
 * React Native SVG element names
 */
export type ReactNativeSVGElement =
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
  | 'Symbol'
  | 'Pattern'
  | 'Marker';

/**
 * SVG attribute names that need camelCase conversion
 */
export const SVG_ATTRIBUTE_MAP: Record<string, string> = {
  'class': '', // Remove (not supported in React Native)
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
  'font-family': 'fontFamily',
  'font-size': 'fontSize',
  'font-weight': 'fontWeight',
  'font-style': 'fontStyle',
  'text-anchor': 'textAnchor',
  'text-decoration': 'textDecoration',
  'letter-spacing': 'letterSpacing',
  'word-spacing': 'wordSpacing',
  'baseline-shift': 'baselineShift',
  'stop-color': 'stopColor',
  'stop-opacity': 'stopOpacity',
  'gradient-units': 'gradientUnits',
  'gradient-transform': 'gradientTransform',
  'spread-method': 'spreadMethod',
  'marker-start': 'markerStart',
  'marker-mid': 'markerMid',
  'marker-end': 'markerEnd',
  'paint-order': 'paintOrder',
  'color-interpolation': 'colorInterpolation',
  'color-rendering': 'colorRendering',
};

/**
 * SVG element mapping (SVG -> React Native SVG)
 */
export const SVG_ELEMENT_MAP: Record<SVGElementName, ReactNativeSVGElement> = {
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
  'pattern': 'Pattern',
  'marker': 'Marker',
};

/**
 * SVG attributes that should be removed for React Native
 */
export const REMOVED_ATTRIBUTES = [
  'class',
  'xmlns',
  'xmlns:xlink',
  'xml:space',
  'enable-background',
  'version',
];

/**
 * SVG transformation data
 */
export interface SVGTransformData {
  originalElement: string;
  transformedElement: string;
  attributes: Record<string, string>;
  children: SVGTransformData[];
}

/**
 * SVG parsing options
 */
export interface SVGParseOptions {
  strict: boolean;
  removeComments: boolean;
  removeWhitespace: boolean;
}
