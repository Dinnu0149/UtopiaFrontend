import React from "react";
import { Row, Col, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./HelpCenter.module.scss"

function FAQ() {
  return (
    <>
      <Row className="my-4">
        <Col xs={7}>
          <h5 className={`fs-6 fw-bold p-0 m-0`}>
            Frequently Asked Questions
          </h5>
        </Col>
        <Col xs={5}>
          <Link to={"/policy"} className="fw-bold p-0 m-0 float-end">
            Terms & Policy
          </Link>
        </Col>
      </Row>

      <Accordion>
        <Row className="mb-3">
          <Col xl={6} xs={12} className="mb-1">
            <Accordion.Item eventKey="0" className=" shadow">
              <Accordion.Header as={'h5'} className="">How can i share event to socal media?</Accordion.Header>
              <Accordion.Body as={'p'}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
          </Col>
          <Col xl={6} xs={12} className="mb-1">
            <Accordion.Item eventKey="1" className=" shadow">
              <Accordion.Header as={'h5'} className="">How filter work?</Accordion.Header>
              <Accordion.Body as={'p'}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
          </Col>

          <Col xl={6} xs={12} className="mb-1">
            <Accordion.Item eventKey="2" className=" shadow">
              <Accordion.Header as={'h5'} className="">How to access my purchased tickets?</Accordion.Header>
              <Accordion.Body as={'p'}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
          </Col>
          <Col xl={6} xs={12} className="mb-1">
            <Accordion.Item eventKey="3" className=" shadow">
              <Accordion.Header as={'h5'} className="">is there a way to know if my ticket is valid</Accordion.Header>
              <Accordion.Body as={'p'}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
          </Col>
        </Row>
      </Accordion>
    </>
  );
}

export default FAQ;
