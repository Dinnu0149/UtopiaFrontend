import React from "react";
import { Col, Row, Card, Table, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./User.module.scss";
import "../../styles/main.scss";
import { convertDate, formatCurrency, truncateSentence } from "../../utils/HelperFunc";
import NonAvailable from "../../components/Loading/NonAvailable";
import bookingIllustration from "../../assets/images/illustrations/booking.png";

function BookingCard({ bookings }) {
  return (
    <Row className={`${styles["bookingTableRow"]}`}>
      <Col md={12} xs={12}>
        <Card className="border-0 shadow-lg ">
          <Card.Header className="bg-light py-3 ">
            <h6 className="mb-0">Tickets</h6>
          </Card.Header>
          {bookings && bookings.length > 0 ? (
            <Table
              hover
              responsive="sm"
              className={`${styles[""]} text-nowrap mb-0 table-border-0`}
            >
              <thead className="table-border-0">
                <tr>
                  <th scope="col">Event</th>
                  <th scope="col">Ticket</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                  <th scope="col">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => {
                  return (
                    <tr key={booking.pk}>
                      <td className="d-block">
                        <Image src={booking.event?.image} width={60} rounded />
                        <Link
                          to={`/eventdetail/${booking.event.pk}`}
                          className="ms-1"
                        >
                          {truncateSentence(booking.event.event_name, 1)}
                        </Link>
                      </td>
                      <td className="">
                        <Link to={`/ticket/${booking.pk}`} className="p-1 ">
                          {booking.ticket_name}
                        </Link>
                      </td>
                      <td className="">{booking.quantity}</td>
                      <td className="">&#8358;{formatCurrency(Number(booking.total_price), true)}</td>
                      <td className="">
                        <span
                          className={`badge py-2 rounded-pill text-capitalize ${
                            booking.event.status === "open"
                              ? "bg-success"
                              : booking.event.status === "inProgress"
                              ? "bg-warning"
                              : "bg-danger"
                          }`}
                        >
                          {booking.event.status}
                        </span>
                      </td>
                      <td className="">{`${convertDate(
                        booking.booked_at
                      )}`}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <NonAvailable message="Sorry booking not avaliable" imageSrc={bookingIllustration}/>
          )}
          <Card.Footer className="bg-white text-center">
            <Link to={"/booking"} className="link-primary">
              View All Tickets
            </Link>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
}

export default BookingCard;
