import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "../../styles/main.scss";
import Layout from "../../components/Layouts/Layout";
import PageHeader from "../../components/Header/PageHeader";
import ProfileBackgroundCard from "../../sub-components/User/ProfileBackgroundCard";
import AboutMe from "../../sub-components/User/AboutMe";
import ProfileDisplayCard from "../../sub-components/User/ProfileDisplayCard";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../actions/profileActions";
import TransactionCard from "../../sub-components/Wallet/TransactionCard";
import BookingCard from "../../sub-components/User/BookingCard";
import { displayMessage } from "../../actions/messageActions";

function Profile() {
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.profile);

  const { response, loading, error } = profileState;
  const { username, email, profile_picture, transactions=[], bookings=[] } = response;

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
        <PageHeader title="Profile" />

        <ProfileBackgroundCard username={username} email={email} profile_picture={profile_picture}/>
        <Row className="mb-5">
          <Col lg={6} sm={12} xs={12} md={6} className="mb-3">
            <AboutMe response={response} />
          </Col>
          <Col lg={6} sm={12} xs={12} md={6}>
          <TransactionCard transactions={transactions}/>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col>
            <BookingCard bookings={bookings}/>
          </Col>
        </Row>
      </section>
    </Layout>
  );
}

export default Profile;
