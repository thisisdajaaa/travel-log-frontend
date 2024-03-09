import { FormikContext, useFormik } from "formik";
import { NextPage } from "next";
import Image from "next/image";
import React, { useCallback, useRef } from "react";
import { FaX } from "react-icons/fa6";

import { useFetchCountries } from "@/hooks";

import Button from "@/components/Button";
import { Carousel, CarouselItem } from "@/components/Carousel";
import FormDatePicker from "@/components/Formik/FormDatePicker";
import FormImageUpload from "@/components/Formik/FormImageUpload";
import FormInput from "@/components/Formik/FormInput";
import FormTextArea from "@/components/Formik/FormTextArea";
import { ImageUploadOptions } from "@/components/ImageUpload/config";
import { FileWithPreview } from "@/components/ImageUpload/types";
import Modal from "@/components/Modal";

import { initialTravelLogForm } from "./fixtures";
import type { TravelLogForm } from "./types";

const TravelLog: NextPage = () => {
  const { data: countries } = useFetchCountries();

  const travelLogModalRef = useRef<HTMLDialogElement | null>(null);

  const handleSubmit = async (values: TravelLogForm) => {
    console.log("Values: ", values);
  };

  const formikBag = useFormik<TravelLogForm>({
    initialValues: initialTravelLogForm,
    onSubmit: handleSubmit,
  });

  const handleShow = useCallback(() => {
    travelLogModalRef.current?.showModal();
  }, [travelLogModalRef]);

  const removeFile = (file: FileWithPreview) => {
    const { files } = formikBag.values;
    const newFiles = [...files];

    newFiles.splice(newFiles.indexOf(file), 1);

    formikBag.setFieldValue("files", newFiles);
  };

  return (
    <div className="mx-auto my-10 max-w-4xl overflow-hidden rounded-lg">
      <div className="flex justify-end">
        <Button onClick={handleShow}>Add Travel Log</Button>
      </div>

      <Modal
        ref={travelLogModalRef}
        handleClose={() => travelLogModalRef.current?.close()}
        bodyClassname="w-11/12 max-w-7xl"
      >
        <h2 className="mb-6 text-lg font-bold uppercase">Add Travel Log</h2>

        <FormikContext.Provider value={formikBag}>
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
              isRequired
            />

            <FormDatePicker name="visitDate" isRequired label="Visit Date" />

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">
                  Upload Images <span className="text-accent">*</span>
                </span>
              </label>

              <FormImageUpload
                name="files"
                variant={ImageUploadOptions.Multi}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="h-[500px] w-[500px]">
                <h4 className="text-md mb-3 font-bold uppercase">Preview</h4>
                <Carousel display="sequential" className="rounded-box">
                  {formikBag.values.files.map((file, index) => (
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
                  {formikBag.values.files.map((file) => (
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
                        onClick={() => removeFile(file)}
                      >
                        <FaX size={10} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </FormikContext.Provider>
      </Modal>
    </div>
  );
};

export default TravelLog;
