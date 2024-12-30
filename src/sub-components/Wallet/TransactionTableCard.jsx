import React from 'react'
import {Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Wallet.module.scss";
import "../../styles/main.scss";
import NonAvailable from "../../components/Loading/NonAvailable";
import { formatCurrency } from '../../utils/HelperFunc';
import transactionIllustration from "../../assets/images/illustrations/transaction.png";

function TransactionTableCard({ transactions, redirectPath }) {
  return (
    <Card className="border-0 shadow-lg">
    <Card.Header className="bg-light py-3 ">
      <h6 className="mb-0">User Transactions</h6>
    </Card.Header>
    {transactions && transactions.length > 0 ? (
      <Table
        hover
        responsive="sm"
        className={`${styles[""]} text-nowrap mb-0 table-border-0`}
      >
        <thead className="table-border-0">
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Amount</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            return (
              <tr key={transaction.pk}>
                <td className="">{transaction.type}</td>
                <td className="">&#8358;{formatCurrency(Number(transaction.amount), true)}</td>
                <td className="">
                  <span className={`badge bg-success py-2`}>
                    {transaction.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    ) : (
      <NonAvailable message="Sorry transactions not avaliable" imageSrc={transactionIllustration}/>
    )}
    <Card.Footer className="bg-white text-center">
      <Link to={`/${redirectPath}`} className="link-primary">
        View All Transactions
      </Link>
    </Card.Footer>
  </Card>
  )
}

export default TransactionTableCard