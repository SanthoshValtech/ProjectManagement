import React from "react";
import { Pagination as ReactPagination } from "react-bootstrap";

const Pagination = ({
  currentPage,
  recordsPerPage,
  totalRecords,
  paginate
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <ReactPagination className="pagination justify-content-end">
      <div type="text" className="mr-5 my-2">
        Showing {currentPage} of {pageNumbers.length}
      </div>
      <ReactPagination.First
        className={currentPage === 1 ? "disabled " : " "}
        onClick={() => paginate(1)}
      />
      <ReactPagination.Prev
        className={currentPage === 1 ? "disabled " : " "}
        onClick={() => paginate(currentPage - 1)}
      />
      {/* {pageNumbers.map(number => (
        <ReactPagination.Item
          key={number}
          className={currentPage === number ? "active " : " "}
          onClick={() => paginate(number)}
        >
          {number}
        </ReactPagination.Item>
      ))} */}
      <ReactPagination.Item
        className={currentPage === 1 ? "active " : " "}
        onClick={() => paginate(1)}
      >
        {1}
      </ReactPagination.Item>
      <ReactPagination.Ellipsis
        className={
          currentPage !== 1 && currentPage !== pageNumbers.length
            ? "active "
            : " "
        }
        onClick={() => paginate(currentPage + 1)}
      />
      <ReactPagination.Item
        className={currentPage === pageNumbers.length ? "active " : " "}
        onClick={() => paginate(pageNumbers.length)}
      >
        {pageNumbers.length}
      </ReactPagination.Item>
      <ReactPagination.Next
        className={currentPage === pageNumbers.length ? "disabled " : " "}
        onClick={() => paginate(currentPage + 1)}
      />
      <ReactPagination.Last
        className={currentPage === pageNumbers.length ? "disabled " : " "}
        onClick={() => paginate(pageNumbers.length)}
      />
    </ReactPagination>
  );
};

export default Pagination;
