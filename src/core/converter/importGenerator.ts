// src/core/converter/importGenerator.ts
import type { ConverterConfig } from '../../types/converter';

/**
 * Generate import statements based on format and used elements
 */
export function generateImports(
  usedElements: Set<string>,
  config: ConverterConfig
): string {
  const { outputFormat, component } = config;
  const imports: string[] = [];

  // React import
  if (component.typescript) {
    imports.push("import * as React from 'react';");
  } else {
    imports.push("import React from 'react';");
  }

  // SVG library imports
  if (outputFormat === 'react-native' || outputFormat === 'react-native-web') {
    const svgImports = generateReactNativeSVGImports(usedElements);
    imports.push(svgImports);
  }

  return imports.join('\n');
}

/**
 * Generate React Native SVG imports
 */
function generateReactNativeSVGImports(usedElements: Set<string>): string {
  // Always import Svg as default
  const elements: string[] = ['Svg'];

  // Add other elements (sorted for consistency)
  const sortedElements = Array.from(usedElements)
    .filter((el) => el !== 'Svg' && el !== 'svg')
    .sort();

  elements.push(...sortedElements);

  // Format as named imports
  const namedImports = elements.slice(1).join(', ');

  return `import Svg${namedImports ? `, { ${namedImports} }` : ''} from 'react-native-svg';`;
}

/**
 * Generate TypeScript type definitions for props
 */
export function generateTypeDefinitions(
  componentName: string,
  config: ConverterConfig
): string {
  if (!config.component.typescript) {
    return '';
  }

  const lines: string[] = [];

  // Start interface
  lines.push(`interface ${componentName}Props {`);

  // Add common SVG props
  if (config.dimensions.mode === 'remove' || config.icon.enabled) {
    lines.push('  width?: number | string;');
    lines.push('  height?: number | string;');
  }

  // Add color prop for icon mode
  if (config.icon.enabled && config.icon.replaceColor) {
    lines.push('  color?: string;');
  }

  // Add title and desc props if enabled
  if (config.props.titleProp) {
    lines.push('  title?: string;');
  }

  if (config.props.descProp) {
    lines.push('  desc?: string;');
  }

  // Add style prop for React Native
  if (config.props.native) {
    lines.push('  style?: object;');
  }

  // Add ref support if forwardRef is enabled
  if (config.component.forwardRef) {
    lines.push('  ref?: React.Ref<any>;');
  }

  // Close interface
  lines.push('}');

  return lines.join('\n');
}

/**
 * Generate usage example
 */
export function generateUsageExample(
  componentName: string,
  config: ConverterConfig
): string {
  const { exportType } = config.component;

  const lines: string[] = [];

  lines.push('// Usage example:');

  // Import statement
  if (exportType === 'default') {
    lines.push(`import ${componentName} from './${componentName}';`);
  } else if (exportType === 'named') {
    lines.push(`import { ${componentName} } from './${componentName}';`);
  } else {
    // Both
    lines.push(`import ${componentName} from './${componentName}';`);
    lines.push(`// or`);
    lines.push(`// import { ${componentName} } from './${componentName}';`);
  }

  lines.push('');
  lines.push('function App() {');

  // Example usage
  let example = `  return <${componentName}`;

  // Add example props
  const exampleProps: string[] = [];

  if (config.dimensions.mode === 'remove' || config.icon.enabled) {
    exampleProps.push('width={48}');
    exampleProps.push('height={48}');
  }

  if (config.icon.enabled && config.icon.replaceColor) {
    exampleProps.push('color="#6366f1"');
  }

  if (exampleProps.length > 0) {
    example += ' ' + exampleProps.join(' ');
  }

  example += ' />;';
  lines.push(example);

  lines.push('}');

  return lines.join('\n');
}

/**
 * Generate PropTypes (for non-TypeScript projects)
 */
export function generatePropTypes(
  componentName: string,
  config: ConverterConfig
): string {
  if (config.component.typescript || config.outputFormat === 'react-native') {
    return ''; // PropTypes not commonly used in RN or with TS
  }

  const lines: string[] = [];

  lines.push(`${componentName}.propTypes = {`);

  if (config.dimensions.mode === 'remove' || config.icon.enabled) {
    lines.push('  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),');
    lines.push('  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),');
  }

  if (config.icon.enabled && config.icon.replaceColor) {
    lines.push('  color: PropTypes.string,');
  }

  if (config.props.titleProp) {
    lines.push('  title: PropTypes.string,');
  }

  if (config.props.descProp) {
    lines.push('  desc: PropTypes.string,');
  }

  lines.push('};');

  return lines.join('\n');
}

/**
 * Generate default props
 */
export function generateDefaultProps(config: ConverterConfig): string {
  const defaults: string[] = [];

  if (config.icon.enabled) {
    defaults.push(`width = ${config.icon.defaultSize}`);
    defaults.push(`height = ${config.icon.defaultSize}`);

    if (config.icon.replaceColor) {
      defaults.push(`color = '#000'`);
    }
  }

  return defaults.join(', ');
}
