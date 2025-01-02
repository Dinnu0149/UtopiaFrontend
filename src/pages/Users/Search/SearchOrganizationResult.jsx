import React, { useEffect } from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import "../../../styles/main.scss";
import styles from "../User.module.scss";
import Layout from "../../../components/Layouts/Layout";
import PageHeader from "../../../components/Header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { displayMessage } from "../../../actions/messageActions";
import SearchInputNavigate from "../../../sub-components/Search/SearchInputNavigate";
import NonAvailable from "../../../components/Loading/NonAvailable";
import orgainzationIllustration from "../../../assets/images/illustrations/orgainzation.png";
import { NavLink } from "react-router-dom";
import user from "../../../assets/images/icon/user.png";

function SearchOrganizationResult() {
  const dispatch = useDispatch();
  const { loading, error, response } = useSelector((state) => state.search);

  const { organizations = [] } = response || [];

  useEffect(() => {
    if (error) {
      dispatch(displayMessage(error, "bg-danger"));
    }
  }, [error]);

  return (
    <Layout dataLoading={loading}>
      <section className="mx-3">
        <PageHeader title="Search" />
        <SearchInputNavigate />

        <Row className={`mt-4 ${styles["SearchOrganizationContainer"]}`}>
          {organizations && organizations.length > 0 ? (
            organizations.map((organization) => (
              <Col lg={4} className="mb-2" key={organization.pk}>
                <Row className="mb-3 d-flex justify-content-between align-content-between">
                  <Col
                    as={NavLink}
                    to={`/organization/profile/${organization.owner?.pk}`}
                    md={8}
                    xs={7}
                    className="d-flex gap-1 align-content-center align-items-center"
                  >
                    <Image
                      src={
                        organization.owner?.profile_picture
                          ? organization.owner?.profile_picture
                          : user
                      }
                      roundedCircle
                      className={styles["organizerImg"]}
                    />
                    <div className="ms-2">
                      <h5 className="m-0 p-0">{organization.name}</h5>
                      <p className="m-0 p-0">{organization.owner?.email}</p>
                    </div>
                  </Col>
                  <Col
                    className={`d-flex gap-3 justify-content-end align-content-end align-items-center ${styles["organizerInfo"]}`}
                  >
                    <Button className="btn_reverse rounded-pill" type="button">
                      {organization.is_following
                        ? "Following"
                        : "Not following"}
                    </Button>
                  </Col>
                </Row>
              </Col>
            ))
          ) : (
            <NonAvailable
              message="No Organization Search Result Available"
              imageSrc={orgainzationIllustration}
            />
          )}
        </Row>
      </section>
    </Layout>
  );
}

export default SearchOrganizationResult;
