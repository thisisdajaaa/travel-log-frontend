import { FileUploadOptions } from "../config";

export type FileUploadProps = {
  value: File | string;
  onChange: (value: File) => void;
  variant?: FileUploadOptions;
};
