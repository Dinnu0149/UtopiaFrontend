import React, { forwardRef } from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'; 
import NoneAvailable from "../../assets/images/illustrations/none_available.png";


const NonAvailable = forwardRef(({ message = "No item available", imageSrc }, ref) => {
  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '100px' }} ref={ref}>
    <Row className="text-center">
      <Col>
        <Image
          src={imageSrc || NoneAvailable} 
          alt="No items"
          style={{ maxWidth: "170px", marginBottom: "20px" }}
        />
        <h5>{message}</h5>
      </Col>
    </Row>
  </Container>
);
});

export default NonAvailable