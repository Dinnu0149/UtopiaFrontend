import React from "react";
import { Container } from "react-bootstrap";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

function ShareEvent({ pk, name }) {
  const shareUrl = `${window.location.origin}/eventdetail/${pk}`;
  const title = `Check out this event: ${name}`;

  return (
    <Container className="d-flex gap-2 position-absolute z-3 top-20 bottom-50">
      <FacebookShareButton url={shareUrl} quote={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <WhatsappShareButton url={shareUrl} title={title} >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </Container>
  );
}

export default ShareEvent;
