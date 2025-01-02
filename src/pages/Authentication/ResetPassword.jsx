import React, { useState, useEffect } from "react";
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
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/main.scss";
import logo from "../../assets/images/Logo/appLogo.png";
import MessagesPopUp from "../../components/Popups/MessagesPopUp";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordOpreation } from "../../actions/authActions";


function ResetPassword() {
  const navigate = useNavigate();
  const { uidb64, token } = useParams();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");

  const handleComfirmationPopUps = (messageInfo, messageBgColor) => {
    setmessage(messageInfo);
    setmessageColor(messageBgColor);
    setComfirmationAction(true);
    setTimeout(() => {
      setComfirmationAction(false);
    }, 5000);
  };

  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    const new_password = e.target.new_password.value;
    const data = {
      uidb64: uidb64,
      token: token,
      new_password: new_password,
    };
    
    dispatch(resetPasswordOpreation(data));
  };

  useEffect(() => {
    if (authState.response) {
      navigate("/login", {
        state: { message: "Reset successful, Login!" },
      });
    } else if (authState.error) {
      handleComfirmationPopUps(authState.error, "bg-danger");
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
            <MessagesPopUp
              isVisible={comfirmationAction}
              message={message}
              bgColor={messageColor}
            />
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
              <p className="mb-3 text-center">Reset your password.</p>
              <Form onSubmit={handleResetPasswordSubmit}>
                <Form.Group controlId="formBasicPassword" className="mt-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="**********"
                    name="new_password"
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
                    "Reset password"
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

export default ResetPassword;
