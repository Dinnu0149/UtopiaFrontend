import React, { useState, useEffect } from "react";
import { Col, Row, Card, Badge } from "react-bootstrap";
import "../../../styles/main.scss";
import styles from "./Notification.module.scss";
import { Link, NavLink } from "react-router-dom";
import Layout from "../../../components/Layouts/Layout";
import PageHeader from "../../../components/Header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotifications,
  deleteNotification,
  markAllNotication,
} from "../../../actions/notificationAction";
import ActionPopUp from "../../../components/Popups/ActionPopUp";
import Paginator from "../../../components/Paginator/Paginator";
import NonAvailable from "../../../components/Loading/NonAvailable";
import { convertDateTime, getFirstCharacters } from "../../../utils/HelperFunc";
import { displayMessage } from "../../../actions/messageActions";
import notificationIllustration from "../../../assets/images/illustrations/notification.png";

function Notifications() {
  const dispatch = useDispatch();
  const {
    response,
    loading,
    error,
    deleteError,
    deleteResponse,
    markAllResponse,
    markAllError,
  } = useSelector((state) => state.notification);
  const { results: notifications = [], count = 0 } = response;

  const [popupId, setPopupId] = useState(null);
  const [deletePop, setDeletePop] = useState(false);
  const [popupStyle, setPopupStyle] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const unread_notification = JSON.parse(
    localStorage.getItem("eventUser")
  ).unread_notification;

  useEffect(() => {
    dispatch(getNotifications(currentPage));
  }, [dispatch, currentPage, deleteResponse, markAllResponse]);

  useEffect(() => {
    if (error) {
      dispatch(displayMessage(error, "bg-danger"));
    }
  }, [error]);

  useEffect(() => {
    if (deleteError || deleteResponse) {
      const messageInfo = deleteResponse
        ? "Notification deleted successfully!"
        : deleteError;
      const messageColor = deleteResponse ? "bg-success" : "bg-danger";

      dispatch(displayMessage(messageInfo, messageColor));
    }
  }, [deleteResponse, deleteError]);

  useEffect(() => {
    if (markAllError || markAllResponse) {
      const messageInfo = markAllResponse
        ? "Notifications marked successfully!"
        : markAllError;
      const messageColor = markAllResponse ? "bg-success" : "bg-danger";

      dispatch(displayMessage(messageInfo, messageColor));
    }
  }, [markAllResponse, markAllError]);

  const handleActionPop = (e, pk) => {
    const rect = e.target.getBoundingClientRect();
    setPopupStyle({
      right: `${(rect.left + window.scrollX) / 8}px`,
    });

    if (popupId === pk && deletePop) {
      setDeletePop(false);
      setPopupId(null);
    } else {
      setDeletePop(true);
      setPopupId(pk);
    }
  };

  const handleNotificationDelete = (pk) => {
    dispatch(deleteNotification(pk));
    setDeletePop(false);
    setPopupId(null)
  };

  const handleMarkAllNotification = () => {
    if (unread_notification > 0) {
      dispatch(markAllNotication());
    } else {
      const messageColor = "bg-danger";
      const messageInfo = "All notification is checked";
      dispatch(displayMessage(messageInfo, messageColor));
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Layout
      dataLoading={loading}
    >
      <section className="mx-3">
        <PageHeader title={"Notifications"} />
        <Row className="mb-2">
          <Col>
            <Link className="float-end" onClick={handleMarkAllNotification}>
              Mark all as read
            </Link>
          </Col>
        </Row>
        {notifications && notifications.length > 0 ? (
          <Row className="mb-2">
            {notifications.map((notification) => {
              return (
                <Col
                  xl={6}
                  lg={6}
                  md={6}
                  sm={12}
                  xs={12}
                  className="mb-3"
                  key={notification.pk}
                >
                  <Card className="rounded rounded-4 border-0 shadow">
                    <Card.Body
                      as={NavLink}
                      to={`/notification/${notification.pk}`}
                    >
                      <Row>
                        <Col>
                          <h5 className="fw-bold">{notification.title}</h5>
                        </Col>
                        {!notification.is_read ? (
                          <Col>
                            <Badge bg="danger" className="float-end me-3 fw-bold">+</Badge>
                          </Col>
                        ) : (
                          ""
                        )}
                      </Row>
                      <p>{getFirstCharacters(notification.message, 50)}</p>
                    </Card.Body>
                    <Card.Footer>
                      <Row className="p-0 m-0">
                        <Col xs={8} sm={8}>
                          <p className="p-0 m-0 mb-2">
                            {convertDateTime(notification.created_at)}
                          </p>
                        </Col>
                        <Col xs={4} sm={4}>
                          <i
                            className={`float-end fa-solid fa-trash-can text-danger mt-2 fs-5 ${styles['notificationDeleteIcon']}`}
                            onClick={(e) => handleActionPop(e, notification.pk)}
                          ></i>
                            <ActionPopUp
                              actionFunc={() =>
                                handleNotificationDelete(popupId)
                              }
                              title={"Delete"}
                              message="Are you sure you want to delete notification"
                              cancleFunc={() => setDeletePop(null)}
                              postionStyle={popupStyle}
                              isVisible={popupId === notification.pk ? deletePop : false}
                            />
                        </Col>
                      </Row>
                    </Card.Footer>
                  </Card>
                </Col>
              );
            })}
          </Row>
        ) : (
          <NonAvailable message="You have no notification" imageSrc={notificationIllustration}/>
        )}
        <Paginator
          currentPage={currentPage}
          totalItems={count}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </section>
    </Layout>
  );
}

export default Notifications;
