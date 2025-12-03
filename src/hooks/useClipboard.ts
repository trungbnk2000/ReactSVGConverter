// src/hooks/useClipboard.ts
import { useState, useCallback } from 'react';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';

/**
 * Hook for clipboard operations
 */
export function useClipboard() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback((text: string, successMessage = 'Copied to clipboard!') => {
    try {
      const success = copy(text);

      if (success) {
        setCopied(true);
        toast.success(successMessage);

        // Reset copied state after 2 seconds
        setTimeout(() => {
          setCopied(false);
        }, 2000);

        return true;
      } else {
        toast.error('Failed to copy to clipboard');
        return false;
      }
    } catch (error) {
      console.error('Clipboard error:', error);
      toast.error('Failed to copy to clipboard');
      return false;
    }
  }, []);

  return {
    copied,
    copyToClipboard,
  };
}
