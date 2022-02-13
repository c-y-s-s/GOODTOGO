import React from "react";
import { ReactComponent as Logo } from "../../../images/logo.svg";
import icon1 from "../images/Vector3.png";

const DataLeftNav = () => {
  return (
    <div>
      <div className="vh-100 background-storebg-data-left ">
        {/* -------- 左邊欄位區塊開始 --------*/}
        <div className="background-storebg-data-left-nav sticky-top">
          <div className="background-storebg-data-left-nav-logo">
            <Logo />
          </div>
          <ul>
            <li className="">
              <a href="#/">
                <img src={icon1} style={icon1.logo} alt="fireSpot" />
                商家資料編輯
              </a>
            </li>
            <li className="active">
              <a href="#/" className="">
                <img src={icon1} style={icon1.logo} alt="fireSpot" />
                商品清單
              </a>
            </li>
            <li className="">
              <a href="#/" className="">
                <img src={icon1} style={icon1.logo} alt="fireSpot" />
                商品新增
              </a>
            </li>
            <li className="">
              <a href="#/" className="">
                <img src={icon1} style={icon1.logo} alt="fireSpot" />
                商品資料編輯
              </a>
            </li>
          </ul>
        </div>
        {/* -------- 左邊欄位區塊結束 --------*/}
      </div>
    </div>
  );
};

export default DataLeftNav;
