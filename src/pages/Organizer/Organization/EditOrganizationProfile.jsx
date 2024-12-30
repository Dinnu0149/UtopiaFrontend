import React, { useState, useEffect } from "react";
import { Col, Row, Form, Card, Button, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "../../../styles/main.scss";
import Layout from "../../../components/Layouts/Layout";
import PageHeader from "../../../components/Header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrganizationProfile,
  editOrganizationProfile,
  getOrganizationWithdrawalInfo,
  updateOrganizationWithdrawalInfo,
  clearOrganizationUpdateResponse,
} from "../../../actions/organizationActions";
import { clearRedirectPath } from "../../../actions/redirectAction";
import banksData from "../../../data/nigeria_banks.json";
import { displayMessage } from "../../../actions/messageActions";

function EditOrganizationProfile() {
  const { owner_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const redirectPath = useSelector((state) => state.redirect);
  const {
    loading,
    response,
    error,
    editResponse,
    editLoading,
    editError,
    withdrawResponse,
    withdrawLoading,
    withdrawError,
    getWithdrawResponse,
    getWithdrawLoading,
    getWithdrawError,
  } = useSelector((state) => state.organization);

  const { name, about } = response ? response : [];
  const { bank_name, account_name, account_number } = getWithdrawResponse
    ? getWithdrawResponse
    : [];

  const [editedFormData, seteditedFormData] = useState({
    name: "",
    about: "",
  });
  
  const [withdrawalFormData, setwithdrawalFormData] = useState({
    bank_name: "",
    account_name: "",
    account_number: "",
  });

  useEffect(() => {
    dispatch(getOrganizationProfile(owner_id));
    dispatch(getOrganizationWithdrawalInfo());
  }, [dispatch]);

  useEffect(() => {
    if (response || getWithdrawResponse) {
      seteditedFormData({
        name: name || "",
        about: about || "",
      });

      setwithdrawalFormData({
        bank_name: bank_name || "",
        account_name: account_name || "",
        account_number: account_number || "",
      });
    }
  }, [response, getWithdrawResponse]);


  useEffect(() => {
    if (editResponse) {
      if (redirectPath && redirectPath.redirectPath) {
        navigate(redirectPath.redirectPath, {
          state: { message: "Organization updated successfully!" },
        });
        dispatch(clearRedirectPath());
      } else {
        navigate(`/OrganizationProfile/${owner_id}`, {
          state: { message: "Organization updated successfully!" },
        });
      }
    } else if (editError) {
      dispatch(displayMessage(editError, "bg-danger"));
    }
    dispatch(clearOrganizationUpdateResponse());
  }, [editResponse, editError, navigate, dispatch]);

  useEffect(() => {
    if (error || getWithdrawError) {
      dispatch(displayMessage(error || getWithdrawError, "bg-danger"));
    }
  }, [error, getWithdrawError]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(editOrganizationProfile(editedFormData, owner_id));
  };

  useEffect(() => {
    if (withdrawResponse || withdrawError) {
      const messageInfo = withdrawResponse
        ? "Withdrawal info updated successfully!"
        : withdrawError;
      const messageColor = withdrawResponse ? "bg-success" : "bg-danger";
      dispatch(displayMessage(messageInfo, messageColor));
    }
    dispatch(clearOrganizationUpdateResponse());
  }, [withdrawResponse, withdrawError, dispatch]);

  const handleResetForm = () => {
    seteditedFormData({
      name: name,
      about: about,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    seteditedFormData({
      ...editedFormData,
      [name]: value,
    });
  };

  const handleWithdrawalSubmit = (e) => {
    e.preventDefault();
    dispatch(updateOrganizationWithdrawalInfo(withdrawalFormData));
  };

  const handleWithdrawalResetForm = () => {
    setwithdrawalFormData({
      bank_name: bank_name,
      account_name: account_name,
      account_number: account_number,
    });
  };

  const handleWithdrawalChange = (e) => {
    const { name, value } = e.target;
    setwithdrawalFormData({
      ...withdrawalFormData,
      [name]: value,
    });
  };


  return (
    <Layout
      dataLoading={loading || getWithdrawLoading}
    >
      <section className="mx-3">
        <PageHeader title={"Edit Organization"} />
        <Row className="mb-5">
          <Col xl={4} lg={4} md={12} xs={12}>
            <div className="mb-4 mb-lg-0">
              <h5 className="mb-1 fw-bold">Organization Setting</h5>
              <p className="mb-0">Organization configuration settings </p>
            </div>
          </Col>
          <Col xl={8} lg={8} md={12} xs={12}>
            <Card>
              <Card.Body>
                <div className="mb-5">
                  <h5 className="mb-1">Organization Settings</h5>
                </div>

                <div>
                  <div className="mb-3">
                    <h5 className="mb-1">Basic information</h5>
                  </div>
                  <Form onSubmit={handleEditSubmit}>
                    <Row className="mb-4">
                      <Col md={4} xs={12}>
                        <Form.Label className="" htmlFor="about">
                          Organization Name
                        </Form.Label>
                      </Col>

                      <Col md={8} xs={12}>
                        <Form.Control
                          type="text"
                          placeholder="Name"
                          id="about"
                          name="name"
                          value={editedFormData.name}
                          onChange={handleChange}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-4">
                      <Col md={4} xs={12}>
                        <Form.Label className="" htmlFor="about">
                          About Organization
                        </Form.Label>
                      </Col>

                      <Col md={8} xs={12}>
                        <Form.Control
                          as={"textarea"}
                          rows={4}
                          placeholder="Enter Address line 2"
                          id="about"
                          name="about"
                          value={editedFormData.about}
                          onChange={handleChange}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button className="w-100" type="submit">
                          {editLoading ? (
                            <Spinner
                              animation="border"
                              size="sm"
                              role="status"
                            ></Spinner>
                          ) : (
                            "Save Changes"
                          )}
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          className="w-100 btn_reverse"
                          type="reset"
                          onClick={handleResetForm}
                        >
                          Reset Form
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col xl={4} lg={4} md={12} xs={12}>
            <div className="mb-4 mb-lg-0">
              <h5 className="mb-1 fw-bold">Withdrawal Setting</h5>
              <p className="mb-0">Organization account settings </p>
                <b className="text-danger">Note:</b>
                <ul>
                  <li className="text-danger">
                    Withdrawal settings are only available for organization
                    accounts.
                  </li>
                  <li className="text-danger">
                    Withdrawal account info isn't editable for security reason,
                    so be sure while applying info.
                  </li>
                </ul>
            </div>
          </Col>
          <Col xl={8} lg={8} md={12} xs={12}>
            <Card>
              <Card.Body>
                <div className="mb-5">
                  <h5 className="mb-1">Withdrawal Settings</h5>
                </div>

                <div>
                  <div className="mb-3">
                    <h5 className="mb-1">Account information</h5>
                  </div>
                  <Form onSubmit={handleWithdrawalSubmit}>
                    <Row className="mb-4">
                      <Col md={4} xs={12}>
                        <Form.Label className="" htmlFor="bank_name">
                          Bank Name
                        </Form.Label>
                      </Col>

                      <Col md={8} xs={12}>
                        <Form.Select
                          id="bank_name"
                          name="bank_name"
                          required
                          value={withdrawalFormData.bank_name}
                          onChange={handleWithdrawalChange}
                        >
                          <option>Select Bank</option>
                          {banksData.map((bank) => (
                            <option key={bank.id} value={bank.name}>
                              {bank.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                    <Row className="mb-4">
                      <Col md={4} xs={12}>
                        <Form.Label className="" htmlFor="account_name">
                          Account Name
                        </Form.Label>
                      </Col>

                      <Col md={8} xs={12}>
                        <Form.Control
                          type="text"
                          placeholder="Account Name"
                          id="account_name"
                          name="account_name"
                          value={withdrawalFormData.account_name}
                          onChange={handleWithdrawalChange}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-4">
                      <Col md={4} xs={12}>
                        <Form.Label className="" htmlFor="account_number">
                          Account Number
                        </Form.Label>
                      </Col>

                      <Col md={8} xs={12}>
                        <Form.Control
                          type="text"
                          placeholder="Account Number"
                          id="account_number"
                          name="account_number"
                          value={withdrawalFormData.account_number}
                          onChange={handleWithdrawalChange}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button className="w-100" type="submit">
                          {withdrawLoading ? (
                            <Spinner
                              animation="border"
                              size="sm"
                              role="status"
                            ></Spinner>
                          ) : (
                            "Save Changes"
                          )}
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          className="w-100 btn_reverse"
                          type="button"
                          onClick={handleWithdrawalResetForm}
                        >
                          Reset Form
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

export default EditOrganizationProfile;
