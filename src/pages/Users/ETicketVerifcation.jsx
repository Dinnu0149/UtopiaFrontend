import React, { useEffect, useState } from "react";
import { Col, Row, Button, Card } from "react-bootstrap";
import NonAvailable from "../../components/Loading/NonAvailable";
import verified from "../../assets/images/illustrations/verified.png";
import notverified from "../../assets/images/illustrations/notVerified.png";
import { useParams, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/main.scss";
import Layout from "../../components/Layouts/Layout";
import {
  clearRedirectPath,
  saveRedirectPath,
} from "../../actions/redirectAction";
import { verifyBooking, registerBooking } from "../../actions/bookingActions";
import { convertDate, convertTime } from "../../utils/HelperFunc";
import ActionPopUp from "../../components/Popups/ActionPopUp";
import { displayMessage } from "../../actions/messageActions";

function ETicketVerifcation() {
  let { booking_id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();

  const redirectPath = useSelector((state) => state.redirect);
  const auth = useSelector((state) => state.auth);

  const {
    verifyLoading,
    verifyError,
    verifyResponse,
    registerError,
    registerResponse,
  } = useSelector((state) => state.booking);
  const {
    ticket_name,
    event = [],
    quantity,
    seat_number,
    verification_date,
    expire_date,
    status,
  } = verifyResponse || [];

  const [registerPop, setRegisterPop] = useState(false);

  useEffect(() => {
    dispatch(verifyBooking(booking_id));

    if (redirectPath && redirectPath.redirectPath) {
      dispatch(clearRedirectPath());
    }
  }, [dispatch, registerResponse]);

  useEffect(() => {
    if (verifyError) {
      dispatch(displayMessage(verifyError, "bg-danger"));
    }
  }, [verifyError]);

  useEffect(() => {
    if (registerError || registerResponse) {
      const messageInfo = registerResponse
        ? "Registration successful "
        : registerError;
      const messageColor = registerResponse ? "bg-success" : "bg-danger";

      dispatch(displayMessage(messageInfo, messageColor));
    }
  }, [registerResponse, registerError]);

  const handleSetLoginRedirectPath = () => {
    dispatch(saveRedirectPath(location.pathname));
  };

  const handleRegistration = () => {
    dispatch(registerBooking(booking_id));
    setRegisterPop(!registerPop);
  };

  const handleActionPop = () => {
    setRegisterPop(!registerPop);
  };

  return (
    <Layout
      dataLoading={verifyLoading}
    >
      <section className="mx-3">
        <Row className="mb-3 mt-3">
          {verifyError ? (
            <Col
              className="d-flex justify-content-center align-content-center gap-2"
              style={{ minHeight: "50vh" }}
            >
              <Card className="shadow-lg rounded-5 border-0">
                <Card.Body>
                  <NonAvailable imageSrc={notverified} message="" />
                  <h5 className="fs-5 text-center text-capitalize">
                    Invaild ticket, this is user's ticket is invalid and can't
                    be retrived .
                  </h5>
                </Card.Body>

                <div className="text-center mb-3">
                  <p className="p-0 m-0">
                    Are you an organizer and whishes to register this ticket
                  </p>
                  {auth.user ? (
                    ""
                  ) : (
                    <Link to={"/login"}>Login to register ticket</Link>
                  )}
                </div>
              </Card>
            </Col>
          ) : (
            <Col
              className="d-flex justify-content-center align-content-center gap-2"
              style={{ minHeight: "70vh" }}
            >
              <Card className="shadow-lg rounded-5 border-0">
                <Card.Body>
                  <NonAvailable
                    imageSrc={status === "valid" ? verified : notverified}
                    message=""
                  />
                  <h5 className="fs-5 text-center text-capitalize">
                    {status === "valid"
                      ? "This user's ticket is verified and is ready to be used."
                      : "Sorry this ticket is either used or expired."}
                  </h5>

                  <h5 className="fw-bold mt-4 text-center fs-4 text-warning">
                    About Ticket
                  </h5>
                    <ActionPopUp
                      actionFunc={() => handleRegistration()}
                      title={"Register"}
                      message="Register Ticket, this action can't be reversed"
                      cancleFunc={() => setRegisterPop(null)}
                      handler={{
                        icon: "fa-solid fa-chart-line",
                        color: "bg-success",
                      }}
                      isVisible={registerPop}
                    />
                  <Row className="">
                    <Col lg={4}>
                      <h5 className="fs-6 fw-bold">Event:</h5>
                    </Col>
                    <Col lg={4}>
                      <p>{event?.event_name}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Row>
                        <Col>
                          <h5 className="fs-6 fw-bold">Type:</h5>
                        </Col>
                        <Col>
                          <p>{ticket_name}</p>
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <Row>
                        <Col>
                          <h5 className="fs-6 fw-bold">Quantity:</h5>
                        </Col>
                        <Col>
                          <p>{quantity}</p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Row>
                        <Col>
                          <h5 className="fs-6 fw-bold">Seat No:</h5>
                        </Col>
                        <Col>
                          <p>{seat_number}</p>
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <Row>
                        <Col>
                          <h5 className="fs-6 fw-bold">Date:</h5>
                        </Col>
                        <Col>
                          <p>{convertDate(event?.date)}</p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <h5 className="mt-2 fs-4 fw-bold text-center text-warning">
                    Ticket Status
                  </h5>

                  <Row className="mb-2 text-center">
                    <Col>
                      <h5 className="fs-5 fw-bold">Status:</h5>
                    </Col>
                    <Col>
                      {status === "valid" ? (
                        <h5 className="fs-5 text-success text-capitalize">
                          {status}{" "}
                          <i className="fa-solid fa-circle-check ms-2 "></i>
                        </h5>
                      ) : (
                        <h5 className="fs-5 text-danger text-capitalize">
                          {status}
                          <i className="fa-solid fa-triangle-exclamation ms-2"></i>
                        </h5>
                      )}
                    </Col>
                  </Row>

                  <Row className="mb-2 text-center">
                    <Col>
                      <h5 className="fs-5 fw-bold">Expires:</h5>
                    </Col>
                    <Col>
                      <h5 className="fs-5">{convertDate(expire_date)}</h5>
                    </Col>
                  </Row>

                  <Row className="mb-2 text-center">
                    <Col>
                      <h5 className="fs-5 fw-bold">Verification Time:</h5>
                    </Col>
                    <Col>
                      <h5 className="fs-5">{convertTime(verification_date)}</h5>
                    </Col>
                  </Row>

                  {auth.user && auth.user.pk === event.created_by ? (
                    <Row>
                      <Col>
                        <Button
                          className="btn bg-success text-light p-2 w-100"
                          onClick={handleActionPop}
                          disabled={status === "valid" ? false : true}
                        >
                          Register Ticket
                        </Button>
                      </Col>
                      <Col>
                        <Button className="btn p-2 w-100">
                          <Link to={"/qrscanner"} className="text-light">
                            Scanner
                          </Link>
                        </Button>
                      </Col>
                    </Row>
                  ) : (
                    ""
                  )}
                </Card.Body>

                <div className="text-center mb-3">
                  <p className="p-0 m-0">
                    Are you an organizer and whishes to register this ticket
                  </p>
                  {auth.user ? (
                    ""
                  ) : (
                    <Link onClick={handleSetLoginRedirectPath} to={"/Logloginin"}>
                      Login to register ticket
                    </Link>
                  )}
                </div>
              </Card>
            </Col>
          )}
        </Row>
      </section>
    </Layout>
  );
}

export default ETicketVerifcation;
