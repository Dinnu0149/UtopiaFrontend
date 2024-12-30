import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import styles from "./Event.module.scss";
import "../../styles/main.scss";

function Countdown({ eventDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(eventDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minutes: Math.floor((difference / 1000 / 60) % 60),
        Seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <Col lg={3} md={3} sm={6} xs={6} className="mb-3" key={interval}>
        <Card
          className={`${styles["infoCards"]} border-0 shadow rounded-4 bg-transparent`}
        >
          <Card.Body className={`${styles["infoCardBody"]} text-center`}>
            <Card.Title as={"h6"}>{timeLeft[interval]}</Card.Title>
            <Card.Title as={"h5"}>{interval}</Card.Title>
          </Card.Body>
        </Card>
      </Col>
    );
  });

  const timerCompleted = () => {
    const timerEnd = [
      {
        Unit: "Day",
      },
      {
        Unit: "Hour",
      },
      {
        Unit: "Minute",
      },
      {
        Unit: "Second",
      },
    ];
    return timerEnd.map((time, index) => (
      <Col lg={3} md={3} sm={6} xs={6} className="mb-3" key={index}>
        <Card
          className={`${styles["infoCards"]} border-0 shadow rounded-4 bg-transparent`}
        >
          <Card.Body className={`${styles["infoCardBody"]} text-center`}>
            <Card.Title as={"h6"}>0</Card.Title>
            <Card.Title as={"h5"}>{time.Unit}</Card.Title>
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  return (
    <Row className={`${styles["infoCountDown"]} mx-5 mb-5`}>
      {timerComponents.length ? timerComponents : timerCompleted()}
    </Row>
  );
}

export default Countdown;
