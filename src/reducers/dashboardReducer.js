import {
    DASHBOARD_REQUEST,
    DASHBOARD_SUCCESS,
    DASHBOARD_FAILURE,

  } from "../actions/actionTypes";

  const initialState = {
    loading: false,
    error: null,
    response: [],

  };

  const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
      case DASHBOARD_REQUEST:
        return {
          ...state,
          loading: true,
          response: [],
          error: null,
        };
  
      case DASHBOARD_SUCCESS:
        return { ...state, loading: false, response: action.payload };
  
      case DASHBOARD_FAILURE:
        return { ...state, loading: false, error: action.payload };

        default:
            return state;
        }
      };
      
      export default dashboardReducer;