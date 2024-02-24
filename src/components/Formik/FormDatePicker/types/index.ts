import { DateValueType } from "react-tailwindcss-datepicker";

import type { DatePickerProps } from "@/components/DatePicker/types";

export type FormDatePickerProps = {
  name: string;
  handleDateChange?: (value: DateValueType | Date) => void;
} & Omit<DatePickerProps, "value" | "onChange">;
