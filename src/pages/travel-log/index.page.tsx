import { NextPage } from "next";
import React, { useCallback, useRef } from "react";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useFetchCountries } from "@/hooks";
import { FormikContext, useFormik } from "formik";
import { TravelLogForm } from "./types";
import { initialTravelLogForm } from "./fixtures";
import FormInput from "@/components/Formik/FormInput";
import FormTextArea from "@/components/Formik/FormTextArea";
import FormDatePicker from "@/components/Formik/FormDatePicker";

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

  return (
    <div className="mx-auto my-10 max-w-4xl overflow-hidden rounded-lg">
      <div className="flex justify-end">
        <Button onClick={handleShow}>Add Travel Log</Button>
      </div>

      <Modal
        ref={travelLogModalRef}
        handleClose={() => travelLogModalRef.current?.close()}
        bodyClassname="w-11/12 max-w-5xl"
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
          </div>
        </FormikContext.Provider>
      </Modal>
    </div>
  );
};

export default TravelLog;
