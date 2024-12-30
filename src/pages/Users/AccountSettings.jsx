import React, { useState, useEffect, useCallback } from "react";
import { Col, Row, Form, Card, Button, Spinner } from "react-bootstrap";
import styles from "./User.module.scss";
import "../../styles/main.scss";
import Layout from "../../components/Layouts/Layout";
import PageHeader from "../../components/Header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserSetting,
  editUserSetting,
  clearSettingResponse,
} from "../../actions/profileActions";
import { updateUserProfileItem } from "../../actions/authActions";
import { displayMessage } from "../../actions/messageActions";

function AccountSettings() {
  const dispatch = useDispatch();
  const {
    settingResponse,
    settingLoading,
    settingError,
    editSettingResponse,
    editSettingLoading,
    editSettingError,
  } = useSelector((state) => state.profile);
  const [editedFormData, setEditedFormData] = useState({
    email_notification: false,
    dark_mode: false,
    following_organization_post: false,
    ticket_started: false,
    filter_location_events: false
  });

  useEffect(() => {
    dispatch(getUserSetting());
  }, [dispatch]);

  useEffect(() => {
    if (settingResponse) {      
      setEditedFormData({
        email_notification: settingResponse.email_notification ?? false,
        dark_mode: settingResponse.dark_mode ?? false,
        following_organization_post:
          settingResponse.following_organization_post ?? false,
        ticket_started: settingResponse.ticket_started ?? false,
        filter_location_events: settingResponse.filter_location_events ?? false
      });
    }
  }, [settingResponse]);

  useEffect(() => {    
    if (editSettingResponse || editSettingError) {
      const messageInfo = editSettingResponse
        ? "Info updated successfully!"
        : editSettingError;
      const messageColor = editSettingResponse ? "bg-success" : "bg-danger";
      dispatch(displayMessage(messageInfo, messageColor));
    }

    dispatch(clearSettingResponse());
  }, [editSettingResponse, editSettingError, dispatch]);

  useEffect(() => {
    if (settingError) {
      dispatch(displayMessage(settingError, "bg-danger"));
    }
  }, [settingError]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(editUserSetting(editedFormData));
  };

  const handleChange = useCallback(
    (e) => {
      const { name, type, checked, value } = e.target;

      const newValue = type === "checkbox" ? checked : value;

      setEditedFormData((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));
    },
    [setEditedFormData]
  );

  const toggleTheme = (e) => {
    const { name, checked } = e.target;

    setEditedFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
    dispatch(updateUserProfileItem("dark_mode", checked));
  };

  return (
    <Layout
      dataLoading={settingLoading}
    >
      <section className="mx-3">
        <PageHeader title={"Account Setings"} />
        <Row className="mb-5">
          <Col xl={4} lg={4} md={12} xs={12}>
            <div className="mb-4 mb-lg-0">
              <h5 className="mb-1 fw-bold">Perference Setting</h5>
              <p className="mb-0">Ajust to your perference </p>
            </div>
          </Col>
          <Col xl={8} lg={8} md={12} xs={12}>
            <Card>
              <Card.Body>
                <div>
                  <div className="mb-3">
                    <h5 className="mb-1">Perference setup</h5>
                  </div>
                  <Form onSubmit={handleEditSubmit}>
                    <Row className="mb-4">
                      <Col md={2} xs={6}>
                        <Form.Label htmlFor="dark_mode">Dark Mode</Form.Label>
                      </Col>
                      <Col md={10} xs={6}>
                        <Form.Check
                          type="switch"
                          name="dark_mode"
                          id="custom-switch"
                          checked={editedFormData.dark_mode}
                          onChange={(e) => toggleTheme(e)}
                          className={styles["sideNavButtonToggle"]}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col md={3} xs={6}>
                        <Form.Label htmlFor="filter_location_events">
                          Filter events in my Location
                          </Form.Label>
                      </Col>
                      <Col md={19} xs={6}>
                      <Form.Check
                          id="filter_location_events"
                          name="filter_location_events"
                          checked={editedFormData.filter_location_events}
                          onChange={handleChange}
                        />
                      </Col>
                    </Row>
                    <Row className="">
                      <Col>
                        <Button
                          className="px-5"
                          id="eventInfoButton"
                          type="submit"
                        >
                          {editSettingLoading ? (
                            <Spinner
                              animation="border"
                              size="sm"
                              role="status"
                            ></Spinner>
                          ) : (
                            "Save Perference"
                          )}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col xl={4} lg={4} md={12} xs={12}>
            <div className="mb-4 mb-lg-0">
              <h5 className="mb-1 fw-bold">Notification Setting</h5>
              <p className="mb-0">How do you want to get notification</p>
            </div>
          </Col>
          <Col xl={8} lg={8} md={12} xs={12}>
            <Card>
              <Card.Body>
                <div>
                  <div className="mb-3">
                    <h5 className="mb-1">Notification setup</h5>
                  </div>
                  <Form onSubmit={handleEditSubmit}>
                    <Row className="mb-2">
                      <Col md={3} xs={6}>
                        <Form.Label htmlFor="following_organization_post">
                          Notify me of organization updates
                        </Form.Label>
                      </Col>
                      <Col md={9} xs={6}>
                        <Form.Check
                          id="following_organization_post"
                          name="following_organization_post"
                          checked={editedFormData.following_organization_post}
                          onChange={handleChange}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col md={3} xs={6}>
                        <Form.Label htmlFor="">
                          Notify me on ticket starting event
                        </Form.Label>
                      </Col>
                      <Col md={9} xs={6}>
                        <Form.Check
                          id="ticket_started"
                          name="ticket_started"
                          checked={editedFormData.ticket_started}
                          onChange={handleChange}
                        />
                      </Col>
                    </Row>
                    <Row className="">
                      <Col>
                        <Button
                          className="px-5"
                          id="eventInfoButton"
                          type="submit"
                        >
                          {editSettingLoading ? (
                            <Spinner
                              animation="border"
                              size="sm"
                              role="status"
                            ></Spinner>
                          ) : (
                            "Save Notification"
                          )}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col xl={4} lg={4} md={12} xs={12}>
            <div className="mb-4 mb-lg-0">
              <h5 className="mb-1 fw-bold">Email Setting</h5>
              <p className="mb-0">When and how do you wnat to receive email</p>
            </div>
          </Col>
          <Col xl={8} lg={8} md={12} xs={12}>
            <Card>
              <Card.Body>
                <div>
                  <div className="mb-3">
                    <h5 className="mb-1">Email setup</h5>
                  </div>
                  <Form onSubmit={handleEditSubmit}>
                    <Row className="mb-2">
                      <Col md={3} xs={6}>
                        <Form.Label htmlFor="">New Event</Form.Label>
                      </Col>
                      <Col md={9} xs={6}>
                        <Form.Check id="" />
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col md={3} xs={6}>
                        <Form.Label htmlFor="email_notification">
                          Ticket Upcoming
                        </Form.Label>
                      </Col>
                      <Col md={9} xs={6}>
                        <Form.Check
                          id="email_notification"
                          name="email_notification"
                          checked={editedFormData.email_notification}
                          onChange={handleChange}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col md={3} xs={6}>
                        <Form.Label htmlFor="">Favorite Upcoming</Form.Label>
                      </Col>
                      <Col md={19} xs={6}>
                        <Form.Check />
                      </Col>
                    </Row>
                    <Row className="">
                      <Col>
                        <Button
                          className="px-5"
                          id="eventInfoButton"
                          type="submit"
                        >
                          {editSettingLoading ? (
                            <Spinner
                              animation="border"
                              size="sm"
                              role="status"
                            ></Spinner>
                          ) : (
                            "Save Email"
                          )}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </Layout>
  );
}

export default AccountSettings;
