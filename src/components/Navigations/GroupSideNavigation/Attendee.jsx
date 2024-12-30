import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import styles from "../Navigation.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import "../../../styles/main.scss";

function Attendee() {
  const location = useLocation();

  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const isActiveParent = (...paths) => {
    const locationPath = location.pathname;
    return paths.some((path) => locationPath.includes(path));
  };

  return (
    <Nav className={`${styles["nav"]} flex-column mx-2`}>
      <Nav.Link
        as={NavLink}
        to={"/AttendeeDashboard"}
        className={`${styles["nav-item"]} mb-2`}
      >
        <i className="fas fa-home"></i> Dashboard
      </Nav.Link>
      <div className={`${styles["nav-section"]}`}>
        <p className={`${styles["nav-section-title"]}`}>LAYOUTS & PAGES</p>

        <Nav.Link
          className={`${
            styles[("nav-item", "dropdown")]
          } d-flex justify-content-between ${
            isActiveParent(
              "/Events",
              "/CreateEvent",
              "/EventDetail",
              "/CreateViewReview",
              "/UpcomingEvent"
            )
              ? "active"
              : ""
          }`}
          onClick={() => toggleDropdown("event")}
        >
          <span>
            <i className="fas fa-layer-group"></i>
            <span className="mx-2">Event</span>
          </span>
          <i
            className={`fas fa-chevron-down ${
              openDropdown === "event" ? styles["rotate"] : ""
            }`}
          ></i>{" "}
        </Nav.Link>

        {openDropdown === "event" && (
          <Nav className={`${styles["sub-menu"]} flex-column mx-5`}>
            <Nav.Link
              as={NavLink}
              to={"/UpcomingEvent"}
              className={`${styles["nav-sub-item"]}`}
            >
              Upcoming
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to={"/Events"}
              className={`${styles["nav-sub-item"]}`}
            >
              Events
            </Nav.Link>
          </Nav>
        )}

        <Nav.Link
          className={`${
            styles[("nav-item", "dropdown")]
          } d-flex justify-content-between ${
            isActiveParent("/Wallet") ? "active" : ""
          }`}
          onClick={() => toggleDropdown("booking")}
        >
          <span>
            <i className="fas fa-lock"></i>
            <span className="mx-2">Bookings</span>
          </span>
          <i
            className={`fas fa-chevron-down ${
              openDropdown === "booking" ? styles["rotate"] : ""
            }`}
          ></i>{" "}
        </Nav.Link>
        {openDropdown === "booking" && (
          <Nav className={`${styles["sub-menu"]} flex-column mx-5`}>
            <Nav.Link
              as={NavLink}
              to={"/Booking"}
              className={`${styles["nav-sub-item"]}`}
            >
              My bookings
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to={"/Transactions"}
              className={`${styles["nav-sub-item"]}`}
            >
              Transactions
            </Nav.Link>
          </Nav>
        )}
      </div>

      <div className={`${styles["nav-section"]}`}>
        <p className={`${styles["nav-section-title"]}`}>Account</p>
        <Nav.Link
          className={`${
            styles[("nav-item", "dropdown")]
          } d-flex justify-content-between ${
            isActiveParent("/Profile", "/EditProfile") ? "active" : ""
          }`}
          onClick={() => toggleDropdown("components")}
        >
          <span>
            <i className="fas fa-tv"></i>
            <span className="mx-2">Account</span>
          </span>
          <i
            className={`fas fa-chevron-down ${
              openDropdown === "components" ? styles["rotate"] : ""
            }`}
          ></i>{" "}
        </Nav.Link>
        {openDropdown === "components" && (
          <Nav className={`${styles["sub-menu"]} flex-column mx-5`}>
            <Nav.Link
              as={NavLink}
              to={"/Profile"}
              className={`${styles["nav-sub-item"]}`}
            >
              Profile
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to={"/EditProfile"}
              className={`${styles["nav-sub-item"]}`}
            >
              Edit Profile
            </Nav.Link>
          </Nav>
        )}
      </div>
      <Nav.Link
        as={NavLink}
        to={"/SearchEvent"}
        className={`${styles["nav-item"]} mb-2`}
      >
        <i className="fas fa-search"></i> Search
      </Nav.Link>
    </Nav>
  );
}

export default Attendee;
