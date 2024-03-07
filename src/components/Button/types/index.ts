import type { ComponentPropsWithRef } from "react";

export enum ButtonVariant {
  "primary",
  "secondary",
  "danger",
  "info",
}

export enum ButtonSize {
  "xs",
  "sm",
  "md",
  "lg",
}

export type ButtonProps = {
  isLoading?: boolean;
  variant?: keyof typeof ButtonVariant;
  size?: keyof typeof ButtonSize;
} & ComponentPropsWithRef<"button">;
