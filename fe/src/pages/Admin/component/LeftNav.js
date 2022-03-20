import React from "react";
import { ReactComponent as Logo } from "../../../images/logo.svg";
import icon1 from "../images/Vector3.png";

const DataLeftNav = () => {
  return (
    <div>
      <div className="vh-100 background-admin-data-left">
        {/* -------- 左邊欄位區塊開始 --------*/}
        <div className="background-admin-data-left-nav">
          <div className="background-admin-data-left-nav-logo">
            <Logo />
          </div>
          <ul>
            <li className="active">
              <a href="">
                <img src={icon1} style={icon1.logo} alt="fireSpot" />
                店家申請
              </a>
            </li>
            <li className="">
              <a href="" className="">
                <img src={icon1} style={icon1.logo} alt="fireSpot" />
                店家列表
              </a>
            </li>
          </ul>
        </div>
        {/* -------- 左邊欄位區塊結束 --------*/}
      </div>
      ;
    </div>
  );
};

export default DataLeftNav;
