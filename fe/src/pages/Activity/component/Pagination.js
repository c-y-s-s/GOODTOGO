import React from "react";

const Pagination = () => {
  return (
    <div>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <nav
            aria-label="Page navigation example m-auto "
            className="background-storebg-data-right-content-pages"
          >
            <ul className="pagination justify-content-between">
              <li className="page-item">
                <a className="page-link" href="#/" aria-label="Previous">
                  <span aria-hidden="true">&lt; 上一篇</span>
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#/" aria-label="Next">
                  <span aria-hidden="true">下一篇 &gt;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
