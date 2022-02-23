import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL, IMAGE_URL, ERR_MSG } from "../../../utils/config";
import { FiClock, FiHeart, FiChevronDown } from "react-icons/fi";
// import storeImage from "../../../images/store_img/22.jpg";
import { Rating } from "@mui/material";

const UserLike = () => {
  // 會員喜愛店家列表
  const [likeStores, setLikeStores] = useState([]);
  // 會員喜愛店家 store_id 列表
  const [likeStoreIds, setLikeStoreIds] = useState([]);

  // 載入 使用者收藏店家清單
  useEffect(() => {
    // http://localhost:3002/api/member/proile
    let getLike = async () => {
      let response = await axios.get(`${API_URL}/member/like`, {
        withCredentials: true, // 為了跨源存取 cookie // 登入狀態帶著 cookie 跟後端要資料
      });
      // 會員喜愛店家列表
      setLikeStores(response.data.userLikeStores);
      console.log(
        "api/member/like(get) response.data.userLikeStores: ",
        response.data.userLikeStores
      );

      // 會員喜愛店家 store_id 列表
      setLikeStoreIds(response.data.likeStoreIds);
      console.log(
        "api/member/like(get) response.data.storeId: ",
        response.data.likeStoreIds
      );
    };
    getLike();
  }, []);


  async function handleRemoveLike(removeStoreId) {
    // 要轉成物件
    removeStoreId = { removeStoreId };
    try {
      // http://localhost:3002/api/member/like/remove (router.post)
      let response = await axios.post(
        `${API_URL}/member/like/remove`,
        removeStoreId
      );
      console.log(
        `會員有移除 storeId ${removeStoreId} 的 like :`,
        response.data
      );
    } catch (e) {
      console.error("res.error:", e.response.data);
    }
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
              {/* {getStoreCategory()} */}
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
        <div className="text-end fz-md ls-md pt-2">
          共 {likeStores.length} 筆
        </div>
        <div className="row">
          {/* ------- store card 開始 -------- */}
          {likeStores.map((item) => {
            return (
              <div
                key={item.storeId}
                className="col col-lg-6 col-xl-4 my-4 d-flex justify-content-center flex-wrap"
              >
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
                          src={IMAGE_URL + item.storeImg}
                          className="cover-fit"
                          alt="storeImage"
                        />
                      </div>
                      {/* 店名 */}
                      <div className="d-flex align-items-center justify-content-between">
                        <h4 className="store_Title my-3">
                          {item.storeName}
                          <span className="d-block fz-sm mt-2 ls-md">
                            {item.storeBranchName}
                          </span>
                        </h4>

                        <div className="store_Category rounded-pill mb-4">
                          <span>{item.storeCate}</span>
                        </div>
                      </div>
                      {/* 資訊 時間 剩餘餐點 */}
                      <div className="d-flex align-items-center justify-content-between store_Info">
                        <FiClock className="store_Clock me-1" />
                        <span className="flex-grow-1">
                          {item.openTime} - {item.closeTime}
                        </span>
                        <span className="fz-sm">餐點剩餘:&nbsp;</span>
                        <span>14</span>
                      </div>
                      {/* 分數相關 */}
                      <div className="d-flex align-items-center justify-content-between store_Score">
                        {/* 星星 */}
                        <div className="d-flex align-items-center">
                          <Rating
                            className="store_Star"
                            // defaultValue={3}
                            value={Number(item.starScore)}
                            precision={0.1}
                            // onChange={handleStar}
                            readOnly
                          />
                          <span className="ls-sm ps-1 fz-md">
                            {item.starScore} ({item.commentTotal})
                          </span>
                        </div>
                        {/* 愛心 */}
                        <div
                          onClick={() => {
                            // alert(item.storeId);
                            if (likeStoreIds.includes(item.storeId)) {
                              // remove
                              setLikeStoreIds(
                                likeStoreIds.filter((v) => v !== item.storeId)
                                // 符合條件留下 (比對 不是 storeId 的留下)
                              );
                              setLikeStores()
                              //setFavAction({ action: 'remove', storeId: id })
                              handleRemoveLike(item.storeId);
                            } else {
                              //add
                              setLikeStoreIds([...likeStoreIds, item.storeId]);
                              //setFavAction({ action: 'add', storeId: id })
                            }
                          }}
                          className="d-flex align-items-center"
                        >
                          {likeStoreIds.includes(item.storeId) ? (
                            <FiHeart className="store_Like_Active" />
                          ) : (
                            <FiHeart className="store_Like_unActive" />
                          )}

                          <span className="ls-sm ps-1 fz-md">
                            {item.likeTotal}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
          {/* ------- store card 結束 -------- */}
        </div>
        {/* -------- 店家收藏清單 結束 -------- */}
      </div>
    </>
  );
};

export default UserLike;
