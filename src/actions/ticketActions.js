import axiosInstance from "../api/axiosInstance";
import {
  TICKET_REQUEST,
  TICKET_SUCCESS,
  TICKET_FAILURE,
  CREATETICKET_REQUEST,
  CREATETICKET_SUCCESS,
  CLEARCREATETICKET_RESPONSE,
  CREATETICKET_FAILURE,
  DELETETICKET_REQUEST,
  DELETETICKET_SUCCESS,
  DELETETICKET_FAILURE,
} from "./actionTypes";

export const getEventTickets = (pk) => async (dispatch) => {
  dispatch(eventTicketsRequest());
  try {
    const response = await axiosInstance.get(`api/event/${pk}/tickets/`);
    const data = response?.data;

    dispatch(eventTicketsSuccess(data));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(eventTicketsFailure("Your token has expired, login is required"));
    } else if (error.response.status === 500) {
      dispatch(eventTicketsFailure("An error occured while processing request, try again"));
    } else {
      dispatch(eventTicketsFailure(error.response?.data));
    }
  }
};

export const createTicket = (event_id, formdata) => async (dispatch) => {
  dispatch(createTicketRequest());
  try {
    const response = await axiosInstance.post(
      `api/event/${event_id}/tickets/`,
      formdata
    );
    const event = response?.data;

    dispatch(createTicketSuccess(event));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(createTicketFailure("Your token has expired, login is required"));
    } else if (error.response.status === 500) {
      dispatch(createTicketFailure("An error occured while processing request, try again"));
    } else {
      dispatch(createTicketFailure(error.response?.data));
    }
  }
};

export const deleteEventTickets = (pk) => async (dispatch) => {
  dispatch(deleteEventTicketsRequest());
  try {
    const response = await axiosInstance.delete(`api/event/ticket/${pk}/`);
    const status = response?.status;
    
    if (status === 204) {
      dispatch(deleteEventTicketsSuccess(status));
    }
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(deleteEventTicketsFailure("Your token has expired, login is required"));
    } else if (error.response.status === 500) {
      dispatch(deleteEventTicketsFailure("An error occured while processing request, try again"));
    } else {
      dispatch(deleteEventTicketsFailure(error.response?.data));
    }
  }
};

export const eventTicketsRequest = () => ({
  type: TICKET_REQUEST,
});

export const eventTicketsSuccess = (response) => ({
  type: TICKET_SUCCESS,
  payload: response,
});

export const eventTicketsFailure = (error) => ({
  type: TICKET_FAILURE,
  payload: error,
});

export const createTicketRequest = () => ({
  type: CREATETICKET_REQUEST,
});

export const createTicketSuccess = (response) => ({
  type: CREATETICKET_SUCCESS,
  payload: response,
});

export const clearCreateTicketResponse = () => ({
  type: CLEARCREATETICKET_RESPONSE,
});

export const createTicketFailure = (error) => ({
  type: CREATETICKET_FAILURE,
  payload: error,
});

export const deleteEventTicketsRequest = () => ({
  type: DELETETICKET_REQUEST,
});

export const deleteEventTicketsSuccess = (response) => ({
  type: DELETETICKET_SUCCESS,
  payload: response,
});

export const deleteEventTicketsFailure = (error) => ({
  type: DELETETICKET_FAILURE,
  payload: error,
});
