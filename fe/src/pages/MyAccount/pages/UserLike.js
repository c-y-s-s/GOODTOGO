import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../utils/config";
import { FiClock, FiHeart, FiChevronDown } from "react-icons/fi";
import storeImage from "../../../images/store_img/22.jpg";
import { Rating } from "@mui/material";
// import Heart from "react-animated-heart";

const UserLike = () => {
  // const [star, setStar] = useState("");
  const [heart, setHeart] = useState(true);

  // 載入 使用者收藏店家清單
  useEffect(() => {
    // http://localhost:3002/api/member/proile
    let getLike = async () => {
      let response = await axios.get(`${API_URL}/member/like`, {
        withCredentials: true, // 為了跨源存取 cookie // 登入狀態帶著 cookie 跟後端要資料
      });
      // response 是物件
      console.log("api/member/like(get) response.data: ", response.data);
    };
    getLike();
  }, []);

  // function handleStar(e, newStar) {
  //   setStar(newStar);
  // }

  function handleHeart() {
    console.log("1", heart);
    setHeart(!heart);
    console.log("2", heart);
  }

  return (
    <>
      <div className="col-md-9 col-lg-10 ps-lg-5 mt-3 mt-md-0">
        <div className="d-flex justify-content-center justify-content-between">
          <div className="page_Title d-flex justify-content-center justify-content-md-start">
            店家收藏清單
          </div>
          <div className="page_Title_Category_Hover">
            <div className="page_Title_Category d-flex justify-content-center justify-content-md-start align-items-center">
              店家類別
              <FiChevronDown className="ms-1 page_Title_Arrow" />
            </div>
            <ul className="page_Title_Category_List list-unstyled position-absolute mt-4">
              <li>港式餐廳</li>
              <li>中式餐廳</li>
              <li>韓式餐廳</li>
              <li>泰式餐廳</li>
              <li>素食餐廳</li>
              <li>西式餐廳</li>
              <li>飲料店</li>
              <li>甜點店</li>
              <li>麵包店</li>
            </ul>
          </div>
        </div>
        <hr></hr>
        {/* -------- 店家收藏清單 開始 -------- */}
        <div className="text-end fz-md ls-md pt-2">共 3 筆</div>
        <div className="row">
          {/* ------- store card 開始 -------- */}
          <div className="col col-lg-6 col-xl-4 my-4 d-flex justify-content-center flex-wrap">
            <Link to="" className="text-decoration-none card_Link">
              <div className="store_Card position-relative">
                {/* 卡片的內容 */}
                <div className="px-4 pt-4 pb-3 h-100">
                  {/* 照片 */}
                  <div className="store_Img mx-auto">
                    <span className="position-absolute store_Status_Close badge">
                      休息中
                    </span>
                    <img
                      src={storeImage}
                      className="cover-fit"
                      alt="storeImage"
                    />
                  </div>
                  {/* 店名 */}
                  <div className="d-flex align-items-center justify-content-between">
                    <h4 className="store_Title my-3">
                      豪記港式飲茶
                      <span className="d-block fz-sm mt-2 ls-md">永福店</span>
                    </h4>

                    <div className="store_Category rounded-pill mb-4">
                      <span>港式餐廳</span>
                    </div>
                  </div>
                  {/* 資訊 時間 剩餘餐點 */}
                  <div className="d-flex align-items-center justify-content-between store_Info">
                    <FiClock className="store_Clock me-1" />
                    <span className="flex-grow-1">10:00 - 21:00</span>
                    <span className="fz-sm">餐點剩餘:&nbsp;</span>
                    <span>14</span>
                  </div>
                  {/* 分數相關 */}
                  <div className="d-flex align-items-center justify-content-between store_Score">
                    {/* 星星 */}
                    <div className="d-flex align-items-center">
                      <Rating
                        className="store_Star"
                        defaultValue={3}
                        value={3.5}
                        precision={0.1}
                        // onChange={handleStar}
                        readOnly
                      />
                      <span className="ls-sm ps-1 fz-md">3.5 (85)</span>
                    </div>
                    {/* 愛心 */}
                    <div className="d-flex align-items-center">
                      <FiHeart
                        className={
                          heart ? "store_Like_Active" : "store_Like_unActive"
                        }
                        onClick={handleHeart}
                      />
                      <span className="ls-sm ps-1 fz-md">28</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          {/* ------- store card 結束 -------- */}
        </div>
        {/* -------- 店家收藏清單 結束 -------- */}
      </div>
    </>
  );
};

export default UserLike;
