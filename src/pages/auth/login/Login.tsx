import { FormikContext, useFormik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineLock, MdOutlinePermIdentity } from "react-icons/md";

import Button from "@/components/Button";
import FormInput from "@/components/Formik/FormInput";

import { initialUserForm } from "./fixtures";
import type { UserForm } from "./types";
import { LoginFormValidationSchema } from "./validations";

const LoginPage: NextPage = () => {
  const router = useRouter();

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handleSubmit = async (values: UserForm) => {
    const response = await signIn("credentials", {
      ...values,
      redirect: false,
    });

    // const { success, message } = await loginAPI(values);

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

  const handleTogglePasswordVisibility = () =>
    setIsPasswordVisible((prev) => !prev);

  return (
    <FormikContext.Provider value={formikBag}>
      <div className="flex w-full max-w-xl flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to Travel Log
            </h2>
          </div>
          <div className="flex flex-col gap-2 rounded-md">
            <div className="mb-4">
              <FormInput
                name="identifier"
                label="Identifier"
                isRequired
                placeholder="Enter your Email/Username"
                leftIcon={<MdOutlinePermIdentity />}
              />
            </div>

            <FormInput
              name="password"
              label="Password"
              isRequired
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Enter your Password"
              leftIcon={<MdOutlineLock />}
              rightIcon={
                isPasswordVisible ? (
                  <FaRegEye onClick={handleTogglePasswordVisibility} />
                ) : (
                  <FaRegEyeSlash onClick={handleTogglePasswordVisibility} />
                )
              }
            />
          </div>
        </div>

        <div className="mt-14 w-full">
          <Button
            className="btn-primary w-full justify-center"
            onClick={formikBag.submitForm}
          >
            Sign in
          </Button>
        </div>
      </div>
    </FormikContext.Provider>
  );
};

export default LoginPage;
