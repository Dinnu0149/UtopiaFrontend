import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Row,
  Col,
  Container,
  Form,
  Button,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Event.module.scss";
import "../../styles/main.scss";
import { useDispatch, useSelector } from "react-redux";
import { getCategorys } from "../../actions/categoryActions";
import HorizontalItemScrollButton from "../../components/ScrollButton/HorizontalItemScrollButton";
import statesData from "../../data/nigeria_states.json";

function EventScrollCategory({
  events,
  onFilterChange,
  noUserLocation,
  filterMessage,
}) {

  const dispatch = useDispatch();
  const scrollContainerRef = useRef(null);

  const { response } = useSelector((state) => state.category);
  const { user } = useSelector((state) => state.auth);

  const { location = [] } = user || [];
  const { results: categories = [] } = response || [];

  const [showTooltip, setShowTooltip] = useState(false);
  const [categorieIsActive, setCategoryIsActive] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedcity, setSelectedCity] = useState("");
  const [useMyLocation, setUseMyLocation] = useState(location.to_filter);

  useEffect(() => {
    dispatch(getCategorys());
  }, [dispatch]);

  useEffect(() => {
    if (location.to_filter) {
      const stateName = location.state || "";
      const stateCity = location.city || "";

      const state = statesData.find((state) => state.name === stateName);
      setCities(state ? state.cities : []);
      setSelectedState(stateName);
      setSelectedCity(stateCity);
      setUseMyLocation(true);
      !stateName ? noUserLocation(true) : noUserLocation(false);
    } else {
      setUseMyLocation(false);
      noUserLocation(false);

      setSelectedState("");
      setSelectedCity("");
    }
  }, [location.to_filter]);

  useEffect(() => {
    if (user) {
      setShowTooltip(true);
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleToggleMyLocation = () => {
    const stateName = location.state || "";
    const stateCity = location.city || "";

    const state = statesData.find((state) => state.name === stateName);
    setCities(state ? state.cities : []);

    setUseMyLocation((prevUseMyLocation) => {
      const newUseMyLocation = !prevUseMyLocation;
      if (newUseMyLocation) {
        setSelectedState(stateName);
        setSelectedCity(stateCity);

        !stateName ? noUserLocation(true) : noUserLocation(false);
      } else {
        noUserLocation(false);
        setSelectedState("");
        setSelectedCity("");
      }
      return newUseMyLocation;
    });
  };

  const handleToggleCategory = (newItem, key = "pk") => {
    if (categorieIsActive.some((item) => item[key] === newItem[key])) {
      setCategoryIsActive(
        categorieIsActive.filter((item) => item[key] !== newItem[key])
      );
    } else {
      setCategoryIsActive([...categorieIsActive, newItem]);
    }
  };

  const handleStateChange = (e) => {
    const stateName = e.target.value;

    setSelectedState(stateName);
    setSelectedCity("");

    const state = statesData.find((state) => state.name === stateName);
    setCities(state ? state.cities : []);
    setFilteredEvents(events);
  };

  const filterEvents = () => {
    let filtered = events;
    let message;

    if (categorieIsActive.length > 0) {
      filtered = filtered.filter((event) =>
        categorieIsActive.some(
          (category_detail) =>
            category_detail.name === event.category_detail.name
        )
      );

      if (filtered.length === 0) {
        message = "Sorry no event in your selected category";
      }
    }

    if (searchInput) {
      filtered = filtered.filter((event) =>
        event.name.toLowerCase().includes(searchInput.toLowerCase())
      );

      if (filtered.length === 0) {
        message = "Sorry no event for your search input";
      }
    }

    if (selectedcity) {
      filtered = filtered.filter((event) =>
        event.city.toLowerCase().includes(selectedcity.toLowerCase())
      );

      if (filtered.length === 0) {
        message = "Sorry no available event in this city";
      }
    }

    if (selectedState) {
      filtered = filtered.filter((event) =>
        event.state.toLowerCase().includes(selectedState.toLowerCase())
      );

      if (filtered.length < 1) {
        message = "Sorry no available event in this area";
      }
    }

    filterMessage(message);
    setFilteredEvents(filtered);
    onFilterChange(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleAreaChange = (e) => {
    setSelectedCity(e.target.value);
  };

  useEffect(() => {
    filterEvents(); 
  }, [events]);

  useEffect(() => {
    filterEvents();
  }, [
    searchInput,
    categorieIsActive,
    selectedcity,
    selectedState,
    useMyLocation,
  ]);

  return (
    <Row>
      <Col lg={7} className="mb-3 align-content-center">
        <Row>
          <Col sm={12} md={6} className="mb-3">
            <p className="m-0 p-0 mx-2 mb-1 fw-bold">Location</p>
            <Form.Group controlId="formBasicPassword" className="mt-3">
              <div className="input-group">
                <div
                  className={`input-group-append ${styles["locationIcon"]}`}
                  onClick={handleToggleMyLocation}
                >
                  <OverlayTrigger
                    show={showTooltip}
                    overlay={(props) => (
                      <Tooltip {...props}>Use my location</Tooltip>
                    )}
                    placement="bottom"
                  >
                    <Button
                      variant="outline-secondary"
                      className={`toggle-password-btn text-center border px-4 ${
                        useMyLocation ? styles["useMyLocation"] : styles[""]
                      }`}
                      title="User my location"
                    >
                      <span>
                        <i className="fa-solid fa-location-dot fa-bounce m-0 p-0"></i>
                      </span>
                    </Button>
                  </OverlayTrigger>
                </div>
                <Row className="w-75">
                  <Col>
                    <Form.Select
                      name="state"
                      className={`${styles[""]} bg-transparent w-100`}
                      onChange={handleStateChange}
                      value={selectedState}
                    >
                      <option value="" className="fw-bold">
                        State
                      </option>
                      {statesData.map((state) => (
                        <option key={state.name} value={state.name}>
                          {state.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col>
                    <Form.Select
                      name="city"
                      onChange={handleAreaChange}
                      value={selectedcity}
                      className={`${styles[""]} bg-transparent`}
                      disabled={!selectedState}
                      title="Select state"
                    >
                      <option value="" className="fw-bold">
                        {" "}
                        Area
                      </option>
                      {cities.map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>
              </div>
            </Form.Group>
          </Col>
          <Col sm={12} md={6}>
            <p className="m-0 p-0 mx-2 mb-1 fw-bold">Search</p>
            <Form.Group controlId="formBasicPassword" className="mt-3">
              <div className="input-group">
                <Form.Control
                  type="search"
                  placeholder={"Search Events"}
                  value={searchInput}
                  onChange={handleSearchChange}
                  className={`${styles[""]}`}
                />
                <div className={`input-group-append ${styles["searchIcon"]}`}>
                  <Button
                    variant="outline-secondary"
                    className="toggle-password-btn text-center border"
                  >
                    <i className="fa-solid fa-sliders"></i>
                  </Button>
                </div>
              </div>
            </Form.Group>
          </Col>
        </Row>
      </Col>
      <Col lg={5} className="">
        <Container className={styles["scrollCategoryContainer"]}>
          <div className="m-0 d-flex justify-content-between align-items-center">
            <h5>Categories</h5>
            <p className="me-3">
              <Link to={"/categorise"} className="fw-bold">
                See all
              </Link>
            </p>
          </div>
          <Row>
            {categorieIsActive &&
              categorieIsActive.length > 0 &&
              categorieIsActive.map((activeItem) => (
                <Col
                  key={activeItem.pk}
                  md={2}
                  xs={4}
                  sm={2}
                  lg={2}
                  className="mb-1"
                >
                  <p
                    className={`${styles["seletedItems"]} m-0 text-center rounded`}
                  >
                    {activeItem.name}
                  </p>
                </Col>
              ))}
          </Row>
          <div
            className={`py-0 px-0 ${styles["category-scroll-container"]} `}
            ref={scrollContainerRef}
          >
            <Row className={`${styles["flex-nowrap"]} `}>
              {categories.map((category, index) => (
                <Col
                  key={index}
                  xs={2}
                  className={`text-center mx-2 ${styles["flex-nowrap-col"]}`}
                >
                  <Card className="border-0 m-0 p-0 rounded-5 bg-transparent">
                    <Card.Body className="d-flex gap-1 flex-column align-items-center">
                      <div
                        className={`rounded ${styles["category-icon"]} ${
                          categorieIsActive.some(
                            (item) => item["pk"] === category.pk
                          )
                            ? styles["active"]
                            : ""
                        }`}
                        onClick={() =>
                          handleToggleCategory({
                            pk: category.pk,
                            name: category.name,
                          })
                        }
                      >
                        <span>{category.icon}</span>
                      </div>
                      <Card.Text as="p">{category.name}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
          <HorizontalItemScrollButton scrollContainerRef={scrollContainerRef} />
        </Container>
      </Col>
    </Row>
  );
}

export default EventScrollCategory;
