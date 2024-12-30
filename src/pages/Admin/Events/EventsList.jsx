import React, { useState, useEffect } from "react";
import { Col, Row, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../../styles/main.scss";
import Layout from "../../../components/Layouts/Layout";
import PageHeader from "../../../components/Header/PageHeader";
import Paginator from "../../../components/Paginator/Paginator";
import { useDispatch, useSelector } from "react-redux";
import {
  getEvents,
  eventApprovalUpdate,
} from "../../../actions/userAdminEventActions";
import { deleteEvent } from "../../../actions/eventActions";
import { convertDate } from "../../../utils/HelperFunc";
import NonAvailable from "../../../components/Loading/NonAvailable";
import Filter from "../../../components/Filter/Filter";
import ActionPopUp from "../../../components/Popups/ActionPopUp";
import MenuPopUp from "../../../components/Popups/MenuPopUp";
import { displayMessage } from "../../../actions/messageActions";
import eventIllustration from "../../../assets/images/illustrations/event.png";

const isPublic = (event) => {
  return (
    <td className={event.is_public ? "text-success" : "text-warning"}>
      {event.is_public ? "Public" : "Private"}
    </td>
  );
};

const status = (event) => {
  return (
    <span
      className={
        event.status === "open"
          ? "text-primary "
          : event.status === "closed"
          ? "text-success "
          : "text-warning "
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

function EventsList() {
  const dispatch = useDispatch();
  const { response, loading, error, updateResponse, updateError } = useSelector(
    (state) => state.userAdminEvent
  );
  const { deleteResponse, deleteError } = useSelector((state) => state.event);

  const { results = [], count = 0 } = response || [];
  const [filteredData, setFilteredData] = useState(results);
  const [currentPage, setCurrentPage] = useState(1);
  const [popupId, setPopupId] = useState(null);
  const [deletePop, setDeletePop] = useState(false);
  const [approvalPop, setApprovalPop] = useState(false);
  const [popupStyle, setPopupStyle] = useState({});
  const [menuPopup, setMenuPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({});
  const itemsPerPage = 20;

  useEffect(() => {
    dispatch(getEvents(currentPage));
  }, [dispatch, currentPage, deleteResponse, updateResponse]);

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
        ? "Revenue deleted successfully!"
        : deleteError;
      const messageColor = deleteResponse ? "bg-success" : "bg-danger";

      dispatch(displayMessage(messageInfo, messageColor));
      setMenuPopup(null);
    }
  }, [deleteResponse, deleteError]);

  useEffect(() => {
    if (updateError || updateResponse) {
      const messageInfo = updateResponse
        ? "Approval updated successfully!"
        : updateError;
      const messageColor = updateResponse ? "bg-success" : "bg-danger";

      dispatch(displayMessage(messageInfo, messageColor));
      setMenuPopup(null);
    }
  }, [updateResponse, updateError]);

  const handlePopUp = (e) => {
    const rect = e.target.getBoundingClientRect();
    setPopupStyle({
      right: `${(rect.left + window.scrollX) / 8}px`,
    });
  };

  const handleMenuPop = (e, pk) => {
    const rect = e.target.getBoundingClientRect();
    setPopupPosition({
      right: `${(rect.left + window.scrollX) / 5}px`,
    });
    setMenuPopup(menuPopup === pk ? null : pk);
    setDeletePop(null);
    setApprovalPop(null);
  };

  const handleActionPop = (e, pk) => {
    handlePopUp(e);

    if (popupId === pk && deletePop) {
      setDeletePop(false);
      setPopupId(null);
    } else {
      setDeletePop(true);
      setPopupId(pk);
    }
  };

  const handleApprovalPop = (e, pk) => {
    handlePopUp(e);
    
    if (popupId === pk && approvalPop) {
      setApprovalPop(false);
      setPopupId(null);
    } else {
      setApprovalPop(true);
      setPopupId(pk);
    }
  };

  const handleEventDelete = (pk) => {
    dispatch(deleteEvent(pk));
    setDeletePop(false);
    setPopupId(null)
  };

  const handleEventApproval = (pk) => {
    dispatch(eventApprovalUpdate(pk));
    setApprovalPop(false);
    setPopupId(null)
  };

  const handleMenuSelect = (option, pk, e) => {
    switch (option.label) {
      case "Approval":
        return handleApprovalPop(e, pk);
      case "Delete":
        return handleActionPop(e, pk);
      case "Close":
        return setMenuPopup(null);
      default:
        return option;
    }
  };

  const menuOptions = [
    { label: "Approval", icon: "fa-solid fa-mattress-pillow" },
    { label: "Delete", icon: "fa-regular fa-trash-can" },
    { label: "Close", icon: "fa-solid fa-ban" },
  ];

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
        { label: "Public", value: true },
        { label: "Private", value: false },
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
        <PageHeader title={"All Events"} />
        <Filter
          filters={filterOptions}
          sorts={sortOptions}
          onFilterChange={handleFilterChange}
        />
        <Row>
          <Col md={12} xs={12}>
            <Card className="border-0 shadow-lg">
              <Card.Header className="bg-light py-3 ">
                <h6 className="mb-0">All Events</h6>
              </Card.Header>
              {filteredData && filteredData.length > 0 ? (
                <Table
                  hover
                  responsive="sm"
                  className={`text-nowrap mb-0 table-border-0`}
                >
                  <thead className="table-border-0">
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Name</th>
                      <th scope="col">Ticket</th>
                      <th scope="col">Category</th>
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
                          {isPublic(event)}
                          <td className="">{status(event)}</td>
                          <td className="">{approval(event)}</td>
                          <td className="">{convertDate(event.event_date)}</td>
                          <td className="">
                            {menuPopup === event.pk && (
                              <MenuPopUp
                                options={menuOptions}
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
                                actionFunc={() => handleEventApproval(popupId)}
                                title={
                                  event.is_approve ? "Disapprove" : "Approve"
                                }
                                message={
                                  event.is_approve
                                    ? "Are you sure you want to disapprove event"
                                    : " Are you sure you want to approve event"
                                }
                                cancleFunc={() => setApprovalPop(null)}
                                postionStyle={popupStyle}
                                handler={{
                                  icon: "fa-solid fa-chart-line",
                                  color: event.is_approve
                                    ? "bg-danger"
                                    : "bg-success",
                                }}
                                isVisible={popupId === event.pk ? approvalPop : false}
                              />
                              <ActionPopUp
                                actionFunc={() => handleEventDelete(popupId)}
                                title={"Delete"}
                                message="Are you sure you want to delete event"
                                cancleFunc={() => setDeletePop(null)}
                                postionStyle={popupStyle}
                                isVisible={popupId === event.pk ? deletePop : false}
                              />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              ) : (
                <NonAvailable message="Sorry event not avaliable" imageSrc={eventIllustration}/>
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

export default EventsList;
