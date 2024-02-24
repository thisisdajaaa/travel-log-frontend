import React, { FC, useRef } from "react";
import InputMask from "react-input-mask";

import clsxm from "@/utils/clsxm";

import type { InputProps } from "./types";
import Icon from "../Icon";
import Typography from "../Typography";

const Input: FC<InputProps> = ({
  leftIcon,
  rightIcon,
  disabled = false,
  hasError = false,
  darkenIcon = true,
  msgError,
  bgColor = "bg-white",
  className,
  type,
  value,
  readOnly,
  onFocus,
  mask,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    if (readOnly) inputRef.current?.blur();

    if (onFocus) onFocus(event);
  };

  const handleWheel = (event: React.WheelEvent<HTMLInputElement>) => {
    if (type === "number") {
      event.currentTarget.blur();
    }
  };

  return (
    <>
      <input
        type={type}
        value={value}
        disabled={disabled}
        onFocus={handleFocus}
        readOnly={readOnly}
        onWheel={handleWheel}
        className={clsxm(
          className,
          "input input-bordered w-full bg-white text-blackOut",
          hasError && "border-poppySurprise"
        )}
        {...rest}
      />

      {hasError && (
        <Typography
          variant="p"
          fontFamily="font-secondary"
          size="text-sm"
          lineHeight="leading-[1.063rem]"
          textAlign="text-left"
          color="text-poppySurprise"
          className="mt-[0.5rem] font-light"
        >
          {msgError}
        </Typography>
      )}
    </>
  );
};

export default Input;
