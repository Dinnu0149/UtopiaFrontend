import {
  USERADMINEVENT_REQUEST,
  USERADMINEVENT_SUCCESS,
  USERADMINEVENT_FAILURE,
  USERADMINAPPROVALUPDATE_REQUEST,
  USERADMINAPPROVALUPDATE_SUCCESS,
  USERADMINAPPROVALUPDATE_FAILURE,
  EVENTACTIVATION_REQUEST,
  EVENTACTIVATION_SUCCESS,
  EVENTACTIVATION_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  response: [],

  updateLoading: false,
  updateError: null,
  updateResponse: null,

  activationLoading: false,
  activationError: null,
  activationResponse: null,
};

const userAdminEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERADMINEVENT_REQUEST:
      return {
        ...state,
        loading: true,
        response: [],
        updateResponse: null,
        error: null,
        updateError: null,
        activationError: null,
        activationResponse: null,
      };

    case USERADMINEVENT_SUCCESS:
      return { ...state, loading: false, response: action.payload };

    case USERADMINEVENT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case USERADMINAPPROVALUPDATE_REQUEST:
      return {
        ...state,
        updateLoading: true,
        updateResponse: null,
        updateError: null,
      };

    case USERADMINAPPROVALUPDATE_SUCCESS:
      return { ...state, updateLoading: false, updateResponse: action.payload };

    case USERADMINAPPROVALUPDATE_FAILURE:
      return { ...state, updateLoading: false, updateError: action.payload };

    case EVENTACTIVATION_REQUEST:
      return {
        ...state,
        activationLoading: true,
        activationResponse: null,
        activationError: null,
      };

    case EVENTACTIVATION_SUCCESS:
      return {
        ...state,
        activationLoading: false,
        activationResponse: action.payload,
      };

    case EVENTACTIVATION_FAILURE:
      return {
        ...state,
        activationLoading: false,
        activationError: action.payload,
      };

    default:
      return state;
  }
};

export default userAdminEventReducer;
