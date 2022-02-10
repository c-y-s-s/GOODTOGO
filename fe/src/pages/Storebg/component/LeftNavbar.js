import React from "react";

// -------- icons 開始 --------
// 比例圖 icon
import { IoPieChartSharp } from "react-icons/io5";
// -------- icons 結束 --------

// Logo 圖片
import { ReactComponent as Logo } from "../../../images/logo.svg";

const LeftNavbar = () => {
  return (
    <>
      <div className="navigation">
        <ul>
          <li>
            <div className="logo-mb">
            <Logo />
            </div>
          </li>
          <li>
            <a href="#/">
              <span className="icon">
                <IoPieChartSharp />
              </span>
              <span className="title">商家資料編輯</span>
            </a>
          </li>
          <li>
            <a href="#/">
              <span className="icon">
                <IoPieChartSharp />
              </span>
              <span className="title">商品清單</span>
            </a>
          </li>
          <li>
            <a href="#/">
              <span className="icon">
                <IoPieChartSharp />
              </span>
              <span className="title">商品新增</span>
            </a>
          </li>
          <li>
            <a href="#/">
              <span className="icon">
                <IoPieChartSharp />
              </span>
              <span className="title">商品資料編輯</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default LeftNavbar;
