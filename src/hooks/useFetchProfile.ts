import { useQuery } from "@tanstack/react-query";

import { getProfileAPI } from "@/services/profile";

import type { ApiResponse } from "@/types/server/config";
import type { ProfileDetailResponse } from "@/types/server/profile";

const useFetchProfile = () => {
  const response = useQuery<
    ApiResponse<ProfileDetailResponse>,
    Error,
    ApiResponse<ProfileDetailResponse>,
    string[]
  >({
    queryKey: ["getProfile"],
    queryFn: () => getProfileAPI(),
  });

  return response;
};

export default useFetchProfile;
