import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import "../../styles/main.scss";
import NonAvailable from "../../components/Loading/NonAvailable";
import { formatCurrency } from "../../utils/HelperFunc";
import transactionIllustration from "../../assets/images/illustrations/transaction.png";

function TransactionCard({ transactions }) {
  return (
    <Card className="border-0 shadow cardException">
      <Card.Body>
        <Card.Title as="h6">Transactions</Card.Title>
        {transactions && transactions.length > 0 ? (
          transactions.map((transaction, index) => {
            return (
              <Row
                className="d-flex justify-content-between align-items-center mb-4"
                key={index}
              >
                <Col>
                  <div className="d-flex align-items-center gap-2">
                    <i className="fa-solid fa-money-bill-transfer fs-3 text-success"></i>
                    <div>
                      <h5 className="mb-0">
                        &#8358;
                        {formatCurrency(Number(transaction.amount), true)}
                      </h5>
                      <p className="mb-0">{transaction.type}</p>
                    </div>
                  </div>
                </Col>
                <Col className="">
                  <span
                    className={`badge w-100  p-2 text-capitalize ${
                      transaction.status === "pending"
                        ? "bg-warning"
                        : transaction.status === "completed"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </Col>
              </Row>
            );
          })
        ) : (
          <NonAvailable message="Sorry transaction not avaliable" imageSrc={transactionIllustration}/>
        )}
      </Card.Body>
      <Card.Footer className="bg-white text-center">
        <Link to={"/Transactions"} className="link-primary">
          View All Transactions
        </Link>
      </Card.Footer>
    </Card>
  );
}

export default TransactionCard;
