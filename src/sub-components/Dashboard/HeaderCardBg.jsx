import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./Dashboard.module.scss";
import "../../styles/main.scss";
import { UserAllowed } from "../../routes/PrivateRoute";

function HeaderCardBg({
  children,
  title,
  card1 = {
    title: "Me",
    count: 10,
    summary: "2 complected",
    icon: "fa-solid fa-book-bookmark",
  },
  card2 = {
    title: "Me",
    count: 10,
    summary: "2 complected",
    icon: "fa-solid fa-book-bookmark",
  },
  card3 = {
    title: "Me",
    count: 10,
    summary: "2 complected",
    icon: "fa-solid fa-book-bookmark",
  },
  card4 = {
    title: "Me",
    count: 10,
    summary: "2 complected",
    icon: "fa-solid fa-book-bookmark",
  },
}) {
  return (
    <>
      <Row className={`${styles["dashboard-headerBg"]} mx-1 `}>
        <Col lg={12} md={12} sm={12} xs={12} className="mb-3 bg">
          <Row className={`${styles["dashboard-card-row"]} `}>
            <div
              className={`${styles["dashboard-header-Intro"]} d-flex justify-content-between mb-5`}
            >
              <h5 className={`fw-bold`}>{title}</h5>
              {UserAllowed(["organizer"]) ? (
                <Button
                  as={NavLink}
                  to={"/organizer/event/create"}
                  className="btn_reverse bg-light text-primary px-5 d-none d-sm-block"
                >
                  Create Event
                </Button>
              ) : null}
            </div>
            <Col lg={3} md={6} sm={6} xs={6} className="mb-2">
              <Card
                className={`${styles["dashboard-header-card"]} border-0 shadow-lg`}
              >
                <Card.Body>
                  <Row>
                    <Col xs={9}>
                      <h5>{card1.title}</h5>
                    </Col>
                    <Col xs={3}>
                      <i
                        className={` ${card1.icon} fs-6 border p-2 rounded float-end`}
                      ></i>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h6 className="fw-bold fs-3">{card1.count}</h6>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="p-0 m-0">{card1.summary}</p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={3} md={6} sm={6} xs={6}>
              <Card
                className={`${styles["dashboard-header-card"]} border-0 shadow-lg`}
              >
                <Card.Body>
                  <Row>
                    <Col xs={9}>
                      <h5>{card2.title}</h5>
                    </Col>
                    <Col xs={3}>
                      <i
                        className={` ${card2.icon} fs-6 border p-2 rounded float-end`}
                      ></i>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h6 className="fw-bold fs-3">{card2.count}</h6>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="p-0 m-0">{card2.summary}</p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={3} md={6} sm={6} xs={6}>
              <Card
                className={`${styles["dashboard-header-card"]} border-0 shadow-lg`}
              >
                <Card.Body>
                  <Row>
                    <Col xs={9}>
                      <h5>{card3.title}</h5>
                    </Col>
                    <Col xs={3}>
                      <i
                        className={` ${card3.icon} fs-6 border p-2 rounded float-end`}
                      ></i>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h6 className="fw-bold fs-3">{card3.count}</h6>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="p-0 m-0">{card3.summary}</p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={3} md={6} sm={6} xs={6}>
              <Card
                className={`${styles["dashboard-header-card"]} border-0 shadow-lg`}
              >
                <Card.Body>
                  <Row>
                    <Col xs={9}>
                      <h5>{card4.title}</h5>
                    </Col>
                    <Col xs={3}>
                      <i
                        className={` ${card4.icon} fs-6 border p-2 rounded float-end`}
                      ></i>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h6 className="fw-bold fs-3">{card4.count}</h6>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="p-0 m-0">{card4.summary}</p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>

        <Col lg={12} md={12} sm={12} xs={12} className="mb-3">
          {children}
        </Col>
      </Row>
    </>
  );
}

export default HeaderCardBg;
