import React, { useState, useEffect } from "react";
import { Col, Row, Form, Card, Button, Spinner } from "react-bootstrap";
import "../../../../styles/main.scss";
import Layout from "../../../../components/Layouts/Layout";
import PageHeader from "../../../../components/Header/PageHeader";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createSpeaker,
  clearCreateSpeakerResponse,
} from "../../../../actions/speakerActions";
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

function CreateEventSpeaker() {
  const { event_id } = useParams();
  const dispatch = useDispatch();

  const {
    createLoading: speakerCreateLoading,
    createError: speakerCreateError,
    createResponse: speakerResponse,
  } = useSelector((state) => state.speaker);

  const initialState = {
    first_name: "",
    last_name: "",
    genre: "",
    bio: "",
    picture: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleSpeakerSubmit = (e) => {
    e.preventDefault();
    const formSubmitData = new FormData();
    formSubmitData.append("first_name", formData.first_name);
    formSubmitData.append("last_name", formData.last_name);
    formSubmitData.append("genre", formData.genre);
    formSubmitData.append("bio", formData.bio);
    formSubmitData.append("picture", formData.picture);

    dispatch(createSpeaker(event_id, formSubmitData));
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prevValues) => ({
      ...prevValues,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  useEffect(() => {
    if (speakerResponse) {
      const messageInfo = "Speaker Added successfully!";
      dispatch(displayMessage(messageInfo, "bg-success"));

      setFormData(initialState);
    } else if (speakerCreateError) {
      dispatch(displayMessage(speakerCreateError, "bg-danger"));
    }

    dispatch(clearCreateSpeakerResponse());
  }, [speakerResponse, speakerCreateError]);

  return (
    <Layout
    >
      <section className="mx-3">
        <PageHeader title={"Create Speaker"} />

        <Row className="mb-5">
          <Col xl={4} lg={4} md={12} xs={12}>
            <div className="mb-4 mb-lg-0">
              <h5 className="mb-1 fw-bold">Specker & Performer</h5>
              <p className="mb-0">Add as many speakers needed</p>
            </div>
          </Col>
          <Col xl={8} lg={8} md={12} xs={12}>
            <Card>
              <Card.Body>
                <div className="mb-5">
                  <h5 className="mb-1">Specker & Performer</h5>
                </div>
                <div>
                  <div className="mb-3">
                    <h5 className="mb-1">Add Specker info</h5>
                  </div>
                  <Form onSubmit={handleSpeakerSubmit}>
                    <FormInput
                      label={"First name"}
                      type="text"
                      placeholder="First name"
                      id="firstName"
                      name="first_name"
                      required={true}
                      value={formData.first_name}
                      onChange={handleChange}
                    />
                    <FormInput
                      label={"Last Name"}
                      type="text"
                      placeholder="Last Name"
                      id="lastName"
                      name="last_name"
                      required={true}
                      value={formData.last_name}
                      onChange={handleChange}
                    />
                    <FormInput
                      label={"Genere"}
                      type="text"
                      placeholder="Genere"
                      id="Genere"
                      name="genre"
                      required={true}
                      value={formData.genre}
                      onChange={handleChange}
                    />
                    <FormInput
                      label={"Bio"}
                      as={"textarea"}
                      rows={4}
                      placeholder="Enter Bio"
                      id="bio"
                      name="bio"
                      required={true}
                      value={formData.bio}
                      onChange={handleChange}
                    />
                    <FormInput
                      label={"Speaker Photo"}
                      type="file"
                      name="picture"
                      accept={"image/*"}
                      required={true}
                      onChange={handleChange}
                    />
                    <Row className="align-items-center text-center">
                      <Col>
                        <Button className="w-100" type="submit">
                          {speakerCreateLoading ? (
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
                        <Button
                          className="w-100 btn_reverse"
                          as={NavLink}
                          to={`/${event_id}/CreateEventSchdule`}
                        >
                          Next
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

export default CreateEventSpeaker;
