import { utilsActions } from "./slices";
import { AppDispatch, AppThunk } from "../store";

const { setAccessToken } = utilsActions;

/**
 * Sets access token upon login
 * @returns void
 */
const callSetAccessToken =
  (accessToken: string): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setAccessToken(accessToken));
  };

const actions = {
  callSetAccessToken,
};

export default actions;
