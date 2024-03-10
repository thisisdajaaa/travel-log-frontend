import { ImageUploadOptions } from "../config";

export type ImageUploadProps = {
  value: File | string;
  onChange: (value: File | FileWithPreview[]) => void;
  variant?: ImageUploadOptions;
};

export type FileWithPreview = {
  preview: string;
} & File;
