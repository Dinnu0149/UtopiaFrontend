import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Layout from "../../../components/Layouts/Layout";
import PageHeader from "../../../components/Header/PageHeader";
import "../../../styles/main.scss";
import CreditCard from "../../../sub-components/Wallet/CreditCard";
import { useDispatch, useSelector } from "react-redux";
import { getAdminWallet } from "../../../actions/adminWalletAction";
import BarChart from "../../../sub-components/Charts/BarChart";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import NonAvailable from "../../../components/Loading/NonAvailable";
import RevenueCard from "../../../sub-components/Wallet/RevenueCard";
import TransactionTableCard from "../../../sub-components/Wallet/TransactionTableCard";
import { displayMessage } from "../../../actions/messageActions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function AdminWallet() {
  const dispatch = useDispatch();

  const {
    response: wallet,
    loading,
    error,
  } = useSelector((state) => state.adminWallet);
  const {transactions, revenues, month_revenue=[],} = wallet

  const [revenueData, setRevenueData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Revenues (₦)",
        data: Array(12).fill(0), 
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgb(98, 75, 255)",
      },
    ],
  });

  useEffect(() => {
    const data = revenueData.labels.map(month => month_revenue[month] || 0);

    setRevenueData(prevState => ({
      ...prevState,
      datasets: [
        {
          ...prevState.datasets[0],
          data: data,
        },
      ],
    }));
  }, [wallet]);

  useEffect(() => {
    dispatch(getAdminWallet());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(displayMessage(error, "bg-danger"));
    }
  }, [error]);


  const revenueOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Revenues Over Time",
      },
    },
  };


  return (
    <Layout
      dataLoading={loading}
    >
      <section className="mx-3">
        <PageHeader title="Admin Wallet" />
        <Row className="mb-4">
          <Col lg={6} sm={12} xs={12} md={6} className="mb-5">
            <CreditCard wallet={wallet} />
          </Col>
          <Col lg={6} sm={12} xs={12} md={6} className="mb-3">
            <BarChart
              data={revenueData}
              options={revenueOptions}
              headerTitle={"Monthly Revenue"}
            />
          </Col>
        </Row>
        <Row className="mb-5">
          <h5 className="fs-4">Lastest User Transactions</h5>
          {transactions && transactions.length > 0 ? (
            <TransactionTableCard
              transactions={transactions}
              redirectPath={"AdminTransactions"}
            />
          ) : (
            <NonAvailable message={"No Transaction Available"} />
          )}
        </Row>

        <Row className="mb-4">
        <h5 className="fs-4">Revenues</h5>
          {revenues && revenues.length > 0 ? (
            <RevenueCard
            revenues={revenues}
            redirectPath={"AdminRevenue"}
            />
          ) : (
            <NonAvailable message={"No Revenue Available"} />
          )}
        </Row>
      </section>
    </Layout>
  );
}

export default AdminWallet;
