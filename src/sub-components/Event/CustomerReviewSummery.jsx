import React, { useState, useEffect } from "react";
import { Row, Col, Card, ProgressBar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../../styles/main.scss";

function CustomerReviewSummery({ reviews }) {
  const [starCount, setStarCount] = useState({
    total: 0,
    fiveStar: 0,
    fourStar: 0,
    threeStar: 0,
    twoStar: 0,
    oneStar: 0,
  });

  useEffect(() => {
    if (reviews && reviews.length) {
      let counts = {
        total: reviews.length,
        fiveStar: 0,
        fourStar: 0,
        threeStar: 0,
        twoStar: 0,
        oneStar: 0,
      };

      reviews.forEach((review) => {
        switch (review.star_rating) {
          case 5:
            counts.fiveStar++;
            break;
          case 4:
            counts.fourStar++;
            break;
          case 3:
            counts.threeStar++;
            break;
          case 2:
            counts.twoStar++;
            break;
          case 1:
            counts.oneStar++;
            break;
          default:
            break;
        }
      });

      setStarCount(counts);
    }
  }, [reviews]);

  const calculatePercentage = (starCount) => {
    if (starCount.total === 0) return 0;
    return ((starCount / starCount.total) * 100).toFixed(1);
  };

  const averageRating = (
    (5 * starCount.fiveStar +
      4 * starCount.fourStar +
      3 * starCount.threeStar +
      2 * starCount.twoStar +
      1 * starCount.oneStar) /
    starCount.total
  ).toFixed(1);

  return (
    <Card className="p-4 shadow border-0 bg-transparent">
      <Card.Body>
        <h5 className="text-center mb-4 fs-4 fw-bold">Customer reviews</h5>
        <div className="text-center mb-3">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <FontAwesomeIcon
                key={index}
                icon={faStar}
                color={ratingValue <= averageRating ? "#ffc107" : "#e4e5e9"}
                size="lg"
                className="mx-1"
              />
            );
          })}
          <h5 className="mt-2">{averageRating} out of 5</h5>
          <p className="text-muted">{starCount.total} customer ratings</p>
        </div>
        {[
          { label: "5 star", value: starCount.fiveStar },
          { label: "4 star", value: starCount.fourStar },
          { label: "3 star", value: starCount.threeStar },
          { label: "2 star", value: starCount.twoStar },
          { label: "1 star", value: starCount.oneStar },
        ].map((item, idx) => (
          <Row className="text-center mt-2" key={idx}>
            <Col xs={3} className="text-left">
              <h5 className="p-0 m-0">{item.label}</h5>
            </Col>
            <Col xs={7}>
              <ProgressBar
                variant="warning"
                now={calculatePercentage(item.value)}
                label=" "
                style={{ height: "10px" }}
                className="rounded"
              />
            </Col>
            <Col xs={2}>
              <h5 className="p-0 m-0">{item.value}</h5>
            </Col>
          </Row>
        ))}
      </Card.Body>
    </Card>
  );
}

export default CustomerReviewSummery;
