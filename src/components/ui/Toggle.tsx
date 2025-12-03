// src/components/ui/Toggle.tsx
import { motion } from 'framer-motion';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function Toggle({
  checked,
  onChange,
  label,
  disabled = false,
  className = '',
}: ToggleProps) {
  return (
    <label
      className={`inline-flex items-center gap-2 cursor-pointer ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      <div
        className={`relative w-9 h-5 rounded-full transition-colors ${
          checked ? 'bg-indigo-600' : 'bg-[#2a2a2a]'
        } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={() => !disabled && onChange(!checked)}
      >
        <motion.div
          className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full"
          animate={{
            x: checked ? 16 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
        />
      </div>
      {label && (
        <span className="text-xs text-[#a3a3a3] select-none">{label}</span>
      )}
    </label>
  );
}
