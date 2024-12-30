import React from "react";
import { Card, Image, Row, Col } from "react-bootstrap";
import styles from "./Wallet.module.scss";
import "../../styles/main.scss";
import chip from "../../assets/images/icon/criditchip.png";
import { formatCurrency, truncateSentence } from "../../utils/HelperFunc";

function CreditCard({ wallet }) {
  return (
    <Card className={`${styles["creditCard"]} border-0 mx-4`}>
      <Card.Body className={"mx-3"}>
        <div className="d-flex justify-content-between align-items-center mb-5 mt-4">
          <div>
            <p className="p-0 m-0">Current Balance</p>
            {wallet ? (
              <h5 className="fw-bold fs-3 text-light">
                &#8358;{formatCurrency(Number(wallet.balance), true)}
              </h5>
            ) : (
              <h5 className="fw-bold fs-3 text-light">&#8358; 00.00</h5>
            )}
          </div>
          <Image src={chip} width={60} />
        </div>
        <Row className="d-flex justify-content-between align-items-center mt-5">
          <Col>
            <h5 className="text-light">
              {wallet.withdrawal_info?.account_number}
            </h5>
          </Col>
          <Col>
            <h5 className="text-light float-end">
              {wallet.withdrawal_info?.bank_name
                ? truncateSentence(wallet.withdrawal_info?.bank_name, 2)
                : "No Withdrawal Info"}
            </h5>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default CreditCard;
