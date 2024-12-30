import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Image,
  ListGroup,
  Tab,
  Spinner,
} from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import styles from "../User/User.module.scss";
import "../../styles/main.scss";
import user from "../../assets/images/icon/user.png";
import profileCover from "../../assets/images/background/profile-cover.jpg";
import UpcomingEventCard from "../Dashboard/UpcomingEventCard";
import ActionPopUp from "../../components/Popups/ActionPopUp";
import { useDispatch, useSelector } from "react-redux";
import { updateUserFavoriteItem } from "../../actions/favoriteActions";
import NonAvailable from "../../components/Loading/NonAvailable";
import { UserAllowed } from "../../routes/PrivateRoute";
import {
  updateOrganizationFollower,
  clearUpdateFollowerResponse,
} from "../../actions/followerActions";
import { displayMessage } from "../../actions/messageActions";
import upcomingIllustration from "../../assets/images/illustrations/upcoming.png";

function OrganizationBackgroundCard({ organization }) {
  const { owner_id } = useParams();
  const dispatch = useDispatch();
  const { editResponse, editLoading, editError } = useSelector(
    (state) => state.follower
  );

  const {
    pk,
    events = [],
    name,
    about,
    owner = [],
    follow = [],
  } = organization;

  const [popupId, setPopupId] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupStyle, setPopupStyle] = useState({});
  const [isFollowing, setIsFollowing] = useState(follow.is_following);
  const [totalFollower, setTotalFollower] = useState(follow.total_follower);

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

  const handleFollowerClick = () => {
    dispatch(updateOrganizationFollower(pk));
  };

  useEffect(() => {
    if (editResponse) {
      setTotalFollower(
        (prevFollower) => prevFollower + (editResponse.added ? 1 : -1)
      );
      setIsFollowing(!isFollowing);
    } else if (editError) {
      dispatch(displayMessage(editError, "bg-danger"));
    }
    dispatch(clearUpdateFollowerResponse());
  }, [editResponse, editError]);

  return (
    <>
      <Card
        className={`mb-1 border-0 shadow ${styles["organization-background-card"]}`}
      >
        <Card.Img
          variant="top"
          src={profileCover}
          height={150}
          alt="Cover Image"
          className={styles["backgroundCover"]}
        />
        <Card.Body className="">
          <div className="d-flex justify-content-center align-items-center gap-2">
            <Row className="text-center">
              <Col lg={12} className="mb-2">
                <Row className="gap-3">
                  <Col>
                    <h5 className="m-0 fw-bold">{follow.total_following}</h5>
                    <p className="m-0 p-0">Following</p>
                  </Col>
                  <Col>
                    <h5 className="m-0 fw-bold">{totalFollower}</h5>
                    <p className="m-0 p-0">Follower</p>
                  </Col>
                </Row>
                <Image
                  src={owner.profile_picture ? owner.profile_picture : user}
                  roundedCircle
                  className={`img-fluid ${styles["profilePicture"]}`}
                />
              </Col>
              <Col>
                <div className="">
                  <h5 className="m-0 p-0 fs-3  text-capitalize">{name}</h5>
                  <p>{owner.email}</p>
                  <p>
                    <span
                      className={`${styles["followButton"]} px-3 `}
                      onClick={handleFollowerClick}
                    >
                      {editLoading ? (
                        <Spinner
                          animation="border"
                          size="sm"
                          role="status"
                        ></Spinner>
                      ) : isFollowing ? (
                        "unfollow"
                      ) : (
                        "follow"
                      )}
                    </span>
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>

      <Card className="border-0 ">
        <Card.Body className={`${styles["organization-nav-tabs-body"]}`}>
          <Tab.Container
            id="list-group-tabs-example"
            className=""
            defaultActiveKey="#link1"
          >
            <Row>
              <Col xl={4} lg={4} md={6} sm={6} xs={12}>
                <ListGroup
                  horizontal
                  className={`${styles["nav-tabs"]} nav-tabs scrollBarRemoval m-0`}
                >
                  <ListGroup.Item action href="#link1" className="text-center ">
                    Events
                  </ListGroup.Item>
                  <ListGroup.Item action href="#link2" className="text-center">
                    About
                  </ListGroup.Item>
                  {UserAllowed(["organizer"]) ? (
                    <ListGroup.Item
                      as={NavLink}
                      to={`/OrganizationEdit/${owner_id}`}
                      className="text-center"
                    >
                      Edit
                    </ListGroup.Item>
                  ) : (
                    ""
                  )}
                </ListGroup>
              </Col>
            </Row>

            <Tab.Content className={`${styles["nav-tabs-content"]} mt-3`}>
              <Tab.Pane eventKey="#link1">
                <Row>
                  {events && events.length > 0 ? (
                    events.map((event) => (
                      <Col
                        lg={3}
                        md={5}
                        sm={5}
                        xs={6}
                        key={event.pk}
                        className="mb-3 "
                      >
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
                      message={"No Event Available"}
                      imageSrc={upcomingIllustration}
                    />
                  )}
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="#link2">
                <h5 className="fw-bold">About Us</h5>
                <Row>
                  <Col>
                    <p>{about}</p>
                  </Col>
                </Row>

                <h5 className="fw-bold">Manager</h5>

                <Row className="mb-3 d-flex justify-content-between align-content-between">
                  <Col
                    md={8}
                    xs={7}
                    className="d-flex gap-1 align-content-center align-items-center"
                  >
                    <Image
                      src={owner.profile_picture ? owner.profile_picture : user}
                      roundedCircle
                      className={`img-fluid ${styles["profilePicture"]}`}
                    />
                    <div className="ms-2">
                      <h5 className="m-0 p-0">{owner.username}</h5>
                      <p className="m-0 p-0">{owner.email}</p>
                    </div>
                  </Col>
                  <Col
                    className={`d-flex gap-3 justify-content-end align-content-end align-items-center ${styles["organizerInfo"]}`}
                  >
                    <a href={`tel:+234${owner.phone}`}>
                      <i className="fa-solid fa-phone fs-4 border rounded-5 p-2"></i>
                    </a>
                    <a href={`mailto:${owner.email}`}>
                      <i className="fa-solid fa-envelope fs-4 border rounded-5 p-2"></i>
                    </a>
                  </Col>
                </Row>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Card.Body>
      </Card>
    </>
  );
}

export default OrganizationBackgroundCard;
