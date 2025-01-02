import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import "../../styles/main.scss";
import NonAvailable from "../../components/Loading/NonAvailable";
import { convertDate } from "../../utils/HelperFunc";


function EventCreated({ events }) {
  return (
    <Card className="border-0 shadow cardException">
      <Card.Body>
        <Card.Title as="h6">Event Contributed</Card.Title>
        {events && events.length > 0 ? (
          events.map((event, index) => {
            return (
              <div
                className="d-flex justify-content-between align-items-center mb-4"
                key={event.pk}
              >
                <div className="d-flex align-items-center">
                  <div className="ms-3 ">
                      <Link to={`/eventdetail/${event.pk}`} className="">
                        {event.name}
                      </Link>
                    <p className="mb-0">{convertDate(event.event_date)}</p>
                  </div>
                </div>

                <span className="badge bg-success w-25 p-2">
                  {event.status}
                </span>
              </div>
            );
          })
        ) : (
          <NonAvailable message="Sorry transaction not avaliable" />
        )}
      </Card.Body>
      <Card.Footer className="bg-white text-center">
        <Link to={"/organizer/event"} className="link-primary">
          View My Events
        </Link>
      </Card.Footer>
    </Card>
  );
}

export default EventCreated;
