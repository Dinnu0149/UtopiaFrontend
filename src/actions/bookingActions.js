import axiosInstance from "../api/axiosInstance";
import {
  BOOKING_REQUEST,
  BOOKING_SUCCESS,
  BOOKING_FAILURE,
  DETAILBOOKING_REQUEST,
  DETAILBOOKING_SUCCESS,
  DETAILBOOKING_FAILURE,
  DELETEBOOKING_REQUEST,
  DELETEBOOKING_SUCCESS,
  DELETEBOOKING_FAILURE,
  VERIFYBOOKING_REQUEST,
  VERIFYBOOKING_SUCCESS,
  VERIFYBOOKING_FAILURE,
  REGISTERBOOKING_REQUEST,
  REGISTERBOOKING_SUCCESS,
  REGISTERBOOKING_FAILURE,
} from "./actionTypes";


export const getBookings = (page) => async (dispatch) => {
  dispatch(BookingsRequest());
  try {
    const response = await axiosInstance.get(`api/event/bookings`, {
      params: {
        page: page,
      },
    });
    const data = response?.data;

    dispatch(BookingsSuccess(data));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(BookingsFailure("Your token has expired, login is required"));
    } else if (error.response.status === 500) {
      dispatch(BookingsFailure("An error occured while processing request, try again"));
    } else {
      dispatch(BookingsFailure(error.response?.data));
    }
  }
};

export const getBooking = (pk) => async (dispatch) => {
  dispatch(getBookingRequest());
  try {
    const response = await axiosInstance.get(`api/event/booking/${pk}`);
    const data = response?.data;    
    
    dispatch(getBookingSuccess(data))
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(getBookingFailure("Your token has expired, login is required"));
    } else if (error.response.status === 500) {
      dispatch(getBookingFailure("An error occured while processing request, try again"));
    } else {
      dispatch(getBookingFailure(error.response?.data));
    }
  }
};


export const deleteBooking = (pk) => async (dispatch) => {
  dispatch(deleteBookingsRequest());
  try {
    const response = await axiosInstance.delete(`api/event/booking/${pk}/`);
    const status = response?.status;

    if (status === 204) {
      dispatch(deleteBookingsSuccess(status));
    }
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(deleteBookingsFailure("Your token has expired, login is required"));
    } else if (error.response.status === 500) {
      dispatch(deleteBookingsFailure("An error occured while processing request, try again"));
    } else {
      dispatch(deleteBookingsFailure(error.response?.data));
    }
  }
};

export const verifyBooking = (pk) => async (dispatch) => {
  dispatch(verifyBookingRequest());
  try {
    const response = await axiosInstance.get(`api/event/booking/${pk}/verify`);
    const data = response?.data;    
    
    dispatch(verifyBookingSuccess(data))
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(verifyBookingFailure("Your token has expired, login is required"));
    } else if (error.response.status === 500) {
      dispatch(verifyBookingFailure("An error occured while processing request, try again"));
    } else {
      dispatch(verifyBookingFailure(error.response?.data));
    }    
  }
};

export const registerBooking = (pk) => async (dispatch) => {
  dispatch(registerBookingRequest());
  const formdata = {
    status: 'used'
  }
  try {
    const response = await axiosInstance.put(
      `api/event/booking/${pk}/verify/`,
      formdata
    );
    const data = response?.data;    
    
    dispatch(registerBookingSuccess(data))
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(registerBookingFailure("Your token has expired, login is required"));
    } else if (error.response.status === 500) {
      dispatch(registerBookingFailure("An error occured while processing request, try again"));
    } else {
      dispatch(registerBookingFailure(error.response?.data));
    }
  }
};


export const BookingsRequest = () => ({
  type: BOOKING_REQUEST,
});

export const BookingsSuccess = (response) => ({
  type: BOOKING_SUCCESS,
  payload: response,
});

export const BookingsFailure = (error) => ({
  type: BOOKING_FAILURE,
  payload: error,
});

export const getBookingRequest = () => ({
  type: DETAILBOOKING_REQUEST,
});

export const getBookingSuccess = (response) => ({
  type: DETAILBOOKING_SUCCESS,
  payload: response,
});

export const getBookingFailure = (error) => ({
  type: DETAILBOOKING_FAILURE,
  payload: error,
});


export const deleteBookingsRequest = () => ({
  type: DELETEBOOKING_REQUEST,
});

export const deleteBookingsSuccess = (response) => ({
  type: DELETEBOOKING_SUCCESS,
  payload: response,
});

export const deleteBookingsFailure = (error) => ({
  type: DELETEBOOKING_FAILURE,
  payload: error,
});

export const verifyBookingRequest = () => ({
  type: VERIFYBOOKING_REQUEST,
});

export const verifyBookingSuccess = (response) => ({
  type: VERIFYBOOKING_SUCCESS,
  payload: response,
});

export const verifyBookingFailure = (error) => ({
  type: VERIFYBOOKING_FAILURE,
  payload: error,
});

export const registerBookingRequest = () => ({
  type: REGISTERBOOKING_REQUEST,
});

export const registerBookingSuccess = (response) => ({
  type: REGISTERBOOKING_SUCCESS,
  payload: response,
});

export const registerBookingFailure = (error) => ({
  type: REGISTERBOOKING_FAILURE,
  payload: error,
});
