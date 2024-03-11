import { onParseResponse } from "@/utils/helpers";

import { ApiResponse } from "@/types/server/config";
import { CountryDetailResponse } from "@/types/server/country";

export const getCountriesAPI = async (): Promise<
  ApiResponse<CountryDetailResponse[]>
> => {
  const response = await onParseResponse<CountryDetailResponse[]>({
    method: "get",
    url: "/countries",
  });

  return response;
};
