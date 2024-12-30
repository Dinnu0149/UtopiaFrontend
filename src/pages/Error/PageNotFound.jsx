import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import NonAvailable from "../../components/Loading/NonAvailable";
import {useNavigate } from "react-router-dom";
import notFound from "../../assets/images/illustrations/404.png";

function PageNotFound() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="w-100">
        <Col
          lg={{ span: 5, offset: 4 }}
          md={{ span: 12, offset: 12 }}
          sm={{ span: 12, offset: 12 }}
          xs={{ span: 12, offset: 12 }}
        >
          <NonAvailable message="" imageSrc={notFound} />
          <h1 className="text-danger text-center fw-bold">
            404 Page Not Found
          </h1>
          <Button onClick={handleBackClick} className="text-center w-100 p-2 mt-3">
            Back
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default PageNotFound;
