import React from "react";
import { Col, Row, Card } from "react-bootstrap";
import "../../styles/main.scss";

function AboutMe({ response }) {
  const { username, email, last_name, first_name, phone, state, city, Address } = response;

  return (
    <Card className="border-0 shadow cardException">
      <Card.Body>
        <Card.Title as="h6">About Me</Card.Title>
        <h5 className=" ls-2">Bio</h5>
        <p className="mt-2 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspen disse
          var ius enim in eros elementum tristique. Duis cursus, mi quis viverra
          ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
        </p>
        <Row>
          <Col xs={6} sm={6} lg={6} md={6} className="mb-4">
            <h5 className="ls-2">FirstName</h5>
            <p className="mb-0 text-capitalize">{first_name}</p>
          </Col>
          <Col xs={6} sm={6} lg={6} md={6} className="mb-4">
            <h5 className="ls-2">LastName</h5>
            <p className="mb-0 text-capitalize">{last_name}</p>
          </Col>
        </Row>
        <Row>
          <Col xs={6} sm={6} lg={6} md={6} className="mb-4">
            <h5 className="ls-2">Email </h5>
            <p className="mb-0">{email}</p>
          </Col>
          <Col xs={6} sm={6} lg={6} md={6} className="mb-4">
            <h5 className="ls-2">UserName </h5>
            <p className="mb-0">{username}</p>
          </Col>
        </Row>
        <Row>
          <Col xs={6} sm={6} lg={6} md={6} className="mb-4">
            <h5 className="ls-2">Phone </h5>
            <p className="mb-0">{phone}</p>
          </Col>
          <Col xs={6} sm={6} lg={6} md={6} className="mb-4">
            <h5 className="ls-2">Location</h5>
            <p className="mb-0">{`${state}, ${city}`}</p>
          </Col>
        </Row>
        <Row>
          <Col xs={6} sm={6} lg={6} md={6} className="mb-5">
            <h5 className="ls-2">Address </h5>
            <p className="mb-0">{Address}</p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default AboutMe;
