import { FileWithPreview } from "@/components/ImageUpload/types";

import type { CountryDetailResponse } from "./country";

export type CreateTravelLogRequest = {
  countryId: number;
  title: string;
  description: string;
  visitStartDate: string;
  visitEndDate: string;
  images?: FileWithPreview[];
};

export type TravelLogDetailResponse = {
  id: number;
  title: string;
  description: string | null;
  visitStartDate: string;
  visitEndDate: string;
  userId: number;
  country: CountryDetailResponse;
  photos: TravelPhotoResponse[];
};

export type TravelPhotoResponse = {
  id: number;
  photoUrl: string;
  description: string | null;
  travelLogId: number;
};
