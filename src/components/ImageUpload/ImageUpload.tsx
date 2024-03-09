import React, { FC } from "react";

import AvatarUpload from "./AvatarUpload";
import { ImageUploadOptions } from "./config";
import CoverPhotoUpload from "./CoverPhotoUpload";
import MultiUpload from "./MultiUpload";
import type { ImageUploadProps } from "./types";

const ImageUpload: FC<ImageUploadProps> = (props) => {
  const { variant = ImageUploadOptions.Avatar, ...rest } = props;

  const renderComponent = () => {
    switch (variant) {
      case ImageUploadOptions.Avatar:
        return <AvatarUpload {...rest} />;

      case ImageUploadOptions.Cover:
        return <CoverPhotoUpload {...rest} />;

      case ImageUploadOptions.Multi:
        return <MultiUpload {...rest} />;

      default:
        return <AvatarUpload {...rest} />;
    }
  };

  return <div>{renderComponent()}</div>;
};

export default ImageUpload;
