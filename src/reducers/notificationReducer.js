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
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  response: [],
  popResponse: [],

  getLoading: false,
  getError: null,
  getResponse: [],

  createLoading: false,
  createError: null,
  createResponse: null,

  deleteLoading: false,
  deleteError: null,
  deleteResponse: null,

  markAllLoading: false,
  markAllError: null,
  markAllResponse: null,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true,
        createResponse: null,
        createError: null,
        response: [],
        deleteResponse: null,
        error: null,
        deleteError: null,
        getResponse: [],
        getError: null,
        markAllResponse: null,
        markAllError: null,
      };

    case NOTIFICATION_SUCCESS:
      return { ...state, loading: false, response: action.payload };

    case NOTIFICATIONPOP_SUCCESS:
      return { ...state, loading: false, popResponse: action.payload };

    case NOTIFICATION_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case NOTIFICATIONDETAIL_REQUEST:
      return {
        ...state,
        getLoading: true,
        getResponse: [],
        getError: null,
      };

    case NOTIFICATIONDETAIL_SUCCESS:
      return { ...state, getLoading: false, getResponse: action.payload };

    case NOTIFICATIONDETAIL_FAILURE:
      return { ...state, getLoading: false, getError: action.payload };

    case CREATENOTIFICATION_REQUEST:
      return {
        ...state,
        createLoading: true,
        createError: null,
        createResponse: null,
      };

    case CREATENOTIFICATION_SUCCESS:
      return { ...state, createLoading: false, createResponse: action.payload };

    case CREATENOTIFICATION_FAILURE:
      return { ...state, createLoading: false, createError: action.payload };

    case DELETENOTIFICATION_REQUEST:
      return {
        ...state,
        deleteLoading: true,
        deleteResponse: null,
        deleteError: null,
      };

    case DELETENOTIFICATION_SUCCESS:
      return { ...state, deleteLoading: false, deleteResponse: action.payload };

    case DELETENOTIFICATION_FAILURE:
      return { ...state, deleteLoading: false, deleteError: action.payload };

    case MARKALL_REQUEST:
      return {
        ...state,
        markAllLoading: true,
        markAllResponse: null,
        markAllError: null,
      };

    case MARKALL_SUCCESS:
      return {
        ...state,
        markAllLoading: false,
        markAllResponse: action.payload,
      };

    case MARKALL_FAILURE:
      return { ...state, markAllLoading: false, markAllError: action.payload };

    default:
      return state;
  }
};

export default notificationReducer;
