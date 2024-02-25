import { initialState } from "./data";
import { RootState } from "../store";

const accessToken = (state: RootState) =>
  state.utils.accessToken || initialState.accessToken;

const refreshToken = (state: RootState) =>
  state.utils.refreshToken || initialState.refreshToken;

const selectors = {
  accessToken,
  refreshToken,
};

export default selectors;
