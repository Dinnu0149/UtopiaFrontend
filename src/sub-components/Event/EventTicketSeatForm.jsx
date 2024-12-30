import React, { useState } from "react";
import { Col, Row, Form, Button, InputGroup, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/main.scss";
import { formatCurrency } from "../../utils/HelperFunc";

function EventTicketSeatForm({ name, handleFocus, price, ticket_id, total_tickets }) {
  const navigate = useNavigate();
  let { pk } = useParams();

  const [show, setShow] = useState(false);
  const [value, setValue] = useState(1);
  const [priceValue, setPriceValue] = useState(price);
  const [isFocused, setIsFocused] = useState(true);

  const handleFocusChange = () => {
    setIsFocused(!isFocused);
    handleFocus(!isFocused, value);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleIncrement = () => {
    const newValue = value + 1;
    setValue(newValue);

    const newPrice = (newValue * price).toFixed(2);
    setPriceValue(newPrice);
  };

  const handleContinueBooking = () => {
    navigate(`/EventDetail/${pk}/ticket/${ticket_id}/review`);
    setIsFocused(false);
    localStorage.setItem(
      "ticket_info",
      JSON.stringify({ name: name, quantity: value, price: price })
    );
  };

  const handleDecrement = () => {
    if (value > 1) {
      const newValue = value - 1;
      setValue(newValue);

      const newPrice = (newValue * price).toFixed(2);
      setPriceValue(newPrice);
    }
  };

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      setValue(newValue);

      const newPrice = (newValue * price).toFixed(2);
      setPriceValue(newPrice);
    }
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        onFocus={() => handleFocusChange()}
        onBlur={() => handleFocusChange()}
      >
        Buy {name}
      </Button>

      <Modal centered show={show} onHide={handleClose} className="">
        <Modal.Header closeButton>
          <Modal.Title as={'h5'}>{name} Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="d-flex justify-content-between">
            <Col md={4} xs={4}>
              <Form.Label className="fw-blid fs-6" htmlFor={"quantity"}>
                No. of Seats <br />
                <b className="p-0 m-0">&#8358;{formatCurrency(Number(priceValue), true)}</b>
              </Form.Label>
            </Col>
            <Col md={6} xs={6}>
              <Form>
                <Form.Group>
                  <InputGroup>
                    <Button variant="danger" onClick={handleDecrement}>
                      -
                    </Button>
                    <Form.Control
                      type="number"
                      value={value}
                      onChange={handleChange}
                      min="1"
                      max={total_tickets}
                      className="text-center"
                      autoFocus
                    />
                    <Button variant="success" onClick={handleIncrement}>
                      +
                    </Button>
                  </InputGroup>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button className="secondary rounded-pill px-5" onClick={handleClose}>
            Close
          </Button>
          <Button
            className="primary rounded-pill px-5"
            onClick={() => handleContinueBooking()}
          >
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EventTicketSeatForm;
