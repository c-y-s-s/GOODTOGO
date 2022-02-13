import React from "react";

import LeftNav from "./component/LeftNav";
import TopNav from "./component/TopNav";
import Table from "./component/Table";
const newproduct = () => {
  return (
    <div className="background-newproduct">
      <div className="background-newproduct-data">
        <div className="d-flex position-relative">
          {/* -------- 左邊欄位區塊開始 --------*/}
          <LeftNav />
          {/* -------- 右邊欄位區塊開始 --------*/}
          <div className="p-0 background-newproduct-data-right  ">
            {/* -------- 上方導覽列開始 -------- */}
            <TopNav />
            {/* -------- 白色主要內容區塊開始 -------- */}
            <div className="background-newproduct-data-right-content">
              {/* -------- 表格 資料主要呈現區塊開始 -------- */}
              <Table />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default newproduct;
