import type { DateValueType } from "react-tailwindcss-datepicker";

import { FileWithPreview } from "@/components/ImageUpload/types";

export type TravelLogForm = {
  title: string;
  description: string;
  visitDate: DateValueType;
  country: string;
  images: FileWithPreview[];
};

export type TravelLogModalProps = {
  handleClose: () => void;
};
