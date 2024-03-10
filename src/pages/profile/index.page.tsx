import { FormikContext, useFormik } from "formik";
import { debounce } from "lodash";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import toast from "react-hot-toast";

import { withAuth } from "@/utils/withAuth";
import { useFetchCountries, useFetchProfile } from "@/hooks";

import { genderList } from "@/constants/gender";

import Button from "@/components/Button";
import FormDatePicker from "@/components/Formik/FormDatePicker";
import FormImageUpload from "@/components/Formik/FormImageUpload";
import FormInput from "@/components/Formik/FormInput";
import FormSelect from "@/components/Formik/FormSelect";
import { ImageUploadOptions } from "@/components/ImageUpload/config";
import type { FileWithPreview } from "@/components/ImageUpload/types";

import { uploadCoverImage, uploadProfileImage } from "@/services/file";

import type { Option } from "@/types/client";
import { ProfileDetailResponse, ProfileRequest } from "@/types/server/profile";

import { initialProfileForm } from "./fixtures";
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
      profilePhoto,
      coverPhoto,
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
      profilePhoto,
      coverPhoto,
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

  const handlePhotoChange = (type: ImageUploadOptions) =>
    debounce(async (value: File | FileWithPreview[]) => {
      if (value) {
        switch (type) {
          case ImageUploadOptions.Avatar: {
            await uploadProfileImage(value as File);
            toast.success("Profile photo successfully saved!");
            break;
          }

          case ImageUploadOptions.Cover: {
            await uploadCoverImage(value as File);
            toast.success("Cover photo successfully saved!");
            break;
          }

          default: {
            break;
          }
        }
      }
    }, 500);

  return (
    <FormikContext.Provider value={formikBag}>
      <div className="mx-auto my-10 max-w-4xl overflow-hidden rounded-lg shadow-lg">
        <div className="relative">
          <FormImageUpload
            variant={ImageUploadOptions.Cover}
            name="coverPhoto"
            handleImageUpload={handlePhotoChange(ImageUploadOptions.Cover)}
          />

          <div className="absolute -bottom-16 left-10">
            <FormImageUpload
              variant={ImageUploadOptions.Avatar}
              name="profilePhoto"
              handleImageUpload={handlePhotoChange(ImageUploadOptions.Avatar)}
            />
          </div>
        </div>

        <div className="mt-20 p-8">
          <div className="mb-10">
            <h2 className="mb-4 text-xl font-semibold">Basic Information</h2>
            <div className="grid gap-7 md:grid-cols-2">
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

            <div className="grid gap-7 md:grid-cols-2">
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

          <div className="mt-14 flex justify-end gap-6">
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
      </div>
    </FormikContext.Provider>
  );
};

export default withAuth(Profile);
