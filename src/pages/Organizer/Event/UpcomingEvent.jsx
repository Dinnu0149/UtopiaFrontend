import React, { useState, useEffect, useRef } from "react";
import { Col, Row} from "react-bootstrap";
import styles from "./Event.module.scss";
import "../../../styles/main.scss";
import Layout from "../../../components/Layouts/Layout";
import PageHeader from "../../../components/Header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../../actions/eventActions";
import NonAvailable from "../../../components/Loading/NonAvailable";
import EventScrollCategory from "../../../sub-components/Event/EventScrollCategory";
import UpcomingEventCard from "../../../sub-components/Dashboard/UpcomingEventCard";
import HorizontalItemScrollButton from "../../../components/ScrollButton/HorizontalItemScrollButton";
import ActionPopUp from "../../../components/Popups/ActionPopUp";
import { updateUserFavoriteItem } from "../../../actions/favoriteActions";
import { displayMessage } from "../../../actions/messageActions";
import upcomingIllustration from "../../../assets/images/illustrations/upcoming.png";
import eventIllustration from "../../../assets/images/illustrations/event.png";

function UpcomingEvent() {
  const dispatch = useDispatch();
  const upcomingScrollContainerRef = useRef(null);

  const { response, loading, error } = useSelector((state) => state.event);

  const { results: events = [] } = response;

  const [filteredData, setFilteredData] = useState([]);
  const [popupId, setPopupId] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);  
  const [popupStyle, setPopupStyle] = useState({});
  const [nonAvailbleMessage, setNonAvailbleMessage] = useState("");

  const handleActionPop = (e, pk) => {
    const rect = e.target.getBoundingClientRect();
    setPopupStyle({
      top: `${rect.top + window.scrollY}px`,
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
    dispatch(getEvents());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(displayMessage(error, "bg-danger"))
    }
  }, [error]);

  const handleFilterChange = (filteredEvent) => {
    setFilteredData(filteredEvent);
  };

  const handleCheckLocation = (not_available) => {
    if (not_available) {
      setTimeout(() => {
        dispatch(
          displayMessage(
            "You don't have a location set in your profile",
            "bg-danger"
          )
        );
      }, 0);
    }
  };

  const handleFilterMessage = (message) => {
    setNonAvailbleMessage(message || "No Event Available");
  };

  return (
    <Layout
      dataLoading={loading}
    >
      <section className="mx-3">
        <PageHeader title="Upcoming Events" />

        <div
          className={`py-0 px-0  ${styles["upcoming-scroll-container"]} `}
          ref={upcomingScrollContainerRef}
        >
          <Row className={`mb-3 mt-3 ${styles["flex-nowrap"]} `}>
            {events && events.length > 0 ? (
              events.map((event) => (
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
                    <ActionPopUp
                      actionFunc={() => handleRemoveFavorite(popupId)}
                      title={"Remove"}
                      cancleFunc={() => setIsPopupVisible(null)}
                      postionStyle={popupStyle}
                      message="Are you sure you want to remove item"
                      isVisible={popupId === event.pk ? isPopupVisible : false}
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
        <Row className="mt-5">
          <Col lg={12}>
            <EventScrollCategory
              events={events}
              onFilterChange={handleFilterChange}
              noUserLocation={handleCheckLocation}
              filterMessage={handleFilterMessage}
            />
          </Col>
          <Col>
            <Row className="mb-3 mt-3">
              {filteredData && filteredData.length > 0 ? (
                filteredData.map((event) => (
                  <Col
                    lg={3}
                    md={5}
                    sm={5}
                    xs={6}
                    className="mb-3 "
                    key={event.pk}
                  >
                    <UpcomingEventCard event={event} truncateTitle={true} 
                    handleRemovePop={(e) => handleActionPop(e, event.pk)}/>
                  </Col>
                ))
              ) : (
                <NonAvailable message={nonAvailbleMessage} imageSrc={eventIllustration}/>
              )}
            </Row>
          </Col>
        </Row>
      </section>
    </Layout>
  );
}

export default UpcomingEvent;
