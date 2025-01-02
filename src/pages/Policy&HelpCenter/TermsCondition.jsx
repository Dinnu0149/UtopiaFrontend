import React from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./Policy.module.scss";
import "../../styles/main.scss";
import Layout from "../../components/Layouts/Layout";
import PageHeader from "../../components/Header/PageHeader";

function TermsCondition() {
  return (
    <Layout dataLoading={false}>
      <section className="mx-3">
        <PageHeader title={"Privacy Policy"} />

        <Row className="mb-3">
          <Col xl={12}>
            <h5 className={`${styles["headerText"]} fs-6 fw-bold`}>
              Cancelation Policy
            </h5>
          </Col>

          <Col xl={12}>
            <p className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              maxime alias perspiciatis, odio doloremque eveniet laudantium
              assumenda eius, esse maiores fugit cumque dicta incidunt similique
              numquam nesciunt modi nobis dolore expedita! Asperiores, mollitia
              ut. Dolorum itaque aliquam magnam quam consequuntur, accusamus
              consequatur ex, repudiandae eaque voluptate, doloribus eum
              temporibus inventore!
            </p>
            <p>
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione
              et odio similique sed, harum sint ullam, quas iure cumque, hic
              quis consequuntur laudantium deleniti? Assumenda adipisci
              consequuntur reprehenderit libero facilis?
            </p>
          </Col>
        </Row>

        <Row>
          <Col xl={12}>
            <h5 className={`${styles["headerText"]} fs-6 fw-bold`}>
              Terms & Condition
            </h5>
          </Col>

          <Col xl={12}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur numquam, asperiores deleniti delectus totam maiores
              aliquid porro dolores corporis blanditiis, debitis esse, animi
              nostrum. Aliquam voluptatem laudantium repellendus maiores
              praesentium. Suscipit inventore officiis facere, aliquam, magni
              temporibus vitae perspiciatis, voluptates dignissimos dolorum odit
              officia. Doloremque deserunt culpa nemo consequatur voluptate quia
              aut repudiandae architecto impedit aliquam ex eaque consequuntur
              iure, harum, natus quos fugit numquam magnam voluptatem! Error, ut
              tempora. Dolorum qui deserunt distinctio esse corrupti commodi
              aliquam exercitationem numquam ratione. Sit porro possimus dolore
              voluptas sunt nobis
            </p>
            <p>
              mollitia explicabo iusto quod, dicta facere perspiciatis inventore
              id! Quisquam praesentium temporibus dicta exercitationem
              repudiandae nam tempora vitae facere impedit, rerum facilis a
              veritatis, pariatur illum sit, soluta ea cumque corporis accusamus
              quo! Labore, debitis. Aliquid laudantium cupiditate perspiciatis
              odio, non dolorum sunt nisi facilis quas, dignissimos expedita
              numquam ab architecto excepturi! Nesciunt iure nulla nam omnis
              neque delectus numquam a ducimus accusantium. Laborum, nihil
              provident. Illum rem impedit cupiditate, accusantium sapiente
              ipsum soluta architecto quos. Earum eos, officia quis quas porro
              ipsam! Dignissimos provident ea ipsam voluptas et cumque, aperiam,
              non optio adipisci deserunt rerum? Modi corrupti ex delectus cum
              consequatur ratione similique officiis iste in quae ducimus dicta,
              voluptates alias!
            </p>
            <p>
              mollitia explicabo iusto quod, dicta facere perspiciatis inventore
              id! Quisquam praesentium temporibus dicta exercitationem
              repudiandae nam tempora vitae facere impedit, rerum facilis a
              veritatis, pariatur illum sit, soluta ea cumque corporis accusamus
              quo! Labore, debitis. Aliquid laudantium cupiditate perspiciatis
              odio, non dolorum sunt nisi facilis quas, dignissimos expedita
              numquam ab architecto excepturi! Nesciunt iure nulla nam omnis
              neque delectus numquam a ducimus accusantium. Laborum, nihil
              provident. Illum rem impedit cupiditate, accusantium sapiente
              ipsum soluta architecto quos. Earum eos, officia quis quas porro
              ipsam! Dignissimos provident ea ipsam voluptas et cumque, aperiam,
              non optio adipisci deserunt rerum? Modi corrupti ex delectus cum
              consequatur ratione similique officiis iste in quae ducimus dicta,
              voluptates alias!
            </p>
            <p>
              mollitia explicabo iusto quod, dicta facere perspiciatis inventore
              id! Quisquam praesentium temporibus dicta exercitationem
              repudiandae nam tempora vitae facere impedit, rerum facilis a
              veritatis, pariatur illum sit, soluta ea cumque corporis accusamus
              quo! Labore, debitis. Aliquid laudantium cupiditate perspiciatis
              odio, non dolorum sunt nisi facilis quas, dignissimos expedita
              numquam ab architecto excepturi! Nesciunt iure nulla nam omnis
              neque delectus numquam a ducimus accusantium. Laborum, nihil
              provident. Illum rem impedit cupiditate, accusantium sapiente
              ipsum soluta architecto quos. Earum eos, officia quis quas porro
              ipsam! Dignissimos provident ea ipsam voluptas et cumque, aperiam,
              non optio adipisci deserunt rerum? Modi corrupti ex delectus cum
              consequatur ratione similique officiis iste in quae ducimus dicta,
              voluptates alias!
            </p>
            <p>
              mollitia explicabo iusto quod, dicta facere perspiciatis inventore
              id! Quisquam praesentium temporibus dicta exercitationem
              repudiandae nam tempora vitae facere impedit, rerum facilis a
              veritatis, pariatur illum sit, soluta ea cumque corporis accusamus
              quo! Labore, debitis. Aliquid laudantium cupiditate perspiciatis
              odio, non dolorum sunt nisi facilis quas, dignissimos expedita
              numquam ab architecto excepturi! Nesciunt iure nulla nam omnis
              neque delectus numquam a ducimus accusantium. Laborum, nihil
              provident. Illum rem impedit cupiditate, accusantium sapiente
              ipsum soluta architecto quos. Earum eos, officia quis quas porro
              ipsam! Dignissimos provident ea ipsam voluptas et cumque, aperiam,
              non optio adipisci deserunt rerum? Modi corrupti ex delectus cum
              consequatur ratione similique officiis iste in quae ducimus dicta,
              voluptates alias!
            </p>
          </Col>
        </Row>
      </section>
    </Layout>
  );
}

export default TermsCondition;
