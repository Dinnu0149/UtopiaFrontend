import React from "react";
import Pagination from "react-bootstrap/Pagination";

function Paginator({ currentPage, totalItems, itemsPerPage, onPageChange }) {
  const validItemsPerPage = itemsPerPage > 0 ? itemsPerPage : 1;
  const validTotalItems = totalItems > 0 ? totalItems : 0;

  const totalPages = Math.ceil(validTotalItems / validItemsPerPage);
  const validCurrentPage = Math.min(
    Math.max(currentPage, 1),
    totalPages
  ); 

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  if (totalPages === 0) {
    return null;
  }

  const getPageRange = () => {
    const rangeSize = 3; 
    const halfRange = Math.floor(rangeSize / 2);

    let startPage = Math.max(1, validCurrentPage - halfRange);
    let endPage = Math.min(totalPages, startPage + rangeSize - 1);

    if (endPage - startPage < rangeSize - 1) {
      startPage = Math.max(1, endPage - rangeSize + 1);
    }

    return { startPage, endPage };
  };

  const { startPage, endPage } = getPageRange();

  return (
    <Pagination>
      <Pagination.First
        onClick={() => handlePageChange(1)}
        disabled={validCurrentPage === 1}
      />
      <Pagination.Prev
        onClick={() => handlePageChange(validCurrentPage - 1)}
        disabled={validCurrentPage === 1}
      />
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
        const page = startPage + index;
        return (
          <Pagination.Item
            key={page}
            active={page === validCurrentPage}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Pagination.Item>
        );
      })}
      <Pagination.Next
        onClick={() => handlePageChange(validCurrentPage + 1)}
        disabled={validCurrentPage === totalPages}
      />
      <Pagination.Last
        onClick={() => handlePageChange(totalPages)}
        disabled={validCurrentPage === totalPages}
      />
    </Pagination>
  );
}

export default Paginator;
