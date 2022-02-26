import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL, IMAGE_URL, ERR_MSG } from "../../../utils/config";

const UserCoupon = () => {

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
        <div className="page_Title d-flex justify-content-center justify-content-md-start">
          優惠券
        </div>
        <hr></hr>
        {/* -------- 我的訂單 開始 -------- */}

        {/* -------- 我的訂單 結束 -------- */}
      </div>
    </>
  );
};

export default UserCoupon;
