import axios, { AxiosInstance } from "axios";

import { store } from "@/redux/store";

const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.utils.accessToken;

    if (token && config?.headers)
      config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { instance };
