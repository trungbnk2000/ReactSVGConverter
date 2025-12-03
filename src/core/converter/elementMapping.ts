// src/core/converter/elementMapping.ts
import type { OutputFormat } from '../../types/converter';
import { SVG_ELEMENT_MAP } from '../../types/svg';

/**
 * Get the mapped element name based on output format
 */
export function getElementName(
  originalElement: string,
  format: OutputFormat
): string {
  const elementLower = originalElement.toLowerCase();

  // For React Native, use the mapping
  if (format === 'react-native' || format === 'react-native-web') {
    return SVG_ELEMENT_MAP[elementLower as keyof typeof SVG_ELEMENT_MAP] || originalElement;
  }

  // For React (web), keep lowercase but make first letter uppercase
  if (format === 'react') {
    return elementLower.charAt(0).toUpperCase() + elementLower.slice(1);
  }

  return originalElement;
}

/**
 * Get all required imports for React Native SVG based on used elements
 */
export function getRequiredImports(
  usedElements: Set<string>,
  format: OutputFormat
): Set<string> {
  const imports = new Set<string>();

  // Always import Svg for the root element
  if (format === 'react-native' || format === 'react-native-web') {
    imports.add('Svg');

    // Map each used element to its React Native equivalent
    usedElements.forEach((element) => {
      const elementLower = element.toLowerCase();
      // Skip 'svg' since we already added 'Svg'
      if (elementLower !== 'svg') {
        const mappedName = SVG_ELEMENT_MAP[elementLower as keyof typeof SVG_ELEMENT_MAP];
        if (mappedName && mappedName !== 'Svg') {
          imports.add(mappedName);
        }
      }
    });
  }

  return imports;
}

/**
 * Transform element recursively
 */
export interface TransformedElement {
  name: string;
  attributes: Record<string, string>;
  children: TransformedElement[];
  text?: string;
}

export function transformElement(
  element: Element,
  format: OutputFormat
): TransformedElement {
  const originalName = element.tagName;
  const transformedName = getElementName(originalName, format);

  // Get attributes
  const attributes: Record<string, string> = {};
  for (let i = 0; i < element.attributes.length; i++) {
    const attr = element.attributes[i];
    attributes[attr.name] = attr.value;
  }

  // Get children
  const children: TransformedElement[] = [];
  let textContent: string | undefined;

  for (let i = 0; i < element.childNodes.length; i++) {
    const child = element.childNodes[i];

    if (child.nodeType === Node.ELEMENT_NODE) {
      // Recursively transform child elements
      children.push(transformElement(child as Element, format));
    } else if (child.nodeType === Node.TEXT_NODE) {
      // Capture text content
      const text = child.textContent?.trim();
      if (text) {
        textContent = text;
      }
    }
  }

  return {
    name: transformedName,
    attributes,
    children,
    text: textContent,
  };
}

/**
 * Transform entire SVG tree
 */
export function transformSVGTree(
  svgElement: Element,
  format: OutputFormat
): TransformedElement {
  return transformElement(svgElement, format);
}

/**
 * Check if element is supported in React Native
 */
export function isElementSupported(
  elementName: string,
  format: OutputFormat
): boolean {
  if (format === 'react') {
    return true; // All SVG elements supported in web
  }

  const elementLower = elementName.toLowerCase();
  return elementLower in SVG_ELEMENT_MAP;
}

/**
 * Get unsupported elements warning
 */
export function getUnsupportedElements(
  usedElements: Set<string>,
  format: OutputFormat
): string[] {
  const unsupported: string[] = [];

  if (format === 'react-native' || format === 'react-native-web') {
    usedElements.forEach((element) => {
      if (!isElementSupported(element, format)) {
        unsupported.push(element);
      }
    });
  }

  return unsupported;
}

/**
 * Flatten nested groups (optimization)
 */
export function flattenGroups(element: TransformedElement): TransformedElement {
  // If this is a group with no attributes and only one child, flatten it
  if (
    element.name === 'G' &&
    Object.keys(element.attributes).length === 0 &&
    element.children.length === 1
  ) {
    return flattenGroups(element.children[0]);
  }

  // Recursively flatten children
  return {
    ...element,
    children: element.children.map(flattenGroups),
  };
}

/**
 * Remove empty groups
 */
export function removeEmptyGroups(
  element: TransformedElement
): TransformedElement | null {
  // Remove groups with no children and no attributes
  if (
    element.name === 'G' &&
    element.children.length === 0 &&
    Object.keys(element.attributes).length === 0
  ) {
    return null;
  }

  // Recursively process children
  const filteredChildren = element.children
    .map(removeEmptyGroups)
    .filter((child): child is TransformedElement => child !== null);

  return {
    ...element,
    children: filteredChildren,
  };
}

/**
 * Optimize transformed tree
 */
export function optimizeTransformedTree(
  element: TransformedElement
): TransformedElement {
  // First remove empty groups
  let optimized = removeEmptyGroups(element);
  if (!optimized) {
    return element; // If root was removed, return original
  }

  // Then flatten nested groups
  optimized = flattenGroups(optimized);

  return optimized;
}
