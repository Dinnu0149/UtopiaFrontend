import {
    REVENUE_REQUEST,
    REVENUE_SUCCESS,
    REVENUE_FAILURE,
    DELETEREVENUE_REQUEST,
    DELETEREVENUE_SUCCESS,
    DELETEREVENUE_FAILURE,
  } from "../actions/actionTypes";

  const initialState = {
    loading: false,
    error: null,
    response: [],
  
    deleteLoading: false,
    deleteError: null,
    deleteResponse: null,
  };

  const revenueReducer = (state = initialState, action) => {
    switch (action.type) {
      case REVENUE_REQUEST:
        return {
          ...state,
          loading: true,
          response: [],
          deleteResponse: null,
          error: null,
          deleteError: null,
        };
  
      case REVENUE_SUCCESS:
        return { ...state, loading: false, response: action.payload };
  
      case REVENUE_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      case DELETEREVENUE_REQUEST:
        return {
          ...state,
          deleteLoading: true,
          deleteResponse: null,
          deleteError: null,
        };
  
      case DELETEREVENUE_SUCCESS:
        return { ...state, deleteLoading: false, deleteResponse: action.payload };
  
      case DELETEREVENUE_FAILURE:
        return { ...state, deleteLoading: false, deleteError: action.payload };
      default:
        return state;
    }
  };
  
  export default revenueReducer;