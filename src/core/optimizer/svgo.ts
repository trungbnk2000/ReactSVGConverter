// src/core/optimizer/svgo.ts
import { optimize } from 'svgo';
import type { SVGOConfig } from '../../types/converter';

/**
 * Optimize SVG with SVGO
 */
export async function optimizeSVG(
  svgString: string,
  config: SVGOConfig
): Promise<string> {
  if (!config.enabled) {
    return svgString;
  }

  try {
    const result = optimize(svgString, {
      plugins: config.plugins,
      multipass: true,
    });

    return result.data;
  } catch (error) {
    console.error('SVGO optimization error:', error);
    // Return original SVG if optimization fails
    return svgString;
  }
}

/**
 * Get optimization stats
 */
export function getOptimizationStats(
  original: string,
  optimized: string
): {
  originalSize: number;
  optimizedSize: number;
  savedBytes: number;
  savedPercent: number;
} {
  const originalSize = new Blob([original]).size;
  const optimizedSize = new Blob([optimized]).size;
  const savedBytes = originalSize - optimizedSize;
  const savedPercent = ((savedBytes / originalSize) * 100).toFixed(2);

  return {
    originalSize,
    optimizedSize,
    savedBytes,
    savedPercent: parseFloat(savedPercent),
  };
}
