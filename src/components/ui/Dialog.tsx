// components/ui/Dialog.tsx

import {
  Dialog as MTDialog,
  DialogHeader as MTDialogHeader,
  DialogBody as MTDialogBody,
  DialogFooter as MTDialogFooter,
  type DialogProps as MTDialogProps,
} from "@material-tailwind/react";

export const Dialog = (props: any) => <MTDialog {...props} />;
export const DialogHeader = (props: any) => <MTDialogHeader {...props} />;
export const DialogBody = (props: any) => <MTDialogBody {...props} />;
export const DialogFooter = (props: any) => <MTDialogFooter {...props} />;
