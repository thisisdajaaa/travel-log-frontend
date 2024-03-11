import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { createTravelLogAPI } from "@/services/travel-log";

import type { ApiResponse } from "@/types/server/config";
import {
  CreateTravelLogRequest,
  TravelLogDetailResponse,
} from "@/types/server/travel-log";

const useCreateTravelLog = (
  args?: UseMutationOptions<
    ApiResponse<TravelLogDetailResponse>,
    Error,
    CreateTravelLogRequest
  >
) => {
  const mutation = useMutation<
    ApiResponse<TravelLogDetailResponse>,
    Error,
    CreateTravelLogRequest
  >({
    mutationFn: createTravelLogAPI,
    ...args,
  });

  return mutation;
};

export default useCreateTravelLog;
