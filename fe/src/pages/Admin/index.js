import React from "react";

import LeftNav from "./component/LeftNav";
import TopNav from "./component/TopNav";
import FilterContent from "./component/FilterContent";
import PenCount from "./component/PenCount";
import Table from "./component/Table";
import Pagination from "./component/Pagination";
const Admin = () => {
  return (
    <div className="background-admin">
      <div className="background-admin-data">
        <div className="d-flex position-relative">
          {/* -------- 左邊欄位區塊開始 --------*/}
          <LeftNav />
          {/* -------- 右邊欄位區塊開始 --------*/}
          <div className="p-0 background-admin-data-right  ">
            {/* -------- 上方導覽列開始 -------- */}
            <TopNav />
            {/* -------- 白色主要內容區塊開始 -------- */}
            <div className="background-admin-data-right-content">
              {/* -------- 排序區塊 -------- */}
              <FilterContent />
              {/* -------- 筆數 -------- */}
              <PenCount />
              {/* -------- 表格 資料主要呈現區塊開始 -------- */}
              <Table />
              {/* -------- 分頁區塊開始 --------*/}
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
