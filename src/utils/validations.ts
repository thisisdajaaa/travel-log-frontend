import moment from "moment";
import * as Yup from "yup";

export const validDateValidation = (label: string) =>
  Yup.object()
    .nullable()
    .shape({
      startDate: validDateSchema(label),
      endDate: validDateSchema(label),
    });

export const pastDateOrTodayValidation = (label: string) =>
  Yup.object()
    .nullable()
    .shape({
      startDate: validDateSchema(label),
      endDate: validDateSchema(label),
    });

export const validDateSchema = (label: string) =>
  Yup.string()
    .required()
    .nullable()
    .label(label)
    .test("is-valid-date", "${path} must be a valid date", (value) => {
      const inputDate = moment(value);
      return inputDate.isValid();
    });

export const pastDateOrTodaySchema = (label: string) =>
  Yup.string()
    .required()
    .nullable()
    .label(label)
    .test("is-future-date", "${path} must be today or in the Past", (value) => {
      const today = moment(new Date());
      const inputDate = moment(value);
      return inputDate.isSameOrBefore(today);
    });
