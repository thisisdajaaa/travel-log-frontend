import { onParseResponse } from "@/utils/helpers";

import type { ApiResponse } from "@/types/server/config";
import type { UserDetailResponse } from "@/types/server/users";

export const getUserByIdAPI = async (
  id: string
): Promise<ApiResponse<UserDetailResponse>> => {
  const response = await onParseResponse<UserDetailResponse>({
    method: "get",
    url: `/users/${id}`,
  });

  return response;
};
