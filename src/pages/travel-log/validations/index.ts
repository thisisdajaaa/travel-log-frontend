import * as Yup from "yup";

import { validDateValidation } from "@/utils/validations";

export const TravelLogFormValidationSchema = Yup.object().shape({
  title: Yup.string().label("Title").required().min(6).max(100),

  description: Yup.string().label("Description").max(255),

  visitDate: validDateValidation("Visit Date"),

  images: Yup.array().required().label("Images").min(1),

  country: Yup.string().label("Country").required(),
});
