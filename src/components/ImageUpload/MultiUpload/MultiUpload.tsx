import React, { FC } from "react";
import { useDropzone } from "react-dropzone";
import { FaImage } from "react-icons/fa6";

import type { FileWithPreview, ImageUploadProps } from "../types";

const MultiUpload: FC<ImageUploadProps> = (props) => {
  const { onChange } = props;

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": ["jpeg"],
      "image/jpg": [".jpg"],
    },
    onDrop: (acceptedFiles) => {
      const mappedFiles: FileWithPreview[] = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      onChange(mappedFiles);
    },
  });

  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      <div className="flex h-60 flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-white pt-5 pb-6">
        <FaImage />
        <p className="mb-2 text-sm text-gray-500">
          <button
            type="button"
            className="font-medium text-indigo-600 hover:text-indigo-500 focus:underline focus:outline-none"
          >
            Upload a file
          </button>
          &nbsp;or drag and drop
        </p>
        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
      </div>
    </div>
  );
};

export default MultiUpload;
