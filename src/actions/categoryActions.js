import axiosInstance from "../api/axiosInstance";
import {
  CATEGORY_REQUEST,
  CATEGORY_SUCCESS,
  CATEGORY_FAILURE,
  CREATECATEGORY_REQUEST,
  CREATECATEGORY_SUCCESS,
  CREATECATEGORY_FAILURE,
  UPDATECATEGORY_REQUEST,
  UPDATECATEGORY_SUCCESS,
  UPDATECATEGORY_FAILURE,
  DELETECATEGORY_REQUEST,
  DELETECATEGORY_SUCCESS,
  DELETECATEGORY_FAILURE,
} from "./actionTypes";

export const getCategorys = () => async (dispatch) => {
    dispatch(categorysRequest());
    try {
      const response = await axiosInstance.get(`api/event/categories/`);
      const data = response?.data;
  
      dispatch(categorysSuccess(data));
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(categorysFailure("Your token has expired, login is required"));
      } else if (error.response.status === 500) {
        dispatch(categorysFailure("An error occured while processing request, try again"));
      } else {
        dispatch(categorysFailure(error.response?.data));
      }
    }
  };

  export const createCategory = (formdata) => async (dispatch) => {
    dispatch(createCategoryRequest());
    try {
      const response = await axiosInstance.post(
        `api/event/categories/`,
        formdata
      );
      const data = response?.data;
  
      dispatch(createCategorySuccess(data));
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(createCategoryFailure("Your token has expired, login is required"));
      } else if (error.response.status === 500) {
        dispatch(createCategoryFailure("An error occured while processing request, try again"));
      } else {
        dispatch(createCategoryFailure(error.response?.data));
      }
    }
  };

  export const editCategory = (pk, editedData) => async (dispatch) => {
    dispatch(editCategoryRequest());
    try {
      const response = await axiosInstance.put(`api/event/category/${pk}/`, editedData);
      const message = response?.data;
  
      dispatch(editCategorySuccess(message));
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(editCategoryFailure("Your token has expired, login is required"));
      } else if (error.response.status === 500) {
        dispatch(editCategoryFailure("An error occured while processing request, try again"));
      } else {
        dispatch(editCategoryFailure(error.response?.data));
      }
    }
  };

  export const deleteCategory = (pk) => async (dispatch) => {
    dispatch(deleteCategoryRequest());
    try {
      const response = await axiosInstance.delete(`api/event/category/${pk}/`);
      const status = response?.status;
      
      if (status === 204) {
        dispatch(deleteCategorySuccess(status));
      }
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(deleteCategoryFailure("Your token has expired, login is required"));
      } else if (error.response.status === 500) {
        dispatch(deleteCategoryFailure("An error occured while processing request, try again"));
      } else {
        dispatch(deleteCategoryFailure(error.response?.data));
      }
    }
  };

export const categorysRequest = () => ({
  type: CATEGORY_REQUEST,
});

export const categorysSuccess = (response) => ({
  type: CATEGORY_SUCCESS,
  payload: response,
});

export const categorysFailure = (error) => ({
  type: CATEGORY_FAILURE,
  payload: error,
});

export const editCategoryRequest = () => ({
  type: UPDATECATEGORY_REQUEST,
});

export const editCategorySuccess = (response) => ({
  type: UPDATECATEGORY_SUCCESS,
  payload: response,
});

export const editCategoryFailure = (error) => ({
  type: UPDATECATEGORY_FAILURE,
  payload: error,
});

export const createCategoryRequest = () => ({
  type: CREATECATEGORY_REQUEST,
});

export const createCategorySuccess = (response) => ({
  type: CREATECATEGORY_SUCCESS,
  payload: response,
});

export const createCategoryFailure = (error) => ({
  type: CREATECATEGORY_FAILURE,
  payload: error,
});

export const deleteCategoryRequest = () => ({
  type: DELETECATEGORY_REQUEST,
});

export const deleteCategorySuccess = (response) => ({
  type: DELETECATEGORY_SUCCESS,
  payload: response,
});

export const deleteCategoryFailure = (error) => ({
  type: DELETECATEGORY_FAILURE,
  payload: error,
});
