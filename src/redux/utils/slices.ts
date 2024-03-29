import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { initialState } from "./data";

const utilsSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {
    setAccessToken: (state, { payload }: PayloadAction<string>) => {
      state.accessToken = payload;
    },
    setRefreshToken: (state, { payload }: PayloadAction<string>) => {
      state.refreshToken = payload;
    },
  },
});

const { actions: utilsActions, reducer: utilsReducers } = utilsSlice;

export { utilsActions, utilsReducers };
