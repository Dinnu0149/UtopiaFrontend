import React from "react";
import {
  Row,
  Col,
  Container,
  Form,
  InputGroup,
  Button,
  Tab,
  Tabs,
} from "react-bootstrap";
import "../../styles/main.scss";
import styles from "./Policy.module.scss";
import Layout from "../../components/Layouts/Layout";
import PageHeader from "../../components/Header/PageHeader";
import FAQ from "../../sub-components/HelpCenter/FAQ";
import ContactUs from "../../sub-components/HelpCenter/ContactUs";

function HelpCenter() {
  return (
    <Layout dataLoading={false}>
      <section className="mx-3">
        <PageHeader title="Help Center" />

        <Container className={`${styles["searchContainer"]}`}>
          <Row className="mb-3 d-flex justify-content-center">
            <Col lg={8} md={10}>
              <Form>
                <InputGroup className="mb-3">
                  <Form.Control
                    className={`p-3 ${styles["searchField"]}`}
                    type="search"
                    name="keyword"
                    required
                    placeholder="SEARCH"
                    aria-describedby="basic-addon1"
                  />
                  <InputGroup.Text
                    id="basic-addon1"
                    as={Button}
                    type={"submit"}
                    className={`${styles["searchButton"]} btn_reverse px-4`}
                  >
                    <i className="fa-solid fa-paper-plane fs-5"></i>
                  </InputGroup.Text>
                </InputGroup>
              </Form>
            </Col>
          </Row>

          <Tabs
            defaultActiveKey="FAQ"
            id="justify-tab-example"
            className={`${styles["contactNavButton"]} contactNavButton mb-3`}
            justify
          >
            <Tab eventKey="FAQ" title="FAQ" >
              <FAQ />
            </Tab>
            <Tab eventKey="Contact Use" title="Contact Use">
              <ContactUs />
            </Tab>
          </Tabs>
        </Container>
      </section>
    </Layout>
  );
}

export default HelpCenter;
