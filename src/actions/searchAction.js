import axiosInstance from "../api/axiosInstance";
import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
} from "./actionTypes";

export const search = (formData) => async (dispatch) => {
    dispatch(searchRequest());
    try {
      const response = await axiosInstance.post(
        `api/user/search/`,
        formData
      );
      const data = response?.data;    
      dispatch(searchSuccess(data))
    } catch (error) {
        if (error.response?.status === 401) {
            dispatch(searchFailure("Your token has expired, login is required"));
          } else if (error.response?.status === 500) {
            dispatch(searchFailure("An error occured while processing request, try again"));
          } else {
            dispatch(searchFailure(error.response?.data));
          }
    }
  };
  
  
  export const searchRequest = () => ({
    type: SEARCH_REQUEST,
  });
  
  export const searchSuccess = (response) => ({
    type: SEARCH_SUCCESS,
    payload: response,
  });
  
  export const searchFailure = (error) => ({
    type: SEARCH_FAILURE,
    payload: error,
  });