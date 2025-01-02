import React, { useState, useEffect } from "react";
import { Col, Row, Form, Card, Button, Spinner } from "react-bootstrap";
import "../../../../styles/main.scss";
import Layout from "../../../../components/Layouts/Layout";
import PageHeader from "../../../../components/Header/PageHeader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createEvent,
  clearEventResponse,
} from "../../../../actions/eventActions";
import { getCategorys } from "../../../../actions/categoryActions";
import statesData from "../../../../data/nigeria_states.json";
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
  onChange,
  accept,
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
        accept={accept}
      />
    </Col>
  </Row>
);

function CreateEvent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { createLoading, createError, createResponse } = useSelector(
    (state) => state.event
  );

  const {
    response: getCategoryResponse,
    error: getCategoryError,
    loading: getCategoryLoading,
  } = useSelector((state) => state.category);

  const { results: categories = [] } = getCategoryResponse;
  const initialState = {
    name: "",
    state: "",
    city: "",
    location: "",
    event_date: "",
    purchase_dead_line: "",
    description: "",
    category: "",
    image: "",
    total_ticket: "",
    total_speaker: "",
    display_price: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);

  const handleEventInfoSubmit = (e) => {
    e.preventDefault();
    const formSubmitData = new FormData();
    formSubmitData.append("name", formData.name);
    formSubmitData.append("state", formData.state);
    formSubmitData.append("city", formData.city);
    formSubmitData.append("location", formData.location);
    formSubmitData.append("event_date", formData.event_date);
    formSubmitData.append("purchase_dead_line", formData.purchase_dead_line);
    formSubmitData.append("description", formData.description);
    formSubmitData.append("category", formData.category);
    formSubmitData.append("image", formData.image);
    formSubmitData.append("total_ticket", formData.total_ticket);
    formSubmitData.append("total_speaker", formData.total_speaker);
    formSubmitData.append("display_price", formData.display_price);

    dispatch(createEvent(formSubmitData));
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prevValues) => ({
      ...prevValues,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleStateChange = (e) => {
    const stateName = e.target.value;
    setSelectedState(stateName);
    setFormData({
      ...formData,
      state: stateName,
    });

    const state = statesData.find((state) => state.name === stateName);
    setCities(state ? state.cities : []);
  };

  useEffect(() => {
    if (createResponse) {
      const { pk } = createResponse;
      setFormData(initialState);
      navigate(`/organizer/event/${pk}/create/speaker`, {
        state: { message: "Event Created successfully!" },
      });

      dispatch(clearEventResponse());
    } else if (createError) {
      dispatch(displayMessage(createError, "bg-danger"));
    }
  }, [createResponse, createError]);

  useEffect(() => {
    dispatch(getCategorys());
  }, [dispatch]);

  return (
    <Layout
    >
      <section className="mx-3">
        <PageHeader title={"Create Event"} />
        <Row className="mb-5">
          <Col xl={4} lg={4} md={12} xs={12}>
            <div className="mb-4 mb-lg-0">
              <h5 className="mb-1 fw-bold">General Info</h5>
              {/* <p className="mb-0 text-danger"> */}
                <b className="text-danger fs-6">Note:</b>
                <ul>
                  <li className="text-danger">
                    After a successful event creation, activation is required to
                    make event visible.
                  </li>
                  <li className="text-danger">
                    Date, State, City, Location and Photo can't be edited after
                    creation, so be careful while adding these info.
                  </li>
                </ul>
              {/* </p> */}
            </div>
          </Col>
          <Col xl={8} lg={8} md={12} xs={12}>
            <Card>
              <Card.Body>
                <div className="mb-5">
                  <h5 className="mb-1">General Info</h5>
                </div>

                <div>
                  <div className="mb-3">
                    <h5 className="mb-1">Event information</h5>
                  </div>
                  <Form onSubmit={handleEventInfoSubmit}>
                    <FormInput
                      label="Title"
                      name="name"
                      placeholder={"Title"}
                      required={true}
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <FormInput
                      label="Description"
                      name="description"
                      placeholder={"Description"}
                      as="textarea"
                      rows={4}
                      required={true}
                      value={formData.description}
                      onChange={handleChange}
                    />
                    <Row className="mb-4">
                      <Col md={4} xs={12}>
                        <Form.Label className="col-sm-4" htmlFor="category">
                          Category
                        </Form.Label>
                      </Col>

                      <Col md={8} xs={12}>
                        <Form.Select
                          id="category"
                          name="category"
                          required
                          value={formData.category}
                          onChange={handleChange}
                        >
                          <option>Select category</option>
                          {categories.length ? (
                            categories.map((category) => (
                              <option value={category.pk} key={category.pk}>
                                {`${category.name}`}
                              </option>
                            ))
                          ) : getCategoryError ? (
                            <option> Error getting categories</option>
                          ) : getCategoryLoading ? (
                            <option> Loading categories...</option>
                          ) : (
                            <option> No category avaliable</option>
                          )}
                        </Form.Select>
                      </Col>
                    </Row>
                    <FormInput
                      type="number"
                      label="Total Ticket"
                      name="total_ticket"
                      placeholder={"Number of tickets avalible"}
                      required={true}
                      value={formData.total_ticket}
                      onChange={handleChange}
                    />
                    <FormInput
                      type="number"
                      label="Total Speaker"
                      name="total_speaker"
                      placeholder={"Number of speakers avalible"}
                      required={true}
                      value={formData.total_speaker}
                      onChange={handleChange}
                    />
                    <FormInput
                      type="number"
                      label="Display Price"
                      name="display_price"
                      placeholder={"Price to display in summary"}
                      required={true}
                      value={formData.display_price}
                      onChange={handleChange}
                    />
                    <Row className="mb-4">
                      <Col md={4} xs={12}>
                        <Form.Label className="col-sm-4" htmlFor="state">
                          State
                        </Form.Label>
                      </Col>

                      <Col md={8} xs={12}>
                        <Form.Select
                          id="state"
                          name="state"
                          required
                          value={formData.state}
                          onChange={handleStateChange}
                        >
                          <option>Select State</option>
                          {statesData.map((state) => (
                            <option key={state.name} value={state.name}>
                              {state.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                    <Row className="mb-4">
                      <Col md={4} xs={12}>
                        <Form.Label className="col-sm-4" htmlFor="city">
                          City
                        </Form.Label>
                      </Col>

                      <Col md={8} xs={12}>
                        <Form.Select
                          id="city"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleChange}
                          disabled={!selectedState}
                        >
                          <option>Select City</option>
                          {cities.map((city, index) => (
                            <option key={index} value={city}>
                              {city}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                    <FormInput
                      label="Location"
                      placeholder={"Location"}
                      name="location"
                      as="textarea"
                      rows={4}
                      required={true}
                      value={formData.location}
                      onChange={handleChange}
                    />
                    <FormInput
                      label="Purchase Dead Line"
                      name="purchase_dead_line"
                      type="date"
                      required={true}
                      value={formData.purchase_dead_line}
                      onChange={handleChange}
                    />
                    <FormInput
                      label="Event DateTime"
                      name="event_date"
                      type="datetime-local"
                      required={true}
                      value={formData.event_date}
                      onChange={handleChange}
                    />
                    <FormInput
                      label="Cover Photo"
                      name="image"
                      required
                      type="file"
                      accept={"image/*"}
                      onChange={handleChange}
                    />

                    <Row className="align-items-center text-center">
                      <Col>
                        <Button
                          className="px-5"
                          id="eventInfoButton"
                          type="submit"
                        >
                          {createLoading ? (
                            <Spinner
                              animation="border"
                              size="sm"
                              role="status"
                            ></Spinner>
                          ) : (
                            "Save Event"
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

export default CreateEvent;
