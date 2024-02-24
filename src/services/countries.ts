import { onParseResponse } from "@/utils/helpers";

import { ApiResponse } from "@/types";
import { CountryDetailResponse } from "@/types/countries";

export const getCountriesAPI = async (): Promise<
  ApiResponse<CountryDetailResponse[]>
> => {
  const response = await onParseResponse<CountryDetailResponse[]>({
    method: "get",
    url: "/countries",
  });

  return response;
};
