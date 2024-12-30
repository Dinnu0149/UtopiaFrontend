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
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  response: [],

  detailLoading: false,
  detailError: null,
  detailResponse: [],

  createLoading: false,
  createError: null,
  createResponse: null,

  editLoading: false,
  editError: null,
  editResponse: null,

  deleteLoading: false,
  deleteError: null,
  deleteResponse: null,
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case EVENT_REQUEST:
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

    case EVENT_SUCCESS:
      return { ...state, loading: false, response: action.payload };

    case EVENT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case EVENTDETAIL_REQUEST:
      return { ...state, detailLoading: true, detailError: null };

    case EVENTDETAIL_SUCCESS:
      return { ...state, detailLoading: false, detailResponse: action.payload };

    case EVENTDETAIL_FAILURE:
      return { ...state, detailLoading: false, detailError: action.payload };

    case CREATEEVENT_REQUEST:
      return { ...state, createLoading: true, createError: null };

    case CREATEEVENT_SUCCESS:
      return { ...state, createLoading: false, createResponse: action.payload };

    case CREATEEVENT_FAILURE:
      return { ...state, createLoading: false, createError: action.payload };

    case EDITEVENT_REQUEST:
      return {
        ...state,
        editLoading: true,
        editResponse: null,
        editError: null,
      };

    case EDITEVENT_SUCCESS:
      return { ...state, editLoading: false, editResponse: action.payload };

    case EDITEVENT_FAILURE:
      return { ...state, editLoading: false, editError: action.payload };

    case DELETEEVENT_REQUEST:
      return { ...state, deleteLoading: true, deleteError: null };

    case DELETEEVENT_SUCCESS:
      return { ...state, deleteLoading: false, deleteResponse: action.payload };

    case DELETEEVENT_FAILURE:
      return { ...state, deleteLoading: false, deleteError: action.payload };

    case CLEAREVENT_RESPONSE:
      return { ...state, createResponse: null, editResponse: null, deleteResponse: null };

    default:
      return state;
  }
};

export default eventReducer;
