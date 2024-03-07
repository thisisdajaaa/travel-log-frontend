export type ProfileRequest = {
  firstName: string;
  lastName: string;
  middleName: string;
  sex: string;
  profilePhoto?: string;
  coverPhoto?: string;
  birthDate: string;
  username: string;
  email: string;
  countryId: number;
  addressOne: string;
  addressTwo: string;
  city: string;
  state: string;
  zipcode: string;
};

export type ProfileDetailResponse = {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  sex: string;
  profilePhoto: string;
  coverPhoto: string;
  birthDate: string;
  username: string;
  email: string;
  addressDetail: AddressDetailResponse;
};

export type AddressDetailResponse = {
  addressOne: string;
  addressTwo: string;
  city: string;
  state: string;
  zipcode: string;
  country: CountryResponse;
};

export type CountryResponse = {
  id: number;
  code: string;
  name: string;
};
