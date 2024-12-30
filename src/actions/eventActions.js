import axiosInstance from "../api/axiosInstance";
import {
  EVENT_REQUEST,
  EVENT_SUCCESS,
  EVENT_FAILURE,
  EVENTDETAIL_REQUEST,
  EVENTDETAIL_SUCCESS,
  EVENTDETAIL_FAILURE,
  CREATEEVENT_REQUEST,
  CREATEEVENT_SUCCESS,
  CLEAREVENT_RESPONSE,
  CREATEEVENT_FAILURE,
  EDITEVENT_REQUEST,
  EDITEVENT_SUCCESS,
  EDITEVENT_FAILURE,
  DELETEEVENT_REQUEST,
  DELETEEVENT_SUCCESS,
  DELETEEVENT_FAILURE,

} from "./actionTypes";

export const getEvents = (url = "api/event/general_events/") => async (dispatch) => {
  dispatch(eventRequest());
  try {
    const response = await axiosInstance.get(url);
    const data = response?.data;    
    dispatch(eventSuccess(data));
    
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(eventFailure("Your token has expired, login is required"));
    } else if (error.response.status === 500) {
      dispatch(eventFailure("An error occured while processing request, try again"));
    } else {
      dispatch(eventFailure(error.response?.data));
    }
  }
};

export const getEventDetail = (pk) => async (dispatch) => {
  dispatch(eventDetailRequest());
  try {
    const response = await axiosInstance.get(`api/event/events/${pk}`);
    const data = response?.data;

    dispatch(eventDetailSuccess(data));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(eventDetailFailure("Your token has expired, login is required"));
    } else if (error.response.status === 500) {
      dispatch(eventDetailFailure("An error occured while processing request, try again"));
    } else {
      dispatch(eventDetailFailure(error.response?.data));
    }
  }
};

export const createEvent = (formdata) => async (dispatch) => {
  dispatch(createEventRequest());
  try {
    const response = await axiosInstance.post("api/event/general_events/", formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const event = response?.data;

    dispatch(createEventSuccess(event));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(createEventFailure("Your token has expired, login is required"));
    } else if (error.response.status === 500) {
      dispatch(createEventFailure("An error occured while processing request, try again"));
    } else {
      dispatch(createEventFailure(error.response?.data));
    }
  }
};

export const editEvent = (pk, editedData) => async (dispatch) => {
  dispatch(editEventRequest());
  try {
    const response = await axiosInstance.patch(`api/event/events/${pk}/`, editedData);
    const message = response?.data;

    dispatch(editEventSuccess(message));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(editEventFailure("Your token has expired, login is required"));
    } else if (error.response.status === 500) {
      dispatch(editEventFailure("An error occured while processing request, try again"));
    } else {
      dispatch(editEventFailure(error.response?.data));
    }
  }
};

export const deleteEvent = (pk) => async (dispatch) => {
  dispatch(deleteRequest());
  try {
    const response = await axiosInstance.delete(`api/event/events/${pk}/`);
    const status = response?.status;

    if (status === 204) {
      dispatch(deleteSuccess(status));
    }
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(deleteFailure("Your token has expired, login is required"));
    } else if (error.response.status === 500) {
      dispatch(deleteFailure("An error occured while processing request, try again"));
    } else {
      dispatch(deleteFailure(error.response?.data));
    }
  }
};



export const eventRequest = () => ({
  type: EVENT_REQUEST,
});

export const eventSuccess = (response) => ({
  type: EVENT_SUCCESS,
  payload: response,
});

export const eventFailure = (error) => ({
  type: EVENT_FAILURE,
  payload: error,
});

export const eventDetailRequest = () => ({
  type: EVENTDETAIL_REQUEST,
});

export const eventDetailSuccess = (response) => ({
  type: EVENTDETAIL_SUCCESS,
  payload: response,
});

export const eventDetailFailure = (error) => ({
  type: EVENTDETAIL_FAILURE,
  payload: error,
});

export const createEventRequest = () => ({
  type: CREATEEVENT_REQUEST,
});

export const createEventSuccess = (response) => ({
  type: CREATEEVENT_SUCCESS,
  payload: response,
});

export const clearEventResponse = () => ({
  type: CLEAREVENT_RESPONSE,
});

export const createEventFailure = (error) => ({
  type: CREATEEVENT_FAILURE,
  payload: error,
});

export const editEventRequest = () => ({
  type: EDITEVENT_REQUEST,
});

export const editEventSuccess = (response) => ({
  type: EDITEVENT_SUCCESS,
  payload: response,
});

export const editEventFailure = (error) => ({
  type: EDITEVENT_FAILURE,
  payload: error,
});

export const deleteRequest = () => ({
  type: DELETEEVENT_REQUEST,
});

export const deleteSuccess = (response) => ({
  type: DELETEEVENT_SUCCESS,
  payload: response,
});

export const deleteFailure = (error) => ({
  type: DELETEEVENT_FAILURE,
  payload: error,
});
