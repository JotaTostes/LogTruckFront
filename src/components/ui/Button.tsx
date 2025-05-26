// src/components/ui/Button.tsx
import { ArrowRight } from "lucide-react";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  showArrow?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
  showArrow = true,
  className = "",
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group ${className}`}
    >
      {isLoading ? (
        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      ) : (
        <>
          <span>{children}</span>
          {showArrow && (
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          )}
        </>
      )}
    </button>
  );
};
