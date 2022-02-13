import React from "react";
import { FiFilter } from "react-icons/fi";
const Filtercontent = () => {
  return (
    <div>
      <div className="d-flex justify-content-end ">
        <button
          className="background-storebg-data-right-sort me-4"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <FiFilter />
          排序
        </button>
        <button type="button" className="btn btn-warning mx-3 text-white rounded-pill">
            新增商品
          </button>
        <ul className="dropdown-menu background-storebg-data-right-sort-options">
          <li>
            <a href="#/">價格高到低</a>
          </li>
          <li>
            <a href="#/">價格低到高</a>
          </li>
          <li>
            <a href="#/">數量多到少</a>
          </li>
          <li>
            <a href="#/">數量少到多</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Filtercontent;
