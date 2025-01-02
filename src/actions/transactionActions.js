import axiosInstance from "../api/axiosInstance";
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
} from "./actionTypes";

export const getTransactions = (page) => async (dispatch) => {
  dispatch(TransactionsRequest());
  try {
    const response = await axiosInstance.get(`api/wallet/transactions`, {
      params: {
        page: page,
      },
    });
    const data = response?.data;

    dispatch(TransactionsSuccess(data));
  } catch (error) {
    if (error.response?.status === 401) {
      dispatch(TransactionsFailure("Your token has expired, login is required"));
    } else if (error.response?.status === 500) {
      dispatch(TransactionsFailure("An error occured while processing request, try again"));
    } else {
      dispatch(TransactionsFailure(error.response?.data));
    }
  }
};

export const deleteTransaction = (pk) => async (dispatch) => {
  dispatch(deleteTransactionsRequest());
  try {
    const response = await axiosInstance.delete(`api/wallet/transaction/${pk}/`);
    const status = response?.status;

    if (status === 204) {
      dispatch(deleteTransactionsSuccess(status));
    }
  } catch (error) {
    if (error.response?.status === 401) {
      dispatch(deleteTransactionsFailure("Your token has expired, login is required"));
    } else if (error.response?.status === 500) {
      dispatch(deleteTransactionsFailure("An error occured while processing request, try again"));
    } else {
      dispatch(deleteTransactionsFailure(error.response?.data));
    }
  }
};

export const admingetTransactions = (page) => async (dispatch) => {
  dispatch(adminTransactionsRequest());
  try {
    const response = await axiosInstance.get(`api/wallet/admin_transaction`, {
      params: {
        page: page,
      },
    });
    const data = response?.data;

    dispatch(adminTransactionsSuccess(data));
  } catch (error) {
    if (error.response?.status === 401) {
      dispatch(adminTransactionsFailure("Your token has expired, login is required"));
    } else if (error.response?.status === 500) {
      dispatch(adminTransactionsFailure("An error occured while processing request, try again"));
    } else {
      dispatch(adminTransactionsFailure(error.response?.data));
    }
  }
};

export const TransactionsRequest = () => ({
  type: TRANSACTION_REQUEST,
});

export const TransactionsSuccess = (response) => ({
  type: TRANSACTION_SUCCESS,
  payload: response,
});

export const TransactionsFailure = (error) => ({
  type: TRANSACTION_FAILURE,
  payload: error,
});

export const deleteTransactionsRequest = () => ({
  type: DELETETRANSACTION_REQUEST,
});

export const deleteTransactionsSuccess = (response) => ({
  type: DELETETRANSACTION_SUCCESS,
  payload: response,
});

export const deleteTransactionsFailure = (error) => ({
  type: DELETETRANSACTION_FAILURE,
  payload: error,
});

export const adminTransactionsRequest = () => ({
  type: ADMINTRANSACTION_REQUEST,
});

export const adminTransactionsSuccess = (response) => ({
  type: ADMINTRANSACTION_SUCCESS,
  payload: response,
});

export const adminTransactionsFailure = (error) => ({
  type: ADMINTRANSACTION_FAILURE,
  payload: error,
});
