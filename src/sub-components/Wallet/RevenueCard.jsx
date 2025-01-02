import React from "react";
import {Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Wallet.module.scss";
import "../../styles/main.scss";
import NonAvailable from "../../components/Loading/NonAvailable";
import { formatCurrency } from "../../utils/HelperFunc";


function RevenueCard({ revenues, redirectPath }) {
  return (
        <Card className="border-0 shadow-lg">
          <Card.Header className="bg-light py-3 ">
            <h6 className="mb-0">Event Revenues</h6>
          </Card.Header>
          {revenues && revenues.length > 0 ? (
            <Table
              hover
              responsive="sm"
              className={`${styles[""]} text-nowrap mb-0 table-border-0`}
            >
              <thead className="table-border-0">
                <tr>
                  <th scope="col">Event</th>
                  <th scope="col">Ticket Sold</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {revenues.map((revenue, index) => {
                  return (
                    <tr key={revenue.pk}>
                      <td className="">
                        <Link to={`/eventdetail/${revenue.event.pk}`}>
                          {revenue.event.event_name}
                        </Link>
                      </td>
                      <td className="">{revenue.tickets_sold}</td>
                      <td className="">&#8358;{formatCurrency(Number(revenue.amount), true)}</td>
                      <td className="">
                        <span className={`badge bg-success py-2`}>
                          {revenue.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <NonAvailable message="Sorry revenue not avaliable" />
          )}
          <Card.Footer className="bg-white text-center">
            <Link to={`/${redirectPath}`} className="link-primary">
              View All Revenue
            </Link>
          </Card.Footer>
        </Card>
  );
}

export default RevenueCard;
