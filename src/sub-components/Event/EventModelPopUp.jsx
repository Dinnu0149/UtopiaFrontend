import React, { useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import {
  Button,
  Modal,
  ListGroup,
  Tab,
  Row,
  Col,
  Image,
  ModalBody,
} from "react-bootstrap";
import "../../styles/main.scss";
import user from "../../assets/images/icon/user.png";
import styles from "./Event.module.scss";
import {
  truncateSentence,
  convertTime,
  convertDate,
  formatCurrency,
} from "../../utils/HelperFunc";
import ShareEvent from "./Share/ShareEvent";

const ActionButton = (pk, status, deadline, handleTickets) => {
  const today = new Date();
  const deadlineDate = new Date(deadline);

  today.setHours(0, 0, 0, 0);
  deadlineDate.setHours(0, 0, 0, 0);

  if (status === "open" && today < deadlineDate) {
    return (
      <Button variant="rounded px-4" onClick={() => handleTickets(pk)}>
        Book Now
      </Button>
    );
  } else if (status === "open" && today > deadlineDate) {
    return (
      <Button as={NavLink} className="rounded px-4 text-light bg-danger">
        Booking Closed
      </Button>
    );
  } else {
    return (
      <Button
        as={NavLink}
        to={`/CreateViewReview/${pk}`}
        className="rounded px-4 text-light bg-success"
      >
        Reviews
      </Button>
    );
  }
};

function EventModelPopUp({ event, show, handleClose }) {
  const navigate = useNavigate();

  const [shareActions, setShareActions] = useState(false);

  const handleShareActionClick = () => {
    setShareActions(!shareActions);
  };

  const handleTickets = (pk) => {
    navigate(`/EventDetail/${pk}/tickets`);
  };

  return (
    <>
      <Modal
        centered
        show={show}
        size="md"
        onHide={() => handleClose()}
        className={styles["event-modal"]}
      >
        <Modal.Header closeButton>
          <Modal.Title as={"h5"}>Event Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body className="m-0 p-0">
          {shareActions ? <ShareEvent pk={event.pk} name={event.name} /> : ""}
          <div className="position-relative">
            <Image
              src={event.image}
              alt="Event"
              className="w-100 rounded-top"
              height="180px"
            />
            <div
              className={`${styles["like-button"]} position-absolute top-0 end-0 m-2 p-2`}
            >
              <i
                className={`${
                  event.is_favorite ? styles["active"] : ""
                } fa-solid fa-heart mx-1`}
              ></i>
            </div>

            <div
              className={`${shareActions ? styles["open"] : ""} ${
                styles["share-button"]
              }  position-absolute top-50 end-0 m-2 p-2`}
              onClick={handleShareActionClick}
            >
              <i className="fa-solid fa-share-nodes mx-1 fa-shake"></i>
            </div>
            <div
              className={`${styles["category-tag"]} position-absolute top-0 start-0 m-2 rounded-pill`}
            >
              {event.category_detail?.name}
            </div>
          </div>
        </Modal.Body>
        <Modal.Body
          className={`p-0 px-3 border border-2 border-light m-0 ${styles["model-nav-tabs-body"]}`}
        >
          <Tab.Container
            id="list-group-tabs-example"
            className=""
            defaultActiveKey="#link1"
          >
            <Row className={` ${styles["nav-tabs-row"]}`}>
              <Col>
                <ListGroup
                  horizontal
                  className={`${styles["nav-tabs"]} nav-tabs scrollBarRemoval`}
                >
                  <ListGroup.Item action href="#link1" className="text-center">
                    About
                  </ListGroup.Item>
                  <ListGroup.Item action href="#link2" className="text-center">
                    Organizer
                  </ListGroup.Item>
                  <ListGroup.Item action href="#link3" className="text-center">
                    Performers
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>

            <Tab.Content className={`${styles["nav-tabs-content"]} mt-3`}>
              <Tab.Pane eventKey="#link1">
                <h5 className="">{event.name}</h5>
                <Row className="small mb-4">
                  <Col xs="auto" className="">
                    <i className="fa-solid fa-location-dot"></i>
                    <span className="mx-1 ">
                      {event.state}, {event.city}
                    </span>
                  </Col>
                  <Col xs="auto" className="">
                    <i className="fa-solid fa-stopwatch"></i>
                    <span className="mx-1 ">
                      {convertDate(event.event_date)} -{" "}
                      {convertTime(event.event_date)}
                    </span>
                  </Col>
                </Row>

                <h5>About Event</h5>
                <p className="mb-0 pb-0">
                  {truncateSentence(event.description, 16)}...
                  <Button
                    as={Link}
                    to={`/EventDetail/${event.pk}`}
                    className="float-end rounded btn_reverse"
                  >
                    View More
                  </Button>{" "}
                  <br />
                </p>
                <p className="mb-4 mt-1 pt-0 text-danger fw-bold">
                  Deadline - {convertDate(event.purchase_dead_line)}
                </p>

                <h5>Address</h5>
                <Row className="d-flex justify-content-between align-content-between">
                  <Col>
                    <p>{truncateSentence(event.location, 5)}...</p>
                  </Col>
                  <Col>
                    <p className="float-end">
                      <Link>View On Map</Link>
                    </p>
                  </Col>
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="#link2">
                <Row className="mb-3 d-flex justify-content-between align-content-between">
                  <Col
                    md={8}
                    xs={7}
                    className="d-flex gap-1 align-content-center align-items-center"
                  >
                    <Image
                      src={event.organization?.profile_picture}
                      roundedCircle
                      className={`img-fluid ${styles["profileImg"]}`}
                    />
                    <div>
                      <Link to={`/OrganizationProfile/${event.created_by?.id}`}>
                        <h5 className="m-0 p-0">
                          {event.organization?.organization_name}
                        </h5>
                        <p className="m-0 p-0">{event.created_by?.email}</p>
                      </Link>
                    </div>
                  </Col>
                  <Col
                    className={`d-flex gap-3 justify-content-end align-content-end align-items-center ${styles["organizerInfo"]}`}
                  >
                    <a href="tel:+2347041971638">
                      <i className="fa-solid fa-phone fs-4 border rounded-5 p-2"></i>
                    </a>
                    <a href={`mailto:${event.created_by?.email}`}>
                      <i className="fa-solid fa-envelope fs-4 border rounded-5 p-2"></i>
                    </a>
                  </Col>
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="#link3">
                {event.speakers.map((speaker) => {
                  return (
                    <Row key={speaker.pk} className="mb-1">
                      <Col className="d-flex gap-3 align-content-center align-items-center">
                        <Image
                          rounded
                          className={`${styles["profileImg"]} `}
                          variant="border-0 p-0 m-0 mx-2"
                          src={speaker.picture ? speaker.picture : user}
                        />
                        <div>
                          <Link to={"/Profile"}>
                            <p className="m-0 p-0 fw-bold">
                              {speaker.first_name} {speaker.last_name}
                            </p>
                            <p className="m-0 p-0">
                              {speaker.genre || "Music"}
                            </p>
                          </Link>
                        </div>
                      </Col>
                      <Col
                        className={`${styles["reviewEventinfo"]} align-content-center`}
                      >
                        <p as={"p"} className="p-0 my-0">
                          {speaker.bio
                            ? truncateSentence(speaker.bio, 6)
                            : "No boi For this speaker"}
                          .... <Link to={`/EventDetail/${event.pk}`}>More</Link>
                        </p>
                      </Col>
                    </Row>
                  );
                })}
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Modal.Body>

        <ModalBody className={`my-0 py-2 shadow-lg border ${styles["footer"]}`}>
          <Row
            className={`d-flex align-items-center justify-content-between mx- ${styles[""]}`}
          >
            <Col xs="auto" className={`${styles["fee"]}`}>
              &#8358;{formatCurrency(Number(event.display_price), true)}
            </Col>
            <Col xs="auto">
              {ActionButton(
                event.pk,
                event.status,
                event.purchase_dead_line,
                handleTickets
              )}
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
}

export default EventModelPopUp;
