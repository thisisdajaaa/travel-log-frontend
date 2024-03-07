import React, { FC } from "react";

import AvatarUpload from "./AvatarUpload";
import { FileUploadOptions } from "./config";
import CoverPhotoUpload from "./CoverPhotoUpload";
import type { FileUploadProps } from "./types";

const FileUpload: FC<FileUploadProps> = (props) => {
  const { variant = FileUploadOptions.Avatar, ...rest } = props;

  const renderComponent = () => {
    switch (variant) {
      case FileUploadOptions.Avatar:
        return <AvatarUpload {...rest} />;

      case FileUploadOptions.Cover:
        return <CoverPhotoUpload {...rest} />;

      default:
        return <AvatarUpload {...rest} />;
    }
  };

  return <div>{renderComponent()}</div>;
};

export default FileUpload;
