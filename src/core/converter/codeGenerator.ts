// src/core/converter/codeGenerator.ts
import type { ConverterConfig } from '../../types/converter';
import type { TransformedElement } from './elementMapping';
import {
  generateImports,
  generateTypeDefinitions,
  generateUsageExample,
  generateDefaultProps,
} from './importGenerator';

/**
 * Generate complete component code
 */
export function generateComponent(
  element: TransformedElement,
  usedElements: Set<string>,
  config: ConverterConfig
): string {
  const { component } = config;
  const { name: componentName, typescript, memo, forwardRef, exportType } = component;

  const lines: string[] = [];

  // Generate imports
  const imports = generateImports(usedElements, config);
  lines.push(imports);
  lines.push('');

  // Generate type definitions
  if (typescript) {
    const types = generateTypeDefinitions(componentName, config);
    if (types) {
      lines.push(types);
      lines.push('');
    }
  }

  // Generate component
  const componentCode = generateComponentFunction(
    componentName,
    element,
    config
  );

  // Wrap with memo if needed
  if (memo) {
    lines.push(`const ${componentName} = React.memo(${componentCode});`);
  } else {
    lines.push(`const ${componentName} = ${componentCode};`);
  }

  lines.push('');

  // Export statement
  if (exportType === 'default') {
    lines.push(`export default ${componentName};`);
  } else if (exportType === 'named') {
    lines.push(`export { ${componentName} };`);
  } else {
    // Both
    lines.push(`export { ${componentName} };`);
    lines.push(`export default ${componentName};`);
  }

  return lines.join('\n');
}

/**
 * Generate component function
 */
function generateComponentFunction(
  componentName: string,
  element: TransformedElement,
  config: ConverterConfig
): string {
  const { component, props } = config;
  const { typescript, forwardRef } = component;

  const lines: string[] = [];

  // Function signature
  const propsParam = generatePropsParameter(componentName, config);
  const defaultPropsStr = generateDefaultProps(config);

  if (forwardRef) {
    lines.push(`React.forwardRef((${propsParam}, ref) => {`);
  } else {
    lines.push(`(${propsParam}) => {`);
  }

  // Function body - return JSX
  lines.push('  return (');
  lines.push(generateJSX(element, config, 2)); // Indent level 2
  lines.push('  );');

  // Close function
  if (forwardRef) {
    lines.push('})');
  } else {
    lines.push('}');
  }

  return lines.join('\n');
}

/**
 * Generate props parameter
 */
function generatePropsParameter(
  componentName: string,
  config: ConverterConfig
): string {
  const { typescript, component } = config;
  const defaultPropsStr = generateDefaultProps(config);

  let param = '';

  if (defaultPropsStr) {
    param = `{ ${defaultPropsStr}, ...props }`;
  } else {
    param = 'props';
  }

  if (typescript) {
    param += `: ${componentName}Props`;
  }

  return param;
}

/**
 * Generate JSX from transformed element tree
 */
function generateJSX(
  element: TransformedElement,
  config: ConverterConfig,
  indentLevel = 0
): string {
  const indent = '  '.repeat(indentLevel);
  const lines: string[] = [];

  // Opening tag
  let openTag = `${indent}<${element.name}`;

  // Add attributes
  const attrs = generateAttributes(element.attributes, config);
  if (attrs.length > 0) {
    // If root element and props expansion is configured
    if (element.name === 'Svg' && config.props.expandProps !== 'none') {
      if (config.props.expandProps === 'start') {
        openTag += ' {...props}';
      }

      // Add individual attributes
      attrs.forEach((attr) => {
        openTag += `\n${indent}  ${attr}`;
      });

      if (config.props.expandProps === 'end') {
        openTag += `\n${indent}  {...props}`;
      }
    } else {
      // Add attributes inline or multiline based on count
      if (attrs.length <= 2) {
        openTag += ' ' + attrs.join(' ');
      } else {
        attrs.forEach((attr) => {
          openTag += `\n${indent}  ${attr}`;
        });
      }
    }
  } else if (element.name === 'Svg' && config.props.expandProps !== 'none') {
    // Just spread props
    openTag += ' {...props}';
  }

  // Check if self-closing
  if (element.children.length === 0 && !element.text) {
    openTag += ' />';
    lines.push(openTag);
  } else {
    openTag += '>';
    lines.push(openTag);

    // Add text content if exists
    if (element.text) {
      lines.push(`${indent}  {${JSON.stringify(element.text)}}`);
    }

    // Add children
    element.children.forEach((child) => {
      lines.push(generateJSX(child, config, indentLevel + 1));
    });

    // Closing tag
    lines.push(`${indent}</${element.name}>`);
  }

  return lines.join('\n');
}

/**
 * Generate attribute strings
 */
function generateAttributes(
  attributes: Record<string, string>,
  config: ConverterConfig
): string[] {
  const attrs: string[] = [];

  Object.entries(attributes).forEach(([name, value]) => {
    // Skip empty values
    if (value === '') return;

    // Check if value needs to be wrapped in braces (expressions)
    if (value.startsWith('{') && value.endsWith('}')) {
      // Already an expression
      attrs.push(`${name}=${value}`);
    } else if (isNumericValue(value)) {
      // Numeric values
      attrs.push(`${name}={${value}}`);
    } else if (value.includes('{') || value.includes('props.')) {
      // Contains expressions
      attrs.push(`${name}={${value}}`);
    } else {
      // String values
      attrs.push(`${name}="${value}"`);
    }
  });

  return attrs;
}

/**
 * Check if value is numeric
 */
function isNumericValue(value: string): boolean {
  return !isNaN(Number(value)) && value.trim() !== '';
}

/**
 * Generate complete code with all parts
 */
export function generateCompleteCode(
  element: TransformedElement,
  usedElements: Set<string>,
  config: ConverterConfig
): {
  code: string;
  imports: string;
  typeDefinitions: string;
  usageExample: string;
} {
  const code = generateComponent(element, usedElements, config);
  const imports = generateImports(usedElements, config);
  const typeDefinitions = config.component.typescript
    ? generateTypeDefinitions(config.component.name, config)
    : '';
  const usageExample = generateUsageExample(config.component.name, config);

  return {
    code,
    imports,
    typeDefinitions,
    usageExample,
  };
}
