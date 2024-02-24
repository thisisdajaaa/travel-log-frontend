import type { ProfileForm } from "../types";

export const initialProfileForm: ProfileForm = {
  firstName: "",
  middleName: "",
  lastName: "",
  username: "",
  email: "",
  address1: "",
  address2: "",
  birthday: { startDate: null, endDate: null },
  city: "",
  country: "",
  gender: "",
  state: "",
  zipCode: "",
};
