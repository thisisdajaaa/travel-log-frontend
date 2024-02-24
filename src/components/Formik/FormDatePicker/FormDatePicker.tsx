import { useField } from "formik";
import React, { FC, useCallback, useState } from "react";
import { DateValueType } from "react-tailwindcss-datepicker";

import { useFieldError, useUpdateEffect } from "@/hooks";

import DatePicker from "@/components/DatePicker";

import type { FormDatePickerProps } from "./types";
import ValidationMessage from "../ValidationMessage";

const FormDatePicker: FC<FormDatePickerProps> = (props) => {
  const { name, handleDateChange, ...rest } = props;

  const [, meta, helpers] = useField(name);

  const [currentValue, setCurrentValue] = useState<DateValueType>(
    meta.value || meta.initialValue
  );

  const hasError = useFieldError(name);

  useUpdateEffect(() => {
    setCurrentValue(meta.value);
  }, [meta.value]);

  const handleChange = useCallback(
    (value: DateValueType) => {
      setCurrentValue(value);
      helpers.setValue(value);
      helpers.setError("");
      helpers.setTouched(true);

      if (handleDateChange) handleDateChange(value);
    },
    [helpers, handleDateChange]
  );

  return (
    <div className="flex flex-col">
      <DatePicker
        {...rest}
        value={currentValue}
        hasError={hasError}
        onChange={handleChange}
      />

      <ValidationMessage name={name} />
    </div>
  );
};

export default FormDatePicker;
