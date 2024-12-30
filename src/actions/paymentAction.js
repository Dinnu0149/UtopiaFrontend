import axiosInstance from "../api/axiosInstance";
import {
  INITIALIZATION_FAILURE,
  INITIALIZATION_SUCCESS,
  INITIALIZATION_REQUEST,
  VERIFICATION_REQUEST,
  VERIFICATION_SUCCESS,
  VERIFICATION_FAILURE,
  CLEARPAYMENT_RESPONSE
} from "./actionTypes";

export const paymentInitialization = (formData) => async (dispatch) => {
  dispatch(initializationRequest());
  try {
    const response = await axiosInstance.post(
      `api/wallet/initialize-payment/`,
      formData
    );
    const data = response?.data;
    dispatch(initializationSuccess(data));

  } catch (error) {  
    if (error.response.status === 401) {
        dispatch(initializationFailure(error.response?.statusText));
      } else if (error.response.status === 500) {
        dispatch(initializationFailure("An error occured while processing request, try again"));
      } else {
        dispatch(initializationFailure(error.response?.data));
      }
  }
};

export const paymentVerification = (reference) => async (dispatch) => {
  dispatch(verificationRequest());
  try {
    const response = await axiosInstance.get(`api/wallet/verify-payment/`, {
      params: {
        reference: reference,
      },
    });
    const data = response?.data;

    dispatch(verificationSuccess(data));
  } catch (error) {
    if (error.response.status === 401) {
        dispatch(verificationFailure("Your token has expired, login is required"));
      } else if (error.response.status === 500) {
        dispatch(verificationFailure("An error occured while processing request, try again"));
      } else {
        dispatch(verificationFailure(error.response?.data));
      }
  }
};

export const initializationRequest = () => ({
  type: INITIALIZATION_REQUEST,
});

export const initializationSuccess = (response) => ({
  type: INITIALIZATION_SUCCESS,
  payload: response,
});

export const initializationFailure = (error) => ({
  type: INITIALIZATION_FAILURE,
  payload: error,
});

export const verificationRequest = () => ({
  type: VERIFICATION_REQUEST,
});

export const verificationSuccess = (response) => ({
  type: VERIFICATION_SUCCESS,
  payload: response,
});

export const verificationFailure = (error) => ({
  type: VERIFICATION_FAILURE,
  payload: error,
});

export const clearPaymentResponse = (error) => ({
    type: CLEARPAYMENT_RESPONSE,
    payload: error,
  });
