import React from "react";

// -------- icons 開始 --------
// 放大鏡 icon
import { AiOutlineSearch } from "react-icons/ai";
// 鈴鐺 icon
import { BsBellFill } from "react-icons/bs";
// -------- icons 結束 --------

const TopNavbar = (name) => {
  return (
    <>
      <div className="topbar">
        <div className="product_list">商品清單</div>
        <div className="search">
          <input type="text" placeholder="Search here" />
          <AiOutlineSearch />
        </div>
        <BsBellFill />
        <div>小胖烘培屋-士林店</div>
        <div className="user">
          <img src={require("../images/img1.jpg")} alt="" />
        </div>
      </div>
    </>
  );
};

export default TopNavbar;
