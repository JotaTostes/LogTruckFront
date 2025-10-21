import { Input as MTInput } from "@material-tailwind/react";
import { type ReactNode, useId } from "react";

type CustomInputProps = {
  icon?: ReactNode;
  label?: string;
  error?: string | boolean;
  success?: boolean;
  className?: string;
  [key: string]: any;
};

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
    ? "border-red-500 focus:ring-red-500"
    : success
    ? "border-green-500 focus:ring-green-500"
    : "border-gray-300 focus:ring-blue-500";

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
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 text-gray-500">
            {icon}
          </div>
        )}
        <MTInput
          onResize={undefined}
          onResizeCapture={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          crossOrigin={undefined}
          id={inputId}
          {...rest}
          className={`w-full rounded-lg ${
            icon ? "pl-10" : "pl-4"
          } pr-4 ${borderColor} focus:outline-none focus:ring-2 ${className}`}
          containerProps={{
            className: "min-w-0",
          }}
          labelProps={{
            className: "hidden",
          }}
        />
      </div>
      {error && typeof error === "string" && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};
