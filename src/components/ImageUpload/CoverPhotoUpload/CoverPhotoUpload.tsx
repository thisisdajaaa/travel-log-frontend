import Image from "next/image";
import React, { FC, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { MdEdit } from "react-icons/md";

import Button from "@/components/Button";

import type { ImageUploadProps } from "../types";

const CoverPhotoUpload: FC<ImageUploadProps> = (props) => {
  const { value, onChange } = props;

  const { open } = useDropzone({
    onDrop: (acceptedFiles) => {
      onChange(acceptedFiles[0]);
    },
  });

  const memoizedValue = useMemo(() => {
    if (!value) return "/images/mock-cover.jpg";

    return typeof value != "string" && value instanceof File
      ? URL.createObjectURL(value as File)
      : value;
  }, [value]);

  return (
    <div>
      <Image
        alt="cover-photo"
        src={memoizedValue}
        layout="responsive"
        loading="lazy"
        className="rounded-t-lg object-cover"
        height={200}
        width={800}
      />

      <Button
        variant="default"
        onClick={open}
        className="absolute bottom-3 right-3 z-30 flex h-8 min-h-min items-center justify-center"
      >
        <MdEdit size={16} />
        Edit
      </Button>
    </div>
  );
};

export default CoverPhotoUpload;
