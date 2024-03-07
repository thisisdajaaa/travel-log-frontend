import type { FileUploadProps } from "@/components/FileUpload/types";

export type FormFileUploadProps = {
  name: string;
  handleFileUpload?: (value: File) => void;
} & Omit<FileUploadProps, "value" | "onChange">;
