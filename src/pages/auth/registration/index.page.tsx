import { FormikContext, useFormik } from "formik";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdEmail, MdKey, MdPeople } from "react-icons/md";

import {
  AUTHENTICATED_PAGE_URL,
  NON_AUTHENTICATED_PAGE_URL,
} from "@/constants/pageUrl";

import Button from "@/components/Button";
import FormInput from "@/components/Formik/FormInput";

import { registerAPI } from "@/services/authentication";

import { initialRegistrationForm } from "./fixtures";
import { RegisterForm } from "./types";
import { RegistrationFormValidationScheme } from "./validations";
import { LoginForm } from "../login/types";

const IndexPage: NextPage = () => {
  const router = useRouter();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const handleSubmit = async (values: RegisterForm) => {
    const { email, password, username } = values;

    const registerRequest: Partial<RegisterForm> = {
      email,
      password,
      username,
    };

    const { success, message } = await registerAPI(registerRequest);

    if (!success) {
      toast.error(message as string);
      return;
    }

    const request: LoginForm = {
      identifier: email,
      password,
    };

    const response = await signIn("credentials", {
      ...request,
      redirect: false,
    });

    if (!response?.ok) {
      toast.error("Something went wrong!");
      return;
    }

    router.push(AUTHENTICATED_PAGE_URL.HOME);
    toast.success("Successfully registered and logged in user!");
  };

  const formikBag = useFormik<RegisterForm>({
    initialValues: initialRegistrationForm,
    validationSchema: RegistrationFormValidationScheme,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  const handleTogglePasswordVisibility = (action: string) => {
    if (action == "password") {
      setIsPasswordVisible((prev) => !prev);
    }

    if (action == "confirm") {
      setIsConfirmPasswordVisible((prev) => !prev);
    }
  };

  return (
    <FormikContext.Provider value={formikBag}>
      <div className="flex w-full max-w-xl flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full space-y-8">
          <div className="text-center">
            <Image
              src="/svg/TravelLogo.svg"
              alt="travel-logo-svg"
              height={68}
              width={68}
              className="text-center"
            />
          </div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            New Registration
          </h2>
          <div className="flex flex-col gap-4 rounded-md">
            <FormInput
              name="username"
              label="Username"
              isRequired
              placeholder="Enter your username"
              leftIcon={<MdPeople />}
            />

            <FormInput
              name="email"
              label="Email"
              isRequired
              placeholder="Enter your email"
              leftIcon={<MdEmail />}
            />

            <FormInput
              name="password"
              label="Password"
              isRequired
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Enter your Password"
              leftIcon={<MdKey />}
              rightIcon={
                isPasswordVisible ? (
                  <FaRegEye
                    onClick={() => handleTogglePasswordVisibility("password")}
                    className="hover:cursor-pointer"
                  />
                ) : (
                  <FaRegEyeSlash
                    onClick={() => handleTogglePasswordVisibility("password")}
                    className="hover:cursor-pointer"
                  />
                )
              }
            />

            <FormInput
              name="confirmPassword"
              label="Confirm Password"
              isRequired
              type={isConfirmPasswordVisible ? "text" : "password"}
              placeholder="Confirm your Password"
              leftIcon={<MdKey />}
              rightIcon={
                isConfirmPasswordVisible ? (
                  <FaRegEye
                    onClick={() => handleTogglePasswordVisibility("confirm")}
                    className="hover:cursor-pointer"
                  />
                ) : (
                  <FaRegEyeSlash
                    onClick={() => handleTogglePasswordVisibility("confirm")}
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
            Register
          </Button>
        </div>

        <div className="mt-6 w-full">
          <Link href={NON_AUTHENTICATED_PAGE_URL.LOGIN}>
            <a className="flex items-center justify-center">
              <FaArrowLeftLong className="mr-1" />
              Back to Login
            </a>
          </Link>
        </div>
      </div>
    </FormikContext.Provider>
  );
};

export default IndexPage;
