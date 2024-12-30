import React, { useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import styles from "./Filter.module.scss";
import "../../styles/main.scss";

function Filter({ filters, sorts, onFilterChange }) {
  const [filterValues, setFilterValues] = useState({});
  const [sortValue, setSortValue] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilterValues({ ...filterValues, [name]: value });
    onFilterChange({ ...filterValues, [name]: value });
  };

  const handleSortChange = (e) => {
    const { value } = e.target;
    setSortValue(value);
    onFilterChange({ ...filterValues, sort: value });
  };

  return (
    <Row className={`${styles["filterRow"]} mb-2`}>
      {filters.map((filter) => (
        <Col key={filter.name} className={`${styles[""]}`}>
          {filter.type === "text" && (
            <Form.Control
              type="search"
              id={filter.name}
              name={filter.name}
              placeholder={filter.placeholder}
              value={filterValues[filter.name] || ""}
              onChange={handleInputChange}
              className={`${styles[""]} `}
            />
          )}

          {filter.type === "select" && (
            <Form.Select
              id={filter.name}
              name={filter.name}
              value={filterValues[filter.name] || ""}
              onChange={handleInputChange}
            >
              <option value="">Filter</option>
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          )}
        </Col>
      ))}

      <Col>
        <Form.Select
          id="sort"
          name="sort"
          value={sortValue}
          onChange={handleSortChange}
          className={`${styles["selectSort"]}`}
        >
          <option value="">Sort By</option>
          {sorts.map((sort) => (
            <option key={sort.value} value={sort.value}>
              {sort.label}
            </option>
          ))}
        </Form.Select>
      </Col>
    </Row>
  );
}

export default Filter;
