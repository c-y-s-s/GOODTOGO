import React, { useEffect, useState } from "react";
import { Link, NavLink, Routes, Route, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL, IMAGE_URL, ERR_MSG } from "../../../utils/config";

import UserOrderAll from "./UserOrderAll";
import UserOrderStay from "./UserOrderStay";
import UserOrderFinish from "./UserOrderFinish";
import UserOrderCancel from "./UserOrderCancel";

const UserOrder = () => {
  let { status } = useParams();
  // 載入 使用者收藏店家清單
  useEffect(() => {
    // http://localhost:3002/api/member/like
    let getLike = async () => {
      let response = await axios.get(`${API_URL}/member/like`, {
        withCredentials: true, // 為了跨源存取 cookie // 登入狀態帶著 cookie 跟後端要資料
      });
      console.log(
        "api/member/like(get) response.data.userLikeStores: ",
        response.data.userLikeStores
      );
      console.log(
        "api/member/like(get) response.data.storeCategories: ",
        response.data.storeCategories
      );
      console.log(
        "api/member/like(get) response.data.likeStoreIds: ",
        response.data.likeStoreIds
      );
      console.log(
        "api/member/like(get) response.data.userLikeStores.storeCate: ",
        response.data.userLikeStores.map((v) => v.storeCate)
      );
    };
    getLike();
  }, []);

  return (
    <>
      <div className="col-md-9 col-lg-10 ps-lg-5 mt-3 mt-md-0">
        <ul className="d-flex list-unstyled justify-content-between align-items-center order_Nav">
          <li>
            <NavLink
              className={({ isActive }) =>
                "order_Link text-decoration-none" +
                (isActive && !status
                  ? " order_Link_Active"
                  : " order_Link_unActive")
              }
              to="/member/order"
            >
              全部
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                "order_Link text-decoration-none" +
                (isActive ? " order_Link_Active" : " order_Link_unActive")
              }
              to="/member/order/status=1"
            >
              待領取
              <span className="order_Num">9</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                "order_Link text-decoration-none" +
                (isActive ? " order_Link_Active" : " order_Link_unActive")
              }
              to="/member/order/status=2"
            >
              已完成
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                "order_Link text-decoration-none" +
                (isActive ? " order_Link_Active" : " order_Link_unActive")
              }
              to="/member/order/status=3"
            >
              已取消
            </NavLink>
          </li>
        </ul>
        <Routes>
          <Route path="/" element={<UserOrderAll />} />
          <Route path="status=1" element={<UserOrderStay />} />
          <Route path="status=2" element={<UserOrderFinish />} />
          <Route path="status=3" element={<UserOrderCancel />} />
        </Routes>
      </div>
    </>
  );
};

export default UserOrder;
