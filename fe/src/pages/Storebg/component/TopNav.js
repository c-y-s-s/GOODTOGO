import React, { useEffect, useState } from "react";
// import { NavLink, Route, Routes, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL, IMAGE_URL, PROFILE_IMAGE_URL } from "../../../utils/config";
import { FiBell } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
const TopNav = () => {
  // let { userInfo } = useParams();
  // console.log(userInfo);

  // db head shot、name
  // 顯示使用者資訊 : 頭貼、姓名
  const [logo, setLogo] = useState("");
  const [storeName, setStoreName] = useState("");
  

  // -------- 用 session cookie 取使用者資料 --------
  useEffect(() => {
    // http://localhost:3002/api/member/proile
    let setStore = async () => {
      let response = await axios.get(`${API_URL}/storebg/profile`, {
        withCredentials: true, // 為了跨源存取 cookie // 登入狀態帶著 cookie 跟後端要資料
      });
      // response 是物件
      // console.log("api/member/profile(get) response.data: ", response.data);
      console.log(
        "api/storebg/profile(get) response.data.logo: ",
        response.data.logo
      );
      console.log(
        "api/storebg/profile(get) response.data.name: ",
        response.data.name
      );
      // 另外存 db head shot、name 要顯示頭貼用 不能與上傳的綁在一起
      setLogo(response.data.logo);
      setStoreName(response.data.name);
    };
    setStore();
  }, []);


  return (
    <div>
      {/* -------- 上方導覽列開始 -------- */}
      <nav className="background-storebg-data-right-nav">
        <div className="background-storebg-data-right-nav-title">商品清單</div>
        <div className="background-storebg-data-right-nav-content">
          {/* <form action="">
            <div className="d-flex">
              <div>
                <a href="#/" className="me-3 icon">
                  <FiSearch />
                </a>
              </div>
              <input type="text rounded-3" />
            </div>
          </form> */}

          {/* <div className="px-3 ">
            <a href="#/" className="icon icon-border">
            </a>
          </div> */}
          <div className="username">{storeName}</div>
          <div className="user-photo">
            <img
              src={logo ? IMAGE_URL + logo : PROFILE_IMAGE_URL}
              alt="logo"
            />
          </div>
          <button type="button" className="btn btn-warning mx-3">
            登出
          </button>
          
        </div>
      </nav>
      {/* -------- 上方導覽列結束 -------- */}
    </div>
  );
};

export default TopNav;
