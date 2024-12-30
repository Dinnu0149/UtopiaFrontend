import React, { useState, useEffect } from "react";
import { Col, Row, Card, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Event.module.scss";
import "../../../styles/main.scss";
import Layout from "../../../components/Layouts/Layout";
import PageHeader from "../../../components/Header/PageHeader";
import Paginator from "../../../components/Paginator/Paginator";
import { useDispatch, useSelector } from "react-redux";
import {
  getEvents,
  eventActivation,
} from "../../../actions/userAdminEventActions";
import { convertDate } from "../../../utils/HelperFunc";
import NonAvailable from "../../../components/Loading/NonAvailable";
import eventIllustration from "../../../assets/images/illustrations/event.png";
import Filter from "../../../components/Filter/Filter";
import MenuPopUp from "../../../components/Popups/MenuPopUp";
import ActionPopUp from "../../../components/Popups/ActionPopUp";
import { clearEventResponse, deleteEvent } from "../../../actions/eventActions";
import { displayMessage } from "../../../actions/messageActions";

const isActivated = (event) => {
  return (
    <td className={event.is_public ? "text-success" : "text-danger"}>
      {event.is_public ? "Activated" : "Deactivated"}
    </td>
  );
};

const status = (event) => {
  return (
    <span
      className={
        event.status === "open"
          ? "text-primary"
          : event.status === "closed"
          ? "text-success"
          : "text-warning badge"
      }
    >
      {event.status}
    </span>
  );
};

const approval = (event) => {
  return (
    <span className={event.is_approve ? "text-success" : "text-danger"}>
      {event.is_approve ? "Approved" : "Dispproved"}
    </span>
  );
};

function MyEvents() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { response, loading, error, activationError, activationResponse } =
    useSelector((state) => state.userAdminEvent);

  const { deleteResponse, deleteError } = useSelector((state) => state.event);

  const { results = [], count = 0 } = response || [];

  const [filteredData, setFilteredData] = useState(results);
  const [currentPage, setCurrentPage] = useState(1);
  const [popupId, setPopupId] = useState(null);
  const [deletePop, setDeletePop] = useState(false);
  const [activationPop, setActivationPop] = useState(false);
  const [popupStyle, setPopupStyle] = useState({});
  const [menuPopup, setMenuPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({});
  const itemsPerPage = 20;

  useEffect(() => {
    dispatch(getEvents(currentPage));
  }, [dispatch, currentPage, deleteResponse, activationResponse]);

  useEffect(() => {
    if (results.length > 0) {
      setFilteredData(results);
    }
  }, [results]);

  useEffect(() => {
    if (error) {
      dispatch(displayMessage(error, 'bg-danger'))
    }
  }, [error]);

  useEffect(() => {
    if (deleteError || deleteResponse) {
      const messageInfo = deleteResponse
        ? "Event deleted successfully!"
        : deleteError;
      const messageColor = deleteResponse ? "bg-success" : "bg-danger";

      dispatch(displayMessage(messageInfo, messageColor))
      dispatch(clearEventResponse());
      setMenuPopup(null);
    }
  }, [deleteResponse, deleteError]);

  useEffect(() => {
    if (activationError || activationResponse) {
      const messageInfo = activationResponse
        ? "Event activation updated successfully!"
        : activationError;
      const messageColor = activationResponse ? "bg-success" : "bg-danger";

      dispatch(displayMessage(messageInfo, messageColor))
      setMenuPopup(null);
    }
  }, [activationResponse, activationError]);

  const handleEventEdit = (pk) => {
    navigate(`/EventInfoEdit/${pk}`);
  };

  const handleEventDelete = (pk) => {
    dispatch(deleteEvent(pk));
    setDeletePop(false);
    setPopupId(null)
  };

  const handleEventActivation = (pk) => {
    dispatch(eventActivation(pk));
    setActivationPop(false);
    setPopupId(null)
  };

  const handleDelectPop = (e, pk) => {
    const rect = e.target.getBoundingClientRect();
    setPopupStyle({
      right: `${(rect.left + window.scrollX) / 8}px`,
    });
    if (popupId === pk && deletePop) {
      setDeletePop(false);
      setPopupId(null);
    } else {
      setDeletePop(true);
      setPopupId(pk);
    }
  };

  const handleActivationPop = (e, pk) => {
    const rect = e.target.getBoundingClientRect();
    setPopupStyle({
      right: `${(rect.left + window.scrollX) / 8}px`,
    });
    if (popupId === pk && activationPop) {
      setActivationPop(false);
      setPopupId(null);
    } else {
      setActivationPop(true);
      setPopupId(pk);
    }
  };

  const handleMenuPop = (e, pk) => {
    const rect = e.target.getBoundingClientRect();
    setPopupPosition({
      right: `${(rect.left + window.scrollX) / 5}px`,
    });
    setMenuPopup(menuPopup === pk ? null : pk);
    setDeletePop(null);
  };

  const handleMenuSelect = (option, pk, e) => {
    switch (option.label) {
      case "Edit":
        return handleEventEdit(pk);
      case "Activation":
        return handleActivationPop(e, pk);
      case "Delete":
        return handleDelectPop(e, pk);
      case "Close":
        return setMenuPopup(null);
      default:
        return option;
    }
  };

  const menuOptions = (status) => {
    const options = [
      { label: "Delete", icon: "fa-regular fa-trash-can" },
      { label: "Close", icon: "fa-solid fa-ban" },
    ];

    if (status === "open") {
      options.unshift(
        { label: "Edit", icon: "fa-solid fa-pen-to-square" },
        { label: "Activation", icon: "fa-solid fa-chart-line" }
      );
    }

    return options;
  };

  const filterOptions = [
    {
      name: "name",
      type: "text",
      placeholder: "Search by event name",
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Open", value: "open" },
        { label: "InProgress", value: "inProgress" },
        { label: "Closed", value: "closed" },
        { label: "Approved", value: "approved" },
        { label: "Dispproved", value: "disapproved" },
        { label: "Activated", value: true },
        { label: "Deactivated", value: false },
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

    if (filterValues.name) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(filterValues.name.toLowerCase())
      );
    }

    if (filterValues.status) {
      filtered = filtered.filter(
        (item) =>
          item.status === filterValues.status ||
          String(item.is_public) === filterValues.status ||
          String(item.is_approve ? "approved" : "disapproved") ===
            filterValues.status
      );
    }

    if (filterValues.sort) {
      if (filterValues.sort === "dateAsc") {
        filtered.sort(
          (a, b) => new Date(a.event_date) - new Date(b.event_date)
        );
      } else if (filterValues.sort === "dateDesc") {
        filtered.sort(
          (a, b) => new Date(b.event_date) - new Date(a.event_date)
        );
      } else if (filterValues.sort === "nameAsc") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      } else if (filterValues.sort === "nameDesc") {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
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
        <PageHeader title={"My Events"} />
        <Filter
          filters={filterOptions}
          sorts={sortOptions}
          onFilterChange={handleFilterChange}
        />
        <Row className={`${styles[""]}`}>
          <Col md={12} xs={12}>
            <Card className="border-0 shadow-lg">
              <Card.Header className="bg-light py-3">
                <h6 className="mb-0">My Events</h6>
              </Card.Header>
              {filteredData && filteredData.length > 0 ? (
                <Table
                  hover
                  responsive="sm"
                  className={`${styles[""]} text-nowrap mb-0 table-border-0`}
                >
                  <thead className="table-border-0">
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Name</th>
                      <th scope="col">Ticket</th>
                      <th scope="col">Activation</th>
                      <th scope="col">Status</th>
                      <th scope="col">Compliance</th>
                      <th scope="col">Date</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((event, index) => {
                      return (
                        <tr key={event.pk}>
                          <td className="fw-bold">{index}.</td>
                          <td className="">
                            <Link to={`/EventDetail/${event.pk}`}>
                              {event.name}
                            </Link>
                          </td>
                          <td className="">{event.total_ticket}</td>
                          {isActivated(event)}
                          <td className="">{status(event)}</td>
                          <td className="">{approval(event)}</td>
                          <td className="">{convertDate(event.event_date)}</td>
                          <td>
                            {menuPopup === event.pk && (
                              <MenuPopUp
                                options={menuOptions(event.status)}
                                positionStyle={popupPosition}
                                onSelect={(e, option) =>
                                  handleMenuSelect(option, event.pk, e)
                                }
                              />
                            )}
                            <i
                              className="menuIcon fa-solid fa-ellipsis fs-4"
                              onClick={(e) => handleMenuPop(e, event.pk)}
                            ></i>
                              <ActionPopUp
                                actionFunc={() => handleEventDelete(popupId)}
                                title={"Delete"}
                                message="Are you sure you want to delete event"
                                cancleFunc={() => setDeletePop(null)}
                                postionStyle={popupStyle}
                                isVisible={popupId === event.pk ? deletePop : false}
                              />
                              <ActionPopUp
                                actionFunc={() =>
                                  handleEventActivation(event.pk)
                                }
                                title={
                                  event.is_public ? "Deactivate" : "Activate"
                                }
                                message={
                                  event.is_public
                                    ? "Are you sure you want to deactivate this event"
                                    : " Are you sure you want to activate this event"
                                }
                                cancleFunc={() => setActivationPop(null)}
                                postionStyle={popupStyle}
                                handler={{
                                  icon: "fa-solid fa-chart-line",
                                  color: event.is_public
                                    ? "bg-danger"
                                    : "bg-success",
                                }}
                                isVisible={popupId === event.pk ? activationPop : false}

                              />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              ) : (
                <NonAvailable message="Sorry you don't have any event avaliable" imageSrc={eventIllustration}/>
              )}
              <Card.Footer className="bg-white text-center">
                <Paginator
                  currentPage={currentPage}
                  totalItems={count}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                />
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </section>
    </Layout>
  );
}

export default MyEvents;
