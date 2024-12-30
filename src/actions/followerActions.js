import axiosInstance from "../api/axiosInstance";
import {
    FOLLOWER_REQUEST,
    FOLLOWER_SUCCESS,
    FOLLOWER_FAILURE,
    EDITFOLLOWER_REQUEST,
    EDITFOLLOWER_SUCCESS,
    EDITFOLLOWER_FAILURE,
    CLEAREDITFOLLOWER_RESPONSE
  } from "./actionTypes";

  export const OrganizationFollower = () => async (dispatch) => {
    dispatch(followerRequest());
    try {
      const response = await axiosInstance.get(`api/user/following`);
      const message = response?.data;
  
      dispatch(followerSuccess(message));
      
    } catch (error) { 
      if (error.response.status === 401) {
        dispatch(followerFailure("Your token has expired, login is required"));
      } else if (error.response.status === 500) {
        dispatch(followerFailure("An error occured while processing request, try again"));
      } else {
        dispatch(followerFailure(error.response?.data));
      }  
    }
  };

  export const updateOrganizationFollower = (pk) => async (dispatch) => {
    dispatch(editFollowerRequest());
    try {
      const response = await axiosInstance.put(`api/user/update-follower/${pk}/`);
      const message = response?.data;
  
      dispatch(editFollowerSuccess(message));
      
    } catch (error) {   
      if (error.response.status === 401) {
        dispatch(editFollowerFailure("Your token has expired, login is required"));
      } else if (error.response.status === 500) {
        dispatch(editFollowerFailure("An error occured while processing request, try again"));
      } else {
        dispatch(editFollowerFailure(error.response?.data));
      }

    }
  };

  export const followerRequest = () => ({
    type: FOLLOWER_REQUEST,
  });
  
  export const followerSuccess = (response) => ({
    type: FOLLOWER_SUCCESS,
    payload: response,
  });
  
  export const followerFailure = (error) => ({
    type: FOLLOWER_FAILURE,
    payload: error,
  });
  
  export const editFollowerRequest = () => ({
    type: EDITFOLLOWER_REQUEST,
  });
  
  export const editFollowerSuccess = (response) => ({
    type: EDITFOLLOWER_SUCCESS,
    payload: response,
  });
  
  export const editFollowerFailure = (error) => ({
    type: EDITFOLLOWER_FAILURE,
    payload: error,
  });

  export const clearUpdateFollowerResponse = () => ({
    type: CLEAREDITFOLLOWER_RESPONSE,
  });

