import React, { useState, useEffect, useCallback } from "react";
import { Col, Row, Card, Form, Button, Spinner } from "react-bootstrap";
import "../../../../styles/main.scss";
import Layout from "../../../../components/Layouts/Layout";
import PageHeader from "../../../../components/Header/PageHeader";
import DetailBackground from "../../../../sub-components/Event/DetailBackground";
import EditEventNavigation from "../../../../sub-components/Event/EditEventNavigation";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getEventDetail,
  editEvent,
  clearEventResponse,
  deleteEvent,
} from "../../../../actions/eventActions";
import { getCategorys } from "../../../../actions/categoryActions";
import ActionPopUp from "../../../../components/Popups/ActionPopUp";
import { displayMessage } from "../../../../actions/messageActions";

const FormInput = ({
  label,
  name,
  value,
  onChange,
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
        value={value}
        onChange={onChange}
        rows={rows}
      />
    </Col>
  </Row>
);

function EventInfoEdit() {
  const navigate = useNavigate();
  const { pk } = useParams();
  const dispatch = useDispatch();
  const {
    detailLoading,
    detailError,
    detailResponse,
    editResponse,
    editLoading,
    editError,
    deleteResponse,
    deleteError,
  } = useSelector((state) => state.event);

  const {
    response: getCategoryResponse,
    error: getCategoryError,
    loading: getCategoryLoading,
  } = useSelector((state) => state.category);

  const { results: categories = [] } = getCategoryResponse;

  const [deletePop, setDeletePop] = useState(false);
  const [popupStyle, setPopupStyle] = useState({});
  const [editedFormData, setEditedFormData] = useState({
    name: "",
    description: "",
    category: "",
    total_ticket: "",
    total_speaker: "",
    display_price: "",
    purchase_dead_line: "",
  });

  useEffect(() => {
    dispatch(getEventDetail(pk));
  }, [dispatch, pk]);

  useEffect(() => {
    dispatch(getCategorys());
  }, [dispatch]);

  useEffect(() => {
    if (detailResponse) {
      setEditedFormData({
        name: detailResponse.name || "",
        description: detailResponse.description || "",
        total_ticket: detailResponse.total_ticket || "",
        total_speaker: detailResponse.total_speaker || "",
        display_price: detailResponse.display_price || "",
        category: detailResponse.category_detail?.pk || "",
        purchase_dead_line: detailResponse.purchase_dead_line || "",
      });

    }
  }, [detailResponse]);

  useEffect(() => {
    if (editResponse || editError) {
      const messageInfo = editResponse
        ? "Info updated successfully!"
        : editError;
      const messageColor = editResponse ? "bg-success" : "bg-danger";
      dispatch(displayMessage(messageInfo, messageColor));
      dispatch(clearEventResponse());
    }
  }, [editResponse, editError, dispatch]);

  useEffect(() => {
    if (deleteResponse) {
      navigate("/Events", {
        state: { message: "Event deleted successfully!" },
      });
    } else if (deleteError) {
      dispatch(displayMessage(deleteError, "bg-danger"));
    }
  }, [deleteError, deleteResponse]);

  useEffect(() => {
    if (detailError) {
      navigate("/Events", { state: { message: "detailError" } });
    }
  }, [detailError]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(editEvent(pk, editedFormData));
  };

  const handleEventDelete = () => {
    dispatch(deleteEvent(pk));
    setDeletePop(!deletePop);
  };

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setEditedFormData((prevData) => ({ ...prevData, [name]: value }));
    },
    [setEditedFormData]
  );

  const handleActionPop = (e) => {
    const rect = e.target.getBoundingClientRect();
    setPopupStyle({
      left: `${rect.left + window.scrollX}px`,
    });
    setDeletePop(!deletePop);
  };

  return (
    <Layout
      dataLoading={detailLoading}
    >
      <section className="mx-3">
        <PageHeader title="Edit Event Detail" />
        <Row className="mb-4">
          <DetailBackground image={detailResponse.image}/>
          <EditEventNavigation />
        </Row>

        <Row className="mb-3">
          <Col xl={4} lg={4} md={3} xs={12}>
            <div className="mb-4 mb-lg-0">
              <h5 className="mb-1 fw-bold">General Info</h5>
              <p className="mb-0">Profile configuration settings</p>
            </div>
          </Col>
          <Col xl={7} lg={8} md={9} sm={12} xs={12}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <Form onSubmit={handleEditSubmit}>
                  <h5 className="mb-1">Event Information</h5>

                  <FormInput
                    label="Title"
                    name="name"
                    value={editedFormData.name}
                    onChange={handleChange}
                  />
                  <FormInput
                    label="Description"
                    name="description"
                    value={editedFormData.description}
                    onChange={handleChange}
                    as="textarea"
                    rows={4}
                  />
                  <Row className="mb-4">
                    <Col md={4} xs={12}>
                      <Form.Label className="col-sm-4" htmlFor="phone">
                        Category
                      </Form.Label>
                    </Col>

                    <Col md={8} xs={12}>
                      <Form.Select
                        name="category"
                        required
                        value={editedFormData.category}
                        onChange={handleChange}
                      >
                        {categories.length ? (
                          categories.map((category) => (
                            <option value={category.pk} key={category.pk}>
                              {`${category.name}`}
                            </option>
                          ))
                        ) : getCategoryError ? (
                          <option> Error getting categories</option>
                        ) : getCategoryLoading ? (
                          <option> Loading categories...</option>
                        ) : (
                          <option> No category avaliable</option>
                        )}
                      </Form.Select>
                    </Col>
                  </Row>
                  <FormInput
                    type="number"
                    label="Total Ticket"
                    name="total_ticket"
                    placeholder={"Number of tickets avalible"}
                    required={true}
                    value={editedFormData.total_ticket}
                    onChange={handleChange}
                  />
                  <FormInput
                    type="number"
                    label="Total Speaker"
                    name="total_speaker"
                    placeholder={"Number of speakers avalible"}
                    required={true}
                    value={editedFormData.total_speaker}
                    onChange={handleChange}
                  />
                  <FormInput
                    type="number"
                    label="Display Price"
                    name="display_price"
                    placeholder={"Price to display in summary"}
                    required={true}
                    value={editedFormData.display_price}
                    onChange={handleChange}
                  />
                      <FormInput
                      label="Purchase Dead Line"
                      name="purchase_dead_line"
                      type="date"
                      required={true}
                      value={editedFormData.purchase_dead_line}
                      onChange={handleChange}
                    />
                  <Row className="align-items-center text-center">
                    <Col>
                      <Button className="px-5" type="submit">
                        {editLoading ? (
                          <Spinner animation="border" size="sm" role="status" />
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5 mb-5">
          <Col xl={4} lg={4} md={3} xs={12}>
            <div className="mb-4 mb-lg-0">
              <h5 className="mb-1 fw-bold">Delete Event</h5>
              <p className="mb-0 ">Profile configuration settings </p>
            </div>
          </Col>
          <Col xl={7} lg={8} md={9} sm={12} xs={12}>
              <ActionPopUp
                actionFunc={() => handleEventDelete()}
                title={"Delete"}
                message="Are you sure you want to delete event"
                cancleFunc={() => setDeletePop(null)}
                postionStyle={popupStyle}
                isVisible={deletePop}
              />
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <div className="mb-4">
                  <h5 className="mb-1 fw-bold">Danger Zone</h5>
                </div>
                <Form>
                  <div>
                    <div className="mb-3">
                      <p className="mb-1">
                        Delete any and all content you have in this event, this
                        action can't be reversed.
                      </p>
                    </div>
                    <Row>
                      <Col>
                        <Button onClick={handleActionPop} className="bg-danger">
                          Delete Event{" "}
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

export default EventInfoEdit;
