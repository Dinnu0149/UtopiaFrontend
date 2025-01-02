import React, { useState, useEffect } from "react";
import { Col, Row, Form, Card, Button, Spinner } from "react-bootstrap";
import "../../../../styles/main.scss";
import Layout from "../../../../components/Layouts/Layout";
import PageHeader from "../../../../components/Header/PageHeader";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createTicket,
  clearCreateTicketResponse,
} from "../../../../actions/ticketActions";
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

function CreateEventTicket() {
  const { event_id } = useParams();
  const dispatch = useDispatch();

  const {
    createLoading: ticketCreateLoading,
    createError: ticketCreateError,
    createResponse: ticketResponse,
  } = useSelector((state) => state.ticket);

  const initialState = {
    type: "",
    price: "",
    quantity: "",
    feature: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    dispatch(createTicket(event_id, formData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (ticketResponse) {
      const messageInfo = "Ticket Added successfully!";
      dispatch(displayMessage(messageInfo, "bg-success"));

      setFormData(initialState);
    } else if (ticketCreateError) {
      dispatch(displayMessage(ticketCreateError, "bg-danger"));
    }

    dispatch(clearCreateTicketResponse());
  }, [ticketResponse, ticketCreateError]);

  return (
    <Layout
    >
      <section className="mx-3">
        <PageHeader title={"Add Ticket"} />

        <Row className="mb-5">
          <Col xl={4} lg={4} md={12} xs={12}>
            <div className="mb-4 mb-lg-0">
              <h5 className="mb-1 fw-bold">Ticket Info</h5>
              <p className="mb-0">Add as many ticket needed </p>
            </div>
          </Col>
          <Col xl={8} lg={8} md={12} xs={12}>
            <Card>
              {/* card body */}
              <Card.Body>
                <div className="mb-5">
                  <h5 className="mb-1">Ticket Information</h5>
                </div>
                <div>
                  <div className="mb-3">
                    <h5 className="mb-1">Add Ticket </h5>
                  </div>
                  <Form onSubmit={handleTicketSubmit}>
                    <FormInput
                      label={"Name"}
                      type="text"
                      placeholder="Name"
                      id="Name"
                      name="type"
                      required={true}
                      value={formData.type}
                      onChange={handleChange}
                    />
                    <FormInput
                      label="Price (&#8358;)"
                      type="number"
                      placeholder="price"
                      id="Price"
                      name="price"
                      required={true}
                      value={formData.price}
                      onChange={handleChange}
                    />
                    <FormInput
                      label={"Quantity"}
                      type="number"
                      placeholder="quantity"
                      id="Quantity"
                      name="quantity"
                      required={true}
                      value={formData.quantity}
                      onChange={handleChange}
                    />
                    <FormInput
                      label={"Description"}
                      type="text"
                      as={"textarea"}
                      rows={4}
                      placeholder="Enter Description"
                      id="Description"
                      name="description"
                      required={true}
                      value={formData.description}
                      onChange={handleChange}
                    />
                    <FormInput
                      label={"Features"}
                      as={"textarea"}
                      rows={4}
                      type="text"
                      placeholder="Enter features"
                      id="feature"
                      name="feature"
                      required={true}
                      value={formData.feature}
                      onChange={handleChange}
                    />

                    <Row className="align-items-center  text-center">
                      <Col>
                        <Button className="w-100" type="submit">
                          {ticketCreateLoading ? (
                            <Spinner
                              animation="border"
                              size="sm"
                              role="status"
                            ></Spinner>
                          ) : (
                            " Add"
                          )}
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          className="w-100 btn_reverse"
                          as={NavLink}
                          to={`/eventdetail/${event_id}`}
                        >
                          View Event
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

export default CreateEventTicket;
