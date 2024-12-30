import React from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./Popups.module.scss";
import "../../styles/main.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function UserDropdown({ isVisible, handleActionPop, username }) {
  const { user } = useSelector((state) => state.auth);

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
      <div className={`${styles["user-dropdown-container"]} shadow `}>
        <div className={styles["user-dropdown-header"]}>
          <h5 className={styles["user-name"]}>{username}</h5>
          <Link to={"/Profile"} className={styles["user-profile-link"]}>
            View my profile
          </Link>
        </div>
        <div className={styles["user-dropdown-body"]}>
          <Link to={"/EditProfile"} className={styles["dropdown-item"]}>
            <i className="fa-regular fa-user border-0"></i> Edit Profile
          </Link>
          <Link to={"/Favorite"} className={styles["dropdown-item"]}>
            <i className="fa-solid fa-heart favoriteIcon border-0"></i> Favorite
          </Link>
          <Link href="#" className={styles["dropdown-item"]}>
            <i className="fa-solid fa-chart-line border-0"></i> Activity Log
          </Link>

          <Link to={"/Settings"} className={styles["dropdown-item"]}>
            <i className="fa-solid fa-cog border-0"></i> Account Settings
          </Link>
          {user ? (
            <Link
              href="#"
              className={`${styles["dropdown-item"]}`}
              onClick={handleActionPop}
            >
              <i className="fa-solid fa-sign-out-alt border-0"></i> Sign Out
            </Link>
          ) : (
            <Link
              to={'/Login'}
              className={`${styles["dropdown-item"]}`}
            >
              <i className="fa-solid fa-sign-out-alt border-0"></i> Sign In
            </Link>
          )}
        </div>
      </div>
    </CSSTransition>
  );
}

export default UserDropdown;
