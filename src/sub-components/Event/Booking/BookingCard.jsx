import React from "react";
import { Card, Row, Col, Image, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "../Event.module.scss";
import "../../../styles/main.scss";
import { formatCurrency, getFirstCharacters } from "../../../utils/HelperFunc";

const TicketActionsUi = (booking, deletClick) => {  
  if (booking.event?.status === "closed") {
    return (
      <Row>
        <Col className="mb-1">
          <Button
            className="btn_reverse rounded-pill w-100 py-1"
            as={NavLink}
            to={`/CreateViewReview/${booking.event?.pk}`}
          >
            Review
          </Button>
        </Col>
        <Col>
          <Button
            className="rounded-pill w-100 bg-danger py-1"
            onClick={deletClick}
          >
            Delete
          </Button>
        </Col>
      </Row>
    );
  } else {
    return (
      <Row>
        <Col className="mb-1">
          <Button className="btn_reverse rounded-pill py-1 w-100">
            Cancel
          </Button>
        </Col>
        <Col>
          <Button
            className="rounded-pill w-100 py-1"
            as={NavLink}
            to={`/Ticket/${booking.pk}`}
          >
            Ticket
          </Button>
        </Col>
      </Row>
    );
  }
};

function BookingCard({ booking = [], handleDelete }) {
  return (
    <Card className={`px-3 shadow-sm ${styles["event-card"]}`}>
      <Row>
        <Col lg={12} xs={12} md={12} sm={12} className="m-0 p-0 mb-1">
          <Row className={styles["bookedEvent"]}>
            <div
              className={`${styles["badge"]} w-auto px-3 ms-3 text-center rounded-pill mb-1`}
            >
              {booking.ticket_name}
            </div>
            <Col
              lg={12}
              className={`${styles["bookedEventImageContainer"]}`}
              as={NavLink}
              to={`/EventDetail/${booking.event?.pk}`}
            >
              <div
                className={`position-relative mb-1 ${styles["eventImageBody"]}`}
              >
                <Image
                  src={booking.event?.image}
                   alt="Event-img"
                  className={`${styles["bookedImage"]} img-fluid`}
                  rounded
                />
              </div>
            </Col>
            <Col
              className={`${styles["nearbyEventInfo"]} ms-2 align-content-center`}
            >
              <Card.Title className={`fw-bold mb-0 ${styles["eventTitle"]} `}>
                {getFirstCharacters(booking.event?.event_name, 15)}...
              </Card.Title>
              <Row>
                <Col>
                  <i className="fa-solid fa-location-dot"></i>
                  <span className="mx-1">
                    {booking.event?.state}, {booking.event?.city}
                  </span>
                </Col>
                <Col>
                  <Card.Title className={`${styles["fee"]} fw-bold`}>
                    &#8358;{formatCurrency(Number(booking.total_price))}
                  </Card.Title>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col className="mb-1 mt-1">
          {TicketActionsUi(booking, handleDelete)}
        </Col>
      </Row>
    </Card>
  );
}

export default BookingCard;
