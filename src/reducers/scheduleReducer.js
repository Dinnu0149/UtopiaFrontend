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

const scheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SCHEDULE_REQUEST:
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

    case SCHEDULE_SUCCESS:
      return { ...state, loading: false, response: action.payload };

    case SCHEDULE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CREATESCHEDULE_REQUEST:
      return {
        ...state,
        createLoading: true,
        createError: null,
        createResponse: null,
      };

    case CREATESCHEDULE_SUCCESS:
      return { ...state, createLoading: false, createResponse: action.payload };

    case CLEARCREATESCHEDULE_RESPONSE:
      return {
        ...state,
        createLoading: false,
        createResponse: null,
        deleteResponse: null,
      };

    case CREATESCHEDULE_FAILURE:
      return { ...state, createLoading: false, createError: action.payload };

    case DELETESCHEDULE_REQUEST:
      return {
        ...state,
        deleteLoading: true,
        deleteResponse: null,
        deleteError: null,
      };

    case DELETESCHEDULE_SUCCESS:
      return { ...state, deleteLoading: false, deleteResponse: action.payload };

    case DELETESCHEDULE_FAILURE:
      return { ...state, deleteLoading: false, deleteError: action.payload };

    default:
      return state;
  }
};

export default scheduleReducer;
