import React from "react";
import { Card, Row, Col, Image } from "react-bootstrap";
import styles from "./Event.module.scss";
import "../../styles/main.scss";
import male from "../../assets/images/banner-02.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function EventReviews({ reviews }) {
  return (
    <Row>
      <section
        className={`d-flex gap-4 scrollBarRemoval ${styles["reviewRowWrapper"]}`}
      >
        {reviews.map((review, index) => (
          <Col lg={4} key={review.pk}>
            <Card className={`border-0 rounded-4 ${styles[""]}`}>
              <Card.Body
                className={"d-flex justify-content-between align-items-center"}
              >
                <div className="d-flex  gap-2">
                  <Image src={male} roundedCircle width={50} height={50} />
                  <h5>{review.username}</h5>
                </div>
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <FontAwesomeIcon
                      key={index}
                      icon={faStar}
                      className="p-0 m-0 fs-5"
                      color={
                        ratingValue <= review.star_rating
                          ? "#ffc107"
                          : "#e4e5e9"
                      }
                    />
                  );
                })}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </section>
    </Row>
  );
}

export default EventReviews;
