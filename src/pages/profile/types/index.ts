import type { DateValueType } from "react-tailwindcss-datepicker";

export type ProfileForm = {
  firstName: string;
  middleName: string;
  lastName: string;
  sex: string | null;
  birthday: DateValueType;
  email: string;
  username: string;
  address1: string;
  address2: string;
  state: string;
  city: string;
  zipcode: string;
  country: string;
};
