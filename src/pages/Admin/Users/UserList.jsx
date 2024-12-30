import React, { useState, useEffect } from "react";
import { Col, Row, Card, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./Users.module.scss";
import "../../../styles/main.scss";
import Layout from "../../../components/Layouts/Layout";
import PageHeader from "../../../components/Header/PageHeader";
import Paginator from "../../../components/Paginator/Paginator";
import Filter from "../../../components/Filter/Filter";
import NonAvailable from "../../../components/Loading/NonAvailable";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  deleteUser,
  UserStatusUpdate,
} from "../../../actions/userActions";
import ActionPopUp from "../../../components/Popups/ActionPopUp";
import MenuPopUp from "../../../components/Popups/MenuPopUp";
import { displayMessage } from "../../../actions/messageActions";
import userIllustration from "../../../assets/images/illustrations/user.png";

function UserList() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {
    response,
    loading,
    error,
    deleteResponse,
    deleteError,
    statusResponse,
    statusError,
  } = useSelector((state) => state.user);
  const { results = [], count = 0 } = response || {};

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
    dispatch(getUsers(currentPage));
  }, [dispatch, currentPage, deleteResponse, statusResponse]);

  useEffect(() => {
    results.length > 0 ? setFilteredData(results) : setFilteredData([])
  }, [results]);

  useEffect(() => {
    if (error) {
      dispatch(displayMessage(error, "bg-danger"));
    }
  }, [error]);

  useEffect(() => {
    if (deleteError || deleteResponse) {
      const messageInfo = deleteResponse
        ? "User deleted successfully!"
        : deleteError;
      const messageColor = deleteResponse ? "bg-success" : "bg-danger";

      dispatch(displayMessage(messageInfo, messageColor));
      setMenuPopup(null);
    }
  }, [deleteResponse, deleteError]);

  useEffect(() => {
    if (statusError || statusResponse) {
      const messageInfo = statusResponse
        ? "User status changed successfully!"
        : statusError;
      const messageColor = statusResponse ? "bg-success" : "bg-danger";

      dispatch(displayMessage(messageInfo, messageColor));
      setMenuPopup(null);
    }
  }, [statusResponse, statusError]);

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
    setDeletePop(null)
    setActivationPop(null)
  };

  const handleActionPop = (e, pk) => {
    handlePopUp(e);
    // setDeletePop(!deletePop === pk ? null : pk);

    if (popupId === pk && deletePop) {
      setDeletePop(false);
      setPopupId(null);
    } else {
      setDeletePop(true);
      setPopupId(pk);
    }
  };

  const handleActivatePop = (e, pk) => {
    handlePopUp(e);
    // setActivationPop(!activationPop === pk ? null : pk);

    if (popupId === pk && activationPop) {
      setActivationPop(false);
      setPopupId(null);
    } else {
      setActivationPop(true);
      setPopupId(pk);
    }
  };

  const handleUserDelete = (pk) => {
    dispatch(deleteUser(pk));
    setDeletePop(false);
    setPopupId(null)
  };

  const handleUserStatus = (pk) => {
    dispatch(UserStatusUpdate(pk));
    setActivationPop(false);
    setPopupId(null)
  };

  const handleChangePassword = (pk) => {
    navigate(`/ChangeUserPassword/${pk}`)
  };

  const handleMenuSelect = (option, pk, e) => {
    switch (option.label) {
      case "Status":
        return handleActivatePop(e, pk);
      case "Password":
          return handleChangePassword(pk);
      case "Delete":
        return handleActionPop(e, pk);
      case "Close":
        return setMenuPopup(null);
          
      default:
        return option;
    }
  };

  const menuOptions = [
    { label: "Status", icon: "fa-solid fa-chart-line" },
    { label: "Password", icon: "fa-solid fa-key" },
    { label: "Delete", icon: "fa-regular fa-trash-can" },
    { label: "Close", icon: "fa-solid fa-ban" },
  ];

  const filterOptions = [
    {
      name: "username",
      type: "text",
      placeholder: "Search by username",
    },
    {
      name: "groups",
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Organizer", value: "organizer" },
        { label: "Attendee", value: "attendee" },
        { label: "Active", value: true },
        { label: "Inactive", value: false },
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

    if (filterValues.username) {
      filtered = filtered.filter((item) =>
        item.username
          .toLowerCase()
          .includes(filterValues.username.toLowerCase())
      );
    }

    if (filterValues.groups) {
      filtered = filtered.filter((item) => 
        String(item.is_active) === filterValues.groups || 
        (item.groups && item.groups.some((group) => group === filterValues.groups))
      );
    }

    if (filterValues.sort) {
      if (filterValues.sort === "dateAsc") {
        filtered.sort(
          (a, b) => new Date(a.date_joined) - new Date(b.date_joined)
        );
      } else if (filterValues.sort === "dateDesc") {
        filtered.sort(
          (a, b) => new Date(b.date_joined) - new Date(a.date_joined)
        );
      } else if (filterValues.sort === "nameAsc") {
        filtered.sort((a, b) => a.username.localeCompare(b.username));
      } else if (filterValues.sort === "nameDesc") {
        filtered.sort((a, b) => b.username.localeCompare(a.username));
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
        <PageHeader title={"Users"} />
        <Filter
          filters={filterOptions}
          sorts={sortOptions}
          onFilterChange={handleFilterChange}
        />
        <Row className={`${styles[""]}`}>
          <Col md={12} xs={12}>
            <Card className="border-0 shadow-lg">
              <Card.Header className="bg-light py-3 ">
                <h6 className="mb-0">Users</h6>
              </Card.Header>
              {filteredData && filteredData.length > 0 ? (
                <Table
                  hover
                  responsive="sm"
                  className={`${styles[""]} text-nowrap mb-0  table-border-0`}
                >
                  <thead className="table-border-0">
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">UserName</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((user, index) => {
                      return (
                        <tr key={user.pk}>
                          <td className="fw-bold">{index}.</td>
                          <td className="">{user.username}</td>
                          <td className="">
                            <a href={`mailto:${user.email}`}>{user.email}</a>
                          </td>
                          <td className="">{user.phone}</td>
                          <td className="">
                            <Button
                              className={
                                user.is_active
                                  ? "badge bg-success py-2"
                                  : "badge bg-danger py-2"
                              }
                            >
                              {user.is_active ? "Active" : "Inactive"}
                            </Button>
                              <ActionPopUp
                                actionFunc={() => handleUserStatus(popupId)}
                                title={
                                  user.is_active ? "Deactivate" : "Activate"
                                }
                                message={
                                  user.is_active
                                    ? "Are you sure you want to deactivate user"
                                    : " Are you sure you want to activate user"
                                }
                                cancleFunc={() => setActivationPop(null)}
                                postionStyle={popupStyle}
                                handler={{
                                  icon: "fa-solid fa-chart-line",
                                  color: user.is_active
                                    ? "bg-danger"
                                    : "bg-success",
                                }}
                                isVisible={popupId === user.pk ? activationPop : false}
                              />
                          </td>
                          <td className="">
                            {menuPopup === user.pk && (
                              <MenuPopUp
                                options={menuOptions}
                                positionStyle={popupPosition}
                                onSelect={(e, option) =>
                                  handleMenuSelect(option, user.pk, e)
                                }
                              />
                            )}
                            <i
                              className="menuIcon fa-solid fa-ellipsis fs-4"
                              onClick={(e) => handleMenuPop(e, user.pk)}
                            ></i>
                              <ActionPopUp
                                actionFunc={() => handleUserDelete(popupId)}
                                title={"Delete"}
                                message="Are you sure you want to delete this user"
                                cancleFunc={() => setDeletePop(null)}
                                postionStyle={popupStyle}
                                isVisible={popupId === user.pk ? deletePop : false}
                              />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              ) : (
                <NonAvailable message="Sorry user not avaliable" imageSrc={userIllustration}/>
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

export default UserList;
