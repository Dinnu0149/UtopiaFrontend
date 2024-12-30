import {
  CATEGORY_REQUEST,
  CATEGORY_SUCCESS,
  CATEGORY_FAILURE,
  CREATECATEGORY_REQUEST,
  CREATECATEGORY_SUCCESS,
  CREATECATEGORY_FAILURE,
  UPDATECATEGORY_REQUEST,
  UPDATECATEGORY_SUCCESS,
  UPDATECATEGORY_FAILURE,
  DELETECATEGORY_REQUEST,
  DELETECATEGORY_SUCCESS,
  DELETECATEGORY_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  response: [],

  createLoading: false,
  createError: null,
  createResponse: null,

  updateLoading: false,
  updateError: null,
  updateResponse: null,

  deleteLoading: false,
  deleteError: null,
  deleteResponse: null,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        createResponse: null,
        createError: null,
        response: [],
        deleteResponse: null,
        error: null,
        deleteError: null,
        updateResponse: null,
        updateError: null
      };

    case CATEGORY_SUCCESS:
      return { ...state, loading: false, response: action.payload };

    case CATEGORY_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CREATECATEGORY_REQUEST:
      return {
        ...state,
        createLoading: true,
        createError: null,
        createResponse: null,
      };

    case CREATECATEGORY_SUCCESS:
      return { ...state, createLoading: false, createResponse: action.payload };

    case CREATECATEGORY_FAILURE:
      return { ...state, createLoading: false, createError: action.payload };


      case UPDATECATEGORY_REQUEST:
      return {
        ...state,
        updateLoading: true,
        updateResponse: null,
        updateError: null,
      };

    case UPDATECATEGORY_SUCCESS:
      return { ...state, updateLoading: false, updateResponse: action.payload };

    case UPDATECATEGORY_FAILURE:
      return { ...state, updateLoading: false, updateError: action.payload };

    case DELETECATEGORY_REQUEST:
      return {
        ...state,
        deleteLoading: true,
        deleteResponse: null,
        deleteError: null,
      };

    case DELETECATEGORY_SUCCESS:
      return { ...state, deleteLoading: false, deleteResponse: action.payload };

    case DELETECATEGORY_FAILURE:
      return { ...state, deleteLoading: false, deleteError: action.payload };

    default:
      return state;
  }
};

export default categoryReducer;
