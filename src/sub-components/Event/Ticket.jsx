import React, { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import styles from "./Event.module.scss";
import "../../styles/main.scss";
import EventTicketSeatForm from "./EventTicketSeatForm";
import { formatCurrency } from "../../utils/HelperFunc";


function Ticket({ tickets }) {    
  const [focusState, setFocusState] = useState(null);

  const handleFocus = (state) => {
    setFocusState(state);
  };

  return (
    <Row className={`${styles["ticketMainRow"]} mb-3`}>
      {tickets ? (
        tickets.map((ticket) => (
          <Col lg={3} md={6} sm={12} xs={12} key={ticket.pk} className="mb-4">
            <Card
              className={`${styles["infoCards"]} shadow ${
                focusState ? styles["focused"] : ""
              }`}
            >
              <Card.Body className={`${styles["infoCardsBodyPrice"]}`}>
                <Card.Title as={"h4"} className="mb-2">
                  {" "}
                  {ticket.type}
                </Card.Title>
                <Card.Text as={"p"} className="mb-4">
                  For early-stage startups that want to spend more time
                  developing and less on manual operations
                </Card.Text>
                <Card.Title as={"h6"} className="mb-4">
                  &#8358;{formatCurrency(Number(ticket.price))} <small className="fs-6 fw-light">(&#8358;{formatCurrency(Number(ticket.price), true)})</small>
                </Card.Title>
                <EventTicketSeatForm
                  ticket_id={ticket.pk}
                  handleFocus={handleFocus}
                  name={ticket.type}
                  price={ticket.price}
                  total_tickets={ticket.quantity}
                />
              </Card.Body>
              <hr className="mx-4"/>
              <Card.Body className={`${styles["infoCardsBodyFeatures"]}`}>
                <Card.Text as={"p"} className={"mb-2"}>
                  {" "}
                  All core features, including
                </Card.Text>
                <div className="mx-2 mb-2">
                  <Card.Text as={"p"}>Only Basic Components</Card.Text>
                  <Card.Text as={"p"}>12+ Adv. Components</Card.Text>
                  <Card.Text as={"p"}>5 - Landing page</Card.Text>
                  <Card.Text as={"p"}>3 Dashboard Layouts</Card.Text>
                  <Card.Text as={"p"}>Documentation</Card.Text>
                  <Card.Text as={"p"}>Access to support forums</Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <span>No Ticket Avaliable</span>
      )}
    </Row>
  );
}

export default Ticket;
