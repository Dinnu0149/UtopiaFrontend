import axiosInstance from "../api/axiosInstance";
import {
  REVIEW_REQUEST,
  REVIEW_SUCCESS,
  REVIEW_FAILURE,
  CREATEREVIEW_REQUEST,
  CREATEREVIEW_SUCCESS,
  CLEARCREATEREVIEW_RESPONSE,
  CREATEREVIEW_FAILURE,
} from "./actionTypes";

export const getEventReviews = (pk) => async (dispatch) => {
    dispatch(eventReviewsRequest());
    try {
      const response = await axiosInstance.get(`api/event/${pk}/reviews/list/`);
      const data = response?.data;
  
      dispatch(eventReviewsSuccess(data));
    } catch (error) {
      if (error.response?.status === 401) {
        dispatch(eventReviewsFailure("Your token has expired, login is required"));
      } else if (error.response?.status === 500) {
        dispatch(eventReviewsFailure("An error occured while processing request, try again"));
      } else {
        dispatch(eventReviewsFailure(error.response?.data));
      }
    }
  };


  export const createReview = (event_id, formdata) => async (dispatch) => {
    dispatch(createReviewRequest());
    try {
      const response = await axiosInstance.post(
        `api/event/${event_id}/reviews/`,
        formdata
      );
      const event = response?.data;

      dispatch(createReviewSuccess(event));
    } catch (error) {
      if (error.response?.status === 401) {
        dispatch(createReviewFailure("Your token has expired, login is required"));
      } else if (error.response?.status === 500) {
        dispatch(createReviewFailure("An error occured while processing request, try again"));
      } else {
        dispatch(createReviewFailure(error.response?.data));
      }
    }
  };

export const eventReviewsRequest = () => ({
    type: REVIEW_REQUEST,
  });
  
  export const eventReviewsSuccess = (response) => ({
    type: REVIEW_SUCCESS,
    payload: response,
  });
  
  export const eventReviewsFailure = (error) => ({
    type: REVIEW_FAILURE,
    payload: error,
  });
  
  export const createReviewRequest = () => ({
    type: CREATEREVIEW_REQUEST,
  });
  
  export const createReviewSuccess = (response) => ({
    type: CREATEREVIEW_SUCCESS,
    payload: response,
  });
  
  export const clearCreateReviewResponse = () => ({
    type: CLEARCREATEREVIEW_RESPONSE,
  });
  
  export const createReviewFailure = (error) => ({
    type: CREATEREVIEW_FAILURE,
    payload: error,
  });