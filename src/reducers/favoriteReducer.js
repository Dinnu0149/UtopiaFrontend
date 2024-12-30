import {
    FAVORITE_REQUEST,
    FAVORITE_SUCCESS,
    FAVORITE_FAILURE,
    UPDATEFAVORITE_REQUEST,
    UPDATEFAVORITE_SUCCESS,
    UPDATEFAVORITE_FAILURE,
  } from "../actions/actionTypes";

  const initialState = {
    loading: false,
    error: null,
    response: [],
  
    updateLoading: false,
    updateError: null,
    updateResponse: [],
  };

  const favoriteReducer = (state = initialState, action) => {
    switch (action.type) {
      case FAVORITE_REQUEST:
        return {
          ...state,
          loading: true,
          response: [],
          updateResponse: [],
          error: null,
          updateError: null,
        };
  
      case FAVORITE_SUCCESS:
        return { ...state, loading: false, response: action.payload };
  
      case FAVORITE_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
  
      case UPDATEFAVORITE_REQUEST:
        return {
          ...state,
          updateLoading: true,
          updateResponse: [],
          updateError: null,
        };
  
      case UPDATEFAVORITE_SUCCESS:
        return { ...state, updateLoading: false, updateResponse: action.payload };
  
      case UPDATEFAVORITE_FAILURE:
        return { ...state, updateLoading: false, updateError: action.payload };
  
      default:
        return state;
    }
  };
  
  export default favoriteReducer;