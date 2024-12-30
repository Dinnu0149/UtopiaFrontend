import React from "react";
import { Card } from "react-bootstrap";
import "../../styles/main.scss";
import { useSelector } from "react-redux";

function DetailBackground() {
  const {
    detailResponse,
  } = useSelector((state) => state.event);
  return (
    <Card className="bg-transparent border-0">
      <Card.Img
        src={detailResponse.image}
        alt="Event Poster"
        height={400}
      />

    </Card>
  );
}

export default DetailBackground;
