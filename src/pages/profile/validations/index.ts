import moment from "moment";
import * as Yup from "yup";

import { getGenderListValues } from "@/constants/gender";

const birthdayValidation = Yup.string()
  .required()
  .label("Birthday")
  .test("is-future-date", "${path} must be today or in the Past", (value) => {
    const today = moment(new Date());
    const inputDate = moment(value);
    return inputDate.isSameOrBefore(today);
  });

export const ProfileFormValidationSchema = Yup.object().shape({
  firstName: Yup.string().label("First Name").required().min(1).max(60),

  lastName: Yup.string().label("Last Name").required().min(1).max(60),

  sex: Yup.string().label("Sex").oneOf(getGenderListValues()),

  birthday: Yup.object().shape({
    startDate: birthdayValidation,
    endDate: birthdayValidation,
  }),

  address1: Yup.string().label("Line one").required().min(1).max(255),

  city: Yup.string().label("City").required().min(1).max(255),

  state: Yup.string().label("State").required().min(1).max(255),

  zipcode: Yup.string().label("Zipcode").required().min(4).max(10),

  country: Yup.string().label("Country").required().min(1).max(255),
});
