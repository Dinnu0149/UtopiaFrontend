import {
  ADMINWALLET_REQUEST,
  ADMINWALLET_SUCCESS,
  ADMINWALLET_FAILURE,
  ADMINREVENUE_REQUEST,
  ADMINREVENUE_SUCCESS,
  ADMINREVENUE_FAILURE,
  REVENUEWITHDRAWALPAYMENT_SUCCESS,
  REVENUEWITHDRAWALPAYMENT_REQUEST,
  REVENUEWITHDRAWALPAYMENT_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  response: [],
  revenueLoading: false,
  revenueError: null,
  revenueResponse: [],
  revenueWithdrawalLoading: false,
  revenueWithdrawalError: null,
  revenueWithdrawalResponse: null,
};

const adminWalletReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMINWALLET_REQUEST:
      return {
        ...state,
        loading: true,
        response: [],
        error: null,
      };

    case ADMINWALLET_SUCCESS:
      return { ...state, loading: false, response: action.payload };

    case ADMINWALLET_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case ADMINREVENUE_REQUEST:
      return {
        ...state,
        revenueLoading: true,
        revenueResponse: [],
        revenueError: null,
        revenueWithdrawalError: null,
        revenueWithdrawalResponse: null
      };

    case ADMINREVENUE_SUCCESS:
      return {
        ...state,
        revenueLoading: false,
        revenueResponse: action.payload,
      };

    case ADMINREVENUE_FAILURE:
      return { ...state, revenueLoading: false, revenueError: action.payload };

    case REVENUEWITHDRAWALPAYMENT_REQUEST:
      return {
        ...state,
        revenueWithdrawalLoading: true,
        revenueWithdrawalResponse: null,
        revenueWithdrawalError: null,
      };

    case REVENUEWITHDRAWALPAYMENT_SUCCESS:
      return {
        ...state,
        revenueWithdrawalLoading: false,
        revenueWithdrawalResponse: action.payload,
      };

    case REVENUEWITHDRAWALPAYMENT_FAILURE:
      return {
        ...state,
        revenueWithdrawalLoading: false,
        revenueWithdrawalError: action.payload,
      };

    default:
      return state;
  }
};

export default adminWalletReducer;
