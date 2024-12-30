import {
  FOLLOWER_REQUEST,
  FOLLOWER_SUCCESS,
  FOLLOWER_FAILURE,
  EDITFOLLOWER_REQUEST,
  EDITFOLLOWER_SUCCESS,
  EDITFOLLOWER_FAILURE,
  CLEAREDITFOLLOWER_RESPONSE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  response: [],
  editLoading: false,
  editError: null,
  editResponse: null,
};

const followerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOWER_REQUEST:
      return { ...state, loading: true, error: null, editResponse: null };

    case FOLLOWER_SUCCESS:
      return { ...state, loading: false, response: action.payload };

    case FOLLOWER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case EDITFOLLOWER_REQUEST:
      return {
        ...state,
        editLoading: true,
        editResponse: null,
        editError: null,
      };

    case EDITFOLLOWER_SUCCESS:
      return { ...state, editLoading: false, editResponse: action.payload };

    case EDITFOLLOWER_FAILURE:
      return { ...state, editLoading: false, editError: action.payload };

    case CLEAREDITFOLLOWER_RESPONSE:
      return {
        ...state,
        editLoading: false,
        editError: null,
        editResponse: null,
      };

    default:
      return state;
  }
};

export default followerReducer;
