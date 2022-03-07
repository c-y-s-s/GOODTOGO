import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { NavLink, Route, Routes, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL, IMAGE_URL, PROFILE_IMAGE_URL } from "../../../utils/config";
import { useAuth } from "../../../context/auth";


const TopNav = () => {
  const { member, setMember } = useAuth();

  const handleLogout = async () => {
    await axios.get(`${API_URL}/storebg/storeLogout`, {
      withCredentials: true,
    });
    setMember(null);
  };

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
          <div className="username">{storeName}</div>
          <div className="user-photo">
            <img src={logo ? IMAGE_URL + logo : PROFILE_IMAGE_URL} alt="logo" />
          </div>
          <Link
            type="button"
            className="btn btn-warning mx-3"
            to="/"
            onClick={handleLogout}
          >
            登出
          </Link>
        </div>
      </nav>
      {/* -------- 上方導覽列結束 -------- */}
    </div>
  );
};

export default TopNav;
