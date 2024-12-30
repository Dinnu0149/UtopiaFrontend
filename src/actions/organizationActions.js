import axiosInstance from "../api/axiosInstance";
import {
  ORGANIZATION_REQUEST,
  ORGANIZATION_SUCCESS,
  ORGANIZATION_FAILURE,
  EDITORGANIZATION_REQUEST,
  EDITORGANIZATION_SUCCESS,
  EDITORGANIZATION_FAILURE,
  CLEAR_ORGANIZATIONUPDATE_RESPONSE,
  ORGANIZATION_GETWITHDRAWALINFO_FAILURE,
  ORGANIZATION_GETWITHDRAWALINFO_SUCCESS,
  ORGANIZATION_GETWITHDRAWALINFO_REQUEST,
  ORGANIZATION_EDITWITHDRAWALINFO_FAILURE,
  ORGANIZATION_EDITWITHDRAWALINFO_SUCCESS,
  ORGANIZATION_EDITWITHDRAWALINFO_REQUEST,
} from "./actionTypes";
import { updateUserProfileItem } from "./authActions";

export const getOrganizationProfile = (organizer_id) => async (dispatch) => {
  dispatch(organizationRequest());
  try {
    const response = await axiosInstance.get(`api/user/organization/${organizer_id}`);
    const message = response?.data;

    dispatch(organizationSuccess(message));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(organizationFailure("Your token has expired, login is required"));
    } else if (error.response.status === 500) {
      dispatch(organizationFailure("An error occured while processing request, try again"));
    } else {
      dispatch(organizationFailure(error.response?.data));
    }
  }
};

export const editOrganizationProfile = (editedData) => async (dispatch) => {
  dispatch(editOrganizationRequest());
  try {
    const response = await axiosInstance.put(
      `api/user/organization/update/`,
      editedData
    );
    const message = response?.data;

    let existing = localStorage.getItem("eventUser");
    existing = existing ? JSON.parse(existing) : {};

    if (existing.is_new_user) {
      dispatch(updateUserProfileItem("is_new_user", null));

      existing["is_new_user"] = null;
      localStorage.setItem("eventUser", JSON.stringify(existing));
    }

    dispatch(editOrganizationSuccess(message));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(editOrganizationFailure("Your token has expired, login is required"));
    } else if (error.response.status === 500) {
      dispatch(editOrganizationFailure("An error occured while processing request, try again"));
    } else {
      dispatch(editOrganizationFailure(error.response?.data));
    }
  }
};

export const getOrganizationWithdrawalInfo = () => async (dispatch) => {
  dispatch(organizationGetWithdrawalRequest());
  try {
    const response = await axiosInstance.get(`api/wallet/withdrawal-info/`);
    const message = response?.data;
    
    dispatch(organizationGetWithdrawalSuccess(message));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(organizationGetWithdrawalFailure("Your token has expired, login is required"));
    } else if (error.response.status === 500) {
      dispatch(organizationGetWithdrawalFailure("An error occured while processing request, try again"));
    } else {
      dispatch(organizationGetWithdrawalFailure(error.response?.data));
    }
  }
};

export const updateOrganizationWithdrawalInfo = (editedData) => async (dispatch) => {
  dispatch(organizationEditWithdrawalRequest());
  try {
    const response = await axiosInstance.put(`api/wallet/withdrawal-info/`, editedData);
    const message = response?.data;

    dispatch(organizationEditWithdrawalSuccess(message));

  } catch (error) {
    if (error.response.status === 401) {
      dispatch(organizationEditWithdrawalFailure("Your token has expired, login is required"));
    } else if (error.response.status === 500) {
      dispatch(organizationEditWithdrawalFailure("An error occured while processing request, try again"));
    } else {
      dispatch(organizationEditWithdrawalFailure(error.response?.data));
    }
  }
};

export const organizationRequest = () => ({
  type: ORGANIZATION_REQUEST,
});

export const organizationSuccess = (response) => ({
  type: ORGANIZATION_SUCCESS,
  payload: response,
});

export const organizationFailure = (error) => ({
  type: ORGANIZATION_FAILURE,
  payload: error,
});

export const editOrganizationRequest = () => ({
  type: EDITORGANIZATION_REQUEST,
});

export const editOrganizationSuccess = (response) => ({
  type: EDITORGANIZATION_SUCCESS,
  payload: response,
});

export const editOrganizationFailure = (error) => ({
  type: EDITORGANIZATION_FAILURE,
  payload: error,
});

export const clearOrganizationUpdateResponse = () => ({
  type: CLEAR_ORGANIZATIONUPDATE_RESPONSE,
});

export const organizationGetWithdrawalRequest = () => ({
  type: ORGANIZATION_GETWITHDRAWALINFO_REQUEST,
});

export const organizationGetWithdrawalSuccess = (response) => ({
  type: ORGANIZATION_GETWITHDRAWALINFO_SUCCESS,
  payload: response,
});

export const organizationGetWithdrawalFailure = (error) => ({
  type: ORGANIZATION_GETWITHDRAWALINFO_FAILURE,
  payload: error,
});

export const organizationEditWithdrawalRequest = () => ({
  type: ORGANIZATION_EDITWITHDRAWALINFO_REQUEST,
});

export const organizationEditWithdrawalSuccess = (response) => ({
  type: ORGANIZATION_EDITWITHDRAWALINFO_SUCCESS,
  payload: response,
});

export const organizationEditWithdrawalFailure = (error) => ({
  type: ORGANIZATION_EDITWITHDRAWALINFO_FAILURE,
  payload: error,
});
