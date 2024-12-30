import React from "react";
import { Col, Row, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.scss";
import "../../styles/main.scss";
import { convertDate } from "../../utils/HelperFunc";


function ActiveEvent({ upcoming, title, path }) {
  return (
    <Row className={`${styles["active-event-row"]} mt-3`}>
      <Col md={12} xs={12}>
        <Card className="border-0 shadow-lg">
          <Card.Header className="bg-light py-3">
            <h6 className="mb-0">{title}</h6>
          </Card.Header>
          <Table
            hover
            responsive="sm"
            className={`${styles[""]} text-nowrap mb-0 table-border-0`}
          >
            <thead className="table-border-0">
              <tr>
                <th scope="col" className="fw-bold">
                  No.
                </th>
                <th scope="col">Event</th>
                <th scope="col">Ticket</th>
                <th scope="col">Category</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {upcoming.map((event, index) => {
                return (
                  <tr key={index}>
                    <td className="fw-bold">{index}.</td>
                    <td className="">
                      <Link to={`/EventDetail/${event.pk}`} className="">
                        {event.name}
                      </Link>
                    </td>
                    <td className="">{event.total_ticket}</td>
                    <td className="">{event.category_detail?.name}</td>
                    <td className="">
                      <div className="float-start me-3">
                        {convertDate(event.event_date)}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Card.Footer className="bg-white text-center">
            <Link to={ path} >
              View All {title}
            </Link>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
}

export default ActiveEvent;
