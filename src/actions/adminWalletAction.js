import axiosInstance from "../api/axiosInstance";
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
} from "./actionTypes";

export const getAdminWallet = () => async (dispatch) => {
  dispatch(walletRequest());
  try {
    const response = await axiosInstance.get(`api/wallet/admin_wallet/`);
    const data = response?.data;

    dispatch(walletSuccess(data));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(walletFailure("Your token has expired, login is required"));
    } else if (error.response.status === 500) {
      dispatch(walletFailure("An error occured while processing request, try again"));
    } else {
      dispatch(walletFailure(error.response?.data));
    }
  }
};

export const getAdminRevenues = (page) => async (dispatch) => {
  dispatch(AdminRevenuesRequest());
  try {
    const response = await axiosInstance.get(`api/event/admin_revenues`, {
      params: {
        page: page,
      },
    });
    const data = response?.data;

    dispatch(AdminRevenuesSuccess(data));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(AdminRevenuesFailure("Your token has expired, login is required"));
    } else if (error.response.status === 500) {
      dispatch(AdminRevenuesFailure("An error occured while processing request, try again"));
    } else {
      dispatch(AdminRevenuesFailure(error.response?.data));
    }
  }
};

export const processRevenueWithdrawal = (pk) => async (dispatch) => {
  dispatch(RevenueWithdrawalRequest());
  try {
    const response = await axiosInstance.put(
      `api/wallet/revenue-withdrawal/${pk}/`
    );
    const data = response?.data;

    dispatch(RevenueWithdrawalSuccess(data));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(RevenueWithdrawalFailure("Your token has expired, login is required"));
    } else if (error.response.status === 500) {
      dispatch(RevenueWithdrawalFailure("An error occured while processing request, try again"));
    } else {
      dispatch(RevenueWithdrawalFailure(error.response?.data));
    }
  }
};

export const walletRequest = () => ({
  type: ADMINWALLET_REQUEST,
});

export const walletSuccess = (response) => ({
  type: ADMINWALLET_SUCCESS,
  payload: response,
});

export const walletFailure = (error) => ({
  type: ADMINWALLET_FAILURE,
  payload: error,
});

export const AdminRevenuesRequest = () => ({
  type: ADMINREVENUE_REQUEST,
});

export const AdminRevenuesSuccess = (response) => ({
  type: ADMINREVENUE_SUCCESS,
  payload: response,
});

export const AdminRevenuesFailure = (error) => ({
  type: ADMINREVENUE_FAILURE,
  payload: error,
});

export const RevenueWithdrawalRequest = () => ({
  type: REVENUEWITHDRAWALPAYMENT_REQUEST,
});

export const RevenueWithdrawalSuccess = (response) => ({
  type: REVENUEWITHDRAWALPAYMENT_SUCCESS,
  payload: response,
});

export const RevenueWithdrawalFailure = (error) => ({
  type: REVENUEWITHDRAWALPAYMENT_FAILURE,
  payload: error,
});
