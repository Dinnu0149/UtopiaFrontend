import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import "../../styles/main.scss";
import Layout from "../../components/Layouts/Layout";
import PageHeader from "../../components/Header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserFavoriteItems,
  updateUserFavoriteItem,
} from "../../actions/favoriteActions";
import EventScrollCategory from "../../sub-components/Event/EventScrollCategory";
import NonAvailable from "../../components/Loading/NonAvailable";
import FavoriteCard from "../../sub-components/User/FavoriteCard";
import ActionPopUp from "../../components/Popups/ActionPopUp";
import SideDisplay from "../../sub-components/Event/SideDisplay";
import { displayMessage } from "../../actions/messageActions";
import favoriteIllustration from "../../assets/images/illustrations/favorites.png";

function FavoriteEvent() {
  const dispatch = useDispatch();
  const { response, loading, error, updateResponse } = useSelector(
    (state) => state.favorite
  );

  const { events = [] } = response;
  const { message: updateMessage } = updateResponse;

  const [filteredData, setFilteredData] = useState([]);
  const [popupId, setPopupId] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupStyle, setPopupStyle] = useState({});
  const [nonAvailbleMessage, setNonAvailbleMessage] = useState("");

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

  useEffect(() => {
    dispatch(getUserFavoriteItems());
  }, [dispatch, updateMessage]);

  useEffect(() => {
    if (error) {
      dispatch(displayMessage(error, "bg-danger"));
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
        <PageHeader title="Favorite" />
        <EventScrollCategory
          events={events}
          onFilterChange={handleFilterChange}
          noUserLocation={handleCheckLocation}
          filterMessage={handleFilterMessage}
        />
        <Row className="mb-3 mt-3">
          <Col lg={9} md={8} sm={12}>
            <Row>
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
                    <FavoriteCard
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
                <NonAvailable message={nonAvailbleMessage} imageSrc={favoriteIllustration}/>
              )}
            </Row>
          </Col>

          <Col lg={3} md={4} sm={12}>
            <SideDisplay />
          </Col>
        </Row>
      </section>
    </Layout>
  );
}

export default FavoriteEvent;
