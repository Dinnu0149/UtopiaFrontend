import axiosInstance from "../api/axiosInstance";
import {
  FAVORITE_REQUEST,
  FAVORITE_SUCCESS,
  FAVORITE_FAILURE,
  UPDATEFAVORITE_REQUEST,
  UPDATEFAVORITE_SUCCESS,
  UPDATEFAVORITE_FAILURE,
} from "./actionTypes";

export const getUserFavoriteItems = () => async (dispatch) => {
  dispatch(favoriteRequest());
  try {
    const response = await axiosInstance.get(`api/user/favorites/`);
    const data = response?.data;

    dispatch(favoriteSuccess(data));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(favoriteFailure("Your token has expired, login is required"));
    } else if (error.response.status === 500) {
      dispatch(favoriteFailure("An error occured while processing request, try again"));
    } else {
      dispatch(favoriteFailure(error.response?.data));
    }
  }
};

export const updateUserFavoriteItem = (formdata) => async (dispatch) => {
  dispatch(updateFavoriteRequest());
  try {
    const response = await axiosInstance.put(
      `api/user/favorites/update/`,
      formdata
    );
    const data = response?.data;

    dispatch(updateFavoriteSuccess(data));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(updateFavoriteFailure("Your token has expired, login is required"));
    } else if (error.response.status === 500) {
      dispatch(updateFavoriteFailure("An error occured while processing request, try again"));
    } else {
      dispatch(updateFavoriteFailure(error.response?.data));
    }
  }
};

export const favoriteRequest = () => ({
  type: FAVORITE_REQUEST,
});

export const favoriteSuccess = (response) => ({
  type: FAVORITE_SUCCESS,
  payload: response,
});

export const favoriteFailure = (error) => ({
  type: FAVORITE_FAILURE,
  payload: error,
});

export const updateFavoriteRequest = () => ({
  type: UPDATEFAVORITE_REQUEST,
});

export const updateFavoriteSuccess = (response) => ({
  type: UPDATEFAVORITE_SUCCESS,
  payload: response,
});

export const updateFavoriteFailure = (error) => ({
  type: UPDATEFAVORITE_FAILURE,
  payload: error,
});
