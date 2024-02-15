import { initialState } from "./data";
import { RootState } from "../store";

const accessToken = (state: RootState) =>
  state.utils.accessToken || initialState.accessToken;

const selectors = {
  accessToken,
};

export default selectors;
