import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Layout from "../../../components/Layouts/Layout";
import PageHeader from "../../../components/Header/PageHeader";
import ProfileBackgroundCard from "../../../sub-components/User/ProfileBackgroundCard";
import "../../../styles/main.scss";
import CreditCard from "../../../sub-components/Wallet/CreditCard";
import RevenueCard from "../../../sub-components/Wallet/RevenueCard";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../../actions/profileActions";
import EventCreated from "../../../sub-components/User/EventCreated";
import { displayMessage } from "../../../actions/messageActions";

function Wallet() {
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.profile);

  const { response, loading, error } = profileState;
  const { username, profile_picture, email, wallet=[], event_revenues=[], events=[] } = response || [];

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(displayMessage(error, "bg-danger"));
    }
  }, [error]);

  return (
    <Layout
      dataLoading={loading}
    >
      <section className="mx-3">
        <PageHeader title="Wallet" />
        <ProfileBackgroundCard profile_picture={profile_picture} username={username} email={email} />
        <Row className="mb-4">
          <Col lg={6} sm={12} xs={12} md={6} className="mb-3">
            <CreditCard wallet={wallet}/>
          </Col>

          <Col>
            <EventCreated events={events}/>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <RevenueCard revenues={event_revenues} redirectPath={'Revenue'}/>
          </Col>
        </Row>
      </section>
    </Layout>
  );
}

export default Wallet;
