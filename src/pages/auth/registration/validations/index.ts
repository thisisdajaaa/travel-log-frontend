import * as Yup from "yup";

export const RegistrationFormValidationScheme =  Yup.object().shape({
    username: Yup.string().label("Username").required().min(5).max(35),
    email: Yup.string().label("Email").required().min(5).max(30),
    password: Yup.string().label("Password").required().min(5).max(40)
});