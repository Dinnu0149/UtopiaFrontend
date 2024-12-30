import React from "react";
import { Card } from "react-bootstrap";
import styles from "./Popups.module.scss";
import { CSSTransition } from "react-transition-group";

function MessagesPopUp({ isVisible, message, bgColor }) {
  
  const errorMessages = Array.isArray(message)
    ? message.flat()
    : typeof message === "object"
    ? Object.values(message).flat()
    : [message];

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
        className={`border-0 ${bgColor} ${styles["popMessages-container"]}`}
      >
        <Card.Body className="m-0 py-2 text-light text-center ">
          {errorMessages.map((msg, index) => (
            <p className="m-0 p-0 text-light" key={index}>
              {msg}
            </p>
          ))}
        </Card.Body>
      </Card>
    </CSSTransition>
  );
}

export default MessagesPopUp;
