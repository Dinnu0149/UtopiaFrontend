import React from 'react'
import { Card } from "react-bootstrap";
import styles from "./Popups.module.scss";
import "../../styles/main.scss";

function MenuPopUp({ options = [], positionStyle, onSelect }) {
  return (
    <Card className={`${styles["menu-popup"]} p-2 border-0 rounded-5`} style={positionStyle}>
    <ul className={`${styles["menu-list"]}`}>
      {options.map((option, index) => (
        <li
          key={index}
          className={`${styles["menu-item"]}`}
          onClick={(e) => onSelect(e, option)}
        >
          <i className={`${option.icon} me-2`}></i>
          {option.label}
        </li>
      ))}
    </ul>
  </Card>
  )
}

export default MenuPopUp