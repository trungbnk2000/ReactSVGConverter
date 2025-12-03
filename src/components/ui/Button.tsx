// src/components/ui/Button.tsx
import { motion } from 'framer-motion';
import type { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/helpers';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
}

export function Button({
  children,
  variant = 'secondary',
  size = 'md',
  icon,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/30',
    secondary: 'bg-[#1e1e1e] text-[#f5f5f5] hover:bg-[#2a2a2a] border border-[#2a2a2a]',
    ghost: 'text-[#a3a3a3] hover:text-[#f5f5f5] hover:bg-[#1e1e1e]',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled}
      type={props.type}
      onClick={props.onClick}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  );
}
