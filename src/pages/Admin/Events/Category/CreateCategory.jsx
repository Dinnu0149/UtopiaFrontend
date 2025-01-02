import React, { useEffect } from "react";
import { Col, Row, Form, Card, Button, Spinner } from "react-bootstrap";
import "../../../../styles/main.scss";
import Layout from "../../../../components/Layouts/Layout";
import PageHeader from "../../../../components/Header/PageHeader";
import {
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../../../actions/categoryActions";
import { displayMessage } from "../../../../actions/messageActions";

const FormInput = ({
  label,
  placeholder,
  name,
  required = false,
  type = "text",
  as = "input",
  rows,
}) => (
  <Row className="mb-4">
    <Col md={4} xs={12}>
      <Form.Label htmlFor={name}>{label}</Form.Label>
    </Col>
    <Col md={8} xs={12}>
      <Form.Control
        as={as}
        id={name}
        name={name}
        type={type}
        rows={rows}
        required={required}
        placeholder={placeholder}
      />
    </Col>
  </Row>
);

function CreateCategory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { createResponse, createError, createLoading } = useSelector(
    (state) => state.category
  );

  const handleEventInfoSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      icon: e.target.icon.value,
    };
    dispatch(createCategory(formData));
  };

  useEffect(() => {
    if (createResponse) {
      navigate("/admin/category", {
        state: { message: "Category created successfully!" },
      });
    } else if (createError) {
      dispatch(displayMessage(createError, "bg-danger"));
    }
  }, [createResponse, createError]);

  return (
    <Layout
    >
      <section className="mx-3">
        <PageHeader title={"Create Category"} />

        <Row className="mb-5">
          <Col xl={4} lg={4} md={12} xs={12}>
            <div className="mb-4 mb-lg-0">
              <h5 className="mb-1 fw-bold">Category Info</h5>
              <p className="mb-0">create category here </p>
            </div>
          </Col>
          <Col xl={8} lg={8} md={12} xs={12}>
            <Card>
              {/* card body */}
              <Card.Body>
                <div className="mb-5">
                  <h5 className="mb-1">Category Info</h5>
                </div>

                <div>
                  <div className="mb-3">
                    <h5 className="mb-1">Category information</h5>
                  </div>
                  <Form onSubmit={handleEventInfoSubmit}>
                    <FormInput
                      label="Title"
                      name="name"
                      placeholder={"Title"}
                      required={true}
                    />

                    <FormInput
                      label="Emoji (One emoji or a single lettle)"
                      name="icon"
                      placeholder={"Emoji"}
                      required={true}
                    />

                    <Row className="align-items-center text-center">
                      <Col>
                        <Button
                          className="px-5"
                          id="eventInfoButton"
                          type="submit"
                        >
                          {createLoading ? (
                            <Spinner
                              animation="border"
                              size="sm"
                              role="status"
                            ></Spinner>
                          ) : (
                            "Save Category"
                          )}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </Layout>
  );
}

export default CreateCategory;
