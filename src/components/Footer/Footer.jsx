import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Footer.module.scss";
import "../../styles/main.scss";

function Footer() {
  return (
    <footer className={`position-relative mt-5`}>
      <Container fluid className={`position-fixed bottom-0 ${styles["footer"]}`}>
        <Row className="text-center">
          <Col xs={12} className="d-flex gap-1 ms-1">
            <p className="p-0 m-0">Made by</p>
            <a href="https://github.com/Dinnu0149" target="_blank" rel="noopener noreferrer">
              Dinnu Daniel 
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
