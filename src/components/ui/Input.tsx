import { Input as MTInput } from "@material-tailwind/react";
import { type ReactNode, useId } from "react";

interface CustomInputProps {
  label?: string;
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  error?: boolean | string;
  success?: boolean;
  size?: "md" | "lg";
  color?: "blue" | "red" | "green" | "gray";
  className?: string;
  maxLength?: number;
  step?: number | string;
  min?: number | string;
  max?: number | string;
  icon?: ReactNode;
}

export const Input = ({
  icon,
  label,
  error,
  success,
  className = "",
  ...rest
}: CustomInputProps) => {
  const inputId = useId();

  const borderColor = error
    ? "border-red-500"
    : success
    ? "border-green-500"
    : "border-gray-300";

  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && <span className="absolute left-3 text-gray-400">{icon}</span>}
        <MTInput
          onResize={undefined}
          onResizeCapture={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          crossOrigin={undefined}
          id={inputId}
          {...rest}
          className={`w-full rounded-lg border ${borderColor} bg-white py-2 px-${
            icon ? "10" : "4"
          } text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200 disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`}
        />
      </div>
      {error && typeof error === "string" && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};
