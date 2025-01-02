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
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function AdminDashboard() {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Users",
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
    recent_created_event = [],
    recent_closed_event = [],
    total_user,
    total_active_user,
    total_recent_created_event,
    total_recent_closed_event,
    month_active_user = [],
    month_event = []
  } = dashboardResponse;


  useEffect(() => {
    const data = userData.labels.map(month => month_active_user[month] || 0);

    setUserData(prevState => ({
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


  const userOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Users active per month",
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
      title={"Admin"}
      card1={{
        title: "Users",
        count: total_user,
        summary: "Total user",
        icon: "fa-solid fa-users",
      }}
      card2={{
        title: "Active",
        count: total_active_user,
        summary: "30days now",
        icon: "fa-solid fa-user-secret",
      }}
      card3={{
        title: "Recent ",
        count: total_recent_created_event,
        summary: "Created Event",
        icon: "fa-solid fa-circle-check",
      }}
      card4={{
        title: "Closed",
        count: total_recent_closed_event,
        summary: 'Recent Closed',
        icon: "fa-solid fa-power-off",
      }}
      >
        <Row className="my-5">
          <Col lg={6} sm={12} xs={12} md={6} className="mb-3">
          <LineChart
              data={userData}
              options={userOptions}
              headerTitle={"Active Users"}
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
        {recent_created_event && recent_created_event.length > 0 ? (
          <ActiveEvent upcoming={recent_created_event} title={"Recent created"} path={'/admin/events/list'}/>
        ) : (
          <NonAvailable message={"No Recent Created Event Available"} imageSrc={upcomingIllustration}/>
        )}
        {recent_closed_event && recent_closed_event.length > 0 ? (
          <ActiveEvent upcoming={recent_closed_event} title={"Recent closed"} path={'/admin/events/list'}/>
        ) : (
          <NonAvailable message={"No Recent Closed Event Available"}/>
        )}
      </HeaderCardBg>

      <section className=""></section>
    </Layout>
  );
}

export default AdminDashboard;
