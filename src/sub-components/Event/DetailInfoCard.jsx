import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Image, ListGroup } from "react-bootstrap";
import styles from "./Event.module.scss";
import "../../styles/main.scss";
import user from "../../assets/images/icon/user.png";
import profileCover from "../../assets/images/background/profile-cover.jpg";
import { convertDate, convertTime } from "../../utils/HelperFunc";
import ShareEvent from "./Share/ShareEvent";

function DetailInfoCard({
  pk,
  name,
  title,
  location,
  date,
  organizerName,
  organizerEmail,
  organizerPk,
  organizerImge,
  totalTicket,
  totalSpeaker,
}) {
  return (
    <Row className={`${styles["infoMainCardRow"]} mb-3`}>
      <Col lg={5} md={6} sm={12} xs={12} className="mb-3">
        <Row>
          <Col lg={12} md={12} sm={12} xs={12} className="mb-3 ">
            <Card className={`${styles["infoCards"]} border-0 shadow`}>
              <Card.Body>
                <ListGroup variant="flush" as="ul" className="">
                  <ListGroup.Item as="li">
                    <i className="fa-solid fa-champagne-glasses mx-3"></i>
                    {title}
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                    <i className="fa-solid fa-location-dot mx-3"></i>
                    {location}
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                    <i className="fa-regular fa-clock mx-3"></i>
                    {`${convertDate(date)}, ${convertTime(date)}`}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={12} md={12} sm={12} xs={12} className="mb-3">
            <Link
              to={`/OrganizationProfile/${organizerPk}`}
              className={`d-flex gap-3 mt-2 align-items-center float-end mx-3 ${styles["detailSeeMore"]}`}
            >
              View Profile
              <i className={`fa-solid fa-arrow-right-long fs-4 m-0`}></i>
            </Link>
          </Col>
        </Row>
      </Col>
      <Col lg={5} md={6} sm={12} xs={12} className="mb-3">
        <Card className={`${styles["infoCards"]} border-0 shadow`}>
          <Card.Img
            variant="top"
            src={profileCover}
            height={120}
            alt="Cover Image"
            className={`${styles["profileBackgroundPic"]}`}
          />
          <Card.Body className="">
            <Row className="d-flex align-items-center gap-1">
              <Col lg={4} xs={4}>
                <Image
                  src={organizerImge ? organizerImge : user}
                  roundedCircle
                  className={`${styles["userPic"]}`}
                />
              </Col>
              <Col lg={7} xs={7}>
                <div>
                  <h5 className="m-0 p-0 fs-3 text-capitalize">
                    {organizerName}
                  </h5>
                  <p>{organizerEmail}</p>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={2} md={6} sm={12} xs={12} className="mb-3">
        <Row>
          <Col lg={12} md={6} sm={6} xs={6} className="mb-3">
            <Card className={`${styles["infoCards"]} border-0 shadow `}>
              <Card.Body className="text-center my-2">
                <Card.Text as="h5" className="fw-bold">
                  {totalTicket}
                </Card.Text>
                <Card.Text as="h5">Tickets</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={12} md={6} sm={6} xs={6}>
            <Card className={`${styles["infoCards"]} border-0 shadow`}>
              <Card.Body className="text-center my-2">
                <Card.Text as="h5" className="fw-bold">
                  +{totalSpeaker}
                </Card.Text>
                <Card.Text as="h5">Performers</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default DetailInfoCard;
