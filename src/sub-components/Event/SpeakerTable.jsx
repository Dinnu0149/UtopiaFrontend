import React, { useState } from "react";
import { Col, Row, Card, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Event.module.scss";
import "../../styles/main.scss";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ActionPopUp from "../../components/Popups/ActionPopUp";
import { useDispatch } from "react-redux";
import { deleteEventSpeakers } from "../../actions/speakerActions";

function SpeakerTable({ data, title }) {
  const dispatch = useDispatch();

  const [popupId, setPopupId] = useState(null);
  const [deletePop, setDeletePop] = useState(false);
  const [popupStyle, setPopupStyle] = useState({});

  const handleActionPop = (e, pk) => {
    const rect = e.target.getBoundingClientRect();
    setPopupStyle({
      right: `${(rect.left + window.scrollX) / 8}px`,
    });
    if (popupId === pk && deletePop) {
      setDeletePop(false);
      setPopupId(null);
    } else {
      setDeletePop(true);
      setPopupId(pk);
    }
  };

  const handleSpeakerDelete = (pk) => {
    dispatch(deleteEventSpeakers(pk));
    setDeletePop(false);
    setPopupId(null)
  };

  return (
    <Row className={`${styles["specker-row"]}`}>
      <Col md={12} xs={12}>
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-light py-3">
            <h5 className="mb-0">{title}</h5>
          </Card.Header>
          <Table
            hover
            responsive="sm"
            className={`${styles[""]} text-nowrap mb-0 table-border-0`}
          >
            <thead className="table-border-0">
              <tr>
                <th scope="col">No.</th>
                <th scope="col">FirstName</th>
                <th scope="col">LastName</th>
                <th scope="col">Genere</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((speaker, index) => (
                  <tr key={speaker.pk}>
                    <td>{index}.</td>
                    <td>{speaker.first_name}</td>
                    <td>{speaker.last_name}</td>
                    <td>{speaker.genre}</td>
                    <td>
                      <div
                        className="float-start me-3"
                        onClick={(e) => handleActionPop(e, speaker.pk)}
                      >
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          className="star"
                          size="1x"
                          color={"red"}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    <ActionPopUp
                      actionFunc={() => handleSpeakerDelete(popupId)}
                      title={"Delete"}
                      message="Are you sure you want to delete speaker"
                      cancleFunc={() => setDeletePop(null)}
                      postionStyle={popupStyle}
                      isVisible={popupId === speaker.pk ? deletePop : false}
                    />
                    </td>
                  </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Col>
    </Row>
  );
}

export default SpeakerTable;
