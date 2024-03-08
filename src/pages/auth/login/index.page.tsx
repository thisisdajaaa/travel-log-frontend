import { FormikContext, useFormik } from "formik";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineLock, MdOutlinePermIdentity } from "react-icons/md";

import {
  AUTHENTICATED_PAGE_URL,
  NON_AUTHENTICATED_PAGE_URL,
} from "@/constants/pageUrl";

import Button from "@/components/Button";
import FormInput from "@/components/Formik/FormInput";

import { initialLoginForm } from "./fixtures";
import type { LoginForm } from "./types";
import { LoginFormValidationSchema } from "./validations";

const IndexPage: NextPage = () => {
  const router = useRouter();

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handleSubmit = async (values: LoginForm) => {
    const response = await signIn("credentials", {
      ...values,
      redirect: false,
    });

    if (!response?.ok) {
      toast.error("Something went wrong!");
      return;
    }

    router.push(AUTHENTICATED_PAGE_URL.HOME);
    toast.success("Successfully logged in user!");
  };

  const formikBag = useFormik<LoginForm>({
    initialValues: initialLoginForm,
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
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to Travel Log
          </h2>
          <div className="flex flex-col gap-4 rounded-md">
            <FormInput
              name="identifier"
              label="Email / Username"
              isRequired
              placeholder="Enter your Email / Username"
              leftIcon={<MdOutlinePermIdentity />}
            />

            <FormInput
              name="password"
              label="Password"
              isRequired
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Enter your Password"
              leftIcon={<MdOutlineLock />}
              rightIcon={
                isPasswordVisible ? (
                  <FaRegEye
                    onClick={handleTogglePasswordVisibility}
                    className="hover:cursor-pointer"
                  />
                ) : (
                  <FaRegEyeSlash
                    onClick={handleTogglePasswordVisibility}
                    className="hover:cursor-pointer"
                  />
                )
              }
            />
          </div>
        </div>

        <div className="mt-14 w-full">
          <Button
            className="btn-primary w-full justify-center"
            onClick={formikBag.submitForm}
            isLoading={formikBag.isSubmitting}
          >
            Sign in
          </Button>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row">
          <p>If you do not have an account yet? </p>

          <div className="flex gap-1 sm:ml-1">
            <Link href={NON_AUTHENTICATED_PAGE_URL.REGISTRATION}>
              <p className="text-blue-600 hover:cursor-pointer">Register</p>
            </Link>
            <p> now.</p>
          </div>
        </div>
      </div>
    </FormikContext.Provider>
  );
};

export default IndexPage;
