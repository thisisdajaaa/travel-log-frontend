import React, { FC, FocusEvent, useRef } from "react";

import clsxm from "@/utils/clsxm";

import type { SelectProps } from "./types";

const Select: FC<SelectProps> = ({
  options,
  hasError = false,
  isReadOnly,
  onFocus,
  label,
  className,
  isRequired,
  ...rest
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleFocus = (event: FocusEvent<HTMLSelectElement, Element>) => {
    if (isReadOnly) selectRef.current?.blur();

    if (onFocus) onFocus(event);
  };

  return (
    <>
      <label className="form-control w-full">
        {label && (
          <div className="label">
            <span className="label-text font-bold">
              {label} {isRequired && <span className="text-accent">*</span>}
            </span>
          </div>
        )}

        <select
          ref={selectRef}
          className={clsxm(
            className,
            "select select-bordered w-full bg-white text-blackOut",
            hasError && "select-accent"
          )}
          onFocus={handleFocus}
          {...rest}
        >
          <option disabled selected>
            Pick one
          </option>

          {options.map((option, index) => (
            <option key={index}>{option.label}</option>
          ))}
        </select>
      </label>
    </>
  );
};

export default Select;
