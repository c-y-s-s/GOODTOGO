import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineClockCircle } from "react-icons/ai";
const moment = require("moment");

const StoreInfoCard = (props) => {
  const { storeList } = props;
  return (
    <>
      {storeList.map((item, i) => {
        return (
          <Link to={`all/${item.id}`} className="no-link">
            <div
              className="store-info-card shadow d-flex align-items-center"
              key={item.id}
            >
              <div className="info-img col-12">
                <img
                  src={require(`../../../../images/store_img/${item.logo}`)}
                  alt="logo"
                />
              </div>
              <div className="info-title mt-3 d-flex justify-content-between col-12">
                <span className="text-dark-grey input-label-title">
                  {item.name.split(" ")[0]}
                  <br />
                  <span className="text-dark-grey detail-sm">
                    {item.name.split(" ")[1]}
                  </span>
                </span>

                <div className="cate-tag">{item.category}</div>
              </div>
              <div className="info-detail col-12 text-dark-grey detail-sm d-flex align-items-center justify-content-between flex-wrap mt-2">
                <div>
                  <AiOutlineClockCircle className="mb-1" />{" "}
                  {moment(item.open_time, "hh:mm:ss.000").format("hh:mm")} -{" "}
                  {moment(item.close_time, "hh:mm:ss.000").format("hh:mm")}
                </div>
                <span className="text-dark-grey">剩餘餐點：14</span>
                <hr className="col-12 mt-2 mb-2" />
                <span>Rating</span>
                <span> heart </span>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default StoreInfoCard;
