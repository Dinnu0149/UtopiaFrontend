import React from "react";
import { Image } from "react-bootstrap";
import styles from "./Navigation.module.scss";
import "../../styles/main.scss";
import logo from "../../assets/images/Logo/appLogo.png";
import Organizer from "./GroupSideNavigation/Organizer";
import Admin from "./GroupSideNavigation/Admin";
import Attendee from "./GroupSideNavigation/Attendee";
import Unauthencated from "./GroupSideNavigation/Unauthencated";
import { Link } from "react-router-dom";

function SideNavigation({ isOpen, usergroup, user_id }) {
  const groupSideBar = () => {
    const groups = usergroup ? usergroup : [];

    if (groups.includes("admin")) return <Admin />;
    if (groups.includes("organizer")) return <Organizer user_id={user_id} />;
    if (groups.includes("attendee")) return <Attendee />;
    if (!groups.includes("attendee", "organizer", "admin"))
      return <Unauthencated />;
  };

  return (
    <div
      className={`${styles["sidebar"]} ${
        isOpen ? styles["open"] : styles["closed"]
      } sideNavItems`}
    >
      <Link to={"/home"}>
        <div
          className={`${styles["sidebar-logo"]} text-center align-items-center mt-0 w-100`}
        >
          <Image src={logo} width={70} className="m-2" alt="EthiopiaLogo" />

          <h4 className={`${styles["logoText"]} text-light`}>Utopia</h4>
        </div>
      </Link>

      {groupSideBar()}
    </div>
  );
}

export default SideNavigation;
