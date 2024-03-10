import Image from "next/image";
import React, { FC, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { FaCamera } from "react-icons/fa";

import type { ImageUploadProps } from "../types";

const AvatarUpload: FC<ImageUploadProps> = (props) => {
  const { value, onChange } = props;

  const { open } = useDropzone({
    onDrop: (acceptedFiles) => {
      onChange(acceptedFiles[0]);
    },
  });

  const memoizedValue = useMemo(() => {
    if (!value) return "/images/mock-avatar.jpg";

    return typeof value != "string" && value instanceof File
      ? URL.createObjectURL(value as File)
      : value;
  }, [value]);

  return (
    <div className="relative h-24 w-24 rounded-full border-4 border-white sm:h-40 sm:w-40">
      <Image
        alt="avatar-photo"
        src={memoizedValue}
        layout="fill"
        objectFit="cover"
        loading="lazy"
        className="rounded-full transition duration-300 hover:brightness-75"
      />

      <div
        className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 hover:cursor-pointer md:mt-3 md:text-clip"
        onClick={open}
      >
        <FaCamera className="text-white" />
      </div>
    </div>
  );
};

export default AvatarUpload;
