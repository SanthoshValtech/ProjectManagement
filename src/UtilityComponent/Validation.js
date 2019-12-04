import React from "react";
import { Pagination as ReactPagination } from "react-bootstrap";
// import { Pagination as pagination } from "reactstrap";

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
    <nav>
      <ul className="pagination justify-content-end pagination-sm">
        <li type="text" className="mr-5">
          Showing {recordsPerPage} of {totalRecords}
        </li>
        <li>
          {" "}
          <button
            type="button"
            className="page-link"
            onClick={() => paginate(1)}
          >
            First
          </button>
        </li>
        <li className={(currentPage === 1 ? "disabled " : " ") + "page-item"}>
          {" "}
          <button
            type="button"
            className="page-link"
            aria-label="Previous"
            tabIndex="-1"
            onClick={() => paginate(currentPage - 1)}
          >
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </button>
        </li>
        {pageNumbers.map(number => (
          <li
            key={number}
            className={(currentPage === number ? "active " : " ") + "page-item"}
          >
            {/* <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a> */}
            <button
              type="button"
              className="page-link"
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </li>
        ))}
        <li
          className={
            (currentPage === pageNumbers.length ? "disabled " : " ") +
            "page-item"
          }
        >
          {" "}
          <button
            type="button"
            className="page-link"
            aria-label="Next"
            tabIndex="-1"
            onClick={() => paginate(currentPage + 1)}
          >
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </button>
        </li>
        <li>
          {" "}
          <button
            type="button"
            className="page-link"
            onClick={() => paginate(pageNumbers.length)}
          >
            Last
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
