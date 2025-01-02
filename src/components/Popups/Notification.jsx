import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import styles from "./Popups.module.scss";
import "../../styles/main.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotifications,
} from "../../actions/notificationAction";
import { getFirstCharacters } from "../../utils/HelperFunc";

function Notification({ isVisible }) {
  const dispatch = useDispatch();
  const { popResponse: notifications = [] , loading, error,  } = useSelector(
    (state) => state.notification
  );
  const [currentPage, setCurrentPage] = useState(1);

  const unread_notification = JSON.parse(
    localStorage.getItem("eventUser")
  )?.unread_notification;
  
  useEffect(() => {    
    const totalUnread = notifications.length
    if (totalUnread !== unread_notification) {
      let existing = localStorage.getItem("eventUser");
      existing = existing ? JSON.parse(existing) : {};
      existing["unread_notification"] = totalUnread;
    
      localStorage.setItem("eventUser", JSON.stringify(existing));
    } 
  }, [notifications]);
  
  useEffect(() => {
    dispatch(getNotifications(currentPage, 'true', 'true'));
  }, [dispatch]);
  
  return (
    <CSSTransition
      in={isVisible}
      timeout={400}
      classNames={{
        enter: styles["enter"],
        enterActive: styles["enter-active"],
        exit: styles["exit"],
        exitActive: styles["exited-active"],
      }}
      unmountOnExit
    >
      <Card
        className={`${styles["notification-container"]} shadow  border-0`}
        id="notification-component"
      >
        <div className={styles["notification-header"]}>
          <h5>Notifications</h5>
          <Link to={'/settings'}>
            <i className="fa-solid fa-gear fa-spin-pulse "></i>
          </Link>
        </div>
        <Card.Body className={`${styles["notification-body"]} `}>
        {notifications && notifications.length > 0 ? (
          notifications.slice(0, 3).map((notification) => (
            <div key={notification.pk} className={styles["notification-item"]}>
              <Link to={`/notification/${notification.pk}`} className="">
                <h5 className={`fw-bold mb-0 ${styles["notification-title"]}`}>
                  {notification.title}
                </h5>
              </Link>
              <p className={styles["notification-message"]}>
                {getFirstCharacters(notification.message, 80)}
              </p>
            </div>
          ))
        ) : loading ? (
          <p className="text-center"><i className="fa-solid fa-spinner fa-spin-pulse mx-2"></i>loading... </p>
        ) : error ? ( 
          <p className="text-center">{error} </p>
        ) : (
          <p className="text-center"> No unread notification avaliable </p>
        )} 
        </Card.Body>
        <div className={styles["notification-footer"]}>
          <Link to={`/notifications`}>See all Notifications</Link>
        </div>
      </Card>
    </CSSTransition>
  );
}

export default Notification;
