import React, { useState } from "react";
import { NavLink, Routes, Route, useParams } from "react-router-dom";

import UserOrderAll from "./UserOrderAll";
import UserOrderStay from "./UserOrderStay";
import UserOrderFinish from "./UserOrderFinish";
import UserOrderCancel from "./UserOrderCancel";

const UserOrder = (props) => {
  // 取用 route 變數
  let { status } = useParams();

  // 存取 待領取數量 顯示待領取 badge 數字用
  const [stayNum, setStayNum] = useState(0);
  // console.log("Order - stayNum", stayNum);

  // index 傳過來 用於判斷是否有資料呈現 (執行api)
  // console.log("Order - props.orders", props.orders);
  // console.log("Order - props.orders.length", props.orders.length);

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
              {stayNum === 0 ? null : (
                <span className="order_Num">{stayNum}</span>
              )}
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
              完成
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
          <Route
            path="/"
            element={
              <UserOrderAll
                setStayNum={setStayNum}
                orders={props.orders}
                setOrders={props.setOrders}
              />
            }
          />
          <Route
            path="status=1"
            element={
              <UserOrderStay
                setStayNum={setStayNum}
                orders={props.orders}
                setOrders={props.setOrders}
              />
            }
          />
          <Route
            path="status=2"
            element={<UserOrderFinish orders={props.orders} />}
          />
          <Route
            path="status=3"
            element={<UserOrderCancel orders={props.orders} />}
          />
        </Routes>
      </div>
    </>
  );
};

export default UserOrder;
