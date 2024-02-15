import { NextPage } from "next";

import Button from "@/components/Button";

import type { UserForm } from "./types";
import { FormikContext, useFormik } from "formik";
import { initialUserForm } from "./fixtures";
import FormInput from "@/components/Formik/FormInput";
import { LoginFormValidationSchema } from "./validations";
import ValidationMessage from "@/components/Formik/ValidationMessage";
import { loginAPI } from "@/services/login";
import { useAppDispatch } from "@/hooks";
import { utilsActions } from "@/redux/utils/slices";
import toast from "react-hot-toast";

const LoginPage: NextPage = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: UserForm) => {
    const { success, data, message } = await loginAPI(values);

    if (!success) {
      toast.error(message as string);
      return;
    }

    dispatch(utilsActions.setAccessToken((data?.access_token as string) || ""));
    toast.success(message as string);
  };

  const formikBag = useFormik<UserForm>({
    initialValues: initialUserForm,
    validationSchema: LoginFormValidationSchema,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  return (
    <FormikContext.Provider value={formikBag}>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in
            </h2>
          </div>
          <div className="flex flex-col gap-2 rounded-md">
            <div className="mb-4 flex flex-col">
              <FormInput name="identifier" placeholder="Email / Username" />
              <ValidationMessage name="identifier" />
            </div>

            <div className="flex flex-col">
              <FormInput name="password" placeholder="Password" />
              <ValidationMessage name="password" />
            </div>
          </div>
          <div>
            <Button
              className="w-full justify-center"
              onClick={formikBag.submitForm}
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </FormikContext.Provider>
  );
};

export default LoginPage;
