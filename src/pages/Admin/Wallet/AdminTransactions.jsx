import React, { useState, useEffect } from "react";
import { Col, Row, Card, Button, Table } from "react-bootstrap";
import styles from "./AdminWallet.module.scss";
import "../../../styles/main.scss";
import Layout from "../../../components/Layouts/Layout";
import PageHeader from "../../../components/Header/PageHeader";
import ActionPopUp from "../../../components/Popups/ActionPopUp";
import { useDispatch, useSelector } from "react-redux";
import {
  admingetTransactions,
  deleteTransaction,
} from "../../../actions/transactionActions";
import Paginator from "../../../components/Paginator/Paginator";
import Filter from "../../../components/Filter/Filter";
import NonAvailable from "../../../components/Loading/NonAvailable";
import { convertDate } from "../../../utils/HelperFunc";
import { displayMessage } from "../../../actions/messageActions";
import transactionIllustration from "../../../assets/images/illustrations/transaction.png";

function AdminTransactions() {
  const dispatch = useDispatch();
  const {
    adminTransactionResponse,
    adminTransactionLoading,
    adminTransactionError,
    deleteError,
    deleteResponse,
  } = useSelector((state) => state.transaction);
  const { results = [], count = 0 } = adminTransactionResponse || [];

  const [filteredData, setFilteredData] = useState(results);
  const [currentPage, setCurrentPage] = useState(1);
  const [popupId, setPopupId] = useState(null);
  const [deletePop, setDeletePop] = useState(false);
  const [popupStyle, setPopupStyle] = useState({});
  const itemsPerPage = 20;

  useEffect(() => {
    dispatch(admingetTransactions(currentPage));
  }, [dispatch, currentPage, deleteResponse]);

  useEffect(() => {
    results.length > 0 ? setFilteredData(results) : setFilteredData([]);
  }, [results]);

  useEffect(() => {
    if (adminTransactionError) {
      dispatch(displayMessage(adminTransactionError, "bg-danger"));
    }
  }, [adminTransactionError]);

  useEffect(() => {
    if (deleteError || deleteResponse) {
      const messageInfo = deleteResponse
        ? "Transaction deleted successfully!"
        : deleteError;
      const messageColor = deleteResponse ? "bg-success" : "bg-danger";

      dispatch(displayMessage(messageInfo, messageColor));
    }
  }, [deleteResponse, deleteError]);

  const handleActionPop = (e, pk) => {
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

  const handleTransactionDelete = (pk) => {
    dispatch(deleteTransaction(pk));
    setDeletePop(false);
    setPopupId(null);
  };

  const filterOptions = [
    {
      name: "status",
      type: "text",
      placeholder: "Search by status",
    },
    {
      name: "type",
      type: "select",
      options: [
        { label: "Withdraw", value: "withdraw" },
        { label: "Credit", value: "credit" },
        { label: "Purchase", value: "purchase" },
      ],
    },
  ];

  const sortOptions = [
    { label: "Date Ascending", value: "dateAsc" },
    { label: "Date Descending", value: "dateDesc" },
  ];

  const handleFilterChange = (filterValues) => {
    let filtered = results;

    if (filterValues.status) {
      filtered = filtered.filter((item) =>
        item.status.toLowerCase().includes(filterValues.status.toLowerCase())
      );
    }

    if (filterValues.type) {
      filtered = filtered.filter((item) => item.type === filterValues.type);
    }

    if (filterValues.sort) {
      if (filterValues.sort === "dateAsc") {
        filtered.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      } else if (filterValues.sort === "dateDesc") {
        filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      }
    }
    setFilteredData(filtered);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Layout dataLoading={adminTransactionLoading}>
      <section className="mx-3">
        <PageHeader title={"Transactions"} />
        <Filter
          filters={filterOptions}
          sorts={sortOptions}
          onFilterChange={handleFilterChange}
        />
        <Row className={`${styles[""]}`}>
          <Col md={12} xs={12}>
            <Card className="border-0 shadow-lg">
              <Card.Header className="bg-light py-3 ">
                <h6 className="mb-0">All Users Transactions</h6>
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
                      <th scope="col">User</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Type</th>
                      <th scope="col">Status</th>
                      <th scope="col">Date</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredData.map((transaction, index) => {
                      return (
                        <tr key={transaction.pk}>
                          <td className="fw-bold">{index}.</td>
                          <td className="">{transaction.user}</td>
                          <td className="">&#8358;{transaction.amount}</td>
                          <td className="">{transaction.type}</td>
                          <td className="">
                            <span
                              className={`badge bg-success py-2 rounded-pill`}
                            >
                              {transaction.status}
                            </span>
                          </td>
                          <td className="">{`${convertDate(
                            transaction.timestamp
                          )}`}</td>
                          <td className="">
                            <Button
                              className="bg-danger py-1"
                              onClick={(e) =>
                                handleActionPop(e, transaction.pk)
                              }
                            >
                              Delete
                            </Button>
                            <ActionPopUp
                              actionFunc={() =>
                                handleTransactionDelete(popupId)
                              }
                              title={"Delete"}
                              message="Are you sure you want to delete transaction"
                              cancleFunc={() => setDeletePop(null)}
                              postionStyle={popupStyle}
                              isVisible={
                                popupId === transaction.pk ? deletePop : false
                              }
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              ) : (
                <NonAvailable
                  message="Sorry transaction not avaliable"
                  imageSrc={transactionIllustration}
                />
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

export default AdminTransactions;
