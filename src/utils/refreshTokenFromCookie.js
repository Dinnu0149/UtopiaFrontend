import Cookies from "js-cookie";

export const setRefreshTokenInCookie = (refreshToken) => {
  Cookies.set("refreshToken", refreshToken, {
    expires: 7,
    secure: true,
    sameSite: "Strict",
    path: "/",
  });
};

export const getRefreshTokenFromCookie = () => {
  return Cookies.get("refreshToken");
};
