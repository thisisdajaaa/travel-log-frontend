import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { updateProfileAPI } from "@/services/profile";

import type { ApiResponse } from "@/types/server/config";
import type {
  ProfileDetailResponse,
  ProfileRequest,
} from "@/types/server/profile";

const useUpdateProfile = (
  args?: UseMutationOptions<
    ApiResponse<ProfileDetailResponse>,
    Error,
    ProfileRequest
  >
) => {
  const mutation = useMutation<
    ApiResponse<ProfileDetailResponse>,
    Error,
    ProfileRequest
  >({
    mutationFn: updateProfileAPI,
    ...args,
  });

  return mutation;
};

export default useUpdateProfile;
