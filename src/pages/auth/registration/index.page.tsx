import { FormikContext, useFormik } from "formik";
import { NextPage } from "next";
import React from "react";
import toast from "react-hot-toast";
import { MdEmail, MdKey, MdPeople } from "react-icons/md";

import Button from "@/components/Button";
import FormInput from "@/components/Formik/FormInput";

import { registerAPI } from "@/services/authentication";

import { initialRegistrationForm } from "./fixtures";
import { RegisterForm } from "./types";
import { RegistrationFormValidationScheme } from "./validations";

const IndexPage: NextPage = () => {
  const handleSubmit = async (values: RegisterForm) => {
    const { success, message } = await registerAPI(values);

    if (!success) {
      toast.error(message || "Something went wrong...");
      return;
    }

    toast.success(message || "Successfully registered.");

    // TODO: go back to the login page once successfully registered
  };

  const formikBag = useFormik<RegisterForm>({
    initialValues: initialRegistrationForm,
    validationSchema: RegistrationFormValidationScheme,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  return (
    <FormikContext.Provider value={formikBag}>
      <div className="flex w-full max-w-xl flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              New Registration
            </h2>
          </div>
          <div className="flex flex-col gap-2 rounded-md">
            <div className="mb-4">
              <FormInput
                name="username"
                label="Username"
                isRequired
                placeholder="Enter your username"
                leftIcon={<MdPeople />}
              />
            </div>

            <div className="mb-4">
              <FormInput
                name="email"
                label="Email"
                isRequired
                placeholder="Enter your email"
                leftIcon={<MdEmail />}
              />
            </div>

            <FormInput
              name="password"
              label="Password"
              isRequired
              type="password"
              placeholder="Enter your Password"
              leftIcon={<MdKey />}
              // TODO: add logic for toggling between type password or text for password visibility
            />

            <FormInput
              name="confirmPassword"
              label="Password"
              isRequired
              type="password"
              placeholder="Confirm your Password"
              leftIcon={<MdKey />}
              // TODO: add logic for toggling between type password or text for password visibility
            />
          </div>
        </div>

        <div className="mt-14 w-full">
          <Button
            className="btn-primary w-full justify-center"
            onClick={formikBag.submitForm}
          >
            Register
          </Button>
        </div>
      </div>
    </FormikContext.Provider>
  );
};

export default IndexPage;
