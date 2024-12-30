import {
  INITIALIZATION_FAILURE,
  INITIALIZATION_SUCCESS,
  INITIALIZATION_REQUEST,
  VERIFICATION_REQUEST,
  VERIFICATION_SUCCESS,
  VERIFICATION_FAILURE,
  CLEARPAYMENT_RESPONSE,
} from "../actions/actionTypes";

const initialState = {
  initializationLoading: false,
  initializationError: null,
  initializationResponse: null,
  verificationResponse: null,
  verificationLoading: false,
  verificationError: null,
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZATION_REQUEST:
      return {
        ...state,
        initializationLoading: true,
        initializationError: null,
        initializationResponse: null,
      };

    case INITIALIZATION_SUCCESS:
      return {
        ...state,
        initializationLoading: false,
        initializationResponse: action.payload,
      };

    case INITIALIZATION_FAILURE:
      return {
        ...state,
        initializationLoading: false,
        initializationError: action.payload,
      };

    case VERIFICATION_REQUEST:
      return {
        ...state,
        verificationLoading: true,
        verificationError: null,
        verificationResponse: null,
      };

    case VERIFICATION_SUCCESS:
      return {
        ...state,
        verificationLoading: false,
        verificationResponse: action.payload,
      };

    case VERIFICATION_FAILURE:
      return {
        ...state,
        verificationLoading: false,
        verificationError: action.payload,
      };

    case CLEARPAYMENT_RESPONSE:
      return {
        ...state,
        verificationError: null,
        verificationResponse: null,
        initializationResponse: null,
        initializationError: null
      };

    default:
      return state;
  }
};

export default paymentReducer;
