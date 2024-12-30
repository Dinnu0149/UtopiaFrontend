import {
  BOOKING_REQUEST,
  BOOKING_SUCCESS,
  BOOKING_FAILURE,
  DETAILBOOKING_REQUEST,
  DETAILBOOKING_SUCCESS,
  DETAILBOOKING_FAILURE,
  DELETEBOOKING_REQUEST,
  DELETEBOOKING_SUCCESS,
  DELETEBOOKING_FAILURE,
  VERIFYBOOKING_REQUEST,
  VERIFYBOOKING_SUCCESS,
  VERIFYBOOKING_FAILURE,
  REGISTERBOOKING_REQUEST,
  REGISTERBOOKING_SUCCESS,
  REGISTERBOOKING_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  response: [],

  detailLoading: false,
  detailError: null,
  detailResponse: [],

  deleteLoading: false,
  deleteError: null,
  deleteResponse: null,

  verifyLoading: false,
  verifyError: null,
  verifyResponse: [],

  registerLoading: false,
  registerError: null,
  registerResponse: null,
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOKING_REQUEST:
      return {
        ...state,
        loading: true,
        response: [],
        deleteResponse: null,
        error: null,
        deleteError: null,
      };

    case BOOKING_SUCCESS:
      return { ...state, loading: false, response: action.payload };

    case BOOKING_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case DETAILBOOKING_REQUEST:
      return {
        ...state,
        detailLoading: true,
        detailError: null,
      };

    case DETAILBOOKING_SUCCESS:
      return {
        ...state,
        detailLoading: false,
        detailResponse: action.payload,
      };

    case DETAILBOOKING_FAILURE:
      return { ...state, detailLoading: false, detailError: action.payload };

    case DELETEBOOKING_REQUEST:
      return {
        ...state,
        deleteLoading: true,
        deleteResponse: null,
        deleteError: null,
      };

    case DELETEBOOKING_SUCCESS:
      return { ...state, deleteLoading: false, deleteResponse: action.payload };

    case DELETEBOOKING_FAILURE:
      return { ...state, deleteLoading: false, deleteError: action.payload };
    case VERIFYBOOKING_REQUEST:
      return {
        ...state,
        verifyLoading: true,
        verifyResponse: null,
        verifyError: null,
      };

    case VERIFYBOOKING_SUCCESS:
      return { ...state, verifyLoading: false, verifyResponse: action.payload };

    case VERIFYBOOKING_FAILURE:
      return { ...state, verifyLoading: false, verifyError: action.payload };
    case REGISTERBOOKING_REQUEST:
      return {
        ...state,
        registerLoading: true,
        registerResponse: null,
        registerError: null,
      };

    case REGISTERBOOKING_SUCCESS:
      return { ...state, registerLoading: false, registerResponse: action.payload };

    case REGISTERBOOKING_FAILURE:
      return { ...state, registerLoading: false, registerError: action.payload };
    default:
      return state;
  }
};

export default bookingReducer;
