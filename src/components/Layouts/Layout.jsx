import React, { useState, useEffect } from "react";
import styles from "./Layout.module.scss";
import "../../styles/main.scss";
import HeaderNavigation from "../Navigations/HeaderNavigation";
import SideNavigation from "../Navigations/SideNavigation";
import UseWindowSize from "../../hooks/UseWindowSize";
import Footer from "../Footer/Footer";
import MessagesPopUp from "../Popups/MessagesPopUp";
import Loading from "../Loading/Loading";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ScrollTopButton from "../ScrollButton/ScrollTopButton";
import { clearMessage } from "../../actions/messageActions";

function Layout({
  children,
  responceState,
  responce,
  responceColor,
  dataLoading,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);
  const { processing, renderMessage, renderColor } = useSelector((state) => state.message);
  
  const { width } = UseWindowSize();
  const isMobile = width <= 768;

  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [message, setMessage] = useState({
    text: responce,
    color: responceColor,
  });

  const [comfirmationAction, setComfirmationAction] = useState(responceState);
  const darkMode = authState.user?.dark_mode;

  useEffect(() => {
    const body = document.body;
    const themeString = darkMode ? "dark" : "light";
    body.setAttribute("data-theme", themeString);
  }, [darkMode]);

  useEffect(() => {
    setComfirmationAction(responceState);
    setMessage({ text: responce, color: responceColor });
  }, [responceState]);

  useEffect(() => {
    if (processing) {
      handleComfirmationPopUps(renderMessage, renderColor)
      dispatch(clearMessage())
    }
  }, [processing, dispatch]);

  useEffect(() => {
    if (location.state?.message) {
      const redirectMessage = location.state?.message;
      handleComfirmationPopUps(redirectMessage, "bg-success");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);

  const handleComfirmationPopUps = (messageInfo, messageBgColor) => {
    setMessage({ text: messageInfo, color: messageBgColor });
    setComfirmationAction(true);
    setTimeout(() => setComfirmationAction(false), 5000);
  };

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`${styles["app-container"]}`}>
      <SideNavigation
        isOpen={isSidebarOpen}
        usergroup={authState.user?.groups}
        user_id={authState.user?.pk}
      />

      <div
        className={`${styles["main-content"]}  ${
          isSidebarOpen ? styles["sidebar-open"] : ""
        }`}
      >
        <HeaderNavigation
          toggleSidebar={toggleSidebar}
          isOpen={isSidebarOpen}
        />
        {!dataLoading ? (
          <div className={`${styles["pagesWrapper"]} mb-5`}>
            <MessagesPopUp
              isVisible={comfirmationAction}
              message={message.text}
              bgColor={message.color}
            />
            {children}
          </div>
        ) : (
          <Loading />
        )}
        <ScrollTopButton />
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
