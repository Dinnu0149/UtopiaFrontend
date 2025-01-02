import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet, useNavigate, useLocation } from "react-router-dom";
import { saveRedirectPath } from "../actions/redirectAction";

const userGroupDashboard = () => {
  const auth = JSON.parse(localStorage.getItem("eventUser"));
  const groups = auth && auth.groups ? auth.groups : [];

  if (groups.includes("admin")) return "/admin/dashboard";
  if (groups.includes("organizer")) return "/organizer/dashboard";
  if (groups.includes("attendee")) return "/attendee/dashboard";
  return "/";
};

export const UserAllowed = (allowedGroups = []) => {
  const auth = JSON.parse(localStorage.getItem("eventUser"));
  const isAllowed = auth ? allowedGroups.some((group) => auth.groups.includes(group)) : null;
  if (isAllowed) return true;
};

export const UnauthencatedRoute = () => {
  const { user } = useSelector((state) => state.auth);
  const {redirectPath, allowRedirect} = useSelector((state) => state.redirect);
  let currentRedirectPath;

  if (redirectPath && allowRedirect) {
    currentRedirectPath = redirectPath;
  } else {
    currentRedirectPath = userGroupDashboard();
  }

  return user ? (
    <Navigate
      to={currentRedirectPath}
      replace
      state={{ message: "Login successful!" }}
    />
  ) : (
    <Outlet />
  );
};

export const AuthencatedRoute = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(saveRedirectPath(location.pathname, true));
  }, [dispatch, location.pathname]);

  return !user ? (
    <Navigate to={"/login"} replace state={{ message: "Login required!" }} />
  ) : (
    <Outlet />
  );
};

export const PrivateGroupRoute = ({ allowedGroups }) => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const isAllowed = allowedGroups.some((group) =>
    auth.user.groups.includes(group)
  );

  useEffect(() => {
    if (auth.user && !isAllowed) {
      navigate(userGroupDashboard(), {
        state: { message: "Not authorized to access!" },
      });
    }
  }, [auth.user, navigate]);

  return <Outlet />;
};

export const OrganizationProfileRequired = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  if (auth.user?.is_new_user) {
    dispatch(saveRedirectPath(location.pathname));

    return (
      <Navigate
        to={`/organization/profile/edit/${auth.user.pk}/`}
        replace
        state={{ message: "Organization profile required!" }}
      />
    );
  }

  return <Outlet />;
};
