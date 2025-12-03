// src/core/converter/svgParser.ts
import type {
  ParseResult,
  ValidationResult,
  SVGMetadata,
} from '../../types/converter';

/**
 * Parse SVG string and extract metadata
 */
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
        error: 'Invalid SVG markup: ' + parseError.textContent,
        metadata: {},
        elements: new Set(),
        hasGradients: false,
        hasClipPaths: false,
        hasTransforms: false,
      };
    }

    // Find SVG element
    const svgElement = doc.querySelector('svg');
    if (!svgElement) {
      return {
        valid: false,
        error: 'No SVG element found',
        metadata: {},
        elements: new Set(),
        hasGradients: false,
        hasClipPaths: false,
        hasTransforms: false,
      };
    }

    // Extract metadata
    const metadata: SVGMetadata = extractMetadata(svgElement, doc);

    // Collect all unique element types
    const elements = new Set<string>();
    const allElements = svgElement.querySelectorAll('*');

    let hasGradients = false;
    let hasClipPaths = false;
    let hasTransforms = false;

    allElements.forEach((el) => {
      const tagName = el.tagName.toLowerCase();
      elements.add(tagName);

      // Check for special features
      if (tagName === 'lineargradient' || tagName === 'radialgradient') {
        hasGradients = true;
      }
      if (tagName === 'clippath') {
        hasClipPaths = true;
      }
      if (el.hasAttribute('transform')) {
        hasTransforms = true;
      }
    });

    // Add the svg element itself
    elements.add('svg');

    return {
      valid: true,
      ast: svgElement,
      metadata,
      elements,
      hasGradients,
      hasClipPaths,
      hasTransforms,
    };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Unknown parsing error',
      metadata: {},
      elements: new Set(),
      hasGradients: false,
      hasClipPaths: false,
      hasTransforms: false,
    };
  }
}

/**
 * Extract metadata from SVG element
 */
export function extractMetadata(
  svgElement: Element,
  doc: Document
): SVGMetadata {
  const metadata: SVGMetadata = {};

  // Extract width
  const widthAttr = svgElement.getAttribute('width');
  if (widthAttr) {
    // Remove units (px, em, etc.) and parse as number
    const width = parseFloat(widthAttr.replace(/[^0-9.]/g, ''));
    if (!isNaN(width)) {
      metadata.width = width;
    }
  }

  // Extract height
  const heightAttr = svgElement.getAttribute('height');
  if (heightAttr) {
    const height = parseFloat(heightAttr.replace(/[^0-9.]/g, ''));
    if (!isNaN(height)) {
      metadata.height = height;
    }
  }

  // Extract viewBox
  const viewBox = svgElement.getAttribute('viewBox');
  if (viewBox) {
    metadata.viewBox = viewBox;

    // If width/height not set, try to extract from viewBox
    if (!metadata.width || !metadata.height) {
      const parts = viewBox.trim().split(/\s+/);
      if (parts.length === 4) {
        if (!metadata.width) {
          metadata.width = parseFloat(parts[2]);
        }
        if (!metadata.height) {
          metadata.height = parseFloat(parts[3]);
        }
      }
    }
  }

  // Extract title
  const titleElement = doc.querySelector('title');
  if (titleElement) {
    metadata.title = titleElement.textContent?.trim() || undefined;
  }

  // Extract description
  const descElement = doc.querySelector('desc');
  if (descElement) {
    metadata.desc = descElement.textContent?.trim() || undefined;
  }

  return metadata;
}

/**
 * Validate SVG input
 */
export function validateSVG(svgString: string): ValidationResult {
  // Check if empty
  if (!svgString.trim()) {
    return {
      valid: false,
      error: 'SVG input is empty',
    };
  }

  // Check if contains SVG tag
  if (!svgString.includes('<svg')) {
    return {
      valid: false,
      error: 'No SVG element found in input',
    };
  }

  // Try to parse
  const result = parseSVG(svgString);

  if (!result.valid) {
    return {
      valid: false,
      error: result.error,
    };
  }

  // Check for warnings
  const warnings: string[] = [];

  // Warn if no viewBox
  if (!result.metadata.viewBox) {
    warnings.push('SVG has no viewBox attribute. This may cause scaling issues.');
  }

  // Warn if no dimensions
  if (!result.metadata.width && !result.metadata.height) {
    warnings.push('SVG has no width or height attributes.');
  }

  // Warn about complex features
  if (result.hasGradients) {
    warnings.push('SVG contains gradients. Ensure react-native-svg supports your gradient type.');
  }

  if (result.hasClipPaths) {
    warnings.push('SVG contains clip paths. These may not render identically across platforms.');
  }

  if (result.hasTransforms) {
    warnings.push('SVG contains transform attributes. Consider baking transforms into path data for better compatibility.');
  }

  return {
    valid: true,
    warnings: warnings.length > 0 ? warnings : undefined,
  };
}

/**
 * Extract component name suggestion from SVG
 */
export function suggestComponentName(svgString: string): string {
  const result = parseSVG(svgString);

  if (result.valid && result.metadata.title) {
    // Convert title to PascalCase
    return toPascalCase(result.metadata.title);
  }

  // Default name
  return 'SvgComponent';
}

/**
 * Convert string to PascalCase
 */
function toPascalCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

/**
 * Get SVG size estimate
 */
export function getSVGSize(svgString: string): number {
  return new Blob([svgString]).size;
}

/**
 * Check if SVG is likely from Figma
 */
export function isFigmaSVG(svgString: string): boolean {
  // Figma often includes specific attributes or patterns
  return (
    svgString.includes('figma') ||
    svgString.includes('Generator: Sketch') ||
    svgString.includes('fill-rule="evenodd"')
  );
}

/**
 * Clean SVG string (remove comments, extra whitespace)
 */
export function cleanSVGString(svgString: string): string {
  return svgString
    .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}
