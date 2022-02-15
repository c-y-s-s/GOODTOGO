import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../utils/config";
import { ERR_MSG } from "../../utils/error";
import { FiUser, FiClipboard, FiGift, FiFolder } from "react-icons/fi";
import headShot from "./images/headShot.png";

// user 帶著 session 進入此頁

// TODO: 利用 refs 驗證欄位

const MyAccount = () => {
  const [member, setMember] = useState({});

  useEffect(() => {
    // http://localhost:3002/api/member/proile
    let getUser = async () => {
      let response = await axios.get(`${API_URL}/member/profile`, {
        withCredentials: true, // 為了跨源存取 cookie // 登入狀態帶著 cookie 跟後端要資料
      });
      // response 是物件
      console.log("response?: ", response);
      console.log("response.data[0].name?: ", response.data[0].name);
      // setMember(response.data);
      setMember({
        name: response.data[0].name,
        email: response.data[0].email,
        password: response.data[0].password,
        phone: response.data[0].phone,
      });
      // console.log(member);
    };
    getUser();
  }, []);

  // useEffect(() => {
  //   let getMember = async () => {
  //     let response = await axios.get(`${API_URL}/member`, {
  //       withCredentials: true, // 為了跨源存取 cookie // 登入狀態帶著 cookie 跟後端要資料
  //     });
  //     console.log(response.data);
  //   };
  //   getMember();
  // }, []);

  // 使用者修改資料
  function handleChange(e) {
    setMember({ ...member, [e.target.name]: e.target.value });
  }

  // TODO: 修改會員資料進資料庫
  // 發 http request 到後端 -> axios
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let formData = new FormData(); // 物件
      formData.append("name", member.name);
      formData.append("email", member.email);
      formData.append("phone", member.phone);
      formData.append("photo", member.photo);

      // http://localhost:3002/api/member/profile
      let response = await axios.post(`${API_URL}/member/profile`, formData);
      console.log(response.data);
    } catch (e) {
      console.error("error:", e.response.data);
      // 得到 auth.js express-validator驗證 若錯誤，後端 return 前端的 res.status 裡面的 code
      // 去對應 error.js 裡 ERR_MSG 的 key -> ERR_MSG={ 33001: "前端可訂XXX錯誤訊息" }
      console.error("測試會員修改資料", ERR_MSG[e.response.data.code]);
    }
  }

  return (
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
                  to={"/member/profile" || "/member/payment" || "/member/like"}
                >
                  <div>
                    <FiUser className="menu_Icon d-flex" />
                  </div>
                  <span className="menu_Title">我的帳戶</span>
                </NavLink>
                {/* -------- 我的帳戶選單開始 -------- */}
                <div className="menu_Open">
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
                        to="/member/like"
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
                  to="/member/order"
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
                  to="/member/coupon"
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
          <div className="col-lg-10 ps-5">
            <div className="page_Title">會員資料修改</div>
            <hr></hr>
            {/* -------- 會員資料表單開始 -------- */}
            {/* {member.map((user) => {
              return ( */}
                <form>
                  <div className="row">
                    {/* -------- 表單左 -------- */}
                    <div className="col-lg-7 form_Text pe-5">
                      <div className="my-4">
                        <div className="d-flex align-items-center text-nowrap">
                          <label
                            htmlFor="name"
                            className="col-3 col-sm-2 col-lg-3 col-xl-2 me-2"
                          >
                            姓名
                          </label>
                          <input
                            id="name"
                            type="text"
                            name="name"
                            className="form-control form_Input"
                            value={member.name}
                            placeholder="中文 / 英文姓名"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="error text-danger text-end"></div>
                      </div>

                      <div className="my-4">
                        <div className="d-flex align-items-center text-nowrap">
                          <label
                            htmlFor="email"
                            className="col-3 col-sm-2 col-lg-3 col-xl-2 me-2"
                          >
                            電子信箱
                          </label>
                          <input
                            id="email"
                            type="email"
                            name="email"
                            className="form-control form_Input"
                            value={member.email}
                            placeholder="name@example.com"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="error text-danger text-end"></div>
                      </div>

                      {/* <div className="my-4">
                        <div className="d-flex align-items-center text-nowrap">
                          <label
                            htmlFor="password"
                            className="col-3 col-sm-2 col-lg-3 col-xl-2 me-2"
                          >
                            密碼
                          </label>
                          <input
                            id="password"
                            type="password"
                            name="password"
                            className="form-control form_Input"
                            defaultValue={member.password}
                            autoComplete="off"
                            // 資料庫用 session id 撈出使用者密碼
                            disabled
                          />
                          <button className="btn btn_Password ms-3">
                            更改密碼
                          </button>
                        </div>
                        <div className="error text-danger text-end"></div>
                      </div> */}

                      <div className="my-4">
                        <div className="d-flex align-items-center text-nowrap">
                          <label
                            htmlFor="phone"
                            className="col-3 col-sm-2 col-lg-3 col-xl-2 me-2"
                          >
                            手機號碼
                          </label>
                          <input
                            id="phone"
                            type="phone"
                            name="phone"
                            className="form-control form_Input"
                            value={member.phone}
                            placeholder="09xxxxxxxx"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="error text-danger text-end"></div>
                      </div>
                      <div className="d-flex align-items-center text-nowrap">
                        <div className="col-3 col-sm-2 col-lg-3 col-xl-2 me-2"></div>
                        <div className="d-flex justify-content-center w-100">
                          <button
                            type="submit"
                            className="btn text-white btn_Submit"
                            onClick={handleSubmit}
                          >
                            儲&emsp;存
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* -------- 表單右 (上傳大頭照)-------- */}
                    <div className="col-lg-5">
                      <div className="user_Upload_Img mt-4">
                        <div>
                          <div className="headShot">
                            <img src={headShot} alt="" className="cover-fit" />
                          </div>
                        </div>
                        {/* <input type="file" className="" /> */}
                        <label className="btn btn_Upload d-flex justify-content-center align-items-center mx-auto mt-4">
                          <input
                            style={{ display: "none" }}
                            type="file"
                            id="photo"
                            name="photo"
                            // 不能綁定
                            // value={user.photo}
                            onChange={(e) => {
                              // 圖片不是存在 e.target.value
                              // -> 不能共用 handleChange 函式
                              // 存在 e.target.files 裡 是陣列
                              // e.target.files 抓的是圖檔二進位資料，不能放進json裡
                              // -> 不能用 axios.post 送 member 物件
                              setMember({
                                ...member,
                                photo: e.target.files[0],
                              });
                              // 只上傳一張照片 e.target.files[0] 抓第一筆
                            }}
                          />
                          <div>
                            <FiFolder className="menu_Icon d-flex me-2" />
                          </div>
                          <span className="text-white">選擇圖片</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
              {/* );
            })} */}
            {/* -------- 會員資料表單結束 -------- */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
