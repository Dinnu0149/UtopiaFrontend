import React, { useState, useEffect } from "react";
import { Col, Row, Form, Card, Button, Spinner } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/main.scss";
import Layout from "../../components/Layouts/Layout";
import PageHeader from "../../components/Header/PageHeader";
import ActionPopUp from "../../components/Popups/ActionPopUp";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfile,
  editUserProfile,
  clearUpdateResponse,
  deleteUserProfile,
} from "../../actions/profileActions";
import statesData from "../../data/nigeria_states.json";
import { displayMessage } from "../../actions/messageActions";

function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.profile);

  const { loading, response, error, editResponse, editLoading, editError } =
    profileState;
  const {
    username,
    last_name,
    first_name,
    city,
    state,
    phone,
    profile_picture,
    Address: address,
  } = response || [];

  const [deletePop, setDeletePop] = useState(false);
  const [popupStyle, setPopupStyle] = useState({});
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);

  const [editedFormData, seteditedFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    phone: "",
    Address: "",
    state: "",
    city: "",
    profile_picture: "",
  });

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  useEffect(() => {
    if (response) {
      seteditedFormData({
        first_name: first_name || "",
        last_name: last_name || "",
        username: username || "",
        state: state || "",
        city: city || "",
        Address: address || "",
        phone: phone || "",
        profile_picture: profile_picture || "",
      });

      const stateData = statesData.find(
        (stateData) => stateData.name === state
      );
      setCities(stateData ? stateData.cities : []);
    }
  }, [response]);

  useEffect(() => {
    if (editResponse) {
      navigate("/Profile", {
        state: { message: "Profile updated successfully!" },
      });

      dispatch(clearUpdateResponse());
    } else if (editError) {
      dispatch(displayMessage(editError, "bg-danger"));
    }
  }, [editResponse, editError, navigate, dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(displayMessage(error, "bg-danger"));
    }
  }, [error]);

  const handleDelete = () => {
    dispatch(deleteUserProfile());
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formSubmitData = new FormData();
    formSubmitData.append("first_name", editedFormData.first_name);
    formSubmitData.append("last_name", editedFormData.last_name);
    formSubmitData.append("username", editedFormData.username);
    formSubmitData.append("state", editedFormData.state);
    formSubmitData.append("city", editedFormData.city);
    formSubmitData.append("Address", editedFormData.Address);
    formSubmitData.append("phone", editedFormData.phone);
    if (e.target.profile_picture.files[0]) {
      formSubmitData.append("profile_picture", editedFormData.profile_picture);
    }

    dispatch(editUserProfile(formSubmitData));
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    seteditedFormData((prevValues) => ({
      ...prevValues,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleStateChange = (e) => {
    const stateName = e.target.value;
    setSelectedState(stateName);
    seteditedFormData({
      ...editedFormData,
      state: stateName,
    });

    const stateData = statesData.find(
      (stateData) => stateData.name === stateName
    );
    setCities(stateData ? stateData.cities : []);
  };

  const handleActionPop = (e) => {
    const rect = e.target.getBoundingClientRect();
    setPopupStyle({
      left: `${rect.left + window.scrollX}px`,
    });
    setDeletePop(!deletePop);
  };

  return (
    <Layout
      dataLoading={loading}
    >
      <section className="mx-3">
        <PageHeader title={"Edit Profile"} />
        <Row className="mb-5">
          <Col xl={4} lg={4} md={12} xs={12}>
            <div className="mb-4 mb-lg-0">
              <h5 className="mb-1 fw-bold">General Setting</h5>
              <p className="mb-0">Profile configuration settings </p>
            </div>
          </Col>
          <Col xl={8} lg={8} md={12} xs={12}>
            <Card>
              {/* card body */}
              <Card.Body>
                <div className="mb-5">
                  <h5 className="mb-1">General Settings</h5>
                </div>

                <div>
                  <div className="mb-3">
                    <h5 className="mb-1">Basic information</h5>
                  </div>
                  <Form onSubmit={handleEditSubmit}>
                    <Row className="mb-4">
                      <Col md={4} xs={12}>
                        <Form.Label className="" htmlFor="firstName">
                          Full name
                        </Form.Label>
                      </Col>

                      <Col md={8} xs={12}>
                        <Row>
                          <Col>
                            <Form.Control
                              type="text"
                              placeholder="First Name"
                              id="firstName"
                              name="first_name"
                              value={editedFormData.first_name}
                              onChange={handleChange}
                            />
                          </Col>
                          <Col>
                            <Form.Control
                              type="text"
                              placeholder="Last Name"
                              name="last_name"
                              value={editedFormData.last_name}
                              onChange={handleChange}
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <Row className="mb-4">
                      <Col md={4} xs={12}>
                        <Form.Label className="col-sm-4" htmlFor="username">
                          Username
                        </Form.Label>
                      </Col>

                      <Col md={8} xs={12}>
                        <Form.Control
                          type="text"
                          placeholder="Username"
                          id="username"
                          name="username"
                          value={editedFormData.username}
                          onChange={handleChange}
                        />
                      </Col>
                    </Row>

                    <Row className="mb-4">
                      <Col md={4} xs={12}>
                        <Form.Label className="col-sm-4" htmlFor="phone">
                          Phone
                        </Form.Label>
                      </Col>

                      <Col md={8} xs={12}>
                        <Form.Control
                          value={editedFormData.phone}
                          name="phone"
                          type="text"
                          placeholder="Phone Number"
                          id="phone"
                          onChange={handleChange}
                        />
                      </Col>
                    </Row>

                    <Row className="mb-4">
                      <Col md={4} xs={12}>
                        <Form.Label className="" htmlFor="state">
                          Location
                        </Form.Label>
                      </Col>

                      <Col md={8} xs={12}>
                        <Row>
                          <Col>
                            <Form.Select
                              id="state"
                              name="state"
                              required
                              value={editedFormData.state}
                              onChange={handleStateChange}
                            >
                              <option>Select State</option>
                              {statesData.map((state) => (
                                <option key={state.name} value={state.name}>
                                  {state.name}
                                </option>
                              ))}
                            </Form.Select>
                          </Col>
                          <Col>
                            <Form.Select
                              id="city"
                              name="city"
                              required
                              value={editedFormData.city}
                              onChange={handleChange}
                            >
                              <option>Select City</option>
                              {cities.map((city, index) => (
                                <option key={index} value={city}>
                                  {city}
                                </option>
                              ))}
                            </Form.Select>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    {/* Address Line Two */}
                    <Row className="mb-3">
                      <Form.Label className="col-sm-4" htmlFor="addressLineTwo">
                        Address
                      </Form.Label>
                      <Col md={8} xs={12}>
                        <Form.Control
                          value={editedFormData.Address}
                          required
                          as={"textarea"}
                          rows={4}
                          placeholder="Enter Address line 2"
                          id="addressLineTwo"
                          onChange={handleChange}
                          name="Address"
                        />
                      </Col>
                    </Row>

                    {/* Zip code */}
                    <Row className="align-items-center mb-5">
                      <Form.Label
                        className="col-sm-4"
                        htmlFor="profile_picture"
                      >
                        Cover Photo
                      </Form.Label>

                      <Col md={8} xs={12}>
                        <Form.Control
                          required={
                            editedFormData.profile_picture ? false : true
                          }
                          id="profile_picture"
                          name="profile_picture"
                          type="file"
                          accept={"image/*"}
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
                          as={NavLink}
                          to={"/ChangePassword"}
                          className="w-100 btn_reverse"
                        >
                          Change Password{" "}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
          <ActionPopUp
            actionFunc={handleDelete}
            title={"Delete"}
            message="Are you sure you want to delete account"
            cancleFunc={() => setDeletePop(null)}
            postionStyle={popupStyle}
            isVisible={deletePop}
          />

        <Row className="mb-5">
          <Col xl={4} lg={4} md={12} xs={12}>
            <div className="mb-4 mb-lg-0">
              <h5 className="mb-1 fw-bold">Delete Account</h5>
              <p className="mb-0 ">Profile configuration settings </p>
            </div>
          </Col>
          <Col xl={8} lg={8} md={12} xs={12}>
            <Card>
              <Card.Body>
                <div className="mb-4">
                  <h5 className="mb-1 fw-bold">Danger Zone</h5>
                </div>
                <Form>
                  <div>
                    <div className="mb-3">
                      <p className="mb-1">
                        Delete any and all content you have, such as articles,
                        comments, your reading list or chat messages. Allow your
                        username to become available to anyone.
                      </p>
                    </div>
                    <Row>
                      <Col>
                        <Button onClick={handleActionPop} className="bg-danger">
                          Delete Account{" "}
                        </Button>
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

export default EditProfile;
