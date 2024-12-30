import axiosInstance from "../api/axiosInstance";
import {
  NOTIFICATION_REQUEST,
  NOTIFICATION_SUCCESS,
  NOTIFICATIONPOP_SUCCESS,
  NOTIFICATION_FAILURE,
  NOTIFICATIONDETAIL_REQUEST,
  NOTIFICATIONDETAIL_SUCCESS,
  NOTIFICATIONDETAIL_FAILURE,
  CREATENOTIFICATION_REQUEST,
  CREATENOTIFICATION_SUCCESS,
  CREATENOTIFICATION_FAILURE,
  DELETENOTIFICATION_REQUEST,
  DELETENOTIFICATION_SUCCESS,
  DELETENOTIFICATION_FAILURE,
  MARKALL_REQUEST,
  MARKALL_SUCCESS,
  MARKALL_FAILURE,
} from "./actionTypes";

export const getNotifications = (page, unread, no_pagination ) => async (dispatch) => {
    dispatch(notificationsRequest());
    try {
      const response = await axiosInstance.get(`api/notification/notifications/`, {
        params: {
            page: page,
            unread: unread,
            no_pagination : no_pagination 
        }
      });      
      const data = response?.data;      
      unread ? dispatch(notificationsSuccessPopUp(data)) : dispatch(notificationsSuccess(data))

    } catch (error) {
      if (error.response.status === 401) {
        dispatch(notificationsFailure("Your token has expired, login is required"));
      } else if (error.response.status === 500) {
        dispatch(notificationsFailure("An error occured while processing request, try again"));
      } else {
        dispatch(notificationsFailure(error.response?.data));
      }
    }
  };

export const getNotification = (pk) => async (dispatch) => {
    dispatch(notificationRequest());
    try {
      const response = await axiosInstance.get(`api/notification/${pk}/`);
      const data = response?.data;
  
      dispatch(notificationSuccess(data));
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(notificationFailure("Your token has expired, login is required"));
      } else if (error.response.status === 500) {
        dispatch(notificationFailure("An error occured while processing request, try again"));
      } else {
        dispatch(notificationFailure(error.response?.data));
      }
    }
  };
  
  export const createNotification = (formdata) => async (dispatch) => {
    dispatch(createRequest());
    try {
      const response = await axiosInstance.post(
        `api/notification/send/`,
        formdata
      );
      const data = response?.data;
  
      dispatch(createSuccess(data));
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(createFailure("Your token has expired, login is required"));
      } else if (error.response.status === 500) {
        dispatch(createFailure("An error occured while processing request, try again"));
      } else {
        dispatch(createFailure(error.response?.data));
      }
    }
  };
  
  export const deleteNotification = (pk) => async (dispatch) => {
    dispatch(deleteNotificationRequest());
    try {
      const response = await axiosInstance.delete(`api/notification/${pk}/`);
      const status = response?.status;
      
      if (status === 204) {
        dispatch(deleteNotificationSuccess(status));
      }
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(deleteNotificationFailure("Your token has expired, login is required"));
      } else if (error.response.status === 500) {
        dispatch(deleteNotificationFailure("An error occured while processing request, try again"));
      } else {
        dispatch(deleteNotificationFailure(error.response?.data));
      }
    }
  };

  export const markAllNotication = () => async (dispatch) => {
    dispatch(markAllNotificationRequest());
    try {
      const response = await axiosInstance.put(
        `api/notification/mark_all/`,
      );
      const data = response?.data;
      
      dispatch(markAllNotificationSuccess(data));

      let existing = localStorage.getItem("eventUser");
      existing = existing ? JSON.parse(existing) : {};
      existing["unread_notification"] = 0;
    
      localStorage.setItem("eventUser", JSON.stringify(existing));

    } catch (error) {
      if (error.response.status === 401) {
        dispatch(markAllNotificationFailure("Your token has expired, login is required"));
      } else if (error.response.status === 500) {
        dispatch(markAllNotificationFailure("An error occured while processing request, try again"));
      } else {
        dispatch(markAllNotificationFailure(error.response?.data));
      }
    }
  };

export const notificationsRequest = () => ({
    type: NOTIFICATION_REQUEST,
  });
  
  export const notificationsSuccess = (response) => ({
    type: NOTIFICATION_SUCCESS,
    payload: response,
  });

  export const notificationsSuccessPopUp = (response) => ({
    type: NOTIFICATIONPOP_SUCCESS,
    payload: response,
  });
  
  export const notificationsFailure = (error) => ({
    type: NOTIFICATION_FAILURE,
    payload: error,
  });

  export const notificationRequest = () => ({
    type: NOTIFICATIONDETAIL_REQUEST,
  });
  
  export const notificationSuccess = (response) => ({
    type: NOTIFICATIONDETAIL_SUCCESS,
    payload: response,
  });
  
  export const notificationFailure = (error) => ({
    type: NOTIFICATIONDETAIL_FAILURE,
    payload: error,
  });
  
  export const createRequest = () => ({
    type: CREATENOTIFICATION_REQUEST,
  });
  
  export const createSuccess = (response) => ({
    type: CREATENOTIFICATION_SUCCESS,
    payload: response,
  });
  
  
  export const createFailure = (error) => ({
    type: CREATENOTIFICATION_FAILURE,
    payload: error,
  });
  
  export const deleteNotificationRequest = () => ({
    type: DELETENOTIFICATION_REQUEST,
  });
  
  export const deleteNotificationSuccess = (response) => ({
    type: DELETENOTIFICATION_SUCCESS,
    payload: response,
  });
  
  export const deleteNotificationFailure = (error) => ({
    type: DELETENOTIFICATION_FAILURE,
    payload: error,
  });

  export const markAllNotificationRequest = () => ({
    type: MARKALL_REQUEST,
  });
  
  export const markAllNotificationSuccess = (response) => ({
    type: MARKALL_SUCCESS,
    payload: response,
  });
  
  export const markAllNotificationFailure = (error) => ({
    type: MARKALL_FAILURE,
    payload: error,
  });