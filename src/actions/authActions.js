import axiosInstance, { plainAxiosInstance } from "../api/axiosInstance";
import { jwtDecode } from "jwt-decode";
import { setRefreshTokenInCookie, getRefreshTokenFromCookie } from "../utils/refreshTokenFromCookie";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GOOGLE_FAILURE,
  GOOGLE_SUCCESS,
  GOOGLE_REQUEST,
  LOGOUT,
  SET_USER,
  UPDATE_USER_PROFILE_ITEM,
  REFRESH_TOKEN,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_REQUEST,
  FORGETPASSWORD_REQUEST,
  FORGETPASSWORD_SUCCESS,
  RESETPASSWORD_REQUEST,
  RESETPASSWORD_SUCCESS,
  RESETPASSWORD_FAILURE,
  CHANGEPASSWORD_REQUEST,
  CHANGEPASSWORD_SUCCESS,
  CHANGEPASSWORD_FAILURE,
  CHANGEUSERPASSWORD_REQUEST,
  CHANGEUSERPASSWORD_SUCCESS,
  CHANGEUSERPASSWORD_FAILURE,
  CLEAR_AUTHRESPONSE,
} from "./actionTypes";

export const signup = (formData) => async (dispatch) => {
  dispatch(signupRequest());
  try {
    const response = await plainAxiosInstance.post("api/user/signup/", formData);
    const user = response?.data;

    dispatch(signupSuccess(user));

    const loginFormData = {
      username: formData.username,
      password: formData.password,
    };

    await dispatch(login(loginFormData));
  } catch (error) {
    dispatch(signupFailure(error.response?.data));
  }
};

export const login = (formData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await plainAxiosInstance.post("api/user/login/", formData);
    const { access, refresh } = response?.data;
    const decodedUser = jwtDecode(access);

    dispatch(loginSuccess(access));
    dispatch(setUser(decodedUser.custom_data));
    setRefreshTokenInCookie(refresh);
    
    localStorage.setItem("eventUser", JSON.stringify(decodedUser.custom_data));
  } catch (error) {
    dispatch(loginFailure(error.response?.data));
  }
};

export const googleAuth = (initialResponse) => async (dispatch) => {
  dispatch(googleRequest());  
  const token = initialResponse?.credential;
  try {
    const response = await plainAxiosInstance.post("api/auth/google/", {
      credential: token,
    });
    const { access, refresh } = response?.data;
    const decodedUser = jwtDecode(access);

    dispatch(loginSuccess(access));
    dispatch(setUser(decodedUser.custom_data));
    setRefreshTokenInCookie(refresh);

    localStorage.setItem("eventUser", JSON.stringify(decodedUser.custom_data));
  } catch (error) {
    dispatch(loginFailure(error.response?.data));
  }
};

export const logoutOpreation = () => async (dispatch) => {
  try {
    const response = await plainAxiosInstance.post("api/user/logout/", {
      refresh_token: getRefreshTokenFromCookie()
    });
    const message = response?.data;    

    localStorage.removeItem("eventUser");
    dispatch(logout());

  } catch (error) {
    console.log(error);
  }

};

export const forgetPasswordOpreation = (email) => async (dispatch) => {
  dispatch(forgetPasswordRequest());
  try {
    const response = await axiosInstance.post("api/user/request-reset-email/", {
      email: email,
    });
    const message = response?.data;

    dispatch(forgetPasswordSuccess(message));
  } catch (error) {
    console.log(error);
  }
};

export const resetPasswordOpreation = (data) => async (dispatch) => {
  dispatch(resetPasswordRequest());
  try {
    const response = await axiosInstance.patch(
      "api/user/password-reset-complete/",
      data
    );
    const message = response?.data;

    dispatch(resetPasswordSuccess(message));
  } catch (error) {
    dispatch(resetPasswordFailure(error.response?.data));
  }
};

