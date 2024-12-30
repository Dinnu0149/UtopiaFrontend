import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import "../../../styles/main.scss";
import { useParams } from "react-router-dom";
import Layout from "../../../components/Layouts/Layout";
import PageHeader from "../../../components/Header/PageHeader";
import Ticket from "../../../sub-components/Event/Ticket";
import NonAvailable from "../../../components/Loading/NonAvailable";
import { useDispatch, useSelector } from "react-redux";
import { getEventTickets } from "../../../actions/ticketActions";
import { displayMessage } from "../../../actions/messageActions";

function EventTicket() {
  let { pk } = useParams();
  const dispatch = useDispatch();
  const { response, loading, error } = useSelector((state) => state.ticket);
  const { results: tickets } = response || {};

  useEffect(() => {
    dispatch(getEventTickets(pk));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(displayMessage(error, 'bg-danger'))
    }
  }, [error]);

  return (
    <Layout
      dataLoading={loading}
    >
      <section className="mx-3">
        <PageHeader title="Choose a Ticket" />
        <Row>
          <Col>
            {tickets && tickets.length > 0 ? (
              <Ticket tickets={tickets} />
            ) : (
              <NonAvailable message={"No Ticket Available"} />
            )}
          </Col>
        </Row>
      </section>
    </Layout>
  );
}

export default EventTicket;
