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
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./Authentication.module.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../styles/main.scss";
import logo from "../../assets/images/Logo/appLogo.png";
import MessagesPopUp from "../../components/Popups/MessagesPopUp";
import { useDispatch, useSelector } from "react-redux";
import { login, clearAuthResponse } from "../../actions/authActions";
import GoogleAuthencation from "../../sub-components/Authencation/GoogleAuthencation";


function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (location.state?.message) {
      const redirectMessage = location.state?.message;
      handleComfirmationPopUps(redirectMessage, "bg-success");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, []);

  const handleComfirmationPopUps = (messageInfo, messageBgColor) => {
    setmessage(messageInfo);
    setmessageColor(messageBgColor);
    setComfirmationAction(true);
    setTimeout(() => {
      setComfirmationAction(false);
    }, 4000);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const formData = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    dispatch(login(formData));
  };

  useEffect(() => {
    if (authState.accessToken) {
      navigate("/OrganizerDashboard", {
        state: { message: "Login successful!" },
      });
    } else if (authState.error) {      
      handleComfirmationPopUps(authState.error, "bg-danger");
      dispatch(clearAuthResponse());
    }
  }, [authState, navigate]);

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
          <Card className={`${styles["auth-card"]} shadow-lg border-0 mx-0`}>
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

              <p className="mb-3 text-center">
                Please enter your user information.
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

                <Form.Group controlId="formBasicPassword" className="mt-3">
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
                          <FaEye className={styles["password-visiblility"]} />
                        )}
                      </Button>
                    </div>
                  </div>
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox" className="mt-3">
                  <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>

                <div className="d-flex justify-content-end mt-3">
                  <Link to={"/ForgetPassword"}>Forgot your password?</Link>
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
  );
}

export default Login;
