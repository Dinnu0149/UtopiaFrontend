import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Layout from "../../../components/Layouts/Layout";
import "../../../styles/main.scss";
import HeaderCardBg from "../../../sub-components/Dashboard/HeaderCardBg";
import ActiveEvent from "../../../sub-components/Dashboard/ActiveEvent";
import { getDashboardData } from "../../../actions/dashboardActions";
import { useDispatch, useSelector } from "react-redux";
import NonAvailable from "../../../components/Loading/NonAvailable";
import BarChart from "../../../sub-components/Charts/BarChart";
import LineChart from "../../../sub-components/Charts/LineChart";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { displayMessage } from "../../../actions/messageActions";
import upcomingIllustration from "../../../assets/images/illustrations/upcoming.png";


ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function OrganizerDashboard() {
  const dispatch = useDispatch();

  const [revenueData, setRevenueData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Revenues (₦)",
        data: Array(12).fill(0), 
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "red",
      },
    ],
  });
  const [eventData, setEventData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Events",
        data: Array(12).fill(0),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgb(98, 75, 255)",
      },
    ],
  });


  const {
    response: dashboardResponse,
    loading: dashboardLoading,
    error: dashboardError,
  } = useSelector((state) => state.dashboard);

  
  const {
    upcoming_event = [],
    total_favorite,
    total_upcoming_event,
    total_booking,
    total_event,
    month_revenue=[],
    month_event = []
  } = dashboardResponse;

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
  }, [dashboardResponse]);


  useEffect(() => {
    const data = eventData.labels.map(month => month_event[month] || 0);

    setEventData(prevState => ({
      ...prevState,
      datasets: [
        {
          ...prevState.datasets[0],
          data: data,
        },
      ],
    }));
  }, [dashboardResponse]);

  useEffect(() => {
    dispatch(getDashboardData());
  }, [dispatch]);

  useEffect(() => {
    if (dashboardError) {
      dispatch(displayMessage(dashboardError, "bg-danger"));
    }
  }, [dashboardError]);


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

  const eventOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Events created per month",
      },
    },
  };

  return (
    <Layout
      dataLoading={dashboardLoading}
    >
      <HeaderCardBg
        title={"Organizer"}
        card1={{
          title: "Events",
          count: total_event,
          summary: "Total event",
          icon: "fa-solid fa-book-bookmark",
        }}
        card2={{
          title: "Upcoming",
          count: total_upcoming_event,
          summary: "Yet to start",
          icon: "fa-solid fa-road-circle-check",
        }}
        card3={{
          title: "Booked",
          count: total_booking,
          summary: "General",
          icon: "fa-solid fa-book-bookmark",
        }}
        card4={{
          title: "Favorite",
          count: total_favorite,
          summary: `${total_favorite} Favorite`,
          icon: "fa-solid fa-heart",
        }}
      >
        <Row className="my-5">
          <Col lg={6} sm={12} xs={12} md={6} className="mb-3">
          <LineChart
              data={revenueData}
              options={revenueOptions}
              headerTitle={"Monthly Revenue"}
            />
          </Col>
          <Col lg={6} sm={12} xs={12} md={6} className="mb-3">
          <BarChart
              data={eventData}
              options={eventOptions}
              headerTitle={"Event Created"}
            />
          </Col>
        </Row>
        {upcoming_event && upcoming_event.length > 0 ? (
          <ActiveEvent upcoming={upcoming_event} title={"My Upcoming Events "} path={"/MyEvents"}/>
        ) : (
          <NonAvailable message={"No Upcoming Event Available"} imageSrc={upcomingIllustration} />
        )}
      </HeaderCardBg>

      <section className=""></section>
    </Layout>
  );
}

export default OrganizerDashboard;
