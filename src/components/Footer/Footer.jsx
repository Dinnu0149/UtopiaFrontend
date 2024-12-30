import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Footer.module.scss";
import "../../styles/main.scss";

function Footer() {
  return (
    <footer className={` ${styles["footer"]}`}>
      <Container fluid>
        <Row className="text-center">
          <Col xs={12} className="text-start d-flex gap-1">
            <p className="p-0 m-0">Made by</p>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Dinnu Daniel
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
