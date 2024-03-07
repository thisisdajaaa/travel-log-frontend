import { onParseResponse } from "@/utils/helpers";

import type { ApiResponse } from "@/types/server/config";
import type { FileResponse } from "@/types/server/file";

import { updateProfileAPI } from "./profile";

export const uploadFileAPI = async (
  file: File
): Promise<ApiResponse<FileResponse>> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await onParseResponse<FileResponse>({
    method: "post",
    url: "/images",
    data: formData,
  });

  return response;
};

export const uploadProfileImage = async (file: File) => {
  const { success, data } = await uploadFileAPI(file);

  if (success) await updateProfileAPI({ profilePhoto: data?.path });
};

export const uploadCoverImage = async (file: File) => {
  const { success, data } = await uploadFileAPI(file);

  if (success && data?.path) await updateProfileAPI({ coverPhoto: data?.path });
};
