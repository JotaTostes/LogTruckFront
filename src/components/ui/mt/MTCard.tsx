// components/ui/mt/MTCard.tsx

import {
  Card as MTCard,
  CardHeader as MTCardHeader,
  CardBody as MTCardBody,
  CardFooter as MTCardFooter,
  type CardProps as MTCardProps,
} from "@material-tailwind/react";

export const Card = (props: any) => <MTCard {...props} />;
export const CardHeader = (props: any) => <MTCardHeader {...props} />;
export const CardBody = (props: any) => <MTCardBody {...props} />;
export const CardFooter = (props: any) => <MTCardFooter {...props} />;
