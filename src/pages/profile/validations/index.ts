import * as Yup from "yup";

import { pastDateOrTodayValidation } from "@/utils/validations";

import { getGenderListValues } from "@/constants/gender";

export const ProfileFormValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .label("First Name")
    .nullable()
    .required()
    .min(1)
    .max(60),

  lastName: Yup.string()
    .label("Last Name")
    .nullable()
    .required()
    .min(1)
    .max(60),

  sex: Yup.string().label("Sex").nullable().oneOf(getGenderListValues()),

  birthday: pastDateOrTodayValidation("Birthday"),

  address1: Yup.string()
    .label("Line one")
    .nullable()
    .required()
    .min(1)
    .max(255),

  city: Yup.string().label("City").nullable().required().min(1).max(255),

  state: Yup.string().label("State").nullable().required().min(1).max(255),

  zipcode: Yup.string().label("Zipcode").nullable().required().min(4).max(10),

  country: Yup.string().label("Country").nullable().required().min(1).max(255),
});
