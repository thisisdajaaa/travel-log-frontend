import { utilsActions } from "./slices";
import { AppDispatch, AppThunk } from "../store";

const { setAccessToken, setRefreshToken } = utilsActions;

/**
 * Sets access token upon login
 * @returns void
 */
const callSetAccessToken =
  (accessToken: string): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setAccessToken(accessToken));
  };

/**
 * Sets refresh token upon login
 * @returns void
 */
const callSetRefreshToken =
  (refreshToken: string): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setRefreshToken(refreshToken));
  };

const actions = {
  callSetAccessToken,
  callSetRefreshToken,
};

export default actions;
