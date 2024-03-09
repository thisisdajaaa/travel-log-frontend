import type { ComponentPropsWithRef } from "react";

import { ButtonSize, ButtonVariant } from "../config";

export type ButtonProps = {
  isLoading?: boolean;
  variant?: keyof typeof ButtonVariant;
  size?: keyof typeof ButtonSize;
} & ComponentPropsWithRef<"button">;
