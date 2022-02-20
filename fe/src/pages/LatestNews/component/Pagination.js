import React from "react";

const Pagination = () => {
  return (
    <div>
      <nav
        aria-label="Page navigation example m-auto "
        className="background-latestnews-data-right-content-pages"
      >
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a
              className="page-link rounded-circle border-0"
              href="#/"
              aria-label="Previous"
            >
              <span aria-hidden="true" className="aaa">&lt;</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link rounded-circle border-0" href="#/">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link rounded-circle border-0" href="#/">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link rounded-circle border-0" href="#/">
              3
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link rounded-circle border-0"
              href="#/"
              aria-label="Next"
            >
              <span aria-hidden="true">&gt;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
