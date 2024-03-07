import { onParseResponse } from "@/utils/helpers";

import type { ApiResponse } from "@/types/server/config";
import type {
  ProfileDetailResponse,
  ProfileRequest,
} from "@/types/server/profile";

export const getProfileAPI = async (): Promise<
  ApiResponse<ProfileDetailResponse>
> => {
  const response = await onParseResponse<ProfileDetailResponse>({
    method: "get",
    url: "/profile",
  });

  return response;
};

export const updateProfileAPI = async (
  values: ProfileRequest
): Promise<ApiResponse<ProfileDetailResponse>> => {
  const response = await onParseResponse<ProfileDetailResponse>({
    method: "patch",
    url: "/profile",
    data: values,
  });

  return response;
};
