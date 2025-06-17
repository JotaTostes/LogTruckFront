// components/CustomSelect.tsx
import { Select as MTSelect, Option } from "@material-tailwind/react";

interface CustomSelectProps {
  label?: string;
  value?: string;
  onChange?: (value: string | undefined) => void;
  children: React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

export const CustomSelect = ({ children, ...props }: CustomSelectProps) => {
  const defaultProps = {
    placeholder: "",
    onResize: () => {},
    onResizeCapture: () => {},
    onPointerEnterCapture: () => {},
    onPointerLeaveCapture: () => {},
  };

  return (
    <MTSelect {...defaultProps} {...(props as any)}>
      {children}
    </MTSelect>
  );
};

export { Option };
