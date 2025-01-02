import React, { useState, useEffect } from "react";
import { Col, Row, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../../styles/main.scss";
import Layout from "../../../components/Layouts/Layout";
import PageHeader from "../../../components/Header/PageHeader";
import Paginator from "../../../components/Paginator/Paginator";
import Filter from "../../../components/Filter/Filter";
import NonAvailable from "../../../components/Loading/NonAvailable";
import { useDispatch, useSelector } from "react-redux";
import { deleteRevenue } from "../../../actions/revenueActions";
import ActionPopUp from "../../../components/Popups/ActionPopUp";
import MenuPopUp from "../../../components/Popups/MenuPopUp";
import {
  getAdminRevenues,
  processRevenueWithdrawal,
} from "../../../actions/adminWalletAction";
import { displayMessage } from "../../../actions/messageActions";

function AdminRevenueList() {
  const dispatch = useDispatch();
  const { deleteError, deleteResponse } = useSelector((state) => state.revenue);

  const {
    revenueError,
    revenueResponse,
    revenueLoading,
    revenueWithdrawalResponse,
    revenueWithdrawalError,
  } = useSelector((state) => state.adminWallet);

  const { results = [], count = 0 } = revenueResponse || {};

  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [popupId, setPopupId] = useState(null);
  const [deletePop, setDeletePop] = useState(false);
  const [withdrawPop, setWithdrawPop] = useState(false);
  const [popupStyle, setPopupStyle] = useState({});
  const [menuPopup, setMenuPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({});
  const itemsPerPage = 20;

  useEffect(() => {
    dispatch(getAdminRevenues(currentPage));
  }, [dispatch, currentPage, deleteResponse, revenueWithdrawalResponse]);

  useEffect(() => {
    results.length > 0 ? setFilteredData(results) : setFilteredData([]);
  }, [results]);

  useEffect(() => {
    if (revenueError) {
      dispatch(displayMessage(revenueError, "bg-danger"));
    }
  }, [revenueError]);

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
    if (revenueWithdrawalError || revenueWithdrawalResponse) {
      const messageInfo = revenueWithdrawalResponse
        ? "Revenue withdrawal successfully!"
        : revenueWithdrawalError;
      const messageColor = revenueWithdrawalResponse
        ? "bg-success"
        : "bg-danger";

        dispatch(displayMessage(messageInfo, messageColor));
      setMenuPopup(null);
    }
  }, [revenueWithdrawalResponse, revenueWithdrawalError]);

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

  const handleWithdrawalPop = (e, pk) => {
    const rect = e.target.getBoundingClientRect();
    setPopupStyle({
      right: `${(rect.left + window.scrollX) / 8}px`,
    });

    if (popupId === pk && withdrawPop) {
      setWithdrawPop(false);
      setPopupId(null);
    } else {
      setWithdrawPop(true);
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
    setWithdrawPop(null);
  };

  const handleMenuSelect = (option, pk, e) => {
    switch (option.label) {
      case "Withdraw":
        return handleWithdrawalPop(e, pk);
      case "Delete":
        return handleDelectPop(e, pk);
      case "Close":
        return setMenuPopup(null);
      default:
        return option;
    }
  };

  const handleRevenueDelete = (pk) => {
    dispatch(deleteRevenue(pk));
    setDeletePop(false);
    setPopupId(null)
  };

  const handleRevenueWithdrawal = (pk) => {    
    dispatch(processRevenueWithdrawal(pk));
    setWithdrawPop(false);
    setPopupId(null)
  };

  const menuOptions = [
    { label: "Withdraw", icon: "fa-solid fa-money-bill-transfer" },
    { label: "Delete", icon: "fa-regular fa-trash-can" },
    { label: "Close", icon: "fa-solid fa-ban" },
  ];

  const filterOptions = [
    {
      name: "event_name",
      type: "text",
      placeholder: "Search by event Name",
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Completed", value: "completed" },
        { label: "Ready", value: "ready" },
        { label: "inProcess", value: "inProcess" },
      ],
    },
  ];

  const sortOptions = [
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
      filtered = filtered.filter((item) => item.status === filterValues.status);
    }

    if (filterValues.sort) {
      if (filterValues.sort === "nameAsc") {
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
      dataLoading={revenueLoading}
    >
      <section className="mx-3">
        <PageHeader title={"Revenues"} />
        <Filter
          filters={filterOptions}
          sorts={sortOptions}
          onFilterChange={handleFilterChange}
        />
        <Row>
          <Col md={12} xs={12}>
            <Card className="border-0 shadow-lg">
              <Card.Header className="bg-light py-3 ">
                <h6 className="mb-0">Event Revenue</h6>
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
                      <th scope="col">Organizer</th>
                      <th scope="col">Event</th>
                      <th scope="col">Ticket Sold</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((revenue, index) => {
                      return (
                        <tr key={revenue.pk}>
                          <td className="fw-bold">{index}.</td>
                          <td className="">
                            <Link
                              to={`/organization/profile/${revenue.event.organizer_id}`}
                            >
                              {revenue.event.organizer}
                            </Link>
                          </td>
                          <td className="">
                            <Link to={`/eventdetail/${revenue.event.pk}`}>
                              {revenue.event.event_name}
                            </Link>
                          </td>
                          <td className="">{revenue.tickets_sold}</td>
                          <td className="">&#8358;{revenue.amount}</td>
                          <td className="">
                            <span className={`badge bg-success py-2`}>
                              {revenue.status}
                            </span>
                          </td>
                          <td className="">
                            {menuPopup === revenue.pk && (
                              <MenuPopUp
                                options={menuOptions}
                                positionStyle={popupPosition}
                                onSelect={(e, option) =>
                                  handleMenuSelect(option, revenue.pk, e)
                                }
                              />
                            )}
                            <i
                              className="menuIcon fa-solid fa-ellipsis fs-4"
                              onClick={(e) => handleMenuPop(e, revenue.pk)}
                            ></i>
                              <ActionPopUp
                                actionFunc={() =>
                                  handleRevenueDelete(popupId)
                                }
                                title={"Delete"}
                                message="Are you sure you want to delete revenue"
                                cancleFunc={() => setDeletePop(null)}
                                postionStyle={popupStyle}
                                isVisible={popupId === revenue.pk ? deletePop : false}

                              />
                              <ActionPopUp
                                actionFunc={() =>
                                  handleRevenueWithdrawal(popupId)
                                }
                                title={"Withdraw"}
                                message="Are you sure you want to proceed"
                                cancleFunc={() => setWithdrawPop(null)}
                                postionStyle={popupStyle}
                                handler={{
                                  icon: "fa-solid fa-money-bill-transfer",
                                  color: "bg-success",
                                }}
                                isVisible={popupId === revenue.pk ? withdrawPop : false}

                              />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              ) : (
                <NonAvailable message="Sorry revenue not avaliable" />
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

export default AdminRevenueList;
