import React, { useState, useEffect } from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./User.module.scss";
import "../../styles/main.scss";
import Layout from "../../components/Layouts/Layout";
import PageHeader from "../../components/Header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  OrganizationFollower,
  updateOrganizationFollower,
} from "../../actions/followerActions";
import user from "../../assets/images/icon/user.png";
import NonAvailable from "../../components/Loading/NonAvailable";
import ActionPopUp from "../../components/Popups/ActionPopUp";
import SideDisplay from "../../sub-components/Event/SideDisplay";
import { displayMessage } from "../../actions/messageActions";
import followIllustration from "../../assets/images/illustrations/followers.png";

function Following() {
  const dispatch = useDispatch();

  const {
    response: organizations,
    loading,
    error,
    editError,
    editResponse,
  } = useSelector((state) => state.follower);
  
  const [popupId, setPopupId] = useState(null);
  const [deletePop, setDeletePop] = useState(false);
  const [popupStyle, setPopupStyle] = useState({});

  useEffect(() => {
    dispatch(OrganizationFollower());
  }, [dispatch, editResponse]);

  useEffect(() => {
    if (error) {
      dispatch(displayMessage(error, "bg-danger"));
    }
  }, [error]);

  useEffect(() => {
    if (editError || editResponse) {
      const messageInfo = editResponse
        ? "Organization removed successfully!"
        : editError;
      const messageColor = editResponse ? "bg-success" : "bg-danger";

      dispatch(displayMessage(messageInfo, messageColor));
    }
  }, [editResponse, editError]);

  const handleFollowerDelete = (pk) => {
    dispatch(updateOrganizationFollower(pk));
    setDeletePop(false);
    setPopupId(null)
  };

  const handleActionPop = (e, pk) => {
    const rect = e.target.getBoundingClientRect();
    setPopupStyle({
      right: `${(rect.left + window.scrollX) / 8}px`,
    });
    if (popupId === pk && deletePop) {
      setDeletePop(false);
      setPopupId(null);
    } else {
      setDeletePop(true);
      setPopupId(pk);
    }
  };

  return (
    <Layout
      dataLoading={loading}
    >
      <section className="mx-3">
        <PageHeader title="Following" />
        <Row className={styles["followerContainer"]}>
          <Col lg={9} md={8} sm={12}>
            <Row>
              {organizations && organizations.length > 0 ? (
                organizations.map((organization) => (
                  <Col lg={6} className="mb-2" key={organization.pk}>
                    <Row className="mb-3 d-flex justify-content-between align-content-between">
                      <Col
                        as={NavLink}
                        to={`/OrganizationProfile/${organization.owner?.pk}`}
                        md={8}
                        xs={7}
                        className="d-flex gap-1 align-content-center align-items-center"
                      >
                        <Image src={organization.owner?.profile_picture ? organization.owner?.profile_picture : user} roundedCircle className={styles['organizerImg']}/>
                        <div className="ms-2">
                          <h5 className="m-0 p-0">{organization.name}</h5>
                          <p className="m-0 p-0">{organization.owner?.email}</p>
                        </div>
                      </Col>
                      <Col
                        className={`d-flex gap-3 justify-content-end align-content-end align-items-center ${styles["organizerInfo"]}`}
                      >
                        <Button
                          className="btn_reverse rounded-pill"
                          onClick={(e) => handleActionPop(e, organization.pk)}
                        >
                          {" "}
                          Unfollow
                        </Button>
                          <ActionPopUp
                            actionFunc={() =>
                              handleFollowerDelete(popupId)
                            }
                            title={"Remove"}
                            message="Are you sure you want to unfollow organization"
                            cancleFunc={() => setDeletePop(null)}
                            postionStyle={popupStyle}
                            isVisible={popupId === organization.pk ? deletePop : false}
                          />
                      </Col>
                    </Row>
                  </Col>
                ))
              ) : (
                <NonAvailable message="You are not following any organization yet" imageSrc={followIllustration}/>
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

export default Following;
