import React from 'react'
import { FiFilter } from "react-icons/fi";
const Filtercontent = () => {
  return (
    <div>
      <div className="d-flex justify-content-end ">
        <button
          class="background-admin-data-right-sort me-4"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <FiFilter />
          排序
        </button>
        <ul class="dropdown-menu background-admin-data-right-sort-options">
          <li>
            <a href="#">申請日期</a>
          </li>
          <li>
            <a href="#">店家名稱</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Filtercontent