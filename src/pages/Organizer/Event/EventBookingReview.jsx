import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Button,
  Card,
  ListGroup,
  Image,
  Spinner,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import styles from "./Event.module.scss";
import "../../../styles/main.scss";
import Layout from "../../../components/Layouts/Layout";
import PageHeader from "../../../components/Header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { getEventDetail } from "../../../actions/eventActions";
import { formatCurrency, getFirstCharacters } from "../../../utils/HelperFunc";
import {
  paymentInitialization,
  clearPaymentResponse,
} from "../../../actions/paymentAction";
import LoginPopup from "../../../sub-components/Authencation/LoginPopup";
import { displayMessage } from "../../../actions/messageActions";

function EventBookingReview() {
  let { pk, ticket_id } = useParams();
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);

  const { detailLoading, detailError, detailResponse } = useSelector(
    (state) => state.event
  );

  const { initializationLoading, initializationError, initializationResponse } =
    useSelector((state) => state.payment);

  const { authorization_url } = initializationResponse || [];

  const { name, location, state, city, category_detail = [], image = [] } = detailResponse;

  const {
    quantity,
    price,
    name: ticketType,
  } = JSON.parse(localStorage.getItem("ticket_info")) || {};

  const [totalPrice, setTotalPrice] = useState(price);
  const [show, setShow] = useState(false);

  const calculatePrice = (price * quantity).toFixed(2);

  useEffect(() => {
    dispatch(getEventDetail(pk));
    setTotalPrice(calculatePrice);
  }, [dispatch, quantity]);

  useEffect(() => {
    if (authState.accessToken && show) {
      dispatch(displayMessage("Login success, you can now make your payment", "bg-success",))
      handleToggleClose()
    }
  }, [authState]);

  useEffect(() => {
    if (authorization_url) {
      window.location.href = authorization_url;
    }
  }, [authorization_url]);

  const handleBookingSubmit = () => {
    const formData = {
      ticket_id: ticket_id,
      amount: calculatePrice,
      quantity: quantity,
    };

    if (authState.user) {
      dispatch(paymentInitialization(formData));
    } else {
      setShow(true);
    }
  };

  useEffect(() => {
    if (initializationError) {
      const messageInfo = initializationError;
      const messageColor = "bg-danger";
      dispatch(displayMessage(messageInfo, messageColor))
      dispatch(clearPaymentResponse());
    }
    if (initializationError === "Unauthorized") {
      handleToggleOpen();
    }
  }, [initializationError]);

  useEffect(() => {
    if (detailError) {
      dispatch(displayMessage(detailError, "bg-danger"))

    }
  }, [detailError]);

  const handleRedirectMessage = (redirectMessage) => {
    if (redirectMessage) {
      dispatch(displayMessage(redirectMessage.text, redirectMessage.color))
    }
  };

  const handleToggleOpen = () => setShow(true);
  const handleToggleClose = () => setShow(false);

  return (
    <Layout
      dataLoading={detailLoading}
    >
      <section className="mx-3">
        <PageHeader title={"Review Ticket Summary"} />
        <LoginPopup
          show={show}
          handleClose={() => handleToggleClose()}
          handleSuccessMassage={handleRedirectMessage}
        />
        <Row className="mb-5">
          <Col lg={6} xs={12} className="mb-2 ">
            <Card className="border-0 shadow mx-3">

              <Card.Body className="d-flex p-1">
                <Row>
                  <Col className=" ">
                    <Image
                      src={image}
                      alt="Event"
                      className="img-fluid"
                      rounded
                      style={{minHeight: '100px', maxHeight: '110px', width: '200px'}}
                    />
                  </Col>

                  <Col
                    className={`${styles["reviewEventinfo"]}`}
                  >
                    <div className={`${styles["badge"]} text-center`}>
                      {category_detail.name}
                    </div>
                    <Card.Title
                      className={`fw-bold mb-0 mt-2 ${styles["eventTitle"]} `}
                    >
                      {getFirstCharacters(name, 18)}....
                    </Card.Title>
                    <i className="fa-solid fa-location-dot "></i>{" "}
                    <span className={`mx-1 fs-8 ${styles["location"]} `}>
                      {state}, {city} {" "}
                      {getFirstCharacters(location, 15)}...
                    </span>
                  </Col>
                </Row>

              </Card.Body>
            </Card>
          </Col>

          <Col lg={6} xs={12} className={`${styles["reviewBookinginfo"]}`}>
            <Card className="border-0 shadow">
              <Card.Body>
                <ListGroup as="ul" className="border">
                  <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start border-0"
                  >
                    <h5 className="">Quantity</h5>
                    <h6 className="">{quantity}</h6>
                  </ListGroup.Item>
                  <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start border-0"
                  >
                    <h5 className="">1 {ticketType} Ticket</h5>
                    <h6 className="">
                      &#8358;{formatCurrency(Number(price), true)}
                    </h6>
                  </ListGroup.Item>
                  <hr className="mx-4" />
                  <ListGroup.Item
                    as="li"
                    className={`${styles["reviewBookingTotal"]} d-flex justify-content-between align-items-start mt-0 border-0`}
                  >
                    <h5 className="">Total</h5>
                    <h6 className="">
                      &#8358;{formatCurrency(Number(totalPrice), true)}
                    </h6>
                  </ListGroup.Item>
                  <hr className="mx-4 mb-0" />
                  <div className="p-1 mx-3 my-2 ">
                    <i className="fa-solid fa-credit-card"></i>
                    <span className="mx-2">
                      Paystack <small className="text-danger">gateway</small>
                    </span>
                  </div>
                </ListGroup>
                <Button
                  className="mt-3 px-5 float-end rounded-pill "
                  onClick={() => handleBookingSubmit()}
                >
                  {initializationLoading ? (
                    <Spinner
                      animation="border"
                      size="sm"
                      role="status"
                    ></Spinner>
                  ) : (
                    "Payment"
                  )}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </Layout>
  );
}

export default EventBookingReview;
