import React from 'react'
import { Nav } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import styles from "./Event.module.scss";
import "../../styles/main.scss"

function EditEventNavigation() {
  let { pk } = useParams();

  return (
    <Nav
        variant="tabs"
        className={`${styles["profileNavBottom"]} px-4 border-0 border-bottom mt-1 profileNavBottom`}
      >
        <Nav.Item className={`${styles["profileNavBottomItem"]}`}>
          <Nav.Link
            as={NavLink}
            to={`/organizer/event/info/edit/${pk}`}>
            Event Info
          </Nav.Link>
        </Nav.Item>

        <Nav.Item className={`${styles["profileNavBottomItem"]}`}>
          <Nav.Link
            as={NavLink}
            to={`/organizer/event/schdule/edit/${pk}`}>
            Schdule
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className={`${styles["profileNavBottomItem"]}`}>
          <Nav.Link
            as={NavLink}
            to={`/organizer/event/speaker/edit/${pk}`}>
            Speaker
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className={`${styles["profileNavBottomItem"]}`}>
          <Nav.Link
            as={NavLink}
            to={`/organizer/event/ticket/edit/${pk}`}>
            Ticket
          </Nav.Link>
        </Nav.Item>
      </Nav>
  )
}

export default EditEventNavigation