import { FormikContext, useFormik } from "formik";
import moment from "moment";
import { NextPage } from "next";
import React, { useCallback, useMemo, useRef } from "react";
import toast from "react-hot-toast";

import Button from "@/components/Button";
import { Carousel, CarouselItem } from "@/components/Carousel";

import { CreateTravelLogRequest } from "@/types/server/travel-log";

import TravelLogModal from "./components/TravelLogModal";
import { initialTravelLogForm } from "./fixtures";
import useCreateTravelLog from "./hooks/useCreateTravelLog";
import useFetchTravelLogs from "./hooks/useFetchTravelLogs";
import type { TravelLogForm } from "./types";
import { TravelLogFormValidationSchema } from "./validations";

const TravelLog: NextPage = () => {
  const { data: travelLogs, refetch } = useFetchTravelLogs();
  const { mutateAsync } = useCreateTravelLog();

  const travelLogModalRef = useRef<HTMLDialogElement | null>(null);

  const handleSubmit = async (values: TravelLogForm) => {
    const { country, description, images, title, visitDate } = values;

    const request: CreateTravelLogRequest = {
      countryId: +country,
      title,
      description,
      visitStartDate: moment(visitDate?.startDate).toISOString(),
      visitEndDate: moment(visitDate?.endDate).toISOString(),
      images,
    };

    const { success, message } = await mutateAsync(request);

    if (!success) {
      toast.error(message as string);
      return;
    }

    toast.success(message as string);
    refetch();
    handleClose();
  };

  const memoizedTravelLogs = useMemo(() => {
    return travelLogs?.data;
  }, [travelLogs]);

  const formikBag = useFormik<TravelLogForm>({
    initialValues: initialTravelLogForm,
    enableReinitialize: true,
    validationSchema: TravelLogFormValidationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  const handleShow = useCallback(() => {
    formikBag.resetForm();
    travelLogModalRef.current?.showModal();
  }, [formikBag]);

  const handleClose = useCallback(() => {
    formikBag.resetForm();
    travelLogModalRef.current?.close();
  }, [formikBag]);

  return (
    <div className="mx-auto my-10 max-w-4xl overflow-hidden rounded-lg">
      <div className="flex justify-end">
        <Button onClick={handleShow}>Add Travel Log</Button>
      </div>

      <FormikContext.Provider value={formikBag}>
        <TravelLogModal ref={travelLogModalRef} handleClose={handleClose} />
      </FormikContext.Provider>

      <div>
        {memoizedTravelLogs?.map((travelLog) => (
          <div
            key={travelLog.id}
            className="my-4 overflow-hidden rounded-lg bg-white shadow-lg"
          >
            <Carousel display="sequential" className="rounded-t-lg">
              {travelLog.photos.map((photo) => (
                <CarouselItem
                  key={photo.id}
                  src={photo.photoUrl}
                  alt={`Photo ${photo.id}`}
                />
              ))}
            </Carousel>
            <div className="p-4">
              <h2 className="mb-2 text-2xl font-bold">{travelLog.title}</h2>
              <p className="mb-4 text-gray-700">{travelLog.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Visit dates:{" "}
                  {`${travelLog.visitStartDate} - ${travelLog.visitEndDate}`}
                </span>
                <span className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                  {travelLog.country.name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelLog;
