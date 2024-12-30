import React, { useState } from "react";
import { Card, Row, Col, Image } from "react-bootstrap";
import styles from "./Event.module.scss";
import { Link, NavLink } from "react-router-dom";
import "../../styles/main.scss";
import { convertDate } from "../../utils/HelperFunc";
import EventModelPopUp from "./EventModelPopUp";
import user from "../../assets/images/male.jpg";
import FavoriteButton from "../../components/Button/FavoriteButton";

function EventCard({ event, handleRemovePop }) {  
  const [show, setShow] = useState(false);

  const handleToggleOpen = () => setShow(true);
  const handleToggleClose = () => setShow(false);

  return (
    <Card className={`p-3 shadow-sm ${styles["event-card"]}`}>
      <Row>
        <Col lg={2} xs={2} md={2} sm={2} className="m-0 p-0">
          <Link to={`/OrganizationProfile/${event.created_by?.id}`}>
            <Image
              roundedCircle
              className={`${styles["organizerImg"]} `}
              variant="border-0 p-0 m-0 mx-2"
              src={event.organization?.profile_picture ? event.organization.profile_picture : user}
            />
          </Link>
        </Col>
        <Col lg={10} xs={10} md={10} sm={10} className="m-0 p-0">
          <Card.Title
            as={NavLink}
            to={`/OrganizationProfile/${event.created_by?.id}`}
            className={` ${styles["eventTitle"]} p-0 m-0 fw-bold`}
          >
            {event.organization?.organization_name}
            <span>
              <i className="fa-solid fa-certificate ms-1 text-success"></i>
            </span>
          </Card.Title>
          <Card.Body className="px-0 py-1">
            <Card.Title className={` ${styles["eventTitle"]} p-0 m-0`}>
              {event.name}
            </Card.Title>
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
              className={`rounded ${styles["event-image"]}`}
              onClick={handleToggleOpen}
            />
            <div className={styles["badge"]}>
              {event.category_detail?.name}{" "}
            </div>
            <FavoriteButton
              handleActionPop={(e) => handleRemovePop(e)}
              is_favorite={event.is_favorite}
              event_pk={event.pk}
            />
          </div>
          <Card.Title className="fw-bold fs-6">
            <Row className="text-muted small mt-2">
              <Col xs="auto" >
                <i className="fa-solid fa-location-dot"></i>
                <span className="mx-1">
                  {event.state}, {event.city}
                </span>
              </Col>
              <Col xs="auto" >
                <i className="fa-solid fa-stopwatch "></i>
                <span className="mx-1">{convertDate(event.event_date)}</span>
              </Col>
            </Row>
          </Card.Title>
        </Col>
      </Row>
    </Card>
  );
}

export default EventCard;
