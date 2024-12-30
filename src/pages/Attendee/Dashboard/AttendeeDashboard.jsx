import React, { useEffect, useState, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Layout from "../../../components/Layouts/Layout";
import styles from "./Dashboard.module.scss";
import "../../../styles/main.scss";
import HeaderCardBg from "../../../sub-components/Dashboard/HeaderCardBg";
import { getDashboardData } from "../../../actions/dashboardActions";
import { useDispatch, useSelector } from "react-redux";
import NonAvailable from "../../../components/Loading/NonAvailable";
import HorizontalItemScrollButton from "../../../components/ScrollButton/HorizontalItemScrollButton";
import UpcomingEventCard from "../../../sub-components/Dashboard/UpcomingEventCard";
import NearbyEventCard from "../../../sub-components/Dashboard/NearbyEventCard";
import ActionPopUp from "../../../components/Popups/ActionPopUp";
import { updateUserFavoriteItem } from "../../../actions/favoriteActions";
import { displayMessage } from "../../../actions/messageActions";
import upcomingIllustration from "../../../assets/images/illustrations/upcoming.png";
import eventIllustration from "../../../assets/images/illustrations/event.png";

function AttendeeDashboard() {
  const dispatch = useDispatch();
  const upcomingScrollContainerRef = useRef(null);
  const exploreScrollContainerRef = useRef(null);

  const {
    response: dashboardResponse,
    loading: dashboardLoading,
    error: dashboardError,
  } = useSelector((state) => state.dashboard);
  const {
    upcoming_event = [],
    general_event = [],
    total_favorite,
    total_upcoming_booking,
    total_booking,
  } = dashboardResponse;

  const [popupId, setPopupId] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupStyle, setPopupStyle] = useState({});

  const handleActionPop = (e, pk) => {
    const rect = e.target.getBoundingClientRect();
    setPopupStyle({
      bottom: `20%`,
      right: `${(rect.left + window.scrollX) / 8}px`,
    });
    if (popupId === pk && isPopupVisible) {
      setIsPopupVisible(false);
      setPopupId(null);
    } else {
      setIsPopupVisible(true);
      setPopupId(pk);
    }
  };

  const handleRemoveFavorite = (event_pk) => {
    const data = {
      event_id: event_pk,
    };
    dispatch(updateUserFavoriteItem(data));
    setPopupId(null);
    setIsPopupVisible(false);
  };

  useEffect(() => {
    dispatch(getDashboardData());
  }, [dispatch]);

  useEffect(() => {
    if (dashboardError) {
      dispatch(displayMessage(dashboardError, "bg-danger"));
    }
  }, [dashboardError]);


  return (
    <Layout
      dataLoading={dashboardLoading}
    >
      <HeaderCardBg
        title={"Attendee"}
        card1={{
          title: "Booked",
          count: total_booking,
          summary: "General",
          icon: "fa-solid fa-book-bookmark",
        }}
        card2={{
          title: "Upcoming",
          count: total_upcoming_booking,
          summary: "This week",
          icon: "fa-solid fa-road-circle-check",
        }}
        card3={{
          title: "Cancled",
          count: 5,
          summary: "5 Cancled",
          icon: "fa-solid fa-power-off",
        }}
        card4={{
          title: "Favorite",
          count: total_favorite,
          summary: `${total_favorite} Favorite`,
          icon: "fa-solid fa-heart fa-beat favoriteIcon ",
        }}
      >
        <Row className="mb-0 mt-4">
          <Col>
            <h5 className="fw-bold">Upcoming Events</h5>
          </Col>
          <Col className="float-end">
            <Link to={"/UpcomingEvent"} className="float-end fw-bold">
              See all
            </Link>
          </Col>
        </Row>

        <div
          className={`py-0 px-0  ${styles["upcoming-scroll-container"]} `}
          ref={upcomingScrollContainerRef}
        >
          <Row className={`mb-3 mt-3 ${styles["flex-nowrap"]} `}>
            {upcoming_event && upcoming_event.length > 0 ? (
              upcoming_event.map((event) => (
                <Col
                  lg={3}
                  md={5}
                  sm={5}
                  xs={9}
                  className={`mb-3 ${styles["flex-nowrap-col"]}`}
                  key={event.pk}
                >
                  <UpcomingEventCard
                    event={event}
                    handleRemovePop={(e) => handleActionPop(e, event.pk)}
                  />
                </Col>
              ))
            ) : (
              <NonAvailable message={"No Upcoming Event Available"} imageSrc={upcomingIllustration}/>
            )}
          </Row>
        </div>
        <HorizontalItemScrollButton
          scrollContainerRef={upcomingScrollContainerRef}
          onAuto={true}
        />

        <Row className="mb-0 mt-4">
          <Col>
            <h5 className="fw-bold">Nearby Events</h5>
          </Col>
          <Col className="float-end">
            <Link to={"/Events"} className="float-end fw-bold">
              See all
            </Link>
          </Col>
        </Row>
        <div
          className={`py-0 px-0 ${styles["upcoming-scroll-container"]} `}
          ref={exploreScrollContainerRef}
        >
          <Row className={`mb-3 mt-3 ${styles["flex-nowrap"]} `}>
            {general_event && general_event.length > 0 ? (
              general_event.map((event, index) => (
                <Col
                  lg={3}
                  md={5}
                  sm={5}
                  xs={9}
                  className={`mb-3 ${styles["flex-nowrap-col"]}`}
                  key={event.pk}
                >
                  <NearbyEventCard
                    event={event}
                    handleRemovePop={(e) => handleActionPop(e, event.pk)}
                  />
                    <ActionPopUp
                      actionFunc={() => handleRemoveFavorite(popupId)}
                      title={"Remove"}
                      cancleFunc={() => setIsPopupVisible(null)}
                      postionStyle={popupStyle}
                      message="Are you sure you want to remove item"
                      isVisible={isPopupVisible}

                    />
                </Col>
              ))
            ) : (
              <NonAvailable message={"No Event Available"} imageSrc={eventIllustration}/>
            )}
          </Row>
        </div>
        <HorizontalItemScrollButton
          scrollContainerRef={exploreScrollContainerRef}
          onAuto={true}
          time={100}
        />

        {/* <ActiveEvent /> */}
      </HeaderCardBg>

      <section className=""></section>
    </Layout>
  );
}

export default AttendeeDashboard;
