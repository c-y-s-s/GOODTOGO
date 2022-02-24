import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClockCircle } from "react-icons/ai";
import { Rating } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import "moment/min/locales";
const moment = require("moment");

const StoreInfoCard = (props) => {
  moment.locale("zh-tw");
  const { storeList } = props;
  return (
    <>
      {storeList.map((item) => {
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
          <div key={uuidv4()}>
            <Link to={`all/${item.id}`} className="no-link">
              <div className="store-info-card shadow d-flex align-items-center">
                <div className="info-img col-12">
                  <img
                    src={require(`../../../../images/store_img/${item.logo}`)}
                    alt="logo"
                  />
                  <div className="is-open">營業中</div>
                </div>
                <div className="info-title mt-3 d-flex justify-content-between col-12">
                  <span className="text-dark-grey input-label-title">
                    {item.name.split(" ")[0]}
                    <br />
                    <span className="text-dark-grey detail-sm">
                      {/* {item.name.split(" ")[1] === "" ? <div>hi</div> : ""} */}
                      {space === true ? item.name.split(" ")[1] : <br />}
                    </span>
                  </span>

                  <div className="cate-tag">{item.category}</div>
                </div>
                <div className="info-detail col-12 text-dark-grey detail-sm d-flex align-items-center justify-content-between flex-wrap mt-2">
                  <div>
                    <AiOutlineClockCircle className="mb-1" />{" "}
                    {moment(item.open_time, "hh:mm:ss.000").format("hh:mm")} -
                    {moment(item.close_time, "hh:mm:ss.000").format("LT")}
                  </div>
                  <span className="text-dark-grey">剩餘餐點：14</span>
                  <hr className="col-12 mt-2 mb-2" />
                  <Rating name="read-only" value={1} readOnly />
                  {/* <span>Rating</span> */}

                  <span> heart </span>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default StoreInfoCard;
