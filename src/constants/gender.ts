import { Option } from "@/types/client";

export const genderList: Option[] = [
  {
    label: "Male",
    value: "MALE",
  },
  {
    label: "Female",
    value: "FEMALE",
  },
  {
    label: "Other",
    value: "OTHER",
  },
];

export const getGenderListValues = (): string[] =>
  genderList.map(({ value }) => value);
