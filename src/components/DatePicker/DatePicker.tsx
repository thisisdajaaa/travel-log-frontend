import clsx from "clsx";
import React, { FC } from "react";
import BaseDatePicker from "react-tailwindcss-datepicker";

import type { DatePickerProps } from "./types";

const DatePicker: FC<DatePickerProps> = ({
  hasError,
  className,
  value,
  label,
  isRequired,
  ...rest
}) => {
  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text font-bold">
            {label} {isRequired && <span className="text-accent">*</span>}
          </span>
        </label>
      )}

      <BaseDatePicker
        value={value}
        inputClassName={clsx(
          className,
          "input input-bordered w-full bg-white text-blackOut",
          hasError && "input-error"
        )}
        {...rest}
      />
    </div>
  );
};

export default DatePicker;
