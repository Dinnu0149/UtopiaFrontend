import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILURE,
  USERSTATUSUPDATE_REQUEST,
  USERSTATUSUPDATE_SUCCESS,
  USERSTATUSUPDATE_FAILURE,
  DELETEIDUSER_REQUEST,
  DELETEIDUSER_SUCCESS,
  DELETEIDUSER_FAILURE,

} from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  response: [],

  statusLoading: false,
  statusError: null,
  statusResponse: null,

  deleteLoading: false,
  deleteError: null,
  deleteResponse: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return {
        ...state,
        loading: true,
        response: [],
        deleteResponse: null,
        error: null,
        deleteError: null,
        statusError: null,
        statusResponse: null,
      };

    case USER_SUCCESS:
      return { ...state, loading: false, response: action.payload };

    case USER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case USERSTATUSUPDATE_REQUEST:
      return {
        ...state,
        statusLoading: true,
        statusError: null,
        statusResponse: null,
      };

    case USERSTATUSUPDATE_SUCCESS:
      return { ...state, statusLoading: false, statusResponse: action.payload };

    case USERSTATUSUPDATE_FAILURE:
      return { ...state, statusLoading: false, statusError: action.payload };


    case DELETEIDUSER_REQUEST:
      return {
        ...state,
        deleteLoading: true,
        deleteResponse: null,
        deleteError: null,
      };

    case DELETEIDUSER_SUCCESS:
      return { ...state, deleteLoading: false, deleteResponse: action.payload };

    case DELETEIDUSER_FAILURE:
      return { ...state, deleteLoading: false, deleteError: action.payload };
    default:
      return state;
  }
};

export default userReducer;
