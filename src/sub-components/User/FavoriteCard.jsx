import React, { useState } from "react";
import { Card, Row, Col, Image } from "react-bootstrap";
import styles from "../Event/Event.module.scss";
import "../../styles/main.scss";
import { formatCurrency, getFirstCharacters } from "../../utils/HelperFunc";
import EventModelPopUp from "../Event/EventModelPopUp";
import FavoriteButton from "../../components/Button/FavoriteButton";

function FavoriteCard({ event, handleRemovePop }) {
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

          <Row className={styles["favoriteEvent"]}>
            <Col className={`${styles["favoriteEventImageContainer"]}`}>
              <div
                className={`position-relative mb-1 ${styles["eventImageBody"]}`}
              >
                <Image
                  src={event.image}
                  alt="Event"
                  className={`${styles["favoriteImage"]} img-fluid`}
                  rounded
                  onClick={handleToggleOpen}
                />
                <FavoriteButton
                  handleActionPop={(e) => handleRemovePop(e)}
                  is_favorite={event.is_favorite}
                  event_pk={event.pk}
                />
              </div>
            </Col>

            <Col
              className={`${styles["nearbyEventInfo"]} align-content-center`}
            >
              <div className={`${styles["badge"]} text-center`}>
                {event.category_detail.name}{" "}
              </div>
              <Card.Title className={`fw-bold mb-0 ${styles["eventTitle"]} `}>
                {getFirstCharacters(event.name, 14)}...
              </Card.Title>

              <i className="fa-solid fa-location-dot"></i>
              <span className="mx-1">{event.city}</span>
              <Card.Title className={`${styles["fee"]} fw-bold`}>
                &#8358;{formatCurrency(Number(event.display_price), true)}
              </Card.Title>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}

export default FavoriteCard;
