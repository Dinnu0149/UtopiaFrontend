import axiosInstance from "../api/axiosInstance";
import {
  SPEAKER_REQUEST,
  SPEAKER_SUCCESS,
  SPEAKER_FAILURE,
  CLEARSPEAKER_RESPONSE,
  CREATESPEAKER_REQUEST,
  CREATESPEAKER_SUCCESS,
  CLEARCREATESPEAKER_RESPONSE,
  CREATESPEAKER_FAILURE,
  DELETESPEAKER_REQUEST,
  DELETESPEAKER_SUCCESS,
  DELETESPEAKER_FAILURE,
} from "./actionTypes";

export const getEventSpeakers = (pk) => async (dispatch) => {
  dispatch(eventSpeakersRequest());
  try {
    const response = await axiosInstance.get(`api/event/${pk}/speakers/`);
    const data = response?.data;

    dispatch(eventSpeakersSuccess(data));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(eventSpeakersFailure("Your token has expired, login is required"));
    } else if (error.response.status === 500) {
      dispatch(eventSpeakersFailure("An error occured while processing request, try again"));
    } else {
      dispatch(eventSpeakersFailure(error.response?.data));
    }
  }
};

export const createSpeaker = (event_id, formdata) => async (dispatch) => {
  dispatch(createSpeakerRequest());
  try {
    const response = await axiosInstance.post(
      `api/event/${event_id}/speakers/`,
      formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const event = response?.data;

    dispatch(createSpeakerSuccess(event));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(createSpeakerFailure("Your token has expired, login is required"));
    } else if (error.response.status === 500) {
      dispatch(createSpeakerFailure("An error occured while processing request, try again"));
    } else {
      dispatch(createSpeakerFailure(error.response?.data));
    }
  }
};

export const deleteEventSpeakers = (pk) => async (dispatch) => {
  dispatch(deleteEventSpeakersRequest());
  try {
    const response = await axiosInstance.delete(`api/event/speaker/${pk}/`);
    const status = response?.status;
    
    if (status === 204) {
      dispatch(deleteEventSpeakersSuccess(status));
    }
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(deleteEventSpeakersFailure("Your token has expired, login is required"));
    } else if (error.response.status === 500) {
      dispatch(deleteEventSpeakersFailure("An error occured while processing request, try again"));
    } else {
      dispatch(deleteEventSpeakersFailure(error.response?.data));
    }
  }
};

export const eventSpeakersRequest = () => ({
  type: SPEAKER_REQUEST,
});

export const eventSpeakersSuccess = (response) => ({
  type: SPEAKER_SUCCESS,
  payload: response,
});

export const eventSpeakersFailure = (error) => ({
  type: SPEAKER_FAILURE,
  payload: error,
});

export const clearSpeakersResponse = () => ({
  type: CLEARSPEAKER_RESPONSE,
});

export const createSpeakerRequest = () => ({
  type: CREATESPEAKER_REQUEST,
});


export const createSpeakerSuccess = (response) => ({
  type: CREATESPEAKER_SUCCESS,
  payload: response,
});

export const clearCreateSpeakerResponse = () => ({
  type: CLEARCREATESPEAKER_RESPONSE,
});

export const createSpeakerFailure = (error) => ({
  type: CREATESPEAKER_FAILURE,
  payload: error,
});

export const deleteEventSpeakersRequest = () => ({
  type: DELETESPEAKER_REQUEST,
});

export const deleteEventSpeakersSuccess = (response) => ({
  type: DELETESPEAKER_SUCCESS,
  payload: response,
});

export const deleteEventSpeakersFailure = (error) => ({
  type: DELETESPEAKER_FAILURE,
  payload: error,
});
