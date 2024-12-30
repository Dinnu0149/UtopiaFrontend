import axiosInstance from "../api/axiosInstance";
import {
  DASHBOARD_REQUEST,
  DASHBOARD_SUCCESS,
  DASHBOARD_FAILURE,
} from "./actionTypes";

export const getDashboardData = () => async (dispatch) => {
    dispatch(dashboardRequest());
    try {
      const response = await axiosInstance.get(`api/user/dashboard/`);
      
      const data = response?.data;      
      dispatch(dashboardSuccess(data));
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(dashboardFailure("Your token has expired, login is required"));
      } else if (error.response.status === 500) {
        dispatch(dashboardFailure("An error occured while processing request, try again"));
      } else {
        dispatch(dashboardFailure(error.response?.data));
      }
    }
  };


export const dashboardRequest = () => ({
    type: DASHBOARD_REQUEST,
  });
  
  export const dashboardSuccess = (response) => ({
    type: DASHBOARD_SUCCESS,
    payload: response,
  });
  
  export const dashboardFailure = (error) => ({
    type: DASHBOARD_FAILURE,
    payload: error,
  });