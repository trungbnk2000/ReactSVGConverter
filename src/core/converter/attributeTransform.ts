// src/core/converter/attributeTransform.ts
import type {
  AttributeReplacement,
  ConverterConfig,
  OutputFormat,
} from '../../types/converter';
import { SVG_ATTRIBUTE_MAP, REMOVED_ATTRIBUTES } from '../../types/svg';
import type { TransformedElement } from './elementMapping';

/**
 * Transform attribute name from kebab-case to camelCase
 */
export function transformAttributeName(
  attrName: string,
  format: OutputFormat
): string | null {
  // For React Native, use the attribute map
  if (format === 'react-native' || format === 'react-native-web') {
    // Check if attribute should be removed
    if (REMOVED_ATTRIBUTES.includes(attrName)) {
      return null;
    }

    // Check if attribute needs transformation
    if (attrName in SVG_ATTRIBUTE_MAP) {
      const mapped = SVG_ATTRIBUTE_MAP[attrName];
      // If mapped to empty string, remove it
      return mapped === '' ? null : mapped;
    }

    // Check if already in camelCase or needs conversion
    if (attrName.includes('-')) {
      return kebabToCamelCase(attrName);
    }

    return attrName;
  }

  // For React web, also use camelCase
  if (format === 'react') {
    if (attrName.includes('-')) {
      return kebabToCamelCase(attrName);
    }
    return attrName;
  }

  return attrName;
}

/**
 * Convert kebab-case to camelCase
 */
export function kebabToCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Transform attribute value
 */
export function transformAttributeValue(
  attrName: string,
  attrValue: string,
  config: ConverterConfig
): string {
  let value = attrValue;

  // Apply custom replacements
  if (config.attributes.replacements.length > 0) {
    config.attributes.replacements.forEach((replacement) => {
      // Check if replacement applies to all elements or specific ones
      if (!replacement.elements || replacement.elements.length === 0) {
        value = value.replace(
          new RegExp(escapeRegex(replacement.find), 'g'),
          replacement.replace
        );
      }
    });
  }

  // Remove data attributes if configured
  if (config.attributes.removeDataAttributes && attrName.startsWith('data-')) {
    return '';
  }

  // Remove aria attributes if configured
  if (
    config.attributes.removeAriaAttributes &&
    attrName.startsWith('aria-')
  ) {
    return '';
  }

  // Handle style attribute (convert to object notation for React Native)
  if (attrName === 'style' && (config.outputFormat === 'react-native' || config.outputFormat === 'react-native-web')) {
    return convertStyleToObject(value);
  }

  // Remove units from numeric attributes for React Native
  if (config.outputFormat === 'react-native' || config.outputFormat === 'react-native-web') {
    if (isNumericAttribute(attrName)) {
      return removeUnits(value);
    }
  }

  return value;
}

/**
 * Convert CSS style string to object notation
 */
export function convertStyleToObject(styleString: string): string {
  const styles: Record<string, string> = {};

  styleString.split(';').forEach((rule) => {
    const [property, value] = rule.split(':').map((s) => s.trim());
    if (property && value) {
      const camelProperty = kebabToCamelCase(property);
      styles[camelProperty] = value;
    }
  });

  return JSON.stringify(styles);
}

/**
 * Check if attribute is numeric
 */
function isNumericAttribute(attrName: string): boolean {
  const numericAttrs = [
    'width',
    'height',
    'x',
    'y',
    'cx',
    'cy',
    'r',
    'rx',
    'ry',
    'x1',
    'y1',
    'x2',
    'y2',
    'strokeWidth',
    'stroke-width',
    'fontSize',
    'font-size',
  ];
  return numericAttrs.includes(attrName);
}

/**
 * Remove units from value (e.g., "24px" -> "24")
 */
function removeUnits(value: string): string {
  // If it's already a number, return as is
  if (!isNaN(Number(value))) {
    return value;
  }

  // Remove common units
  return value.replace(/px|em|rem|pt|%/g, '');
}

/**
 * Escape special regex characters
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Transform all attributes of an element
 */
