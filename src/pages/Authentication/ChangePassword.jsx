import React, { useEffect } from "react";
import { Col, Row, Form, Card, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../styles/main.scss";
import PageHeader from "../../components/Header/PageHeader";
import Layout from "../../components/Layouts/Layout";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordOpreation } from "../../actions/authActions";
import { displayMessage } from "../../actions/messageActions";

function ChangePassword() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    const old_password = e.target.old_password.value;
    const new_password = e.target.new_password.value;
    const comfirm_password = e.target.comfirm_password.value;
    const formData = {
      old_password: old_password,
      new_password: new_password,
    };

    if (new_password !== comfirm_password) {
      dispatch(displayMessage("Password do not match", "bg-danger"));
      return;
    }

    dispatch(changePasswordOpreation(formData));
  };

  useEffect(() => {
    if (authState.response) {
      navigate("/EditProfile", {
        state: { message: "Password reset successful!" },
      });
    } else if (authState.error) {
      dispatch(displayMessage(authState.error, "bg-danger"));
    }
  }, [authState]);


  return (
    <Layout
    >
      <section className="mx-3">
        <PageHeader title={"Change Password"} />
        <Row className="mb-5">
          <Col xl={4} lg={4} md={12} xs={12}>
            <div className="mb-4 mb-lg-0">
              <h5 className="mb-1 fw-bold">Password Setting</h5>
              <p className="mb-0">Profile configuration settings </p>
            </div>
          </Col>
          <Col xl={8} lg={8} md={12} xs={12}>
            <Card>
              <Card.Body>
                <div className="mb-4">
                  <h5 className="fw-bold">Password Settings</h5>
                </div>
                <Form onSubmit={handleChangePasswordSubmit}>
                  <div>
                    <div className="mb-3">
                      <h5 className="mb-1">Change Password</h5>
                    </div>

                    <Row className="mb-4">
                      <Col md={4} xs={12}>
                        <Form.Label className="" htmlFor="oldPassword">
                          Old Password
                        </Form.Label>
                      </Col>

                      <Col md={8} xs={12}>
                        <Form.Control
                          type="Password"
                          placeholder="*******"
                          id="oldPassword"
                          autoComplete="new-password"
                          name="old_password"
                          required
                        />
                      </Col>
                    </Row>

                    <Row className="mb-4">
                      <Col md={4} xs={12}>
                        <Form.Label className="" htmlFor="newPassword">
                          New Password
                        </Form.Label>
                      </Col>

                      <Col md={8} xs={12}>
                        <Form.Control
                          type="Password"
                          placeholder="******"
                          id="newPassword"
                          autoComplete="new-password"
                          name="new_password"
                          required
                        />
                      </Col>
                    </Row>

                    <Row className="mb-4">
                      <Col md={4} xs={12}>
                        <Form.Label className="" htmlFor="comfirmPassword">
                          Comfirm Password
                        </Form.Label>
                      </Col>

                      <Col md={8} xs={12}>
                        <Form.Control
                          type="Password"
                          placeholder="*******"
                          id="comfirmPassword"
                          autoComplete="new-password"
                          name="comfirm_password"
                          required
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button className="w-100" type="submit">
                          {authState.loading ? (
                            <Spinner
                              animation="border"
                              size="sm"
                              role="status"
                            ></Spinner>
                          ) : (
                            "Save Changes "
                          )}
                        </Button>
                      </Col>
                      <Col>
                        <Button className="w-100 btn_reverse">Back </Button>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </Layout>
  );
}

export default ChangePassword;
