import React from "react";
import { Nav, Card, Image, Button, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./User.module.scss";
import "../../styles/main.scss";
import profileCover from "../../assets/images/background/profile-cover.jpg";
import { UserAllowed } from "../../routes/PrivateRoute";
import userIllustration from "../../assets/images/illustrations/user.png";

function ProfileBackgroundCard({ username, email, profile_picture }) {
  return (
    <Card className={` mb-5 border-0 shadow ${styles["profileNavCard"]}`}>
      <Card.Img
        variant="top"
        src={profileCover}
        height={150}
        alt="Cover Image"
      />
      <Card.Body className="">
        <Row className="d-flex align-items-center ">
          <Col xs={5} >
            <Image
              src={profile_picture ? profile_picture : userIllustration}
              roundedCircle
              className={`img-fluid ${styles["profileNavUserImage"]}`}
            />
          </Col>
          <Col xs={7} >
            <h5 className="m-0 p-0 fs-3 text-capitalize">{username}</h5>
            <p>{email}</p>
          </Col>
        </Row>
        <Button
          as={NavLink}
          to="/EditProfile"
          variant=""
          className="float-end btn_reverse d-none d-sm-block"
        >
          Edit Profile
        </Button>
      </Card.Body>

      <Nav
        variant="tabs"
        className={`${styles["profileNavBottom"]} px-4 border-0 border-top profileNavBottom`}
      >
        <Nav.Item className={`${styles["profileNavBottomItem"]}`}>
          <Nav.Link as={NavLink} to="/Profile">
            Overview
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className={`${styles["profileNavBottomItem"]}`}>
          <Nav.Link as={NavLink} to="/Following">
            Following
          </Nav.Link>
        </Nav.Item>
        {UserAllowed(["organizer"]) ? (
          <Nav.Item className={`${styles["profileNavBottomItem"]}`}>
            <Nav.Link as={NavLink} to="/Wallet">
              My Wallet
            </Nav.Link>
          </Nav.Item>
        ) : UserAllowed(["admin"]) ? (
          <Nav.Item className={`${styles["profileNavBottomItem"]}`}>
            <Nav.Link as={NavLink} to="/AdminWallet">
              App Wallet
            </Nav.Link>
          </Nav.Item>
        ) : (
          ""
        )}
      </Nav>
    </Card>
  );
}

export default ProfileBackgroundCard;
