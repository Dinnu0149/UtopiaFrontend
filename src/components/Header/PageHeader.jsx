import React from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import "../../styles/main.scss";

function PageHeader({ title }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Row>
      <Col lg={12} md={12} xs={12}>
        <div className="border-bottom pb-2 mb-4 d-flex align-items-center gap-2 mt-4 text-center">
          <i
            onClick={handleBackClick}
            className={`${styles["back-Icon"]} fa-solid fa-arrow-left-long fs-5 p-2 rounded-circle`}
          ></i>
          <h5 className="">{title}</h5>
        </div>
      </Col>
    </Row>
  );
}

export default PageHeader;
