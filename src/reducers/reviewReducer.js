import {
  REVIEW_REQUEST,
  REVIEW_SUCCESS,
  REVIEW_FAILURE,
  CREATEREVIEW_REQUEST,
  CREATEREVIEW_SUCCESS,
  CLEARCREATEREVIEW_RESPONSE,
  CREATEREVIEW_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  response: [],

  createLoading: false,
  createError: null,
  createResponse: null,
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
        createResponse: null,
        createError: null,
        response: [],
        error: null,
      
      };

    case REVIEW_SUCCESS:
      return { ...state, loading: false, response: action.payload };

    case REVIEW_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CREATEREVIEW_REQUEST:
      return {
        ...state,
        createLoading: true,
        createError: null,
        createResponse: null,
      };

    case CREATEREVIEW_SUCCESS:
      return { ...state, createLoading: false, createResponse: action.payload };

    case CLEARCREATEREVIEW_RESPONSE:
      return {
        ...state,
        createLoading: false,
        createResponse: null,
        deleteResponse: null,
      };

    case CREATEREVIEW_FAILURE:
      return { ...state, createLoading: false, createError: action.payload };

    default:
      return state;
  }
};

export default reviewReducer;
