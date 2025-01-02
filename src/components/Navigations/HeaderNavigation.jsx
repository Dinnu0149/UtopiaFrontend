import React, { useState, useEffect } from "react";
import { Navbar, Form, FormControl, Image, Badge } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Navigation.module.scss";
import user from "../../assets/images/icon/user.png";
import "../../styles/main.scss";
import Notification from "../Popups/Notification";
import UserDropdown from "../Popups/UserDropdown";
import ActionPopUp from "../Popups/ActionPopUp";
import { useDispatch, useSelector } from "react-redux";
import { logoutOpreation } from "../../actions/authActions";
import { saveRedirectPath } from "../../actions/redirectAction";
import { search } from "../../actions/searchAction";
import userIllustration from "../../assets/images/illustrations/user.png";

function HeaderNavigation({ toggleSidebar, isOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);  
  const { loading } = useSelector((state) => state.search);

  const initialState = {
    keyword: "",
  };

  const [showNotification, setShowNotification] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [logoutPop, setLogoutPop] = useState(false);
  const [popupStyle, setPopupStyle] = useState({});
  const [formData, setFormData] = useState(initialState);

  const { unread_notification, profile_picture } = localStorage.getItem(
    "eventUser"
  )
    ? JSON.parse(localStorage.getItem("eventUser"))
    : [];

  useEffect(() => {
    if (!loading && formData?.keyword === "") {
    } else if (
      location.pathname === "/search/event" ||
      location.pathname === "/search/organization"
    ) {
    } else {
      navigate("/search/event");
    }
  }, [navigate, loading]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(search(formData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogout = () => {
    dispatch(logoutOpreation());
    navigate("/login", {
      state: { message: "Logout successful!" },
    });
    dispatch(saveRedirectPath(null, false));
  };

  const handleActionPop = (e) => {
    const rect = e.target.getBoundingClientRect();
    setPopupStyle({
      top: "70%",
      left: `${(rect.left + window.scrollX) / 2}px`,
    });
    setLogoutPop(!logoutPop);
  };

  const handleMouseEnter = () => {
    setShowNotification(true);
  };
  const handleMouseEnterUser = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowNotification(false);
  };
  const handleMouseLeaveUser = () => {
    setShowDropdown(false);
  };

  return (
    <Navbar
      className={`${styles["header"]} ${
        isOpen ? styles["isOpen"] : styles["isClose"]
      }`}
      expand="lg"
    >
      <Navbar.Brand
        className={styles["menu-icon"]}
        onClick={toggleSidebar}
      >
        <i className="fas fa-bars "></i>
      </Navbar.Brand>
        <ActionPopUp
          actionFunc={handleLogout}
          title={"Logout"}
          cancleFunc={() => setLogoutPop(false)}
          postionStyle={popupStyle}
          message="Are you sure you want to leave us"
          handler={{
            icon: "fa-solid fa-right-from-bracket",
            color: "bg-danger",
          }}
          isVisible={logoutPop}
        />
      <Form
        onSubmit={handleSearchSubmit}
        inline="true"
        className={` ${styles["search-form"]} d-none d-sm-block`}
      >
        <FormControl
          type="search"
          placeholder="Search"
          className="mr-sm-2"
          name="keyword"
          required={true}
          value={formData.keyword}
          onChange={handleChange}
        />
      </Form>
      <div
        className=" bg-danger"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {auth.user ? <Notification isVisible={showNotification} /> : ""}
      </div>
      <div className={styles["header-icons"]}>
        {unread_notification > 99 ? (
          <Badge
            className={` rounded-circle ${styles["header-notification-badge"]} `}
          >
            99+
          </Badge>
        ) : unread_notification > 0 ? (
          <Badge
            className={` rounded-circle ${styles["header-notification-badge"]} `}
          >
            {unread_notification}
          </Badge>
        ) : null}
        <i
          className="fas fa-bell rounded-circle "
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        ></i>

        <div
          onMouseEnter={handleMouseEnterUser}
          onMouseLeave={handleMouseLeaveUser}
        >
          <UserDropdown
            isVisible={showDropdown}
            handleActionPop={handleActionPop}
            username={auth.user ? auth.user.username : "Anonymous"}
          />
        </div>
        <Image
          src={
            auth.user && profile_picture
              ? profile_picture
              : auth.user && !profile_picture
              ? userIllustration
              : user
          }
          roundedCircle
          className={styles["profile-pic"]}
          onMouseEnter={handleMouseEnterUser}
          onMouseLeave={handleMouseLeaveUser}
        />
      </div>
    </Navbar>
  );
}

export default HeaderNavigation;
