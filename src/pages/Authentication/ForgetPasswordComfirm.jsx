import React from "react";
import { Button, Container, Row, Col, Card, Image } from "react-bootstrap";
import styles from "./Authentication.module.scss";
import { NavLink } from "react-router-dom";
import "../../styles/main.scss";
import logo from "../../assets/images/Logo/appLogo.png";


function ForgetPasswordComfirm() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="w-100">
        <Col lg={{ span: 5, offset: 4 }} md={{ span: 12, offset: 12 }} sm={{ span: 12, offset: 12 }} xs={{ span: 12, offset: 12 }}>
          <Card className={`${styles["auth-card"]} shadow-lg border-0 mx-3`}>
            <Card.Body className="mx-4 my-3">
            <div className="text-center align-items-center">
                <Image
                  src={logo}
                  width={70}
                  height={90}
                  className="m-2"
                  alt="EthiopiaLogo"
                />
                <h6 className="logoText text-center">Utopia</h6>
              </div>
              <p className="mb-3 text-center"> A private link has been sent to your email address.</p>
              <Button
                as={NavLink}
                to={"/Login"}
                variant="primary"
                type="submit"
                className="w-100 mt-3"
              >
                Login
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ForgetPasswordComfirm;
