import type { DateValueType } from "react-tailwindcss-datepicker";

export type TravelLogForm = {
  title: string;
  description: string;
  visitDate: DateValueType;
  country: string;
};
