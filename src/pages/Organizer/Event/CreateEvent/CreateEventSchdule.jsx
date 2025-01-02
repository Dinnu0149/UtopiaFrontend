import React, { useState, useEffect, useCallback } from "react";
import { Col, Row, Form, Card, Button, Spinner } from "react-bootstrap";
import "../../../../styles/main.scss";
import Layout from "../../../../components/Layouts/Layout";
import PageHeader from "../../../../components/Header/PageHeader";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getEventSpeakers,
} from "../../../../actions/speakerActions";
import {
  createSchedule,
  clearCreateScheduleResponse,
} from "../../../../actions/scheduleActions";
import { displayMessage } from "../../../../actions/messageActions";

const FormInput = ({
  label,
  placeholder,
  name,
  required = false,
  type = "text",
  as = "input",
  rows,
  value,
  onChange
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
        value={value}
        onChange={onChange}
      />
    </Col>
  </Row>
);

function CreateEventSchdule() {
  const { event_id } = useParams();
  const dispatch = useDispatch();

  const {
    createLoading: scheduleCreateLoading,
    createError: scheduleCreateError,
    createResponse: scheduleResponse,
  } = useSelector((state) => state.schedule);

  const {
    response: getSpeakerResponse,
    error: getSpeakerError,
    loading: getSpeakerLoading,
  } = useSelector((state) => state.speaker);

  const { results: speakers = [] } = getSpeakerResponse;


  const [selectedOptions, setSelectedOptions] = useState([]);
  const initialState = {
    title: '',
    schedule_date: '',
    description: '',
    speakers: selectedOptions,
  };

  const [formData, setFormData]  = useState(initialState);

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    dispatch(createSchedule(event_id, formData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (scheduleResponse) {
      const messageInfo = "Schedule Added successfully!";
      dispatch(displayMessage(messageInfo, "bg-success"));

      setFormData(initialState);
    } else if (scheduleCreateError) {
      dispatch(displayMessage(scheduleCreateError, "bg-danger"));
    }

    dispatch(clearCreateScheduleResponse());
  }, [scheduleResponse, scheduleCreateError]);


  useEffect(() => {
    dispatch(getEventSpeakers(event_id));
  }, [dispatch]);

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
    >
      <section className="mx-3">
        <PageHeader title={"Add Schudule"} />

        <Row className="mb-5">
          <Col xl={4} lg={4} md={12} xs={12}>
            <div className="mb-4 mb-lg-0">
              <h5 className="mb-1 fw-bold">Schedule Info</h5>
              <p className="mb-0">Add as many schedule needed </p>
            </div>
          </Col>
          <Col xl={8} lg={8} md={12} xs={12}>
            <Card>
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
                      value={formData.title}
                      onChange={handleChange}
                    />
                    <FormInput
                      label={"DateTime"}
                      type="datetime-local"
                      placeholder="DateTime"
                      id="DateTime"
                      name="schedule_date"
                      required={true}
                      value={formData.schedule_date}
                      onChange={handleChange}
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
                      value={formData.description}
                      onChange={handleChange}
                    />

                    <Row className="align-items-center text-center">
                      <Col>
                        <Button
                          className="w-100"
                          type="submit"
                        >
                          {scheduleCreateLoading ? (
                            <Spinner
                              animation="border"
                              size="sm"
                              role="status"
                            ></Spinner>
                          ) : (
                            " Add "
                          )}
                        </Button>
                      </Col>

                      <Col>
                      <Button className="w-100 btn_reverse" as={NavLink} to={`/organizer/event/${event_id}/create/ticket`}> Next </Button>
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

export default CreateEventSchdule;
