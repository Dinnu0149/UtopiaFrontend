import React, { useState, useEffect } from "react";
import { Col, Row, Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import styles from "./User.module.scss";
import "../../styles/main.scss";
import Layout from "../../components/Layouts/Layout";
import PageHeader from "../../components/Header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { getBooking } from "../../actions/bookingActions";
import { convertDate, convertTime } from "../../utils/HelperFunc";
import { displayMessage } from "../../actions/messageActions";

function TicketDetail() {
  let { booking_id } = useParams();
  const dispatch = useDispatch();

  const { detailLoading, detailError, detailResponse } = useSelector(
    (state) => state.booking
  );

  const {
    ticket_name,
    qr_code,
    seat_number,
    expire_date,
    status,
    verification_date,
    event = [],
    user = [],
  } = detailResponse || [];

  useEffect(() => {
    dispatch(getBooking(booking_id));
  }, [dispatch]);

  useEffect(() => {
    if (detailError) {
      dispatch(displayMessage(detailError, "bg-danger"));
    }
  }, [detailError]);

  return (
    <Layout
      dataLoading={detailLoading}
    >
      <section className="mx-3">
        <PageHeader title={"E-Ticket"} />
        <Row
          className={`${styles["ticketRow"]} bg-light shadow rounded-5 p-3 mb-2`}
        >
          <Col xs={12} xl={3} md={6} className="mb-2 mt-2">
            <Card className="border-0 bg-transparent">
              <Card.Body className=" p-1">
                <Card.Img
                  className={`${styles["eventImage"]} img-fluid`}
                  variant="border-0 rounded-4 p-0 m-0"
                  src={
                    event.image
                  }
                />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} xl={3} md={6} className="">
            <Card className="border-0 bg-transparent">
              <Card.Body>
                <Row>
                  <Col>
                    <p className="m-0 p-1 text-dark">Event Name</p>
                    <p className="fw-bold text-light">{event.event_name}</p>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <p className="m-0 p-1 text-dark">Phone</p>
                    <p className="fw-bold text-light">+234{user.phone}</p>
                  </Col>
                  <Col>
                    <p className="m-0 p-1 text-dark">Status</p>
                    <p className="fw-bold text-light">{status}</p>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <p className="m-0 p-1 text-dark">Verification</p>
                    <p className="fw-bold text-light">
                      {convertTime(verification_date)}
                    </p>
                  </Col>
                  <Col>
                    <p className="m-0 p-1 text-dark">Expires</p>
                    <p className="fw-bold text-light">
                      {convertDate(expire_date)}
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} xl={3} md={6} className="">
            <Card className="border-0 bg-transparent">
              <Card.Body>
                <Row>
                  <Col>
                    <p className="m-0 p-1 text-dark">Booked By</p>
                    <p className="fw-bold text-light">{user.username}</p>
                  </Col>
                  <Col>
                    <p className="m-0 p-1 text-dark">Venue</p>
                    <p className="fw-bold text-light">{event.location}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p className="m-0 p-1 text-dark">Date</p>
                    <p className="fw-bold text-light">
                      {convertDate(event.date)}
                    </p>
                  </Col>
                  <Col>
                    <p className="m-0 p-1 text-dark">Time</p>
                    <p className="fw-bold text-light">
                      {convertTime(event.date)}
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col xs="auto" className="d-flex align-items-center">
                    <div
                      className={styles["ticketVerticalDesign"]}
                      style={{
                        right: "170px",
                      }}
                    ></div>

                    <div
                      className={styles["ticketVerticalDesign"]}
                      style={
                        status !== "valid"
                          ? {
                              right: "100px",
                              backgroundColor: "red",
                            }
                          : {
                              right: "100px",
                            }
                      }
                    ></div>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <p className="m-0 p-1 text-dark">Ticket Type</p>
                    <p className="fw-bold text-light">{ticket_name}</p>
                  </Col>
                  <Col>
                    <p className="m-0 p-1 text-dark">Seat</p>
                    <p className="fw-bold text-light">{seat_number}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} xl={3} md={6} className="mb-2 mt-2">
            <Card className="border-0 bg-transparent">
              <Card.Body className="d-flex justify-content-center align-items-center ">
                <Card.Img
                  className={`${styles[""]} img-fluid`}
                  variant="border-0 rounded-4 p-0 m-0"
                  width={"200px"}
                  alt="qr_code"
                  src={qr_code}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col
            lg={12}
            className="d-flex justify-content-center align-items-center mb-2"
          >
            <Button className="rounded-pill px-5 btn_reverse">
              Get Direction
            </Button>
          </Col>
          <Col
            lg={12}
            className="d-flex justify-content-center align-items-center "
          >
            <Button className="rounded-pill px-5">DownLoad Ticket</Button>
          </Col>
        </Row>
      </section>
    </Layout>
  );
}

export default TicketDetail;
