// src/components/ui/Input.tsx
import type { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/helpers';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs text-[#a3a3a3] mb-1.5">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-md text-sm text-[#f5f5f5] placeholder-[#737373]',
          'focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500',
          'transition-colors duration-200',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
