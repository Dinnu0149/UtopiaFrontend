import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Col, Row, Button, Spinner } from "react-bootstrap";
import "../../../styles/main.scss";
import Layout from "../../../components/Layouts/Layout";
import PageHeader from "../../../components/Header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../../actions/eventActions";
import NonAvailable from "../../../components/Loading/NonAvailable";
import eventIllustration from "../../../assets/images/illustrations/event.png";
import EventCard from "../../../sub-components/Event/EventCard";
import EventScrollCategory from "../../../sub-components/Event/EventScrollCategory";
import ActionPopUp from "../../../components/Popups/ActionPopUp";
import { updateUserFavoriteItem } from "../../../actions/favoriteActions";
import { displayMessage } from "../../../actions/messageActions";
import debounce from "lodash.debounce";

function Events() {
  const dispatch = useDispatch();
  const { response, loading, error } = useSelector((state) => state.event);

  const { results: events = [], next } = response;

  const [allEvents, setAllEvents] = useState([]);
  const [eventIds, setEventIds] = useState(new Set());
  const [filteredData, setFilteredData] = useState([]);

  const [popupId, setPopupId] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const [popupStyle, setPopupStyle] = useState({});
  const [nonAvailbleMessage, setNonAvailbleMessage] = useState("");

  useEffect(() => {
    dispatch(getEvents());
    setAllEvents([]);
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(displayMessage(error, "bg-danger"));
    }
    if (events.length) {
      const uniqueEvents = events.filter((event) => !eventIds.has(event.pk));

      setAllEvents((prev) => [...prev, ...uniqueEvents]);
      setEventIds((prev) => {
        const newIds = new Set(prev);
        uniqueEvents.forEach((event) => newIds.add(event.pk));
        return newIds;
      });
    }
  }, [error, events]);

  const handleLoadMore = useCallback(() => {
    if (next && !loading) {
      dispatch(getEvents(next));
    }
  }, [dispatch, next, loading]);

  const debouncedLoadMore = useMemo(
    () => debounce(handleLoadMore, 900),
    [handleLoadMore]
  );

  useEffect(() => {
    return () => {
      debouncedLoadMore.cancel();
    };
  }, [debouncedLoadMore]);

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
    <Layout dataLoading={false}>
      <section className="mx-3">
        <PageHeader title="Events" />
        <EventScrollCategory
          events={allEvents}
          onFilterChange={handleFilterChange}
          noUserLocation={handleCheckLocation}
          filterMessage={handleFilterMessage}
        />
        <Row className="mb-3 mt-3">
          {filteredData && filteredData.length > 0 ? (
            filteredData.map((event) => (
              <Col
                lg={4}
                md={6}
                sm={6}
                xs={12}
                className="mb-3 "
                key={event.pk}
              >
                <EventCard
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
            <NonAvailable
              message={nonAvailbleMessage}
              imageSrc={eventIllustration}
            />
          )}
        </Row>

        <Row className="mb-3">
          <Col className="d-flex justify-content-center">
            {!next && !loading ? null : (
              <Button
                className="px-5 rounded-pill text-success fw-bold bg-transparent border border-success-subtle"
                onClick={debouncedLoadMore}
              >
                {loading ? (
                  <Spinner animation="border" size="sm" role="status"></Spinner>
                ) : (
                  "Load More"
                )}
              </Button>
            )}
          </Col>
        </Row>
      </section>
    </Layout>
  );
}

export default Events;
