import React from 'react'
import { NextPage } from 'next'
import { FormikContext, useFormik } from 'formik'
import FormInput from '@/components/Formik/FormInput'
import { MdEmail, MdKey, MdPassword, MdPeople } from 'react-icons/md'
import Button from '@/components/Button'
import { RegisterForm } from './types'
import { initialRegistrationForm } from './fixtures'
import { RegistrationFormValidationScheme } from './validations'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'

const IndexPage: NextPage = () => {

    const router = useRouter();

    const handleSubmit = async (values: RegisterForm) => {

      console.log("Values==="+ JSON.stringify(values));

      const response = await signIn("details", {
        ...values,
        redirect: false,
      });

      if(!response?.ok) {
        toast.error("SOmething went wrong...");
      }

      router.push("/registration");
      toast.success("Successfully registerred.");
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
  )
}

export default IndexPage