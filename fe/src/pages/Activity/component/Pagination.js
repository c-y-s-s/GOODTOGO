import React from "react";

const Pagination = () => {
  return (
    <div>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <nav
            aria-label="Page navigation example m-auto "
            className="background-activity-data-right-content-pages"
          >
            <ul className="pagination justify-content-between">
              <li className="page-item">
                <a
                  className="page-link  border-0"
                  href="#/"
                  aria-label="Previous"
                >
                  &lt; 上一篇
                </a>
              </li>
              <li className="page-item">
                <a className="page-link  border-0" href="#/" aria-label="Next">
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
