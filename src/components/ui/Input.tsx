// components/Input.tsx
import { Input as MTInput } from "@material-tailwind/react";

interface CustomInputProps {
  label?: string;
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
  size?: "md" | "lg";
  color?: "blue" | "red" | "green" | "gray";
  className?: string;
  maxLength?: number;
  step?: number | string;
  min?: number | string;
  max?: number | string;
}

export const Input = (props: CustomInputProps) => {
  return (
    <MTInput
      {...(props as any)}
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
      crossOrigin=""
    />
  );
};
