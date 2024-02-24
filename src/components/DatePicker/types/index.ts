import { DatepickerType } from "react-tailwindcss-datepicker";

export type DatePickerProps = {
  label: string;
  className?: string;
  isRequired?: boolean;
  hasError?: boolean;
} & DatepickerType;
