import axiosInstance from "../api/axiosInstance";
import {
  USERADMINEVENT_REQUEST,
  USERADMINEVENT_SUCCESS,
  USERADMINEVENT_FAILURE,
  USERADMINAPPROVALUPDATE_REQUEST,
  USERADMINAPPROVALUPDATE_SUCCESS,
  USERADMINAPPROVALUPDATE_FAILURE,
  EVENTACTIVATION_REQUEST,
  EVENTACTIVATION_SUCCESS,
  EVENTACTIVATION_FAILURE,
} from "./actionTypes";

export const getEvents = (page) => async (dispatch) => {
  dispatch(userAdminEventRequest());
  try {
    const response = await axiosInstance.get("api/event/events/", {
      params: {
        page: page,
      },
    });
    const data = response?.data;

    dispatch(userAdminEventSuccess(data));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(userAdminEventFailure("Your token has expired, login is required"));
    } else if (error.response.status === 500) {
      dispatch(userAdminEventFailure("An error occured while processing request, try again"));
    } else {
      dispatch(userAdminEventFailure(error.response?.data));
    }
  }
};

export const eventApprovalUpdate = (pk) => async (dispatch) => {
  dispatch(userAdminEventApprovalRequest());
  try {
    const response = await axiosInstance.put(`api/event/approval/${pk}/`);
    const data = response?.data;

    dispatch(userAdminEventApprovalSuccess(data));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(userAdminEventApprovalFailure("Your token has expired, login is required"));
    } else if (error.response.status === 500) {
      dispatch(userAdminEventApprovalFailure("An error occured while processing request, try again"));
    } else {
      dispatch(userAdminEventApprovalFailure(error.response?.data));
    }
  }
};

export const eventActivation = (pk) => async (dispatch) => {
  dispatch(eventActivationRequest());
  try {
    const response = await axiosInstance.patch(`api/event/activation/${pk}/`);
    const message = response?.data;

    dispatch(eventActivationSuccess(message));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(eventActivationFailure("Your token has expired, login is required"));
    } else if (error.response.status === 500) {
      dispatch(eventActivationFailure("An error occured while processing request, try again"));
    } else {
      dispatch(eventActivationFailure(error.response?.data));
    }
  }
};

export const userAdminEventRequest = () => ({
  type: USERADMINEVENT_REQUEST,
});

export const userAdminEventSuccess = (response) => ({
  type: USERADMINEVENT_SUCCESS,
  payload: response,
});

export const userAdminEventFailure = (error) => ({
  type: USERADMINEVENT_FAILURE,
  payload: error,
});

export const userAdminEventApprovalRequest = () => ({
  type: USERADMINAPPROVALUPDATE_REQUEST,
});

export const userAdminEventApprovalSuccess = (response) => ({
  type: USERADMINAPPROVALUPDATE_SUCCESS,
  payload: response,
});

export const userAdminEventApprovalFailure = (error) => ({
  type: USERADMINAPPROVALUPDATE_FAILURE,
  payload: error,
});

export const eventActivationRequest = () => ({
  type: EVENTACTIVATION_REQUEST,
});

export const eventActivationSuccess = (response) => ({
  type: EVENTACTIVATION_SUCCESS,
  payload: response,
});

export const eventActivationFailure = (error) => ({
  type: EVENTACTIVATION_FAILURE,
  payload: error,
});
