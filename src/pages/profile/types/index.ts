import type { ApiResponse } from "@/types/server/config";
import type { ProfileDetailResponse } from "@/types/server/profile";
import type { DateValueType } from "react-tailwindcss-datepicker";

export type ProfileForm = {
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  birthday: DateValueType;
  email: string;
  username: string;
  address1: string;
  address2: string;
  state: string;
  city: string;
  zipCode: string;
  country: string;
};

export type ProfileProps = {
  items: ApiResponse<ProfileDetailResponse>;
};
