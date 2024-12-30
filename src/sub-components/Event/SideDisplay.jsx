import React, { useEffect, createRef } from "react";
import { Row, Col, Carousel, Image } from "react-bootstrap";
import styles from "./Event.module.scss";
import "../../styles/main.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import user from "../../assets/images/icon/user.png";
import { getSideDisplay } from "../../actions/sideDisplayAction";
import NonAvailable from "../../components/Loading/NonAvailable";
import { convertDate } from "../../utils/HelperFunc";

function SideDisplay() {
  const dispatch = useDispatch();
  const nonAvailableRef = createRef();

  const { response} = useSelector(
    (state) => state.sideDisplay
  );

  const { top_organizations = [], hot_events } = response;  

  useEffect(() => {
    dispatch(getSideDisplay());
  }, [dispatch]);

  return (
    <Row
      className={`h-100 rounded-5 shadow-lg ${styles["sideDisplayContainer"]}`}
    >
      <Col lg={12} className={styles["imgCol"]}>
        <h5 className={`ms-2 mt-3 mb-3 fs-5 fw-bold ${styles["header"]}`}>
          Hot Events For You
        </h5>
        <Carousel controls={true} indicators={false}>
          {hot_events && hot_events.length > 0 ? (
            hot_events.map((event) => (
              <Carousel.Item key={event.pk}>
                <Link to={`/EventDetail/${event.pk}`}>
                  <Image
                    src={event.image}
                    alt="Event-img"
                    className={`img-fluid rounded-4 ${styles["eventImage"]}`}
                  />
                </Link>

                <Carousel.Caption
                  className={`${styles["displayCaption"]} rounded-4 py-2`}
                >
                  <h5 className="text-light fs-5 m-0 p-0">{event.name}</h5>
                  <div className="d-flex gap-3 align-content-center justify-content-center m-0 p-0">
                    <p className="text-light fs-6 m-0 p-0">
                      {event.city}
                    </p>{" "}
                    |
                    <p className="text-light fs-6 m-0 p-0">
                      {convertDate(event.event_date)}
                    </p>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
            ))
          ) : (
            <NonAvailable ref={nonAvailableRef} message="No Hot Event" />
          )}
        </Carousel>

        <h5 className={`ms-2 mt-5 mb-3 fs-5 fw-bold  ${styles["header"]}`}>
          Top Followed Organizations
        </h5>
        <Row className=" mb-3 mt-3 d-flex justify-content-between align-content-between">
          {top_organizations && top_organizations.length > 0 ? (
            top_organizations.map((organization) => (
              <Col
                key={organization.pk}
                as={NavLink}
                to={`/OrganizationProfile/${organization.owner_id?.id}`}
                lg={12}
                className="d-flex gap-1 align-content-center align-items-center mb-2"
              >
                <Image src={organization.owner_id?.profile_picture ? organization.owner_id?.profile_picture : user} roundedCircle className={styles["organizerImg"]}/>
                <div className="ms-2 w-100">
                  <div className="d-flex justify-content-between align-content-center">
                    <h5 className="m-0 p-0">{organization.name}</h5>
                    <h5 className="m-0 p-0 fw-bold ">
                      {organization.total_follower}
                    </h5>
                  </div>
                </div>
              </Col>
            ))
          ) : (
            <NonAvailable ref={nonAvailableRef} message="No Top organization" />
          )}
        </Row>
      </Col>
    </Row>
  );
}

export default SideDisplay;
