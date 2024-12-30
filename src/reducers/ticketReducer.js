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

const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case TICKET_REQUEST:
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

    case TICKET_SUCCESS:
      return { ...state, loading: false, response: action.payload };

    case TICKET_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CREATETICKET_REQUEST:
      return {
        ...state,
        createLoading: true,
        createError: null,
        createResponse: null,
      };

    case CREATETICKET_SUCCESS:
      return { ...state, createLoading: false, createResponse: action.payload };

    case CLEARCREATETICKET_RESPONSE:
      return {
        ...state,
        createLoading: false,
        createResponse: null,
        deleteResponse: null,
      };

    case CREATETICKET_FAILURE:
      return { ...state, createLoading: false, createError: action.payload };

    case DELETETICKET_REQUEST:
      return {
        ...state,
        deleteLoading: true,
        deleteResponse: null,
        deleteError: null,
      };

    case DELETETICKET_SUCCESS:
      return { ...state, deleteLoading: false, deleteResponse: action.payload };

    case DELETETICKET_FAILURE:
      return { ...state, deleteLoading: false, deleteError: action.payload };

    default:
      return state;
  }
};

export default ticketReducer;
