// src/components/ui/Button.tsx
import { ArrowRight } from "lucide-react";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  showArrow?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
  showArrow = true,
  className = "",
  variant = "primary",
  size = "md",
  ...props
}) => {
  // Variantes de cor e estilo
  const variants = {
    primary: "bg-yellow-400 hover:bg-yellow-500 text-gray-900 shadow-lg hover:shadow-xl",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white shadow-lg hover:shadow-xl",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl",
    outline: "bg-transparent border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50 shadow-sm hover:shadow-md",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700 shadow-none"
  };

  // Tamanhos
  const sizes = {
    sm: "py-2 px-4 text-sm rounded-lg",
    md: "py-3 px-6 text-base rounded-xl",
    lg: "py-4 px-8 text-lg rounded-xl"
  };

  // Classes base
  const baseClasses = "font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2 group";

  // Combinar classes
  const buttonClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={buttonClasses}
    >
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 border-2 border-current/30 border-t-current rounded-full animate-spin"></div>
          <span>Carregando...</span>
        </div>
      ) : (
        <>
          <span>{children}</span>
          {showArrow && (
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          )}
        </>
      )}
    </button>
  );
};