import React, { useEffect } from "react";
import { Col, Row, Button, Card } from "react-bootstrap";
import NonAvailable from "../../components/Loading/NonAvailable";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../../styles/main.scss";
import Layout from "../../components/Layouts/Layout";
import { paymentVerification } from "../../actions/paymentAction";
import { useDispatch, useSelector } from "react-redux";
import verified from "../../assets/images/illustrations/verified.png";
import notverified from "../../assets/images/illustrations/notVerified.png";
import pending from "../../assets/images/illustrations/pending.png";
import { displayMessage } from "../../actions/messageActions";

function PaymentCallBack() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const reference = searchParams.get("reference");

  const { verificationResponse, verificationLoading, verificationError } =
    useSelector((state) => state.payment);

  const { booking_id } = verificationResponse || [];

  useEffect(() => {
    if (!booking_id) {
      dispatch(paymentVerification(reference));
    }
  }, [reference]);


  const handleETicketRediret = () => {
    navigate(`/Ticket/${booking_id}`);
  };

  const handleEventRediret = () => {
    navigate("/Events");
  };

  useEffect(() => {
    if (verificationError) {
      dispatch(displayMessage(verificationError, "bg-danger"));
    }
  }, [verificationError]);

  return (
    <Layout
    >
      <section className="mx-3">
        <Row className="mb-3 mt-5">
          <Col
            className="d-flex justify-content-center align-content-center gap-2"
            style={{ minHeight: "50vh" }}
          >
            <Card className="shadow-lg rounded-5 border-0">
              <Card.Body>
                <NonAvailable
                  imageSrc={
                    verificationLoading
                      ? pending
                      : verificationResponse
                      ? verified
                      : notverified
                  }
                  message=""
                />
                <h5
                  className={`text-center text-uppercase fw-bold ${
                    verificationLoading
                      ? "text-warning"
                      : verificationResponse
                      ? "text-success"
                      : "text-danger"
                  }`}
                >
                  {verificationLoading
                    ? "Pending"
                    : verificationResponse
                    ? "Successful"
                    : "Failed"}
                </h5>
                <h5 className="fs-5 text-center text-capitalize">
                  {verificationLoading
                    ? "Verifying payment and creating booking, please wait..."
                    : verificationResponse
                    ? "Payment successful and booking created."
                    : "Payment failed and booking cancled."}
                </h5>
              </Card.Body>

              <Row className="mb-3">
                <Col className="d-flex justify-content-center px-3 align-content-center gap-2">
                  <Button
                    className="rounded w-100 px-4 py-2 bg-success text-light"
                    onClick={handleETicketRediret}
                    disabled={verificationResponse ? false : true}
                  >
                    View E-Ticket
                  </Button>

                  <Button
                    className="rounded w-100  px-4 py-2 btn"
                    onClick={handleEventRediret}
                  >
                    Events
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </section>
    </Layout>
  );
}

export default PaymentCallBack;
