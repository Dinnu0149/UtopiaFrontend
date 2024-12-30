import React, { useState, useEffect } from "react";
import { Col, Row, Card } from "react-bootstrap";
import Layout from "../../components/Layouts/Layout";
import PageHeader from "../../components/Header/PageHeader";
import Paginator from "../../components/Paginator/Paginator";
import Filter from "../../components/Filter/Filter";
import NonAvailable from "../../components/Loading/NonAvailable";
import { useDispatch, useSelector } from "react-redux";
import { getBookings, deleteBooking } from "../../actions/bookingActions";
import ActionPopUp from "../../components/Popups/ActionPopUp";
import BookingCard from "../../sub-components/Event/Booking/BookingCard";
import SideDisplay from "../../sub-components/Event/SideDisplay";
import { displayMessage } from "../../actions/messageActions";
import bookingIllustration from "../../assets/images/illustrations/booking.png";

function BookingList() {
  const dispatch = useDispatch();
  const { response, loading, error, deleteError, deleteResponse } = useSelector(
    (state) => state.booking
  );
  const { results = [], count = 0 } = response || {};
  

  const [filteredData, setFilteredData] = useState(results);
  const [currentPage, setCurrentPage] = useState(1);
  const [popupId, setPopupId] = useState(null);
  const [deletePop, setDeletePop] = useState(false);
  const [popupStyle, setPopupStyle] = useState({});
  const itemsPerPage = 9;

  useEffect(() => {
    dispatch(getBookings(currentPage));
  }, [dispatch, currentPage, deleteResponse]);

  useEffect(() => {
    results.length > 0 ? setFilteredData(results) : setFilteredData([]);
  }, [results]);

  useEffect(() => {
    if (error) {
      dispatch(displayMessage(error, "bg-danger"));
    }
  }, [error]);

  useEffect(() => {
    if (deleteError || deleteResponse) {
      const messageInfo = deleteResponse
        ? "Booking deleted successfully!"
        : deleteError;
      const messageColor = deleteResponse ? "bg-success" : "bg-danger";

      dispatch(displayMessage(messageInfo, messageColor));
    }
  }, [deleteResponse, deleteError]);

  const handleActionPop = (e, pk) => {
    const rect = e.target.getBoundingClientRect();
    setPopupStyle({
      top: `${rect.top + window.scrollY}px`,
      left: `${(rect.left + window.scrollX) / 2}px`,
    });
    if (popupId === pk && deletePop) {
      setDeletePop(false);
      setPopupId(null);
    } else {
      setDeletePop(true);
      setPopupId(pk);
    }
  };

  const handleBookingDelete = (pk) => {
    dispatch(deleteBooking(pk));
    setDeletePop(false);
    setPopupId(null)
  };

  const filterOptions = [
    {
      name: "event_name",
      type: "text",
      placeholder: "Search by event name",
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Valid", value: "valid" },
        { label: "Used", value: "used" },
        { label: "Expired", value: "expired" },
        { label: "Upcoming", value: "open" },
        { label: "Active Now", value: "inProgress" },
        { label: "Completed", value: "closed" },
      ],
    },
  ];

  const sortOptions = [
    { label: "Date Ascending", value: "dateAsc" },
    { label: "Date Descending", value: "dateDesc" },
    { label: "Name A-Z", value: "nameAsc" },
    { label: "Name Z-A", value: "nameDesc" },
  ];

  const handleFilterChange = (filterValues) => {
    let filtered = results;

    if (filterValues.event_name) {
      filtered = filtered.filter((item) =>
        item.event.event_name
          .toLowerCase()
          .includes(filterValues.event_name.toLowerCase())
      );
    }

    if (filterValues.status) {
      filtered = filtered.filter(
        (item) => item.event.status === filterValues.status || item.status === filterValues.status      );
    }

    if (filterValues.sort) {
      if (filterValues.sort === "dateAsc") {
        filtered.sort((a, b) => new Date(a.booked_at) - new Date(b.booked_at));
      } else if (filterValues.sort === "dateDesc") {
        filtered.sort((a, b) => new Date(b.booked_at) - new Date(a.booked_at));
      } else if (filterValues.sort === "nameAsc") {
        filtered.sort((a, b) =>
          a.event.event_name.localeCompare(b.event.event_name)
        );
      } else if (filterValues.sort === "nameDesc") {
        filtered.sort((a, b) =>
          b.event.event_name.localeCompare(a.event.event_name)
        );
      }
    }
    setFilteredData(filtered);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Layout
      dataLoading={loading}
    >
      <section className="mx-3">
        <PageHeader title={"Tickets"} />
        <Filter
          filters={filterOptions}
          sorts={sortOptions}
          onFilterChange={handleFilterChange}
        />
        <Row>
          <Col lg={9} md={8} sm={12} className="mt-5">
            <Row>
              {filteredData && filteredData.length > 0 ? (
                filteredData.map((booking) => (
                  <Col
                    lg={4}
                    md={6}
                    sm={6}
                    xs={6}
                    className="mb-3"
                    key={booking.pk}
                  >
                    <BookingCard
                      booking={booking}
                      handleDelete={(e) => handleActionPop(e, booking.pk)}
                    />
                      <ActionPopUp
                        actionFunc={() => handleBookingDelete(booking.pk)}
                        title={"Delete"}
                        message="Are you sure you want to delete booking"
                        cancleFunc={() => setDeletePop(null)}
                        postionStyle={popupStyle}
                        isVisible={popupId === booking.pk ? deletePop : false}
                      />
                  </Col>
                ))
              ) : (
                <NonAvailable message="Sorry booking not avaliable" imageSrc={bookingIllustration}/>
              )}
            </Row>
            <Card.Footer className="bg-transparent text-center mt-4">
              <Paginator
                currentPage={currentPage}
                totalItems={count}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
            </Card.Footer>
          </Col>

          <Col lg={3} md={4} sm={12} className="mt-5">
            <SideDisplay />
          </Col>
        </Row>
      </section>
    </Layout>
  );
}

export default BookingList;
