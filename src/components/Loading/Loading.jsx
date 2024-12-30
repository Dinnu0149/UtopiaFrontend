import React from "react";
import styles from "./Loading.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSnowflake } from "@fortawesome/free-solid-svg-icons";

function Loading() {
  return (
    <div className={styles["loader-container"]}>
      <FontAwesomeIcon
        icon={faSnowflake}
        spin
        size="6x"
        className={styles["loader-icon"]}
      />
    </div>
  );
}

export default Loading;
