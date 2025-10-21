import { Switch, type SwitchProps } from "@material-tailwind/react";

export function MTSwitch(props: SwitchProps) {
  return (
    <Switch
      placeholder=""
      crossOrigin=""
      onResize={() => {}}
      onResizeCapture={() => {}}
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
      {...props}
    />
  );
}
