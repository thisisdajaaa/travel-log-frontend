import { AxiosRequestHeaders } from "axios";

import { onParseResponse } from "@/utils/helpers";

import { ApiResponse } from "@/types/server/config";
import { ProfileDetailResponse } from "@/types/server/profile";

export const getProfileAPI = async (
  accessToken?: string
): Promise<ApiResponse<ProfileDetailResponse>> => {
  const headers: AxiosRequestHeaders = {};

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const response = await onParseResponse<ProfileDetailResponse>({
    method: "get",
    url: "/profile",
    headers,
  });

  return response;
};
