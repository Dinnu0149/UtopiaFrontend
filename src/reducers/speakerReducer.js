import {
  SPEAKER_REQUEST,
  SPEAKER_SUCCESS,
  SPEAKER_FAILURE,
  CREATESPEAKER_REQUEST,
  CREATESPEAKER_SUCCESS,
  CLEARCREATESPEAKER_RESPONSE,
  CREATESPEAKER_FAILURE,
  DELETESPEAKER_REQUEST,
  DELETESPEAKER_SUCCESS,
  DELETESPEAKER_FAILURE,
  CLEARSPEAKER_RESPONSE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  response: [],

  createLoading: false,
  createError: null,
  createResponse: null,

  deleteLoading: false,
  deleteError: null,
  deleteResponse: null,
};

const speakerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SPEAKER_REQUEST:
      return {
        ...state,
        loading: true,
        createResponse: null,
        createError: null,
        response: [],
        deleteResponse: null,
        error: null,
        deleteError: null,
      };

    case SPEAKER_SUCCESS:
      return { ...state, loading: false, response: action.payload };

    case SPEAKER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CLEARSPEAKER_RESPONSE:
      return { ...state, loading: false, error: null, response: [] };

    case CREATESPEAKER_REQUEST:
      return {
        ...state,
        createLoading: true,
        createError: null,
        createResponse: null,
      };

    case CREATESPEAKER_SUCCESS:
      return { ...state, createLoading: false, createResponse: action.payload };

    case CLEARCREATESPEAKER_RESPONSE:
      return {
        ...state,
        createLoading: false,
        createResponse: null,
        deleteResponse: null,
      };

    case CREATESPEAKER_FAILURE:
      return { ...state, createLoading: false, createError: action.payload };

    case DELETESPEAKER_REQUEST:
      return {
        ...state,
        deleteLoading: true,
        deleteResponse: null,
        deleteError: null,
      };

    case DELETESPEAKER_SUCCESS:
      return { ...state, deleteLoading: false, deleteResponse: action.payload };

    case DELETESPEAKER_FAILURE:
      return { ...state, deleteLoading: false, deleteError: action.payload };

    default:
      return state;
  }
};

export default speakerReducer;