export const changePasswordOpreation = (formData) => async (dispatch) => {
  dispatch(changePasswordRequest());
  try {
    const response = await axiosInstance.patch(
      "api/user/change-password/",
      formData
    );
    const message = response?.data;
    
    dispatch(changePasswordSuccess(message));
  } catch (error) {
    if (error.response.status == 401) {
      dispatch(changePasswordFailure("Your token has expired, login is required"));
    } else if (error.response.status == 500) {
      dispatch(changePasswordFailure("An error occured while processing request, try again"));
    } else {
      dispatch(changePasswordFailure(error.response?.data));
    }
  }
};

export const adminChangeUserPasswordOpreation = (formData, pk) => async (dispatch) => {
  dispatch(changeUserPasswordRequest());
  try {
    const response = await axiosInstance.patch(
      `api/user/change-user-password/${pk}/`,
      formData
    );
    
    const message = response?.data;
    dispatch(changeUserPasswordSuccess(message));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(changeUserPasswordFailure("Your token has expired, login is required"));
    } else if (error.response.status === 500) {
      dispatch(changeUserPasswordFailure("An error occured while processing request, try again"));
    } else {
      dispatch(changeUserPasswordFailure(error.response?.data));
    }
  }
};

export const updateUserProfileItemOperation = (data) => async (dispatch) => {
  dispatch(updateUserProfileItem("username", data?.username));
  dispatch(updateUserProfileItem("profile_picture", data?.profile_picture));


  let existing = localStorage.getItem("eventUser");
  existing = existing ? JSON.parse(existing) : {};

  existing["username"] = data?.username;
  existing["profile_picture"] = data?.profile_picture;
  existing["location"].state = existing["location"] ? data?.state : null;
  existing["location"].city = existing["location"] ? data?.city : null;

  dispatch(updateUserProfileItem("location", existing["location"]));

  localStorage.setItem("eventUser", JSON.stringify(existing));
};

export const googleRequest = () => ({
  type: GOOGLE_REQUEST,
});

export const googleSuccess = (response) => ({
  type: GOOGLE_SUCCESS,
  payload: response,
});

export const googleFailure = (error) => ({
  type: GOOGLE_FAILURE,
  payload: error,
});

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (accessToken) => ({
  type: LOGIN_SUCCESS,
  payload: accessToken,
});

export const setUser = (decodedUser) => ({
  type: SET_USER,
  payload: decodedUser,
});

export const updateUserProfileItem = (key, value) => ({
  type: UPDATE_USER_PROFILE_ITEM,
  payload: { key, value },
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});

export const refreshToken = (accessToken) => ({
  type: REFRESH_TOKEN,
  payload: accessToken,
});

export const signupRequest = () => ({
  type: SIGNUP_REQUEST,
});

export const signupSuccess = (accessToken) => ({
  type: SIGNUP_SUCCESS,
  payload: accessToken,
});

export const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: error,
});

export const forgetPasswordRequest = () => ({
  type: FORGETPASSWORD_REQUEST,
});

export const forgetPasswordSuccess = (response) => ({
  type: FORGETPASSWORD_SUCCESS,
  payload: response,
});

export const resetPasswordRequest = () => ({
  type: RESETPASSWORD_REQUEST,
});

export const resetPasswordSuccess = (response) => ({
  type: RESETPASSWORD_SUCCESS,
  payload: response,
});

export const resetPasswordFailure = (response) => ({
  type: RESETPASSWORD_FAILURE,
  payload: response,
});

export const changePasswordRequest = () => ({
  type: CHANGEPASSWORD_REQUEST,
});

export const changePasswordSuccess = (response) => ({
  type: CHANGEPASSWORD_SUCCESS,
  payload: response,
});

export const changePasswordFailure = (error) => ({
  type: CHANGEPASSWORD_FAILURE,
  payload: error,
});

export const changeUserPasswordRequest = () => ({
  type: CHANGEUSERPASSWORD_REQUEST,
});

export const changeUserPasswordSuccess = (response) => ({
  type: CHANGEUSERPASSWORD_SUCCESS,
  payload: response,
});

export const changeUserPasswordFailure = (error) => ({
  type: CHANGEUSERPASSWORD_FAILURE,
  payload: error,
});

export const clearAuthResponse = () => ({
  type: CLEAR_AUTHRESPONSE,
});
