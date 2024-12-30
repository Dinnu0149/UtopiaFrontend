import React, { useState } from "react";
import { Form, Card, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../../styles/main.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../actions/reviewActions";
import { displayMessage } from "../../actions/messageActions";


function AddReview() {
  let { pk } = useParams();
  const dispatch = useDispatch();

  const { createLoading } = useSelector((state) => state.review);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleStarSumbit = (e) => {
    e.preventDefault();
    if (rating !== 0) {
      const formData = {
        star_rating: rating,
        review_text: 'happy',
      };
      dispatch(createReview(pk, formData));
      setRating(0);
    } else {
      dispatch(displayMessage("Selete at least one star", "bg-danger"));
    }
  };

  const handleCancle = () => {
    setRating(0);
    setHover(0);
  };

  return (
    <Card className="border-0 shadow bg-transparent">
      <Card.Body className="text-center ">
        <Form onSubmit={handleStarSumbit}>
          <h5 className="fs-5 fw-bold">How would you rate this event</h5>
          <div className="my-4">
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;

              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                    style={{ display: "none" }} // hide the radio input
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    className="star"
                    size="2x"
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                    color={
                      ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                    }
                    style={{ cursor: "pointer", transition: "color 200ms" }}
                  />
                </label>
              );
            })}
          </div>
          <Button type="submit" className="px-4 mx-2 mb-1">
            {createLoading ? (
              <Spinner animation="border" size="sm" role="status"></Spinner>
            ) : (
              "Add Review"
            )}
          </Button>
          <Button className="btn_reverse px-5" onClick={handleCancle}>
            Cancle
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddReview;
