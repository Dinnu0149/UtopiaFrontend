import React from "react";
import { Row, Col, Form, Card, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

function ContactUs() {
  return (
    <>
      <Row className="mb-5">
        <Col>
          <Link to={"/live chat"} className="fw-bold p-0 m-0">
            Start A Live Chat
          </Link>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col xl={4} lg={4} md={12} xs={12}>
          <div className="mb-4 mb-lg-0">
            <h5 className="mb-1 fw-bold">Email US</h5>
            <p className="mb-0">We are sure to replay you back</p>
          </div>
        </Col>
        <Col xl={8} lg={8} md={12} xs={12}>
          <Card className="rounded-5">
            <Card.Body>
              <div className="mb-5">
                <h5 className="mb-1">Let Us Help You</h5>
              </div>

              <div>
                <div className="mb-3">
                  <h5 className="mb-1">Email information</h5>
                </div>

                <Form>
                  <Row className="mb-3">
                    <Col md={4} xs={12}>
                      <Form.Label className="" htmlFor="from">
                        From
                      </Form.Label>
                    </Col>

                    <Col md={8} xs={12}>
                      <Form.Control
                        type="text"
                        id="from"
                        name="from"
                        value={"powerMike@gmail.com"}
                        readOnly
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4} xs={12}>
                      <Form.Label className="" htmlFor="to">
                        To
                      </Form.Label>
                    </Col>

                    <Col md={8} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="Subject"
                        id="to"
                        name="to"
                        value={"utopiaContactCenter@gmail.com"}
                        readOnly
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4} xs={12}>
                      <Form.Label className="" htmlFor="subject">
                        Subject
                      </Form.Label>
                    </Col>

                    <Col md={8} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="Subject"
                        id="subject"
                        name="subject"
                        required
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4} xs={12}>
                      <Form.Label className="" htmlFor="body">
                        Body
                      </Form.Label>
                    </Col>

                    <Col md={8} xs={12}>
                      <Form.Control
                        placeholder="Compose Email"
                        id="body"
                        name="body"
                        as={"textarea"}
                        rows={6}
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button className=" w-100 py-2" type="submit">
                        Submit Message
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ContactUs;
