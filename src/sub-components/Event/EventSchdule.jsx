import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import styles from "./Event.module.scss";
import "../../styles/main.scss";
import {convertDate, convertTime} from "../../utils/HelperFunc";


function EventSchdule({schedules}) {
  return (
    <>
      {schedules.map((schedule, index) => (
        <Card
          className={`${styles["schduleCard"]} border-0 rounded-4  mb-2`}
          key={schedule.pk}
        >
          <Row>
            <Col
              lg={3}
              sm={3}
              xs={4}
              className={`${styles["schduleCardColDate"]}`}
            >
              <Card.Body className={""}>
                <Card.Title as={"h5"}>{convertTime(schedule.schedule_date)}</Card.Title>
                <Card.Text as={"p"}>{convertDate(schedule.schedule_date)}</Card.Text>
              </Card.Body>
            </Col>
            <Col
              lg={9}
              sm={9}
              xs={8}
              className={`${styles["schduleCardColInfo"]} `}
            >
              <Card.Body>
                <Card.Title as={"h5"}>{schedule.title}</Card.Title>
                <Card.Text as={"p"}> {schedule.description}</Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}
    </>
  );
}

export default EventSchdule;
