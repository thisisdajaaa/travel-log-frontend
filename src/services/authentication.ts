import axios from "axios";

import { onParseResponse } from "@/utils/helpers";
import logger from "@/utils/logger";

import type { LoginForm } from "@/pages/auth/login/types";
import { RegisterForm } from "@/pages/auth/registration/types";
import { ProfileForm } from "@/pages/profile/types";

import { store } from "@/redux/store";
import { actions } from "@/redux/utils";

import type { AuthenticationDetailResponse } from "@/types/server/authentication";
import type { ApiResponse } from "@/types/server/config";

export const refreshToken = async (): Promise<string> => {
  try {
    const state = store.getState();
    const refreshToken = state.utils.refreshToken;

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data;
    store.dispatch(actions.callSetAccessToken(accessToken));
    store.dispatch(actions.callSetRefreshToken(newRefreshToken));

    return accessToken;
  } catch (error) {
    logger(error);
    throw error;
  }
};

export const loginAPI = async (
  values: LoginForm
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
  values: Partial<RegisterForm>
): Promise<ApiResponse<unknown>> => {
  const response = await onParseResponse<unknown>({
    method: "post",
    url: "/auth/register",
    data: values,
  });

  return response;
};

//Profile
export const userProfileAPI = async (): Promise<ApiResponse<ProfileForm>> => {
  const response = await onParseResponse<ProfileForm>({
    method: "get",
    url: "/profile",
  });

  return response;
};
