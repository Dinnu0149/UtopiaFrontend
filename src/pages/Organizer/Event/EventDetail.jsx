import React, { useState, useEffect } from "react";
import { Col, Row, Card } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "./Event.module.scss";
import "../../../styles/main.scss";
import Layout from "../../../components/Layouts/Layout";
import PageHeader from "../../../components/Header/PageHeader";
import DetailBackground from "../../../sub-components/Event/DetailBackground";
import DetailInfoCard from "../../../sub-components/Event/DetailInfoCard";
import Countdown from "../../../sub-components/Event/Countdown";
import Ticket from "../../../sub-components/Event/Ticket";
import EventReviews from "../../../sub-components/Event/EventReviews";
import EventSchdule from "../../../sub-components/Event/EventSchdule";
import EventSpeaker from "../../../sub-components/Event/EventSpeaker";
import { useDispatch, useSelector } from "react-redux";
import { getEventDetail } from "../../../actions/eventActions";
import NonAvailable from "../../../components/Loading/NonAvailable";
import ShareEvent from "../../../sub-components/Event/Share/ShareEvent";

function EventDetail() {
  const navigate = useNavigate();
  let { pk } = useParams();
  const dispatch = useDispatch();
  const eventState = useSelector((state) => state.event);

  const { detailLoading, detailError, detailResponse } = eventState;

  const {
    name,
    event_date,
    description,
    location,
    organization = [],
    schedules = [],
    tickets = [],
    speakers = [],
    reviews = [],
    image,
    created_by = [],
    city,
    state,
    total_speaker,
    total_ticket,
    status,
  } = detailResponse;

  useEffect(() => {
    dispatch(getEventDetail(pk));
  }, [dispatch]);

  useEffect(() => {
    if (detailError) {
      navigate(-1);
    }
  }, [detailError]);

  return (
    <Layout dataLoading={detailLoading}>
      <section className="mx-3">
        <PageHeader title="Event Detail" />
        <Row className="mb-4 position-relative">
          <ShareEvent pk={pk} name={name} />
          <DetailBackground image={image} />
        </Row>
        <DetailInfoCard
          title={name}
          location={`${location}, ${city}, ${state}.`}
          date={event_date}
          organizerEmail={created_by.email}
          organizerName={organization.organization_name}
          organizerPk={created_by.id}
          organizerImge={organization.profile_picture}
          totalSpeaker={total_speaker}
          totalTicket={total_ticket}
        />

        <Countdown eventDate={event_date} />

        <hr className={`${styles["pageDivider"]}`} />
        <Row className="mb-5 ">
          <Col lg={4} md={4} sm={12} xs={12} className="mb-3">
            <div className="mb-2 mb-lg-0">
              <h5 className="mb-1 fw-bold">About Event</h5>
              <p className="mb-0">Event info and details </p>
            </div>
          </Col>
          <Col lg={8} md={8} sm={12} xs={12}>
            <Card className={`${styles["aboutInfoCard"]} border-0 shadow`}>
              <Card.Body>
                <Card.Text as={"p"} className="fs-5 text-center">
                  {description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col lg={4} md={4} sm={12} xs={12} className="mb-3">
            <div className="mb-2 mb-lg-0">
              <h5 className="mb-1 fw-bold">Speaker & Performer</h5>
              <p className="mb-0">Speaker & Performer to be present </p>
            </div>
          </Col>
          <Col lg={8} md={8} sm={12} xs={12}>
            {speakers && speakers.length > 0 ? (
              <EventSpeaker speakers={speakers} />
            ) : (
              <NonAvailable message={"No Speasker Available"} />
            )}
          </Col>
        </Row>
        <Row className="mb-5">
          <Col lg={4} md={4} sm={12} xs={12} className="mb-3">
            <div className="mb-2 mb-lg-0">
              <h5 className="mb-1 fw-bold">Schdules</h5>
              <p className="mb-0">Things to be done with time</p>
            </div>
          </Col>
          <Col lg={8} md={8} sm={12} xs={12}>
            {schedules && schedules.length > 0 ? (
              <EventSchdule schedules={schedules} />
            ) : (
              <NonAvailable message={"No Schedules Available"} />
            )}
          </Col>
        </Row>
        {status === "closed" ? (
          <Row className="mb-5">
            <Col lg={4} md={4} sm={12} xs={12} className="mb-3">
              <div className="mb-2 mb-lg-0">
                <h5 className="mb-1 fw-bold">Reviews</h5>
                <p className="mb-0">How user choose to rate it</p>
              </div>
              <Link
                to={`/CreateViewReview/${pk}`}
                className={`d-flex gap-3 mt-2 align-items-center ${styles["detailSeeMore"]}`}
              >
                See More
                <i className={`fa-solid fa-arrow-right-long fs-4`}></i>
              </Link>
            </Col>
            <Col lg={8} md={8} sm={12} xs={12}>
              {reviews && reviews.length > 0 ? (
                <EventReviews reviews={reviews} />
              ) : (
                <NonAvailable message={"No Review Available"} />
              )}
            </Col>
          </Row>
        ) : (
          ""
        )}

        <hr className={` border-3 my-5 ${styles["pageDivider"]}`} />
        {tickets && tickets.length > 0 ? (
          <Ticket tickets={tickets} />
        ) : (
          <NonAvailable message={"No Ticket Available"} />
        )}
      </section>
    </Layout>
  );
}

export default EventDetail;
