import {
  TRANSACTION_REQUEST,
  TRANSACTION_SUCCESS,
  TRANSACTION_FAILURE,
  DELETETRANSACTION_REQUEST,
  DELETETRANSACTION_SUCCESS,
  DELETETRANSACTION_FAILURE,
  ADMINTRANSACTION_REQUEST,
  ADMINTRANSACTION_SUCCESS,
  ADMINTRANSACTION_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  response: [],

  deleteLoading: false,
  deleteError: null,
  deleteResponse: null,

  adminTransactionLoading: false,
  adminTransactionError: null,
  adminTransactionResponse: null,
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
        response: [],
        deleteResponse: null,
        error: null,
        deleteError: null,
      };

    case TRANSACTION_SUCCESS:
      return { ...state, loading: false, response: action.payload };

    case TRANSACTION_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case DELETETRANSACTION_REQUEST:
      return {
        ...state,
        deleteLoading: true,
        deleteResponse: null,
        deleteError: null,
      };

    case DELETETRANSACTION_SUCCESS:
      return { ...state, deleteLoading: false, deleteResponse: action.payload };

    case DELETETRANSACTION_FAILURE:
      return { ...state, deleteLoading: false, deleteError: action.payload };

    case ADMINTRANSACTION_REQUEST:
      return {
        ...state,
        adminTransactionLoading: true,
        adminTransactionResponse: null,
        adminTransactionError: null,
      };

    case ADMINTRANSACTION_SUCCESS:
      return {
        ...state,
        adminTransactionLoading: false,
        adminTransactionResponse: action.payload,
      };

    case ADMINTRANSACTION_FAILURE:
      return {
        ...state,
        adminTransactionLoading: false,
        adminTransactionError: action.payload,
      };
    default:
      return state;
  }
};

export default transactionReducer;
