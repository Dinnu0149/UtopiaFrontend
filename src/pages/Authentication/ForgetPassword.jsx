import React, { useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Image,
  Spinner,
} from "react-bootstrap";
import styles from "./Authentication.module.scss";
import { useNavigate } from "react-router-dom";
import "../../styles/main.scss";
import logo from "../../assets/images/Logo/appLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { forgetPasswordOpreation } from "../../actions/authActions";

function ForgetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const handleForgetPasswordSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    
    dispatch(forgetPasswordOpreation(email));
  };

  useEffect(() => {
    if (authState.response) {
      navigate("/password/forget/comfirm");
    }
  }, [authState, navigate]);

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
              <p className="mb-3 text-center">Please enter your email address.</p>
              <Form onSubmit={handleForgetPasswordSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Emall Adress"
                    name="email"
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mt-3 rounded-pill py-2">
                  {authState.loading ? (
                    <Spinner
                      animation="border"
                      size="sm"
                      role="status"
                    ></Spinner>
                  ) : (
                    "Send lInk"
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ForgetPassword;
