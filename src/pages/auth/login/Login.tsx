import { FormikContext, useFormik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

import Button from "@/components/Button";
import FormInput from "@/components/Formik/FormInput";
import ValidationMessage from "@/components/Formik/ValidationMessage";

import { initialUserForm } from "./fixtures";
import type { UserForm } from "./types";
import { LoginFormValidationSchema } from "./validations";

const LoginPage: NextPage = () => {
  const router = useRouter();

  const handleSubmit = async (values: UserForm) => {
    const response = await signIn("credentials", {
      ...values,
      redirect: false,
    });

    if (!response?.ok) {
      toast.error("Something went wrong!");
      return;
    }

    router.push("/");
    toast.success("Successfully logged in user!");
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
      <div className="flex w-full max-w-[40.625rem] flex-col items-center rounded-xl bg-beluga px-[3.438rem] pt-[4.125rem] pb-[6.5rem]">
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
              <FormInput
                name="password"
                type="password"
                placeholder="Password"
              />
              <ValidationMessage name="password" />
            </div>
          </div>
          <div>
            <Button
              className="btn-primary w-full justify-center"
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
