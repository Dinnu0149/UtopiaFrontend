import React, { useState, useEffect } from "react";
import { Col, Row, Card, Form, Button, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import styles from "./EditEvent.module.scss";
import "../../../../styles/main.scss";
import Layout from "../../../../components/Layouts/Layout";
import PageHeader from "../../../../components/Header/PageHeader";
import DetailBackground from "../../../../sub-components/Event/DetailBackground";
import EditEventNavigation from "../../../../sub-components/Event/EditEventNavigation";
import ActionPopUp from "../../../../components/Popups/ActionPopUp";
import { useDispatch, useSelector } from "react-redux";
import {
  getEventTickets,
  createTicket,
  clearCreateTicketResponse,
  deleteEventTickets,
} from "../../../../actions/ticketActions";
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

function TicketEdit() {
  let { pk } = useParams();
  const dispatch = useDispatch();

  const {
    createLoading: ticketCreateLoading,
    createError: ticketCreateError,
    createResponse: ticketResponse,
    response,
    loading,
    error,
    deleteError,
    deleteResponse,
  } = useSelector((state) => state.ticket);
  const { results: tickets } = response || {};

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
    dispatch(getEventTickets(pk));
  }, [dispatch, pk, ticketResponse, deleteResponse]);

  useEffect(() => {
    if (error) {
      dispatch(displayMessage("Error getting ticket", "bg-danger"));
    }
  }, [error]);

  useEffect(() => {
    if (ticketCreateError || ticketResponse) {
      const messageInfo = ticketResponse
        ? "Ticket Added successfully!"
        : ticketCreateError;
      const messageColor = ticketResponse ? "bg-success" : "bg-danger";

      dispatch(displayMessage(messageInfo, messageColor));
      dispatch(clearCreateTicketResponse());
    }
  }, [ticketCreateError, ticketResponse]);

  useEffect(() => {
    if (deleteError || deleteResponse) {
      const messageInfo = deleteResponse
        ? "Ticket deleted successfully!"
        : deleteError;
      const messageColor = deleteResponse ? "bg-success" : "bg-danger";

      dispatch(displayMessage(messageInfo, messageColor));
    }
  }, [deleteResponse, deleteError]);

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    const formData = {
      type: e.target.type.value,
      price: e.target.price.value,
      quantity: e.target.quantity.value,
      description: e.target.description.value,
      feature: e.target.feature.value,
    };
    dispatch(createTicket(pk, formData));
  };

  const handleTicketDelete = (id) => {
    dispatch(deleteEventTickets(id));
    setDeletePop(!deletePop);
  };

  return (
    <Layout
      dataLoading={loading}
    >
      <section className="mx-3">
        <PageHeader title="Edit Ticket" />

        <Row className="mb-4">
          <DetailBackground />
          <EditEventNavigation />
        </Row>
        <Row className="mb-5">
          <Col xl={12} lg={12} md={12} xs={12} className="mb-3">
            <div className="mb-4 mb-lg-0">
              <h5 className="mb-1 fw-bold">Avaliable Tickets</h5>
              <p className="mb-0">Profile configuration settings </p>
            </div>
          </Col>

          <Col xl={12} lg={12} md={12} xs={12}>
            <Row>
              {tickets && tickets.length > 0 ? (
                tickets.map((ticket) => {
                  return (
                    <Col
                      lg={3}
                      md={6}
                      sm={12}
                      xs={12}
                      key={ticket.pk}
                      className="mb-3"
                    >
                        <ActionPopUp
                          actionFunc={() => handleTicketDelete(ticket.pk)}
                          title={"Delete"}
                          message="Are you sure you want to delete ticket"
                          cancleFunc={() => setDeletePop(null)}
                          postionStyle={popupStyle}
                          isVisible={deletePop}
                        />
                      <Card
                        className={`${styles["ticketEditCard"]} border-0 shadow`}
                      >
                        <Card.Body>
                          <Card.Title as={"h5"}>{ticket.type}</Card.Title>
                          <Card.Text as={"p"}>
                            {" "}
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Officiis, aperiam.
                          </Card.Text>
                          <Card.Title as={"h5"}>
                            &#8358;{ticket.price}
                          </Card.Title>
                          <Button
                            className="float-end bg-danger px-5"
                            onClick={handleActionPop}
                          >
                            Delete
                          </Button>
                        </Card.Body>
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
              <h5 className="mb-1 fw-bold">Ticket Info</h5>
              <p className="mb-0">Profile configuration settings </p>
            </div>
          </Col>
          <Col xl={7} lg={8} md={9} sm={12} xs={12}>
            <Card className="border-0 shadow-sm">
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
                    />
                    <FormInput
                      label="Price (&#8358;)"
                      type="number"
                      placeholder="price"
                      id="Price"
                      name="price"
                      required={true}
                    />
                    <FormInput
                      label={"Quantity"}
                      type="number"
                      placeholder="quantity"
                      id="Quantity"
                      name="quantity"
                      required={true}
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
                     
                    />

                    <Row className="align-items-center text-center">
                      <Col>
                        <Button className="px-5" type="submit">
                          {ticketCreateLoading ? (
                            <Spinner
                              animation="border"
                              size="sm"
                              role="status"
                            ></Spinner>
                          ) : (
                            " Add Ticket "
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

export default TicketEdit;
