// src/components/ui/Button.tsx
import { ArrowRight } from "lucide-react";
import React from "react";
import { systemTheme } from "../../config/systemTheme";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  showArrow?: boolean;
  icon?: React.ReactNode; // Adicionada propriedade para ícones
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "outline"
    | "ghost"
    | "success";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
  showArrow = true,
  icon,
  className = "",
  variant = "primary",
  size = "md",
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={`
        ${systemTheme.components.button[variant]}
        px-6 py-3 rounded-xl font-medium
        shadow-lg shadow-blue-500/30 
        hover:shadow-blue-500/40 
        transition-all duration-300
        flex items-center space-x-2
      `}
    >
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 border-2 border-current/30 border-t-current rounded-full animate-spin"></div>
          <span>Carregando...</span>
        </div>
      ) : (
        <>
          {icon && <span className="flex items-center">{icon}</span>}
          <span>{children}</span>
          {showArrow && (
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          )}
        </>
      )}
    </button>
  );
};
