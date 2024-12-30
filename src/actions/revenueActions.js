import axiosInstance from "../api/axiosInstance";
import {
  REVENUE_REQUEST,
  REVENUE_SUCCESS,
  REVENUE_FAILURE,
  DELETEREVENUE_REQUEST,
  DELETEREVENUE_SUCCESS,
  DELETEREVENUE_FAILURE,
} from "./actionTypes";

export const getRevenues = (page) => async (dispatch) => {
    dispatch(RevenuesRequest());
    try {
      const response = await axiosInstance.get(`api/event/revenues`, {
        params: {
          page: page,
        },
      });
      const data = response?.data;
  
      dispatch(RevenuesSuccess(data));
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(RevenuesFailure("Your token has expired, login is required"));
      } else if (error.response.status === 500) {
        dispatch(RevenuesFailure("An error occured while processing request, try again"));
      } else {
        dispatch(RevenuesFailure(error.response?.data));
      }
    }
  };

export const deleteRevenue = (pk) => async (dispatch) => {
    dispatch(deleteRevenuesRequest());
    try {
      const response = await axiosInstance.delete(`api/event/revenue/${pk}/`);
      const status = response?.status;
  
      if (status === 204) {
        dispatch(deleteRevenuesSuccess(status));
      }
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(deleteRevenuesFailure("Your token has expired, login is required"));
      } else if (error.response.status === 500) {
        dispatch(deleteRevenuesFailure("An error occured while processing request, try again"));
      } else {
        dispatch(deleteRevenuesFailure(error.response?.data));
      }
    }
  };

export const RevenuesRequest = () => ({
    type: REVENUE_REQUEST,
  });
  
  export const RevenuesSuccess = (response) => ({
    type: REVENUE_SUCCESS,
    payload: response,
  });
  
  export const RevenuesFailure = (error) => ({
    type: REVENUE_FAILURE,
    payload: error,
  });
  
  export const deleteRevenuesRequest = () => ({
    type: DELETEREVENUE_REQUEST,
  });
  
  export const deleteRevenuesSuccess = (response) => ({
    type: DELETEREVENUE_SUCCESS,
    payload: response,
  });
  
  export const deleteRevenuesFailure = (error) => ({
    type: DELETEREVENUE_FAILURE,
    payload: error,
  });