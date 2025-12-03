// src/utils/helpers.ts
import { FILE_EXTENSIONS } from './constants';
import type { ConverterConfig } from '../types/converter';

/**
 * Download text content as a file
 */
export function downloadFile(
  content: string,
  filename: string,
  mimeType = 'text/plain'
): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Get appropriate file extension based on config
 */
export function getFileExtension(config: ConverterConfig): string {
  return config.component.typescript
    ? FILE_EXTENSIONS.TYPESCRIPT
    : FILE_EXTENSIONS.JAVASCRIPT;
}

/**
 * Generate filename for download
 */
export function generateFilename(
  componentName: string,
  config: ConverterConfig
): string {
  const ext = getFileExtension(config);
  return `${componentName}${ext}`;
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Truncate string
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

/**
 * Class names helper (simple version of clsx)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
