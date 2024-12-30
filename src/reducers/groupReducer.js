import {
  GROUP_REQUEST,
  GROUP_SUCCESS,
  GROUP_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  response: [],
};

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case GROUP_REQUEST:
      return {
        ...state,
        loading: true,
        response: [],
        error: null,
      };

    case GROUP_SUCCESS:
      return { ...state, loading: false, response: action.payload };

    case GROUP_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default groupReducer;
