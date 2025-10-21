import { Typography, type TypographyProps } from "@material-tailwind/react";

export function MTTypography(props: TypographyProps) {
  return (
    <Typography
      placeholder=""
      onResize={() => {}}
      onResizeCapture={() => {}}
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
      {...props}
    />
  );
}
