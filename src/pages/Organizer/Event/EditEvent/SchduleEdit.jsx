import React, { useState, useEffect, useCallback } from "react";
import { Col, Row, Card, Form, Button, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import styles from "./EditEvent.module.scss";
import "../../../../styles/main.scss";
import Layout from "../../../../components/Layouts/Layout";
import PageHeader from "../../../../components/Header/PageHeader";
import DetailBackground from "../../../../sub-components/Event/DetailBackground";
import EditEventNavigation from "../../../../sub-components/Event/EditEventNavigation";
import ActionPopUp from "../../../../components/Popups/ActionPopUp";
import { convertTime } from "../../../../utils/HelperFunc";
import { useDispatch, useSelector } from "react-redux";
import {
  getEventSchedules,
  createSchedule,
  clearCreateScheduleResponse,
  deleteEventSchedules,
} from "../../../../actions/scheduleActions";
import { getEventSpeakers } from "../../../../actions/speakerActions";
import NonAvailable from "../../../../components/Loading/NonAvailable";
import { displayMessage } from "../../../../actions/messageActions";

const FormInput = ({
  label,
  placeholder,
  name,
  required = false,
  type = "text",
  as = "input",
  rows,
}) => (
  <Row className="mb-4">
    <Col md={4} xs={12}>
      <Form.Label htmlFor={name}>{label}</Form.Label>
    </Col>
    <Col md={8} xs={12}>
      <Form.Control
        as={as}
        id={name}
        name={name}
        type={type}
        rows={rows}
        required={required}
        placeholder={placeholder}
      />
    </Col>
  </Row>
);

function SchduleEdit() {
  let { pk } = useParams();
  const dispatch = useDispatch();

  const {
    createLoading: scheduleCreateLoading,
    createError: scheduleCreateError,
    createResponse: scheduleCreateResponse,
    response,
    loading,
    error,
    deleteError,
    deleteResponse,
  } = useSelector((state) => state.schedule);

  const {
    response: getSpeakerResponse,
    error: getSpeakerError,
    loading: getSpeakerLoading,
  } = useSelector((state) => state.speaker);

  const { results: schedules = [] } = response;
  const { results: speakers = [] } = getSpeakerResponse;

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [deletePop, setDeletePop] = useState(false);
  const [popupStyle, setPopupStyle] = useState({});

  const handleActionPop = (e) => {
    const rect = e.target.getBoundingClientRect();
    setPopupStyle({
      top: `${rect.top + window.scrollY}px`,
      left: `${(rect.left + window.scrollX) / 2}px`,
    });
    setDeletePop(!deletePop);
  };

  useEffect(() => {
    dispatch(getEventSchedules(pk));
  }, [dispatch, pk, scheduleCreateResponse, deleteResponse]);

  useEffect(() => {
    dispatch(getEventSpeakers(pk));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(displayMessage("Error getting schedule", "bg-danger"));
    }
  }, [error]);

  useEffect(() => {
    if (scheduleCreateError || scheduleCreateResponse) {
      const messageInfo = scheduleCreateResponse
        ? "Schedule Added successfully!"
        : scheduleCreateError;
      const messageColor = scheduleCreateResponse ? "bg-success" : "bg-danger";

      dispatch(displayMessage(messageInfo, messageColor));
      dispatch(clearCreateScheduleResponse());
    }
  }, [scheduleCreateResponse, scheduleCreateError]);

  useEffect(() => {
    if (deleteError || deleteResponse) {
      const messageInfo = deleteResponse
        ? "Schedule deleted successfully!"
        : deleteError;
      const messageColor = deleteResponse ? "bg-success" : "bg-danger";

      dispatch(displayMessage(messageInfo, messageColor));
    }
  }, [deleteError, deleteResponse]);

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title: e.target.title.value,
      schedule_date: e.target.schedule_date.value,
      description: e.target.description.value,
      speakers: selectedOptions,
    };
    dispatch(createSchedule(pk, formData));
  };

  const handleScheduleDelete = (id) => {
    dispatch(deleteEventSchedules(id));
    setDeletePop(!deletePop);
  };

  const handleSelectChange = useCallback(
    (event) => {
      const selectedValues = Array.from(
        event.target.selectedOptions,
        (option) => parseInt(option.value)
      );
      setSelectedOptions(selectedValues);
    },
    [setSelectedOptions]
  );

  return (
    <Layout
      dataLoading={loading}
    >
      <section className="mx-3">
        <PageHeader title="Edit Schdule" />

        <Row className="mb-4">
          <DetailBackground image={''}/>
          <EditEventNavigation />
        </Row>

        <Row className="mb-5">
          <Col xl={12} lg={12} md={12} xs={12} className="mb-3">
            <div className="mb-4 mb-lg-0">
              <h5 className="mb-1 fw-bold">Avaliable Schedule</h5>
              <p className="mb-0">Profile configuration settings </p>
            </div>
          </Col>
          <Col xl={12} lg={12} md={12} xs={12}>
            <Row>
              {schedules && schedules.length > 0 ? (
                schedules.map((schedule) => {
                  return (
                    <Col
                      lg={3}
                      md={6}
                      sm={12}
                      xs={12}
                      key={schedule.pk}
                      className="mb-3"
                    >
                        <ActionPopUp
                          actionFunc={() => handleScheduleDelete(schedule.pk)}
                          title={"Delete"}
                          message="Are you sure you want to delete schedule"
                          cancleFunc={() => setDeletePop(null)}
                          postionStyle={popupStyle}
                          isVisible={deletePop}
                        />
                      ;
                      <Card
                        className={`${styles["ticketEditCard"]} border-0 shadow`}
                      >
                        <Card.Body>
                          <Card.Title as={"h5"}>{schedule.title}</Card.Title>
                          <Card.Text as={"p"}>
                            {" "}
                            {schedule.description}
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer className="d-flex justify-content-between align-items-center">
                          <h5 className="m-0 p-0">
                            {convertTime(schedule.schedule_date)}
                          </h5>
                          <Button
                            className="bg-danger m-0 px-4 "
                            onClick={handleActionPop}
                          >
                            Delete
                          </Button>
                        </Card.Footer>
                      </Card>
                    </Col>
                  );
                })
              ) : (
                <NonAvailable message={"No Schedule Available"} />
              )}
            </Row>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col xl={4} lg={4} md={3} xs={12}>
            <div className="mb-4 mb-lg-0">
              <h5 className="mb-1 fw-bold">Schedule Info</h5>
              <p className="mb-0">Profile configuration settings </p>
            </div>
          </Col>
          <Col xl={7} lg={8} md={9} sm={12} xs={12}>
            <Card className="border-0 shadow-sm">
              {/* card body */}
              <Card.Body>
                <div className="mb-5">
                  <h5 className="mb-1">Schedules</h5>
                </div>

                <div>
                  <div className="mb-3">
                    <h5 className="mb-1">Add Schedule information</h5>
                  </div>
                  <Form onSubmit={handleScheduleSubmit}>
                    <FormInput
                      label={"Title"}
                      type="text"
                      placeholder="Title"
                      id="Title"
                      name="title"
                      required={true}
                    />
                    <FormInput
                      label={"DateTime"}
                      type="datetime-local"
                      placeholder="DateTime"
                      id="DateTime"
                      name="schedule_date"
                      required={true}
                    />
                    <Row className="mb-4">
                      <Col md={4} xs={12}>
                        <Form.Label className="col-sm-4" htmlFor="phone">
                          Specker & performer
                        </Form.Label>
                      </Col>

                      <Col md={8} xs={12}>
                        <Form.Control
                          as="select"
                          multiple
                          value={selectedOptions}
                          onChange={handleSelectChange}
                        >
                          {speakers.length ? (
                            speakers.map((speaker) => (
                              <option value={speaker.pk} key={speaker.pk}>
                                {`${speaker.first_name} ${speaker.last_name}`}
                              </option>
                            ))
                          ) : getSpeakerError ? (
                            <option> Error getting speakings</option>
                          ) : getSpeakerLoading ? (
                            <option> Loading speakings...</option>
                          ) : (
                            <option> No speaking avaliable</option>
                          )}
                        </Form.Control>
                      </Col>
                    </Row>
                    <FormInput
                      label={"Description"}
                      as="textarea"
                      rows={4}
                      type="text"
                      placeholder="Description"
                      id="description"
                      name="description"
                      required={true}
                    />
                    <Row className="align-items-center text-center">
                      <Col>
                        <Button className="px-5" type="submit">
                          {scheduleCreateLoading ? (
                            <Spinner
                              animation="border"
                              size="sm"
                              role="status"
                            ></Spinner>
                          ) : (
                            " Add Schedule "
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

export default SchduleEdit;
