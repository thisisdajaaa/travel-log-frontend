import { onParseResponse } from "@/utils/helpers";

import type { UserForm } from "@/pages/auth/login/types";

import type { ApiResponse } from "@/types";
import type { AuthenticationDetailResponse } from "@/types/authentication";

export const loginAPI = async (
  values: UserForm
): Promise<ApiResponse<AuthenticationDetailResponse>> => {
  const response = await onParseResponse<AuthenticationDetailResponse>({
    method: "post",
    url: "/auth/login",
    data: values,
  });

  return response;
};

export const logoutAPI = async (): Promise<ApiResponse<unknown>> => {
  const response = await onParseResponse<unknown>({
    method: "post",
    url: "/auth/logout",
    data: null,
  });

  return response;
};
