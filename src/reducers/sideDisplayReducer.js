import {
  SIDEDISPLAY_REQUEST,
  SIDEDISPLAY_SUCCESS,
  SIDEDISPLAY_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  response: [],
};

const sideDisplayReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIDEDISPLAY_REQUEST:
      return {
        ...state,
        loading: true,
        response: [],
        error: null,
      };

    case SIDEDISPLAY_SUCCESS:
      return { ...state, loading: false, response: action.payload };

    case SIDEDISPLAY_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default sideDisplayReducer;
