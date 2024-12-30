import React from "react";
import { Nav } from "react-bootstrap";
import styles from "../Navigation.module.scss";
import { NavLink } from "react-router-dom";
import "../../../styles/main.scss";

function Unauthencated() {
  return (
    <Nav className={`${styles["nav"]} flex-column mx-2`}>
      <Nav.Link
        as={NavLink}
        to={"/Home"}
        className={`${styles["nav-item"]} mb-2`}
      >
        <i className="fas fa-home"></i> Home
      </Nav.Link>

      <div className={`${styles["nav-section"]}`}>
        <p className={`${styles["nav-section-title"]}`}>EVENT & MORE</p>

        <Nav.Link
          as={NavLink}
          to={"/Events"}
          className={`${styles["nav-item"]} mb-2`}
        >
          <i className="fas fa-layer-group"></i> Events
        </Nav.Link>

        <Nav.Link
          as={NavLink}
          to={"/UpcomingEvent"}
          className={`${styles["nav-item"]} mb-2`}
        >
          <i className="fas fa-lock"></i> Upcoming
        </Nav.Link>
      </div>
      <Nav.Link
        as={NavLink}
        to={"/SearchEvent"}
        className={`${styles["nav-item"]} mb-2`}
      >
        <i className="fas fa-search"></i> Search
      </Nav.Link>

      <div className={`${styles["nav-section"]}`}>
        <p className={`${styles["nav-section-title"]}`}>ACCOUNT</p>

        <Nav.Link
          as={NavLink}
          to={"/Login"}
          className={`${styles["nav-item"]} mb-2`}
        >
          <i className="fa-solid fa-right-from-bracket"></i> Login
        </Nav.Link>
      </div>

    </Nav>
  );
}

export default Unauthencated;