export function transformElementAttributes(
  element: TransformedElement,
  config: ConverterConfig
): TransformedElement {
  const transformedAttributes: Record<string, string> = {};

  // Transform each attribute
  Object.entries(element.attributes).forEach(([name, value]) => {
    const transformedName = transformAttributeName(name, config.outputFormat);

    // Skip if attribute should be removed
    if (transformedName === null) {
      return;
    }

    const transformedValue = transformAttributeValue(name, value, config);

    // Skip if value is empty after transformation
    if (transformedValue === '') {
      return;
    }

    transformedAttributes[transformedName] = transformedValue;
  });

  // Recursively transform children
  const transformedChildren = element.children.map((child) =>
    transformElementAttributes(child, config)
  );

  return {
    ...element,
    attributes: transformedAttributes,
    children: transformedChildren,
  };
}

/**
 * Apply dimension configuration
 */
export function applyDimensionConfig(
  element: TransformedElement,
  config: ConverterConfig
): TransformedElement {
  // Only apply to root Svg element
  if (element.name !== 'Svg' && element.name !== 'svg') {
    return element;
  }

  const newAttributes = { ...element.attributes };

  switch (config.dimensions.mode) {
    case 'remove':
      // Remove width and height, keep viewBox
      delete newAttributes.width;
      delete newAttributes.height;
      if (!config.dimensions.preserveViewBox) {
        delete newAttributes.viewBox;
      }
      break;

    case 'custom':
      // Set custom dimensions
      if (config.dimensions.customWidth) {
        newAttributes.width = config.dimensions.customWidth.toString();
      }
      if (config.dimensions.customHeight) {
        newAttributes.height = config.dimensions.customHeight.toString();
      }
      if (!config.dimensions.preserveViewBox) {
        delete newAttributes.viewBox;
      }
      break;

    case 'keep':
    default:
      // Keep original dimensions
      if (!config.dimensions.preserveViewBox) {
        delete newAttributes.viewBox;
      }
      break;
  }

  return {
    ...element,
    attributes: newAttributes,
  };
}

/**
 * Apply icon mode transformations
 */
export function applyIconMode(
  element: TransformedElement,
  config: ConverterConfig
): TransformedElement {
  if (!config.icon.enabled) {
    return element;
  }

  // Only apply to root Svg element
  if (element.name !== 'Svg') {
    return element;
  }

  const newAttributes = { ...element.attributes };

  // Set default size
  newAttributes.width = `{width || ${config.icon.defaultSize}}`;
  newAttributes.height = `{height || ${config.icon.defaultSize}}`;

  // Replace colors with prop if enabled
  if (config.icon.replaceColor) {
    // This will be handled recursively in children
    return {
      ...element,
      attributes: newAttributes,
      children: element.children.map((child) =>
        replaceColorsWithProp(child, 'color')
      ),
    };
  }

  return {
    ...element,
    attributes: newAttributes,
  };
}

/**
 * Replace fill and stroke colors with a prop reference
 */
function replaceColorsWithProp(
  element: TransformedElement,
  propName: string
): TransformedElement {
  const newAttributes = { ...element.attributes };

  // Replace fill if it's a color (not 'none')
  if (newAttributes.fill && newAttributes.fill !== 'none') {
    newAttributes.fill = `{${propName} || '${newAttributes.fill}'}`;
  }

  // Replace stroke if it's a color (not 'none')
  if (newAttributes.stroke && newAttributes.stroke !== 'none') {
    newAttributes.stroke = `{${propName} || '${newAttributes.stroke}'}`;
  }

  // Recursively process children
  return {
    ...element,
    attributes: newAttributes,
    children: element.children.map((child) =>
      replaceColorsWithProp(child, propName)
    ),
  };
}

/**
 * Apply custom attribute replacements
 */
export function applyAttributeReplacements(
  element: TransformedElement,
  replacements: AttributeReplacement[]
): TransformedElement {
  if (replacements.length === 0) {
    return element;
  }

  const newAttributes = { ...element.attributes };

  // Apply each replacement
  replacements.forEach((replacement) => {
    // Check if replacement applies to this element
    if (
      replacement.elements &&
      replacement.elements.length > 0 &&
      !replacement.elements.includes(element.name.toLowerCase())
    ) {
      return;
    }

    // Apply replacement to all attribute values
    Object.keys(newAttributes).forEach((attrName) => {
      newAttributes[attrName] = newAttributes[attrName].replace(
        new RegExp(escapeRegex(replacement.find), 'g'),
        replacement.replace
      );
    });
  });

  // Recursively process children
  return {
    ...element,
    attributes: newAttributes,
    children: element.children.map((child) =>
      applyAttributeReplacements(child, replacements)
    ),
  };
}
