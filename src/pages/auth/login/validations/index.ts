import * as Yup from "yup";

export const LoginFormValidationSchema = Yup.object().shape({
  identifier: Yup.string().label("Identifier").required().min(6).max(40),
  password: Yup.string().label("Password").required().min(8).max(15),
});
