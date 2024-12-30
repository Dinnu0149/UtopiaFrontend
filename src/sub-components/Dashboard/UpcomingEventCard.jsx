import React, { useState } from "react";
import { Card, Row, Col} from "react-bootstrap";
import styles from "../Event/Event.module.scss";
import "../../styles/main.scss";
import {
  convertDate,
  getFirstCharacters,
  formatCurrency,
} from "../../utils/HelperFunc";
import EventModelPopUp from "../Event/EventModelPopUp";
import FavoriteButton from "../../components/Button/FavoriteButton";

function UpcomingEventCard({
  event = [],
  handleRemovePop,
  truncateTitle = false,
}) {
  const [show, setShow] = useState(false);

  const handleToggleOpen = () => setShow(true);
  const handleToggleClose = () => setShow(false);
  return (
    <Card className={`px-3 shadow-sm ${styles["event-card"]}`}>
      <Row>
        <Col lg={12} xs={12} md={12} sm={12} className="m-0 p-0">
          <Card.Body className="px-0 py-1">
            <EventModelPopUp
              event={event}
              show={show}
              handleClose={() => handleToggleClose()}
            />
          </Card.Body>
          <div
            className={`position-relative mb-1 ${styles["event-image-container"]}`}
          >
            <Card.Img
              src={event.image}
              alt="Event"
              className={`rounded-4 top ${styles["event-image"]}`}
              onClick={handleToggleOpen}
            />
            <div className={` ${styles["badge"]} `}>
              {event.category_detail.name}{" "}
            </div>
            <FavoriteButton
              handleActionPop={(e) => handleRemovePop(e)}
              is_favorite={event.is_favorite}
              event_pk={event.pk}
            />
          </div>
          <Card.Title className={`ms-2 fw-bold ${styles["eventTitle"]} `}>
            {truncateTitle ? getFirstCharacters(event.name, 12) : event.name}..
          </Card.Title>
          <Card.Title className="ms-2 fs-6">
            <Row className="text-muted small">
              <Col xs="auto">
                <i className="fa-solid fa-location-dot"></i>
                <span className="mx-1">
                  {event.state}, {event.city}
                </span>
              </Col>
              <Col xs="auto">
                <i className="fa-solid fa-stopwatch "></i>
                <span className="mx-1">{convertDate(event.event_date)}</span>
              </Col>
            </Row>
          </Card.Title>
          <Card.Title className={`ms-2 fw-bold ${styles["fee"]} `}>
            &#8358;{formatCurrency(Number(event.display_price)) }
          </Card.Title>
        </Col>
      </Row>
    </Card>
  );
}

export default UpcomingEventCard;
