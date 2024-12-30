import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import styles from "./Event.module.scss";
import "../../styles/main.scss";
import user from "../../assets/images/icon/user.png";


function EventSpeaker({speakers}) {
  return (
    <Row>
      <section
        className={`d-flex gap-4 scrollBarRemoval ${styles["speckerRowWrapper"]}`}
      >
        {speakers.map((speaker) => (
          <Col lg={4} md={9} sm={7} xs={9} key={speaker.pk}>
            <Card className={`border-0 bg-transparent rounded-5 shadow border ${styles['speackerCard']}`}>
            <div className={`${styles['overlayShadow']}`}></div>
              <Card.Img
                src={speaker.picture ? speaker.picture : ''}
                height={400}
                className=""
                alt="speaker image"
              />
              <Card.ImgOverlay className={`top-50 mt-5 ${styles['speakerTextOverLay']}`}>
                  <Card.Title as={'h6'} className="py-1">{`${speaker.first_name} ${speaker.last_name}`}</Card.Title>
                  <Card.Text as={'h5'}>Genere:{speaker.genre}</Card.Text>
                
              </Card.ImgOverlay>
            </Card>
          </Col>
        )
        )}
      </section>
    </Row>
  );
}

export default EventSpeaker;
