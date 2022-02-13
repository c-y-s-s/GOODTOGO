import React from "react";

const Pagination = () => {
  return (
    <div>
      <nav
        aria-label="Page navigation example m-auto "
        className="background-storebg-data-right-content-pages"
      >
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link" href="#/" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#/">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#/">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#/">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#/" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
