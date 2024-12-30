import React, { useState, useEffect } from "react";
import { Col, Row, Form, Card, Button, Spinner } from "react-bootstrap";
import "../../../styles/main.scss";
import Layout from "../../../components/Layouts/Layout";
import PageHeader from "../../../components/Header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { createNotification } from "../../../actions/notificationAction";
import { getGroups } from "../../../actions/groupActions";
import { displayMessage } from "../../../actions/messageActions";

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

function CreateNotification() {
  const dispatch = useDispatch();

  const { createLoading, createError, createResponse } = useSelector(
    (state) => state.notification
  );
  const { loading, error, response } = useSelector((state) => state.group);

  const { results: groups = [] } = response;

  const initialState = {
    message: "",
    title: "",
    receiving_group: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleEventInfoSubmit = (e) => {
    e.preventDefault();
    dispatch(createNotification(formData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (createResponse) {
      setFormData(initialState);

      const message = "Notification sent successfully";
      dispatch(displayMessage(message, "bg-success"));
    } else if (createError) {
      dispatch(displayMessage(createError, "bg-danger"));
    }
  }, [createResponse, createError]);

  useEffect(() => {
    dispatch(getGroups());
  }, [dispatch]);

  return (
    <Layout
    >
      <section className="mx-3">
        <PageHeader title={"Send Notification"} />

        <Row className="mb-5">
          <Col xl={4} lg={4} md={12} xs={12}>
            <div className="mb-4 mb-lg-0">
              <h5 className="mb-1 fw-bold">Notification Info</h5>
              <p className="mb-0">Send notification base on group </p>
            </div>
          </Col>
          <Col xl={8} lg={8} md={12} xs={12}>
            <Card>
              <Card.Body>
                <div className="mb-5">
                  <h5 className="mb-1">Notification Info</h5>
                </div>
                <Form onSubmit={handleEventInfoSubmit}>
                  <Row className="mb-4">
                    <Col md={4} xs={12}>
                      <Form.Label className="col-sm-4" htmlFor="phone">
                        Group
                      </Form.Label>
                    </Col>

                    <Col md={8} xs={12}>
                      <Form.Select
                        name="receiving_group"
                        required
                        value={formData.receiving_group}
                        onChange={handleChange}
                      >
                        <option>Select group</option>
                        {groups.length ? (
                          groups.map((group) => (
                            <option value={group.pk} key={group.pk}>
                              {`${group.name}`}
                            </option>
                          ))
                        ) : error ? (
                          <option> Error getting groups</option>
                        ) : loading ? (
                          <option> Loading groups...</option>
                        ) : (
                          <option> No group avaliable</option>
                        )}
                      </Form.Select>
                    </Col>
                  </Row>
                  <FormInput
                    label="Title"
                    name="title"
                    placeholder={"Title"}
                    required={true}
                    value={formData.title}
                    onChange={handleChange}
                  />
                  <FormInput
                    label="Message"
                    name="message"
                    placeholder={"Message"}
                    as="textarea"
                    rows={4}
                    required={true}
                    value={formData.message}
                    onChange={handleChange}
                  />

                  <Row className="align-items-center text-center">
                    <Col>
                      <Button className="px-5" type="submit">
                        {createLoading ? (
                          <Spinner
                            animation="border"
                            size="sm"
                            role="status"
                          ></Spinner>
                        ) : (
                          "Send  Notification"
                        )}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </Layout>
  );
}

export default CreateNotification;
