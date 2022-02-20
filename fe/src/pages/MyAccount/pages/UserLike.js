import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../utils/config";
import { FiClock, FiHeart } from "react-icons/fi";
import storeImage from "../../../images/store_img/22.jpg";
import { Rating } from "@mui/material";
// import Heart from "react-animated-heart";

const UserLike = () => {
  const [star, setStar] = useState("");
  // const [heart, setHeart] = useState(false);

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

  function handleStar(e, newStar) {
    setStar(newStar);
  }

  return (
    <>
      <div className="col-md-9 col-lg-10 ps-lg-5 mt-3 mt-md-0">
        <div className="page_Title d-flex justify-content-center justify-content-md-start">
          店家收藏清單
        </div>
        <hr></hr>
        {/* -------- 店家收藏清單 開始 -------- */}
        <div className="text-end">共3筆</div>
        <div className="row">
          {/* ------- store card 開始 -------- */}
          <div className="col col-lg-6 col-xl-4 my-4 d-flex justify-content-center flex-wrap">
            <Link to="" className="text-decoration-none card_Link">
              <div className="store_Card">
                {/* 卡片的內容 */}
                <div className="px-4 pt-4 pb-3 h-100">
                  {/* 照片 */}
                  <div className="store_Img mx-auto">
                    <img
                      src={storeImage}
                      className="cover-fit"
                      alt="storeImage"
                    />
                  </div>
                  {/* 店名 */}
                  <div className="d-flex align-items-center justify-content-between">
                    <h4 className="store_Title my-4">小阿姨腳庫飯</h4>
                    <div className="store_Category rounded-pill">
                      <span>麵食</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between store_Info">
                    <FiClock className="store_Clock me-1" />
                    <span className="flex-grow-1">10:00 - 21:00</span>
                    <span className="fz-sm">餐點剩餘:&nbsp;</span>
                    <span>14</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between store_Score">
                    <div className="d-flex align-items-center">
                      <Rating
                        defaultValue={3}
                        value={star}
                        onChange={handleStar}
                      />
                      <span>3.5(85)</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <FiHeart className="store_Like" />
                      <span>28</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          {/* ------- store card 結束 -------- */}
          <div className="col col-lg-6 col-xl-4 my-4 d-flex justify-content-center flex-wrap">
            <Link to="" className="text-decoration-none card_Link">
              <div className="store_Card">
                {/* 卡片的內容 */}
                <div className="px-4 pt-4 pb-3">
                  {/* 照片 */}
                  <div className="store_Img mx-auto">
                    <img
                      src={storeImage}
                      className="cover-fit"
                      alt="storeImage"
                    />
                  </div>
                  {/* 店名 */}
                  <div className="d-flex align-items-center justify-content-between">
                    <h4 className="store_Title my-4">小阿姨腳庫飯</h4>
                    <div className="store_Category rounded-pill">
                      <span>麵食</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between store_Info">
                    <FiClock className="store_Clock me-1" />
                    <span className="flex-grow-1">10:00 - 21:00</span>
                    <span className="fz-sm">餐點剩餘:&nbsp;</span>{" "}
                    <span>14</span>
                  </div>
                  <div className="mt-2">
                    <Rating
                      name="simple-controlled size-medium"
                      value={2}
                      onChange={handleStar}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="col col-lg-6 col-xl-4 my-4 d-flex justify-content-center flex-wrap">
            <Link to="" className="text-decoration-none card_Link">
              <div className="store_Card">
                {/* 卡片的內容 */}
                <div className="px-4 pt-4 pb-3">
                  {/* 照片 */}
                  <div className="store_Img mx-auto">
                    <img
                      src={storeImage}
                      className="cover-fit"
                      alt="storeImage"
                    />
                  </div>
                  {/* 店名 */}
                  <div className="d-flex align-items-center justify-content-between">
                    <h4 className="store_Title my-4">小阿姨腳庫飯</h4>
                    <div className="store_Category rounded-pill">
                      <span>麵食</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between store_Info">
                    <FiClock className="store_Clock me-1" />
                    <span className="flex-grow-1">10:00 - 21:00</span>
                    <span className="fz-sm">餐點剩餘:&nbsp;</span>{" "}
                    <span>14</span>
                  </div>
                  <div className="mt-2">
                    <Rating
                      name="simple-controlled"
                      value={2}
                      onChange={handleStar}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        {/* -------- 店家收藏清單 結束 -------- */}
      </div>
    </>
  );
};

export default UserLike;
