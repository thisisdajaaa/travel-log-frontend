import { onParseResponse } from "@/utils/helpers";

import { FileWithPreview } from "@/components/ImageUpload/types";

import type { ApiResponse } from "@/types/server/config";
import type {
  CreateTravelLogRequest,
  TravelLogDetailResponse,
} from "@/types/server/travel-log";

export const createTravelLogAPI = async (
  values: CreateTravelLogRequest
): Promise<ApiResponse<TravelLogDetailResponse>> => {
  const {
    images,
    countryId,
    description,
    title,
    visitStartDate,
    visitEndDate,
  } = values;

  const formData = new FormData();

  images?.forEach((fileWithPreview: FileWithPreview) =>
    formData.append("images", fileWithPreview)
  );

  const createTravelLogDto: CreateTravelLogRequest = {
    countryId,
    title,
    description,
    visitStartDate,
    visitEndDate,
  };

  const dtoBlob = new Blob([JSON.stringify(createTravelLogDto)], {
    type: "application/json",
  });

  formData.append("createTravelLogDto", dtoBlob);

  const response = await onParseResponse<TravelLogDetailResponse>({
    method: "post",
    url: "/travel-logs",
    data: formData,
  });

  return response;
};

export const getTravelLogsAPI = async (): Promise<
  ApiResponse<TravelLogDetailResponse[]>
> => {
  const response = await onParseResponse<TravelLogDetailResponse[]>({
    method: "get",
    url: "/travel-logs",
  });

  return response;
};
