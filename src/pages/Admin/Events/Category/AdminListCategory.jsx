import React, { useState, useEffect } from "react";
import { Col, Row, Form, Modal, Card, Button, Spinner } from "react-bootstrap";
import styles from "./Category.module.scss";
import "../../../../styles/main.scss";
import Layout from "../../../../components/Layouts/Layout";
import PageHeader from "../../../../components/Header/PageHeader";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategorys,
  editCategory,
  deleteCategory,
} from "../../../../actions/categoryActions";
import NonAvailable from "../../../../components/Loading/NonAvailable";
import { displayMessage } from "../../../../actions/messageActions";

function AdminListCategory() {
  const dispatch = useDispatch();

  const {
    response: getCategoryResponse,
    error: getCategoryError,
    loading: getCategoryLoading,
    updateResponse,
    updateError,
    deleteResponse,
    deleteError,
    updateLoading,
    deleteLoading,
  } = useSelector((state) => state.category);

  const { results: categories = [] } = getCategoryResponse;

  const [show, setShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); // Store the currently selected category

  const [editedFormData, seteditedFormData] = useState({
    pk: null,
    name: "",
    icon: "",
  });

  const handleToggleOpen = (category) => {
    setShow(true);
    setSelectedCategory(category);
    seteditedFormData({
      pk: category.pk,
      name: category.name,
      icon: category.icon,
    });
  };

  const handleToggleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    seteditedFormData({
      ...editedFormData,
      [name]: value,
    });
  };

  const handleDelete = (pk) => {
    dispatch(deleteCategory(pk));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(editCategory(editedFormData.pk, editedFormData));
  };

  useEffect(() => {
    dispatch(getCategorys());
  }, [dispatch, deleteResponse, updateResponse]);

  useEffect(() => {
    if (getCategoryError) {
      dispatch(displayMessage(getCategoryError, "bg-danger"));
    }
  }, [getCategoryError]);

  useEffect(() => {
    if (updateResponse || updateError) {
      setShow(false);
      const messageInfo = updateResponse
        ? "Category updated successfully!"
        : updateError;
      const messageColor = updateResponse ? "bg-success" : "bg-danger";

      dispatch(displayMessage(messageInfo, messageColor));
    }
  }, [updateResponse, updateError]);

  useEffect(() => {
    if (deleteResponse || deleteError) {
      setShow(false);
      const messageInfo = deleteResponse
        ? "Category deleted successfully!"
        : deleteError;
      const messageColor = deleteResponse ? "bg-success" : "bg-danger";

      dispatch(displayMessage(messageInfo, messageColor));
    }
  }, [deleteResponse, deleteError]);

  return (
    <Layout
      dataLoading={getCategoryLoading}
    >
      <section className="mx-3">
        <PageHeader title={"Categories"} />
        <Row>
          <Col></Col>
          <Col>
            <Button
              as={NavLink}
              to={"/admin/category/create"}
              className="float-end me-2 px-5 btn_reverse shadow-sm"
            >
              Create
            </Button>
          </Col>
        </Row>
        <Row>
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <Col xl={1} lg={1} md={2} sm={2} xs={3} key={category.pk} className="mb-3">
                <Card
                  className="border-0 m-0 p-0 rounded-5 bg-transparent"
                  onClick={() => handleToggleOpen(category)}
                >
                  <Card.Body className="d-flex gap-1 flex-column align-items-center">
                    <div className={`${styles["category-icon"]} rounded`}>
                      <span>{category.icon}</span>
                    </div>
                    <Card.Text as="p">{category.name}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <NonAvailable message="Sorry no category available" />
          )}
        </Row>

        {selectedCategory && (
          <Modal
            centered
            show={show}
            size="sm"
            onHide={handleToggleClose}
            className={styles["event-modal"]}
          >
            <Modal.Header closeButton>
              <Modal.Title as={"h5"}>Category Preview</Modal.Title>
            </Modal.Header>
            <Modal.Body className="m-0 p-0 mx-3">
              <Form>
                <Form.Label htmlFor="name" className="fw-bold">
                  Name
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  className="mb-3"
                  value={editedFormData.name}
                  onChange={handleChange}
                />
                <Form.Label htmlFor="icon" className="fw-bold">
                  Emoji
                </Form.Label>
                <Form.Control
                  type="text"
                  name="icon"
                  value={editedFormData.icon}
                  onChange={handleChange}
                />
                <Row className="mt-2 mb-2 mx-2">
                  <Col>
                    <Button
                      className="px-3"
                      onClick={(e) => handleEditSubmit(e, selectedCategory.pk)}
                    >
                      {updateLoading ? (
                        <Spinner
                          animation="border"
                          size="sm"
                          role="status"
                        ></Spinner>
                      ) : (
                        "Update"
                      )}
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      className="bg-danger px-3 float-end"
                      onClick={() => handleDelete(selectedCategory.pk)}
                      disabled
                    >
                      {deleteLoading ? (
                        <Spinner
                          animation="border"
                          size="sm"
                          role="status"
                        ></Spinner>
                      ) : (
                        "Delete"
                      )}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
          </Modal>
        )}
      </section>
    </Layout>
  );
}

export default AdminListCategory;
