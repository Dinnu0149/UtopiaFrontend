import React, { useState, useEffect } from "react";
import { Col, Row, Card, Button } from "react-bootstrap";
import "../../../styles/main.scss";
import Layout from "../../../components/Layouts/Layout";
import PageHeader from "../../../components/Header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotification,
  deleteNotification,
} from "../../../actions/notificationAction";
import ActionPopUp from "../../../components/Popups/ActionPopUp";
import { useParams, useNavigate } from "react-router-dom";
import { convertDateTime } from "../../../utils/HelperFunc";
import { displayMessage } from "../../../actions/messageActions";

function NotificationDetail() {
  const { pk } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    getLoading,
    getError,
    getResponse: notification,
    deleteError,
    deleteResponse,
  } = useSelector((state) => state.notification);

  const [deletePop, setDeletePop] = useState(false);
  const [popupStyle, setPopupStyle] = useState({});

  useEffect(() => {
    dispatch(getNotification(pk));
  }, [dispatch]);

  useEffect(() => {
    if (getError) {
      dispatch(displayMessage(getError, "bg-danger"));
    }
  }, [getError]);

  useEffect(() => {
    if (deleteResponse) {
      navigate("/Notifications", {
        state: { message: "Deleted successful!" },
      });
    } else if (deleteError) {
      const messageInfo = deleteError;
      const messageColor = deleteResponse ? "bg-success" : "bg-danger";
      dispatch(displayMessage(messageInfo, messageColor));
    }
  }, [deleteResponse, deleteError]);

  const handleActionPop = (e) => {
    const rect = e.target.getBoundingClientRect();
    setPopupStyle({
      right: `${(rect.left + window.scrollX) / 8}px`,
    });
    setDeletePop(!deletePop);
  };

  const handleNotificationDelete = () => {
    dispatch(deleteNotification(pk));
    setDeletePop(null);
  };


  return (
    <Layout
      dataLoading={getLoading}
    >
      <section className="mx-3">
        <PageHeader title={"Notification Detail"} />
        <Row className="mb-3">
          <Col>
            <Button
              className="float-end bg-danger px-5 text-light"
              onClick={handleActionPop}
            >
              Delete
            </Button>
              <ActionPopUp
                actionFunc={() => handleNotificationDelete()}
                title={"Delete"}
                message="Are you sure you want to delete notification"
                cancleFunc={() => setDeletePop(null)}
                postionStyle={popupStyle}
                isVisible={deletePop}
              />
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mb-3">
          <Col lg={6}>
            <Card className="rounded rounded-4 border-0 shadow">
              <Card.Body>
                <Row>
                  <Col>
                    <h5>{notification.title}</h5>
                  </Col>
                </Row>
                <p>{notification.message}</p>
              </Card.Body>
              <Card.Footer>
                <Row className="p-0 m-0">
                  <Col xs={8} sm={8}>
                    <p className="p-0 m-0 mb-2">
                      {convertDateTime(notification.created_at)}
                    </p>
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </section>
    </Layout>
  );
}

export default NotificationDetail;
