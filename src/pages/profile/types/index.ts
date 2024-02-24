import { DateValueType } from "react-tailwindcss-datepicker";

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
