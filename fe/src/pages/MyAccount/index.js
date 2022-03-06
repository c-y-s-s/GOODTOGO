import React, { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL, IMAGE_URL, PROFILE_IMAGE_URL } from "../../utils/config";
// icon
import { FiUser, FiClipboard, FiHeart } from "react-icons/fi";
// 頁面
import UserProfile from "./pages/UserProfile";
import UserPassword from "./pages/UserPassword";
import UserLike from "./pages/UserLike";
import UserOrder from "./pages/UserOrder";
// import UserCoupon from "./pages/UserCoupon";
import UserCreditCard from "./pages/UserCreditCard";
import Navbar from "../../components/Navbar"

// user 帶著 session 進入此頁

const MyAccount = (props) => {
  let { userInfo } = useParams();
  // console.log(userInfo);

  // db head shot、name
  // 顯示使用者資訊 : 頭貼、姓名
  const [headShot, setHeadShot] = useState("");
  const [userName, setUserName] = useState("");

  // 儲存 會員有無喜愛店家、訂單 (判斷是否執行api)
  const [likes, setLikes] = useState([]);
  // [ {store_id:2}, {store_id:3} ]
  const [orders, setOrders] = useState([]);
  //[ {id: 6, status_id: 1}, {id: 8, status_id: 2} ]

  // 

  // -------- 用 session cookie 取使用者資料 --------
  useEffect(() => {
    // http://localhost:3002/api/member/proile
    let getUser = async () => {
      let response = await axios.get(`${API_URL}/member/profile`, {
        withCredentials: true, // 為了跨源存取 cookie // 登入狀態帶著 cookie 跟後端要資料
      });
      // response 是物件
      // console.log("api/member/profile(get) response.data: ", response.data);
      console.log(
        "api/member/profile(get) response.data.profile.photo: ",
        response.data.profile.photo
      );
      console.log(
        "api/member/profile(get) response.data.profile.name: ",
        response.data.profile.name
      );
      console.log(
        "api/member/profile(get) response.data.likes: ",
        response.data.likes
      );
      console.log(
        "api/member/profile(get) response.data.orders: ",
        response.data.orders
      );
      // 另外存 db head shot、name 要顯示頭貼用 不能與上傳的綁在一起
      setHeadShot(response.data.profile.photo);
      setUserName(response.data.profile.name);
      // 存 喜愛店家、訂單 判斷其他頁面是否有資料可呈現
      setLikes(response.data.likes);
      setOrders(response.data.orders);
    };
    getUser();
  }, []);

  return (
    <div>
      {/* <Navbar /> */}
      <div className="container my-5">
        <div className="row">
          <div className="col-md-3 col-lg-2">
            {/* -------- 會員頭貼 -------- */}
            <Link to="profile" className="text-decoration-none">
              <div className="user_Info d-flex align-items-center justify-content-center justify-content-md-start mb-5">
                <div>
                  <div className="headShot">
                    <img
                      src={headShot ? IMAGE_URL + headShot : PROFILE_IMAGE_URL}
                      // 顯示順序: 資料庫圖片 -> 預設圖片
                      alt="head shot"
                      className="cover-fit"
                    />
                  </div>
                </div>
                <p className="ms-3 ms-lg-4 mb-0 text-nowrap">{userName}</p>
              </div>
            </Link>
            {/* -------- 左方選單列開始 -------- */}
            <ul className="list-unstyled text-nowrap d-flex d-md-block align-items-start justify-content-around">
              <li>
                <NavLink
                  className="d-flex align-items-center mb-3 text-decoration-none menu_Title_unActive"
                  to={"/member/profile" || "/member/payment" || "/member/like"}
                >
                  <div>
                    <FiUser className="menu_Icon d-flex" />
                  </div>
                  <span className="menu_Title">我的帳戶</span>
                </NavLink>
                {/* -------- 我的帳戶選單開始 -------- */}
                <div
                  className={
                    userInfo === "order" || userInfo === "coupon"
                      ? "menu_Close"
                      : "menu_Open"
                  }
                >
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2">
                      <NavLink
                        className={({ isActive }) =>
                          "menu_Text text-decoration-none" +
                          (isActive
                            ? " menu_Text_Active"
                            : " menu_Text_unActive")
                        }
                        to="/member/profile"
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
                        to="/member/payment"
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
                        to="/member/password"
                      >
                        更改密碼
                      </NavLink>
                    </li>
                    {/* <li className="mb-2">
                      <NavLink
                        className={({ isActive }) =>
                          "menu_Text text-decoration-none" +
                          (isActive
                            ? " menu_Text_Active"
                            : " menu_Text_unActive")
                        }
                        to="/member/like"
                      >
                        店家收藏清單
                      </NavLink>
                    </li> */}
                  </ul>
                </div>
                {/* -------- 我的帳戶選單結束 -------- */}
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    "d-flex align-items-center mb-3 me-4 me-xs-0 text-decoration-none" +
                    (isActive ? " menu_Title_Active" : " menu_Title_unActive")
                  }
                  to="/member/order"
                >
                  <div>
                    <FiClipboard className="menu_Icon d-flex" />
                  </div>
                  <span className="menu_Title">我的訂單</span>
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  className={({ isActive }) =>
                    "d-flex align-items-center mb-3 text-decoration-none" +
                    (isActive ? " menu_Title_Active" : " menu_Title_unActive")
                  }
                  to="/member/coupon"
                >
                  <div>
                    <FiGift className="menu_Icon d-flex" />
                  </div>
                  <span className="menu_Title">優惠券</span>
                </NavLink>
              </li> */}
              <li>
                <NavLink
                  className={({ isActive }) =>
                    "d-flex align-items-center mb-3 text-decoration-none" +
                    (isActive ? " menu_Title_Active" : " menu_Title_unActive")
                  }
                  to="/member/like"
                >
                  <div>
                    <FiHeart className="menu_Icon d-flex" />
                  </div>
                  <span className="menu_Title">收藏店家</span>
                </NavLink>
              </li>
            </ul>
            {/* -------- 左方選單列結束 -------- */}
          </div>
          <Routes>
            <Route
              path="profile"
              element={
                <UserProfile
                  setHeadShot={setHeadShot}
                  setUserName={setUserName}
                />
              }
            />
            <Route
              path="payment"
              element={
                <UserCreditCard setisModalTouch={props.setisModalTouch}  />
              }
            />
            <Route path="password" element={<UserPassword />} />
            {/* <Route path="like" element={<UserLike />} /> */}
            <Route
              path="order/*"
              element={<UserOrder orders={orders} setOrders={setOrders} />}
            >
              <Route
                path=":status"
                element={<UserOrder orders={orders} setOrders={setOrders} />}
              />
            </Route>
            <Route
              path="like"
              element={<UserLike likes={likes} setLikes={setLikes} />}
            />
            {/* <Route path="coupon" element={<UserCoupon />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
