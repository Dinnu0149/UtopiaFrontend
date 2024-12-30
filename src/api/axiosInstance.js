import axios from "axios";
import store from "../store";
import { refreshToken, logoutOpreation, clearAuthResponse } from "../actions/authActions";
import { getRefreshTokenFromCookie } from "../utils/refreshTokenFromCookie";

export const plainAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_EVENT_MANAGEMENT,
  headers: {
    "Content-Type": "application/json",
  },
});
 
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_EVENT_MANAGEMENT,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const accessToken = state.auth.accessToken;

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const baseUrl = process.env.REACT_APP_EVENT_MANAGEMENT;
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(`${baseUrl}/api/token/refresh/`, {
          refresh: getRefreshTokenFromCookie(),
        });

        const newAccessToken = response.data.access;
        store.dispatch(refreshToken(newAccessToken));

        axiosInstance.defaults.headers[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        
        return axiosInstance(originalRequest);
      } catch (err) {    
        console.log(err);
            
        store.dispatch(logoutOpreation());
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
