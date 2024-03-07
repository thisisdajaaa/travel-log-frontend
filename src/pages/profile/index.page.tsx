import { FormikContext, useFormik } from "formik";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import toast from "react-hot-toast";
import { FaCamera } from "react-icons/fa";

import { withAuth } from "@/utils/withAuth";
import { useFetchCountries } from "@/hooks";

import { genderList } from "@/constants/gender";

import Button from "@/components/Button";
import FormDatePicker from "@/components/Formik/FormDatePicker";
import FormInput from "@/components/Formik/FormInput";
import FormSelect from "@/components/Formik/FormSelect";

import type { Option } from "@/types/client";
import { ProfileDetailResponse, ProfileRequest } from "@/types/server/profile";

import { initialProfileForm } from "./fixtures";
import useFetchProfile from "./hooks/useFetchProfile";
import useUpdateProfile from "./hooks/useUpdateProfile";
import type { ProfileForm } from "./types";
import { ProfileFormValidationSchema } from "./validations";

const Profile: NextPage = () => {
  const router = useRouter();

  const { data: countries } = useFetchCountries();
  const { data: profile } = useFetchProfile();
  const { mutateAsync } = useUpdateProfile();

  const formattedInitialProfileForm: ProfileForm = useMemo(() => {
    if (!profile?.data) return { ...initialProfileForm };

    const {
      firstName,
      lastName,
      middleName,
      birthDate,
      email,
      sex,
      username,
      addressDetail,
    } = profile?.data as ProfileDetailResponse;

    const { addressOne, addressTwo, city, country, state, zipcode } =
      addressDetail as ProfileDetailResponse["addressDetail"];

    return {
      username: username,
      email: email,
      firstName,
      middleName,
      lastName,
      birthday: { startDate: birthDate, endDate: birthDate },
      address1: addressOne,
      address2: addressTwo,
      city,
      zipcode,
      country: country ? String(country.id) : "",
      state,
      sex,
    };
  }, [profile?.data]);

  const handleSubmit = async (values: ProfileForm) => {
    const {
      username,
      email,
      firstName,
      middleName,
      lastName,
      birthday,
      address1,
      address2,
      city,
      zipcode,
      country,
      state,
      sex,
    } = values;

    const request: ProfileRequest = {
      email,
      username,
      firstName,
      middleName,
      lastName,
      sex: sex as string,
      birthDate: birthday?.endDate as string,
      addressOne: address1,
      addressTwo: address2,
      city,
      countryId: +country,
      state,
      zipcode,
    };

    const { success, message } = await mutateAsync(request);

    if (!success) {
      toast.error(message as string);
      return;
    }

    toast.success(message as string);
  };

  const formikBag = useFormik<ProfileForm>({
    initialValues: formattedInitialProfileForm,
    enableReinitialize: true,
    validationSchema: ProfileFormValidationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  const mappedCountryList: Option[] = useMemo(
    () =>
      countries?.data?.map((country) => ({
        label: country.name,
        value: country.id.toString(),
      })) as Option[],
    [countries]
  );

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

            <div className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 md:mt-3 md:text-clip">
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
                name="sex"
                label="Sex"
                options={genderList}
                isRequired
              />

              <FormDatePicker
                name="birthday"
                asSingle
                isRequired
                maxDate={new Date()}
                label="Birthday"
              />
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
                isRequired
              />

              <FormInput
                name="address2"
                label="Line Two"
                placeholder="Enter Line Two"
                containerClassname="col-span-2"
              />

              <FormInput
                name="city"
                label="City"
                placeholder="Enter City"
                isRequired
              />

              <FormInput
                name="state"
                label="State"
                placeholder="Enter State"
                isRequired
              />

              <FormInput
                name="zipcode"
                type="number"
                label="Zipcode"
                placeholder="Enter Zipcode"
                maxLength={10}
                isRequired
              />

              <FormSelect
                name="country"
                label="Country"
                options={mappedCountryList}
                isRequired
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-6">
            <Button
              type="button"
              variant="danger"
              onClick={router.back}
              className="w-3/12"
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={formikBag.submitForm}
              className="w-3/12"
              isLoading={formikBag.isSubmitting}
            >
              Save
            </Button>
          </div>
        </div>
      </FormikContext.Provider>
    </div>
  );
};

export default withAuth(Profile);
