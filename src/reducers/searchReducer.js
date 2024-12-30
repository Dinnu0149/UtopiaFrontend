import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  response: null,
  error: null,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
        response: null,
        error: null,
      };

    case SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload,
      };

      case SEARCH_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

    default:
      return state;
  }
};

export default searchReducer;
