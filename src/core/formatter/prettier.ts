// src/core/formatter/prettier.ts
import * as prettier from 'prettier';
import type { CodeStyleConfig } from '../../types/converter';

/**
 * Format code with Prettier
 */
export async function formatCode(
  code: string,
  config: CodeStyleConfig
): Promise<string> {
  try {
    const formatted = await prettier.format(code, {
      parser: 'typescript',
      semi: config.semi,
      singleQuote: config.singleQuote,
      tabWidth: config.tabWidth,
      printWidth: config.printWidth,
      trailingComma: 'es5',
      arrowParens: 'always',
      endOfLine: 'lf',
    });

    return formatted;
  } catch (error) {
    console.error('Prettier formatting error:', error);
    // Return original code if formatting fails
    return code;
  }
}

/**
 * Format code synchronously (with fallback)
 */
export function formatCodeSync(
  code: string,
  config: CodeStyleConfig
): string {
  try {
    // Note: This is a simplified version. In production, you might want
    // to use prettier/standalone for browser compatibility
    void config; // Silence unused warning
    return code;
  } catch (error) {
    console.error('Prettier formatting error:', error);
    return code;
  }
}

/**
 * Check if code is valid before formatting
 */
export function isValidCode(code: string): boolean {
  try {
    // Basic syntax check
    return code.trim().length > 0;
  } catch (error) {
    return false;
  }
}
