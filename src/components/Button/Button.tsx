import type { ClassValue } from "clsx";
import React, { forwardRef } from "react";
import { ImSpinner2 } from "react-icons/im";

import clsxm from "@/utils/clsxm";

import type { ButtonProps } from "./types";

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    children,
    className,
    disabled: buttonDisabled,
    isLoading,
    variant = "primary",
    ...rest
  } = props;

  const disabled = isLoading || buttonDisabled;

  const variants: ClassValue[] = [
    variant === "primary" && ["btn-primary"],
    variant === "secondary" && ["btn-secondary"],
    variant === "danger" && ["btn-accent"],
    variant === "info" && ["btn-info"],
    variant === "ghost" && ["btn-ghost"],
    variant === "default" && [],
  ];

  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      className={clsxm(
        "btn",
        variants,
        disabled && "btn-disabled disabled:cursor-not-allowed",
        isLoading &&
          "relative text-transparent transition-none hover:text-transparent disabled:cursor-wait",
        className
      )}
      {...rest}
    >
      {isLoading && (
        <div
          data-testid="loading-icon"
          className={clsxm(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
          )}
        >
          <ImSpinner2 className="animate-spin" />
        </div>
      )}
      {children}
    </button>
  );
});

export default Button;
