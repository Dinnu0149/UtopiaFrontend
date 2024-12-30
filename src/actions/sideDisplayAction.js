import axiosInstance from "../api/axiosInstance";
import {
  SIDEDISPLAY_REQUEST,
  SIDEDISPLAY_SUCCESS,
  SIDEDISPLAY_FAILURE,
} from "./actionTypes";

export const getSideDisplay = () => async (dispatch) => {
    dispatch(sideDisaplayRequest());
    try {
      const response = await axiosInstance.get(`api/user/side-display/`);
      const data = response?.data;
  
      dispatch(sideDisaplaySuccess(data));
    } catch (error) {
        if (error.response.status === 401) {
            dispatch(sideDisaplayFailure("Your token has expired, login is required"));
          } else if (error.response.status === 500) {
            dispatch(sideDisaplayFailure("An error occured while processing request, try again"));
          } else {
            dispatch(sideDisaplayFailure(error.response?.data));
          }
    }
  };

  export const sideDisaplayRequest = () => ({
    type: SIDEDISPLAY_REQUEST,
  });
  
  export const sideDisaplaySuccess = (response) => ({
    type: SIDEDISPLAY_SUCCESS,
    payload: response,
  });
  
  export const sideDisaplayFailure = (error) => ({
    type: SIDEDISPLAY_FAILURE,
    payload: error,
  });