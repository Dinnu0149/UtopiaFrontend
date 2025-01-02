import axiosInstance from "../api/axiosInstance";
import { GROUP_REQUEST, GROUP_SUCCESS, GROUP_FAILURE } from "./actionTypes";

export const getGroups = () => async (dispatch) => {
  dispatch(groupsRequest());
  try {
    const response = await axiosInstance.get(`api/user/groups/`);
    const data = response?.data;

    dispatch(groupsSuccess(data));
  } catch (error) {
    if (error.response?.status === 401) {
      dispatch(groupsFailure("Your token has expired, login is required"));
    } else if (error.response?.status === 500) {
      dispatch(groupsFailure("An error occured while processing request, try again"));
    } else {
      dispatch(groupsFailure(error.response?.data));
    }
  }
};

export const groupsRequest = () => ({
  type: GROUP_REQUEST,
});

export const groupsSuccess = (response) => ({
  type: GROUP_SUCCESS,
  payload: response,
});

export const groupsFailure = (error) => ({
  type: GROUP_FAILURE,
  payload: error,
});
