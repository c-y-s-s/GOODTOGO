import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { AiOutlineClockCircle } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import { Rating } from "@mui/material";

import { API_URL } from "../../../utils/config";

const StoreForMap = (props) => {
  console.log(props.clickStoreId);
  const [clickStoreData, setClickStoreDate] = useState([]);
  console.log(props.clickStoreId);

  useEffect(() => {
    let getClickStoreData = async () => {
      let clickStoreDataRes = await axios.get(
        `${API_URL}/map/info/${props.clickStoreId}`
      );
      setClickStoreDate(clickStoreDataRes.data);
    };
    getClickStoreData();
  }, [props.clickStoreId]);
  console.log(clickStoreData.length);
  return (
    <div>
      {clickStoreData.length === 1 &&
        clickStoreData.map((item) => {
          // -------- 處理沒有分店名的空白欄位 --------
          let space = "";
          for (let i = 1; i < item.name.length; i++) {
            item.name[i] === " " && (space = true);
          }
          {
            /* console.log("aaaaa",item); */
          }
          return (
            <div>
              <Link to={`/store/${item.id}`} className="no-link" key={item.id}>
                <div className="store-info-card shadow d-flex align-items-center">
                  <div className="info-img col-12">
                    <img
                      src={require(`../../../images/store_img/${item.logo}`)}
                      alt="logo"
                    />
                    {/* --->營業中標籤 */}
                    {/* <div className="is-closed">休息中</div> */}
                    <div
                      className={`${
                        item.opState === false ? "is-closed" : "is-open"
                      }`}
                    >
                      {item.opState === false ? "休息中" : "營業中"}
                    </div>
                  </div>
                  {/* --->店名 */}
                  <div className="info-title mt-3 d-flex justify-content-between col-12">
                    <span className="text-dark-grey input-label-title text-start">
                      {item.name.split(" ")[0]}
                      <br />
                      {/* --->分店名 */}
                      <span className="text-dark-grey detail-sm">
                        {space === true ? item.name.split(" ")[1] : <br />}
                      </span>
                    </span>

                    <div className="cate-tag">{item.category}</div>
                  </div>
                  <div className="info-detail col-12 text-dark-grey detail-sm d-flex align-items-center justify-content-between flex-wrap mt-2">
                    <div className=" d-flex align-items-center">
                      <AiOutlineClockCircle className="me-1" />
                      {item.open_time} - {item.close_time}
                    </div>
                    <span className="text-dark-grey">
                      剩餘餐點：{item.amount}
                    </span>
                    <hr className="col-12 mt-2 mb-2" />
                    {/* //*星星 */}
                    <div className="d-flex align-items-center justify-content-center">
                      <Rating
                        name="read-only"
                        value={Number(item.star)}
                        readOnly
                        className="me-1"
                        precision={0.1}
                      />
                      {item.star}
                    </div>

                    <div className="d-flex align-items-center">
                      <FiHeart className="store_Like_Active_view" />
                      <div className="ms-2">{item.like}</div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default StoreForMap;
