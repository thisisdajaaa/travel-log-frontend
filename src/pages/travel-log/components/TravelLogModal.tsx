import { useFormikContext } from "formik";
import Image from "next/image";
import React, { forwardRef, useMemo } from "react";
import { FaX } from "react-icons/fa6";

import { useFetchCountries } from "@/hooks";

import Button from "@/components/Button";
import { Carousel, CarouselItem } from "@/components/Carousel";
import FormDatePicker from "@/components/Formik/FormDatePicker";
import FormImageUpload from "@/components/Formik/FormImageUpload";
import FormInput from "@/components/Formik/FormInput";
import FormSelect from "@/components/Formik/FormSelect";
import FormTextArea from "@/components/Formik/FormTextArea";
import { ImageUploadOptions } from "@/components/ImageUpload/config";
import type { FileWithPreview } from "@/components/ImageUpload/types";
import Modal from "@/components/Modal";

import { Option } from "@/types/client";

import type { TravelLogForm, TravelLogModalProps } from "../types";

const TravelLogModal = forwardRef<HTMLDialogElement, TravelLogModalProps>(
  (props, ref) => {
    const { handleClose } = props;

    const { data: countries } = useFetchCountries();

    const { values, setFieldValue, submitForm, isSubmitting } =
      useFormikContext<TravelLogForm>();

    const removeImage = (file: FileWithPreview) => {
      const { images } = values;
      const newImages = [...images];

      newImages.splice(newImages.indexOf(file), 1);

      setFieldValue("images", newImages);
    };

    const mappedCountryList: Option[] = useMemo(
      () =>
        countries?.data?.map((country) => ({
          label: country.name,
          value: country.id.toString(),
        })) as Option[],
      [countries]
    );

    return (
      <Modal
        ref={ref}
        handleClose={handleClose}
        bodyClassname="w-11/12 max-w-7xl"
      >
        <h2 className="mb-6 text-lg font-bold uppercase">Add Travel Log</h2>

        <div className="grid gap-7">
          <FormInput
            name="title"
            type="text"
            label="Title"
            placeholder="Enter Title"
            isRequired
          />

          <FormTextArea
            name="description"
            label="Description"
            placeholder="Enter Description"
          />

          <FormDatePicker name="visitDate" isRequired label="Visit Date" />

          <FormSelect
            name="country"
            label="Country"
            options={mappedCountryList}
            isRequired
          />

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">
                Upload Images <span className="text-accent">*</span>
              </span>
            </label>

            <FormImageUpload name="images" variant={ImageUploadOptions.Multi} />
          </div>

          {values.images && values.images.length > 0 && (
            <div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-[500px] w-[500px]">
                  <h4 className="text-md mb-3 font-bold uppercase">Preview</h4>
                  <Carousel display="sequential" className="rounded-box">
                    {values.images.map((file, index) => (
                      <CarouselItem
                        key={index}
                        src={file?.preview}
                        alt={file?.name}
                      />
                    ))}
                  </Carousel>
                </div>

                <div className="h-[500px] overflow-y-auto">
                  <h4 className="text-md font-bold uppercase">List</h4>
                  <ul className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
                    {values.images.map((file) => (
                      <li key={file.name} className="group relative">
                        <div className="aspect-w-16 aspect-h-9 image-blur-overlay h-56 w-full overflow-hidden rounded-md bg-gray-200">
                          <Image
                            src={file.preview}
                            alt={`Thumbnail for ${file.name}`}
                            layout="fill"
                            objectFit="contain"
                            className="image-content transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <button
                          className="absolute right-2 top-2 z-10 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                          onClick={() => removeImage(file)}
                        >
                          <FaX size={10} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="mt-14 flex justify-end gap-6">
            <Button
              type="button"
              variant="danger"
              onClick={handleClose}
              className="w-3/12"
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={submitForm}
              className="w-3/12"
              isLoading={isSubmitting}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
);

export default TravelLogModal;
