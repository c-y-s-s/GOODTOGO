import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL, IMAGE_URL } from "../../../utils/config";
import { FiClock, FiHeart, FiChevronDown } from "react-icons/fi";
import { Rating } from "@mui/material";
import { css } from "@emotion/react";
import BarLoader from "react-spinners/BarLoader";

const UserLike = (props) => {
  // index 傳過來 用於判斷使否有資料呈現 (執行api)
  console.log("Like - props.likes", props.likes);
  console.log("Like - props.likes.length", props.likes.length);

  // loading 開關
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#A6BF4B");
  const override = css`
    display: block;
    margin: 100px auto;
  `;

  // 儲存 喜愛店家清單
  const [likeStores, setLikeStores] = useState([]);

  // 顯示 喜愛店家清單
  const [showLikeStores, setShowLikeStores] = useState([]);

  // 喜愛店家 store_id 列表
  // 用於判斷點選到哪個 storeId 的愛心
  const [likeStoreIds, setLikeStoreIds] = useState([]);

  // 店家類別 選單
  const [storeCategory, setStoreCategory] = useState([]);

  // 紀錄選單目前顯示類別
  const [showCate, setShowCate] = useState("全部店家");
  // console.log(showCate);

  // 判斷目前分類有無資料可顯示
  // true 有資料 // false 此分類無資料
  // const [hasCateData, setHasCateData] = useState(true);
  // console.log("UserLike - showCateData", hasCateData);

  // 載入 使用者收藏店家清單
  useEffect(() => {
    if (props.likes.length > 0) {
      // loading 開
      setLoading(true);

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

        setLikeStores(response.data.userLikeStores); // 儲存 喜愛店家清單
        setShowLikeStores(response.data.userLikeStores); // 顯示 喜愛店家清單
        setLikeStoreIds(response.data.likeStoreIds); // 喜愛店家 store_id 選單
        setStoreCategory(response.data.storeCategories); // 店家類別 列表

        // loading 關
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      };
      getLike();
    }
  }, []);

  async function handleRemoveLike(removeStoreId) {
    // 要轉成物件 POST 才有預檢(?)
    removeStoreId = { removeStoreId };
    // removeStoreId = { removeStoreId: removeStoreId };

    try {
      // http://localhost:3002/api/member/like/remove (router.post)
      let response = await axios.post(
        `${API_URL}/member/like/remove`,
        removeStoreId,
        {
          withCredentials: true, // 為了跨源存取 cookie // 登入狀態帶著 cookie 跟後端要資料
        }
      );
      console.log("會員有移除 like :", response.data);

      // 更新 儲存 喜愛店家列表 (濾除取消收藏)
      setLikeStores(
        [...likeStores].filter(
          (v) => Object.values(v)[1] !== Object.values(removeStoreId)[0]
        )
      );
      // 更新 顯示 喜愛店家列表 (濾除取消收藏)
      setShowLikeStores(
        [...showLikeStores].filter(
          (v) => Object.values(v)[1] !== Object.values(removeStoreId)[0]
        )
      );
      // 更新 喜愛店家 store_id 列表 (濾除取消收藏)
      setLikeStoreIds(
        [...likeStoreIds].filter((v) => v !== Object.values(removeStoreId)[0])
      );
      // 更新 props.likes (濾除取消收藏)
      // index 傳過來 用於判斷使否有資料呈現 (執行api)
      props.setLikes(
        [...props.likes].filter(
          (v) => v.store_id !== Object.values(removeStoreId)[0]
        )
      );

      // 判斷目前顯示的此分類有無資料可顯示
      // showLikeStores.length > 0 ? setHasCateData(true) : setHasCateData(false);
    } catch (e) {
      console.error("res.error:", e.response);
    }
  }

  return (
    <>
      <div className="col-md-9 col-lg-10 ps-lg-5 mt-3 mt-md-0">
        <div className="d-flex justify-content-center justify-content-between">
          <div className="page_Title d-flex justify-content-center justify-content-md-start">
            店家收藏清單
          </div>
          {props.likes.length > 0 ? (
            <div className="page_Title_Category_Hover position-relative">
              <div className="page_Title_Category d-flex justify-content-center justify-content-md-start align-items-center">
                <span className="page_Title_Text">
                  {showCate !== "全部店家" ? showCate + "店家" : "全部店家"}
                </span>
                {/* <span className="page_Title_Text">&nbsp;&nbsp;店&nbsp;家</span> */}
                <FiChevronDown className="ms-1 page_Title_Arrow" />
              </div>
              <ul className="page_Title_Category_List list-unstyled position-absolute mt-4">
                {storeCategory.map((ca) => {
                  return (
                    <li
                      key={ca.categoryId}
                      onClick={() => {
                        // alert(ca.categoryId + ca.category);
                        // 篩選出 選取的類別 店家清單
                        // 符合條件留下 (比對是 storeId 的留下)
                        if (ca.categoryId === 0) {
                          // 點選 全部 類別
                          setShowLikeStores([...likeStores]);
                          setShowCate("全部店家");
                          // 有資料顯示
                          // setHasCateData(true);
                        } else {
                          // 點選 其他類別 將其類別濾出後呈現
                          setShowLikeStores(
                            [...likeStores].filter(
                              (v) => Object.values(v)[7] === ca.category
                            )
                          );
                          setShowCate(ca.category);

                          // 判斷此分類有無資料可顯示
                          // [...likeStores].filter(
                          //   (v) => Object.values(v)[7] === ca.category
                          // ).length > 0
                          //   ? setHasCateData(true)
                          //   : setHasCateData(false);
                        }
                      }}
                    >
                      {ca.category}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </div>
        <hr></hr>
        {/* -------- 店家收藏清單 開始 -------- */}
        {props.likes.length > 0 ? (
          loading ? (
            <BarLoader
              color={color}
              size={7}
              margin={6}
              loading={loading}
              css={override}
              height={6}
              width={150}
              speedMultiplier={1}
            />
          ) : (
            <>
              <div className="text-end fz-md ls-md pt-2">
                共 {showLikeStores.length} 筆
              </div>
              <div className="row">
                {/* ------- store card 開始 -------- */}
                {showLikeStores.length > 0 ? (
                  showLikeStores.map((item) => {
                    return (
                      <div
                        key={item.storeId}
                        className="col col-lg-6 col-xl-4 my-4 d-flex justify-content-center flex-wrap"
                      >
                        <Link
                          to={"/store/" + item.storeId}
                          className="text-decoration-none card_Link"
                        >
                          <div className="store_Card position-relative">
                            {/* 卡片的內容 */}
                            <div className="px-4 pt-4 pb-3 h-100">
                              {/* 照片 */}
                              <div className="store_Img mx-auto">
                                {item.isToday === "營業中" ? (
                                  <span className="position-absolute store_Status_Open badge">
                                    {item.isToday}
                                  </span>
                                ) : (
                                  <span className="position-absolute store_Status_Close badge">
                                    {item.isToday}
                                  </span>
                                )}
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
                                    {item.storeBranchName ? (
                                      item.storeBranchName
                                    ) : (
                                      <span>&emsp;</span>
                                    )}
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
                                <span>{item.products}</span>
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
                                        likeStoreIds.filter(
                                          (v) => v !== item.storeId
                                        )
                                        // 符合條件留下 (比對 不是 storeId 的留下)
                                      );
                                      //setFavAction({ action: 'remove', storeId: id })
                                      handleRemoveLike(item.storeId);
                                    } else {
                                      //add
                                      // setLikeStoreIds([...likeStoreIds, item.storeId]);
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
                  })
                ) : (
                  <div className=" ls-md c-grey text-center pt-4">
                    您尚未收藏 {showCate} 類別的店家
                  </div>
                )}
                {/* ------- store card 結束 -------- */}
              </div>
              {/* -------- 店家收藏清單 結束 -------- */}
            </>
          )
        ) : (
          <div className=" ls-md c-grey text-center pt-4">
            您尚未收藏喜愛店家
          </div>
        )}
      </div>
    </>
  );
};

export default UserLike;
