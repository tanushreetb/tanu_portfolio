/**
 * AccessibleButton Component
 * 
 * Fully accessible button component with proper ARIA attributes,
 * keyboard support, and focus indicators.
 * 
 * Requirements: 10.1, 10.2, 10.3
 * 
 * @component
 */

'use client';

import React, { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface AccessibleButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  /**
   * Button variant style
   */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  
  /**
   * Button size
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Whether button is in loading state
   */
  isLoading?: boolean;
  
  /**
   * Icon to display before label
   */
  icon?: React.ReactNode;
  
  /**
   * Icon to display after label
   */
  iconAfter?: React.ReactNode;
  
  /**
   * Full width button
   */
  fullWidth?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children (button label)
   */
  children: React.ReactNode;
}

/**
 * Accessible button component with animations and proper ARIA support
 */
export const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      icon,
      iconAfter,
      fullWidth = false,
      className = '',
      children,
      disabled,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const shouldReduceMotion = useReducedMotion();

    // Variant styles
    const variantStyles = {
      primary: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-md hover:shadow-lg disabled:bg-blue-300',
      secondary: 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:active:bg-gray-500 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800',
      ghost: 'bg-transparent hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:text-gray-400',
      danger: 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-md hover:shadow-lg disabled:bg-red-300'
    };

    // Size styles
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    };

    // Animation variants
    const buttonVariants = {
      rest: { scale: 1 },
      hover: { scale: shouldReduceMotion ? 1 : 1.02 },
      tap: { scale: shouldReduceMotion ? 1 : 0.98 }
    };

    return (
      <motion.button
        ref={ref}
        className={`
          inline-flex items-center justify-center gap-2
          font-semibold rounded-lg
          transition-all duration-200
          focus:outline-none focus:ring-3 focus:ring-blue-500 focus:ring-offset-2
          disabled:cursor-not-allowed disabled:opacity-60
          touch-target
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        variants={buttonVariants}
        initial="rest"
        whileHover={!disabled && !isLoading ? 'hover' : 'rest'}
        whileTap={!disabled && !isLoading ? 'tap' : 'rest'}
        disabled={disabled || isLoading}
        aria-label={ariaLabel}
        aria-busy={isLoading}
        aria-disabled={disabled || isLoading}
        {...props}
      >
        {/* Loading spinner */}
        {isLoading && (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        
        {/* Icon before */}
        {!isLoading && icon && (
          <span className="shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}
        
        {/* Button label */}
        <span>{children}</span>
        
        {/* Icon after */}
        {!isLoading && iconAfter && (
          <span className="shrink-0" aria-hidden="true">
            {iconAfter}
          </span>
        )}
      </motion.button>
    );
  }
);

AccessibleButton.displayName = 'AccessibleButton';
