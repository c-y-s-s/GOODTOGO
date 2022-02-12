import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../utils/config";
// import "./styles/myAccount.scss";
import "../../../styles/index.scss";
import { FiUser, FiClipboard, FiGift } from "react-icons/fi";
import TwCitySelector from "tw-city-selector";
import headShot from "./../images/headShot.png";

const UserOrderList = () => {
  const [data, setData] = useState([]);

  // -------- 地址選擇器 --------
  new TwCitySelector({
    el: ".city-selector-standard-words",
    elCounty: ".county", // 在 el 裡查找 element
    elDistrict: ".district", // 在 el 裡查找 element
    elZipcode: ".zipcode", // 在 el 裡查找 element
    standardWords: true, // 使用正體字 臺
  });

  useEffect(() => {
    // http://localhost:3002/api/users
    let getUser = async () => {
      let response = await axios.get(`${API_URL}/users`);
      // response 是物件
      setData(response.data);
    };
    getUser();
  }, []);

  return (
    // 撈資料呈現
    // <div>
    //   {data.map((users) => {
    //     return <div>{users.name}</div>;
    //   })}
    // </div>

    <div>
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-2">
            {/* -------- 會員頭貼 -------- */}
            <div className="user_Info d-flex align-items-center mb-5">
              <div>
                <div className="headShot">
                  <img src={headShot} alt="" className="cover-fit" />
                </div>
              </div>
              <p className="ms-4 mb-0 text-nowrap">王小明</p>
            </div>
            {/* -------- 左方選單列開始 -------- */}
            <ul className="list-unstyled text-nowrap d-flex d-lg-block align-items-start justify-content-around">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    "d-flex align-items-center mb-3 me-5 text-decoration-none menu_Title_unActive" +
                    (isActive ? " menu_Open" : " menu_Close")
                  }
                  to={
                    "/my_account" ||
                    "/my_account/payment" ||
                    "/my_account/like-list"
                  }
                >
                  <div>
                    <FiUser className="menu_Icon d-flex" />
                  </div>
                  <span className="menu_Title">我的帳戶</span>
                </NavLink>
                {/* -------- 我的帳戶選單開始 -------- */}
                <div className="menu_Close">
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2">
                      <NavLink
                        className={({ isActive }) =>
                          "menu_Text text-decoration-none" +
                          (isActive
                            ? " menu_Text_Active"
                            : " menu_Text_unActive")
                        }
                        to="/my_account"
                      >
                        會員資料修改
                      </NavLink>
                    </li>
                    <li className="mb-2">
                      <NavLink
                        className={({ isActive }) =>
                          "menu_Text text-decoration-none" +
                          (isActive
                            ? " menu_Text_Active"
                            : " menu_Text_unActive")
                        }
                        to="/my_account/payment"
                      >
                        信用卡資訊
                      </NavLink>
                    </li>
                    <li className="mb-2">
                      <NavLink
                        className={({ isActive }) =>
                          "menu_Text text-decoration-none" +
                          (isActive
                            ? " menu_Text_Active"
                            : " menu_Text_unActive")
                        }
                        to="/my_account/like-list"
                      >
                        店家收藏清單
                      </NavLink>
                    </li>
                  </ul>
                </div>
                {/* -------- 我的帳戶選單結束 -------- */}
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    "d-flex align-items-center mb-3 me-5 text-decoration-none" +
                    (isActive ? " menu_Title_Active" : " menu_Title_unActive")
                  }
                  to="/my_account/order"
                >
                  <div>
                    <FiClipboard className="menu_Icon d-flex" />
                  </div>
                  <span className="menu_Title">我的訂單</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    "d-flex align-items-center mb-3 me-5 text-decoration-none" +
                    (isActive ? " menu_Title_Active" : " menu_Title_unActive")
                  }
                  to="/my_account/coupon"
                >
                  <div>
                    <FiGift className="menu_Icon d-flex" />
                  </div>
                  <span className="menu_Title">優惠券</span>
                </NavLink>
              </li>
            </ul>
            {/* -------- 左方選單列結束 -------- */}
          </div>
          <div className="col-lg-10">
            <div className="page_Title">會員資料修改</div>
            <hr></hr>
            {/* -------- 會員資料表單開始 -------- */}
            <form>
              <div className="row">
                {/* -------- 表單左 -------- */}
                <div className="col-lg-7 form_Text">
                  <div className="my-4">
                    <div className="d-flex align-items-center text-nowrap">
                      <label htmlFor="name" className="col-sm-2">
                        姓名
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        className="form-control"
                        // value=""
                        placeholder="中文 / 英文姓名"
                      />
                    </div>
                    <div className="error text-danger text-end"></div>
                  </div>

                  <div className="my-4">
                    <div className="d-flex align-items-center text-nowrap">
                      <label htmlFor="email" className="col-sm-2">
                        電子信箱
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        className="form-control"
                        // value=""
                        placeholder="name@example.com"
                      />
                    </div>
                    <div className="error text-danger text-end"></div>
                  </div>

                  <div className="my-4">
                    <div className="d-flex align-items-center text-nowrap">
                      <label htmlFor="password" className="col-sm-2">
                        密碼
                      </label>
                      <input
                        id="password"
                        type="password"
                        name="password"
                        className="form-control"
                        value="123233434"
                        disabled
                      />
                    </div>
                    <div className="error text-danger text-end"></div>
                  </div>

                  <div className="my-4">
                    <div className="d-flex align-items-center text-nowrap">
                      <label htmlFor="phone" className="col-sm-2">
                        手機號碼
                      </label>
                      <input
                        id="phone"
                        type="phone"
                        name="phone"
                        className="form-control"
                        // value=""
                        placeholder="09xxxxxxxx"
                      />
                    </div>
                    <div className="error text-danger text-end"></div>
                  </div>

                  <div className="my-4">
                    <label htmlFor="address">地址</label>
                    <div className="d-inline">
                      <div className="city-selector-standard-words d-inline">
                        <select className="county form-select"></select>
                        <select className="district form-select"></select>
                      </div>
                    </div>
                    <div className="my-2">
                      <input className="d-block" type="text" name="address" />
                    </div>
                  </div>
                  <button type="submit">儲存</button>
                </div>
                {/* -------- 表單右 -------- */}
                <div className="col-lg-5">aaa</div>
              </div>
            </form>
            {/* -------- 會員資料表單結束 -------- */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrderList;
