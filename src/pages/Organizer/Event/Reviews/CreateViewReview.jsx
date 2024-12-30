import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import "../../../../styles/main.scss";
import Layout from "../../../../components/Layouts/Layout";
import PageHeader from "../../../../components/Header/PageHeader";
import AddReview from "../../../../sub-components/Event/AddReview";
import CustomerReviewSummery from "../../../../sub-components/Event/CustomerReviewSummery";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEventReviews } from "../../../../actions/reviewActions";
import NonAvailable from "../../../../components/Loading/NonAvailable";
import { displayMessage } from "../../../../actions/messageActions";

function CreateViewReview() {
  let { pk } = useParams();
  const dispatch = useDispatch();

  const {
    createResponse: reviewCreateResponse,
    createError: reviewCreateError,
    response,
    loading,
  } = useSelector((state) => state.review);

  const { results: reviews } = response || {};

  useEffect(() => {
    dispatch(getEventReviews(pk));
  }, [dispatch, pk, reviewCreateResponse]);

  useEffect(() => {
    if (reviewCreateError || reviewCreateResponse) {
      const messageInfo = reviewCreateResponse
        ? "Review added successfully!"
        : reviewCreateError;
      const messageColor = reviewCreateResponse ? "bg-success" : "bg-danger";
      dispatch(displayMessage(messageInfo, messageColor ));
    }
  }, [reviewCreateError, reviewCreateResponse]);

  return (
    <Layout dataLoading={loading}>
      <section className="mx-3">
        <PageHeader title="Reviews" />
        <Row className="mb-5 ">
          <Col lg={4} md={4} sm={12} xs={12} className="mb-3">
            <div className="mb-2 mb-lg-0">
              <h5 className="mb-1 fw-bold">Add Review </h5>
              <p className="mb-0">Profile configuration settings </p>
            </div>
          </Col>
          <Col lg={6} md={8} sm={12} xs={12}>
            <AddReview />
          </Col>
        </Row>

        <Row className="mb-5 ">
          <Col lg={4} md={4} sm={12} xs={12} className="mb-3">
            <div className="mb-2 mb-lg-0">
              <h5 className="mb-1 fw-bold">Review Summary</h5>
              <p className="mb-0">Profile configuration settings </p>
            </div>
          </Col>
          <Col lg={6} md={8} sm={12} xs={12}>
            {reviews && reviews.length > 0 ? (
              <CustomerReviewSummery reviews={reviews} />
            ) : (
              <NonAvailable message={"No Review Available"} />
            )}
          </Col>
        </Row>
      </section>
    </Layout>
  );
}

export default CreateViewReview;
