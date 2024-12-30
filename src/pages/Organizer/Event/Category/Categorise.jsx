import React, { useState, useEffect } from "react";
import { Col, Row, Card } from "react-bootstrap";
import styles from "../../../Admin/Events/Category/Category.module.scss";
import "../../../../styles/main.scss";
import Layout from "../../../../components/Layouts/Layout";
import PageHeader from "../../../../components/Header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { getCategorys } from "../../../../actions/categoryActions";
import NonAvailable from "../../../../components/Loading/NonAvailable";
import { displayMessage } from "../../../../actions/messageActions";

function Categorise() {
  const dispatch = useDispatch();

  const {
    response: getCategoryResponse,
    error: getCategoryError,
    loading: getCategoryLoading,
  } = useSelector((state) => state.category);

  const { results: categories = [] } = getCategoryResponse;

  useEffect(() => {
    dispatch(getCategorys());
  }, [dispatch]);

  useEffect(() => {
    if (getCategoryError) {
      dispatch(displayMessage(getCategoryError, "bg-danger"));
    }
  }, [getCategoryError]);

  return (
    <Layout
      dataLoading={getCategoryLoading}
    >
      <section className="mx-3">
        <PageHeader title={"Category"} />
        <Row>
            <Col>
            {/* <h5></h5> */}
            </Col>
        </Row>

        <Row>
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <Col xl={1} lg={1} md={2} sm={2} xs={3} key={category.pk}>
                <Card
                  className="border-0 m-0 p-0 rounded-5 bg-transparent"
                >
                  <Card.Body className="d-flex gap-1 flex-column align-items-center">
                    <div className={`${styles["category-icon"]} rounded`}>
                      <span>{category.icon}</span>
                    </div>
                    <Card.Text as="p">{category.name}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <NonAvailable message="Sorry no category available" />
          )}
        </Row>
      </section>
    </Layout>
  );
}

export default Categorise;
