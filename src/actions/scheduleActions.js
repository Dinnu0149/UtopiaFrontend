import axiosInstance from "../api/axiosInstance";
import {
  SCHEDULE_REQUEST,
  SCHEDULE_SUCCESS,
  SCHEDULE_FAILURE,
  CREATESCHEDULE_REQUEST,
  CREATESCHEDULE_SUCCESS,
  CLEARCREATESCHEDULE_RESPONSE,
  CREATESCHEDULE_FAILURE,
  DELETESCHEDULE_REQUEST,
  DELETESCHEDULE_SUCCESS,
  DELETESCHEDULE_FAILURE,
} from "./actionTypes";

export const getEventSchedules = (pk) => async (dispatch) => {
  dispatch(eventSchedulesRequest());
  try {
    const response = await axiosInstance.get(`api/event/${pk}/schedules/`);
    const data = response?.data;

    dispatch(eventSchedulesSuccess(data));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(eventSchedulesFailure("Your token has expired, login is required"));
    } else if (error.response.status === 500) {
      dispatch(eventSchedulesFailure("An error occured while processing request, try again"));
    } else {
      dispatch(eventSchedulesFailure(error.response?.data));
    }
  }
};

export const createSchedule = (event_id, formdata) => async (dispatch) => {
  dispatch(createScheduleRequest());
  try {
    const response = await axiosInstance.post(
      `api/event/${event_id}/schedules/`,
      formdata
    );
    const event = response?.data;

    dispatch(createScheduleSuccess(event));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(createScheduleFailure("Your token has expired, login is required"));
    } else if (error.response.status === 500) {
      dispatch(createScheduleFailure("An error occured while processing request, try again"));
    } else {
      dispatch(createScheduleFailure(error.response?.data));
    }
  }
};

export const deleteEventSchedules = (pk) => async (dispatch) => {
  dispatch(deleteEventSchedulesRequest());
  try {
    const response = await axiosInstance.delete(`api/event/schedule/${pk}/`);
    const status = response?.status;

    if (status === 204) {
      dispatch(deleteEventSchedulesSuccess(status));
    }
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(deleteEventSchedulesFailure("Your token has expired, login is required"));
    } else if (error.response.status === 500) {
      dispatch(deleteEventSchedulesFailure("An error occured while processing request, try again"));
    } else {
      dispatch(deleteEventSchedulesFailure(error.response?.data));
    }
  }
};

export const eventSchedulesRequest = () => ({
  type: SCHEDULE_REQUEST,
});

export const eventSchedulesSuccess = (response) => ({
  type: SCHEDULE_SUCCESS,
  payload: response,
});

export const eventSchedulesFailure = (error) => ({
  type: SCHEDULE_FAILURE,
  payload: error,
});

export const createScheduleRequest = () => ({
  type: CREATESCHEDULE_REQUEST,
});

export const createScheduleSuccess = (response) => ({
  type: CREATESCHEDULE_SUCCESS,
  payload: response,
});

export const clearCreateScheduleResponse = () => ({
  type: CLEARCREATESCHEDULE_RESPONSE,
});

export const createScheduleFailure = (error) => ({
  type: CREATESCHEDULE_FAILURE,
  payload: error,
});

export const deleteEventSchedulesRequest = () => ({
  type: DELETESCHEDULE_REQUEST,
});

export const deleteEventSchedulesSuccess = (response) => ({
  type: DELETESCHEDULE_SUCCESS,
  payload: response,
});

export const deleteEventSchedulesFailure = (error) => ({
  type: DELETESCHEDULE_FAILURE,
  payload: error,
});
