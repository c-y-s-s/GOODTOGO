import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import { Rating } from "@mui/material";

const StoreForMap = () => {
  return (
    <div>
      <Link to={`#`} className="no-link">
        <div className="store-info-card shadow d-flex align-items-center">
          <div className="info-img col-12">
            <img src="" alt="logo" />
            {/* --->營業中標籤 */}
            <div className="is-closed">休息中</div>
            {/* <div
              className={`${item.opState === false ? "is-closed" : "is-open"}`}
            >
              {item.opState === false ? "休息中" : "營業中"}
            </div> */}
            {/* 營業中標籤 <--- */}
          </div>
          {/* --->店名 */}
          <div className="info-title mt-3 d-flex justify-content-between col-12">
            <span className="text-dark-grey input-label-title">
              店名
              <br />
              {/* --->分店名 */}
              <span className="text-dark-grey detail-sm">分店</span>
              {/*分店名<--- */}
            </span>
            {/* 店名 <--- */}
            <div className="cate-tag">港式</div>
          </div>
          <div className="info-detail col-12 text-dark-grey detail-sm d-flex align-items-center justify-content-between flex-wrap mt-2">
            {/* 營業時間 */}
            <div className=" d-flex align-items-center">
              <AiOutlineClockCircle className="me-1" />
              {/* {item.open_time} -{" "}
              {item.close_time} */}
            </div>
            <span className="text-dark-grey">剩餘餐點：2</span>
            <hr className="col-12 mt-2 mb-2" />
            {/* //*星星 */}
            <div className="d-flex align-items-center justify-content-center">
              <Rating
                name="read-only"
                value={1}
                readOnly
                className="me-1"
                precision={0.1}
              />{" "}
              (1)
            </div>

            <div className="d-flex align-items-center">
              <FiHeart className="store_Like_Active_view" />
              <div className="ms-2">4</div>

              {/* <FiHeart
              className="store_Like_unActive"
              onClick={(e) => {}}
            />
            <div className="ms-2">
              {likeCount > 0 ? likeCount : 0}
            </div> */}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default StoreForMap;
