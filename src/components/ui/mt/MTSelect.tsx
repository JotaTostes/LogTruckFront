import { Select, type SelectProps } from "@material-tailwind/react";

export function MTSelect(props: SelectProps) {
  return (
    <Select
      placeholder=""
      onResize={() => {}}
      onResizeCapture={() => {}}
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
      {...props}
    />
  );
}
