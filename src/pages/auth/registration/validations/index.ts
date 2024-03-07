import * as Yup from "yup";

export const RegistrationFormValidationScheme =  Yup.object().shape({
    username: Yup.string().label("Username").required().min(4).max(40),

    email: Yup.string().label("Email").email().required().min(6).max(40),
  
    password: Yup.string().label("Password").required().min(8).max(15),
  
    confirmPassword: Yup.string()
      .label("Confirm Password")
      .required()
      .when("password", {
        is: (val: string) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf([Yup.ref("password")], "Passwords must match"),
      }),
});