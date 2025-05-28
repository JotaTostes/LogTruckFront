// src/components/mt/MTCard.tsx
import { Card, type CardProps } from "@material-tailwind/react";

export function MTCard(props: CardProps) {
  return (
    <Card
      placeholder=""
      onResize={() => {}}
      onResizeCapture={() => {}}
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
      {...props}
    />
  );
}
