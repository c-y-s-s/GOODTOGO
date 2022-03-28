import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../context/auth";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { API_URL } from "../../../../utils/config";
import "moment/min/locales";
import Loading from "../../images/loading.gif";
import InfoCard from "../../../../components/shared/InfoCard";

const moment = require("moment");

const StoreInfoCard = (props) => {
  moment.locale("zh-tw");
  const {
    storeList,
    storeLikeCount,
    setStoreLikeCount,
    amount,
    storeStarsCount,
    likeList,
    loading,
    setLikeList,
    total,
  } = props;
  const { loginMember } = useAuth();

  const handleRemoveLike = async (id) => {
    id = { id };
    try {
      let response = await axios.post(
        `${API_URL}/stores/remove_like/${loginMember.id}`,
        id,
        {
          withCredentials: true,
        }
      );
      console.log("移除成功", response.data);
    } catch (e) {
      console.error("res.error:", e.response);
    }
  };
  const handleAddLike = async (id) => {
    id = { id };

    try {
      let response = await axios.post(
        `${API_URL}/stores/add_like/${loginMember.id}`,
        id,
        {
          withCredentials: true,
        }
      );
      console.log("新增成功", response.data);
    } catch (e) {
      console.error("res.error:", e.response);
    }
  };
  console.log("tt", total);
  const displayList = storeList.map((item) => {
    //使用者收藏愛心
    let favStoresMap = likeList.map((d) => {
      return d.store_id;
    });
    // -------- 取得該店家愛心總數量 --------
    let likeCount = Object.values(storeLikeCount)[item.id - 1];
    // -------- 取得該店家產品總數量 --------
    let productAmount = Object.values(amount)[item.id - 1];
    // -------- 取得該店家星星總數量 --------
    let starCount = Object.values(storeStarsCount)[item.id - 1];
    // -------- 處理沒有分店名的空白欄位 --------
    let space = "";
    for (let i = 1; i < item.name.length; i++) {
      item.name[i] === " " && (space = true);
    }

    return total === 0 ? (
      <>
        <div>很抱歉，沒有您查詢的資料</div>
      </>
    ) : (
      <div className="">
        <Link to={`/store/${item.id}`} className="no-link">
          <InfoCard key={item.id} version="info">
            <div className="info-img col-12">
              <img
                src={require(`../../../../images/store_img/${item.logo}`)}
                alt="logo"
              />

              <div
                className={`${
                  item.opState === false ? "is-closed" : "is-open"
                }`}
              >
                {item.opState === false ? "休息中" : "營業中"}
              </div>
            </div>
            <div className="info-title mt-3 d-flex justify-content-between col-12">
              <span className="text-dark-grey input-label-title">
                {item.name.split(" ")[0]}
                <br />
                <span className="text-dark-grey detail-sm">
                  {space === true ? item.name.split(" ")[1] : <br />}
                  {/* 開發中才開啟 */}
                  {/* {item.close_day} */}
                  {/* 實際不會用到 */}
                </span>
              </span>

              <div className="cate-tag">{item.category}</div>
            </div>

            <div className="info-detail col-12 text-dark-grey detail-sm d-flex align-items-center justify-content-between flex-wrap mt-2">
              <div className=" d-flex align-items-center">
                <AiOutlineClockCircle className="me-1" /> {item.open_time} -{" "}
                {item.close_time}
              </div>
              <span className="text-dark-grey">剩餘餐點：{productAmount}</span>
              <hr className="col-12 mt-2 mb-2" />
              {/* //*星星 */}
              <div className="d-flex align-items-center justify-content-center">
                <Rating
                  name="read-only"
                  value={Number(starCount)}
                  readOnly
                  className="me-1"
                  precision={0.1}
                />{" "}
                ({starCount})
              </div>
              {/* //*愛心:有登入顯示愛心框可以收藏; 沒登入就只能看到實體愛心 */}
              <div className="d-flex align-items-center">
                {loginMember !== null ? (
                  <>
                    <FiHeart
                      role="button"
                      className={
                        favStoresMap.indexOf(item.id) >= 0
                          ? "store_Like_Active"
                          : "store_Like_unActive"
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        // remove:該store_id有在陣列裡面(實心)=>要從陣列裡面移除
                        if (favStoresMap.indexOf(item.id) >= 0) {
                          handleRemoveLike(item.id);
                          const updatedCount = {
                            ...storeLikeCount,
                            [item.id]: likeCount - 1,
                          };
                          setStoreLikeCount(updatedCount);
                          const updatedLikeList = [...likeList].filter(
                            (v) => v.store_id !== item.id
                          );
                          console.log("updateLikeList", updatedLikeList);
                          setLikeList(updatedLikeList);
                        } else {
                          //add:該store_id沒有在陣列裡面(空心)=>要從加入陣列
                          handleAddLike(item.id);
                          const updatedCount = {
                            ...storeLikeCount,
                            [item.id]: likeCount + 1,
                          };
                          setStoreLikeCount(updatedCount);
                          setLikeList([...likeList, { store_id: item.id }]);
                          console.log("test...", [
                            ...likeList,
                            { store_id: item.id },
                          ]);
                        }
                      }}
                    />
                    <div className="ms-2">{likeCount > 0 ? likeCount : 0}</div>
                  </>
                ) : (
                  <>
                    <FiHeart className="store_Like_Active_view" />
                    <div className="ms-2">{likeCount > 0 ? likeCount : 0}</div>
                  </>
                )}
              </div>
            </div>
          </InfoCard>
        </Link>
      </div>
    );
  });

  return (
    <>
      {loading ? (
        <img src={Loading} alt="loading" className="store-list-loading"></img>
      ) : (
        displayList
      )}
    </>
  );
};

export default StoreInfoCard;
