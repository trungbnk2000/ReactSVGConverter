// src/App.tsx
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import CodeMirror from '@uiw/react-codemirror';
import { xml } from '@codemirror/lang-xml';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView } from '@codemirror/view';
import { Copy, Download, AlertCircle } from 'lucide-react';
import { useConverterStore } from './store/converterStore';
import { useClipboard } from './hooks/useClipboard';
import { useDebounce } from './hooks/useDebounce';
import { Button } from './components/ui/Button';
import { Toggle } from './components/ui/Toggle';
import { downloadFile, generateFilename } from './utils/helpers';
import { DEFAULT_SVG_EXAMPLE } from './utils/constants';

function App() {
  const {
    svgInput,
    setSvgInput,
    generatedCode,
    error,
    isConverting,
    convert,
    config,
    updateConfig,
  } = useConverterStore();

  const { copyToClipboard } = useClipboard();

  // Debounce SVG input to avoid excessive conversions
  const debouncedSvgInput = useDebounce(svgInput, 500);

  // Auto-convert when input changes
  useEffect(() => {
    if (debouncedSvgInput.trim()) {
      convert();
    }
  }, [debouncedSvgInput, convert]);

  // Load default example on mount if empty
  useEffect(() => {
    if (!svgInput) {
      setSvgInput(DEFAULT_SVG_EXAMPLE);
    }
  }, []);

  const handleCopy = () => {
    if (generatedCode) {
      copyToClipboard(generatedCode, 'Code copied to clipboard!');
    }
  };

  const handleDownload = () => {
    if (generatedCode) {
      const filename = generateFilename(config.component.name, config);
      downloadFile(generatedCode, filename, 'text/plain');
    }
  };

  // Handle toggle for hiding props
  const handleToggleProps = (hide: boolean) => {
    updateConfig('props', {
      ...config.props,
      expandProps: hide ? 'none' : 'end',
    });
  };

  // Handle toggle for hiding dimensions
  const handleToggleDimensions = (hide: boolean) => {
    updateConfig('dimensions', {
      ...config.dimensions,
      mode: hide ? 'remove' : 'keep',
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      <Toaster position="top-right" />

      {/* Header - Responsive */}
      <header className="h-16 bg-[#0a0a0a] border-b border-[#2a2a2a] px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg sm:text-xl">S</span>
          </div>
          <div>
            <h1 className="text-sm sm:text-lg font-bold text-[#f5f5f5]">SVG Converter</h1>
            <p className="text-xs text-[#737373] hidden sm:block">React Native First</p>
          </div>
        </div>

        {/* Settings Toggles - Hidden on very small screens */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          <Toggle
            checked={config.props.expandProps === 'none'}
            onChange={handleToggleProps}
            label="Hide Props"
          />
          <Toggle
            checked={config.dimensions.mode === 'remove'}
            onChange={handleToggleDimensions}
            label="Hide Dimensions"
          />
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            onClick={handleCopy}
            disabled={!generatedCode || isConverting}
            icon={<Copy className="w-4 h-4" />}
            className="text-xs sm:text-sm px-2 sm:px-4"
          >
            <span className="hidden sm:inline">Copy Code</span>
            <span className="sm:hidden">Copy</span>
          </Button>
          <Button
            onClick={handleDownload}
            variant="primary"
            disabled={!generatedCode || isConverting}
            icon={<Download className="w-4 h-4" />}
            className="text-xs sm:text-sm px-2 sm:px-4"
          >
            <span className="hidden sm:inline">Download</span>
            <span className="sm:hidden">Save</span>
          </Button>
        </div>
      </header>

      {/* Main Content - Responsive Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Input Panel */}
        <div className="flex-1 flex flex-col border-b md:border-b-0 md:border-r border-[#2a2a2a] h-1/2 md:h-auto">
          <div className="h-10 sm:h-12 bg-[#0a0a0a] border-b border-[#2a2a2a] px-3 sm:px-4 flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-[#a3a3a3]">Input SVG</span>
            <span className="text-xs text-[#737373]">
              {svgInput.length} chars
            </span>
          </div>
          <div className="flex-1 overflow-auto">
            <CodeMirror
              value={svgInput}
              height="100%"
              theme={oneDark}
              extensions={[xml(), EditorView.lineWrapping]}
              onChange={(value) => setSvgInput(value)}
              basicSetup={{
                lineNumbers: true,
                highlightActiveLineGutter: true,
                highlightActiveLine: true,
                foldGutter: true,
              }}
              style={{
                height: '100%',
                fontSize: '13px',
              }}
            />
          </div>
        </div>

        {/* Output Panel */}
        <div className="flex-1 flex flex-col h-1/2 md:h-auto">
          <div className="h-10 sm:h-12 bg-[#0a0a0a] border-b border-[#2a2a2a] px-3 sm:px-4 flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-[#a3a3a3]">
              Output (React Native)
            </span>
            {isConverting && (
              <span className="text-xs text-indigo-400 animate-pulse">
                Converting...
              </span>
            )}
          </div>

          <div className="flex-1 overflow-auto">
            {error ? (
              <div className="p-4 sm:p-8">
                <div className="max-w-md mx-auto bg-[#1e1e1e] border border-red-500/30 rounded-lg p-4 sm:p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold text-red-500 mb-1">
                        Conversion Error
                      </h3>
                      <p className="text-xs sm:text-sm text-[#a3a3a3] break-words">{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : generatedCode ? (
              <CodeMirror
                value={generatedCode}
                height="100%"
                theme={oneDark}
                extensions={[javascript({ jsx: true, typescript: config.component.typescript }), EditorView.lineWrapping]}
                readOnly
                basicSetup={{
                  lineNumbers: true,
                  highlightActiveLineGutter: true,
                  highlightActiveLine: true,
                  foldGutter: true,
                }}
                style={{
                  height: '100%',
                  fontSize: '13px',
                }}
              />
            ) : (
              <div className="h-full flex items-center justify-center p-4">
                <p className="text-[#737373] text-xs sm:text-sm text-center">
                  Paste SVG code in the left panel to see the output
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer - Responsive */}
      <footer className="h-7 sm:h-8 bg-[#0a0a0a] border-t border-[#2a2a2a] px-3 sm:px-6 flex items-center justify-between text-xs text-[#737373]">
        <span className="truncate">SVG to React Native</span>
        <span className="truncate ml-2">
          {generatedCode && `${config.component.name}${config.component.typescript ? '.tsx' : '.jsx'}`}
        </span>
      </footer>
    </div>
  );
}

export default App;
