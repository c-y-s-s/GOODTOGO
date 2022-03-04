import React from "react";
import { ReactComponent as Logo } from "../../../images/logo.svg";
import { NavLink } from "react-router-dom";
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
            {/* <li className="">
              <a href="#/">
                <img src={icon1} style={icon1.logo} alt="fireSpot" />
                商家資料編輯
              </a>
            </li> */}

            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "ms-3" : "")}
                to="/storebg"
              >
                <img
                  src={icon1}
                  className="ms-2"
                  style={icon1.logo}
                  alt="fireSpot"
                />
                商品清單
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "ms-3" : "")}
                to="/newproduct"
              >
                <img
                  src={icon1}
                  className="ms-2"
                  style={icon1.logo}
                  alt="fireSpot"
                />
                商品新增
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "ms-3" : "")}
                to="/productedit"
              >
                <img
                  src={icon1}
                  className="ms-2"
                  style={icon1.logo}
                  alt="fireSpot"
                />
                商品資料編輯
              </NavLink>
            </li>
          </ul>
        </div>
        {/* -------- 左邊欄位區塊結束 --------*/}
      </div>
    </div>
  );
};

export default DataLeftNav;
