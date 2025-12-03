// src/components/ui/Checkbox.tsx
import type { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/helpers';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export function Checkbox({ label, description, className, ...props }: CheckboxProps) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <input
        type="checkbox"
        className={cn(
          'mt-0.5 w-4 h-4 rounded border-[#3a3a3a] bg-[#141414] text-indigo-500',
          'focus:ring-indigo-500 focus:ring-offset-0 focus:ring-offset-[#0a0a0a]',
          'transition-colors duration-200',
          className
        )}
        {...props}
      />
      {(label || description) && (
        <div className="flex-1">
          {label && (
            <div className="text-sm text-[#f5f5f5] group-hover:text-white transition-colors">
              {label}
            </div>
          )}
          {description && (
            <div className="text-xs text-[#737373] mt-0.5">
              {description}
            </div>
          )}
        </div>
      )}
    </label>
  );
}
