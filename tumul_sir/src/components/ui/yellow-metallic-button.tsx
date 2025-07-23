"use client"

import * as React from "react"
import { Zap } from "lucide-react"

interface YellowMetallicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  size?: "sm" | "md" | "lg"
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  className?: string
}

export const YellowMetallicButton = ({
  children = "Get Started",
  size = "lg",
  loading = false,
  disabled = false,
  fullWidth = false,
  icon = undefined,
  iconPosition = "left",
  className = "",
  ...props
}: YellowMetallicButtonProps) => {
  
  // Size styles
  const sizeStyles = {
    sm: "text-sm px-4 py-2",
    md: "text-base px-6 py-3", 
    lg: "text-lg px-8 py-4"
  }
  
  const sizeStyle = sizeStyles[size]
  
  // Add global styles for the button
  React.useEffect(() => {
    const styleEl = document.createElement("style")
    styleEl.textContent = `
      .btn {
        margin: 0.5rem;
        padding: 0.5rem 0.75rem;
        border-radius: 9999px;
        border: none;
        font-weight: 600;
        cursor: pointer;
      }

      .btn kbd {
        margin: 0.25rem;
        padding: 0.125rem 0.5rem;
        border-radius: 0.25rem;
      }

      .btn-primary {
        background: linear-gradient(#fef3c7, #fde68a);
        color: #92400e;
        box-shadow: inset 0pt 4pt 3pt -2pt #fef9c3, 0pt 4pt 5pt -3pt #0009;
        border-bottom: 2pt solid #f59e0b;
        position: relative;
        overflow: visible;
      }

      .btn-primary::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(#fef3c7, #fde68a);
        border-radius: 9999px;
        border-bottom: 2pt solid #f59e0b;
        box-shadow: inset 0pt 4pt 3pt -2pt #fef9c3, 0pt 4pt 5pt -3pt #0009;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: -1;
      }

      .btn-primary:hover::before {
        opacity: 1;
        border-bottom: 4pt solid #f59e0b;
        box-shadow: inset 0pt 4pt 3pt -2pt #fef9c3, 0pt 6pt 8pt -3pt #0009;
        transform: translateY(-2px);
      }

      .btn-primary:active::before {
        opacity: 1;
        border-bottom: 1pt solid #f59e0b;
        box-shadow: inset 0pt 4pt 3pt -2pt #fef9c3, 0pt 2pt 3pt -3pt #0000;
        transform: translateY(0px);
      }

      .btn-primary kbd {
        background-color: #fde68a;
        box-shadow: inset 0pt -3pt 3pt -2pt #f59e0b, inset 0pt 3pt 3pt -2pt #fef3c7,
          0pt 2pt 2pt -2pt #0005, 0pt 0pt 0pt 2pt #d97706;
      }

      .btn-base {
        background: #fde68a;
      }
    `
    document.head.appendChild(styleEl)

    return () => {
      document.head.removeChild(styleEl)
    }
  }, [])
  
  return (
    <button
      className={`
        btn btn-primary ${sizeStyle} ${fullWidth ? 'w-full' : ''} ${className}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        inline-flex items-center justify-center
      `}
      disabled={disabled || loading}
      {...props}
    >
      {/* Leading icon */}
      {icon && iconPosition === 'left' && (
        <span className={`inline-flex ${children ? 'mr-3' : ''}`}>
          {icon}
        </span>
      )}
      
      {/* Loading spinner */}
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
          {children && <span>{children}</span>}
        </div>
      ) : (
        <span className="font-bold tracking-wide">{children}</span>
      )}
      
      {/* Trailing icon */}
      {icon && iconPosition === 'right' && (
        <span className={`inline-flex ${children ? 'ml-3' : ''}`}>
          {icon}
        </span>
      )}
    </button>
  )
} 