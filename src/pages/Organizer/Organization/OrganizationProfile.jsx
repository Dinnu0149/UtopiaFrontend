import React, { useState, useEffect } from "react";
import "../../../styles/main.scss";
import { useParams } from "react-router-dom";
import Layout from "../../../components/Layouts/Layout";
import PageHeader from "../../../components/Header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { getOrganizationProfile } from "../../../actions/organizationActions";
import OrganizationBackgroundCard from "../../../sub-components/Organization/OrganizationBackgroundCard";
import { displayMessage } from "../../../actions/messageActions";

function OrganizationProfile() {
  const { owner_id } = useParams();
  const dispatch = useDispatch();

  const { response, loading, error } = useSelector((state) => state.organization);
  
  useEffect(() => {
    dispatch(getOrganizationProfile(owner_id));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(displayMessage(error, "bg-danger"));
    }
  }, [error]);

  return (
    <Layout
      dataLoading={loading}
    >
      <section className="mx-3">
        <PageHeader title="Organization" />

        <OrganizationBackgroundCard organization={response} />
      </section>
    </Layout>
  );
}

export default OrganizationProfile;
