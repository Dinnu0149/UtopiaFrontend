import React, {useState} from "react";
import {
  Row,
  Col,
  Nav,
  Container,
  Form,
  Badge,
  InputGroup,
  Button,
} from "react-bootstrap";
import styles from "./Search.module.scss";
import "../../styles/main.scss";
import { NavLink } from "react-router-dom";
import { search } from "../../actions/searchAction";
import { useDispatch, useSelector } from "react-redux";

function SearchInputNavigate() {
  const dispatch = useDispatch();
  const { response } = useSelector((state) => state.search);

  const { events, organizations } = response || []

  const initialState = {
    keyword: "",
  };
  const [formData, setFormData] = useState(initialState);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(search(formData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Container className={`${styles["searchContainer"]}`}>
      <Row className="mb-3 d-flex justify-content-center">
        <Col lg={8} md={10} >
          <Form onSubmit={handleSearchSubmit}>
            <InputGroup className="mb-3">
              <Form.Control
                className={`p-3 ${styles["searchField"]}`}
                type="search"
                name="keyword"
                required
                placeholder="ENTER KEYWORD"
                aria-describedby="basic-addon1"
                value={formData.keyword}
                onChange={handleChange}
              />
              <InputGroup.Text
                id="basic-addon1"
                as={Button}
                type={"submit"}
                className="btn_reverse px-4"
              >
                <i className="fa-solid fa-paper-plane fs-5"></i>
              </InputGroup.Text>
            </InputGroup>
          </Form>
        </Col>
      </Row>
      <Nav
        variant="tabs"
        className={`${styles["searchNavBottom"]} px-4 border-0 border-top d-flex justify-content-center `}
      >
        <Nav.Item className={`${styles["searchNavBottomItem"]}`}>
          <Nav.Link as={NavLink} to="/SearchEvent" className="fs-6">
            Events <Badge bg="danger">{events ? events.length : "0"}</Badge>
            <span className="visually-hidden">unread messages</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className={`${styles["searchNavBottomItem"]}`}>
          <Nav.Link as={NavLink} to="/SearchOrganization" className="fs-6">
            Organizations <Badge bg="danger">{organizations ? organizations.length : "0"}</Badge>
            <span className="visually-hidden">unread messages</span>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Container>
  );
}

export default SearchInputNavigate;
