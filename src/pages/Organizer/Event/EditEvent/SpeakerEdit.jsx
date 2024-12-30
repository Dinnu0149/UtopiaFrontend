import React, { useState, useEffect } from "react";
import { Col, Row, Card, Form, Button, Spinner } from "react-bootstrap";
// import styles from "./EditEvent.module.scss";
import "../../../../styles/main.scss";
import Layout from "../../../../components/Layouts/Layout";
import { useParams } from "react-router-dom";
import PageHeader from "../../../../components/Header/PageHeader";
import DetailBackground from "../../../../sub-components/Event/DetailBackground";
import EditEventNavigation from "../../../../sub-components/Event/EditEventNavigation";
import SpeakerTable from "../../../../sub-components/Event/SpeakerTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getEventSpeakers,
  createSpeaker,
  clearCreateSpeakerResponse,
} from "../../../../actions/speakerActions";
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
        accept={accept}

      />
    </Col>
  </Row>
);

function SpeakerEdit() {
  let { pk } = useParams();
  const dispatch = useDispatch();

  const {
    response,
    error: getSpeakerError,
    loading: getSpeakerLoading,
    createLoading: speakerCreateLoading,
    createError: speakerCreateError,
    createResponse: speakerCreateResponse,
    deleteError: speakerDeleteError,
    deleteResponse: speakerDeleteResponse,
  } = useSelector((state) => state.speaker);
  const { results: getSpeakerResponse } = response || {};

  useEffect(() => {
    dispatch(getEventSpeakers(pk));
  }, [dispatch, pk, speakerDeleteResponse, speakerCreateResponse]);

  useEffect(() => {
    if (getSpeakerError) {
      dispatch(displayMessage("Error getting speakers", "bg-danger"));
    }
  }, [getSpeakerError]);

  useEffect(() => {
    if (speakerCreateError || speakerCreateResponse) {
      const messageInfo = speakerCreateResponse
        ? "Speaker Added successfully!"
        : speakerCreateError;
      const messageColor = speakerCreateResponse ? "bg-success" : "bg-danger";

      dispatch(displayMessage(messageInfo, messageColor));
      dispatch(clearCreateSpeakerResponse());
    }
  }, [speakerCreateError, speakerCreateResponse]);

  useEffect(() => {
    if (speakerDeleteError || speakerDeleteResponse) {
      const messageInfo = speakerDeleteResponse
        ? "Speaker deleted successfully!"
        : speakerDeleteError;
      const messageColor = speakerDeleteResponse ? "bg-success" : "bg-danger";

      dispatch(displayMessage(messageInfo, messageColor));
    }
  }, [speakerDeleteResponse, speakerDeleteError]);

  const handleSpeakerSubmit = (e) => {
    e.preventDefault();

    const formSubmitData = new FormData();
    formSubmitData.append("first_name", e.target.first_name.value);
    formSubmitData.append("last_name", e.target.last_name.value);
    formSubmitData.append("genre", e.target.gener.value);
    formSubmitData.append("bio", e.target.bio.value);
    formSubmitData.append("picture", e.target.picture.files[0]);
    dispatch(createSpeaker(pk, formSubmitData));
  };

  return (
    <Layout
      dataLoading={getSpeakerLoading}
    >
      <section className="mx-3">
        <PageHeader title="Edit Speaker" />

        <Row className="mb-4">
          <DetailBackground />
          <EditEventNavigation />
        </Row>

        <Row className="mb-5">
          <Col xl={4} lg={4} md={3} xs={12}>
            <div className="mb-4 mb-lg-0">
              <h5 className="mb-1 fw-bold">Event Speakers</h5>
              <p className="mb-0">Profile configuration settings </p>
            </div>
          </Col>

          <Col xl={8} lg={8} md={9} sm={12} xs={12}>
            {getSpeakerResponse && getSpeakerResponse.length > 0 ? (
              <SpeakerTable title={"Event Speaker"} data={getSpeakerResponse} />
            ) : (
              <NonAvailable message={"No Speaker Available"} />
            )}
          </Col>
        </Row>

        <Row className="mb-5">
          <Col xl={4} lg={4} md={3} xs={12}>
            <div className="mb-4 mb-lg-0">
              <h5 className="mb-1 fw-bold">Specker & Performer</h5>
              <p className="mb-0">Profile configuration settings </p>
            </div>
          </Col>
          <Col xl={7} lg={8} md={9} sm={12} xs={12}>
            <Card className="border-0 shadow-sm">
              {/* card body */}
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
                    />
                    <FormInput
                      label={"Last Name"}
                      type="text"
                      placeholder="Last Name"
                      id="lastName"
                      name="last_name"
                      required={true}
                    />
                    <FormInput
                      label={"Genere"}
                      type="text"
                      placeholder="Genere"
                      id="Genere"
                      name="gener"
                      required={true}
                    />
                         <FormInput
                      label={"Bio"}
                      as={"textarea"}
                      rows={4}
                      placeholder="Enter Bio"
                      id="bio"
                      name="bio"
                      required={true}
                    />
                    <FormInput
                      label={"Speaker Photo"}
                      type="file"
                      name="picture"
                      accept={"image/*"}
                      required={true}
                    />
    
                    <Row className="align-items-center text-center">
                      <Col>
                        <Button className="px-5" type="submit">
                          {speakerCreateLoading ? (
                            <Spinner
                              animation="border"
                              size="sm"
                              role="status"
                            ></Spinner>
                          ) : (
                            " Add Specker & Performer "
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

export default SpeakerEdit;
