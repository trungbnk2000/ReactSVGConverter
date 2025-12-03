// src/core/converter/index.ts
import type { ConverterConfig, ConversionResult } from '../../types/converter';
import { parseSVG, validateSVG } from './svgParser';
import { optimizeSVG } from '../optimizer/svgo';
import {
  transformSVGTree,
  getRequiredImports,
  optimizeTransformedTree,
} from './elementMapping';
import {
  transformElementAttributes,
  applyDimensionConfig,
  applyIconMode,
  applyAttributeReplacements,
} from './attributeTransform';
import { generateCompleteCode } from './codeGenerator';
import { formatCode } from '../formatter/prettier';

/**
 * Main conversion function
 * Converts SVG string to React Native component code
 */
export async function convertSVGToReactNative(
  svgInput: string,
  config: ConverterConfig
): Promise<ConversionResult> {
  try {
    // STEP 1: Validate input
    const validation = validateSVG(svgInput);
    if (!validation.valid) {
      return {
        success: false,
        code: '',
        error: validation.error,
        warnings: validation.warnings,
      };
    }

    // STEP 2: Optimize with SVGO (if enabled)
    let optimizedSVG = svgInput;
    if (config.svgo.enabled) {
      optimizedSVG = await optimizeSVG(svgInput, config.svgo);
    }

    // STEP 3: Parse SVG
    const parseResult = parseSVG(optimizedSVG);
    if (!parseResult.valid || !parseResult.ast) {
      return {
        success: false,
        code: '',
        error: parseResult.error || 'Failed to parse SVG',
      };
    }

    const { ast, metadata, elements } = parseResult;

    // STEP 4: Transform elements (SVG -> React Native)
    let transformedTree = transformSVGTree(ast, config.outputFormat);

    // STEP 5: Transform attributes (kebab-case -> camelCase, etc.)
    transformedTree = transformElementAttributes(transformedTree, config);

    // STEP 6: Apply dimension configuration
    transformedTree = applyDimensionConfig(transformedTree, config);

    // STEP 7: Apply icon mode (React Native only)
    if (config.outputFormat === 'react-native' && config.icon.enabled) {
      transformedTree = applyIconMode(transformedTree, config);
    }

    // STEP 8: Apply custom attribute replacements
    if (config.attributes.replacements.length > 0) {
      transformedTree = applyAttributeReplacements(
        transformedTree,
        config.attributes.replacements
      );
    }

    // STEP 9: Optimize transformed tree (remove empty groups, etc.)
    transformedTree = optimizeTransformedTree(transformedTree);

    // STEP 10: Get required imports
    const usedElements = getRequiredImports(elements, config.outputFormat);

    // STEP 11: Generate code
    const { code, imports, typeDefinitions, usageExample } =
      generateCompleteCode(transformedTree, usedElements, config);

    // STEP 12: Format with Prettier
    let formattedCode = code;
    try {
      formattedCode = await formatCode(code, config.codeStyle);
    } catch (error) {
      console.warn('Prettier formatting failed, using unformatted code');
    }

    // STEP 13: Calculate stats
    const originalSize = new Blob([svgInput]).size;
    const optimizedSize = new Blob([optimizedSVG]).size;

    return {
      success: true,
      code: formattedCode,
      imports,
      typeDefinitions,
      usageExample,
      metadata,
      stats: {
        elementCount: elements.size,
        originalSize,
        optimizedSize,
      },
      warnings: validation.warnings,
    };
  } catch (error) {
    return {
      success: false,
      code: '',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Quick conversion (synchronous, no optimization)
 */
export function convertSVGToReactNativeSync(
  svgInput: string,
  config: ConverterConfig
): ConversionResult {
  try {
    // Simplified synchronous version (skip SVGO and Prettier)
    const validation = validateSVG(svgInput);
    if (!validation.valid) {
      return {
        success: false,
        code: '',
        error: validation.error,
        warnings: validation.warnings,
      };
    }

    const parseResult = parseSVG(svgInput);
    if (!parseResult.valid || !parseResult.ast) {
      return {
        success: false,
        code: '',
        error: parseResult.error || 'Failed to parse SVG',
      };
    }

    const { ast, metadata, elements } = parseResult;

    let transformedTree = transformSVGTree(ast, config.outputFormat);
    transformedTree = transformElementAttributes(transformedTree, config);
    transformedTree = applyDimensionConfig(transformedTree, config);

    if (config.outputFormat === 'react-native' && config.icon.enabled) {
      transformedTree = applyIconMode(transformedTree, config);
    }

    if (config.attributes.replacements.length > 0) {
      transformedTree = applyAttributeReplacements(
        transformedTree,
        config.attributes.replacements
      );
    }

    transformedTree = optimizeTransformedTree(transformedTree);

    const usedElements = getRequiredImports(elements, config.outputFormat);
    const { code, imports, typeDefinitions, usageExample } =
      generateCompleteCode(transformedTree, usedElements, config);

    return {
      success: true,
      code,
      imports,
      typeDefinitions,
      usageExample,
      metadata,
      stats: {
        elementCount: elements.size,
        originalSize: new Blob([svgInput]).size,
        optimizedSize: new Blob([svgInput]).size,
      },
      warnings: validation.warnings,
    };
  } catch (error) {
    return {
      success: false,
      code: '',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
