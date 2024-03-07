import { useField } from "formik";
import React, { FC, useCallback, useState } from "react";

import { useUpdateEffect } from "@/hooks";

import FileUpload from "@/components/FileUpload";

import type { FormFileUploadProps } from "./types";
import ValidationMessage from "../ValidationMessage";

const FormFileUpload: FC<FormFileUploadProps> = (props) => {
  const { name, handleFileUpload, ...rest } = props;

  const [, meta, helpers] = useField(name);

  const [currentValue, setCurrentValue] = useState<File | null>(
    meta.value || meta.initialValue
  );

  useUpdateEffect(() => {
    setCurrentValue(meta.value);
  }, [meta.value]);

  const handleChange = useCallback(
    (fileName: File) => {
      setCurrentValue(fileName);
      helpers.setValue(fileName);
      helpers.setTouched(true);
      helpers.setError("");

      if (handleFileUpload) {
        handleFileUpload(fileName);
      }
    },
    [helpers, handleFileUpload]
  );

  return (
    <div className="flex flex-col">
      <FileUpload
        {...rest}
        value={currentValue as File}
        onChange={handleChange}
      />

      <ValidationMessage name={name} />
    </div>
  );
};

export default FormFileUpload;
