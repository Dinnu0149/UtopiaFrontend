import axiosInstance from "../api/axiosInstance";
import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILURE,
  USERSTATUSUPDATE_REQUEST,
  USERSTATUSUPDATE_SUCCESS,
  USERSTATUSUPDATE_FAILURE,
  DELETEIDUSER_REQUEST,
  DELETEIDUSER_SUCCESS,
  DELETEIDUSER_FAILURE,
} from "./actionTypes";

export const getUsers = (page) => async (dispatch) => {
  dispatch(UsersRequest());
  try {
    const response = await axiosInstance.get(`api/user/users`, {
      params: {
        page: page,
      },
    });
    const data = response?.data;

    dispatch(UsersSuccess(data));
  } catch (error) {
    if (error.response?.status === 401) {
      dispatch(UsersFailure("Your token has expired, login is required"));
    } else if (error.response?.status === 500) {
      dispatch(UsersFailure("An error occured while processing request, try again"));
    } else {
      dispatch(UsersFailure(error.response?.data));
    }
  }
};

export const deleteUser = (pk) => async (dispatch) => {
  dispatch(deleteUserRequest());
  try {
    const response = await axiosInstance.delete(`api/user/users/${pk}/`);
    const status = response?.status;

    if (status === 204) {
      dispatch(deleteUserSuccess(status));
    }
  } catch (error) {
    if (error.response?.status === 401) {
      dispatch(deleteUserFailure("Your token has expired, login is required"));
    } else if (error.response?.status === 500) {
      dispatch(deleteUserFailure("An error occured while processing request, try again"));
    } else {
      dispatch(deleteUserFailure(error.response?.data));
    }
  }
};

export const UserStatusUpdate = (pk) => async (dispatch) => {
  dispatch(UserStatusRequest());
  try {
    const response = await axiosInstance.put(`api/user/user-status/${pk}/`);
    const data = response?.data;

    dispatch(UserStatusSuccess(data));
  } catch (error) {
    if (error.response?.status === 401) {
      dispatch(UserStatusFailure("Your token has expired, login is required"));
    } else if (error.response?.status === 500) {
      dispatch(UserStatusFailure("An error occured while processing request, try again"));
    } else {
      dispatch(UserStatusFailure(error.response?.data));
    }
  }
};

export const UsersRequest = () => ({
  type: USER_REQUEST,
});

export const UsersSuccess = (response) => ({
  type: USER_SUCCESS,
  payload: response,
});

export const UsersFailure = (error) => ({
  type: USER_FAILURE,
  payload: error,
});

export const UserStatusRequest = () => ({
  type: USERSTATUSUPDATE_REQUEST,
});

export const UserStatusSuccess = (response) => ({
  type: USERSTATUSUPDATE_SUCCESS,
  payload: response,
});

export const UserStatusFailure = (error) => ({
  type: USERSTATUSUPDATE_FAILURE,
  payload: error,
});


export const deleteUserRequest = () => ({
  type: DELETEIDUSER_REQUEST,
});

export const deleteUserSuccess = (response) => ({
  type: DELETEIDUSER_SUCCESS,
  payload: response,
});

export const deleteUserFailure = (error) => ({
  type: DELETEIDUSER_FAILURE,
  payload: error,
});
