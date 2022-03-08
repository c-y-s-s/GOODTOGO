import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../context/auth";
import { FiHeart } from "react-icons/fi";

//UI套件
import { Rating } from "@mui/material";
import { AiOutlineClockCircle } from "react-icons/ai";
//uuid->key
import { v4 as uuidv4 } from "uuid";
import "moment/min/locales";
//後端套件
import axios from "axios";
import { API_URL } from "../../../../utils/config";
const moment = require("moment");

const RecomCard = (props) => {
  moment.locale("zh-tw");
  const [displayList, setDisplayList] = useState([]);
  const [commentCount, setCommentCount] = useState([]);
  const { totalHeart, productAmount, totalStar, likeList } = props;
  const { loginMember, setLoginMember } = useAuth();
  console.log("rec", likeList);
  useEffect(() => {
    let getRecomm = async () => {
      let recommRes = await axios.get(`${API_URL}/storeRecommRouter`);
      setDisplayList(recommRes.data);
    };
    getRecomm();
  }, []);
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
  // console.log(displayList);
  return (
    <>
      {displayList.map((item) => {
        //使用者收藏愛心
        let favStoresMap = likeList.map((d) => {
          return d.store_id;
        });
        // -------- 取得該店家愛心總數量 --------
        let likeCount = Object.values(totalHeart)[item.id - 1];
        // -------- 取得該店家產品總數量 --------
        let productCount = Object.values(productAmount)[item.id - 1];
        // -------- 取得該店家星星總數量 --------
        let starCount = Object.values(totalStar)[item.id - 1];
        console.log("sssss", starCount);
        // -------- 處理沒有分店名的空白欄位 --------
        let space = "";
        {
          /* console.log(item.name); */
        }
        for (let i = 1; i < item.name.length; i++) {
          {
            /* console.log(item.name[i]); */
          }
          item.name[i] === " " && (space = true);
        }
        {
          /* console.log(space); */
        }

        return (
          <div>
            {/* <Link to={`/store/${item.id}`} className="no-link"> */}
            <div
              className="store-rec-card shadow d-flex align-items-center col-lg-3 col-10"
              key={item.id}
            >
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
                    {/* 開發中才開啟  {item.close_day}*/}
                    {item.close_day}
                  </span>
                </span>

                <div className="cate-tag">{item.category}</div>
              </div>
              <div className="info-detail col-12 text-dark-grey detail-sm d-flex align-items-center justify-content-between flex-wrap mt-2">
                <div className="d-flex align-items-center">
                  <AiOutlineClockCircle className="me-1" /> {item.open_time} -
                  {item.close_time}
                </div>
                <span className="text-dark-grey">剩餘餐點：{productCount}</span>
                <hr className="col-12 mt-2 mb-2" />
                <div className="d-flex align-items-center justify-content-center">
                  <Rating
                    name="read-only"
                    value={Number(starCount)}
                    readOnly
                    precision={0.1}
                  />
                  {starCount}
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
                        onClick={() => {
                          // remove:該store_id有在陣列裡面(實心)=>要從陣列裡面移除
                          if (favStoresMap.indexOf(item.id) >= 0) {
                            handleRemoveLike(item.id);
                          } else {
                            //add:該store_id沒有在陣列裡面(空心)=>要從加入陣列
                            handleAddLike(item.id);
                          }
                        }}
                      />
                      <div className="ms-2">
                        {likeCount > 0 ? likeCount : 0}
                      </div>
                    </>
                  ) : (
                    <>
                      <FiHeart className="store_Like_Active_view" />
                      <div className="ms-2">
                        {likeCount > 0 ? likeCount : 0}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            {/* </Link> */}
          </div>
        );
      })}
    </>
  );
};

export default RecomCard;
