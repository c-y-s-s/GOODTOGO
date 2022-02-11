import React from "react";

// -------- icons --------
// 比例圖icon
import { IoPieChartSharp } from "react-icons/io5";
// 放大鏡icon
import { AiOutlineSearch } from "react-icons/ai";
// 鈴鐺icon
import { BsBellFill } from "react-icons/bs";
// FillMore icon
import { FiMoreVertical } from "react-icons/fi";
// Sort icon
import { BsSortUp } from "react-icons/bs";
// -------- icons --------

// -------- images --------
require("../../images/navLogo.png");
require("./images/img1.jpg");
// -------- images --------

const Story = () => {
  return (
    <>
      {/* -------- 左邊導覽列 -------- */}
      <div className="navigation">
        <ul>
          <li>
            <img src={require("../../images/navLogo.png")} alt="logo"></img>
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
      {/* -------- 左邊導覽列 -------- */}

      <div className="main">
        {/* -------- 至頂導覽列 -------- */}
        {/* -------- 至頂導覽列 -------- */}
        <div className="topbar">
          <div className="product_list">商品清單</div>
          <div className="search">
            <input type="text" placeholder="Search here" />
            <AiOutlineSearch />
          </div>
          <BsBellFill />
          <div>小胖烘培屋-士林店</div>
          <div className="user">
            <img src={require("./images/img1.jpg")} alt="" />
          </div>
        </div>
        <div className="store-be-sortAndAdd">
          <div className="store-be-sort">
            <BsSortUp />
            排序
          </div>
          <div>
            <button>新增商品</button>
          </div>
        </div>
        <div>
          <div className="store-be-amount">
            <div>
              <h6>1~8筆</h6>
            </div>
            <div>
              <h6>共20樣商品</h6>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <td className="store-be-td">商品名稱</td>
                <td className="store-be-td">價格</td>
                <td className="store-be-td">數量</td>
                <td className="store-be-td">已售出</td>
                <td className="store-be-td">販售時間</td>
                <td className="store-be-td">上架時間</td>
                <td className="store-be-td">狀態</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="ddd1">
                  <div className="user ddd2">
                    <img src={require("./images/img1.jpg")} alt="" />
                  </div>
                  <div className="eee">麵包</div>
                </td>
                <td>NT$45</td>
                <td>10</td>
                <td>1</td>
                <td>PM 6:30 ~ PM 8:30</td>
                <td>May 26,2019</td>
                <td>
                  <button>下架中</button>
                </td>
                <td>
                  <FiMoreVertical />
                </td>
              </tr>
              <tr>
                <td>Window Coolers</td>
                <td>$110</td>
                <td>Due</td>
                <td>
                  <span className="status pending">Pending</span>
                </td>
              </tr>
              <tr>
                <td>Speakers</td>
                <td>$620</td>
                <td>Paid</td>
                <td>
                  <span className="status return">Return</span>
                </td>
              </tr>
              <tr>
                <td>Hp Laptop</td>
                <td>$110</td>
                <td>Due</td>
                <td>
                  <span className="status inprogress">In Progress</span>
                </td>
              </tr>
              <tr>
                <td>Apple Watch</td>
                <td>$1200</td>
                <td>Paid</td>
                <td>
                  <span className="status delivered">Delivered</span>
                </td>
              </tr>
              <tr>
                <td>Wall Fan</td>
                <td>$110</td>
                <td>Paid</td>
                <td>
                  <span className="status pending">Pending</span>
                </td>
              </tr>
              <tr>
                <td>Adidas Shoes</td>
                <td>$620</td>
                <td>Paid</td>
                <td>
                  <span className="status return">Return</span>
                </td>
              </tr>
              <tr>
                <td>Denim Shirts</td>
                <td>$110</td>
                <td>Due</td>
                <td>
                  <span className="status inprogress">In Progress</span>
                </td>
              </tr>
              <tr>
                <td>Casual Shoes</td>
                <td>$575</td>
                <td>Paid</td>
                <td>
                  <span className="status pending">Pending</span>
                </td>
              </tr>
              <tr>
                <td>Wall Fan</td>
                <td>$110</td>
                <td>Paid</td>
                <td>
                  <span className="status pending">Pending</span>
                </td>
              </tr>
              <tr>
                <td>Denim Shirts</td>
                <td>$110</td>
                <td>Due</td>
                <td>
                  <span className="status inprogress">In Progress</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Story;
