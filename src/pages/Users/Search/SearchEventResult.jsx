import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "../../../styles/main.scss";
import Layout from "../../../components/Layouts/Layout";
import PageHeader from "../../../components/Header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { displayMessage } from "../../../actions/messageActions";
import SearchInputNavigate from "../../../sub-components/Search/SearchInputNavigate";
import UpcomingEventCard from "../../../sub-components/Dashboard/UpcomingEventCard";
import NonAvailable from "../../../components/Loading/NonAvailable";
import upcomingIllustration from "../../../assets/images/illustrations/upcoming.png";
import ActionPopUp from "../../../components/Popups/ActionPopUp";
import { updateUserFavoriteItem } from "../../../actions/favoriteActions";
import EventScrollCategory from "../../../sub-components/Event/EventScrollCategory";

function SearchEventResult() {
  const dispatch = useDispatch();
  const { loading, error, response } = useSelector((state) => state.search);

  const { events } = response || [];

  const [filteredData, setFilteredData] = useState([]);
  const [nonAvailbleMessage, setNonAvailbleMessage] = useState("");
  const [popupId, setPopupId] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupStyle, setPopupStyle] = useState({});

  useEffect(() => {    
    if (error) {
      dispatch(displayMessage(error, "bg-danger"));
    } 
  }, [error]);

  const handleActionPop = (e, pk) => {
    const rect = e.target.getBoundingClientRect();
    setPopupStyle({
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
    <Layout dataLoading={loading}>
      <section className="mx-3">
        <PageHeader title="Search" />
        <SearchInputNavigate />
        <EventScrollCategory
          events={events}
          onFilterChange={handleFilterChange}
          noUserLocation={handleCheckLocation}
          filterMessage={handleFilterMessage}
        />
        <Row className="mt-3">
          {filteredData && filteredData.length > 0 ? (
            filteredData.map((event) => (
              <Col lg={3} md={5} sm={5} xs={6} key={event.pk} className="mb-3 ">
                  <ActionPopUp
                    actionFunc={() => handleRemoveFavorite(popupId)}
                    title={"Remove"}
                    cancleFunc={() => setIsPopupVisible(null)}
                    postionStyle={popupStyle}
                    message="Are you sure you want to remove item"
                    isVisible={popupId === event.pk ? isPopupVisible : false}

                  />
                <UpcomingEventCard
                  event={event}
                  truncateTitle={true}
                  handleRemovePop={(e) => handleActionPop(e, event.pk)}
                />
              </Col>
            ))
          ) : (
            <NonAvailable
              message={nonAvailbleMessage}
              imageSrc={upcomingIllustration}
            />
          )}
        </Row>
      </section>
    </Layout>
  );
}

export default SearchEventResult;
