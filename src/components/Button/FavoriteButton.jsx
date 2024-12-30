import React, { useState, useEffect } from "react";
import styles from "./Button.module.scss";
import "../../styles/main.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateUserFavoriteItem } from "../../actions/favoriteActions";
import { displayMessage } from "../../actions/messageActions";

function FavoriteButton({
  handleActionPop = () => null,
  is_favorite,
  event_pk,
}) {
  
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(is_favorite);
  const { updateResponse, updateError } = useSelector((state) => state.favorite);
  const { message, favorite_events = [] } = updateResponse;

  const data = {
    event_id: event_pk,
  };

  useEffect(() => {
    if (message) {
      const isFavoriteItem = favorite_events.some(
        (event) => event.pk === event_pk
      );
      setIsFavorite(isFavoriteItem);
    }
  }, [message, favorite_events, event_pk]);

  
  useEffect(() => {
    if (clicked && updateError) {
      dispatch(displayMessage('Login to add favorite', 'bg-danger'))
    }
  }, [updateError]);

  const handleFavoriteClick = (e) => {
    setClicked(true);

    setTimeout(() => {
      setClicked(false);
    }, 300);

    if (isFavorite) {
      handleActionPop(e);
    } else {
      dispatch(updateUserFavoriteItem(data));
    }
  };

  return (
    <>
      <div
        className={`${styles["favorite"]} p-2 ${
          clicked ? styles["clicked"] : ""
        }`}
        onClick={(e) => handleFavoriteClick(e)}
      >
        <i
          className={`${
            isFavorite ? styles["is_favorite"] : ""
          } fa-solid fa-heart `}
        ></i>
      </div>
    </>
  );
}

export default FavoriteButton;
