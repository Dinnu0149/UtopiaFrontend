import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Container,
  Row,
  Col,
  Image,
  Spinner,
  Card,
} from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../styles/main.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/Logo/appLogo.png";
import styles from "./LoginPop.module.scss";
import { login, clearAuthResponse } from "../../actions/authActions";
import MessagesPopUp from "../../components/Popups/MessagesPopUp";
import GoogleAuthencation from "./GoogleAuthencation";

function LoginPopup({ show, handleClose, handleSuccessMassage }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setMessage] = useState({ text: "", color: "" });

  useEffect(() => {
    if (authState.error) {
      handleComfirmationPopUps(authState.error, "bg-danger");
      dispatch(clearAuthResponse());
    }
  }, [authState, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const formData = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    dispatch(login(formData));
  };

  const handleComfirmationPopUps = (messageInfo, messageBgColor) => {
    setMessage({ text: messageInfo, color: messageBgColor });
    setComfirmationAction(true);
    setTimeout(() => {
      setComfirmationAction(false);
    }, 4000);
  };

  return (
    <>
      <Modal
        centered
        show={show}
        size="md"
        onHide={() => handleClose()}
        className={styles["event-modal"]}
      >
        <Modal.Header closeButton>
          <Modal.Title as={"h5"}>Login Center</Modal.Title>
          <MessagesPopUp
            isVisible={comfirmationAction}
            message={message.text}
            bgColor={message.color}
          />
        </Modal.Header>
        <Modal.Body className="m-0 p-0">
          <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
          >
            <Row className="w-100">
              <Col>
                <Card
                  className={`${styles["auth-card"]} shadow-lg border-0 mx-0`}
                >
                  <Card.Body className="mx-4 my-3">
                    <div className="text-center align-items-center">
                      <Image
                        src={logo}
                        width={70}
                        height={90}
                        className="m-2"
                        alt="UtopiaLogo"
                      />
                      <h6 className="logoText text-center">Utopia</h6>
                    </div>
                    <p className="mb-3 text-center">
                      Please login to process your payment and booking.
                    </p>
                    <Form onSubmit={handleLoginSubmit}>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Username"
                          name="username"
                          required
                        />
                      </Form.Group>

                      <Form.Group
                        controlId="formBasicPassword"
                        className="mt-3"
                      >
                        <Form.Label>Password</Form.Label>
                        <div className="input-group">
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="**********"
                            name="password"
                            required
                          />
                          <div className="input-group-append">
                            <Button
                              variant="outline-secondary"
                              onClick={togglePasswordVisibility}
                              className="toggle-password-btn bg-transparent text-dark text-center border"
                            >
                              {showPassword ? (
                                <FaEyeSlash
                                  className={styles["password-visiblility"]}
                                />
                              ) : (
                                <FaEye
                                  className={styles["password-visiblility"]}
                                />
                              )}
                            </Button>
                          </div>
                        </div>
                      </Form.Group>

                      <Form.Group
                        controlId="formBasicCheckbox"
                        className="mt-3"
                      >
                        <Form.Check type="checkbox" label="Remember me" />
                      </Form.Group>

                      <div className="d-flex justify-content-end mt-3">
                        <Link to={"/ForgetPassword"}>
                          Forgot your password?
                        </Link>
                      </div>

                      <Button
                        variant="primary"
                        type="submit"
                        className="w-100 mt-3 rounded-pill py-2"
                      >
                        {authState.loading ? (
                          <Spinner
                            animation="border"
                            size="sm"
                            role="status"
                          ></Spinner>
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                    </Form>

                    <div className="mt-5 mx-3">
                      <div className="d-flex justify-content-center align-items-center mb-3">
                        <hr className="w-25 me-2" />
                        <p className="mb-0 text-center">Or sign in with</p>
                        <hr className="w-25 ms-2" />
                      </div>
                      <GoogleAuthencation />
                      <div className=" mt-3 mb-5">
                        <p className=" m-0 text-center">
                          Don't have an account?
                          <Link to={"/SignUp"} className="ms-2">
                            SignUp
                          </Link>
                        </p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginPopup;
