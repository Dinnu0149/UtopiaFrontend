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
import { Link, useNavigate } from "react-router-dom";
import "../../styles/main.scss";
import logo from "../../assets/images/Logo/appLogo.png";
import MessagesPopUp from "../../components/Popups/MessagesPopUp";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../actions/authActions";

function OrganizerSignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);
  
    const [comfirmationAction, setComfirmationAction] = useState(false);
    const [message, setMessage] = useState({ text: "", color: "" });
    const [showPassword, setShowPassword] = useState(false);
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    const handleComfirmationPopUps = (messageInfo, messageBgColor) => {
      setMessage({ text: messageInfo, color: messageBgColor });
      setComfirmationAction(true);
      setTimeout(() => setComfirmationAction(false), 4000);
    };

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        const formData = {
          username: e.target.username.value,
          email: e.target.email.value,
          is_event_planner: true,
          is_client: false,
          password: e.target.password.value,
        };
    
        dispatch(signup(formData));
      };

      useEffect(() => {
        if (!authState.loading && authState.signupResponse) {
          navigate("/login", {
            state: { message: "Account created successfully, Please Login!" },
          });
        } else if (!authState.loading && authState.error) {
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
          <Card className={`${styles["auth-card"]} shadow-lg border-0 mx-0`}>
            <MessagesPopUp
              isVisible={comfirmationAction}
              message={message.text}
              bgColor={message.color}
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
            <p className="mb-3 text-center">Welcome to ethiopia organizer center, enter<br />  your information to get started.</p>
              <Form onSubmit={handleSignUpSubmit}>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    name="username"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email Address"
                    name="email"
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
                      autoComplete="new-password"
                      pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
                      title="6 or more alphanumeric charater"
                      required
                    />
                    <div className="input-group-append">
                      <Button
                        variant="outline-secondary"
                        onClick={togglePasswordVisibility}
                        className="toggle-password-btn bg-transparent text-dark text-center border"
                      >
                        {showPassword ? <FaEyeSlash className={styles["password-visiblility"]}/> : <FaEye className={styles["password-visiblility"]}/>}
                      </Button>
                    </div>
                  </div>
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox" className="mt-3 d-flex gap-2">
                  <Form.Check
                    type="checkbox"
                    required
                  />
                  <Form.Label>Agree to <Link>terms and conditions</Link> </Form.Label>
                </Form.Group>

                <div className="d-flex justify-content-end mt-3">
                  <Link to={"/ForgetPassword"}>Forgot your password?</Link>
                </div>

                <Button variant="primary" type="submit" className="w-100 mt-3 rounded-pill py-2">
                  {authState.loading ? (
                    <Spinner
                      animation="border"
                      size="sm"
                      role="status"
                    ></Spinner>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </Form>

              <div className="mt-5 mx-3">
                <div className=" mt-3 mb-5">           
                  <p className=" m-0 text-center">
                    Already have an account?
                    <Link to={"/Login"} className="ms-2">SignIn</Link>
                  </p>
                  <p className=" m-0 text-center">
                    Become a event explorer?
                    <Link to={"/SignUp"} className="ms-2">SignUp</Link>
                  </p>                 
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default OrganizerSignUp