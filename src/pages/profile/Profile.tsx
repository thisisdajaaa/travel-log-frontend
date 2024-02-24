import { FormikContext, useFormik } from "formik";
import { NextPage } from "next";
import Image from "next/image";
import { useSession } from "next-auth/react";
import React from "react";
import { FaCamera } from "react-icons/fa";

import { withAuth } from "@/utils/withAuth";

import FormDatePicker from "@/components/Formik/FormDatePicker";
import FormInput from "@/components/Formik/FormInput";
import FormSelect from "@/components/Formik/FormSelect/FormSelect";

import { initialProfileForm } from "./fixtures";
import type { ProfileForm } from "./types";
import { genderList } from "@/constants/gender";

const Profile: NextPage = () => {
  const session = useSession();

  const handleSubmit = async (values: ProfileForm) => {
    console.log(values);
  };

  const formattedInitialProfileForm: ProfileForm = {
    ...initialProfileForm,
    username: session?.data?.user?.name || "",
    email: session?.data?.user?.email || "",
  };

  const formikBag = useFormik<ProfileForm>({
    initialValues: formattedInitialProfileForm,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  console.log("values: ", formikBag.values);

  return (
    <div className="mx-auto my-10 max-w-4xl overflow-hidden rounded-lg shadow-lg">
      <div className="relative">
        <Image
          alt="cover-photo"
          src="/images/mock-cover.jpg"
          layout="responsive"
          className="rounded-t-lg object-cover"
          height={200}
          width={800}
        />
        <div className="absolute -bottom-16 left-10">
          <div className="relative h-[168px] w-[168px] rounded-full border-4 border-white">
            <Image
              alt="profile-photo"
              src="/images/mock-avatar.jpg"
              layout="fill"
              objectFit="cover"
              className="rounded-full transition duration-300 hover:brightness-75"
            />
            <div className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
              <FaCamera className="text-white" />
            </div>
          </div>
        </div>
      </div>

      <FormikContext.Provider value={formikBag}>
        <div className="mt-20 p-8">
          <div className="mb-10">
            <h2 className="mb-4 text-xl font-semibold">Basic Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <FormInput
                name="username"
                type="text"
                label="Username"
                placeholder="Enter Username"
                isReadOnly
                isRequired
              />

              <FormInput
                name="email"
                type="text"
                label="Email Address"
                placeholder="Enter Email Address"
                isReadOnly
                isRequired
              />

              <FormInput
                name="firstName"
                label="First Name"
                placeholder="Enter First Name"
                isRequired
              />

              <FormInput
                name="middleName"
                type="text"
                label="Middle Name"
                placeholder="Enter Middle Name"
              />

              <FormInput
                name="lastName"
                type="text"
                label="Last Name"
                placeholder="Enter Last Name"
                isRequired
              />

              <FormSelect
                name="gender"
                label="Gender"
                options={genderList}
                isRequired
              />

              <FormDatePicker name="birthday" asSingle label="Birthday" />
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold">Address</h2>
            <div className="grid grid-cols-2 gap-6">
              <FormInput
                name="address1"
                label="Line One"
                placeholder="Enter Line One"
                containerClassname="col-span-2"
              />

              <FormInput
                name="address2"
                label="Line Two"
                placeholder="Enter Line Two"
                containerClassname="col-span-2"
              />

              <FormInput name="state" label="State" placeholder="Enter State" />

              <FormInput
                name="zipcode"
                type="number"
                label="Zipcode"
                placeholder="Enter Zipcode"
                maxLength={10}
              />

              <FormInput
                name="country"
                label="Country"
                placeholder="Enter Country"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 rounded bg-blue-600 py-2 px-4 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </FormikContext.Provider>
    </div>
  );
};

export default withAuth(Profile);
