import { RegisterForm } from './../pages/auth/registration/types/index';
import { onParseResponse } from "@/utils/helpers";

import type { UserForm } from "@/pages/auth/login/types";

import type { ApiResponse } from "@/types";
import type { AuthenticationDetailResponse } from "@/types/authentication";
import { dataTagSymbol } from "@tanstack/react-query";
import { ProfileForm } from '@/pages/profile/types';

export const loginAPI = async (
  values: UserForm
): Promise<ApiResponse<AuthenticationDetailResponse>> => {
  const response = await onParseResponse<AuthenticationDetailResponse>({
    method: "post",
    url: "/auth/login",
    data: values,
  });

  return response;
};

export const logoutAPI = async (): Promise<ApiResponse<unknown>> => {
  const response = await onParseResponse<unknown>({
    method: "post",
    url: "/auth/logout",
    data: null,
  });

  return response;
};

//Register User 
export const registerAPI = async (
  values: RegisterForm
): Promise<ApiResponse<unknown>> => {
  const response = await onParseResponse<unknown> ({
  method: "post",
  url: "/auth/register",
  data: values,
  });

  return response;
};


//Profile  
export const userProfileAPI = async (): Promise<ApiResponse<ProfileForm>> => {
  const response = await onParseResponse<ProfileForm> ({
  method: "get",
  url: "/profile"
  });

  return response;
};