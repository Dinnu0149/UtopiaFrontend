import {
  GOOGLE_FAILURE,
  GOOGLE_SUCCESS,
  GOOGLE_REQUEST,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SET_USER,
  UPDATE_USER_PROFILE_ITEM,
  LOGIN_FAILURE,
  LOGOUT,
  REFRESH_TOKEN,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_REQUEST,
  FORGETPASSWORD_SUCCESS,
  FORGETPASSWORD_REQUEST,
  RESETPASSWORD_FAILURE,
  RESETPASSWORD_SUCCESS,
  RESETPASSWORD_REQUEST,
  CHANGEPASSWORD_REQUEST,
  CHANGEPASSWORD_SUCCESS,
  CHANGEPASSWORD_FAILURE,
  CHANGEUSERPASSWORD_REQUEST,
  CHANGEUSERPASSWORD_SUCCESS,
  CHANGEUSERPASSWORD_FAILURE,
  CLEAR_AUTHRESPONSE,
} from "../actions/actionTypes";

const initialUser = (() => {
  try {
    return localStorage.getItem("eventUser")
      ? JSON.parse(localStorage.getItem("eventUser"))
      : null;
  } catch (error) {
    console.error("Failed to parse user from localStorage", error);
    return null;
  }
})();

const initialState = {
  loading: false,
  user: initialUser,
  signupResponse: null,
  error: null,
  accessToken: null,
  response: null,
  passwordChangeLoading: false,
  passwordChangeResponse: null,
  passwordChangeError: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOOGLE_REQUEST:
      return { ...state, loading: true, error: null };

    case GOOGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        accessToken: action.payload,
      };

    case GOOGLE_FAILURE:
      return { ...state, loading: false, error: action.payload, user: null };
      
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        accessToken: action.payload,
      };

    case SET_USER:
      return { ...state, loading: false, user: action.payload };

    case UPDATE_USER_PROFILE_ITEM:
      return {
        ...state,
        user: {
          ...state.user,
          [action.payload.key]: action.payload.value,
        },
      };

    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload, user: null };

    case SIGNUP_REQUEST:
      return { ...state, loading: true, error: null, user: null };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        signupResponse: action.payload,
      };

    case SIGNUP_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FORGETPASSWORD_REQUEST:
      return { ...state, loading: true, response: null };

    case FORGETPASSWORD_SUCCESS:
      return { ...state, loading: false, response: action.payload };

    case RESETPASSWORD_REQUEST:
      return { ...state, loading: true, response: null, error: null };

    case RESETPASSWORD_SUCCESS:
      return { ...state, loading: false, response: action.payload };

    case RESETPASSWORD_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CHANGEPASSWORD_REQUEST:
      return { ...state, loading: true, response: null, error: null };

    case CHANGEPASSWORD_SUCCESS:
      return { ...state, loading: false, response: action.payload };

    case CHANGEPASSWORD_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CHANGEUSERPASSWORD_REQUEST:
      return {
        ...state,
        passwordChangeLoading: true,
        passwordChangeResponse: null,
        passwordChangeError: null,
      };

    case CHANGEUSERPASSWORD_SUCCESS:
      return {
        ...state,
        passwordChangeLoading: false,
        passwordChangeResponse: action.payload,
      };

    case CHANGEUSERPASSWORD_FAILURE:
      return {
        ...state,
        passwordChangeLoading: false,
        passwordChangeError: action.payload,
      };

    case LOGOUT:
      return {
        ...initialState,
        user: null,
        accessToken: null,
      };

    case REFRESH_TOKEN:
      return { ...state, accessToken: action.payload };

    case CLEAR_AUTHRESPONSE:
      return {
        ...state,
        error: null,
        signupResponse: null,
        response: null,
        passwordChangeResponse: null,
        passwordChangeError: null,
      };

    default:
      return state;
  }
};

export default authReducer;
