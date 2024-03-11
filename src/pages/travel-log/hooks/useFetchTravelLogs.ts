import { useQuery } from "@tanstack/react-query";

import { getTravelLogsAPI } from "@/services/travel-log";

import type { ApiResponse } from "@/types/server/config";
import { TravelLogDetailResponse } from "@/types/server/travel-log";

const useFetchTravelLogs = () => {
  const response = useQuery<
    ApiResponse<TravelLogDetailResponse[]>,
    Error,
    ApiResponse<TravelLogDetailResponse[]>,
    string[]
  >({
    queryKey: ["getTravelLogs"],
    queryFn: () => getTravelLogsAPI(),
  });

  return response;
};

export default useFetchTravelLogs;
