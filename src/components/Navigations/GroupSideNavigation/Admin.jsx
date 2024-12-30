import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import styles from "../Navigation.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import "../../../styles/main.scss";

function Admin() {
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
        to={"/AdminDashboard"}
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
            isActiveParent("/User") ? "active" : ""
          }`}
          onClick={() => toggleDropdown("user")}
        >
          <span>
            <i className="fas fa-user-group"></i>
            <span className="mx-2">User</span>
          </span>
          <i
            className={`fas fa-chevron-down ${
              openDropdown === "user" ? styles["rotate"] : ""
            }`}
          ></i>{" "}
        </Nav.Link>

        {openDropdown === "user" && (
          <Nav className={`${styles["sub-menu"]} flex-column mx-5`}>
            <Nav.Link
              as={NavLink}
              to={"/User"}
              className={`${styles["nav-sub-item"]}`}
            >
              Users
            </Nav.Link>
          </Nav>
        )}

        <Nav.Link
          className={`${
            styles[("nav-item", "dropdown")]
          } d-flex justify-content-between ${
            isActiveParent(
              "/Events",
              "/CreateEvent",
              "/EventDetail",
              "/CreateViewReview",
              "/EventsList",
              "/AdminCategory"
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
              to={"/Events"}
              className={`${styles["nav-sub-item"]}`}
            >
              Events
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to={"/EventsList"}
              className={`${styles["nav-sub-item"]}`}
            >
              All Events
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to={"/AdminCategory"}
              className={`${styles["nav-sub-item"]}`}
            >
              Admin Categories
            </Nav.Link>
          </Nav>
        )}

        <Nav.Link
          className={`${
            styles[("nav-item", "dropdown")]
          } d-flex justify-content-between ${
            isActiveParent("/CreateNotification") ? "active" : ""
          }`}
          onClick={() => toggleDropdown("notification")}
        >
          <span>
            <i className="fa-solid fa-paper-plane"></i>
            <span className="mx-2">Notification</span>
          </span>
          <i
            className={`fas fa-chevron-down ${
              openDropdown === "notification" ? styles["rotate"] : ""
            }`}
          ></i>{" "}
        </Nav.Link>

        {openDropdown === "notification" && (
          <Nav className={`${styles["sub-menu"]} flex-column mx-5`}>
            <Nav.Link
              as={NavLink}
              to={"/CreateNotification"}
              className={`${styles["nav-sub-item"]}`}
            >
              Send Notification
            </Nav.Link>
          </Nav>
        )}

        <Nav.Link
          className={`${
            styles[("nav-item", "dropdown")]
          } d-flex justify-content-between ${
            isActiveParent("/QrScanner") ? "active" : ""
          }`}
          onClick={() => toggleDropdown("qrScanner")}
        >
          <span>
            <i className="fa-solid fa-qrcode"></i>
            <span className="mx-2">Scanner</span>
          </span>
          <i
            className={`fas fa-chevron-down ${
              openDropdown === "qrScanner" ? styles["rotate"] : ""
            }`}
          ></i>{" "}
        </Nav.Link>
        {openDropdown === "qrScanner" && (
          <Nav className={`${styles["sub-menu"]} flex-column mx-5`}>
            <Nav.Link
              as={NavLink}
              to={"/QrScanner"}
              className={`${styles["nav-sub-item"]}`}
            >
              QrScanner
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
            isActiveParent("/Wallet") ? "active" : ""
          }`}
          onClick={() => toggleDropdown("wallet")}
        >
          <span>
            <i className="fas fa-lock"></i>
            <span className="mx-2">Wallet</span>
          </span>
          <i
            className={`fas fa-chevron-down ${
              openDropdown === "authenticwalletation" ? styles["rotate"] : ""
            }`}
          ></i>{" "}
        </Nav.Link>
        {openDropdown === "wallet" && (
          <Nav className={`${styles["sub-menu"]} flex-column mx-5`}>
            <Nav.Link
              as={NavLink}
              to={"/AdminWallet"}
              className={`${styles["nav-sub-item"]}`}
            >
              App Wallet
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to={"/AdminRevenue"}
              className={`${styles["nav-sub-item"]}`}
            >
              Revenues
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to={"/AdminTransactions"}
              className={`${styles["nav-sub-item"]}`}
            >
              Transactions
            </Nav.Link>
          </Nav>
        )}
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

export default Admin;
