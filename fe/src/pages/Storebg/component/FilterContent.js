import React from "react";
import { NavLink } from "react-router-dom";

import { FiFilter } from "react-icons/fi";
const Filtercontent = () => {
  return (
    <div>
      <div className="d-flex justify-content-end ">
        {/* <button
          className="background-storebg-data-right-sort me-4"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <FiFilter />
          排序
        </button> */}
        <NavLink
          type="button"
          className="btn btn-warning mx-3 text-white rounded-pill"
          to="/newproduct"
        >
          新增商品
        </NavLink>
        {/* <ul className="dropdown-menu background-storebg-data-right-sort-options">
          <li>
            <button>價格高到低</button>
          </li>
          <li>
            <button>價格低到高</button>
          </li>
          <li>
            <button>數量多到少</button>
          </li>
          <li>
            <button>數量少到多</button>
          </li>
        </ul> */}
      </div>
    </div>
  );
};

export default Filtercontent;
