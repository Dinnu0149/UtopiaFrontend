import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import styles from "./User.module.scss";
import "../../styles/main.scss";

function ProfileDisplayCard() {
  return (
    <Row className={`${styles["dashboard-card-row"]} mb-3`}>
      <Col lg={3} md={6} sm={6} xs={6} className="mb-2">
        <Card
          className={`${styles["dashboard-header-card"]} border-0 shadow-lg`}
        >
          <Card.Body>
            <Card.Title className="d-flex justify-content-between">
              <h5>Me</h5>
              <i className="fa-solid fa-cog fs-6 border p-2 rounded"></i>
            </Card.Title>
            <Card.Title className="">
              <h6 className="fw-bold fs-3">18</h6>
            </Card.Title>
            <Card.Text className="p-0 m-0">
              2 complected
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={3} md={6} sm={6} xs={6} className="mb-2">
        <Card
          className={`${styles["dashboard-header-card"]} border-0 shadow-lg`}
        >
          <Card.Body>
            <Card.Title className="d-flex justify-content-between">
              <h5>Me</h5>
              <i className="fa-solid fa-cog fs-6 border p-2 rounded"></i>
            </Card.Title>
            <Card.Title className="">
              <h6 className="fw-bold fs-3">18</h6>
            </Card.Title>
            <Card.Text className="p-0 m-0">
              2 complected
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={3} md={6} sm={6} xs={6} className="mb-2">
        <Card
          className={`${styles["dashboard-header-card"]} border-0 shadow-lg`}
        >
          <Card.Body>
            <Card.Title className="d-flex justify-content-between">
              <h5>Me</h5>
              <i className="fa-solid fa-cog fs-6 border p-2 rounded"></i>
            </Card.Title>
            <Card.Title className="">
              <h6 className="fw-bold fs-3">18</h6>
            </Card.Title>
            <Card.Text className="p-0 m-0">
              2 complected
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={3} md={6} sm={6} xs={6} className="mb-2">
        <Card
          className={`${styles["dashboard-header-card"]} border-0 shadow-lg`}
        >
          <Card.Body>
            <Card.Title className="d-flex justify-content-between">
              <h5>Me</h5>
              <i className="fa-solid fa-cog fs-6 border p-2 rounded"></i>
            </Card.Title>
            <Card.Title className="">
              <h6 className="fw-bold fs-3">18</h6>
            </Card.Title>
            <Card.Text className="p-0 m-0">
              2 complected
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default ProfileDisplayCard;
