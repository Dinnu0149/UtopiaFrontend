import React from "react";
import { Col, Row, Card, Button } from "react-bootstrap";
import styles from "./Popups.module.scss";
import "../../styles/main.scss";
import { CSSTransition } from "react-transition-group";

function ActionPopUp({
  title = "Confirm Action",
  message = "Are you sure you want to perform this action?",
  actionFunc = () => {},
  cancleFunc = () => {},
  postionStyle,
  handler = { icon: "fa-regular fa-trash-can", color: "bg-danger" },
  isVisible= false
}) {  
  return (
    <CSSTransition
      in={isVisible}
      timeout={400}
      classNames={{
        enter: styles["enter"],
        enterActive: styles["enter-active"],
        exit: styles["exit"],
        exitActive: styles["exited-active"],
      }}
      unmountOnExit
    >
      <Card
        className={`${styles["action-card"]} mt-3 border-0 rounded-5`}
        style={postionStyle}
      >
        <Card.Body className={`${styles["action-card-body"]} text-center`}>
          <i
            className={`${handler.icon} ${handler.color} fs-3 text-light rounded-circle p-4 mb-3`}
          ></i>
          <h5 className="fw-bold p-0 m-0">{title}</h5>
          <p className="p-0 mx-3">{message}</p>
          <Row className="my-3 ">
            <Col>
              <Button
                className={`w-100 text-light ${handler.color}`}
                onClick={actionFunc}
              >
                {title}
              </Button>
            </Col>
            <Col>
              <Button className="w-100 btn_reverse" onClick={cancleFunc}>
                Cancle
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </CSSTransition>
  );
}

export default ActionPopUp;
