import axiosInstance from "../api/axiosInstance";
import { updateUserProfileItemOperation, logoutOpreation, updateUserProfileItem } from "./authActions";
import {
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
  EDITPROFILE_REQUEST,
  EDITPROFILE_SUCCESS,
  EDITPROFILE_FAILURE,
  CLEAR_UPDATE_RESPONSE,
  DELETEUSER_REQUEST,
  DELETEUSER_SUCCESS,
  DELETEUSER_FAILURE,
  SETTING_REQUEST,
  SETTING_SUCCESS,
  SETTING_FAILURE,
  EDITSETTING_REQUEST,
  EDITSETTING_SUCCESS,
  EDITSETTING_FAILURE,
  CLEAR_SETTING_RESPONSE
} from "./actionTypes";

export const getUserProfile = () => async (dispatch) => {
  dispatch(profileRequest());
  try {
    const response = await axiosInstance.get("api/user/profile/");
    const message = response?.data;

    dispatch(profileSuccess(message));
  } catch (error) {
    if (error.response?.status === 401) {
      dispatch(profileFailure("Your token has expired, login is required"));
    } else if (error.response?.status === 500) {
      dispatch(profileFailure("An error occured while processing request, try again"));
    } else {
      dispatch(profileFailure(error.response?.data));
    }
  }
};

export const editUserProfile = (editedData) => async (dispatch) => {
  dispatch(editProfileRequest());
  try {
    const response = await axiosInstance.put("api/user/update/", editedData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const message = response?.data;

    dispatch(editProfileSuccess(message));
    dispatch(updateUserProfileItemOperation(message));
  } catch (error) {
    if (error.response?.status === 401) {
      dispatch(editProfileFailure("Your token has expired, login is required"));
    } else if (error.response?.status === 500) {
      dispatch(editProfileFailure("An error occured while processing request, try again"));
    } else {
      dispatch(editProfileFailure(error.response?.data));
    }
  }
};

export const deleteUserProfile = () => async (dispatch) => {
  dispatch(deleteRequest());
  try {
    const response = await axiosInstance.delete("api/user/delete/");
    const message = response?.data;
    
    dispatch(deleteSuccess(message));
    dispatch(logoutOpreation());
  } catch (error) {
    if (error.response?.status === 401) {
      dispatch(deleteFailure("Your token has expired, login is required"));
    } else if (error.response?.status === 500) {
      dispatch(deleteFailure("An error occured while processing request, try again"));
    } else {
      dispatch(deleteFailure(error.response?.data));
    }
  }
};

export const getUserSetting = () => async (dispatch) => {
  dispatch(SettingRequest());
  try {
    const response = await axiosInstance.get("api/user/settings/");
    const data = response?.data;

    dispatch(SettingSuccess(data));
  } catch (error) {
    if (error.response?.status === 401) {
      dispatch(SettingFailure("Your token has expired, login is required"));
    } else if (error.response?.status === 500) {
      dispatch(SettingFailure("An error occured while processing request, try again"));
    } else {
      dispatch(SettingFailure(error.response?.data));
    }
  }
};

export const editUserSetting = (editedData) => async (dispatch) => {
  dispatch(editSettingRequest());
  try {
    const response = await axiosInstance.put("api/user/settings/", editedData);
    const data = response?.data;

    dispatch(editSettingSuccess(data)); 

    let existing = localStorage.getItem("eventUser");
    existing = existing ? JSON.parse(existing) : {};  

    existing["dark_mode"] = data?.dark_mode;
    existing["location"].to_filter = existing["location"] ? data?.filter_location_events : null;

    dispatch(updateUserProfileItem('dark_mode', data?.dark_mode));
    dispatch(updateUserProfileItem('location', existing["location"]));

    localStorage.setItem("eventUser", JSON.stringify(existing));

  } catch (error) {
    if (error.response?.status === 401) {
      dispatch(editSettingFailure("Your token has expired, login is required"));
    } else if (error.response?.status === 500) {
      dispatch(editSettingFailure("An error occured while processing request, try again"));
    } else {
      dispatch(editSettingFailure(error.response?.data));
    }
  }
};

export const profileRequest = () => ({
  type: PROFILE_REQUEST,
});

export const profileSuccess = (response) => ({
  type: PROFILE_SUCCESS,
  payload: response,
});

export const profileFailure = (error) => ({
  type: PROFILE_FAILURE,
  payload: error,
});

export const editProfileRequest = () => ({
  type: EDITPROFILE_REQUEST,
});

export const editProfileSuccess = (response) => ({
  type: EDITPROFILE_SUCCESS,
  payload: response,
});

export const editProfileFailure = (error) => ({
  type: EDITPROFILE_FAILURE,
  payload: error,
});

export const clearUpdateResponse = () => ({
  type: CLEAR_UPDATE_RESPONSE,
});

export const deleteRequest = () => ({
  type: DELETEUSER_REQUEST,
});

export const deleteSuccess = (response) => ({
  type: DELETEUSER_SUCCESS,
  payload: response,
});

export const deleteFailure = (error) => ({
  type: DELETEUSER_FAILURE,
  payload: error,
});

export const SettingRequest = () => ({
  type: SETTING_REQUEST,
});

export const SettingSuccess = (response) => ({
  type: SETTING_SUCCESS,
  payload: response,
});

export const SettingFailure = (error) => ({
  type: SETTING_FAILURE,
  payload: error,
});

export const editSettingRequest = () => ({
  type: EDITSETTING_REQUEST,
});

export const editSettingSuccess = (response) => ({
  type: EDITSETTING_SUCCESS,
  payload: response,
});

export const editSettingFailure = (error) => ({
  type: EDITSETTING_FAILURE,
  payload: error,
});

export const clearSettingResponse = () => ({
  type: CLEAR_SETTING_RESPONSE,
});
